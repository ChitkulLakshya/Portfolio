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

// optimization sequence patch 25-0
// optimization sequence patch 25-1
// optimization sequence patch 25-2
// optimization sequence patch 25-3
// optimization sequence patch 25-4
// optimization sequence patch 25-5
// optimization sequence patch 25-6
// optimization sequence patch 25-7
// optimization sequence patch 25-8
// optimization sequence patch 25-9
// optimization sequence patch 25-10
// optimization sequence patch 25-11
// optimization sequence patch 25-12
// optimization sequence patch 25-13
// optimization sequence patch 25-14
// optimization sequence patch 25-15
// optimization sequence patch 25-16
// optimization sequence patch 25-17
// optimization sequence patch 25-18
// optimization sequence patch 25-19
// optimization sequence patch 25-20
// optimization sequence patch 25-21
// optimization sequence patch 25-22
// optimization sequence patch 25-23
// optimization sequence patch 25-24
// optimization sequence patch 25-25
// optimization sequence patch 25-26
// optimization sequence patch 25-27
// optimization sequence patch 25-28
// optimization sequence patch 25-29
// optimization sequence patch 25-30
// optimization sequence patch 25-31
// optimization sequence patch 25-32
// optimization sequence patch 25-33
// optimization sequence patch 25-34
// optimization sequence patch 25-35
// optimization sequence patch 25-36
// optimization sequence patch 25-37
// optimization sequence patch 25-38
// optimization sequence patch 25-39
// optimization sequence patch 25-40
// optimization sequence patch 25-41
// optimization sequence patch 25-42
// optimization sequence patch 25-43
// optimization sequence patch 25-44
// optimization sequence patch 25-45
// optimization sequence patch 25-46
// optimization sequence patch 25-47
// optimization sequence patch 25-48
// optimization sequence patch 25-49
