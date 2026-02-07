import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

/* ===============================
   🔧 NAVBAR CONFIG (EDIT HERE)
================================ */

// Logo
const LOGO_TEXT = "Chitkul Lakshya";
const LOGO_SIZE = "text-3xl"; // Increased size for Script readability

// Nav item text size
const NAV_TEXT_SIZE = "text-xs"; // text-xs | text-sm | text-base | text-lg

// Get in Touch button
const CTA_TEXT = "Get in Touch";
const CTA_TEXT_SIZE = "text-sm";

// Navbar styling
const NAVBAR_PADDING = "px-5 py-1";
const NAVBAR_BORDER = "border border-neutral-700/30";
const NAVBAR_BG = "bg-transparent backdrop-blur-md";
const NAV_SCALE = 0.8; // Adjust this to scale the navbar (e.g., 0.8 = 80%, 1.2 = 120%)

// Active / inactive colors
const ACTIVE_TEXT_DARK = "text-silver hover:opacity-80";
const INACTIVE_TEXT_DARK = "text-silver opacity-70 hover:opacity-100";

const ACTIVE_TEXT_LIGHT = "text-black hover:opacity-80";
const INACTIVE_TEXT_LIGHT = "text-black/60 hover:text-black";

// Button styles
const CTA_BG = "bg-white hover:bg-neutral-200";
const CTA_TEXT_COLOR = "text-black";

/* ===============================
   🚀 NAVBAR COMPONENT
================================ */

const Navbar = ({ isLoading = false }: { isLoading?: boolean }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isDarkPage = location.pathname === "/get-in-touch" || location.pathname === "/certificates" || location.pathname === "/resume";

  /* ---------- Navigation Helpers ---------- */

  const navigateHome = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
      window.scrollTo({ top: 0 });
    }
  };

  const scrollToSkillsSection = () => {
    const section = document.getElementById("skills");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  const handleSkillsClick = () => {
    if (location.pathname === "/") {
      scrollToSkillsSection();
    } else {
      navigate("/");
      setTimeout(scrollToSkillsSection, 300);
    }
  };

  const handleProjectsClick = () => {
    navigate("/projects");
    window.scrollTo({ top: 0 });
  };

  const handleGetInTouchClick = () => {
    navigate("/get-in-touch");
    window.scrollTo({ top: 0 });
  };

  /* ---------- Nav Items ---------- */

  const navItems = [
    {
      name: "HOME",
      onClick: navigateHome,
      active: location.pathname === "/",
    },
    {
      name: "SKILLS",
      onClick: handleSkillsClick,
      active: false,
    },
    {
      name: "PROJECTS",
      onClick: handleProjectsClick,
      active: location.pathname === "/projects",
    },
  ];

  /* ---------- JSX ---------- */

  return (
    <>
      {/* LOGO */}

      <style>
        {`@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');`}
      </style>
      <button
        key={isLoading ? "loading" : "loaded"} // Force remount to prevent opacity transition
        onClick={navigateHome}
        className={cn(
          "fixed top-6 left-6 z-50 tracking-wide transition-opacity hover:opacity-80 whitespace-nowrap", // Added whitespace-nowrap
          LOGO_SIZE,
          isDarkPage ? "text-silver" : "mix-blend-difference text-white",
          isLoading ? "opacity-0 pointer-events-none" : "opacity-100 duration-300"
        )}
        style={{ fontFamily: "'Great Vibes', cursive" }}
      >
        {LOGO_TEXT}
      </button>

      {/* NAVBAR (Hidden on Home Page as requested) */}
      <div className={cn(
        "fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-opacity duration-700 delay-500",
        isLoading ? "opacity-0 pointer-events-none" : "opacity-100"
      )}>
        <nav
          className={cn(
            "flex items-center gap-1 rounded-full border",
            NAVBAR_PADDING,
            NAVBAR_BORDER,
            NAVBAR_BG
          )}
          style={{
            transform: `scale(${NAV_SCALE})`,
            transformOrigin: "top center"
          }}
        >
          {/* Nav Items */}
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={item.onClick}
              className={cn(
                "relative px-2 py-2 font-medium transition-colors duration-200",
                NAV_TEXT_SIZE,
                item.active
                  ? (isDarkPage ? ACTIVE_TEXT_DARK : ACTIVE_TEXT_LIGHT)
                  : (isDarkPage ? INACTIVE_TEXT_DARK : INACTIVE_TEXT_LIGHT)
              )}
            >
              {item.name}
            </button>
          ))}

          {/* Divider */}
          <div className={cn(
            "mx-2 h-4 w-[1px]",
            isDarkPage ? "bg-silver opacity-50" : "bg-black/20"
          )}
          />

          {/* CTA */}
          <button
            onClick={handleGetInTouchClick}
            className={cn(
              "rounded-full px-5 py-2 font-medium transition-all",
              CTA_TEXT_SIZE,
              CTA_BG,
              CTA_TEXT_COLOR,
              (location.pathname === "/get-in-touch" || location.pathname === "/certificates") && "bg-neutral-200"
            )}
          >
            {CTA_TEXT}
          </button>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
