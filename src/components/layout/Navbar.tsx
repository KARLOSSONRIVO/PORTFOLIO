"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { LayoutGrid, Layers, User, Mail, Component } from "lucide-react";
import { PreferenceControls } from "@/components/ui/PreferenceControls";
import { usePathname } from "next/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";

export function Navbar() {
  const pathname = usePathname();
  const activeSection = useActiveSection();

  /** Intercept Home/About clicks to animate the hero instead of doing hash navigation */
  const handleHeroNav = (action: "expand" | "collapse") => (e: React.MouseEvent) => {
    if (pathname !== "/") return;
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("heroNavRequest", { detail: { action } }));
  };

  const handleSectionNav = (target: "projects" | "contact") => (e: React.MouseEvent) => {
    if (pathname !== "/") return;
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("heroNavRequest", { detail: { action: "expand", target } }));
  };

  return (
    <>
      <Link href="/" onClick={handleHeroNav("collapse")} className="site-brand" aria-label="Karlos Son Rivo — Home">
        <Component aria-hidden="true" />
        <span>Karlos Son Rivo</span>
      </Link>
      <header className="desktop-nav-header">
        <nav aria-label="Main navigation" className="desktop-nav-shell">
          <div className="desktop-nav-links">
            <NavLink href="/#home" active={activeSection === "home"} onClick={handleHeroNav("collapse")}>
              Home
            </NavLink>
            <NavLink href="/#about" active={activeSection === "about"} onClick={handleHeroNav("expand")}>
              About
            </NavLink>
            <NavLink href="/#projects" active={activeSection === "projects"} onClick={handleSectionNav("projects")}>
              Projects
            </NavLink>
            <NavLink href="/#contact" active={activeSection === "contact"} onClick={handleSectionNav("contact")}>
              Contact
            </NavLink>
          </div>
          <PreferenceControls />
        </nav>
      </header>
      <div className="mobile-preference-controls"><PreferenceControls /></div>

      {/* Mobile Bottom Navigation */}
      <nav
        className="md:hidden fixed left-1/2 -translate-x-1/2 flex justify-around items-center p-1.5 xs:p-2 z-50 bg-surface-container/60 backdrop-blur-xl w-[92%] xs:w-[90%] max-w-md rounded-2xl border border-outline-variant/15 shadow-[0_0_40px_rgba(220,20,60,0.08)]"
        style={{ bottom: "calc(1.5rem + env(safe-area-inset-bottom))" }}
      >
        <MobileNavLink href="/#home" icon={<LayoutGrid className="w-5 h-5" />} label="Home" active={activeSection === "home"} onClick={handleHeroNav("collapse")} />
        <MobileNavLink href="/#about" icon={<User className="w-5 h-5" />} label="About" active={activeSection === "about"} onClick={handleHeroNav("expand")} />
        <MobileNavLink href="/#projects" icon={<Layers className="w-5 h-5" />} label="Projects" active={activeSection === "projects"} onClick={handleSectionNav("projects")} />
        <MobileNavLink href="/#contact" icon={<Mail className="w-5 h-5" />} label="Contact" active={activeSection === "contact"} onClick={handleSectionNav("contact")} />
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
      className="desktop-nav-link"
      aria-current={active ? "location" : undefined}
    >
      <span className="relative z-10">{children}</span>
      {active && (
        <motion.div
          layoutId="navbar-active"
          className="desktop-nav-active"
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
      className={`flex flex-1 flex-col items-center justify-center px-2 xs:px-3 sm:px-4 py-1.5 xs:py-2 rounded-xl transition-all ${
        active ? "text-primary bg-primary/10" : "text-on-surface hover:bg-primary/5"
      }`}
    >
      {icon}
      <span className="font-label text-[9px] xs:text-[10px] uppercase tracking-widest mt-1 whitespace-nowrap">{label}</span>
    </Link>
  );
}
