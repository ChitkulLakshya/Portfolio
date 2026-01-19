import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const About = () => {
  return (
    <section
      id="about"
      className="py-32 px-4 border-t border-black/10 relative"
      style={{ backgroundColor: '#D3D3D3' }}
    >
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-8 px-4 overflow-hidden">
          <h2 className="text-5xl md:text-7xl font-light text-black leading-tight">
            <span className="block whitespace-nowrap">Full Stack Developer</span>
            <span className="block font-normal whitespace-nowrap my-2">Passionate about</span>
            <span className="block whitespace-nowrap">building digital solutions</span>
          </h2>
          <p className="text-black text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            I create modern web applications with cutting-edge technologies, specializing in React, Next.js, and AI integration to deliver innovative solutions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
