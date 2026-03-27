import React, { useEffect } from "react";
import Spline from "@splinetool/react-spline";

// ─── NOT lazy-loaded ─────────────────────────────────────────────────────────
// Spline is imported directly so the canvas initialises synchronously on mount.
// A lazy() + Suspense boundary delays the Spline runtime's internal setup,
// which can cause the "Start" event to fire before the canvas is ready.
// ─────────────────────────────────────────────────────────────────────────────

const SPLINE_URL =
  "https://prod.spline.design/As-zA3oBQYhjxW8O/scene.splinecode";

interface SplineScrollTrackProps {
  /**
   * UI overlay for the first 100vh (Hero / Home section).
   * Wrap interactive children in pointer-events-auto; the outer
   * overlay container uses pointer-events-none so scroll events
   * pass through to the Spline canvas below.
   */
  heroSlot?: React.ReactNode;
}

/**
 * SplineScrollTrack
 * -----------------
 * Creates a 200vh scroll track where the Spline 3D scene is pinned
 * (sticky) behind the page content for exactly two viewport heights.
 *
 * - 0 → 100vh  : Hero / Home UI (heroSlot) sits on top of the 3D scene.
 * - 100 → 200vh: The Spline scroll animation plays (laptop zooms in,
 *                screen fades in) with no DOM overlay — just the 3D canvas.
 * - >200vh     : The sticky pin expires; the canvas scrolls up naturally,
 *                revealing the standard About / Contact sections below.
 *
 * Z-Index layers (low → high):
 *   [-10] Spline canvas (sticky background)
 *   [ 0 ] SplineScrollTrack root (transparent, pointer-events-none)
 *   [+10] heroSlot overlay (pointer-events-none wrapper,
 *         pointer-events-auto on individual interactive elements)
 */
export default function SplineScrollTrack({ heroSlot }: SplineScrollTrackProps) {

  // ── SCROLL RESET ON MOUNT ──────────────────────────────────────────────────
  // Spline reads window.scrollY to position the "Scroll" event timeline when
  // the canvas initialises. If the browser restores a non-zero scroll position
  // (e.g. after a hot-reload or back-navigation), the animation starts mid-way
  // through, making the "Start" animation appear broken or skipped.
  // Forcing scrollY = 0 before the canvas boots guarantees frame 0 is frame 0.
  useEffect(() => {
    // Use "instant" to avoid the smooth-scroll animation fighting Spline's init.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, []); // empty dep → runs once, immediately after the first paint

  return (
    // ─── SCROLL TRACK ROOT ──────────────────────────────────────────────
    // h-[200vh] = exactly 2 pages of scrollable depth.
    // The sticky child will stay pinned while the user scrolls within it.
    <div className="relative h-[200vh] w-full">

      {/* ── STICKY 3D CANVAS ──────────────────────────────────────────────
          sticky + top-0 + h-screen  → pins to top of viewport.
          -z-10                      → renders behind all page content.
          pointer-events-none        → scroll / click events pass through
                                       to the document, keeping the Spline
                                       internal scroll listener alive.
          [&>div]:w-full / [&>div]:h-full forces Spline's inner wrapper
          div to fill the full container so the canvas doesn't collapse.
      ──────────────────────────────────────────────────────────────────── */}
      <div
        className={[
          "sticky top-0 h-screen w-full",
          "-z-10",
          "overflow-hidden",
          "pointer-events-none",
          "[&>div]:w-full [&>div]:h-full",
        ].join(" ")}
      >
        <Spline
          scene={SPLINE_URL}
          className="w-full h-full"
          // style prop is a safety net: even if a parent sets pointer-events,
          // the canvas itself never captures scroll/click.
          style={{ pointerEvents: "none" }}
        />
      </div>

      {/* ── HERO UI OVERLAY (0 → 100vh) ───────────────────────────────────
          absolute + top-0  → sits at the very start of the scroll track.
          h-screen          → covers exactly the first viewport.
          z-10              → floats above the Spline canvas.
          pointer-events-none on the wrapper so that scrolling the page
          still reaches the Spline canvas; individual interactive UI
          elements (buttons, links) should set pointer-events-auto on
          themselves directly.
      ──────────────────────────────────────────────────────────────────── */}
      {heroSlot && (
        <div
          className={[
            "absolute top-0 left-0",
            "w-full h-screen",
            "z-10",
            "pointer-events-none",
          ].join(" ")}
        >
          {heroSlot}
        </div>
      )}

      {/* ── SKILLS / ANIMATION ZONE (100 → 200vh) ────────────────────────
          Intentionally empty transparent space. The Spline scroll event
          (laptop flying forward + screen reveal) plays through here as the
          user scrolls the page.

          The invisible anchor divs below preserve compatibility with the
          Navbar "SKILLS" button which scrolls to #stack or #skills.
      ──────────────────────────────────────────────────────────────────── */}
      {/* Invisible scroll anchors — zero height, zero width, zero opacity */}
      <div
        id="stack"
        aria-hidden="true"
        className="absolute top-[100vh] left-0 w-0 h-0 overflow-hidden pointer-events-none"
      />
      <div
        id="skills"
        aria-hidden="true"
        className="absolute top-[100vh] left-0 w-0 h-0 overflow-hidden pointer-events-none"
      />
    </div>
  );
}
