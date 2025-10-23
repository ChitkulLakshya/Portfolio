import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "./ui/button";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-4 relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">

          {/* Profile Image & Name */}
          <div className="flex justify-center md:justify-start animate-fade-in order-2 md:order-1">
            <div className="relative">
              <div className="bg-white/95 p-8 shadow-2xl">
                <img
                  src="https://i.postimg.cc/BQN5KYQZ/29defd38-ae12-49c5-968c-56a2192e7000-1.jpg"
                  alt="Chitkul Lakshya"
                  className="w-80 h-96 md:w-96 md:h-[500px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />

                {/* Name in Signature Font */}
                <div className="mt-6 space-y-1">
                  <h3
                    className="text-4xl md:text-5xl text-center tracking-tight text-black"
                    style={{ fontFamily: "'Great Vibes', cursive" }}
                  >
                    Chitkul Lakshya
                  </h3>
                </div>
              </div>

              {/* Soft Glow Behind */}
              <div className="absolute -inset-4 bg-primary/10 blur-2xl -z-10"></div>
            </div>
          </div>

          {/* Hero Text Block */}
          <div className="space-y-8 animate-fade-in order-1 md:order-2">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wider leading-tight text-foreground">
              FULL STACK DEVELOPER
              <br />
              <span className="text-muted-foreground">WILL CREATE THE</span>
              <br />
              <span className="font-normal">BEST</span>{" "}
              <span
                className="text-red-500 font-bold"
                style={{ fontFamily: "'Aachen', sans-serif" }}
              >
                SOLUTIONS
              </span>
              <br />
              <span className="text-muted-foreground">FOR YOU</span>
            </h1>

            <div className="space-y-4 text-muted-foreground max-w-xl leading-relaxed">
              <p>
                Passionate about building modern web and mobile applications with cutting-edge technologies.
                Specializing in React, Next.js, and AI integration to create innovative solutions.
              </p>
              <p>
                From intuitive user interfaces to robust backend systems, I bring ideas to life with clean code
                and attention to detail. Let's build something extraordinary together.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                size="lg"
                variant="outline"
                className="bg-foreground text-background hover:bg-foreground/90 px-8 rounded-sm"
                onClick={() => scrollToSection("contact")}
              >
                Get In Touch
              </Button>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 pt-4">
              <a
                href="https://github.com/ChitkulLakshya"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-border hover:border-foreground/30 transition-all duration-300 group"
              >
                <Github className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="https://www.linkedin.com/in/chitkul-lakshya"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 border border-border hover:border-foreground/30 transition-all duration-300 group"
              >
                <Linkedin className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
              <a
                href="mailto:Chitkullakshya@gmail.com"
                className="p-3 border border-border hover:border-foreground/30 transition-all duration-300 group"
              >
                <Mail className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
