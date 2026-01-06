import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import JustifiedGrid from "@/components/JustifiedGrid";
import { Loader2 } from "lucide-react";

// CONFIGURATION
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwTzWVE9JLKY7xU3xtMYeadozDX9xZXs769gjUcAVQZ7_cb5pTeh0cqEFxbTS3Ub9fa/exec";
const CACHE_KEY = "certificates_cache_v1";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

interface DriveFile {
  id: string;
  name: string;
}

interface GridImage {
  id: string;
  src: string;
  alt: string;
}

const Certificates = () => {
  const [images, setImages] = useState<GridImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchCertificates = async () => {
      // Prevent double fetching in strict mode development
      if (!isMounted) return;

      setIsLoading(true);
      setError(null);

      try {
        // 1. Check Local Cache
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
          try {
            const { data, timestamp } = JSON.parse(cachedData);
            const isFresh = Date.now() - timestamp < CACHE_DURATION;

            if (isFresh && Array.isArray(data) && data.length > 0) {
              console.log("Using cached certificates");
              if (isMounted) {
                setImages(transformData(data));
                setIsLoading(false);
              }
              return; // Exit if cache is valid
            }
          } catch (e) {
            console.error("Cache parsing error", e);
            localStorage.removeItem(CACHE_KEY);
          }
        }

        // 2. Fetch from Network if cache miss
        console.log("Fetching certificates from script...");
        const response = await fetch(GOOGLE_SCRIPT_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch certificates from Drive Script");
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          // 3. Save to Cache
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            data: data,
            timestamp: Date.now()
          }));
          
          if (isMounted) {
            setImages(transformData(data));
          }
        } else {
            throw new Error("Invalid data format received from script");
        }

      } catch (err) {
        if (isMounted) {
            console.error(err);
            setError(err instanceof Error ? err.message : "Unknown error");
        }
      } finally {
        if (isMounted) {
            setIsLoading(false);
        }
      }
    };

    fetchCertificates();

    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array ensures this runs only ONCE

  const transformData = (files: DriveFile[]): GridImage[] => {
    return files.map((file) => ({
      id: file.id,
      // Use Google Drive Thumbnail endpoint with high resolution (sz=w1200)
      src: `https://drive.google.com/thumbnail?id=${file.id}&sz=w1200`,
      alt: file.name.replace(/\.[^/.]+$/, "") // Remove extension
    }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-white/20">
      <Navbar />
      
      {/* Background Ambience */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-background to-background z-0 pointer-events-none" />
      <div className="fixed top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] -z-10 opacity-20" />
      <div className="fixed bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] -z-10 opacity-20" />

      <main className="relative z-10 pt-32 pb-20 px-4 min-h-screen container mx-auto max-w-7xl">
        
        {/* Header */}
        <div className="text-center space-y-6 mb-20 animate-fade-in">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-silver">
            Certificates
          </h1>
          <p className="text-silver/80 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
            A validation of my journey and expertise.
            <br />
            <span className="text-sm opacity-50">Fetched directly from Google Drive ({images.length} items)</span>
          </p>
        </div>

        {/* Content Area */}
        <div className="animate-fade-in pl-4 pr-4">
            
            {/* Error State */}
            {error && (
                <div className="text-center py-12 text-red-400 max-w-lg mx-auto border border-red-500/20 bg-red-500/10 rounded-xl p-6">
                    <p className="font-semibold mb-2">Unavailable to load certificates</p>
                    <p className="text-sm opacity-80">{error}</p>
                    <button 
                        onClick={() => { localStorage.removeItem(CACHE_KEY); window.location.reload(); }}
                        className="mt-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded text-sm transition-colors"
                    >
                        Clear Cache & Retry
                    </button>
                </div>
            )}

            {/* Loading State */}
            {isLoading && (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <Loader2 className="h-10 w-10 animate-spin text-silver" />
                    <p className="text-silver/50 animate-pulse">Scanning Drive...</p>
                </div>
            )}

            {/* Success State */}
            {!isLoading && !error && images.length > 0 && (
                <JustifiedGrid images={images} targetRowHeight={280} />
            )}

            {/* Empty State */}
            {!isLoading && !error && images.length === 0 && (
                <div className="text-center py-20 text-silver/50">
                    <p>No certificates found in the folder.</p>
                </div>
            )}
        </div>

      </main>
    </div>
  );
};

export default Certificates;
