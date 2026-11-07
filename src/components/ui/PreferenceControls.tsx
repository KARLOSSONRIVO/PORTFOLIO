"use client";

import { Moon, Pause, Play, Sun } from "lucide-react";
import { useSitePreferences } from "@/hooks/useSitePreferences";

export function PreferenceControls() {
    const { theme, paused, toggleTheme, toggleMotion } = useSitePreferences();
    const motionLabel = paused ? "Resume motion" : "Pause motion";
    const themeLabel = theme === "dark" ? "Switch to light mode" : "Switch to dark mode";
    return (
        <div className="preference-controls" role="group" aria-label="Appearance and motion">
            <button className="preference-button" type="button" aria-label={motionLabel} title={motionLabel} aria-pressed={paused} onClick={toggleMotion}>
                {paused ? <Play size={18} aria-hidden="true" /> : <Pause size={18} aria-hidden="true" />}
            </button>
            <button className="preference-button" type="button" aria-label={themeLabel} title={themeLabel} aria-pressed={theme === "light"} onClick={event => {
                const button = event.currentTarget.getBoundingClientRect();
                toggleTheme({ x: button.left + button.width / 2, y: button.top + button.height / 2 });
            }}>
                {theme === "dark" ? <Sun size={19} aria-hidden="true" /> : <Moon size={19} aria-hidden="true" />}
            </button>
        </div>
    );
}
