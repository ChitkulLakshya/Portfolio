import { useState } from "react";
import { Menu, X, Home, User, Code, Briefcase, MessageSquare } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: "Home", href: "/#home", icon: <Home /> },
    { name: "About", href: "/#about", icon: <User /> },
    { name: "Skills", href: "/#skills", icon: <Code /> },
    { name: "Services", href: "/#services", icon: <Briefcase /> },
    { name: "Projects", href: "/projects", icon: <Briefcase /> },
    { name: "Contact", href: "/#contact", icon: <MessageSquare /> },
  ];

  const handleNavClick = (href: string) => {
    const [path, hash] = href.split("#");

    if (path === "/projects") {
      navigate("/projects");
    } else {
      navigate("/" + (hash ? `#${hash}` : ""));
      if (hash) {
        const element = document.getElementById(hash);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }
    }

    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-black text-white px-4 py-4 items-center justify-between">
        <button
          onClick={() => handleNavClick("/#home")}
          className="text-xl font-stencil tracking-widest"
        >
          CHITKUL LAKSHYA
        </button>

        <div className="flex space-x-6">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.href)}
              className="text-white uppercase hover:text-red-600 font-stencil"
            >
              {link.name}
            </button>
          ))}
        </div>
      </nav>

      {/* Mobile Bottom Navbar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-black md:hidden border-t border-gray-800">
        <div className="flex justify-around items-center py-2">
          {navLinks.map((item) => {
            const isActive =
              location.hash === `#${item.href.split("#")[1]}` ||
              location.pathname === item.href;
            return (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                className={`flex flex-col items-center text-white text-xs ${
                  isActive ? "text-red-400" : "text-gray-300"
                }`}
              >
                {item.icon}
                <span className="mt-1 font-stencil">{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navbar;
