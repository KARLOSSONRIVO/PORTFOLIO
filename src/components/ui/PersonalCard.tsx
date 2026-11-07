"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, type PointerEvent, type ReactNode } from "react";

/** Measure the stationary shell, then tilt its inner surface to avoid pointer feedback. */
export function PersonalCard({ variant, moving, title, children, onActivate, actionLabel }: {
    variant: "quote" | "about" | "focus";
    moving: boolean;
    title: string;
    children: ReactNode;
    onActivate?: () => void;
    actionLabel?: string;
}) {
    const shell = useRef<HTMLElement>(null);
    const targetX = useMotionValue(0);
    const targetY = useMotionValue(0);
    const rotateX = useSpring(targetX, { stiffness: 120, damping: 20, mass: 0.6 });
    const rotateY = useSpring(targetY, { stiffness: 120, damping: 20, mass: 0.6 });

    function reset() { targetX.set(0); targetY.set(0); }
    function tilt(event: PointerEvent<HTMLElement>) {
        if (!moving || event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
        const bounds = shell.current?.getBoundingClientRect();
        if (!bounds) return;
        const dx = Math.max(-1, Math.min(1, (event.clientX - bounds.left - bounds.width / 2) / (bounds.width / 2)));
        const dy = Math.max(-1, Math.min(1, (event.clientY - bounds.top - bounds.height / 2) / (bounds.height / 2)));
        targetX.set(-dy * 5);
        targetY.set(dx * 7);
    }

    return (
        <article ref={shell} className={"personal-card personal-card-" + variant + (onActivate ? " personal-card-interactive" : "")} aria-label={title} onPointerMove={tilt} onPointerLeave={reset} onBlur={reset}>
            <div className="personal-card-bob">
                <motion.div className="personal-card-surface" style={{ rotateX: moving ? rotateX : 0, rotateY: moving ? rotateY : 0, transformPerspective: 1100 }}>
                    <div className="personal-card-content">{children}</div>
                </motion.div>
            </div>
            {onActivate && <button type="button" className="personal-card-hit-area" aria-label={actionLabel ?? title} onClick={onActivate} />}
        </article>
    );
}
