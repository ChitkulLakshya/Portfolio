import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Home button
  const navigateHome = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
      window.scrollTo({ top: 0 }); // scroll to top after navigation
    }
  };

  // Scroll to Skills section
  const scrollToSkillsSection = () => {
    const section = document.getElementById("skills");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Skills button
  const handleSkillsClick = () => {
    if (location.pathname === "/") {
      scrollToSkillsSection();
    } else {
      navigate("/");
      setTimeout(scrollToSkillsSection, 300); // wait for navigation then scroll
    }
  };

  // Projects button
  const handleProjectsClick = () => {
    navigate("/projects");
    window.scrollTo({ top: 0 }); // always scroll to top
  };

  // Get in Touch button
  const handleGetInTouchClick = () => {
    navigate("/get-in-touch");
    window.scrollTo({ top: 0 }); // always scroll to top
  };

  const navLinkClass = (isActive = false) =>
    `text-sm uppercase tracking-wide transition-opacity duration-200 ${
      isActive ? "opacity-100" : "opacity-70 hover:opacity-100"
    }`;

  return (
    <>
      {/* Floating Name */}
      <button
        onClick={navigateHome}
        className="text-xs md:text-lg font-bold tracking-wide text-black transition-opacity hover:opacity-80 whitespace-nowrap truncate max-w-[120px] md:max-w-none fixed z-[9999]"
        style={{
          top: "20px",
          left: "20px",
        }}
      >
        CHITKUL LAKSHYA
      </button>

      {/* Floating Home */}
      <button
        onClick={navigateHome}
        className={navLinkClass()}
        style={{
          position: "fixed",
          top: "25px",
          left: "820px",
          zIndex: 9999,
          fontSize:"1rem",
        }}
      >
        Home
      </button>

      {/* Floating Skills */}
      <button
        onClick={handleSkillsClick}
        className={navLinkClass()}
        style={{
          position: "fixed",
          top: "25px",
          left: "900px",
          fontSize:"1rem",
          zIndex: 9999,
        }}
      >
        Skills
      </button>

      {/* Floating Projects */}
      <button
        onClick={handleProjectsClick}
        className={navLinkClass()}
        style={{
          position: "fixed",
          top: "25px",
          left: "980px",
          zIndex: 9999,
          fontSize:"1rem",
        }}
      >
        Projects
      </button>

      {/* Floating Get in Touch */}
      <button
        onClick={handleGetInTouchClick}
        className="text-sm uppercase tracking-wide px-4 py-2 border border-black/20 rounded-full text-black transition-all duration-200 hover:border-black/40 hover:opacity-90 fixed z-[9999]"
        style={{
          top: "860px",
          right: "40px",
        }}
      >
        Get in Touch
      </button>
    </>
  );
};

export default Navbar;
