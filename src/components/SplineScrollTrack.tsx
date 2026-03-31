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

// optimization patch sequence 41-0
// optimization patch sequence 41-1
// optimization patch sequence 41-2
// optimization patch sequence 41-3
// optimization patch sequence 41-4
// optimization patch sequence 41-5
// optimization patch sequence 41-6
// optimization patch sequence 41-7
// optimization patch sequence 41-8
// optimization patch sequence 41-9
// optimization patch sequence 41-10
// optimization patch sequence 41-11
// optimization patch sequence 41-12
// optimization patch sequence 41-13
// optimization patch sequence 41-14
// optimization patch sequence 41-15
// optimization patch sequence 41-16
// optimization patch sequence 41-17
// optimization patch sequence 41-18
// optimization patch sequence 41-19
// optimization patch sequence 41-20
// optimization patch sequence 41-21
// optimization patch sequence 41-22
// optimization patch sequence 41-23
// optimization patch sequence 41-24
// optimization patch sequence 41-25
// optimization patch sequence 41-26
// optimization patch sequence 41-27
// optimization patch sequence 41-28
// optimization patch sequence 41-29
// optimization patch sequence 41-30
// optimization patch sequence 41-31
// optimization patch sequence 41-32
// optimization patch sequence 41-33
// optimization patch sequence 41-34
// optimization patch sequence 41-35
// optimization patch sequence 41-36
// optimization patch sequence 41-37
// optimization patch sequence 41-38
// optimization patch sequence 41-39
// optimization patch sequence 41-40
// optimization patch sequence 41-41
// optimization patch sequence 41-42
// optimization patch sequence 41-43
// optimization patch sequence 41-44
// optimization patch sequence 41-45
// optimization patch sequence 41-46
// optimization patch sequence 41-47
// optimization patch sequence 41-48
// optimization patch sequence 41-49
