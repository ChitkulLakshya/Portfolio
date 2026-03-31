
import { motion, useScroll, useTransform } from "framer-motion";
// Desktop hero text removed (Hey I'm / LAKSHYA / WEB & APP DEVELOPER).

const px = (value: number) => `${value / 16}rem`; // convert px→rem






const ZOOM_LEVEL = 0.7;




// Profile image removed (replaced by SplineHero layer)





const POS_HEY_IM_X = 150;
const POS_HEY_IM_Y = -370;


const POS_LAKSHYA_X = 450;
const POS_LAKSHYA_Y = -70;


const POS_WEB_APP_TOP_X = 1050;
const POS_WEB_APP_TOP_Y = 210;


const POS_BIO_LEFT_X = 70;
const POS_BIO_BOTTOM_Y = -120;


const Windows = ({ isLoading = false }: { isLoading?: boolean }) => {
    const { scrollY } = useScroll();

    const yA = useTransform(scrollY, [0, 800], [0, -300]);
    const opacityA = useTransform(scrollY, [0, 300], [1, 0]); // Fade out Group A
    const yB = useTransform(scrollY, [0, 800], [0, 150]);
    const opacityB = useTransform(scrollY, [0, 300], [1, 0]); // Fade out Group B
    const opacityC = useTransform(scrollY, [0, 400], [1, 0]);

    const letterSpacingBio = useTransform(scrollY, [0, 400], ["0px", "20px"]);
    const filterBio = useTransform(scrollY, [0, 400], ["blur(0px)", "blur(5px)"]);

    // Removed LAKSHYA / Hey I'm / WEB & APP animations.


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
    // Renders hero UI only. Section wrapper + 3D background owned by
    // <SplineScrollTrack> in DesktopView.tsx.
    // ──────────────────────────────────────────────────────────────────────────
    return (
        <div
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

export default Windows;
