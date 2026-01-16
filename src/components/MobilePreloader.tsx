import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

interface PreloaderProps {
    onComplete: () => void;
}

const MobilePreloader: React.FC<PreloaderProps> = ({ onComplete }) => {
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
                    duration: 2.5, // Slightly faster on mobile?
                    ease: "power1.inOut",
                });

                // 2. Fill In
                tl.to(textPath, {
                    fill: "#1a1a1a",
                    duration: 1,
                    ease: "power2.out"
                }, "-=1");
            }

            // 3. Minimize Logic (Mobile Specific)
            // Mobile Navbar Logo might be centered or sized differently.
            // For now, keeping similar logic but likely needs tuning for mobile screens.
            // Assuming mobile logo is smaller or centered? 
            // User requested separate file to edit differently later.

            tl.to(svgRef.current, {
                top: "10px",
                left: "10px", // Mobile margins usually smaller
                xPercent: 0,
                yPercent: 0,
                x: 0,
                y: 0,
                scale: 0.25, // Smaller scale for mobile
                transformOrigin: "left center",
                position: "fixed",
                duration: 1.2,
                ease: "power3.inOut"
            });

            // 4. Reveal Homepage
            tl.to(bgRef.current, {
                clipPath: "circle(0% at 50px 30px)", // Adjusted for mobile minimizing
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
                    y="50%"
                    dominantBaseline="middle"
                    textAnchor="middle"
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

export default MobilePreloader;
