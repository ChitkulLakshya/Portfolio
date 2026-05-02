import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Load Spline viewer script globally once (prevents remount black screen)
if (!window.__splineLoaded) {
  const script = document.createElement("script");
  script.type = "module";
  script.src = "https://unpkg.com/@splinetool/viewer@1.9.72/build/spline-viewer.js";
  script.onload = () => {
    window.__splineLoaded = true;
  };
  document.body.appendChild(script);
}

createRoot(document.getElementById("root")!).render(<App />);

// TypeScript global declaration
declare global {
  interface Window {
    __splineLoaded?: boolean;
  }
}
