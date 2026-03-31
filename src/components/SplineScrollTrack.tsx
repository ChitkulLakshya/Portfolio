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

// optimization sequence patch 71-0
// optimization sequence patch 71-1
// optimization sequence patch 71-2
// optimization sequence patch 71-3
// optimization sequence patch 71-4
// optimization sequence patch 71-5
// optimization sequence patch 71-6
// optimization sequence patch 71-7
// optimization sequence patch 71-8
// optimization sequence patch 71-9
// optimization sequence patch 71-10
// optimization sequence patch 71-11
// optimization sequence patch 71-12
// optimization sequence patch 71-13
// optimization sequence patch 71-14
// optimization sequence patch 71-15
// optimization sequence patch 71-16
// optimization sequence patch 71-17
// optimization sequence patch 71-18
// optimization sequence patch 71-19
// optimization sequence patch 71-20
// optimization sequence patch 71-21
// optimization sequence patch 71-22
// optimization sequence patch 71-23
// optimization sequence patch 71-24
// optimization sequence patch 71-25
// optimization sequence patch 71-26
// optimization sequence patch 71-27
// optimization sequence patch 71-28
// optimization sequence patch 71-29
// optimization sequence patch 71-30
// optimization sequence patch 71-31
// optimization sequence patch 71-32
// optimization sequence patch 71-33
// optimization sequence patch 71-34
// optimization sequence patch 71-35
// optimization sequence patch 71-36
// optimization sequence patch 71-37
// optimization sequence patch 71-38
// optimization sequence patch 71-39
// optimization sequence patch 71-40
// optimization sequence patch 71-41
// optimization sequence patch 71-42
// optimization sequence patch 71-43
// optimization sequence patch 71-44
// optimization sequence patch 71-45
// optimization sequence patch 71-46
// optimization sequence patch 71-47
// optimization sequence patch 71-48
// optimization sequence patch 71-49
