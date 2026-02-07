
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";

// ==================================================================================
// CONFIGURATION: FINAL POSITION
// Change these values to adjust where the text lands!
// ==================================================================================
// CONFIGURATION: FINAL POSITION
// Change these values to adjust where the text lands! (0, 0 is center)
// ==================================================================================
const TARGET_OFFSET_X = -1500;   // Horizontal Offset from Center (Negative=Left, Positive=Right)
const TARGET_OFFSET_Y = -1300;   // Vertical Offset from Center (Negative=Up, Positive=Down)
// ==================================================================================

// ==================================================================================
// CONFIGURATION: ZOOM LEVEL
// Adjust this value to scale the entire component! (e.g., 0.9 = 90%)
// ==================================================================================
const ZOOM_LEVEL = 1.0;

interface PreloaderProps {
    onComplete: () => void;
}

const MacPreloader: React.FC<PreloaderProps> = ({ onComplete }) => {
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

            // ===========================================================================
            // PHASE 1: SVG HANDWRITING
            // ===========================================================================
            const textPath = textPathRef.current;
            if (textPath) {
                const length = textPath.getComputedTextLength();
                // Initialize SVG Stroke State
                gsap.set(textPath, {
                    strokeDasharray: length,
                    strokeDashoffset: length,
                    fill: "transparent",
                    stroke: "#1a1a1a",
                    strokeWidth: 1.5, // Standard width for clarity
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    opacity: 1
                });

                // 1. Draw Stroke
                tl.to(textPath, {
                    strokeDashoffset: 0,
                    duration: 3,
                    ease: "power1.inOut",
                });

                // 2. Fill Color
                tl.to(textPath, {
                    fill: "#1a1a1a",
                    duration: 1,
                    ease: "power2.out"
                }, "-=1");
            }

            // ===========================================================================
            // PHASE 2: SWAP & MOVE (HTML)
            // ===========================================================================

            // Prepare HTML Overlay
            const htmlText = containerRef.current?.querySelector(".html-text") as HTMLElement;
            if (htmlText) {
                const split = new SplitType(htmlText, { types: "chars" });
                const chars = split.chars as HTMLElement[];

                // INITIAL CALCULATION
                // Determine offsets for animation
                const htmlTextRect = htmlText.getBoundingClientRect();
                const initialCenterX = window.innerWidth / 2;
                const initialCenterY = window.innerHeight / 2;

                // Final Position Logic (Relative to Center)
                const finalXFromCenter = TARGET_OFFSET_X;
                const finalYFromCenter = TARGET_OFFSET_Y;

                // 3. INSTANT SWAP
                // Hide SVG completely, Show HTML completely.
                // No fade overlap to avoid "rewriting" double vision.
                tl.add(() => {
                    if (svgRef.current) svgRef.current.style.opacity = "0";
                    htmlText.style.opacity = "1";
                    htmlText.style.pointerEvents = "auto";
                }, ">"); // Occurs immediately after fill finishes

                // 4. Staggered Move
                // Animate Container Scale (Shrink)
                tl.to(htmlText, {
                    scale: 0.3,
                    duration: 1.2,
                    ease: "power3.inOut",
                    transformOrigin: "left center"
                }, "move");

                // Animate Characters (Move to Corner)
                tl.to(chars, {
                    x: finalXFromCenter,
                    y: finalYFromCenter,
                    duration: 1.2,
                    ease: "power3.inOut",
                    stagger: 0.05
                }, "move");
            }

            // ===========================================================================
            // PHASE 3: REVEAL CONTENT
            // ===========================================================================
            tl.to(bgRef.current, {
                clipPath: "circle(0% at 75px 40px)", // Matches final text position approximately
                duration: 1.5,
                ease: "power2.inOut",
                onComplete: onComplete
            }, "-=0.8");

            // FADE OUT TEXT - REMOVED (Clipping handles it now)
            // if (htmlText) { ... }

        }, containerRef);

        return () => ctx.revert();
    }, [onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] overflow-hidden flex items-center justify-center p-0 m-0" // Increased Z-Index to cover Navbar
        >
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
                `}
            </style>

            {/* Background Layer (Acts as Clipper) */}
            <div
                ref={bgRef}
                className="absolute inset-0 bg-[#f0f0f0]"
                style={{ clipPath: "circle(150% at 50% 50%)" }}
            >
                {/* Content Wrapper for Zoom - NOW INSIDE BG REF (To be clipped) */}
                <div className="absolute inset-0 pointer-events-none" style={{ transform: `scale(${ZOOM_LEVEL})`, transformOrigin: "center center" }}>
                    {/* HTML Text Overlay */}
                    <div
                        className="html-text absolute z-60"
                        style={{
                            fontFamily: "'Great Vibes', cursive",
                            fontSize: "100px",
                            letterSpacing: "2px",
                            color: "#1a1a1a",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            whiteSpace: "nowrap",
                            opacity: 0, // Initially Hidden
                            pointerEvents: "none"
                        }}
                    >
                        Chitkul Lakshya
                    </div>

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
            </div>
        </div>
    );
};

export default MacPreloader;
