import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-4 relative">
      {/* Hero Box with Background Image */}
      <div 
        className="w-full max-w-7xl mx-auto rounded-lg overflow-hidden relative"
        style={{
          backgroundColor: '#D3D3D3',
          minHeight: '80vh'
        }}
      >
        {/* Content Container */}
        <div className="relative w-full h-full">
          {/* Availability Badge */}
          <div 
            className="absolute top-[20px] left-[20px] flex items-center gap-2 px-4 py-2 bg-black/20 rounded-full w-fit"
          >
            <div className="w-2 h-2 bg-black rounded-full"></div>
            <span className="text-sm text-black font-medium">Available for new opportunities</span>
          </div>

          {/* Greeting - Left Part (Cursive) */}
          <div 
            className="absolute text-black font-light"
            style={{
              fontFamily: 'cursive',
              top: '100px',   // adjust vertical position
              left: '50px',   // adjust horizontal position
              fontSize: '90px', // adjust size
            }}
          >
            Hey,
          </div>

          {/* Main Title - I AM LAKSHYA (Six Caps) */}
          <div className="absolute font-sixcaps text-black">
            <div 
              className="font-black"
              style={{
                top: '200px',
                left: '50px',
                fontSize: '120px',
                position: 'absolute',
                width: '400px',
                height: 'auto',
              }}
            >
              I AM
            </div>
            <div 
              className="font-black"
              style={{
                top: '320px',
                left: '50px',
                fontSize: '150px',
                position: 'absolute',
                width: '500px',
                height: 'auto',
              }}
            >
              LAKSHYA
            </div>
          </div>

          {/* Greeting - Right Part (Cursive) */}
          <div 
            className="absolute text-white font-light text-right"
            style={{
              fontFamily: 'cursive',
              top: '100px',   // adjust vertical position
              right: '50px',  // adjust horizontal position
              fontSize: '90px', // adjust size
            }}
          >
            there
          </div>

          {/* Specialization Text */}
          <div 
            className="absolute text-right"
            style={{
              top: '400px',
              right: '50px',
              width: '300px',
              height: 'auto',
            }}
          >
            <p 
              className="text-black font-light leading-relaxed"
              style={{
                fontSize: '16px', // adjust paragraph size
              }}
            >
              Specialized in Web Development,
              <br />
              React, Next.js, and Front
              <br />
              End Development.
            </p>
            <div 
              className="font-sixcaps font-bold text-black leading-tight"
              style={{
                top: '500px',      // vertical position
                left: '50px',      // horizontal position
                width: '400px',    // container width
                height: '200px',   // container height
                fontSize: '80px',  // text size
                textAlign: 'left',
               // adjust main specialization size
              }}
            >
              WEB & APP
              <br />
              DEVELOPER
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
