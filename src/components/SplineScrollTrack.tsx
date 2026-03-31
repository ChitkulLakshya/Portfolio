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

// optimization patch sequence 21-0
// optimization patch sequence 21-1
// optimization patch sequence 21-2
// optimization patch sequence 21-3
// optimization patch sequence 21-4
// optimization patch sequence 21-5
// optimization patch sequence 21-6
// optimization patch sequence 21-7
// optimization patch sequence 21-8
// optimization patch sequence 21-9
// optimization patch sequence 21-10
// optimization patch sequence 21-11
// optimization patch sequence 21-12
// optimization patch sequence 21-13
// optimization patch sequence 21-14
// optimization patch sequence 21-15
// optimization patch sequence 21-16
// optimization patch sequence 21-17
// optimization patch sequence 21-18
// optimization patch sequence 21-19
// optimization patch sequence 21-20
// optimization patch sequence 21-21
// optimization patch sequence 21-22
// optimization patch sequence 21-23
// optimization patch sequence 21-24
// optimization patch sequence 21-25
// optimization patch sequence 21-26
// optimization patch sequence 21-27
// optimization patch sequence 21-28
// optimization patch sequence 21-29
// optimization patch sequence 21-30
// optimization patch sequence 21-31
// optimization patch sequence 21-32
// optimization patch sequence 21-33
// optimization patch sequence 21-34
// optimization patch sequence 21-35
// optimization patch sequence 21-36
// optimization patch sequence 21-37
// optimization patch sequence 21-38
// optimization patch sequence 21-39
// optimization patch sequence 21-40
// optimization patch sequence 21-41
// optimization patch sequence 21-42
// optimization patch sequence 21-43
// optimization patch sequence 21-44
// optimization patch sequence 21-45
// optimization patch sequence 21-46
// optimization patch sequence 21-47
// optimization patch sequence 21-48
// optimization patch sequence 21-49
