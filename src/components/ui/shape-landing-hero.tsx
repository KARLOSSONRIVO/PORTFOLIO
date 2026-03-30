"use client";

import { motion } from "framer-motion";
import { Circle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

function ElegantShape({
    className,
    delay = 0,
    width = 400,
    height = 100,
    rotate = 0,
    gradient = "from-white/[0.08]",
}: {
    className?: string;
    delay?: number;
    width?: number;
    height?: number;
    rotate?: number;
    gradient?: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: -150, rotate: rotate - 15 }}
            animate={{ opacity: 1, y: 0, rotate }}
            transition={{
                duration: 2.4,
                delay,
                ease: [0.23, 0.86, 0.39, 0.96],
                opacity: { duration: 1.2 },
            }}
            className={cn("absolute", className)}
        >
            <motion.div
                animate={{ y: [0, 15, 0] }}
                transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                style={{ width, height }}
                className="relative"
            >
                <div
                    className={cn(
                        "absolute inset-0 rounded-full",
                        "bg-gradient-to-r to-transparent",
                        gradient,
                        "backdrop-blur-[2px] border-2 border-white/[0.15]",
                        "shadow-[0_8px_32px_0_rgba(255,255,255,0.1)]",
                        "after:absolute after:inset-0 after:rounded-full",
                        "after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.2),transparent_70%)]"
                    )}
                />
            </motion.div>
        </motion.div>
    );
}

