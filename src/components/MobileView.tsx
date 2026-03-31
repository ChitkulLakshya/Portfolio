import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

const MobileView = ({ isLoading = false }: { isLoading?: boolean }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isDarkPage = location.pathname === "/get-in-touch" || location.pathname === "/certificates" || location.pathname === "/resume";

    const LOGO_TEXT = "Chitkul Lakshya";
    const LOGO_SIZE = "text-3xl";




    const IMG_OFFSET_X = "0px"; // Move Left/Right (e.g. "0px", "50px", "-100px")
    const IMG_OFFSET_Y = "0px"; // Move Up/Down (e.g. "0px", "-50px", "100px")
    const IMG_SCALE = 0.9;    // Zoom level of the image


    const BIO_POSITION_TOP = "-72px";      // Vertical Position
    const BIO_POSITION_LEFT = "185px";     // Horizontal Position
    const BIO_TRANSFORM = "translate(-50%, -50%)"; // Center anchor. Change to "none" if you want exact x,y
    const BIO_WIDTH = "90vw";            // Width of text block
    const BIO_FONT_SIZE = "11px";        // Size of text
    const BIO_TEXT_ALIGN = "left";     // "center", "left", or "right"

    const LAKSHYA_POSITION_TOP = "-290px";   // Vertical Position
    const LAKSHYA_POSITION_LEFT = "10px";    // Horizontal Position
    const LAKSHYA_TRANSFORM = "translateX(-50%)"; // Center alignment offset
    const LAKSHYA_FONT_SIZE = "80px";        // Font Size

    const HEY_IM_POSITION_TOP = "-320px";    // Vertical Position
    const HEY_IM_POSITION_LEFT = "17px";     // Horizontal Position
    const HEY_IM_FONT_SIZE = "clamp(20px, 8vw, 29px)"; // Font Size

    const navigateHome = () => {
        if (location.pathname === "/") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            navigate("/");
            window.scrollTo({ top: 0 });
        }
    };

    const { scrollY } = useScroll();



    const yA = useTransform(scrollY, [0, 500], [0, -250]);
    const yB = useTransform(scrollY, [0, 500], [0, 100]);
    const opacityC = useTransform(scrollY, [0, 300], [1, 0]);


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
                            style={{ backfaceVisibility: 'hidden' }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </span>
            ))}
        </span>
    );


    return (
        <div className="min-h-screen overflow-x-hidden pb-20 bg-transparent">
            {/* LOGO */}
            <button
                onClick={navigateHome}
                className={cn(
                    "fixed top-6 left-6 z-50 font-script tracking-wide transition-opacity hover:opacity-80",
                    LOGO_SIZE,
                    isDarkPage ? "text-silver" : "mix-blend-difference text-white"
                )}
            >
                {LOGO_TEXT}
            </button>

            <main className="overflow-x-hidden">
                {/* HERO SECTION (INLINED) */}
                <section
                    ref={containerRef}
                    id="home"
                    className="min-h-screen flex items-center justify-center pt-20 relative overflow-x-hidden"
                >
                    <div
                        className={cn(
                            "w-full relative flex items-center justify-center overflow-hidden transition-opacity duration-1000 ease-in-out",
                            isLoading ? "opacity-0" : "opacity-100"
                        )}
                        style={{
                            backgroundColor: "transparent",
                            minHeight: "80vh",
                            maxWidth: "100%",
                            width: "100%",
                        }}
                    >
                        <div className="relative w-full h-full z-10">

                            {/* Group A: Badge + Hey I'm (Moves Upward 0.5x) */}
                            <motion.div style={{ y: yA }} className="absolute inset-0 pointer-events-none">
                                {/* Available for new opportunities */}
                                <div
                                    className="absolute flex items-center gap-2 px-3 py-1.5 bg-black/20 rounded-full w-fit custom-pointer-events-auto"
                                    style={{
                                        top: "-350px",
                                        left: "100px",
                                        fontSize: "12px",
                                        pointerEvents: "auto"
                                    }}
                                >
                                    <div className="w-2 h-2 bg-black rounded-full"></div>
                                    <span className="text-black font-medium">
                                        Available for new opportunities
                                    </span>
                                </div>

                            </motion.div>

                            {/* Group C: Bio (Fades out) */}
                            <motion.div
                                style={{ opacity: opacityC }}
                                className="absolute text-black font-light leading-relaxed"
                            >
                                <div
                                    style={{
                                        position: "absolute",
                                        top: BIO_POSITION_TOP,
                                        left: BIO_POSITION_LEFT,
                                        transform: BIO_TRANSFORM,
                                        width: BIO_WIDTH,
                                        maxWidth: "400px",
                                        fontSize: BIO_FONT_SIZE,
                                        lineHeight: "1.5",
                                        padding: "0",
                                        textAlign: BIO_TEXT_ALIGN as "center" | "left" | "right",
                                        zIndex: 50,
                                        perspective: "1000px"
                                    }}
                                >
                                    <motion.div
                                        variants={containerVariants}
                                        initial="hidden"
                                        animate={!isLoading ? "visible" : "hidden"}
                                    >
                                        <div className="leading-relaxed">
                                            <AnimatedText text="I’m a passionate" />
                                            <b className="font-bold"><AnimatedText text="UI/UX" /></b>
                                            <br />
                                            <AnimatedText text="Designer who loves crafting" />
                                            <br />
                                            <AnimatedText text="modern, user-friendly web " />
                                            <br />
                                            <AnimatedText text="and app interfaces. I enjoy" />
                                            <br />
                                            <AnimatedText text="building interactive digital websites " />
                                            <br />
                                            <AnimatedText text="exploring new creative" />
                                            <br />
                                            <AnimatedText text=" tools together" />
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>

                        </div>
                    </div>
                </section>

                <About />
                <Contact />
            </main>
            <Footer />
            <BottomNav />
        </div>
    );
};

export default MobileView;
