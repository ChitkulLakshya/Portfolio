import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import JustifiedGrid from "@/components/JustifiedGrid";
import { Loader2, X } from "lucide-react";

// CONFIGURATION
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx3gvm-IhQKnIPfxoxYw7yxqLrPGcq02iyBhTrnAXJTD38-v7O6c2THItokLe4m92Fv/exec";
const CACHE_KEY = "certificates_cache_v2";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

interface DriveFile {
  data: string;
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
  const [selectedImage, setSelectedImage] = useState<GridImage | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchCertificates = async () => {
      // Prevent double fetching in strict mode development
      if (!isMounted) return;

      setIsLoading(true);
      setError(null);
      // setImages([]); // Clear previous images? No, keep them while loading new ones?

      try {
        // 1. Check Local Cache
        const cachedData = localStorage.getItem(CACHE_KEY);
        // FORCE NETWORK FETCH FOR DEBUGGING (Toggle carefully)
        // const cachedData = null; 

        if (cachedData) {
          try {
            const { data, timestamp } = JSON.parse(cachedData);
            const isFresh = Date.now() - timestamp < CACHE_DURATION;

            if (isFresh && Array.isArray(data) && data.length > 0) {
              // Validate that the cache actually has the new data structure (with 'data' property for base64)
              const isValidCache = data.every((item: any) => item.data && typeof item.data === 'string');
              
              if (isValidCache) {
                console.log("Using cached certificates:", data.length);
                if (isMounted) {
                    const transformed = transformData(data);
                    setImages(transformed);
                    setIsLoading(false);
                }
                return; // Exit if cache is valid
              } else {
                console.log("Detail: Cache structure mismatch (v1 vs v2). invalidating.");
                localStorage.removeItem(CACHE_KEY);
              }
            } else {
               console.log("Cache invalid or empty");
            }
          } catch (e) {
            console.error("Cache parsing error", e);
            localStorage.removeItem(CACHE_KEY);
          }
        }

        // 2. Fetch from Network if cache miss
        console.log("Fetching certificates from script:", GOOGLE_SCRIPT_URL);
        const response = await fetch(GOOGLE_SCRIPT_URL);

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Raw API Response:", data);

        if (Array.isArray(data)) {
          // 3. Save to Cache
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            data: data,
            timestamp: Date.now()
          }));
          
          if (isMounted) {
            const transformed = transformData(data);
            console.log("Transformed Images:", transformed);
            setImages(transformed);
          }
        } else {
             console.error("Invalid data format:", data);
            throw new Error("Invalid data format received from script. Expected Array.");
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

  // Disable scrolling when modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedImage]);

  const transformData = (files: DriveFile[]): GridImage[] => {
    return files.map((file, index) => ({
      id: `cert-${index}`,
      src: file.data, // Use base64 string directly
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
                <JustifiedGrid 
                  images={images} 
                  targetRowHeight={280} 
                  onImageClick={(img) => setSelectedImage(img as GridImage)}
                />
            )}

            {/* Empty State */}
            {!isLoading && !error && images.length === 0 && (
                <div className="text-center py-20 text-silver/50">
                    <p>No certificates found in the folder.</p>
                </div>
            )}
        </div>

      </main>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white transition-colors z-50 rounded-full hover:bg-white/10"
          >
            <X className="w-8 h-8 md:w-10 md:h-10" />
          </button>
          
          <div 
            className="relative max-w-7xl w-full max-h-screen p-4 flex items-center justify-center pointer-events-none"
          >
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt}
              className="max-h-[90vh] w-auto max-w-full rounded-md shadow-2xl scale-100 animate-in zoom-in-95 duration-300 pointer-events-auto select-none"
              onClick={(e) => e.stopPropagation()} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificates;
