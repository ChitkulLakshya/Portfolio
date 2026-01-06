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
        // Calculate the height needed for this row to fill containerWidth
        // Sum of aspect ratios in this row
        const rowAspectRatioSum = row.reduce((sum, img) => sum + img.aspectRatio, 0);
        
        // Final height = Container Width / Sum of Aspect Ratios
        // Adjust container width to account for gaps: (numItems - 1) * gapSize
        // We subtract the total gap width from the container width before calculating height
        const gapSize = 16; // 1rem
        const totalGapWidth = (row.length - 1) * gapSize;
        const availableWidth = containerWidth - totalGapWidth;
        
        // Final height = Available Width / Sum of Aspect Ratios
        let finalHeight = availableWidth / rowAspectRatioSum;

        // Cap the height for the last row
        if (isLastRow) {
             // If the row isn't "full" (e.g. huge height calculated), cap it.
             // But also, if it's Justified, we usually WANT it to line up.
             // Google Images usually just lets the last row end early (left aligned) instead of expanding.
             // So if calculated height > targetRowHeight * 1.25, reset to target.
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
                 className="relative group border-[1px] border-[#e5e5e5] rounded-sm hover:border-white transition-colors overflow-hidden bg-zinc-900" /* Light grey theme border: #e5e5e5 */
                 style={{
                    width: `${finalHeight * img.aspectRatio}px`,
                    // For the last row, if we capped height, items should NOT grow to fill?
                    // "Justified Grid" usually means left-aligned last row.
                    flexGrow: 0, 
                    flexShrink: 0,
                 }}
               >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="h-full w-full"
                    // Since we computed exact width/height from aspect ratio, standard img behavior is fine.
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
