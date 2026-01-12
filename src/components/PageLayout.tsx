
import { useIsMobile } from "@/hooks/useIsMobile";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import { ReactNode } from "react";

interface PageLayoutProps {
    children: ReactNode;
    className?: string; // To allow custom styling on the wrapper if needed
    style?: React.CSSProperties;
}

const PageLayout = ({ children, className, style }: PageLayoutProps) => {
    const isMobile = useIsMobile();

    return (
        <div className={className} style={style}>
            {!isMobile && <Navbar />}

            {/* 
         On mobile, we usually want some padding at the bottom for the nav 
         The existing MobileView adds 'pb-20'.
         We can apply it conditionally here or let the children handle it?
         Better to handle it here if it's the main container.
      */}
            <div className={isMobile ? "pb-20" : ""}>
                {children}
            </div>

            <Footer />
            {isMobile && <BottomNav />}
        </div>
    );
};

export default PageLayout;
