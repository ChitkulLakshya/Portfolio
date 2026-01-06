import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface JustifiedGridProps {
  images: { id: string | number; src: string; alt?: string }[];
  targetRowHeight?: number;
  onImageClick?: (image: { id: string | number; src: string; alt?: string }) => void;
}

interface ProcessedImage {
  id: string | number;
  src: string;
  alt?: string;
  width: number;
  height: number;
  aspectRatio: number;
}

const JustifiedGrid = ({ images, targetRowHeight = 300, onImageClick }: JustifiedGridProps) => {
  const [processedImages, setProcessedImages] = useState<ProcessedImage[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // 1. Load images to get dimensions
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const loadDimensions = async () => {
      const promises = images.map((img) => {
        return new Promise<ProcessedImage>((resolve, reject) => {
          const image = new Image();
          
          image.onload = () => {
             const width = image.naturalWidth || 1;
             const height = image.naturalHeight || 1;
             // console.log(`Loaded image ${img.id}: ${width}x${height}`);
            resolve({
              ...img,
              width: width,
              height: height,
              aspectRatio: width / height,
            });
          };

          image.onerror = () => {
             console.error("Failed to load image for grid:", img.id);
            resolve({
              ...img,
              width: 300,
              height: 200,
              aspectRatio: 1.5,
            });
          };

          if (img.src) {
              image.src = img.src;
          } else {
             // Handle missing src gracefully
             resolve({
              ...img,
              width: 300,
              height: 200,
              aspectRatio: 1.5,
              src: "",
            });
          }
        });
      });

      const results = await Promise.all(promises);
      if (isMounted) {
        setProcessedImages(results);
        setLoading(false);
      }
    };

    if (images.length > 0) {
      loadDimensions();
    } else {
        setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [images]);

  // 2. Measure container
  useEffect(() => {
    if (!containerRef.current) return;
    
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    resizeObserver.observe(containerRef.current);
    setContainerWidth(containerRef.current.clientWidth);

    return () => resizeObserver.disconnect();
  }, []);

  // 3. Compute Rows
  const rows: ProcessedImage[][] = [];
  // Fallback to window width if containerWidth is 0 (e.g. initial render issue)
  const effectiveWidth = containerWidth > 0 ? containerWidth : (typeof window !== 'undefined' ? window.innerWidth - 48 : 1000);

  if (processedImages.length > 0 && effectiveWidth > 0) {
    let currentRow: ProcessedImage[] = [];
    let currentWidth = 0;

    processedImages.forEach((img) => {
      currentRow.push(img);
      // Theoretical width if height is targetRowHeight
      currentWidth += img.aspectRatio * targetRowHeight;

      // If the row is wider than container, break it
      if (currentWidth >= effectiveWidth) {
        rows.push(currentRow);
        currentRow = [];
        currentWidth = 0;
      }
    });

    // Add last row if not empty
    if (currentRow.length > 0) {
      rows.push(currentRow);
    }
  }

  if (loading) {
    return (
        <div className="flex h-60 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-silver" />
        </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full space-y-4">
      {rows.map((row, rowIndex) => {
        const isLastRow = rowIndex === rows.length - 1;
        const rowAspectRatioSum = row.reduce((sum, img) => sum + img.aspectRatio, 0);
        
        const gapSize = 16; 
        const totalGapWidth = (row.length - 1) * gapSize;
        const availableWidth = effectiveWidth - totalGapWidth;
        
        let finalHeight = availableWidth / rowAspectRatioSum;

        if (isLastRow) {
             if (finalHeight > targetRowHeight * 1.25) finalHeight = targetRowHeight;
        }

        return (
          <div
            key={rowIndex}
            className="flex w-full gap-4"
            style={{ 
                height: `${finalHeight}px`,
             }}
          >
            {row.map((img) => (
               <div 
                 key={img.id}
                 className="relative group cursor-pointer"
                 onClick={() => onImageClick?.(img)}
                 style={{
                    width: `${finalHeight * img.aspectRatio}px`,
                    flexGrow: 0, 
                    flexShrink: 0,
                 }}
               >
                  <img
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    className="block w-full h-full object-cover rounded-lg shadow-sm border border-gray-200 opacity-100 relative z-10 min-h-[50px]"
                  />
               </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default JustifiedGrid;
