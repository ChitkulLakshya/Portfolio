import Navbar from "@/components/Navbar";
import Ubuntu from "@/components/Ubuntu";
import Windows from "@/components/windows";
import MacOS from "@/components/MacOS";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import SplineScrollTrack from "@/components/SplineScrollTrack";

const DesktopView = ({
    isLoading = false,
    isWindows = false,
    isMac = false,
}: {
    isLoading?: boolean;
    isWindows?: boolean;
    isMac?: boolean;
}) => {
    // ── Hero slot: pick the right OS UI ──────────────────────────────────────
    // Each OS component now returns just its hero UI content (no section wrapper).
    // SplineScrollTrack places it into an absolutely-positioned h-screen overlay
    // on top of the sticky 3D Spline canvas.
    const heroSlot = isWindows ? (
        <Windows isLoading={isLoading} />
    ) : isMac ? (
        <MacOS isLoading={isLoading} />
    ) : (
        <Ubuntu isLoading={isLoading} />
    );

    return (
        <div className="min-h-screen overflow-x-hidden relative bg-transparent">
            <Navbar isLoading={isLoading} />

            <main className="overflow-x-hidden relative">
                {/* ────────────────────────────────────────────────────────────
                  SCROLL TRACK  (0 → 200vh)
                  The Spline 3D scene is pinned (sticky) behind the page for
                  exactly 2 viewport heights:
                    • 0 → 100vh  : Hero / Home UI (heroSlot overlay)
                    • 100 → 200vh: 3D animation zone — laptop swoops in &
                                   the laptop screen reveal plays. No DOM
                                   overlay needed; the Spline IS the content.
                  Once the user scrolls past 200vh, the track ends and the
                  sticky canvas scrolls up naturally, revealing the sections below.
                ──────────────────────────────────────────────────────────── */}
                <SplineScrollTrack heroSlot={heroSlot} />

                {/* ────────────────────────────────────────────────────────────
                  NORMAL DOCUMENT FLOW  (>200vh)
                  These sections sit in the regular page flow below the scroll
                  track. As the user scrolls here, the Spline track exits the
                  viewport naturally above — no JavaScript needed.
                ──────────────────────────────────────────────────────────── */}
                <About />
                <Contact />
            </main>

            <Footer />
        </div>
    );
};

export default DesktopView;
