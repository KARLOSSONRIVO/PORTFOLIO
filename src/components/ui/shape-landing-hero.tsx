"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { AboutProfile } from "@/components/ui/AboutProfile";
import { PortraitIntro } from "@/components/ui/PortraitIntro";

function HeroGeometric({
    name = "KARLOS SON P. RIVO",
    subtitle = "I build thoughtful software, from the interface to the systems behind it.",
    title1 = "Elevate Your Digital Vision",
    title2 = "Crafting Exceptional Websites",
}: {
    name?: string;
    title1?: string;
    title2?: string;
    subtitle?: string;
}) {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [expanded, setExpanded] = useState(false);
    const [showContent, setShowContent] = useState(false);
    // scrollReady gates body-overflow unlock until content has fully faded in
    const [scrollReady, setScrollReady] = useState(false);
    const [touchStartY, setTouchStartY] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [viewportHeight, setViewportHeight] = useState(0);
    const [aboutHeight, setAboutHeight] = useState(0);
    const aboutContentRef = useRef<HTMLDivElement>(null);

    const progressRef = useRef(0);
    const expandedRef = useRef(false);
    const contentTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const scrollReadyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    // RAF handle for navbar-triggered animations
    const navRafRef = useRef<number>(0);
    const pendingSectionRef = useRef<"projects" | "contact" | undefined>(undefined);

    useEffect(() => () => {
        if (contentTimerRef.current) clearTimeout(contentTimerRef.current);
        if (scrollReadyTimerRef.current) clearTimeout(scrollReadyTimerRef.current);
    }, []);

    useEffect(() => { progressRef.current = scrollProgress; }, [scrollProgress]);
    useEffect(() => { expandedRef.current = expanded; }, [expanded]);

    useEffect(() => {
        const check = () => {
            setIsMobile(window.innerWidth < 768);
            setViewportHeight(window.innerHeight);
        };
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    // Measure intrinsic content, not a viewport-sized scroll panel. Width/font
    // changes can reflow the records, so keep the expansion target up to date.
    useEffect(() => {
        const content = aboutContentRef.current;
        if (!content) return;
        const observer = new ResizeObserver(([entry]) => setAboutHeight(Math.ceil(entry.contentRect.height)));
        observer.observe(content);
        return () => observer.disconnect();
    }, []);

    // Lock body scroll until content is fully faded in (scrollReady)
    useEffect(() => {
        if (!scrollReady) {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
            const target = pendingSectionRef.current;
            if (target) {
                pendingSectionRef.current = undefined;
                window.history.pushState(null, "", `/#${target}`);
                document.getElementById(target)?.scrollIntoView({ behavior: "instant" });
            } else if (window.location.hash === "#about") {
                // The browser may have anchored to About while its card was still collapsed.
                window.scrollTo({ top: 0, behavior: "instant" });
            }
        }
        return () => {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        };
    }, [scrollReady]);

    // Single persistent event handler — handles both expansion AND collapse
    useEffect(() => {
        const canScrollPanel = (target: EventTarget | null, delta: number) => {
            const intro = target instanceof Element ? target.closest<HTMLElement>(".portrait-intro") : null;
            if (!intro || intro.scrollHeight <= intro.clientHeight + 2) return false;
            return delta > 0 ? intro.scrollTop + intro.clientHeight < intro.scrollHeight - 2 : intro.scrollTop > 0;
        };
        const handleWheel = (e: WheelEvent) => {
            if (document.documentElement.dataset.certificatePreviewOpen === "true") return;
            const exp = expandedRef.current;

            if (exp) {
                if (canScrollPanel(e.target, e.deltaY)) return;
                // Fully expanded: only intercept scroll-up at the very top of page
                if (window.scrollY <= 2 && e.deltaY < 0) {
                    e.preventDefault();
                    // Start collapsing
                    setExpanded(false);
                    setShowContent(false);
                    setScrollReady(false);
                    if (contentTimerRef.current) clearTimeout(contentTimerRef.current);
                    if (scrollReadyTimerRef.current) clearTimeout(scrollReadyTimerRef.current);
                    // Signal navbar back to "home"
                    window.dispatchEvent(new CustomEvent("heroSectionChange", { detail: { section: "home" } }));
                }
                // Else: let native scroll handle downward scrolling seamlessly
                return;
            }

            if (canScrollPanel(e.target, e.deltaY)) return;
            // After the responsive intro has been read, scroll drives expansion.
            e.preventDefault();
            const delta = e.deltaY * 0.0012;
            const next = Math.min(Math.max(progressRef.current + delta, 0), 1);
            setScrollProgress(next);

            if (next >= 1) {
                if (!expandedRef.current) {
                    setExpanded(true);
                    window.dispatchEvent(new CustomEvent("heroSectionChange", { detail: { section: "about" } }));
                    contentTimerRef.current = setTimeout(() => setShowContent(true), 180);
                    if (scrollReadyTimerRef.current) clearTimeout(scrollReadyTimerRef.current);
                    scrollReadyTimerRef.current = setTimeout(() => setScrollReady(true), 980);
                }
            } else {
                setShowContent(false);
            }
        };

        const handleTouchStart = (e: TouchEvent) => {
            if (document.documentElement.dataset.certificatePreviewOpen === "true") return;
            setTouchStartY(e.touches[0].clientY);
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (document.documentElement.dataset.certificatePreviewOpen === "true") return;
            const exp = expandedRef.current;
            const touchY = e.touches[0].clientY;
            const deltaY = touchStartY - touchY;
            if (canScrollPanel(e.target, deltaY)) {
                setTouchStartY(touchY);
                return;
            }

            if (exp) {
                if (window.scrollY <= 2 && deltaY < -20) {
                    e.preventDefault();
                    setExpanded(false);
                    setShowContent(false);
                    setScrollReady(false);
                    if (contentTimerRef.current) clearTimeout(contentTimerRef.current);
                    if (scrollReadyTimerRef.current) clearTimeout(scrollReadyTimerRef.current);
                    window.dispatchEvent(new CustomEvent("heroSectionChange", { detail: { section: "home" } }));
                }
                return;
            }

            e.preventDefault();
            const factor = deltaY < 0 ? 0.008 : 0.005;
            const next = Math.min(Math.max(progressRef.current + deltaY * factor, 0), 1);
            setScrollProgress(next);

            if (next >= 1) {
                if (!expandedRef.current) {
                    setExpanded(true);
                    window.dispatchEvent(new CustomEvent("heroSectionChange", { detail: { section: "about" } }));
                    contentTimerRef.current = setTimeout(() => setShowContent(true), 180);
                    if (scrollReadyTimerRef.current) clearTimeout(scrollReadyTimerRef.current);
                    scrollReadyTimerRef.current = setTimeout(() => setScrollReady(true), 980);
                }
            } else {
                setShowContent(false);
            }
            setTouchStartY(touchY);
        };

        const handleTouchEnd = () => setTouchStartY(0);

        window.addEventListener("wheel", handleWheel, { passive: false });
        window.addEventListener("touchstart", handleTouchStart, { passive: false });
        window.addEventListener("touchmove", handleTouchMove, { passive: false });
        window.addEventListener("touchend", handleTouchEnd);

        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
        };
    }, [touchStartY]); // No `expanded` dep — listeners stay attached always

    // ── Navbar-initiated expand / collapse via heroNavRequest ──────────────────
    useEffect(() => {
        const easeInOutQuad = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

        const handleNavRequest = (e: Event) => {
            const custom = e as CustomEvent<{ action: "expand" | "collapse"; target?: "projects" | "contact" }>;
            cancelAnimationFrame(navRafRef.current);

            if (custom.detail.action === "expand") {
                pendingSectionRef.current = custom.detail.target;
                if (expandedRef.current) {
                    if (!custom.detail.target || document.body.style.overflow !== "hidden") {
                        const target = custom.detail.target ?? "about";
                        if (window.location.hash !== `#${target}`) window.history.pushState(null, "", `/#${target}`);
                        window.dispatchEvent(new CustomEvent("heroSectionChange", { detail: { section: "about", scrollTarget: target } }));
                    }
                    return;
                }
                const startProgress = progressRef.current;
                const startTime = performance.now();
                const duration = Math.max(350, (1 - startProgress) * 700);

                const tick = (now: number) => {
                    const t = Math.min((now - startTime) / duration, 1);
                    const next = startProgress + (1 - startProgress) * easeInOutQuad(t);
                    setScrollProgress(next);
                    progressRef.current = next;

                    if (t < 1) {
                        navRafRef.current = requestAnimationFrame(tick);
                    } else {
                        setScrollProgress(1);
                        progressRef.current = 1;
                        if (!expandedRef.current) {
                            setExpanded(true);
                            expandedRef.current = true;
                            window.dispatchEvent(new CustomEvent("heroSectionChange", { detail: { section: "about" } }));
                            if (contentTimerRef.current) clearTimeout(contentTimerRef.current);
                            if (scrollReadyTimerRef.current) clearTimeout(scrollReadyTimerRef.current);
                            contentTimerRef.current = setTimeout(() => setShowContent(true), 180);
                            scrollReadyTimerRef.current = setTimeout(() => setScrollReady(true), 980);
                        }
                    }
                };
                navRafRef.current = requestAnimationFrame(tick);

            } else if (custom.detail.action === "collapse") {
                pendingSectionRef.current = undefined;
                if (!expandedRef.current) return;
                // Scroll back to the very top first (in case Lenis moved it)
                window.scrollTo({ top: 0, behavior: "instant" });
                document.querySelector(".portrait-intro")?.scrollTo({ top: 0, behavior: "instant" });

                setExpanded(false);
                expandedRef.current = false;
                setShowContent(false);
                setScrollReady(false);
                if (contentTimerRef.current) clearTimeout(contentTimerRef.current);
                if (scrollReadyTimerRef.current) clearTimeout(scrollReadyTimerRef.current);
                window.dispatchEvent(new CustomEvent("heroSectionChange", { detail: { section: "home" } }));

                const startProgress = progressRef.current;
                const startTime = performance.now();
                const duration = 700;

                const tick = (now: number) => {
                    const t = Math.min((now - startTime) / duration, 1);
                    const next = startProgress * (1 - easeInOutQuad(t));
                    setScrollProgress(next);
                    progressRef.current = next;

                    if (t < 1) {
                        navRafRef.current = requestAnimationFrame(tick);
                    } else {
                        setScrollProgress(0);
                        progressRef.current = 0;
                    }
                };
                navRafRef.current = requestAnimationFrame(tick);
            }
        };

        window.addEventListener("heroNavRequest", handleNavRequest);
        const initialTarget = window.location.hash.slice(1);
        const initialRaf = requestAnimationFrame(() => {
            if (["about", "projects", "contact"].includes(initialTarget)) {
                window.dispatchEvent(new CustomEvent("heroNavRequest", { detail: {
                    action: "expand", target: initialTarget === "about" ? undefined : initialTarget,
                } }));
            }
        });
        return () => {
            cancelAnimationFrame(initialRaf);
            window.removeEventListener("heroNavRequest", handleNavRequest);
            cancelAnimationFrame(navRafRef.current);
        };
    }, []);

    const wBase = isMobile ? 300 : 380;
    const wGrowth = isMobile ? 650 : 1250;
    const hBase = isMobile ? 280 : 320;
    const cardW = `min(${wBase + scrollProgress * wGrowth}px, ${isMobile ? "95vw" : "98vw"})`;
    const expandedHeight = Math.max(aboutHeight, viewportHeight - 32, hBase);
    const cardHeight = hBase + scrollProgress * (expandedHeight - hBase);
    const sectionHeight = Math.max(viewportHeight, cardHeight + 32);
    const borderRad = `${Math.max(24 - scrollProgress * 24, 0)}px`;

    return (
        <div className="relative w-full overflow-x-hidden bg-background" style={{ minHeight: "100dvh" }}>
            <section
                id="home"
                className="relative flex items-center justify-center"
                style={{ height: viewportHeight ? sectionHeight : "100dvh" }}
            >
                {/* ── Expanding card ── */}
                <div
                    style={{
                        width: cardW,
                        opacity: scrollProgress,
                        pointerEvents: showContent ? "auto" : "none",
                        height: cardHeight,
                        borderRadius: borderRad,
                        overflow: "hidden",
                        position: "relative",
                        boxShadow: `0 0 ${60 + scrollProgress * 80}px rgba(220,20,60,${0.08 + scrollProgress * 0.18})`,
                        zIndex: 10,
                    }}
                >
                    <div className="about-background absolute inset-0" />

                    {/* Darkening overlay */}
                    <motion.div
                        className="absolute inset-0 bg-black"
                        animate={{ opacity: Math.max(0.55 - scrollProgress * 0.6, 0) }}
                        transition={{ duration: 0.05 }}
                    />

                    {/* ── About Me content ── */}
                    <motion.div
                        id="about"
                        inert={!showContent}
                        tabIndex={showContent ? 0 : -1}
                        role="region"
                        aria-labelledby="about-profile-title"
                        className="about-region relative z-10 w-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: showContent ? 1 : 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <div ref={aboutContentRef}><AboutProfile active={showContent} /></div>
                    </motion.div>
                </div>

                <motion.div
                    className="absolute inset-x-0 top-0 h-dvh z-20"
                    inert={expanded}
                    style={{ pointerEvents: expanded ? "none" : "auto" }}
                    animate={{ opacity: Math.max(1 - scrollProgress * 1.7, 0) }}
                    transition={{ duration: 0.15 }}
                >
                    <PortraitIntro name={name} role={title1 + " " + title2} subtitle={subtitle} active={!expanded && scrollProgress < 0.1} />
                </motion.div>
            </section>
        </div>
    );
}

export { HeroGeometric };
