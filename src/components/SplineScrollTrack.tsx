/**
 * SplineScrollTrack.tsx
 * ─────────────────────
 * Decoupled fixed-canvas architecture. The Spline 3D scene is rendered in a
 * position:fixed layer that is completely outside the document scroll flow.
 * A separate, empty <section> of height SCROLL_HEIGHT creates the physical
 * scrollable space that drives Spline's native "Page" scroll event.
 *
 * ── WHY FIXED INSTEAD OF STICKY ──────────────────────────────────────────
 *
 * The "Sticky Canvas Bug":
 *   When Spline's canvas lives inside a `position: sticky` container, its
 *   internal IntersectionObserver measures the element's viewport offset
 *   relative to the sticky *containing block*, not the document root. On
 *   mount, a sticky element's offsetTop can read as 0 even though the user
 *   has already scrolled, causing Spline to calculate a non-zero initial
 *   scroll progress and jump to a mid-animation state.
 *
 * The fix — position: fixed:
 *   A fixed element always has top:0, left:0 relative to the viewport. Its
 *   getBoundingClientRect().top is always exactly 0. Spline's scroll math
 *   then perfectly matches window.scrollY, so the animation initialises at
 *   frame 0 (laptop on the desk) every time.
 *
 * ── SCROLL MAP ───────────────────────────────────────────────────────────
 *   scrollY = 0                   : Base State — laptop on the desk.
 *   scrollY = 0 → TRACK_PX       : Spline "Page" event plays (camera sweep).
 *   scrollY > TRACK_PX            : Track section ends; fixed canvas is hidden
 *                                   via opacity transition as About scrolls in.
 *
 * ── WATERMARK CLIPPING ───────────────────────────────────────────────────
 *   The fixed outer wrapper uses overflow:hidden. An inner div is 80px
 *   wider/taller, anchored bottom-right, pushing the Spline badge outside
 *   the clipping boundary — identical to the previous sticky hack.
 *
 * ── INIT RACE PREVENTION ─────────────────────────────────────────────────
 *   1. scrollRestoration = "manual" + scrollTo(0,0) in useLayoutEffect.
 *   2. overflow:hidden on body until Spline fires onLoad.
 *   3. splineKey gate (0 → 1 after 150 ms) — key prop remount ensures a
 *      completely fresh WebGL context with no stale scroll memory.
 *   4. ResizeObserver confirms scrollHeight ≥ innerHeight*2 before unlock.
 *   5. MANUAL_DRIVE fallback for environments where native scroll still fails.
 *   6. After onLoad, Key Down "A" is scheduled (rAF×2 + microtask) so the
 *      laptop-open animation runs after the first canvas paint, not before.
 */

import React, {
  useState,
  useLayoutEffect,
  useEffect,
  useRef,
  useCallback,
} from "react";
import Spline from "@splinetool/react-spline";
import type { Application } from "@splinetool/runtime";

// ── CONFIG ──────────────────────────────────────────────────────────────────

const SPLINE_URL = "/scene.splinecode";

/**
 * Object **name or UUID** in the Spline scene that owns the **Key Down → "A"**
 * interaction (must match the scene graph in the Spline editor exactly).
 * Use `"Scene"` if the listener is on the scene root.
 */
const SPLINE_KEYDOWN_TARGET = "Scene";

/**
 * After `onLoad`, the WebGL frame may not be painted yet. We wait for the
 * next animation frames (and a microtask) so the laptop “open on A” animation
 * runs once the canvas is actually visible — not in the background.
 */
function scheduleLaptopKeyAAfterPaint(spline: Application) {
  const fire = () => {
    try {
      spline.emitEvent("keyDown", SPLINE_KEYDOWN_TARGET);
    } catch (e) {
      console.warn("[Spline] emitEvent(keyDown) failed:", e);
    }

    const canvas = spline.canvas;
    if (canvas) {
      try {
        canvas.focus?.();
      } catch {
        /* ignore */
      }
      // Spline’s key filter for “A” often follows the browser key path; this
      // mirrors a real KeyA press on the canvas.
      canvas.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "a",
          code: "KeyA",
          keyCode: 65,
          which: 65,
          bubbles: true,
          cancelable: true,
        })
      );
    }

    try {
      spline.requestRender?.();
    } catch {
      /* ignore */
    }
  };

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      setTimeout(fire, 0);
    });
  });
}

/**
 * Total scroll depth allocated to the Spline animation track.
 * The empty <section> will be exactly this tall, giving Spline's "Page"
 * event this many pixels of window.scrollY to map its animation across.
 * Increase to slow the animation (more scroll distance = slower camera).
 */
const SCROLL_HEIGHT = "200vh";

/**
 * MANUAL DRIVE FALLBACK
 * ─────────────────────
 * Set to true only if Spline's native "Page" scroll event still mis-fires.
 * Reads window.scrollY in a rAF loop and drives a Spline Number variable
 * named "scrollProgress" (range 0–1) directly.
 *
 * Requires: expose a Number variable called "scrollProgress" in your Spline
 * scene (Object → Variables) and wire camera animations to it instead of the
 * Scroll / Page event trigger.
 */
