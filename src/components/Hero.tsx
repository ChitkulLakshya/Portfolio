import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section id="home" className="min-h-screen flex flex-col items-center justify-center pt-16 px-4 relative bg-black">
      <div className="container mx-auto max-w-5xl text-center space-y-8">
        {/* Small text above heading */}
        <div className="text-sm text-gray-400 uppercase tracking-wider">
          Projects x10+
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight text-white">
          Building digital
          <br />
          solutions that
          <br />
          <span className="font-normal">inspire</span>
        </h1>

        {/* GET IN TOUCH Button */}
        <div className="pt-8">
          <Button
            size="lg"
            className="bg-white text-black hover:bg-white/90 px-12 py-6 rounded-none text-sm uppercase tracking-wider font-light"
            onClick={() => navigate("/get-in-touch")}
          >
            GET IN TOUCH
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
