import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const About = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Animate from expanded to normal as it scrolls into view
  // Range: Starts wide (10px) at 0.2, becomes normal (0px) at 0.5 (center)
  const letterSpacing = useTransform(scrollYProgress, [0.2, 0.5], ["10px", "0px"]);
  const opacity = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="about"
      className="py-32 px-4 border-t border-black/10"
      style={{ backgroundColor: '#D3D3D3' }}
    >
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-8 px-4 overflow-hidden">
          <motion.h2
            className="text-5xl md:text-7xl font-light text-black leading-tight"
            style={{
              letterSpacing,
              opacity
            }}
          >
            <span className="block whitespace-nowrap">Full Stack Developer</span>
            <span className="block font-normal whitespace-nowrap my-2">Passionate about</span>
            <span className="block whitespace-nowrap">building digital solutions</span>
          </motion.h2>
          <p className="text-black text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            I create modern web applications with cutting-edge technologies, specializing in React, Next.js, and AI integration to deliver innovative solutions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
