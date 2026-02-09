import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import Projects from "./pages/Projects";
import GetInTouch from "./pages/GetInTouch";
import Certificates from "./pages/Certificates";
import Resume from "./pages/Resume";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

import { useState, useEffect } from "react";
import Preloader from "./components/Preloader";
import MobilePreloader from "./components/MobilePreloader";
import WindowsPreloader from "./components/WindowsPreloader";
import MacPreloader from "./components/MacPreloader";

const App = () => {
  const [isLoading, setIsLoading] = useState(true); // Preloader enabled again
  const [isMobile, setIsMobile] = useState(false);


  const [isWindows, setIsWindows] = useState(() => {
    if (typeof window !== "undefined") {
      return navigator.userAgent.toLowerCase().indexOf("windows") !== -1;
    }
    return false;
  });

  const [isMac, setIsMac] = useState(() => {
    if (typeof window !== "undefined") {
      const ua = navigator.userAgent.toLowerCase();

      return ua.indexOf("mac") !== -1 || (navigator.platform && navigator.platform.toLowerCase().indexOf("mac") !== -1);
    }
    return false;
  });

  useEffect(() => {
    if (isWindows) console.log("Running in Windows (OS Detected)");
    if (isMac) console.log("Running in MacOS (OS Detected)");

    if (typeof window !== "undefined") {
      console.log("OS Detection Debug:", { ua: navigator.userAgent, platform: navigator.platform });
    }
  }, [isWindows, isMac]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);


  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    return () => {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'auto'; // Optional: restore default behavior on unmount
      }
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        {isLoading && (
          isMobile ? (
            <MobilePreloader onComplete={() => setIsLoading(false)} />
          ) : isWindows ? (
            <WindowsPreloader onComplete={() => setIsLoading(false)} />
          ) : isMac ? (
            <MacPreloader onComplete={() => setIsLoading(false)} />
          ) : (
            <Preloader onComplete={() => setIsLoading(false)} />
          )
        )}

        <div
          style={{


            opacity: 1,
          }}
        >
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Routes>
              <Route path="/" element={<Index isLoading={isLoading} isWindows={isWindows} isMac={isMac} />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/get-in-touch" element={<GetInTouch />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/certificates" element={<Certificates />} />
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
