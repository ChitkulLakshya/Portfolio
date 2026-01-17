import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

interface PreloaderProps {
    onComplete: () => void;
}

const MobilePreloader: React.FC<PreloaderProps> = ({ onComplete }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textGroupRef = useRef<SVGTextElement>(null); // Ref for the text group
    const svgRef = useRef<SVGSVGElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    // Animation finished
                },
            });

            // Target TSpan elements or the text element
            // Note: getComputedTextLength on the parent <text> includes all tspans usually, 
            // but stroke-dasharray on the parent text works for all valid child tspans in many browsers.
            // Safe bet: animate the stroke on the parent <text> element.

            const textEl = textGroupRef.current;
            if (textEl) {
                const length = textEl.getComputedTextLength();
                // Set initial stroke state
                gsap.set(textEl, {
                    strokeDasharray: length,
                    strokeDashoffset: length,
                    fill: "transparent",
                    stroke: "#1a1a1a",
                    strokeWidth: 1.5,
                    opacity: 1
                });

                // 1. Handwriting Effect (Stroke Draw)
                tl.to(textEl, {
                    strokeDashoffset: 0,
                    duration: 3,
                    ease: "power1.inOut",
                });

                // 2. Fill In
                tl.to(textEl, {
                    fill: "#1a1a1a",
                    duration: 1,
                    ease: "power2.out"
                }, "-=1");
            }

            // 3. Minimize Logic (Mobile Specific)
            tl.to(svgRef.current, {
                top: "15px",
                left: "-50px", // Adjust for center anchor compensation
                xPercent: 0,
                yPercent: 0,
                x: 0,
                y: 0,
                scale: 0.25,
                transformOrigin: "left center",
                position: "fixed",
                duration: 1.2,
                ease: "power3.inOut"
            });

            // 4. Reveal Homepage
            tl.to(bgRef.current, {
                clipPath: "circle(0% at 75px 40px)",
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
                viewBox="0 0 800 400" // Increased height to accommodate 2 lines
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
                    ref={textGroupRef}
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
                    <tspan x="50%" dy="-0.6em">Chitkul</tspan>
                    <tspan x="50%" dy="1.2em">Lakshya</tspan>
                </text>
            </svg>
        </div>
    );
};

export default MobilePreloader;
