
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

// Register the plugin
// Note: ScrambleTextPlugin is a Club GreenSock benefit. 
// If this throws an error, it means the plugin is not installed/licensed.
try {
    console.log("TextReveal: Registering plugin...");
    gsap.registerPlugin(ScrambleTextPlugin);
    console.log("TextReveal: Plugin registered");
} catch (e) {
    console.error("GSAP ScrambleTextPlugin error:", e);
}

import SplitType from "split-type";

interface TextRevealProps {
    text: string;
    className?: string;
    style?: React.CSSProperties;
    delay?: number; // Start offset
    trigger?: boolean; // Controls when animation starts
}

const TextReveal = ({ text, className = "", style = {}, delay = 0, trigger = true }: TextRevealProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current || !textRef.current) return;

        // Reset content for fresh split
        textRef.current.innerHTML = text;
        const split = new SplitType(textRef.current, { types: "chars" });
        const chars = split.chars as HTMLElement[]; // Array of DOM elements for each character

        // LOCK WIDTHS to prevent shaking during scramble
        if (chars) {
            chars.forEach(char => {
                const w = char.offsetWidth;
                char.style.width = `${w}px`;
                char.style.display = "inline-block";
                char.style.textAlign = "center"; // Center text within the fixed width
            });
        }

        const ctx = gsap.context(() => {
            if (!chars) return;

            // Set Initial State Immediately
            gsap.set(chars, {
                z: 500,
                rotationX: -90,
                opacity: 0,
                transformOrigin: "50% 50% -150px",
                y: -50
            });

            // Only run animation if triggered
            if (trigger) {
                // Animate each character individually
                gsap.to(chars,
                    {
                        delay: delay, // Global start delay
                        duration: 1.5,
                        z: 0,
                        rotationX: 0,
                        opacity: 1,
                        y: 0,
                        ease: "expo.out",
                        stagger: {
                            amount: 0.8, // Total time to spread starts across
                            from: "end"  // Right to Left
                        },
                        // We can use scrambleText on each char, but often it looks cleaner
                        // to just have the 3D fall. Let's try to KEEP scrambleText if possible,
                        // but ScrambleText on single chars usually just cycles chars.
                        // Let's rely on the TextPlugin 'text' or just the scramble effect on content?
                        // Actually, ScrambleTextPlugin replaces content.
                        // Let's try applying ScrambleText to each char to resolve to its ORIGINAL content.
                        // But SplitType chars contain the letter.
                        // We need to tell ScrambleText what the FINAL text is.
                        // Since 'chars' is an array, we can't easily pass the specific final char for EACH execution in a single tween
                        // UNLESS we use function-based values or a loop.
                        // Loop is safer for explicit target.
                    }
                );

                // Loop for ScrambleText content targeting (since simple tween can't map 'text' per element easily)
                chars.forEach((char, i) => {
                    const originalChar = char.textContent || "";
                    gsap.to(char, {
                        delay: delay + (chars.length - 1 - i) * (0.8 / chars.length), // Match stagger: from "end"
                        duration: 1.5,
                        ease: "expo.out",
                        scrambleText: {
                            text: originalChar,
                            chars: "upperCase",
                            speed: 0.1, // Slower speed = less shaking
                            revealDelay: 0.1,
                            tweenLength: false // Don't enforce length matching for single chars
                        }
                    });
                });
            }

        }, containerRef);

        return () => {
            ctx.revert();
            if (split) split.revert();
        };
    }, [text, delay, trigger]);

    return (
        <div
            ref={containerRef}
            className={className}
            style={{
                ...style,
                perspective: "1000px", // 3D Perspective required for fall-back effect
                transformStyle: "preserve-3d"
            }}
        >
            {/* Helper span to hold the text */}
            <div ref={textRef} className="will-change-transform will-change-filter block">
                {/* Initial placeholder content can be empty or anything, GSAP will replace it */}
            </div>
        </div>
    );
};

export default TextReveal;
