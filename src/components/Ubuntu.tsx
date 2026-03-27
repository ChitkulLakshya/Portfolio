import { useRef, useLayoutEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import SplitType from "split-type";
import TextReveal from "./TextReveal";

const px = (value: number) => `${value / 16}rem`; // convert px→rem





const ZOOM_LEVEL = 0.9;




// Profile image removed (replaced by Spline background layer)





const POS_HEY_IM_X = 150;
const POS_HEY_IM_Y = -370;


const POS_LAKSHYA_X = 150;
const POS_LAKSHYA_Y = -300;


const POS_WEB_APP_TOP_X = 1060;
const POS_WEB_APP_TOP_Y = 180;


const POS_WEB_APP_BOTTOM_X = 120;
const POS_WEB_APP_BOTTOM_Y = 600;


const POS_BIO_RIGHT = 50;
const POS_BIO_TOP = 400;


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

                });
            }

        }, containerRef);
        return () => ctx.revert();
    }, [containerRef, isLoading]);


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

    // ── HERO SLOT ──────────────────────────────────────────────────────────
    // This component renders the Hero UI content only.
    // The <section id="home"> wrapper and 3D background are handled by
    // <SplineScrollTrack> in DesktopView.tsx. Do NOT add a section or
    // position:relative wrapper here — SplineScrollTrack owns the layout.
    // pointer-events-none on motion wrappers, pointer-events-auto on actual
    // interactive elements (links, buttons) so scroll reaches the Spline canvas.
    // ──────────────────────────────────────────────────────────────────────────
    return (
        <div
            ref={containerRef}
            className={`w-full h-full relative transition-opacity duration-1000 ease-in-out ${isLoading ? "opacity-0" : "opacity-100"}`}
            style={{
                transform: `scale(${ZOOM_LEVEL})`,
                transformOrigin: "center center",
            }}
        >
            <div className="relative w-full h-full">

                    {/* Group A: Badge + Hey I'm (Moves Upward) */}
                    <motion.div className="absolute inset-0 pointer-events-none">


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
                    <motion.div className="absolute inset-0 pointer-events-none">

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


                    <motion.div className="absolute inset-0 pointer-events-none">
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
    );
};

export default Ubuntu;
