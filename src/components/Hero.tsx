import { useEffect, useState } from "react";
import HeroMobile from "./HeroMobile";

const px = (value: number) => `${value / 16}rem`; // convert px→rem

import { useRef, useLayoutEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import SplitType from "split-type";

export const HeroDesktop = ({ isLoading = false }: { isLoading?: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lakshyaTextRef = useRef<HTMLDivElement>(null);

  const { scrollY, scrollYProgress } = useScroll();

  // Parallax effects
  const yA = useTransform(scrollY, [0, 800], [0, -300]); // Moves up faster
  const yB = useTransform(scrollY, [0, 800], [0, 150]);  // Moves down slower

  const opacityC = useTransform(scrollY, [0, 400], [1, 0]); // Fades out

  // Scroll-linked letter spacing & blur
  const letterSpacingBio = useTransform(scrollY, [0, 400], ["0px", "20px"]);
  const filterBio = useTransform(scrollY, [0, 400], ["blur(0px)", "blur(5px)"]);

  useLayoutEffect(() => {
    if (isLoading) return;

    let ctx = gsap.context(() => {
      // 1. Lakshya Text Animation (3D Flip)
      if (lakshyaTextRef.current) {
        // Split text into characters
        const splitLakshya = new SplitType(lakshyaTextRef.current, { types: 'chars' });

        // Ensure parent has perspective for 3D effect AND is visible
        gsap.set(lakshyaTextRef.current, { perspective: 400, opacity: 1 });

        // Animate characters
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
        staggerChildren: 0.03, // Faster stagger for text
        delayChildren: 0.1 // Start almost immediately after load
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
      {/* Hero Box */}
      <div
        className={`w-full max-w-7xl mx-auto rounded-lg overflow-hidden relative flex items-center justify-center transition-opacity duration-1000 ease-in-out ${isLoading ? "opacity-0" : "opacity-100"}`}
        style={{
          backgroundImage: "url('/image/pro.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center top",
          backgroundSize: "cover",
          backgroundColor: "transparent",
          minHeight: "80vh",
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
          marginRight: "calc(50% - 50vw)",
        }}
      >
        <div className="relative w-full h-full">

          {/* Group A: Badge + Hey I'm (Moves Upward) */}
          <motion.div style={{ y: yA }} className="absolute inset-0 pointer-events-none">

            {/* Availability Badge */}
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

            {/* Hey I'm (Split Animation) */}
            <div
              className="absolute text-black flex gap-4"
              style={{
                fontFamily: "cursive",
                fontStyle: "italic",
                fontWeight: "200",
                top: px(-350),
                left: px(150),
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
                  top: px(-300),
                  left: px(150),
                  fontSize: px(200),
                  position: "absolute",
                  width: px(500),
                  overflow: "hidden" // Mask wrapper
                }}
              >
                <div ref={lakshyaTextRef} style={{ opacity: 0 }}>LAKSHYA</div>
              </div>
            </div>
          </motion.div>


          {/* Group B: WEB & APP + Description (Moves Downward) */}
          <motion.div style={{ y: yB }} className="absolute inset-0 pointer-events-none">

            {/* WEB & APP DEVELOPER Top Right (Horizontal Scroll) */}
            <div className="absolute font-sixcaps text-black">
              <div
                className="font-black"
                style={{
                  top: px(160),
                  left: px(1020),
                  fontSize: px(100),
                  position: "absolute",
                  lineHeight: "1",
                  width: px(100000),
                }}
              >
                WEB & APP
                <br />
                DEVELOPER
              </div>
            </div>

            {/* NEW WEB & APP DEVELOPER Bottom */}
            <div
              className="absolute font-sixcaps font-bold leading-tight"
              style={{
                top: px(600),
                left: px(120),
                width: px(600),
                fontSize: px(80),
                textAlign: "left",
                color: "white",
                textShadow: "3px 3px 10px rgba(0,0,0,0.6)",
                zIndex: 20,
              }}
            >
              WEB & APP
              <br />
              DEVELOPER
            </div>
          </motion.div>

          {/* Full Stack Developer Text (Independent of Group C Fade) */}
          <div
            className="absolute text-right"
            style={{
              top: px(400),
              right: px(50),
              width: px(350),
            }}
          >
            <motion.p
              className="text-black font-light leading-relaxed"
              style={{
                fontSize: px(18),
                fontWeight: 500,
                letterSpacing: letterSpacingBio,
                filter: filterBio
              }}
            >
              Full Stack Developer
              <br />
              Passionate about
              <br />
              building digital solutions
            </motion.p>
          </div>

          {/* Group C: Fading Text */}
          <motion.div style={{ opacity: opacityC }} className="absolute inset-0 pointer-events-none">



            {/* About Text */}
            <div
              className="absolute text-black font-light leading-relaxed"
              style={{
                bottom: px(-120),
                left: px(70),
                width: px(500),
                fontSize: px(18),
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
    </section>
  );
};

const Hero = () => {
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <HeroMobile /> : <HeroDesktop />;
};

export default Hero;
