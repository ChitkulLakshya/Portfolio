const HeroMobile = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 px-4 relative overflow-x-hidden"
    >
      <div
        className="w-full rounded-lg relative flex items-center justify-center overflow-hidden"
        style={{
          backgroundColor: "transparent",
          minHeight: "80vh",
          maxWidth: "100%",
          width: "100%",
        }}
      >
        <img
          src="/image/profile.png"
          alt="Chitkul Lakshya"
          style={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "min(750px, 90vw)",
            maxWidth: "100%",
            height: "auto",
            objectFit: "contain",
            pointerEvents: "none",
            zIndex: 5,
          }}
        />

        <div className="relative w-full h-full z-10">

          {/* Available for new opportunities */}
          <div
            className="absolute flex items-center gap-2 px-3 py-1.5 bg-black/20 rounded-full w-fit"
            style={{
              top: "-350px",     // <-- move up/down
              left: "100px",      // <-- move left/right (FULL CONTROL)
              fontSize: "12px",  // <-- control text size
            }}
          >
            <div className="w-2 h-2 bg-black rounded-full"></div>
            <span className="text-black font-medium">
              Available for new opportunities
            </span>
          </div>

          <div
            className="absolute text-black"
            style={{
              fontFamily: "cursive",
              fontStyle: "normal",
              fontWeight: "200",
              top: "-260px",
              left: "17px",
              fontSize: "clamp(20px, 8vw, 29px)",
              letterSpacing: "5px",
              width: "fit-content",
            }}
          >
            I AM
          </div>

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
              }}
            >
              LAKSHYA
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

          <div
            className="absolute text-black font-light leading-relaxed"
            style={{
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
        </div>

        {/* ✅ THIS WAS MISSING — added now */}
      </div>
    </section>
  );
};

export default HeroMobile;
