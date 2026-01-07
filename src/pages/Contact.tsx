import Navbar from "@/components/Navbar";
import { FileText, Image as ImageIcon } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-white/20">
      <Navbar />
      
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-background to-background z-0 pointer-events-none" />
      <div className="fixed top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] -z-10 opacity-20" />
      <div className="fixed bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] -z-10 opacity-20" />

      <main className="relative z-10 pt-32 pb-20 px-4 min-h-screen container mx-auto max-w-7xl flex flex-col items-center">
        
        {/* Page Header */}
        <div className="text-center space-y-6 mb-16 animate-fade-in w-full">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-silver">
            Get in Touch
          </h1>
          <p className="text-silver/80 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            Let's connect and build something amazing together.
          </p>
        </div>

        {/* Resume Embed Section */}
        <div className="w-full max-w-3xl space-y-8 animate-fade-in delay-100">
            <div className="flex flex-col items-center space-y-8 p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                
                <h2 className="text-2xl font-semibold text-silver tracking-tight">My Resume</h2>

                {/* Visual Preview Container */}
                <div className="relative group w-full rounded-lg overflow-hidden border border-white/10 shadow-2xl bg-black/20">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10" />
                    <img 
                        src="/image/resume.jpg" 
                        alt="Resume Preview" 
                        className="w-full h-auto object-cover opacity-95 transition-transform duration-700 ease-out group-hover:scale-[1.02]" 
                    />
                </div>

                {/* Download Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center pt-2">
                    <a 
                        href="/image/resume.pdf" 
                        download="Resume.pdf"
                        className="flex items-center justify-center gap-3 px-8 py-4 w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white rounded-full transition-all hover:scale-105 active:scale-95 border border-white/10 font-medium group"
                    >
                        <FileText className="w-5 h-5 text-silver group-hover:text-white transition-colors" />
                        Download PDF
                    </a>
                    <a 
                        href="/image/resume.jpg" 
                        download="Resume.jpg"
                        className="flex items-center justify-center gap-3 px-8 py-4 w-full sm:w-auto bg-transparent hover:bg-white/5 text-silver/80 hover:text-white rounded-full transition-all border border-white/10 hover:border-white/30 font-medium"
                    >
                        <ImageIcon className="w-5 h-5" />
                        Download JPG
                    </a>
                </div>
            </div>
        </div>

      </main>
    </div>
  );
};

export default Contact;
