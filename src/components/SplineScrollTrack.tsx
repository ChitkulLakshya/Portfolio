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

// optimization patch sequence 17-0
// optimization patch sequence 17-1
// optimization patch sequence 17-2
// optimization patch sequence 17-3
// optimization patch sequence 17-4
// optimization patch sequence 17-5
// optimization patch sequence 17-6
// optimization patch sequence 17-7
// optimization patch sequence 17-8
// optimization patch sequence 17-9
// optimization patch sequence 17-10
// optimization patch sequence 17-11
// optimization patch sequence 17-12
// optimization patch sequence 17-13
// optimization patch sequence 17-14
// optimization patch sequence 17-15
// optimization patch sequence 17-16
// optimization patch sequence 17-17
// optimization patch sequence 17-18
// optimization patch sequence 17-19
// optimization patch sequence 17-20
// optimization patch sequence 17-21
// optimization patch sequence 17-22
// optimization patch sequence 17-23
// optimization patch sequence 17-24
// optimization patch sequence 17-25
// optimization patch sequence 17-26
// optimization patch sequence 17-27
// optimization patch sequence 17-28
// optimization patch sequence 17-29
// optimization patch sequence 17-30
// optimization patch sequence 17-31
// optimization patch sequence 17-32
// optimization patch sequence 17-33
// optimization patch sequence 17-34
// optimization patch sequence 17-35
// optimization patch sequence 17-36
// optimization patch sequence 17-37
// optimization patch sequence 17-38
// optimization patch sequence 17-39
// optimization patch sequence 17-40
// optimization patch sequence 17-41
// optimization patch sequence 17-42
// optimization patch sequence 17-43
// optimization patch sequence 17-44
// optimization patch sequence 17-45
// optimization patch sequence 17-46
// optimization patch sequence 17-47
// optimization patch sequence 17-48
// optimization patch sequence 17-49
