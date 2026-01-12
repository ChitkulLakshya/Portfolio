import { useEffect, useState } from "react";
import HeroMobile from "./HeroMobile";

const px = (value: number) => `${value / 16}rem`; // convert px→rem

export const HeroDesktop = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 px-4 relative"
    >
      {/* Hero Box */}
      <div
        className="w-full max-w-7xl mx-auto rounded-lg overflow-hidden relative flex items-center justify-center"
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

          {/* Availability Badge */}
          <div
            className="absolute flex items-center gap-2 px-4 py-2 bg-black/20 rounded-full w-fit scale-1"
            style={{
              top: px(150),
              left: px(60),
            }}
          >
            <div className="w-2 h-2 bg-black rounded-full"></div>
            <span className="text-sm text-black font-medium">
              Available for new opportunities
            </span>
          </div>

          {/* Hey I'm */}
          <div
            className="absolute text-black"
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
            Hey, I'm
          </div>

          {/* MAIN TITLES */}
          <div className="absolute font-sixcaps text-black">

            {/* WEB & APP DEVELOPER Top Right */}
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

            {/* LAKSHYA */}
            <div
              className="font-black"
              style={{
                top: px(-300),
                left: px(150),
                fontSize: px(200),
                position: "absolute",
                width: px(500),
              }}
            >
              LAKSHYA
            </div>
          </div>

          {/* AI TOOLS */}
          <div
            className="absolute text-white font-light text-right"
            style={{
              fontFamily: "cursive",
              position: "absolute",
              top: px(50),
              right: px(220),
              fontSize: px(60),
              width: px(100),
              whiteSpace: "nowrap",
            }}
          >
            AI TOOLS
          </div>

          {/* Specialization Text */}
          <div
            className="absolute text-right"
            style={{
              top: px(400),
              right: px(50),
              width: px(300),
            }}
          >
            <p
              className="text-black font-light leading-relaxed"
              style={{
                fontSize: px(16),
              }}
            >
              Specialized in Web Development,
              <br />
              React, Next.js, and Front
              <br />
              End Development.
            </p>
          </div>

          {/* NEW WEB & APP DEVELOPER */}
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

          {/* About Text */}
          <div
            className="absolute text-black font-light leading-relaxed"
            style={{
              bottom: px(-120),
              left: px(70),
              width: px(500),
              fontSize: px(18),
            }}
          >
            <p>
              I’m a passionate <b>UI/UX Designer</b> who loves crafting
              <br /> modern, user-friendly web and app interfaces.
              <br />
              I enjoy building interactive digital websites
              <br /> exploring new creative tools
              that push
              <br /> design and technology together.
            </p>
          </div>

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
