import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";

export default function DashboardLayout({ children }) {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFooter(window.scrollY > 900);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar onToggleSidebar={() => setShowSidebar((prev) => !prev)} />
      <div className="d-flex flex-grow-1">
        <Sidebar show={showSidebar} onLinkClick={() => setShowSidebar(false)} />
        <main className="flex-grow-1 p-3 p-md-4 bg-body-tertiary">
          {children}
        </main>
      </div>
      {showFooter && <Footer />}
    </div>
  );
}
