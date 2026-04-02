"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Tracks which navigation section is currently "active" based on:
 * 1. Hero card state — fired via the `heroSectionChange` custom event ("home" | "about")
 * 2. Scroll position — detects when #projects or #contact enter the viewport
 *
 * @returns The currently active section identifier string
 *
 * @example
 * const activeSection = useActiveSection();
 * <NavLink active={activeSection === "projects"} />
 */
export function useActiveSection(): string {
  const pathname = usePathname();

  // Driven by hero animation signals ("home" | "about")
  const [heroSection, setHeroSection] = useState("home");
  // Driven by native scroll position ("projects" | "contact" | "")
  const [scrollSection, setScrollSection] = useState("");

  useEffect(() => {
    if (pathname !== "/") {
      setScrollSection(pathname.includes("/projects") ? "projects" : "");
      return;
    }

    // Hero fires this event when card state changes (home ↔ about)
    const handleHeroSection = (e: Event) => {
      const custom = e as CustomEvent<{ section: string }>;
      setHeroSection(custom.detail.section);
      // Clear scroll-based section when returning to the hero zone
      if (custom.detail.section === "home") setScrollSection("");
    };
    window.addEventListener("heroSectionChange", handleHeroSection);

    // Highlight the correct section based on scroll position
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY < 200) {
        // Back in the hero zone — let hero signals control
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

  // Scroll-based section takes priority when inside the page body
  return scrollSection || heroSection;
}
