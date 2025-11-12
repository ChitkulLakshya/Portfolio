import { Github, Linkedin, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const GetInTouch = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#D3D3D3' }}>
      <Navbar />
      <section className="min-h-screen flex flex-col items-center justify-center pt-20 px-4">
        <div className="container mx-auto max-w-5xl text-center space-y-12">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-light leading-tight text-black">
            Let's Work
            <br />
            <span className="font-normal">Together</span>
          </h1>
          
          <p className="text-black text-lg md:text-xl max-w-2xl mx-auto font-light">
            Ready to bring your ideas to life? Get in touch and let's create something amazing.
          </p>
          
          {/* Contact Links */}
          <div className="flex flex-col items-center gap-6 pt-8">
            <a
              href="mailto:Chitkullakshya@gmail.com"
              className="flex items-center gap-3 text-black hover:opacity-70 transition-opacity text-lg"
            >
              <Mail className="h-6 w-6" />
              <span className="font-light">Chitkullakshya@gmail.com</span>
            </a>
            <a
              href="https://github.com/ChitkulLakshya"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-black hover:opacity-70 transition-opacity text-lg"
            >
              <Github className="h-6 w-6" />
              <span className="font-light">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/chitkul-lakshya"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-black hover:opacity-70 transition-opacity text-lg"
            >
              <Linkedin className="h-6 w-6" />
              <span className="font-light">LinkedIn</span>
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default GetInTouch;

