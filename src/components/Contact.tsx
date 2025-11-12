import { Github, Linkedin, Mail } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-32 px-4 border-t border-black/10" style={{ backgroundColor: '#D3D3D3' }}>
      <div className="container mx-auto max-w-5xl">
        <div className="text-center space-y-12">
          <h2 className="text-5xl md:text-7xl font-light text-black leading-tight">
            Let's Work Together
          </h2>
          <p className="text-black text-lg md:text-xl max-w-2xl mx-auto font-light">
            Ready to bring your ideas to life? Get in touch and let's create something amazing.
          </p>
          
          {/* Contact Links */}
          <div className="flex flex-wrap justify-center gap-8 pt-8">
            <a
              href="mailto:Chitkullakshya@gmail.com"
              className="flex items-center gap-3 text-black hover:opacity-70 transition-opacity"
            >
              <Mail className="h-5 w-5" />
              <span className="font-light">Chitkullakshya@gmail.com</span>
            </a>
            <a
              href="https://github.com/ChitkulLakshya"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-black hover:opacity-70 transition-opacity"
            >
              <Github className="h-5 w-5" />
              <span className="font-light">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/chitkul-lakshya"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-black hover:opacity-70 transition-opacity"
            >
              <Linkedin className="h-5 w-5" />
              <span className="font-light">LinkedIn</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
