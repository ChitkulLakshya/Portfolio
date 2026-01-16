import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

interface PreloaderProps {
    onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textPathRef = useRef<SVGTextElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    // Animation finished
                },
            });

            // Initial setup for the stroke animation
            const textPath = textPathRef.current;
            if (textPath) {
                const length = textPath.getComputedTextLength();
                gsap.set(textPath, {
                    strokeDasharray: length,
                    strokeDashoffset: length,
                    fill: "transparent",
                    stroke: "#1a1a1a",
                    strokeWidth: 1.5,
                    opacity: 1
                });

                // 1. Handwriting Effect (Stroke Draw)
                tl.to(textPath, {
                    strokeDashoffset: 0,
                    duration: 3,
                    ease: "power1.inOut",
                });

                // 2. Fill In
                tl.to(textPath, {
                    fill: "#1a1a1a",
                    duration: 1,
                    ease: "power2.out"
                }, "-=1");
            }

            // 3. Minimize to Top-Left Corner (Targeting top-6 left-6 approx 24px)
            // Initial CSS is centered: left: 50%, top: 50%, xPercent: -50, yPercent: -50 (via CSS transform)
            // Note: SVG Text is y="50%", so vertically centered in SVG. x="0", so left aligned.
            // But we center the SVG container initially.
            // To minimize to corner: 
            // - Move left/top to 24px (1.5rem, matching top-6 left-6).
            // - Reset translate (xPercent/yPercent) to 0.
            // - Scale to match text-3xl (~30px height). 
            //   SVG font 100px. Scale ~0.3 -> 30px.
            //   SVG height 200px -> 60px scaled. Text centered in it.
            //   If SVG top is at 24px, center is at 24 + (200*0.3)/2 = 24 + 30 = 54px.
            //   Navbar text-3xl (30px) center at 24 + 15 = 39px.
            //   Difference ~15px. We should move UP by 15px.
            //   Or set top: 24px - 15px = 9px? 
            //   Let's try top: "10px" to align better visually. 
            //   Left: 24px.

            tl.to(svgRef.current, {
                top: "-55px", // Adjusted for vertical centering offset
                left: "-8px",
                xPercent: 0,
                yPercent: 0,
                x: 0,
                y: 0,
                scale: 0.3,
                transformOrigin: "left center", // Scale from left center to keep vertical alignment easier? Or top left?
                // If I scale from "left center", the vertical center stays at original Y? no.
                // Let's use transformOrigin: "0 50%" (left center).
                // Then top/left animate the position of that anchor?
                // Actually standard CSS top/left moves the element box.
                position: "fixed",
                duration: 1.2,
                ease: "power3.inOut"
            });

            // 4. Reveal Homepage (Expand "Hole" in White Background)
            // Animate clipPath to shrink into the logo location.
            tl.to(bgRef.current, {
                clipPath: "circle(0% at 75px 40px)", // Matches the minimized text center (approx 120px - 50px = 70px)
                duration: 1.5,
                ease: "power2.inOut",
                onComplete: onComplete
            }, "-=0.8");

        }, containerRef);

        return () => ctx.revert();
    }, [onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-0 m-0"
        >
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
                `}
            </style>

            {/* Background Layer */}
            <div
                ref={bgRef}
                className="absolute inset-0 bg-[#f0f0f0]"
                style={{ clipPath: "circle(150% at 50% 50%)" }}
            ></div>

            {/* SVG Text Layer */}
            {/* Initial Centering via CSS transform to ensure it starts dead center */}
            <svg
                ref={svgRef}
                viewBox="0 0 800 200"
                className="absolute z-60"
                style={{
                    width: "800px",
                    maxWidth: "90vw",
                    height: "auto",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    overflow: "visible"
                }}
            >
                <text
                    ref={textPathRef}
                    x="50%"
                    y="50%" /* Vertically centered in SVG */
                    dominantBaseline="middle"
                    textAnchor="middle" /* Centered for perfect middle alignment */
                    className="font-cursive"
                    style={{
                        fontFamily: "'Great Vibes', cursive",
                        fontSize: "100px",
                        letterSpacing: "2px"
                    }}
                >
                    Chitkul Lakshya
                </text>
            </svg>
        </div>
    );
};

export default Preloader;
