import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import SplitType from "split-type";


const TARGET_LEFT_X = -153;  // Horizontal Position (px from left edge)
const TARGET_TOP_Y = -970;   // Vertical Position (px from top edge) - Slightly higher for mobile
const TARGET_SCALE = 0.29; // Size of the text at the END (0.25 = 25% of original)






const START_OFFSET_X = 0; // Move Left (-) or Right (+)
const START_OFFSET_Y = 0; // Move Up (-) or Down (+)
const START_SCALE = 0.45;    // Size of the text at the START (1 = 100% original)



interface PreloaderProps {
    onComplete: () => void;
}

const MobilePreloader: React.FC<PreloaderProps> = ({ onComplete }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textGroupRef = useRef<SVGTextElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {

                },
            });




            const textEl = textGroupRef.current;
            if (textEl) {
                const length = textEl.getComputedTextLength();

                gsap.set(textEl, {
                    strokeDasharray: length,
                    strokeDashoffset: length,
                    fill: "transparent",
                    stroke: "#1a1a1a",
                    strokeWidth: 1.5, // Standard width for clarity
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    opacity: 1
                });


                tl.to(textEl, {
                    strokeDashoffset: 0,
                    duration: 3,
                    ease: "power1.inOut",
                });


                tl.to(textEl, {
                    fill: "#1a1a1a",
                    duration: 1,
                    ease: "power2.out"
                }, "-=1");
            }






            const htmlText = containerRef.current?.querySelector(".html-text") as HTMLElement;
            if (htmlText) {
                const split = new SplitType(htmlText, { types: "chars" });
                const chars = split.chars as HTMLElement[];


                const htmlTextRect = htmlText.getBoundingClientRect();
                const initialCenterX = window.innerWidth / 2;
                const initialCenterY = window.innerHeight / 2;





                const finalXFromCenter = -initialCenterX + TARGET_LEFT_X + (htmlTextRect.width * 0.25 / 2); // Scale 0.25 for mobile
                const finalYFromCenter = -initialCenterY + TARGET_TOP_Y;



                tl.add(() => {
                    if (svgRef.current) svgRef.current.style.opacity = "0";
                    htmlText.style.opacity = "1";
                    htmlText.style.pointerEvents = "auto";
                }, ">");



                tl.to(htmlText, {
                    scale: TARGET_SCALE, // Use TARGET_SCALE
                    duration: 1.2,
                    ease: "power3.inOut",
                    transformOrigin: "center center"
                }, "move");


                tl.to(chars, {
                    x: finalXFromCenter,
                    y: finalYFromCenter,
                    duration: 1.2,
                    ease: "power3.inOut",
                    stagger: 0.05
                }, "move");
            }






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
            className="fixed inset-0 z-[9999] overflow-hidden flex items-center justify-center p-0 m-0" // Increased Z-Index to cover Navbar
        >
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');
                `}
            </style>

            {/* Background Layer (Container for everything now) */}
            <div
                ref={bgRef}
                className="absolute inset-0 bg-[#f0f0f0]"
                style={{ clipPath: "circle(150% at 50% 50%)" }}
            >
                {/* HTML Text Overlay */}
                <div
                    className="html-text absolute z-60 text-center"
                    style={{
                        fontFamily: "'Great Vibes', cursive",
                        fontSize: "100px",
                        letterSpacing: "2px",
                        color: "#1a1a1a",
                        top: "50%",
                        left: "50%",
                        transform: `translate(calc(-50% + ${START_OFFSET_X}px), calc(-50% + ${START_OFFSET_Y}px)) scale(${START_SCALE})`,
                        whiteSpace: "nowrap",
                        opacity: 0,
                        pointerEvents: "none"
                    }}
                >
                    Chitkul Lakshya
                </div>

                {/* SVG Text Layer */}
                <svg
                    ref={svgRef}
                    viewBox="0 0 800 400"
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
                        Chitkul Lakshya
                    </text>
                </svg>
            </div>
        </div>
    );
};

export default MobilePreloader;
