import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 border-t border-border">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Brand */}
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold gradient-text mb-2">CHITKUL LAKSHYA</h3>
              <p className="text-muted-foreground">Full Stack Developer & AI Enthusiast</p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://github.com/ChitkulLakshya"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-card hover:bg-card/80 transition-colors glow-primary"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/chitkul-lakshya"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-card hover:bg-card/80 transition-colors glow-primary"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="mailto:Chitkullakshya@gmail.com"
                className="p-3 rounded-lg bg-card hover:bg-card/80 transition-colors glow-primary"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-8 border-t border-border text-center text-muted-foreground">
            <p className="flex items-center justify-center gap-2">
              © {currentYear} Chitkul Lakshya. Made with{" "}
              <Heart className="h-4 w-4 text-primary fill-primary" /> and lots of code
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