const MANUAL_DRIVE = false;

// ────────────────────────────────────────────────────────────────────────────

interface SplineScrollTrackProps {
  /**
   * React content for the first 100vh, rendered in a fixed overlay on top
   * of the 3D canvas. The wrapper is pointer-events-none — set
   * pointer-events-auto only on specific interactive children (buttons, links).
   */
  heroSlot?: React.ReactNode;
}

export default function SplineScrollTrack({ heroSlot }: SplineScrollTrackProps) {
  // ── STATE ─────────────────────────────────────────────────────────────────

  /** True once the ResizeObserver confirms the full scroll range exists. */
  const [isLoaded, setIsLoaded] = useState(false);

  /**
   * KEY PROP REMOUNT GATE
   * 0 = WebGL context does not exist yet.
   * 1 = Fresh <Spline key={1}> is mounted against a known-good DOM state.
   *
   * Changing key 0→1 forces React to destroy any previous WebGL context and
   * create a brand-new one, guaranteeing no stale scroll memory.
   */
  const [splineKey, setSplineKey] = useState(0);

  /**
   * Controls whether the fixed canvas layer is visible.
   * Once the scroll track section has left the viewport we fade it out so
   * the About/Contact sections below are not occluded.
   */
  const [canvasVisible, setCanvasVisible] = useState(true);

  // ── REFS ──────────────────────────────────────────────────────────────────

  /** Live Spline Application handle — used for reset calls and manual drive. */
  const splineApp = useRef<Application | null>(null);

  /** rAF handle for the manual-drive / canvas-visibility loops. */
  const rafHandle = useRef<number>(0);

  /** Ref to the invisible scroll-track section for IntersectionObserver. */
  const trackRef = useRef<HTMLElement>(null);

  // ── HOOK 1: SCROLL RESTORATION + KEY GATE ────────────────────────────────
  // useLayoutEffect fires synchronously before the browser paints, intercepting
  // any scroll-restoration jump before the fixed canvas is ever created.
  useLayoutEffect(() => {
    const prev = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    // Zeroing both window.scrollY and body.scrollTop covers every browser's
    // internal scroll-reading path.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    document.body.scrollTop = 0;

    // Wait 150 ms (≈9 frames @ 60 Hz) before mounting the WebGL context.
    // During this window:
    //   • overflow:hidden (Hook 2) blocks all scroll drift.
    //   • The 300vh track section paints → scrollHeight grows to full value.
    //   • window.scrollY is confirmed at 0.
    // The fixed canvas is therefore created against a perfectly settled DOM.
    const t = setTimeout(() => setSplineKey(1), 150);

    return () => {
      clearTimeout(t);
      window.history.scrollRestoration = prev;
    };
  }, []);

  // ── HOOK 2: OVERFLOW LOCK ─────────────────────────────────────────────────
  // Prevents any scrollY drift during the 1-3 s WebGL init window.
  // A scroll enforcer catches GPU-composited momentum drift that can slip past
  // the overflow barrier on high-refresh-rate displays.
  useLayoutEffect(() => {
    if (!isLoaded) {
      document.body.style.overflow = "hidden";
      window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });

      const enforceTop = () => {
        if (window.scrollY !== 0) {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
        }
      };
      window.addEventListener("scroll", enforceTop, { passive: true });

      return () => {
        window.removeEventListener("scroll", enforceTop);
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [isLoaded]);

  // ── HOOK 3: CANVAS VISIBILITY VIA INTERSECTIONOBSERVER ───────────────────
  // Watches the invisible scroll-track section. When the section exits the
  // viewport (user has scrolled past the track), we hide the fixed canvas so
  // it no longer occludes the About / Contact sections below.
  useEffect(() => {
    const section = trackRef.current;
    if (!section) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        // isIntersecting → track is at least partially on-screen → show canvas.
        // !isIntersecting → track has scrolled away → hide canvas.
        setCanvasVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    io.observe(section);
    return () => io.disconnect();
  }, []);

  // ── HOOK 4: MANUAL DRIVE rAF LOOP ────────────────────────────────────────
  useLayoutEffect(() => {
    if (!MANUAL_DRIVE || !isLoaded) return;

    const trackPx = parseFloat(SCROLL_HEIGHT) * window.innerHeight / 100;

    const tick = () => {
      const app = splineApp.current;
      if (app) {
        const progress = Math.min(1, Math.max(0, window.scrollY / trackPx));
        try { app.setVariable("scrollProgress", progress); } catch (_) { }
      }
      rafHandle.current = requestAnimationFrame(tick);
    };

    rafHandle.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafHandle.current);
  }, [isLoaded]);

  // ── RESIZE-OBSERVER UNLOCK ────────────────────────────────────────────────
  // Attached in onLoad. Releases the overflow lock only after the browser
  // physically confirms document.body.scrollHeight ≥ window.innerHeight * 2,
  // guaranteeing Spline will compute a non-zero scroll range.
  const attachResizeObserverUnlock = useCallback(() => {
    // Remove the overflow lock so the DOM can expand to its full scrollHeight.
    document.body.style.overflow = "";

    // Re-zero before Spline reads position.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    document.body.scrollTop = 0;

    const required = window.innerHeight * 2;

    if (document.body.scrollHeight >= required) {
      // Already tall enough — unlock immediately.
      window.dispatchEvent(new Event("resize"));
      setIsLoaded(true);
      return;
    }

    const ro = new ResizeObserver(() => {
      if (document.body.scrollHeight >= required) {
        ro.disconnect();
        clearTimeout(safety);
        window.dispatchEvent(new Event("resize"));
        setIsLoaded(true);
      }
    });

    ro.observe(document.body);

    // Safety: unlock after 3 s regardless, so the page never stays locked.
    const safety = setTimeout(() => {
      ro.disconnect();
      window.dispatchEvent(new Event("resize"));
      setIsLoaded(true);
    }, 3000);

    return () => {
      ro.disconnect();
      clearTimeout(safety);
    };
  }, []);

  // ── onLoad HANDLER ────────────────────────────────────────────────────────
  const handleSplineLoad = useCallback(
    (spline: Application) => {
      splineApp.current = spline;

      // Snap the scene back to its absolute Base State (frame 0).
      // These calls override any editor-level "Start At" offset.
      try { spline.setVariable("scroll", 0); } catch (_) { }

      // Laptop opening is driven by Key Down "A" in the Spline file (not Start).
      // Fire after first paint so the animation isn’t consumed before the canvas is visible.
      scheduleLaptopKeyAAfterPaint(spline);

      // Hand control to the ResizeObserver — isLoaded is NOT set here directly.
      attachResizeObserverUnlock();
    },
    [attachResizeObserverUnlock]
  );

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <>
      {/* ── FIXED BACKGROUND CANVAS ──────────────────────────────────────────
          position:fixed removes the canvas from document flow entirely.
          Spline's internal scroll math now reads window.scrollY against a
          fixed element whose getBoundingClientRect().top is always exactly 0,
          eliminating the sticky-container offset miscalculation.

          canvasVisible: hidden via pointer-events + opacity once the track
          section leaves the viewport, preventing occlusion of sections below. */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: -10,
          overflow: "hidden",
          backgroundColor: "#ebebeb",
          // Pointer events: none while loading (scroll passes to window).
          // Remains none always — scroll must always reach the document.
          pointerEvents: "none",
          // Graceful fade when the track section exits the viewport.
          opacity: canvasVisible ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      >
        {/* WATERMARK CLIP HACK
            80 px overflow in both axes pushes the Spline badge outside the
            parent's overflow:hidden boundary. The 3D scene is unaffected. */}
        <div
          style={{
            position: "absolute",
            width: "calc(100% + 80px)",
            height: "calc(100% + 80px)",
            bottom: "-80px",
            right: "-80px",
          }}
        >
          {splineKey !== 0 && (
            <Spline
              key={splineKey}
              scene={SPLINE_URL}
              className="w-full h-full"
              style={{ pointerEvents: "none" }}
              onLoad={handleSplineLoad}
            />
          )}
        </div>
      </div>

      {/* ── INVISIBLE SCROLL TRACK ───────────────────────────────────────────
          An empty section of height SCROLL_HEIGHT creates the physical
          scrollable space. The fixed canvas above reads window.scrollY as
          the user scrolls through this section. No visual content here —
          the 3D canvas IS the content for this scroll range. */}
      <section
        ref={trackRef}
        aria-hidden="true"
        className="relative w-full"
        style={{ height: SCROLL_HEIGHT }}
      >
        {/* HERO UI OVERLAY (first 100vh)
            position:fixed so it stays viewport-relative, layered above the
            3D canvas. pointer-events-none on wrapper — set pointer-events-auto
            only on specific interactive children (buttons, links). */}
        {heroSlot && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100vh",
              zIndex: 10,
              pointerEvents: "none",
              // Hide the hero UI once the user scrolls past the first vh.
              // The heroSlot should manage its own exit animation if desired.
              display: canvasVisible ? "block" : "none",
            }}
          >
            {heroSlot}
          </div>
        )}

        {/* SCROLL ANCHORS — zero-size divs at the 100vh mark so Navbar and
            BottomNav "Skills" buttons can still scrollIntoView(#stack). */}
        <div
          id="stack"
          aria-hidden="true"
          className="absolute top-[100vh] left-0 w-0 h-0 pointer-events-none"
        />
        <div
          id="skills"
          aria-hidden="true"
          className="absolute top-[100vh] left-0 w-0 h-0 pointer-events-none"
        />
      </section>
    </>
  );
}
