
import Navbar from "@/components/Navbar";
import { HeroDesktop } from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const DesktopView = ({ isLoading = false }: { isLoading?: boolean }) => {
    return (
        <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: '#D3D3D3' }}>
            <Navbar isLoading={isLoading} />
            <main className="overflow-x-hidden">
                <HeroDesktop isLoading={isLoading} />
                <Skills />
                <About />
                <Services />
                <Contact />
            </main>
            <Footer />
        </div>
    );
};

export default DesktopView;
