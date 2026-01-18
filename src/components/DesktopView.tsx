
import Navbar from "@/components/Navbar";
import Ubuntu from "@/components/Ubuntu";
import Windows from "@/components/windows";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const DesktopView = ({ isLoading = false, isWindows = false }: { isLoading?: boolean; isWindows?: boolean }) => {
    return (
        <div className="min-h-screen overflow-x-hidden relative" style={{ backgroundColor: '#D3D3D3' }}>
            <Navbar isLoading={isLoading} />
            <main className="overflow-x-hidden relative">
                {isWindows ? <Windows isLoading={isLoading} /> : <Ubuntu isLoading={isLoading} />}
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
