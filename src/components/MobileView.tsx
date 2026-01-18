import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { motion, useScroll, useTransform } from "framer-motion";
import SplitType from "split-type";
import TextReveal from "@/components/TextReveal"; // Import TextReveal

import About from "@/components/About";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

const MobileView = ({ isLoading = false }: { isLoading?: boolean }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const isDarkPage = location.pathname === "/get-in-touch" || location.pathname === "/certificates" || location.pathname === "/resume";

    const LOGO_TEXT = "Chitkul Lakshya";
    const LOGO_SIZE = "text-3xl";


    const BIO_POSITION_TOP = "-95px";      // Vertical Position
    const BIO_POSITION_LEFT = "195px";     // Horizontal Position
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

    const containerRef = useRef<HTMLDivElement>(null);
    const lakshyaTextRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    useLayoutEffect(() => {
        if (isLoading) return; // Wait until preloader is done

        let ctx = gsap.context(() => {
            // Ensure element exists before animating
            if (lakshyaTextRef.current) {
                const splitLakshya = new SplitType(lakshyaTextRef.current, { types: 'chars' });

                gsap.set(lakshyaTextRef.current, { perspective: 400, opacity: 1, autoAlpha: 1 });

                // Animate characters
                gsap.from(splitLakshya.chars, {
                    duration: 1.5,
                    y: 100,
                    rotationX: -90,
                    opacity: 0,
                    stagger: 0.1,
                    ease: "back.out(1.7)",
                    transformOrigin: "50% 50% -50",
                });
            }
        }, containerRef); // Scope to container

        return () => ctx.revert(); // Cleanup
    }, [containerRef, isLoading]);



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
        <div className="min-h-screen overflow-x-hidden pb-20" style={{ backgroundColor: '#D3D3D3' }}>
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
                        <img
                            src="/image/profile.webp"
                            alt="Chitkul Lakshya"
                            style={{
                                position: "absolute",
                                top: "10%",
                                left: "50%",
                                transform: "translateX(-50%)",
                                width: "100%", // Full width
                                maxWidth: "none", // Allow exceeding standard limits if needed
                                height: "auto",
                                objectFit: "contain",
                                pointerEvents: "none",
                                zIndex: 5,
                            }}
                        />

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

                                <div
                                    className="absolute text-black flex gap-3 custom-pointer-events-auto"
                                    style={{
                                        fontFamily: "cursive",
                                        fontStyle: "normal",
                                        fontWeight: "200",
                                        top: HEY_IM_POSITION_TOP,
                                        left: HEY_IM_POSITION_LEFT,
                                        fontSize: HEY_IM_FONT_SIZE,
                                        letterSpacing: "5px",
                                        width: "fit-content",
                                        pointerEvents: "auto"
                                    }}
                                >
                                    <span className={cn("inline-block opacity-0", !isLoading && "animate-slide-in-left")}>Hey</span>
                                    <span className={cn("inline-block opacity-0", !isLoading && "animate-slide-in-right")}>I'm</span>
                                </div>
                            </motion.div>

                            {/* Group B: Name + Title (Moves Downward 0.2x) */}
                            <motion.div style={{ y: yB }} className="absolute inset-0 pointer-events-none">
                                <div className="absolute font-sixcaps text-black">
                                    <div
                                        className="font-black"
                                        style={{
                                            top: LAKSHYA_POSITION_TOP,
                                            left: LAKSHYA_POSITION_LEFT,
                                            transform: LAKSHYA_TRANSFORM,
                                            fontSize: LAKSHYA_FONT_SIZE,
                                            position: "absolute",
                                            width: "min(500px, 90vw)",
                                            maxWidth: "100%",
                                            overflow: "visible",
                                            textAlign: "center",
                                            whiteSpace: "nowrap"
                                        }}
                                    >
                                        {/* Use a wrapper to target split types chars if needed, but whiteSpace usually handles it */}
                                        <div ref={lakshyaTextRef} className="inline-block">LAKSHYA</div>
                                        <style>{`
                                            .char { display: inline-block; } 
                                        `}</style>
                                    </div>
                                </div>

                                <div
                                    className="absolute font-sixcaps font-bold leading-tight"
                                    style={{
                                        top: "-165px",
                                        left: "495px",
                                        transform: "translateX(-50%)",
                                        width: "min(600px, 85vw)",
                                        maxWidth: "100%",
                                        fontSize: "40px",
                                        textAlign: "left",
                                        color: "black",
                                        lineHeight: "1.0",
                                        zIndex: 20,
                                    }}
                                >
                                    {/* Using TextReveal for parity with Desktop Hero */}
                                    {/* Splitting logic might be needed or just one block */}
                                    <TextReveal text="WEB & APP" trigger={!isLoading} />
                                    <TextReveal text="DEVELOPER" trigger={!isLoading} delay={0.2} />
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

                <Skills />
                <About />
                <Services />
                <Contact />
            </main>
            <Footer />
            <BottomNav />
        </div>
    );
};

export default MobileView;
