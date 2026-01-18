import { useEffect, useState } from "react";
import HeroMobile from "./HeroMobile";
import Ubuntu from "./Ubuntu";

const Hero = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isUbuntu, setIsUbuntu] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Mobile Check
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    // OS Check
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isUbuntuOS = userAgent.indexOf("ubuntu") > -1 || userAgent.indexOf("linux") > -1;

    console.log(`Hero OS Detection: UserAgent=${userAgent}, isUbuntu=${isUbuntuOS}`);

    if (isUbuntuOS) {
      setIsUbuntu(true);
    }

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isMobile) {
    return <HeroMobile />;
  }

  // If Ubuntu or simply defaulting to Ubuntu for desktop
  // Use Ubuntu component for Linux/Ubuntu users, and currently for all other desktop users too
  // as per current architecture where 'HeroDesktop' was the only desktop view.
  return <Ubuntu />;
};

export default Hero;
