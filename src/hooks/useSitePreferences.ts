"use client";

import { useSyncExternalStore } from "react";
import { flushSync } from "react-dom";

const preferenceEvent = "portfolio-preferences";
const themeKey = "portfolio-theme";
const motionKey = "portfolio-motion-paused";
type Theme = "dark" | "light";
let themeTransition: ViewTransition | null = null;
let requestedTheme: Theme | null = null;
let themeRequest = 0;

function subscribe(listener: () => void) {
    function syncStorage(event: StorageEvent) {
        if (event.key === themeKey) document.documentElement.dataset.theme = event.newValue === "light" ? "light" : "dark";
        else if (event.key === motionKey) document.documentElement.dataset.motionPaused = String(event.newValue === "true");
        else if (event.key === null) {
            document.documentElement.dataset.theme = "dark";
            document.documentElement.dataset.motionPaused = "false";
        } else return;
        listener();
    }
    window.addEventListener(preferenceEvent, listener);
    window.addEventListener("storage", syncStorage);
    return () => {
        window.removeEventListener(preferenceEvent, listener);
        window.removeEventListener("storage", syncStorage);
    };
}

const readTheme = (): Theme => document.documentElement.dataset.theme === "light" ? "light" : "dark";
const readMotion = () => document.documentElement.dataset.motionPaused === "true";
const serverTheme = (): Theme => "dark";
const serverMotion = () => false;

function savePreference(key: string, value: string) {
    try { window.localStorage.setItem(key, value); } catch { /* Controls still work if browser storage is unavailable. */ }
    window.dispatchEvent(new Event(preferenceEvent));
}

/** Shared DOM-backed preferences keep navbar and hero in sync without hydration mismatch. */
export function useSitePreferences() {
    const theme = useSyncExternalStore(subscribe, readTheme, serverTheme);
    const paused = useSyncExternalStore(subscribe, readMotion, serverMotion);
    function toggleTheme(origin?: { x: number; y: number }) {
        const next = (requestedTheme ?? readTheme()) === "dark" ? "light" : "dark";
        const request = ++themeRequest;
        requestedTheme = next;
        themeTransition?.skipTransition();
        themeTransition = null;
        const root = document.documentElement;
        delete root.dataset.themeTransition;
        const applyTheme = () => {
            if (request !== themeRequest) return;
            flushSync(() => {
                root.dataset.theme = next;
                savePreference(themeKey, next);
            });
        };
        // Motion preferences and older browsers keep the same immediate, usable switch.
        if (!document.startViewTransition || readMotion() || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            applyTheme();
            requestedTheme = null;
            return;
        }
        const x = origin?.x ?? window.innerWidth / 2;
        const y = origin?.y ?? 48;
        const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
        root.dataset.themeTransition = "true";
        try {
            const transition = document.startViewTransition(applyTheme);
            themeTransition = transition;
            void transition.ready.then(() => {
                if (request !== themeRequest) return;
                root.animate({ clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] }, {
                    duration: 650,
                    easing: "cubic-bezier(0.16, 1, 0.3, 1)",
                    pseudoElement: "::view-transition-new(root)",
                });
            }).catch(() => { /* A skipped snapshot still commits the requested theme. */ });
            void transition.finished.catch(() => {}).finally(() => {
                if (request !== themeRequest) return;
                delete root.dataset.themeTransition;
                themeTransition = null;
                requestedTheme = null;
            });
        } catch {
            delete root.dataset.themeTransition;
            applyTheme();
            requestedTheme = null;
        }
    }
    function toggleMotion() {
        const next = !readMotion();
        document.documentElement.dataset.motionPaused = String(next);
        savePreference(motionKey, String(next));
    }
    return { theme, paused, toggleTheme, toggleMotion };
}
