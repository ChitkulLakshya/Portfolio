import { useLocation } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isDarkPage = location.pathname === "/get-in-touch";

  return (
    <footer 
      className={`py-8 px-4 border-t transition-colors duration-300 ${
        isDarkPage 
          ? "border-white/10 bg-transparent text-gray-400" 
          : "border-black/10 text-black"
      }`}
      style={{ backgroundColor: isDarkPage ? 'transparent' : '#D3D3D3' }}
    >
      <div className="container mx-auto max-w-7xl">
        <div className={`text-center text-sm font-light ${isDarkPage ? "text-gray-400" : "text-black"}`}>
          © {currentYear} Chitkul Lakshya. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
