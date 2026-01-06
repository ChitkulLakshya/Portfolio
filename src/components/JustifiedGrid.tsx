import { useEffect, useState, useRef } from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface JustifiedGridProps {
  images: { id: string | number; src: string; alt?: string }[];
  targetRowHeight?: number;
}

interface ProcessedImage {
  id: string | number;
  src: string;
  alt?: string;
  width: number;
  height: number;
  aspectRatio: number;
}

const JustifiedGrid = ({ images, targetRowHeight = 300 }: JustifiedGridProps) => {
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
          image.src = img.src;
          image.onload = () => {
            resolve({
              ...img,
              width: image.naturalWidth,
              height: image.naturalHeight,
              aspectRatio: image.naturalWidth / image.naturalHeight,
            });
          };
          image.onerror = () => {
             // Fallback for failed loads to prevent breaking the grid
            resolve({
              ...img,
              width: 300,
              height: 200,
              aspectRatio: 1.5,
            });
          };
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
  if (processedImages.length > 0 && containerWidth > 0) {
    let currentRow: ProcessedImage[] = [];
    let currentWidth = 0;

    processedImages.forEach((img) => {
      currentRow.push(img);
      // Theoretical width if height is targetRowHeight
      currentWidth += img.aspectRatio * targetRowHeight;

      // If the row is wider than container, break it
      if (currentWidth >= containerWidth) {
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
        const availableWidth = containerWidth - totalGapWidth;
        
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
                 className="relative group"
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
                    className="block w-full h-full object-cover rounded-lg shadow-sm border border-gray-200"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (!target.src.includes("&t=")) {
                        target.src = target.src + "&t=" + Date.now();
                      }
                    }}
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
