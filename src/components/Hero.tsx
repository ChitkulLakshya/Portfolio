import { useEffect, useState } from "react";
import HeroMobile from "./HeroMobile";
import Ubuntu from "./Ubuntu";

const Hero = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isUbuntu, setIsUbuntu] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;


    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);


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




  return <Ubuntu />;
};

export default Hero;
