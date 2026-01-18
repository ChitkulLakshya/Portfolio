import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useLayoutEffect } from "react";
import gsap from "gsap";

const HeroMobile = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lakshyaTextRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  useEffect(() => {
    // Basic cleanup logic if needed, but we use useLayoutEffect for GSAP
  }, []);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Ensure element exists before animating
      if (lakshyaTextRef.current) {
        console.log("HeroMobile: animating LAKSHYA text");

        // Use a timeline for robustness
        const tl = gsap.timeline();

        // Start from hidden/offset state
        tl.set(lakshyaTextRef.current, { yPercent: 100, autoAlpha: 1 })
          .to(lakshyaTextRef.current, {
            yPercent: 0,
            duration: 1.5,
            ease: "power4.out",
            delay: 0.2 // Small delay to allow layout stability
          });
      }
    }, containerRef); // Scope to container

    return () => ctx.revert(); // Cleanup
  }, [containerRef]);

  // Element A: Moves upward at 0.5x speed (y becomes negative as scrollY increases)
  const yA = useTransform(scrollY, [0, 500], [0, -250]);

  // Element B: Moves downward at 0.2x speed (y becomes positive)
  const yB = useTransform(scrollY, [0, 500], [0, 100]);

  // Element C: Fades out linearly by 300px
  const opacityC = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 relative overflow-x-hidden" // Removed px-4 for full width
    >
      <div
        className="w-full relative flex items-center justify-center overflow-hidden" // Removed rounded-lg
        style={{
          backgroundColor: "transparent",
          minHeight: "80vh",
          maxWidth: "100%",
          width: "100%",
        }}
      >
        <img
          src="/image/pro.webp"
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
                top: "-260px",
                left: "17px",
                fontSize: "clamp(20px, 8vw, 29px)",
                letterSpacing: "5px",
                width: "fit-content",
                pointerEvents: "auto"
              }}
            >
              <span className="animate-slide-in-left opacity-0 inline-block">Hey</span>
              <span className="animate-slide-in-right opacity-0 inline-block">I'm</span>
            </div>
          </motion.div>

          {/* Group B: Name + Title (Moves Downward 0.2x) */}
          <motion.div style={{ y: yB }} className="absolute inset-0 pointer-events-none">
            <div className="absolute font-sixcaps text-black">
              <div
                className="font-black"
                style={{
                  top: "-240px",
                  left: "70%",
                  transform: "translateX(-50%)",
                  fontSize: "70px",
                  position: "absolute",
                  width: "min(500px, 90vw)",
                  maxWidth: "100%",
                  overflow: "hidden" // Mask container
                }}
              >
                <div ref={lakshyaTextRef}>LAKSHYA</div>
              </div>
            </div>

            <div
              className="absolute font-sixcaps font-bold leading-tight"
              style={{
                top: "-165px",
                left: "125%",
                transform: "translateX(-50%)",
                width: "min(600px, 85vw)",
                maxWidth: "100%",
                fontSize: "30px",
                textAlign: "left",
                color: "black",
                lineHeight: "1.0",
                zIndex: 20,
              }}
            >
              WEB & APP
              <br />
              DEVELOPER
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
                bottom: "70px",
                left: "-17px",
                width: "min(500px, 90vw)",
                maxWidth: "100%",
                fontSize: "11px",
                padding: "0 16px",
              }}
            >
              <p>
                I’m a passionate <b>UI/UX </b>
                <br /> Designer who loves crafting
                <br /> modern, user-friendly web
                <br /> and app interfaces.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroMobile;
