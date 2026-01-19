import { useRef, useLayoutEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import SplitType from "split-type";
import TextReveal from "./TextReveal";

const px = (value: number) => `${value / 16}rem`; // convert px→rem

// ==================================================================================
// CONFIGURATION: ZOOM LEVEL
// Adjust this value to scale the entire component! (e.g., 0.9 = 90%)
// ==================================================================================
const ZOOM_LEVEL = 0.9;

// ==================================================================================
// CONFIGURATION: IMAGE POSITIONING
// ==================================================================================
const IMG_URL = "/image/pro.webp";
const IMG_OFFSET_X = "0px"; // Move Left/Right (e.g. "0px", "50px", "-100px")
const IMG_OFFSET_Y = "-550px"; // Move Up/Down (e.g. "0px", "-50px", "100px")
const IMG_SCALE = 0.7;    // Zoom level of the image

// ==================================================================================
// CONFIGURATION: TEXT POSITIONING (All values in PX relative to center/hero container)
// ==================================================================================
// Group A: "Hey I'm"
const POS_HEY_IM_X = 150;
const POS_HEY_IM_Y = -370;

// Group A: "LAKSHYA"
const POS_LAKSHYA_X = 150;
const POS_LAKSHYA_Y = -300;

// Group B: "WEB & APP" (Top Right)
const POS_WEB_APP_TOP_X = 1060;
const POS_WEB_APP_TOP_Y = 180;

// Group C: "WEB & APP DEVELOPER" (Bottom Left)
const POS_WEB_APP_BOTTOM_X = 120;
const POS_WEB_APP_BOTTOM_Y = 600;

// Bio Text (Right aligned)
const POS_BIO_RIGHT = 50;
const POS_BIO_TOP = 400;

// Bio Text (Bottom Left)
const POS_BIO_LEFT_X = 70;
const POS_BIO_BOTTOM_Y = -120;

const Ubuntu = ({ isLoading = false }: { isLoading?: boolean }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lakshyaTextRef = useRef<HTMLDivElement>(null);

    const { scrollY } = useScroll();

    useLayoutEffect(() => {
        console.log("Running Ubuntu Display (Ubuntu.tsx)");
    }, []);

    const yA = useTransform(scrollY, [0, 800], [0, -300]);
    const opacityA = useTransform(scrollY, [0, 300], [1, 0]); // Fade out Group A
    const yB = useTransform(scrollY, [0, 800], [0, 150]);
    const opacityB = useTransform(scrollY, [0, 300], [1, 0]); // Fade out Group B
    const opacityC = useTransform(scrollY, [0, 400], [1, 0]);

    const letterSpacingBio = useTransform(scrollY, [0, 400], ["0px", "20px"]);
    const filterBio = useTransform(scrollY, [0, 400], ["blur(0px)", "blur(5px)"]);

    useLayoutEffect(() => {
        if (isLoading) return;

        let ctx = gsap.context(() => {
            if (lakshyaTextRef.current) {
                const splitLakshya = new SplitType(lakshyaTextRef.current, { types: 'chars' });
                gsap.set(lakshyaTextRef.current, { perspective: 400, opacity: 1 });
                gsap.from(splitLakshya.chars, {
                    duration: 1.5,
                    y: 100,
                    rotationX: -90,
                    opacity: 0,
                    stagger: 0.1,
                    ease: "back.out(1.7)", // Bouncy flip feel
                    transformOrigin: "50% 50% -50", // Pivot point
                    // delay: 0.2 // REMOVED for immediate start
                });
            }

        }, containerRef);
        return () => ctx.revert();
    }, [containerRef, isLoading]);

    // Framer Motion Variants for 3D Flutter
    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.03,
                delayChildren: 0.1
            }
        }
    };

    const letterVariants = {
        hidden: {
            opacity: 0,
            rotateY: -90,
            x: -50,
            transformOrigin: "left"
        },
        visible: {
            opacity: 1,
            rotateY: 0,
            x: 0,
            transition: {
                type: "spring" as const,
                stiffness: 80,
                damping: 12
            }
        }
    };

    // Helper to split text into characters
    const AnimatedText = ({ text, className = "" }: { text: string, className?: string }) => (
        <span className={`inline-block whitespace-wrap ${className}`}>
            {text.split(" ").map((word, i) => (
                <span key={i} className="inline-block whitespace-nowrap mr-[0.25em]">
                    {word.split("").map((char, j) => (
                        <motion.span
                            key={j}
                            variants={letterVariants}
                            className="inline-block"
                            style={{ backfaceVisibility: 'hidden' }} // Cleaner 3D rendering
                        >
                            {char}
                        </motion.span>
                    ))}
                </span>
            ))}
        </span>
    );

    return (
        <section
            ref={containerRef}
            id="home"
            className="min-h-screen flex items-center justify-center pt-20 px-4 relative"
        >
            {/* Hero Box - Removed overflow-hidden to allow free positioning */}
            <div
                className={`w-full max-w-7xl mx-auto rounded-lg relative flex items-center justify-center transition-opacity duration-1000 ease-in-out ${isLoading ? "opacity-0" : "opacity-100"}`}
                style={{
                    backgroundColor: "transparent",
                    minHeight: "80vh",
                    width: "100vw",
                    marginLeft: "calc(50% - 50vw)",
                    marginRight: "calc(50% - 50vw)",
                    transform: `scale(${ZOOM_LEVEL})`,
                }}
            >
                <div className="relative w-full h-full">

                    {/* MAIN IMAGE - Wrapped for Scroll Animation */}
                    <motion.div style={{ y: yA, opacity: opacityA }} className="absolute inset-0 pointer-events-none z-0">
                        <img
                            src={IMG_URL}
                            alt="Background"
                            className="absolute max-w-none"
                            style={{
                                left: "50%",
                                top: "0px",
                                transform: `translate(calc(-50% + ${IMG_OFFSET_X}), ${IMG_OFFSET_Y}) scale(${IMG_SCALE})`,
                                width: "100vw", // Ensure it covers width
                                height: "auto",
                                minHeight: "80vh",
                            }}
                        />
                    </motion.div>

                    {/* Group A: Badge + Hey I'm (Moves Upward) */}
                    <motion.div style={{ y: yA, opacity: opacityA }} className="absolute inset-0 pointer-events-none">


                        <div
                            className="absolute flex items-center gap-2 px-4 py-2 bg-black/20 rounded-full w-fit scale-1 custom-pointer-events-auto"
                            style={{
                                top: px(150),
                                left: px(60),
                                pointerEvents: "auto"
                            }}
                        >
                            <div className="w-2 h-2 bg-black rounded-full"></div>
                            <span className="text-sm text-black font-medium">
                                Available for new opportunities
                            </span>
                        </div>

                        <div
                            className="absolute text-black flex gap-4"
                            style={{
                                fontFamily: "cursive",
                                fontStyle: "italic",
                                fontWeight: "200",
                                top: px(POS_HEY_IM_Y),
                                left: px(POS_HEY_IM_X),
                                fontSize: px(70),
                                transform: "scaleX(1.0)",
                                transformOrigin: "left",
                            }}
                        >
                            <span className={`inline-block ${!isLoading ? "animate-slide-in-left" : "opacity-0"}`}>Hey,</span>
                            <span className={`inline-block ${!isLoading ? "animate-slide-in-right" : "opacity-0"}`}>I'm</span>
                        </div>

                        {/* LAKSHYA (GSAP Animation) */}
                        <div className="absolute font-sixcaps text-black">
                            <div
                                className="font-black"
                                style={{
                                    top: px(POS_LAKSHYA_Y),
                                    left: px(POS_LAKSHYA_X),
                                    fontSize: px(200),
                                    position: "absolute",
                                    width: px(800),
                                    overflow: "hidden" // Mask wrapper
                                }}
                            >
                                <div ref={lakshyaTextRef} style={{ opacity: 0 }}>LAKSHYA</div>
                            </div>
                        </div>
                    </motion.div>


                    {/* Group B: WEB & APP + Description (Moves Downward) */}
                    <motion.div style={{ y: yB, opacity: opacityB }} className="absolute inset-0 pointer-events-none">

                        {/* WEB & APP DEVELOPER Top Right (Horizontal Scroll) */}
                        <div className="absolute font-sixcaps text-black">
                            <div
                                className="font-black"
                                style={{
                                    top: px(POS_WEB_APP_TOP_Y),
                                    left: px(POS_WEB_APP_TOP_X),
                                    fontSize: px(100),
                                    position: "absolute",
                                    lineHeight: "1",
                                    width: px(100000),
                                }}
                            >
                                <TextReveal text="WEB & APP" trigger={!isLoading} />
                                <TextReveal text="DEVELOPER" delay={0.2} trigger={!isLoading} />
                            </div>
                        </div>


                    </motion.div>


                    <motion.div style={{ y: yA, opacity: opacityC }} className="absolute inset-0 pointer-events-none">
                        <div
                            className="absolute text-black font-light leading-relaxed"
                            style={{
                                bottom: px(POS_BIO_BOTTOM_Y),
                                left: px(POS_BIO_LEFT_X),
                                width: px(500),
                                fontSize: px(17),
                                perspective: "1000px" // 3D Perspective
                            }}
                        >
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate={!isLoading ? "visible" : "hidden"}
                            >
                                <div className="leading-relaxed">
                                    <AnimatedText text="I’m a passionate" />
                                    <b className="font-bold"><AnimatedText text="UI/UX Designer" /></b>
                                    <AnimatedText text="who loves crafting" />
                                    <br />
                                    <AnimatedText text="modern, user-friendly web and app interfaces." />
                                    <br />
                                    <AnimatedText text="I enjoy building interactive digital websites" />
                                    <br />
                                    <AnimatedText text="exploring new creative tools" />
                                    <AnimatedText text="that push" />
                                    <br />
                                    <AnimatedText text="design and technology together." />
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section >
    );
};

export default Ubuntu;
