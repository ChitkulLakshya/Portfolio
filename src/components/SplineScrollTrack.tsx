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

// optimization sequence patch 17-0
// optimization sequence patch 17-1
// optimization sequence patch 17-2
// optimization sequence patch 17-3
// optimization sequence patch 17-4
// optimization sequence patch 17-5
// optimization sequence patch 17-6
// optimization sequence patch 17-7
// optimization sequence patch 17-8
// optimization sequence patch 17-9
// optimization sequence patch 17-10
// optimization sequence patch 17-11
// optimization sequence patch 17-12
// optimization sequence patch 17-13
// optimization sequence patch 17-14
// optimization sequence patch 17-15
// optimization sequence patch 17-16
// optimization sequence patch 17-17
// optimization sequence patch 17-18
// optimization sequence patch 17-19
// optimization sequence patch 17-20
// optimization sequence patch 17-21
// optimization sequence patch 17-22
// optimization sequence patch 17-23
// optimization sequence patch 17-24
// optimization sequence patch 17-25
// optimization sequence patch 17-26
// optimization sequence patch 17-27
// optimization sequence patch 17-28
// optimization sequence patch 17-29
// optimization sequence patch 17-30
// optimization sequence patch 17-31
// optimization sequence patch 17-32
// optimization sequence patch 17-33
// optimization sequence patch 17-34
// optimization sequence patch 17-35
// optimization sequence patch 17-36
// optimization sequence patch 17-37
// optimization sequence patch 17-38
// optimization sequence patch 17-39
// optimization sequence patch 17-40
// optimization sequence patch 17-41
// optimization sequence patch 17-42
// optimization sequence patch 17-43
// optimization sequence patch 17-44
// optimization sequence patch 17-45
// optimization sequence patch 17-46
// optimization sequence patch 17-47
// optimization sequence patch 17-48
// optimization sequence patch 17-49
