import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

/* ===============================
   🔧 NAVBAR CONFIG (EDIT HERE)
================================ */

// Logo
const LOGO_TEXT = "CHITKUL LAKSHYA";
const LOGO_SIZE = "text-lg"; // text-sm | text-base | text-lg | text-xl | text-2xl

// Nav item text size
const NAV_TEXT_SIZE = "text-base"; // text-xs | text-sm | text-base | text-lg

// Get in Touch button
const CTA_TEXT = "Get in Touch";
const CTA_TEXT_SIZE = "text-sm";

// Navbar styling
const NAVBAR_PADDING = "px-5 py-1";
const NAVBAR_BORDER = "border-neutral-800";
const NAVBAR_BG = "bg-transparent backdrop-blur-md";

// Active / inactive colors
const ACTIVE_TEXT = "text-black hover:text-white";
const INACTIVE_TEXT = "text-black hover:text-white";

// Button styles
const CTA_BG = "bg-white hover:bg-neutral-200";
const CTA_TEXT_COLOR = "text-black";

/* ===============================
   🚀 NAVBAR COMPONENT
================================ */

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
      name: "Home",
      onClick: navigateHome,
      active: location.pathname === "/",
    },
    {
      name: "Skills",
      onClick: handleSkillsClick,
      active: false,
    },
    {
      name: "Projects",
      onClick: handleProjectsClick,
      active: location.pathname === "/projects",
    },
  ];

  /* ---------- JSX ---------- */

  return (
    <>
      {/* LOGO */}
      <button
        onClick={navigateHome}
        className={cn(
          "fixed top-6 left-6 z-50 font-bold tracking-wide transition-opacity hover:opacity-80 mix-blend-difference",
          LOGO_SIZE,
          "text-white"
        )}
      >
        {LOGO_TEXT}
      </button>

      {/* NAVBAR */}
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
        <nav
          className={cn(
            "flex items-center gap-1 rounded-full border",
            NAVBAR_PADDING,
            NAVBAR_BORDER,
            NAVBAR_BG
          )}
        >
          {/* Nav Items */}
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={item.onClick}
              className={cn(
                "relative px-2 py-2 font-medium transition-colors duration-200",
                NAV_TEXT_SIZE,
                item.active ? ACTIVE_TEXT : INACTIVE_TEXT
              )}
            >
              {item.name}
            </button>
          ))}

          {/* Divider */}
          <div className="mx-2 h-4 w-[1px] bg-neutral-800" />

          {/* CTA */}
          <button
            onClick={handleGetInTouchClick}
            className={cn(
              "rounded-full px-5 py-2 font-medium transition-all",
              CTA_TEXT_SIZE,
              CTA_BG,
              CTA_TEXT_COLOR,
              location.pathname === "/get-in-touch" && "bg-neutral-200"
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
