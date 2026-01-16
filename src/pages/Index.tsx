import { useEffect, useState } from "react";
import DesktopView from "@/components/DesktopView";
import MobileView from "@/components/MobileView";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "@/lib/api";
import { useCertificates } from "@/hooks/useCertificates";

const Index = ({ isLoading = false }: { isLoading?: boolean }) => {
  // Prefetch projects data to warm up the cache
  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    staleTime: 60 * 1000 * 5, // 5 minutes
  });

  const { preloadCertificates } = useCertificates();

  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768; // 768px break point
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  return isMobile ? <MobileView /> : <DesktopView isLoading={isLoading} />;
};

export default Index;
