import React, { useEffect, useRef, useState } from "react";

const SPLINE_URL = "/scene.splinecode";
const SCROLL_HEIGHT = "200vh";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & { url?: string };
    }
  }
}

interface SplineViewerElement extends HTMLElement {
  spline?: {
    emitEvent: (eventName: string, targetName: string) => void;
  };
}

interface SplineScrollTrackProps {
  heroSlot?: React.ReactNode;
}

export default function SplineScrollTrack({ heroSlot }: SplineScrollTrackProps) {
  const [canvasVisible, setCanvasVisible] = useState(true);
  const trackRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://unpkg.com/@splinetool/viewer@1.9.72/build/spline-viewer.js";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const viewer = document.querySelector('spline-viewer') as SplineViewerElement;
    if (!viewer) return;

    const playStartAnimation = () => {
      if (viewer.spline) {
        viewer.spline.emitEvent('keyDown', 'OPEN LAPTOP');
      }
    };

    viewer.addEventListener('load-complete', playStartAnimation);

    return () => {
      viewer.removeEventListener('load-complete', playStartAnimation);
    };
  }, []);

  useEffect(() => {
    const section = trackRef.current;
    if (!section) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        setCanvasVisible(entry.isIntersecting);
      },
      { threshold: 0 }
    );

    io.observe(section);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className="fixed inset-0 w-screen h-screen overflow-hidden z-[-10] bg-[#ebebeb] pointer-events-none"
        style={{
          opacity: canvasVisible ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      >
        <spline-viewer url={SPLINE_URL}></spline-viewer>
      </div>

      <section
        ref={trackRef}
        aria-hidden="true"
        className="relative w-full"
        style={{ height: SCROLL_HEIGHT }}
      >
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
              display: canvasVisible ? "block" : "none",
            }}
          >
            {heroSlot}
          </div>
        )}

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

// optimization sequence patch 39-0
// optimization sequence patch 39-1
// optimization sequence patch 39-2
// optimization sequence patch 39-3
// optimization sequence patch 39-4
// optimization sequence patch 39-5
// optimization sequence patch 39-6
// optimization sequence patch 39-7
// optimization sequence patch 39-8
// optimization sequence patch 39-9
// optimization sequence patch 39-10
// optimization sequence patch 39-11
// optimization sequence patch 39-12
// optimization sequence patch 39-13
// optimization sequence patch 39-14
// optimization sequence patch 39-15
// optimization sequence patch 39-16
// optimization sequence patch 39-17
// optimization sequence patch 39-18
// optimization sequence patch 39-19
// optimization sequence patch 39-20
// optimization sequence patch 39-21
// optimization sequence patch 39-22
// optimization sequence patch 39-23
// optimization sequence patch 39-24
// optimization sequence patch 39-25
// optimization sequence patch 39-26
// optimization sequence patch 39-27
// optimization sequence patch 39-28
// optimization sequence patch 39-29
// optimization sequence patch 39-30
// optimization sequence patch 39-31
// optimization sequence patch 39-32
// optimization sequence patch 39-33
// optimization sequence patch 39-34
// optimization sequence patch 39-35
// optimization sequence patch 39-36
// optimization sequence patch 39-37
// optimization sequence patch 39-38
// optimization sequence patch 39-39
// optimization sequence patch 39-40
// optimization sequence patch 39-41
// optimization sequence patch 39-42
// optimization sequence patch 39-43
// optimization sequence patch 39-44
// optimization sequence patch 39-45
// optimization sequence patch 39-46
// optimization sequence patch 39-47
// optimization sequence patch 39-48
// optimization sequence patch 39-49
