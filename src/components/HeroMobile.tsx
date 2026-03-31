import { motion, useScroll, useTransform } from "framer-motion";
 

const HeroMobile = () => {
  const { scrollY } = useScroll();


  const yA = useTransform(scrollY, [0, 500], [0, -250]);


  const yB = useTransform(scrollY, [0, 500], [0, 100]);


  const opacityC = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section
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
        <div className="relative w-full h-full z-10">

          {/* Group A: Badge + Hey I'm (Moves Upward 0.5x) */}
          <motion.div style={{ y: yA }} className="absolute inset-0 pointer-events-none">

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
