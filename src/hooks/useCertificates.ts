import { useState, useCallback } from "react";

// CONFIGURATION
export const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx3gvm-IhQKnIPfxoxYw7yxqLrPGcq02iyBhTrnAXJTD38-v7O6c2THItokLe4m92Fv/exec";
export const CACHE_KEY = "certificates_cache_v2";
export const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export interface DriveFile {
  data: string;
  name: string;
}

export interface GridImage {
  id: string;
  src: string;
  alt: string;
}

export const useCertificates = () => {
  const [images, setImages] = useState<GridImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const transformData = useCallback((files: DriveFile[]): GridImage[] => {
    return files.map((file, index) => {
       // Check if data is already a Base64 string or a valid URL
       let src = file.data;
       
       // Optimization: If the user provides a raw Drive File ID in the future, 
       // or if the script is updated to return IDs instead of Base64, 
       // we can handle the direct download link format here:
       // if (!file.data.startsWith('data:') && !file.data.startsWith('http')) {
       //    src = `https://drive.google.com/uc?export=view&id=${file.data}`;
       // }
       
       return {
        id: `cert-${index}`,
        src: src, 
        alt: file.name.replace(/\.[^/.]+$/, "") // Remove extension
      };
    });
  }, []);

  const fetchCertificates = useCallback(async (forceRefresh = false) => {
    setIsLoading(true);
    setError(null);

    // If forcing refresh, clear cache immediately
    if (forceRefresh) {
        localStorage.removeItem(CACHE_KEY);
        setImages([]);
    }

    try {
      // 1. Check Local Cache
      const cachedData = localStorage.getItem(CACHE_KEY);

      if (cachedData && !forceRefresh) {
        try {
          const { data, timestamp } = JSON.parse(cachedData);
          const isFresh = Date.now() - timestamp < CACHE_DURATION;

          if (isFresh && Array.isArray(data) && data.length > 0) {
              setImages(transformData(data));
              setIsLoading(false);
              return; // Exit if cache is valid
          }
        } catch (e) {
          console.error("Cache parsing error", e);
          localStorage.removeItem(CACHE_KEY);
        }
      }

      // 2. Fetch from Network if cache miss
      // Use low priority if supported (browsers might ignore this in fetch options but it's good intent)
      // Note: 'priority' property is not standard in fetch Init yet for all browsers, but some support it.
      // We can use a request object or just fetch.
      const response = await fetch(GOOGLE_SCRIPT_URL);

      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        // 3. Save to Cache
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          data: data,
          timestamp: Date.now()
        }));
        
        setImages(transformData(data));
      } else {
          throw new Error("Invalid data format received from script. Expected Array.");
      }

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, [transformData]);

  // A light version just for pre-fetching/caching without state updates if needed,
  // but using fetchCertificates is fine as it updates state which might not be mounted.
  // Actually, we should separate the "fetch & cache" logic from "set state" logic 
  // if we want to use it in a background component that doesn't display images.
  
  const preloadCertificates = useCallback(async () => {
      try {
        const cachedData = localStorage.getItem(CACHE_KEY);
        if (cachedData) {
            const { timestamp } = JSON.parse(cachedData);
            if (Date.now() - timestamp < CACHE_DURATION) {
                return; // Already cached and fresh
            }
        }
        
        console.log("Pre-fetching certificates for cache...");
        const response = await fetch(GOOGLE_SCRIPT_URL);
        const data = await response.json();
        
        if (Array.isArray(data)) {
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                data: data,
                timestamp: Date.now()
            }));
            console.log("Certificates pre-fetched and cached.");
        }
      } catch (e) {
          console.error("Pre-fetch failed", e);
      }
  }, []);

  return { images, isLoading, error, fetchCertificates, preloadCertificates };
};