function HeroGeometric({
    badge = "Design Collective",
    title1 = "Elevate Your Digital Vision",
    title2 = "Crafting Exceptional Websites",
}: {
    badge?: string;
    title1?: string;
    title2?: string;
    subtitle?: string;
}) {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [expanded, setExpanded] = useState(false);
    const [showContent, setShowContent] = useState(false);
    // scrollReady gates body-overflow unlock until content has fully faded in
    const [scrollReady, setScrollReady] = useState(false);
    // animationKey increments on every collapse → forces Framer Motion to replay entrance animations
    const [animationKey, setAnimationKey] = useState(0);
    const [touchStartY, setTouchStartY] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    const progressRef = useRef(0);
    const expandedRef = useRef(false);
    const showContentRef = useRef(false);
    const contentTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const scrollReadyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    // RAF handle for navbar-triggered animations
    const navRafRef = useRef<number>(0);

    useEffect(() => { progressRef.current = scrollProgress; }, [scrollProgress]);
    useEffect(() => { expandedRef.current = expanded; }, [expanded]);
    useEffect(() => { showContentRef.current = showContent; }, [showContent]);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    // Lock body scroll until content is fully faded in (scrollReady)
    useEffect(() => {
        if (!scrollReady) {
            document.body.style.overflow = "hidden";
            document.documentElement.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
            document.documentElement.style.overflow = "";
        };
    }, [scrollReady]);

    // Single persistent event handler — handles both expansion AND collapse
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            const exp = expandedRef.current;

            if (exp) {
                // Fully expanded: only intercept scroll-up at the very top of page
                if (window.scrollY <= 2 && e.deltaY < 0) {
                    e.preventDefault();
                    // Start collapsing
                    setExpanded(false);
                    setShowContent(false);
                    setScrollReady(false);
                    setAnimationKey(k => k + 1);
                    if (contentTimerRef.current) clearTimeout(contentTimerRef.current);
                    if (scrollReadyTimerRef.current) clearTimeout(scrollReadyTimerRef.current);
                    // Signal navbar back to "home"
                    window.dispatchEvent(new CustomEvent("heroSectionChange", { detail: { section: "home" } }));
                }
                // Else: let native scroll handle downward scrolling seamlessly
                return;
            }

            // Not yet expanded: intercept all scroll to drive the animation
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
            setTouchStartY(e.touches[0].clientY);
        };

        const handleTouchMove = (e: TouchEvent) => {
            const exp = expandedRef.current;
            const touchY = e.touches[0].clientY;
            const deltaY = touchStartY - touchY;

            if (exp) {
                if (window.scrollY <= 2 && deltaY < -20) {
                    e.preventDefault();
                    setExpanded(false);
                    setShowContent(false);
                    setScrollReady(false);
                    setAnimationKey(k => k + 1);
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
            const custom = e as CustomEvent<{ action: "expand" | "collapse" }>;
            cancelAnimationFrame(navRafRef.current);

            if (custom.detail.action === "expand") {
                if (expandedRef.current) return;
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
                if (!expandedRef.current) return;
                // Scroll back to the very top first (in case Lenis moved it)
                window.scrollTo({ top: 0, behavior: "instant" });

                setExpanded(false);
                expandedRef.current = false;
                setShowContent(false);
                setScrollReady(false);
                setAnimationKey(k => k + 1);
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
        return () => {
            window.removeEventListener("heroNavRequest", handleNavRequest);
            cancelAnimationFrame(navRafRef.current);
        };
    }, []);

    const wBase = isMobile ? 300 : 380;
    const wGrowth = isMobile ? 650 : 1250;
    const hBase = isMobile ? 260 : 320;
    const hGrowth = isMobile ? 300 : 520;
    const cardW = `min(${wBase + scrollProgress * wGrowth}px, ${isMobile ? "95vw" : "98vw"})`;
    const cardH = `min(${hBase + scrollProgress * hGrowth}px, ${isMobile ? "90dvh" : "95dvh"})`;
    const borderRad = `${Math.max(24 - scrollProgress * 24, 0)}px`;
    const tx = scrollProgress * (isMobile ? 35 : 25);

    const fadeUp = {
        hidden: { opacity: 0, y: 24 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, delay: 0.1 + i * 0.15, ease: [0.25, 0.4, 0.25, 1] as const },
        }),
    };

    return (
        <div className="relative w-full overflow-x-hidden bg-[#030303]" style={{ minHeight: "100dvh" }}>
            {/* Ambient glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-600/[0.05] via-transparent to-red-900/[0.05] blur-3xl pointer-events-none" />

            {/* Floating crimson shapes — key forces remount on collapse to replay entrance animations */}
            <motion.div
                key={`shapes-${animationKey}`}
                className="absolute inset-0 overflow-hidden pointer-events-none"
                animate={{ opacity: 1 - scrollProgress * 1.6 }}
                transition={{ duration: 0.05 }}
            >
                <ElegantShape delay={0.3} width={600} height={140} rotate={12} gradient="from-red-600/[0.15]" className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]" />
                <ElegantShape delay={0.5} width={500} height={120} rotate={-15} gradient="from-red-500/[0.15]" className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]" />
                <ElegantShape delay={0.4} width={300} height={80} rotate={-8} gradient="from-red-700/[0.15]" className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]" />
                <ElegantShape delay={0.6} width={200} height={60} rotate={20} gradient="from-red-800/[0.15]" className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]" />
                <ElegantShape delay={0.7} width={150} height={40} rotate={-25} gradient="from-red-600/[0.15]" className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]" />
            </motion.div>

            <section
                id="home"
                className="sticky top-0 flex items-center justify-center"
                style={{ height: "100dvh" }}
            >
                {/* ── Expanding card ── */}
                <div
                    style={{
                        width: cardW,
                        height: cardH,
                        borderRadius: borderRad,
                        overflow: "hidden",
                        position: "relative",
                        boxShadow: `0 0 ${60 + scrollProgress * 80}px rgba(220,20,60,${0.08 + scrollProgress * 0.18})`,
                        zIndex: 10,
                    }}
                >
                    {/* Card BG grid */}
                    <div className="absolute inset-0 bg-[#0a0a0a]">
                        <div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: "linear-gradient(to right, #DC143C1A 1px, transparent 1px), linear-gradient(to bottom, #DC143C1A 1px, transparent 1px)",
                                backgroundSize: "40px 40px",
                                opacity: 0.3 + scrollProgress * 0.4,
                            }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-transparent to-red-950/10" />
                    </div>

                    {/* Darkening overlay */}
                    <motion.div
                        className="absolute inset-0 bg-black"
                        animate={{ opacity: Math.max(0.55 - scrollProgress * 0.6, 0) }}
                        transition={{ duration: 0.05 }}
                    />

                    {/* ── About Me content ── */}
                    <motion.div
                        className="relative z-10 w-full h-full overflow-y-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: showContent ? 1 : 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-12 md:gap-24 items-center px-8 py-16 md:px-16">
                            <motion.div
                                custom={0}
                                variants={fadeUp}
                                initial="hidden"
                                animate={showContent ? "visible" : "hidden"}
                                className="w-full md:w-2/5 shrink-0"
                            >
                                <div className="relative w-full aspect-[4/5] bg-surface-container overflow-hidden rounded-xl">
                                    <img
                                        alt="Karlos Rivo"
                                        className="w-full h-full object-cover grayscale opacity-60 transition-transform duration-700 hover:scale-105 hover:grayscale-0 hover:opacity-100"
                                        src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent pointer-events-none" />
                                </div>
                            </motion.div>

                            <div className="w-full md:w-3/5">
                                <motion.h2
                                    custom={1}
                                    variants={fadeUp}
                                    initial="hidden"
                                    animate={showContent ? "visible" : "hidden"}
                                    className="font-headline font-black text-5xl md:text-7xl uppercase tracking-tighter mb-8 leading-tight"
                                >
                                    About <br /><span className="text-primary">Me</span>
                                </motion.h2>

                                <motion.div
                                    custom={2}
                                    variants={fadeUp}
                                    initial="hidden"
                                    animate={showContent ? "visible" : "hidden"}
                                    className="space-y-5 font-body text-lg text-on-surface-variant leading-relaxed"
                                >
                                    <p>
                                        I am a passionate software developer focused on designing and engineering high-quality, impactful systems. My primary domains of interest include full-stack web development, backend engineering, secure architecture, and implementing AI-driven features to solve real-world problems.
                                    </p>
                                    <p>
                                        My focus lies in building robust foundations: backend orchestration, database optimization, and high-performance APIs. I believe in software that is clean, secure, and highly scalable.
                                    </p>
                                </motion.div>

                                <motion.div
                                    custom={3}
                                    variants={fadeUp}
                                    initial="hidden"
                                    animate={showContent ? "visible" : "hidden"}
                                    className="mt-10 pt-8 border-t border-outline-variant/30 grid grid-cols-1 md:grid-cols-3 gap-8"
                                >
                                    <div>
                                        <p className="font-label text-primary text-[10px] uppercase tracking-widest mb-2">Background</p>
                                        <p className="font-headline font-bold text-xl uppercase tracking-tight">Full-Stack Dev</p>
                                    </div>
                                    <div>
                                        <p className="font-label text-primary text-[10px] uppercase tracking-widest mb-2">Specialization</p>
                                        <p className="font-headline font-bold text-xl uppercase tracking-tight">Backend & Security</p>
                                    </div>
                                    <div>
                                        <p className="font-label text-primary text-[10px] uppercase tracking-widest mb-2">Emerging Focus</p>
                                        <p className="font-headline font-bold text-xl uppercase tracking-tight">AI_DEVELOPMENT</p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>


                    </motion.div>
                </div>

                {/* ── Floating title that splits apart during expansion ── */}
                <motion.div
                    key={`title-${animationKey}`}
                    className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-20"
                    animate={{ opacity: showContent ? 0 : 1 }}
                    transition={{ duration: 0.25 }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mb-5"
                        style={{ transform: `translateX(-${tx}vw)` }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.08]">
                            <Circle className="h-2 w-2 fill-red-500/80" />
                            <span className="text-sm text-white/60 tracking-wide">{badge}</span>
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.55 }}
                        className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight text-center px-4"
                        style={{ transform: `translateX(-${tx}vw)` }}
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/80">
                            {title1}
                        </span>
                    </motion.h1>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                        className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight text-center px-4"
                        style={{ transform: `translateX(${tx}vw)` }}
                    >
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-white/90 to-red-600">
                            {title2}
                        </span>
                    </motion.h1>


                </motion.div>

                {/* Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/80 pointer-events-none z-0" />
            </section>
        </div>
    );
}

export { HeroGeometric };
