import { useEffect, useState } from "react";
import PageLayout from "@/components/PageLayout";
import JustifiedGrid from "@/components/JustifiedGrid";
import { Loader2, X, RotateCcw } from "lucide-react";
import { useCertificates, GridImage, CACHE_KEY } from "@/hooks/useCertificates";


const ZOOM_WINDOWS = 0.9;
const ZOOM_UBUNTU = 0.9;


const GRID_X_WINDOWS = -150;
const GRID_Y_WINDOWS = 0;

const GRID_X_UBUNTU = -330;
const GRID_Y_UBUNTU = 0;

const Certificates = () => {
  const isWindows = navigator.userAgent.indexOf("Windows") !== -1;
  const currentZoom = isWindows ? ZOOM_WINDOWS : ZOOM_UBUNTU;
  const currentGridX = isWindows ? GRID_X_WINDOWS : GRID_X_UBUNTU;
  const currentGridY = isWindows ? GRID_Y_WINDOWS : GRID_Y_UBUNTU;

  const { images, isLoading, error, fetchCertificates } = useCertificates();
  const [selectedImage, setSelectedImage] = useState<GridImage | null>(null);

  useEffect(() => {
    fetchCertificates();

    const handleFocus = () => {


      fetchCertificates();
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);

  }, [fetchCertificates]);



  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedImage]);

  return (
    <PageLayout className="min-h-screen bg-background text-foreground selection:bg-white/20">

      {/* Background Ambience */}
      <div className="fixed inset-0 bg-gradient-to-b from-transparent via-background to-background z-0 pointer-events-none" />
      <div className="fixed top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] -z-10 opacity-20" />
      <div className="fixed bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] -z-10 opacity-20" />

      <main
        className="relative z-10 pt-32 pb-20 px-4 min-h-screen container mx-auto max-w-7xl"
        style={{
          transform: `scale(${currentZoom})`,
          transformOrigin: "top center",
        }}
      >

        {/* Header */}
        <div className="text-center space-y-6 mb-20 animate-fade-in relative">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-silver flex items-center justify-center gap-4">
            Certificates
            <button
              onClick={() => fetchCertificates(true)}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              title="Refresh Certificates"
            >
              <RotateCcw className={`w-6 h-6 md:w-8 md:h-8 text-silver/50 hover:text-silver transition-all ${isLoading ? 'animate-spin' : ''}`} />
            </button>
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
            <div style={{ transform: `translate(${currentGridX}px, ${currentGridY}px)` }}>
              <JustifiedGrid
                images={images}
                targetRowHeight={280}
                onImageClick={(img) => setSelectedImage(img as GridImage)}
              />
            </div>
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
    </PageLayout>
  );
};

export default Certificates;
