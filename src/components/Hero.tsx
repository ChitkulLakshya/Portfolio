import { useEffect, useState } from "react";
import HeroMobile from "./HeroMobile";

const HeroDesktop = () => {
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
              top: "9.375rem",   // 150px
              left: "3.75rem"    // 60px
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
              top: "-21.875rem",  // -350px
              left: "11.875rem",  // 190px
              fontSize: "5rem",   // 80px
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
                top: "10rem",        // 160px
                left: "63.75rem",    // 1020px
                fontSize: "6.25rem", // 100px
                position: "absolute",
                lineHeight: "1",
                width: "6250rem",    // 100000px
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
                top: "-18.75rem",   // -300px
                left: "9.375rem",   // 150px
                fontSize: "12.5rem", // 200px
                position: "absolute",
                width: "31.25rem",   // 500px
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
              top: "3.125rem",     // 50px
              right: "13.75rem",   // 220px
              fontSize: "4.375rem", // 70px
              width: "6.25rem",     // 100px
              whiteSpace: "nowrap",
            }}
          >
            AI TOOLS
          </div>

          {/* Specialization Text */}
          <div
            className="absolute text-right"
            style={{
              top: "25rem",     // 400px
              right: "3.125rem", // 50px
              width: "18.75rem", // 300px
            }}
          >
            <p
              className="text-black font-light leading-relaxed"
              style={{
                fontSize: "1rem", // 16px
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
              top: "37.5rem",      // 600px
              left: "7.5rem",      // 120px
              width: "37.5rem",    // 600px
              fontSize: "5rem",    // 80px
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
              bottom: "-7.5rem",   // -120px
              left: "4.375rem",    // 70px
              width: "31.25rem",   // 500px
              fontSize: "1.125rem", // 18px
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
