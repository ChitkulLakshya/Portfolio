import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 px-4 relative"
    >
      {/* Hero Box with Full Image Background */}
      <div
        className="w-full max-w-7xl mx-auto rounded-lg overflow-hidden relative flex items-center justify-center"
        style={{
          backgroundImage: "url('/image/pro.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center top",
          backgroundSize: "contain",
          backgroundColor: "#D3D3D3",
          minHeight: "80vh",
        }}
      >
        {/* Content Container */}
        <div className="relative w-full h-full">
          {/* Availability Badge */}
          <div className="absolute top-[150px] left-[60px] flex items-center gap-2 px-4 py-2 bg-black/20 rounded-full w-fit">
            <div className="w-2 h-2 bg-black rounded-full"></div>
            <span className="text-sm text-black font-medium">
              Available for new opportunities
            </span>
          </div>

          {/* Greeting - Left Part (Cursive) */}
          <div
            className="absolute text-black"
            style={{
              fontFamily: "cursive",
              fontStyle: "italic",
              fontWeight: "200",
              top: "-350px",
              left: "190px",
              fontSize: "80px",
              transform: "scaleX(1.0)",
              transformOrigin: "left",
            }}
          >
            Hey, I'm
          </div>

          {/* Main Title - I AM LAKSHYA */}
          <div className="absolute font-sixcaps text-black">
            <div
              className="font-black"
              style={{
                top: "160px",
                left: "1020px",
                fontSize: "100px",
                position: "absolute",
                lineHeight: "1",
                width: "100000px",
              }}
            >
              WEB & APP
            <br />
            DEVELOPER
            </div>
            <div
              className="font-black"
              style={{
                top: "-300px",
                left: "150px",
                fontSize: "200px",
                position: "absolute",
                width: "500px",
              }}
            >
              LAKSHYA
            </div>
          </div>

          {/* Greeting - Right Part (Cursive) */}
          <div
            className="absolute text-white font-light text-right"
            style={{
              fontFamily: "cursive",
              top: "-200px",
              right: "50px",
              fontSize: "90px",
            }}
          >
            there
          </div>

          {/* Specialization Text */}
          <div
            className="absolute text-right"
            style={{
              top: "400px",
              right: "50px",
              width: "300px",
            }}
          >
            <p
              className="text-black font-light leading-relaxed"
              style={{
                fontSize: "16px",
              }}
            >
              Specialized in Web Development,
              <br />
              React, Next.js, and Front
              <br />
              End Development.
            </p>
          </div>

          {/* ✅ New Visible "WEB & APP DEVELOPER" Title */}
          <div
            className="absolute font-sixcaps font-bold leading-tight"
            style={{
              position: "absolute",
              top: "600px", // move up/down if needed
              left: "120px",
              width: "600px",
              fontSize: "80px",
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

          {/* ✅ New Description / About Text */}
          <div
            className="absolute text-black font-light leading-relaxed"
            style={{
              bottom: "-120px",
              left: "70px",
              width: "500px",
              fontSize: "18px",
            }}
          >
            <p>
              I’m a passionate <b>UI/UX Designer</b> who loves crafting modern,
              user-friendly web and app interfaces. I enjoy 
              <br />
              building interactive digital experiences and 
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

export default Hero;
