
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ParallaxHero = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    // Element A: Moves upward at 0.5x speed
    // as user scrolls down (scrollY increases), y becomes negative (moves up)
    const yA = useTransform(scrollY, [0, 1000], [0, -500]);

    // Element B: Moves downward at 0.2x speed
    // as user scrolls down, y becomes positive (moves down)
    const yB = useTransform(scrollY, [0, 1000], [0, 200]);

    // Element C: Fades out completely by 300px
    const opacityC = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section
            ref={containerRef}
            className="relative min-h-[150vh] flex flex-col items-center pt-20 overflow-hidden bg-[#D3D3D3]"
        >
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
                {/* Grid or background decoration can go here */}
            </div>

            <div className="relative w-full max-w-7xl mx-auto h-[80vh] flex items-center justify-center">

                {/* Element B: Background / Slow Moving (0.2x Downward) */}
                <motion.div
                    style={{ y: yB }}
                    className="absolute inset-0 flex items-center justify-center z-0"
                >
                    <h1 className="text-[20vw] font-sixcaps text-white/80 leading-none select-none">
                        LAKSHYA
                    </h1>
                </motion.div>

                {/* Element A: Foreground / Fast Moving (0.5x Upward) */}
                <motion.div
                    style={{ y: yA }}
                    className="relative z-10 flex flex-col items-center"
                >
                    <div className="relative w-64 h-64 md:w-96 md:h-96 bg-black rounded-lg overflow-hidden shadow-2xl mb-8">
                        {/* Placeholder for Profile Image */}
                        <img
                            src="/image/pro.webp"
                            alt="Profile"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://placehold.co/400x400/1a1a1a/white?text=Me";
                            }}
                        />
                    </div>
                    <h2 className="text-6xl md:text-8xl font-sixcaps text-black mix-blend-multiply">
                        WEB DEVELOPER
                    </h2>
                </motion.div>

                {/* Element C: Fades out (Opacity -> 0) */}
                <motion.div
                    style={{ opacity: opacityC }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
                >
                    <span className="text-black font-medium tracking-widest text-sm uppercase">Scroll to Explore</span>
                    <div className="w-[1px] h-12 bg-black/50"></div>
                </motion.div>

                {/* Additional Decor/Label for Element names as per prompt */}
                <div className="absolute top-10 left-10 p-4 border border-black/10 rounded text-xs text-black/50 font-mono hidden md:block">
                    <p>Element A (Profile/Title): Up 0.5x</p>
                    <p>Element B (Background Name): Down 0.2x</p>
                    <p>Element C (Scroll Hint): Fade out 300px</p>
                </div>

            </div>

            {/* Spacer to allow scrolling to see the effect */}
            <div className="h-screen w-full flex items-center justify-center bg-white/50 backdrop-blur-sm z-30">
                <p className="text-xl font-light">Content continues here...</p>
            </div>
        </section>
    );
};

export default ParallaxHero;
