"use client";

import Lenis from "lenis";
import { useEffect, useRef } from "react";

/**
 * Wraps the app with Lenis smooth scroll.
 * Starts paused — the hero fires `heroSectionChange` to control it:
 *   "about"  → start after the 980ms scroll-ready wait the hero uses
 *   "home"   → stop (hero has locked body overflow again)
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Start paused — hero grants permission via custom event
    lenis.stop();

    const startTimer = { id: undefined as ReturnType<typeof setTimeout> | undefined };

    const handleHeroSection = (e: Event) => {
      const custom = e as CustomEvent<{ section: string }>;

      if (custom.detail.section === "about") {
        // Match the hero's 980 ms scroll-ready delay
        clearTimeout(startTimer.id);
        startTimer.id = setTimeout(() => lenis.start(), 1000);
      } else {
        clearTimeout(startTimer.id);
        lenis.stop();
      }
    };

    window.addEventListener("heroSectionChange", handleHeroSection);

    // RAF loop
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      window.removeEventListener("heroSectionChange", handleHeroSection);
      clearTimeout(startTimer.id);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
