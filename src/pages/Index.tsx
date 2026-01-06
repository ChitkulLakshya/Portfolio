import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "@/lib/api";

const Index = () => {
  // Prefetch projects data to warm up the cache
  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    staleTime: 60 * 1000 * 5, // 5 minutes
  });

  // Preload project images in the background
  useEffect(() => {
    if (projects && projects.length > 0) {
      projects.forEach((project) => {
        if (project.image) {
          const img = new Image();
          img.src = project.image;
        }
      });
    }
  }, [projects]);

  return (
    <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: '#D3D3D3' }}>
      <Navbar />
      <main className="overflow-x-hidden">
        <Hero />
        <Skills />
        <About />
        <Services />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
