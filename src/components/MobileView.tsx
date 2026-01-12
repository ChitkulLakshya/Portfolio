
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import HeroMobile from "@/components/HeroMobile";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

const MobileView = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isDarkPage = location.pathname === "/get-in-touch" || location.pathname === "/certificates" || location.pathname === "/resume";

    const LOGO_TEXT = "Chitkul Lakshya";
    const LOGO_SIZE = "text-3xl";

    const navigateHome = () => {
        if (location.pathname === "/") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            navigate("/");
            window.scrollTo({ top: 0 });
        }
    };

    return (
        <div className="min-h-screen overflow-x-hidden pb-20" style={{ backgroundColor: '#D3D3D3' }}>
            {/* LOGO */}
            <button
                onClick={navigateHome}
                className={cn(
                    "fixed top-6 left-6 z-50 font-script tracking-wide transition-opacity hover:opacity-80",
                    LOGO_SIZE,
                    isDarkPage ? "text-silver" : "mix-blend-difference text-white"
                )}
            >
                {LOGO_TEXT}
            </button>

            <main className="overflow-x-hidden">
                <HeroMobile />
                <Skills />
                <About />
                <Services />
                <Contact />
            </main>
            <Footer />
            <BottomNav />
        </div>
    );
};

export default MobileView;
