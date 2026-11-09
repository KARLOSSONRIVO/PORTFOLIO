"use client";

import Lenis from "lenis";
import { MotionConfig } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useSitePreferences } from "@/hooks/useSitePreferences";

/**
 * Native scrolling on touch-first devices; demand-driven Lenis elsewhere.
 * The hero's section events coordinate navigation and the initial scroll lock.
 * Certificate and project previews suspend scrolling until their modal is dismissed.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const { paused } = useSitePreferences();
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
    // Touch-first devices already have efficient native momentum scrolling.
    // Avoid installing Lenis's non-passive touch listeners on that path.
    const nativeTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    const lenis = nativeTouch ? null : new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Start paused — hero grants permission via custom event
    lenis?.stop();

    const startTimer = { id: undefined as ReturnType<typeof setTimeout> | undefined };

    // Run frames only while Lenis is interpolating a scroll. In particular,
    // Home, native touch scrolling, idle pages and background tabs need no loop.
    let rafId: number | null = null;
    function stopFrames() {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = null;
    }
    function raf(time: number) {
      rafId = null;
      if (!lenis || lenis.isStopped || document.hidden) return;
      lenis.raf(time);
      if (lenis.isScrolling === "smooth") rafId = requestAnimationFrame(raf);
    }
    function wakeFrames() {
      if (!lenis || rafId !== null || lenis.isStopped || document.hidden) return;
      // Do not feed the elapsed idle time into the next scroll animation.
      lenis.time = performance.now();
      rafId = requestAnimationFrame(raf);
    }
    const unsubscribeVirtualScroll = lenis?.on("virtual-scroll", wakeFrames);
    const handleVisibility = () => {
      if (document.hidden) stopFrames();
      else if (lenis?.isScrolling === "smooth") wakeFrames();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    const handleHeroSection = (e: Event) => {
      const custom = e as CustomEvent<{ section: string; scrollTarget?: "about" | "projects" | "skills" | "contact" }>;

      if (custom.detail.section === "about") {
        clearTimeout(startTimer.id);
        if (custom.detail.scrollTarget) {
          const immediate = window.matchMedia("(prefers-reduced-motion: reduce)").matches
            || document.documentElement.dataset.motionPaused === "true";
          if (lenis) {
            lenis.start();
            lenis.scrollTo(custom.detail.scrollTarget === "about" ? 0 : `#${custom.detail.scrollTarget}`, {
              duration: 1.2, force: true, immediate,
            });
            wakeFrames();
          } else {
            const target = document.getElementById(custom.detail.scrollTarget);
            window.scrollTo({ top: custom.detail.scrollTarget === "about" ? 0 : window.scrollY + (target?.getBoundingClientRect().top ?? 0), behavior: immediate ? "instant" : "smooth" });
          }
          return;
        }
        // Match the hero's 980 ms scroll-ready delay on its initial expansion.
        if (lenis) {
          lenis.scrollTo(window.scrollY, { immediate: true, force: true });
          startTimer.id = setTimeout(() => lenis.start(), 1000);
        }
      } else {
        clearTimeout(startTimer.id);
        if (lenis) lenis.stop();
        else window.scrollTo({ top: window.scrollY, behavior: "instant" });
        stopFrames();
      }
    };

    window.addEventListener("heroSectionChange", handleHeroSection);

    const handlePreview = (event: Event) => {
      const { open } = (event as CustomEvent<{ open: boolean }>).detail;
      clearTimeout(startTimer.id);
      if (open) {
        if (lenis) lenis.stop();
        else window.scrollTo({ top: window.scrollY, behavior: "instant" });
        stopFrames();
      } else if (lenis) {
        lenis.start();
        lenis.scrollTo(window.scrollY, { immediate: true, force: true });
      }
    };
    window.addEventListener("certificatePreviewChange", handlePreview);
    window.addEventListener("projectPreviewChange", handlePreview);

    return () => {
      window.removeEventListener("heroSectionChange", handleHeroSection);
      window.removeEventListener("certificatePreviewChange", handlePreview);
      window.removeEventListener("projectPreviewChange", handlePreview);
      clearTimeout(startTimer.id);
      document.removeEventListener("visibilitychange", handleVisibility);
      unsubscribeVirtualScroll?.();
      stopFrames();
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <MotionConfig reducedMotion={paused ? "always" : "user"}>{children}</MotionConfig>;
}
