import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const closeMobileMenu = () => setIsMobileOpen(false);

  const navigateHome = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
    closeMobileMenu();
  };

  const scrollToSkillsSection = () => {
    const section = document.getElementById("skills");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSkillsClick = () => {
    if (location.pathname === "/") {
      scrollToSkillsSection();
    } else {
      navigate("/");
      setTimeout(scrollToSkillsSection, 300);
    }
    closeMobileMenu();
  };

  const handleProjectsClick = () => {
    navigate("/projects");
    closeMobileMenu();
  };

  const handleGetInTouchClick = () => {
    navigate("/get-in-touch");
    closeMobileMenu();
  };

  const navLinkClass = (isActive = false) =>
    `text-sm uppercase tracking-wide transition-opacity duration-200 ${
      isActive ? "opacity-100" : "opacity-70 hover:opacity-100"
    }`;

  const isRouteActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname === path;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-black/10" style={{ backgroundColor: '#D3D3D3' }}>
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left - Brand */}
        <button
          onClick={navigateHome}
          className="text-lg font-bold tracking-wide text-black transition-opacity hover:opacity-80"
        >
          CHITKUL LAKSHYA
        </button>

        {/* Center - Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={navigateHome}
            className={navLinkClass(isRouteActive("/"))}
          >
            Home
          </button>
          <button
            onClick={handleSkillsClick}
            className={navLinkClass(false)}
          >
            Skills
          </button>
          <button
            onClick={handleProjectsClick}
            className={navLinkClass(isRouteActive("/projects"))}
          >
            Projects
          </button>
        </div>

        {/* Right - Desktop CTA */}
        <div className="hidden md:flex">
          <button
            onClick={handleGetInTouchClick}
            className="text-sm uppercase tracking-wide px-4 py-2 border border-black/20 rounded-full text-black transition-all duration-200 hover:border-black/40 hover:opacity-90"
          >
            Get in Touch
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileOpen((prev) => !prev)}
          className="md:hidden text-black transition-opacity hover:opacity-80"
          aria-label="Toggle navigation"
        >
          {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileOpen && (
        <div className="md:hidden border-t border-black/10" style={{ backgroundColor: '#D3D3D3' }}>
          <div className="px-4 py-4 flex flex-col gap-3">
            <button onClick={navigateHome} className={navLinkClass(isRouteActive("/"))}>
              Home
            </button>
            <button
              onClick={handleSkillsClick}
              className={navLinkClass(false)}
            >
              Skills
            </button>
            <button onClick={handleProjectsClick} className={navLinkClass(isRouteActive("/projects"))}>
              Projects
            </button>
            <button
              onClick={handleGetInTouchClick}
              className="text-sm uppercase tracking-wide transition-opacity duration-200 opacity-70 hover:opacity-100"
            >
              Get in Touch
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
