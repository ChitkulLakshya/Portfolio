import Navbar from "@/components/Navbar";
import Ubuntu from "@/components/Ubuntu";
import Windows from "@/components/windows";
import MacOS from "@/components/MacOS";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const DesktopView = ({ isLoading = false, isWindows = false, isMac = false }: { isLoading?: boolean; isWindows?: boolean; isMac?: boolean }) => {
    return (
        <div className="min-h-screen overflow-x-hidden relative" style={{ backgroundColor: '#D3D3D3' }}>
            <Navbar isLoading={isLoading} />
            <main className="overflow-x-hidden relative">
                {isWindows ? (
                    <Windows isLoading={isLoading} />
                ) : isMac ? (
                    <MacOS isLoading={isLoading} />
                ) : (
                    <Ubuntu isLoading={isLoading} />
                )}
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
