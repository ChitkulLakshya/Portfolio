
import Navbar from "@/components/Navbar";
import { HeroDesktop } from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const DesktopView = () => {
    return (
        <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: '#D3D3D3' }}>
            <Navbar />
            <main className="overflow-x-hidden">
                <HeroDesktop />
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
