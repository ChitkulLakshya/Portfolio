import { useEffect, useState } from "react";
import DesktopView from "@/components/DesktopView";
import MobileView from "@/components/MobileView";
import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "@/lib/api";
import { useCertificates } from "@/hooks/useCertificates";
import SplineHero from "@/components/SplineHero";

const Index = ({ isLoading = false, isWindows = false, isMac = false }: { isLoading?: boolean; isWindows?: boolean; isMac?: boolean }) => {

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


  useEffect(() => {


    const timer = setTimeout(() => {
      preloadCertificates();
    }, 2000);


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
    <div className="relative min-h-screen" style={{ backgroundColor: "#D3D3D3" }}>
      <div className="relative z-10">
        {isMobile ? <MobileView isLoading={isLoading} /> : <DesktopView isLoading={isLoading} isWindows={isWindows} isMac={isMac} />}
      </div>
    </div>
  );
};

export default Index;
