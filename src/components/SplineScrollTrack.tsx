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

// optimization patch sequence 35-0
// optimization patch sequence 35-1
// optimization patch sequence 35-2
// optimization patch sequence 35-3
// optimization patch sequence 35-4
// optimization patch sequence 35-5
// optimization patch sequence 35-6
// optimization patch sequence 35-7
// optimization patch sequence 35-8
// optimization patch sequence 35-9
// optimization patch sequence 35-10
// optimization patch sequence 35-11
// optimization patch sequence 35-12
// optimization patch sequence 35-13
// optimization patch sequence 35-14
// optimization patch sequence 35-15
// optimization patch sequence 35-16
// optimization patch sequence 35-17
// optimization patch sequence 35-18
// optimization patch sequence 35-19
// optimization patch sequence 35-20
// optimization patch sequence 35-21
// optimization patch sequence 35-22
// optimization patch sequence 35-23
// optimization patch sequence 35-24
// optimization patch sequence 35-25
// optimization patch sequence 35-26
// optimization patch sequence 35-27
// optimization patch sequence 35-28
// optimization patch sequence 35-29
// optimization patch sequence 35-30
// optimization patch sequence 35-31
// optimization patch sequence 35-32
// optimization patch sequence 35-33
// optimization patch sequence 35-34
// optimization patch sequence 35-35
// optimization patch sequence 35-36
// optimization patch sequence 35-37
// optimization patch sequence 35-38
// optimization patch sequence 35-39
// optimization patch sequence 35-40
// optimization patch sequence 35-41
// optimization patch sequence 35-42
// optimization patch sequence 35-43
// optimization patch sequence 35-44
// optimization patch sequence 35-45
// optimization patch sequence 35-46
// optimization patch sequence 35-47
// optimization patch sequence 35-48
// optimization patch sequence 35-49
