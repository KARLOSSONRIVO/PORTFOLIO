"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { LayoutGrid, Layers, User, Mail, Component } from "lucide-react";
import { useState, useEffect } from "react";

export function Navbar() {
  const pathname = usePathname();
  // heroSection: controlled by the hero animation signals ("home" | "about")
  const [heroSection, setHeroSection] = useState("home");
  // scrollSection: controlled by native scroll position ("projects" | "contact" | "")
  const [scrollSection, setScrollSection] = useState("");

  // Active navlink = scroll-based if within page body, else hero-controlled
  const activeSection = scrollSection || heroSection;

  useEffect(() => {
    if (pathname !== "/") {
      setScrollSection(pathname.includes("/projects") ? "projects" : "");
      return;
    }

    // Hero fires this event when card state changes (home ↔ about)
    const handleHeroSection = (e: Event) => {
      const custom = e as CustomEvent<{ section: string }>;
      setHeroSection(custom.detail.section);
      // Clear scroll-based section when going back to hero zone
      if (custom.detail.section === "home") setScrollSection("");
    };
    window.addEventListener("heroSectionChange", handleHeroSection);

    // Scroll listener to detect projects / contact sections
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY < 200) {
        // Back in hero zone — let hero signal control
        setScrollSection("");
        return;
      }

      const projects = document.getElementById("projects");
      const contact = document.getElementById("contact");
      const mid = scrollY + window.innerHeight * 0.4;

      if (contact && mid >= contact.offsetTop) {
        setScrollSection("contact");
      } else if (projects && mid >= projects.offsetTop) {
        setScrollSection("projects");
      } else {
        setScrollSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("heroSectionChange", handleHeroSection);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  /** Intercept Home/About clicks to animate the hero instead of doing hash navigation */
  const handleHeroNav = (action: "expand" | "collapse") => (e: React.MouseEvent) => {
    if (pathname !== "/") return; // Let Next.js navigate normally from other pages
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("heroNavRequest", { detail: { action } }));
  };

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-gradient-to-b from-surface to-transparent pointer-events-none">
        <nav className="flex justify-between items-center px-8 py-6 max-w-full mx-auto pointer-events-auto">
          <Link href="/" onClick={handleHeroNav("collapse")} className="flex items-center gap-2 group">
            <Component className="text-primary w-8 h-8 group-hover:rotate-180 transition-transform duration-700" />
            <span className="text-2xl font-black tracking-[-0.04em] text-primary font-headline uppercase">
              Karlos Rivo
            </span>
          </Link>
          <div className="hidden md:flex gap-8 items-center font-label text-[12px] uppercase tracking-widest">
            <NavLink href="/#home" active={activeSection === "home"} onClick={handleHeroNav("collapse")}>
              Home
            </NavLink>
            <NavLink href="/#about" active={activeSection === "about"} onClick={handleHeroNav("expand")}>
              About
            </NavLink>
            <NavLink href="/#projects" active={activeSection === "projects"}>
              Projects
            </NavLink>
            <NavLink href="/#contact" active={activeSection === "contact"}>
              Contact
            </NavLink>
          </div>
        </nav>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 flex justify-around items-center p-2 z-50 bg-surface-container/60 backdrop-blur-xl w-[90%] max-w-md rounded-2xl border border-outline-variant/15 shadow-[0_0_40px_rgba(220,20,60,0.08)]">
        <MobileNavLink href="/#home" icon={<LayoutGrid className="w-5 h-5" />} label="Home" active={activeSection === "home"} onClick={handleHeroNav("collapse")} />
        <MobileNavLink href="/#about" icon={<User className="w-5 h-5" />} label="About" active={activeSection === "about"} onClick={handleHeroNav("expand")} />
        <MobileNavLink href="/#projects" icon={<Layers className="w-5 h-5" />} label="Projects" active={activeSection === "projects"} />
        <MobileNavLink href="/#contact" icon={<Mail className="w-5 h-5" />} label="Contact" active={activeSection === "contact"} />
      </nav>
    </>
  );
}

function NavLink({
  href,
  children,
  active,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  active: boolean;
  onClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`transition-colors duration-300 relative ${
        active ? "text-primary" : "text-on-surface hover:text-primary"
      }`}
    >
      {children}
      {active && (
        <motion.div
          layoutId="navbar-active"
          className="absolute -bottom-1 left-0 right-0 h-px bg-primary"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </Link>
  );
}

function MobileNavLink({
  href,
  icon,
  label,
  active,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick?: (e: React.MouseEvent) => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex flex-col items-center justify-center px-4 py-2 rounded-xl transition-all ${
        active ? "text-primary bg-primary/10" : "text-on-surface hover:bg-primary/5"
      }`}
    >
      {icon}
      <span className="font-label text-[10px] uppercase tracking-widest mt-1">{label}</span>
    </Link>
  );
}
