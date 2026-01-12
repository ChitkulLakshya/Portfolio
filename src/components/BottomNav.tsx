
import { Home, Lightbulb, FolderGit2, Mail } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const navItems = [
        {
            label: "Home",
            icon: Home,
            action: () => {
                if (location.pathname === "/") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                } else {
                    navigate("/");
                }
            },
            isActive: location.pathname === "/" && !location.hash,
        },
        {
            label: "Skills",
            icon: Lightbulb,
            action: () => {
                if (location.pathname === "/") {
                    const skillsSection = document.getElementById("stack"); // Skills section id is 'stack' in Skills.tsx
                    if (skillsSection) {
                        skillsSection.scrollIntoView({ behavior: "smooth" });
                    }
                } else {
                    navigate("/#stack");
                    // Dispatch a custom event or check on mount to scroll? 
                    // For simplicity, just navigating to hash might rely on browser behavior or extra logic in Index.
                    // Let's rely on standard hash navigation for now or useEffect in Index.
                    setTimeout(() => {
                        const skillsSection = document.getElementById("stack");
                        if (skillsSection) skillsSection.scrollIntoView({ behavior: "smooth" });
                    }, 100);
                }
            },
            isActive: location.hash === "#stack", // Approximate check
        },
        {
            label: "Projects",
            icon: FolderGit2,
            action: () => navigate("/projects"),
            isActive: location.pathname === "/projects",
        },
        {
            label: "Contact",
            icon: Mail,
            action: () => navigate("/get-in-touch"),
            isActive: location.pathname === "/get-in-touch",
        },
    ];

    const isDarkPage = location.pathname === "/get-in-touch" || location.pathname === "/certificates" || location.pathname === "/resume";

    const mainNavItems = navItems.slice(0, 3);
    const contactItem = navItems[3];

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[95%] sm:max-w-md">
            <div className={cn(
                "flex items-center justify-between rounded-full border px-4 py-2 shadow-sm backdrop-blur-md transition-colors gap-2",
                isDarkPage
                    ? "bg-white/10 border-white/20"
                    : "bg-transparent border-neutral-700/30"
            )}>
                <div className="flex items-center justify-around flex-1">
                    {mainNavItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={item.action}
                            className={cn(
                                "flex flex-col items-center justify-center gap-1 transition-all duration-300 px-2",
                                isDarkPage
                                    ? (item.isActive ? "text-white scale-110" : "text-white/60 hover:text-white")
                                    : (item.isActive ? "text-black scale-110" : "text-black/60 hover:text-black")
                            )}
                        >
                            <item.icon className="w-5 h-5" />

                        </button>
                    ))}
                </div>

                <div className={cn(
                    "h-8 w-[1px] opacity-20",
                    isDarkPage ? "bg-white" : "bg-black"
                )} />

                <button
                    onClick={contactItem.action}
                    className={cn(
                        "rounded-full px-4 py-2 font-medium transition-all text-sm whitespace-nowrap",
                        "bg-white hover:bg-neutral-200 text-black",
                        (location.pathname === "/get-in-touch" || location.pathname === "/certificates") && "bg-neutral-200"
                    )}
                >
                    Get in Touch
                </button>
            </div>
        </div>
    );
};

export default BottomNav;
