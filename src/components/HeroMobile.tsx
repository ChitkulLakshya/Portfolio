const HeroMobile = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 px-4 relative"
    >
      <div
        className="w-full max-w-7xl mx-auto rounded-lg relative flex items-center justify-center"
        style={{
          backgroundColor: "transparent",
          minHeight: "80vh",
          width: "100vw",
          marginLeft: "calc(50% - 50vw)",
          marginRight: "calc(50% - 50vw)",
          overflow: "visible",
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
            width: "750px",
            height: "auto",
            objectFit: "contain",
            pointerEvents: "none",
            zIndex: 5,
          }}
        />

        <div className="relative w-full h-full z-10">
          <div
            className="absolute top-[-350px] left-[260px] flex items-center gap-2 px-4 py-2 bg-black/20 rounded-full w-fit"
            style={{ transform: "scale(1.0)" }}
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
              left: "20px",
              fontSize: "80px",
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
              left: "20px",
              fontSize: "40px",
              letterSpacing: "5px",
            }}
          >
            I'm
          </div>

          <div className="absolute font-sixcaps text-black">
            <div
              className="font-black"
              style={{
                top: "-240px",
                left: "14px",
                fontSize: "90px",
                position: "absolute",
                width: "500px",
              }}
            >
              LAKSHYA
            </div>
          </div>

          <div
            className="absolute font-sixcaps font-bold leading-tight"
            style={{
              top: "-100px",
              left: "430px",
              width: "600px",
              fontSize: "40px",
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
              left: "20px",
              width: "500px",
              fontSize: "12px",
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
