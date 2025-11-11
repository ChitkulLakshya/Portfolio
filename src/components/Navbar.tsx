import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "Get in Touch", path: "/get-in-touch" },
  ];

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname === path;
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-black text-white px-6 py-3 items-center justify-between border-b border-white/10">
        {/* Logo - Three stacked triangles */}
        <button
          onClick={() => navigate("/")}
          className="flex flex-col gap-0.5 hover:opacity-80 transition-opacity"
        >
          <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[10px] border-l-transparent border-r-transparent border-b-white"></div>
          <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[10px] border-l-transparent border-r-transparent border-b-white"></div>
          <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-b-[10px] border-l-transparent border-r-transparent border-b-white"></div>
        </button>

        {/* Navigation Links */}
        <div className="flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`text-sm uppercase tracking-wider transition-opacity ${
                isActive(item.path)
                  ? "opacity-100"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              {item.name}
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-black text-white px-4 py-3 items-center justify-between border-b border-white/10 flex">
        <button
          onClick={() => navigate("/")}
          className="flex flex-col gap-0.5"
        >
          <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[8px] border-l-transparent border-r-transparent border-b-white"></div>
          <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[8px] border-l-transparent border-r-transparent border-b-white"></div>
          <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-b-[8px] border-l-transparent border-r-transparent border-b-white"></div>
        </button>
        
        {/* Mobile Navigation Links */}
        <div className="flex items-center gap-4">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`text-xs uppercase tracking-wider ${
                isActive(item.path)
                  ? "opacity-100"
                  : "opacity-60"
              }`}
            >
              {item.name === "Get in Touch" ? "Contact" : item.name}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
