"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import Image from "next/image";
import { Caveat } from "next/font/google";
import { ArrowUpRight, Download, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { memo, useEffect, useId, useRef, useState, type PointerEvent } from "react";
import { PersonalCard } from "@/components/ui/PersonalCard";
import { useSitePreferences } from "@/hooks/useSitePreferences";

const directions = ["center", "left", "right", "up", "down"] as const;
type Direction = typeof directions[number];
const source = (direction: Direction) => `/images/karlos-rivo-cutout-v2/${direction}.webp`;
const handwriting = Caveat({ subsets: ["latin"], weight: "500", display: "swap" });

export const PortraitIntro = memo(function PortraitIntro({ name, role, subtitle, active }: {
    name: string; role: string; subtitle: string; active: boolean;
}) {
    const reducedMotion = useReducedMotion();
    const eyeMaskId = useId();
    const featherId = useId();
    const { paused } = useSitePreferences();
    const [ready, setReady] = useState(false);
    const [direction, setDirection] = useState<Direction>("center");
    const current = useRef<Direction>("center");
    const portraitRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateY = useSpring(x, { stiffness: 90, damping: 22 });
    const rotateX = useSpring(y, { stiffness: 90, damping: 22 });
    const moving = active && !reducedMotion && !paused;

    useEffect(() => {
        let cancelled = false;
        // Decode every state before enabling gaze changes; center stays visible on failure.
        Promise.all(directions.map(direction => {
            const image = new window.Image();
            image.src = source(direction);
            return image.decode();
        })).then(() => { if (!cancelled) setReady(true); }).catch(() => {});
        return () => { cancelled = true; };
    }, []);

    function reset() {
        current.current = "center";
        setDirection("center");
        x.set(0);
        y.set(0);
    }

    function follow(event: PointerEvent<HTMLDivElement>) {
        if (!moving || !ready || event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
        const rect = portraitRef.current?.getBoundingClientRect();
        if (!rect) return;
        // The cutout is contained and bottom-aligned; use the eyes rather than the shirt as the tracking origin.
        const imageSize = Math.min(rect.width, rect.height);
        const eyeY = rect.bottom - imageSize * 0.70;
        const dx = Math.max(-1, Math.min(1, (event.clientX - rect.left - rect.width / 2) / (imageSize / 2)));
        const dy = Math.max(-1, Math.min(1, (event.clientY - eyeY) / (imageSize / 2)));
        x.set(dx * 3);
        y.set(-dy * 3);
        const magnitude = Math.max(Math.abs(dx), Math.abs(dy));
        const next: Direction = magnitude < (current.current === "center" ? 0.26 : 0.18)
            ? "center" : Math.abs(dx) > Math.abs(dy) ? (dx < 0 ? "left" : "right") : (dy < 0 ? "up" : "down");
        // Avoid flipping at diagonal boundaries until the new axis clearly dominates.
        const horizontal = current.current === "left" || current.current === "right";
        const vertical = current.current === "up" || current.current === "down";
        if (next !== "center" && ((horizontal && Math.abs(dy) > Math.abs(dx) && Math.abs(dy) - Math.abs(dx) < 0.12)
            || (vertical && Math.abs(dx) > Math.abs(dy) && Math.abs(dx) - Math.abs(dy) < 0.12))) return;
        if (next !== current.current) { current.current = next; setDirection(next); }
    }

    const gaze = moving ? direction : "center";
    return (
        <div className="portrait-intro" data-lenis-prevent onPointerMove={follow} onPointerLeave={reset} data-motion={moving ? "running" : "paused"}>
            <div className="name-marquee" aria-hidden="true">
                <div className="name-marquee-track">
                    {[0, 1].map(copy => (
                        <span key={copy}>
                            <span className="name-marquee-word">PORTFOLIO</span>
                        </span>
                    ))}
                </div>
            </div>
            <div className="portrait-intro-grid">
                <div className="portrait-intro-copy">
                    <h1 className={`${handwriting.className} portrait-handwritten`}><span>Built to work.</span><span>Made to matter.</span></h1>
                    <p className="portrait-role">{role}</p>
                    <p className="portrait-description">{subtitle}</p>
                    <div className="portrait-actions">
                        <button type="button" className="portrait-about" onClick={() => window.dispatchEvent(new CustomEvent("heroNavRequest", { detail: { action: "expand", target: "projects" } }))}>
                            Explore my work <ArrowUpRight aria-hidden="true" size={18} />
                        </button>
                        <a className="portrait-about portrait-resume" href="/file/Karlossonrivo_Resume.pdf" download>
                            <Download size={18} aria-hidden="true" /> Résumé
                        </a>
                    </div>
                    <nav className="portrait-socials" aria-label="Social profiles">
                        <a href="https://github.com/KARLOSSONRIVO" target="_blank" rel="noopener noreferrer"><FaGithub size={17} aria-hidden="true" /> GitHub <ArrowUpRight size={13} aria-hidden="true" /></a>
                        <a href="https://www.linkedin.com/in/karlos-son-rivo-8a37bb2a0/" target="_blank" rel="noopener noreferrer"><FaLinkedinIn size={17} aria-hidden="true" /> LinkedIn <ArrowUpRight size={13} aria-hidden="true" /></a>
                        <a href="mailto:karlosrivo@gmail.com"><Mail size={17} aria-hidden="true" /> Gmail <ArrowUpRight size={13} aria-hidden="true" /></a>
                    </nav>
                    <div className="portrait-interests">
                        <p>Where my curiosity goes</p>
                        <ul aria-label="Areas of interest"><li>Backend systems</li><li>Security</li><li>Applied AI</li></ul>
                    </div>
                </div>
                <div className="portrait-center">
                <motion.div ref={portraitRef} className="portrait-stage" style={{ rotateX: moving ? rotateX : 0, rotateY: moving ? rotateY : 0, transformPerspective: 1100 }}>
                    <div className="portrait-photo" role="img" aria-label={`Portrait of ${name}`} data-gaze={gaze}>
                        <Image src={source("center")} alt="" fill sizes="(max-width: 767px) 65vw, 40vw" unoptimized preload className="portrait-gaze" />
                        {/* Keep the neutral silhouette fixed; generated states contribute only the eye regions. */}
                        <svg className="portrait-eyes" viewBox="0 0 900 900" preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false">
                            <defs>
                                <filter id={featherId} x="-20%" y="-40%" width="140%" height="180%">
                                    <feGaussianBlur stdDeviation="3" />
                                </filter>
                                <mask id={eyeMaskId} maskUnits="userSpaceOnUse" x="0" y="0" width="900" height="900">
                                    <g fill="white" filter={`url(#${featherId})`}>
                                        <ellipse cx="400" cy="282" rx="40" ry="21" />
                                        <ellipse cx="521" cy="280" rx="39" ry="21" />
                                    </g>
                                </mask>
                            </defs>
                            {directions.filter(state => state !== "center").map(state => (
                                <image key={state} href={source(state)} width="900" height="900" mask={`url(#${eyeMaskId})`} className="portrait-eye-state" style={{ opacity: gaze === state ? 1 : 0 }} />
                            ))}
                        </svg>
                    </div>
                </motion.div>
                </div>
                <div className="personal-card-layout">
                    <PersonalCard variant="quote" title="My approach" moving={moving}>
                        <div className="personal-card-label"><span className="card-status-dot" aria-hidden="true" />My approach<span className="card-quote-mark" aria-hidden="true">“</span></div>
                        <blockquote>“I build thoughtful software, from the interface to the systems behind it.”</blockquote>
                        <p className="personal-card-note">Purpose before complexity.</p>
                    </PersonalCard>
                    <PersonalCard variant="about" title="A little about me" moving={moving} actionLabel="More about me" onActivate={() => window.dispatchEvent(new CustomEvent("heroNavRequest", { detail: { action: "expand" } }))}>
                        <h2 className="personal-card-label">A little about me</h2>
                        <p>I build web and mobile applications with secure, scalable backends and AI-driven features that solve real-world problems.</p>
                        <span className="personal-card-link" aria-hidden="true">
                            More about me <ArrowUpRight size={17} aria-hidden="true" />
                        </span>
                    </PersonalCard>
                </div>
            </div>
            <div className="portrait-intro-footer">
                <span>Software with purpose.</span>
            </div>
        </div>
    );
});
