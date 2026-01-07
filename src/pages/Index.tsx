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
import { useCertificates } from "@/hooks/useCertificates";

const Index = () => {
  // Prefetch projects data to warm up the cache
  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    staleTime: 60 * 1000 * 5, // 5 minutes
  });

  const { preloadCertificates } = useCertificates();

  // Preload project images and certificates in the background
  useEffect(() => {
    // 1. Preload certificates (Huge JSON from Google Script)
    // We use a timeout to let the main thread render the hero section first
    const timer = setTimeout(() => {
        preloadCertificates();
    }, 2000);

    // 2. Preload project images
    if (projects && projects.length > 0) {
      projects.forEach((project) => {
        if (project.image) {
          const img = new Image();
          img.src = project.image;
        }
      });
    }

    return () => clearTimeout(timer);
  }, [projects, preloadCertificates]);

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
