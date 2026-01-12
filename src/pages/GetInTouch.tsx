import { Github, Linkedin, Mail, FileText, Award } from "lucide-react";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const GetInTouch = () => {
  const navigate = useNavigate();

  return (
    <PageLayout className="min-h-screen bg-background text-foreground selection:bg-white/20">
      <section className="min-h-screen flex flex-col items-center justify-center pt-20 px-4 relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background to-background z-0 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] -z-10 opacity-20" />

        <div className="container mx-auto max-w-4xl text-center space-y-16 z-10">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-silver">
              Let's Work
              <br />
              Together
            </h1>

            <p className="text-silver text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
              Crafting digital experiences with precision and passion.
              <br className="hidden md:block" />
              Open for opportunities and collaborations.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button
              size="lg"
              onClick={() => navigate("/resume")}
              className="h-14 px-8 text-lg font-medium bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all rounded-full group min-w-[180px]"
            >
              <FileText className="mr-2 h-5 w-5 opacity-70 group-hover:opacity-100 transition-opacity" />
              Resume
            </Button>

            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate("/certificates")}
              className="h-14 px-8 text-lg font-medium rounded-full min-w-[180px] bg-white text-black hover:bg-gray-200 transition-colors"
            >
              <Award className="mr-2 h-5 w-5" />
              Certificates
            </Button>
          </div>

          {/* Contact Links */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 pt-8">
            <a
              href="mailto:Chitkullakshya@gmail.com"
              className="flex items-center gap-3 text-silver hover:text-white transition-colors group"
            >
              <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                <Mail className="h-5 w-5" />
              </div>
              <span className="font-light tracking-wide">Email</span>
            </a>
            <a
              href="https://github.com/ChitkulLakshya"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-silver hover:text-white transition-colors group"
            >
              <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                <Github className="h-5 w-5" />
              </div>
              <span className="font-light tracking-wide">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/chitkul-lakshya"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-silver hover:text-white transition-colors group"
            >
              <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
                <Linkedin className="h-5 w-5" />
              </div>
              <span className="font-light tracking-wide">LinkedIn</span>
            </a>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default GetInTouch;

