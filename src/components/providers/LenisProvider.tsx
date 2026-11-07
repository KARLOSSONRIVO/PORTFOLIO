"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

/**
 * Wraps the app with Lenis smooth scroll.
 * Starts paused — the hero fires `heroSectionChange` to control it:
 *   "about"  → start after the 980ms scroll-ready wait the hero uses
 *   "home"   → stop (hero has locked body overflow again)
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  // Route changes: Next.js already moves the native scroll position (to the
  // top, or to a hash target) before this runs. Lenis tracks its own
  // scroll target internally, so re-sync it to wherever the native scroll
  // landed — otherwise Lenis's next RAF tick can animate back to the stale
  // pre-navigation position. Only non-home routes get `start()`, since the
  // hero on "/" controls Lenis via `heroSectionChange`.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (pathname !== "/") lenis.start();
    requestAnimationFrame(() => {
      lenis.scrollTo(window.scrollY, { immediate: true, force: true });
    });
  }, [pathname]);

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
      const custom = e as CustomEvent<{ section: string; scrollTarget?: "about" | "projects" | "contact" }>;

      if (custom.detail.section === "about") {
        clearTimeout(startTimer.id);
        if (custom.detail.scrollTarget) {
          lenis.start();
          lenis.scrollTo(custom.detail.scrollTarget === "about" ? 0 : `#${custom.detail.scrollTarget}`, {
            duration: 1.2,
            force: true,
            immediate: window.matchMedia("(prefers-reduced-motion: reduce)").matches
              || document.documentElement.dataset.motionPaused === "true",
          });
          return;
        }
        // Match the hero's 980 ms scroll-ready delay on its initial expansion.
        lenis.scrollTo(window.scrollY, { immediate: true, force: true });
        startTimer.id = setTimeout(() => lenis.start(), 1000);
      } else {
        clearTimeout(startTimer.id);
        lenis.stop();
      }
    };

    window.addEventListener("heroSectionChange", handleHeroSection);

    const handleCertificatePreview = (event: Event) => {
      const { open } = (event as CustomEvent<{ open: boolean }>).detail;
      clearTimeout(startTimer.id);
      if (open) lenis.stop();
      else {
        lenis.start();
        lenis.scrollTo(window.scrollY, { immediate: true, force: true });
      }
    };
    window.addEventListener("certificatePreviewChange", handleCertificatePreview);

    // RAF loop
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      window.removeEventListener("heroSectionChange", handleHeroSection);
      window.removeEventListener("certificatePreviewChange", handleCertificatePreview);
      clearTimeout(startTimer.id);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
