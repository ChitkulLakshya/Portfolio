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
          <div
            className="absolute top-[-350px] left-[50%] flex items-center gap-2 px-3 py-1.5 bg-black/20 rounded-full w-fit"
            style={{ transform: "translateX(-50%) scale(1.0)", maxWidth: "90vw" }}
          >
            <div className="w-2 h-2 bg-black rounded-full"></div>
            <span className="text-sm text-black font-medium">
              Available for new opportunities
            </span>
          </div>

          <div
            className="absolute text-black"
            style={{
              fontFamily: "cursive",
              fontStyle: "italic",
              fontWeight: "200",
              top: "-400px",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "clamp(40px, 15vw, 80px)",
              width: "fit-content",
            }}
          >
            Hey,
          </div>

          <div
            className="absolute text-black"
            style={{
              fontFamily: "cursive",
              fontStyle: "italic",
              fontWeight: "200",
              top: "-270px",
              left: "50%",
              transform: "translateX(-50%)",
              fontSize: "clamp(20px, 8vw, 40px)",
              letterSpacing: "5px",
              width: "fit-content",
            }}
          >
            I'm
          </div>

          <div className="absolute font-sixcaps text-black">
            <div
              className="font-black"
              style={{
                top: "-240px",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "clamp(40px, 15vw, 80px)",
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
              top: "-130px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "min(600px, 85vw)",
              maxWidth: "100%",
              fontSize: "clamp(24px, 5vw, 40px)",
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
              bottom: "40px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "min(500px, 90vw)",
              maxWidth: "100%",
              fontSize: "clamp(10px, 3vw, 12px)",
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
      </div>
    </section>
  );
};

export default HeroMobile;
