import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, Image as ImageIcon, Briefcase } from "lucide-react";

const Resume = () => {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-white/20">
      <Navbar />
      <section className="min-h-screen flex flex-col items-center justify-center pt-20 px-4 relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background to-background z-0 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] -z-10 opacity-20" />

        <div className="container mx-auto max-w-4xl text-center space-y-16 z-10 py-12">
            
            <div className="space-y-6 animate-fade-in">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-silver">
                Resume
                </h1>
                <p className="text-silver/80 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                A closer look at my professional journey and skills.
                </p>
            </div>

            <div className="w-full max-w-3xl space-y-8 mx-auto animate-fade-in delay-100">
              <div className="flex flex-col items-center space-y-8 p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                
                {/* Visual Preview Container */}
                <div className="relative group w-full rounded-lg overflow-hidden border border-white/10 shadow-2xl bg-black/20">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
                    <img 
                        src="/image/Resume.jpg" 
                        alt="Resume Preview" 
                        className="w-full h-auto object-cover opacity-95 transition-transform duration-700 ease-out group-hover:scale-[1.02]" 
                    />
                </div>

                {/* Download Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center pt-2">
                    <a 
                        href="/image/Resume.pdf" 
                        download="Resume.pdf"
                        className="flex items-center justify-center gap-3 px-8 py-4 w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white rounded-full transition-all hover:scale-105 active:scale-95 border border-white/10 font-medium group"
                    >
                        <FileText className="w-5 h-5 text-silver group-hover:text-white transition-colors" />
                        Download PDF
                    </a>
                    <a 
                        href="/image/Resume.jpg" 
                        download="Resume.jpg"
                        className="flex items-center justify-center gap-3 px-8 py-4 w-full sm:w-auto bg-transparent hover:bg-white/5 text-silver/80 hover:text-white rounded-full transition-all border border-white/10 hover:border-white/30 font-medium"
                    >
                        <ImageIcon className="w-5 h-5" />
                        Download JPG
                    </a>
                </div>
              </div>
            </div>

        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Resume;
