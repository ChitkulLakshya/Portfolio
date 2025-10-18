import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "./ui/button";
import profileImage from "@/assets/profile.jpg";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="flex-1 space-y-6 animate-fade-in">
            <div className="space-y-2">
              <p className="text-primary text-lg font-medium">Hi, I'm</p>
              <h1 className="text-5xl md:text-7xl font-bold gradient-text">
                CHITKUL LAKSHYA
              </h1>
              <h2 className="text-2xl md:text-3xl text-muted-foreground">
                Full Stack Developer & AI Enthusiast
              </h2>
            </div>

            <p className="text-lg text-muted-foreground max-w-2xl">
              Passionate about building modern web and mobile applications with cutting-edge technologies. 
              Leveraging AI tools and automation to enhance productivity and create innovative solutions.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 glow-primary"
                onClick={() => scrollToSection("portfolio")}
              >
                View My Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => scrollToSection("contact")}
              >
                Get In Touch
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 pt-4">
              <a
                href="https://github.com/ChitkulLakshya"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-card hover:bg-card/80 transition-colors glow-primary"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/chitkul-lakshya"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-card hover:bg-card/80 transition-colors glow-primary"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:Chitkullakshya@gmail.com"
                className="p-3 rounded-lg bg-card hover:bg-card/80 transition-colors glow-primary"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Profile Image */}
          <div className="flex-1 flex justify-center animate-slide-in-right">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-3xl opacity-30 animate-glow-pulse"></div>
              <img
                src={profileImage}
                alt="Chitkul Lakshya"
                className="relative rounded-full w-64 h-64 md:w-96 md:h-96 object-cover border-4 border-primary/20 shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
