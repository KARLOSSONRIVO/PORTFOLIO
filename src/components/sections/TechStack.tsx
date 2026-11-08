"use client";

import { useEffect, useId, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { BrainCircuit, CodeXml, Database, Grid2X2, Layers, Link as LinkIcon, Wrench } from "lucide-react";
import {
  SiTypescript, SiNextdotjs, SiReact, SiNodedotjs,
  SiExpress, SiFastapi, SiMongodb, SiPython,
  SiFlutter, SiKotlin,
  SiRedis, SiDocker, SiGit, SiMysql, SiPostgresql, SiOllama,
  SiSolidity, SiHtml5, SiCss, SiLaravel, SiPhp, SiDjango, SiJavascript,
} from "react-icons/si";
import type { IconType } from "react-icons";
import { FaJava } from "react-icons/fa";
import { useInView, useReducedMotion } from "framer-motion";
import { useSitePreferences } from "@/hooks/useSitePreferences";

const categories = [
  { id: "all", label: "All", icon: Grid2X2 },
  { id: "databases", label: "Databases", icon: Database },
  { id: "tools", label: "Tools", icon: Wrench },
  { id: "ai", label: "AI", icon: BrainCircuit },
  { id: "languages", label: "Languages", icon: CodeXml },
  { id: "frameworks", label: "Frameworks", icon: Layers },
] as const;

type CategoryFilter = typeof categories[number]["id"];
type Technology = {
  name: string;
  icon: IconType | typeof LinkIcon;
  category: Exclude<CategoryFilter, "all">;
  color: string;
  lightColor: string;
};

const tools: Technology[] = [
  { name: "TypeScript", icon: SiTypescript, category: "languages", color: "#3178c6", lightColor: "#3178c6" },
  { name: "Next.js", icon: SiNextdotjs, category: "frameworks", color: "#ffffff", lightColor: "#111111" },
  { name: "React", icon: SiReact, category: "frameworks", color: "#61dafb", lightColor: "#087ea4" },
  { name: "Node.js", icon: SiNodedotjs, category: "tools", color: "#81ce64", lightColor: "#287a31" },
  { name: "Express.js", icon: SiExpress, category: "frameworks", color: "#f7df1e", lightColor: "#816700" },
  { name: "MongoDB", icon: SiMongodb, category: "databases", color: "#69d65b", lightColor: "#217a39" },
  { name: "Python", icon: SiPython, category: "languages", color: "#ffd343", lightColor: "#306998" },
  { name: "FastAPI", icon: SiFastapi, category: "frameworks", color: "#35d4bd", lightColor: "#007f70" },
  { name: "Blockchain", icon: LinkIcon, category: "tools", color: "#b59cff", lightColor: "#7447b8" },
  { name: "Flutter", icon: SiFlutter, category: "frameworks", color: "#54c5f8", lightColor: "#087baa" },
  { name: "Kotlin", icon: SiKotlin, category: "languages", color: "#bb75ff", lightColor: "#7f3fbf" },
  { name: "Java", icon: FaJava, category: "languages", color: "#f89820", lightColor: "#b85b00" },
  { name: "Redis", icon: SiRedis, category: "databases", color: "#ff655a", lightColor: "#c52c23" },
  { name: "Docker", icon: SiDocker, category: "tools", color: "#45b7ff", lightColor: "#1473b4" },
  { name: "Git", icon: SiGit, category: "tools", color: "#f56a50", lightColor: "#c64129" },
  { name: "MySQL", icon: SiMysql, category: "databases", color: "#63b5df", lightColor: "#00618a" },
  { name: "PostgreSQL", icon: SiPostgresql, category: "databases", color: "#81b6e5", lightColor: "#336791" },
  { name: "Ollama", icon: SiOllama, category: "ai", color: "#f5f5f5", lightColor: "#242424" },
  { name: "Solidity", icon: SiSolidity, category: "languages", color: "#adb6ff", lightColor: "#5559a0" },
  { name: "HTML", icon: SiHtml5, category: "languages", color: "#ff794f", lightColor: "#c23e1b" },
  { name: "CSS", icon: SiCss, category: "languages", color: "#a970ff", lightColor: "#7232bc" },
  { name: "Laravel", icon: SiLaravel, category: "frameworks", color: "#ff655e", lightColor: "#ce2b21" },
  { name: "PHP", icon: SiPhp, category: "languages", color: "#a8b3ff", lightColor: "#626aa3" },
  { name: "Django", icon: SiDjango, category: "frameworks", color: "#72c9a9", lightColor: "#0c4b33" },
  { name: "JavaScript", icon: SiJavascript, category: "languages", color: "#f7df1e", lightColor: "#997400" },
];

export function TechStack() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sceneRef, { margin: "100px" });
  const reducedMotion = useReducedMotion();
  const { paused } = useSitePreferences();
  const standId = useId();
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("all");
  const [hoveredTechnology, setHoveredTechnology] = useState<string | null>(null);
  const [focusedTechnology, setFocusedTechnology] = useState<string | null>(null);
  const [pinnedTechnology, setPinnedTechnology] = useState<string | null>(null);
  const activeTechnology = hoveredTechnology ?? focusedTechnology ?? pinnedTechnology;
  const visibleTools = selectedCategory === "all" ? tools : tools.filter(tool => tool.category === selectedCategory);
  const columns = selectedCategory === "all" ? 5 : Math.min(4, visibleTools.length);
  const rows = Math.ceil(visibleTools.length / columns);
  const sceneHeight = selectedCategory === "all" ? 900 : Math.max(360, (columns + rows) * 72 + 220);
  const listId = `${standId}-technologies`;
  const selectedLabel = categories.find(category => category.id === selectedCategory)?.label;

  function selectCategory(category: CategoryFilter) {
    setSelectedCategory(category);
    closeStand();
    resetTilt();
  }

  function closeStand() {
    setHoveredTechnology(null);
    setFocusedTechnology(null);
    setPinnedTechnology(null);
  }

  useEffect(() => {
    if (!pinnedTechnology) return;
    const dismissOutside = (event: globalThis.PointerEvent) => {
      if (event.target instanceof Node && !sceneRef.current?.contains(event.target)) setPinnedTechnology(null);
    };
    document.addEventListener("pointerdown", dismissOutside);
    return () => document.removeEventListener("pointerdown", dismissOutside);
  }, [pinnedTechnology]);

  function resetTilt() {
    sceneRef.current?.style.removeProperty("--scene-tilt-x");
    sceneRef.current?.style.removeProperty("--scene-tilt-z");
  }

  function tiltScene(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse" || paused || reducedMotion || window.innerWidth < 768) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    event.currentTarget.style.setProperty("--scene-tilt-x", `${y * -3}deg`);
    event.currentTarget.style.setProperty("--scene-tilt-z", `${x * 3}deg`);
  }

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const syncVisibility = () => { scene.dataset.documentHidden = String(document.hidden); };
    syncVisibility();
    document.addEventListener("visibilitychange", syncVisibility);
    return () => document.removeEventListener("visibilitychange", syncVisibility);
  }, []);

  return (
    <section id="skills" className="tech-cubes-section section-px" aria-labelledby="tech-stack-title" onKeyDown={event => {
      if (event.key === "Escape") closeStand();
    }}>
      <div className="tech-cubes-heading">
        <h2 id="tech-stack-title">Tech <span>Stack</span></h2>
        <p id="tech-stand-hint">Hover or tap a cube to raise its display.</p>
      </div>
      <div className="tech-stack-controls" role="group" aria-label="Filter technologies by category">
        {categories.map(category => {
          const CategoryIcon = category.icon;
          const count = category.id === "all" ? tools.length : tools.filter(tool => tool.category === category.id).length;
          return (
            <button key={category.id} className="tech-filter" type="button" data-tech-filter={category.id}
              aria-pressed={selectedCategory === category.id} aria-controls={listId}
              onClick={() => selectCategory(category.id)}>
              <CategoryIcon aria-hidden="true" />
              <span>{category.label}</span>
              <span className="tech-filter-count" aria-hidden="true">{count}</span>
            </button>
          );
        })}
      </div>
      <p className="tech-filter-summary" role="status" aria-live="polite" aria-atomic="true">
        {selectedCategory === "all" ? `Showing all ${tools.length} technologies` : `${visibleTools.length} ${visibleTools.length === 1 ? "technology" : "technologies"} in ${selectedLabel}`}
      </p>
      <div ref={sceneRef} className="tech-cubes-scene" data-running={inView} data-density={selectedCategory === "all" ? "compact" : "regular"}
        data-count={visibleTools.length} style={{ "--cube-columns": columns, "--scene-height": `${sceneHeight}px` } as CSSProperties}
        onPointerMove={tiltScene} onPointerLeave={resetTilt}>
        <ul id={listId} className="tech-cubes-field" aria-label="Technologies I work with">
          {visibleTools.map((tool, index) => {
            const Icon = tool.icon;
            const active = activeTechnology === tool.name;
            const displayId = `${standId}-${index}`;
            return (
              <li key={tool.name} className="tech-cube" data-technology={tool.name} data-category={tool.category} data-active={active}
                onPointerEnter={event => { if (event.pointerType === "mouse") setHoveredTechnology(tool.name); }}
                onPointerLeave={() => setHoveredTechnology(null)}
                style={{
                "--tech-color": tool.color,
                "--tech-color-light": tool.lightColor,
                "--cube-elevation": `${(index % columns + rows - 1 - Math.floor(index / columns)) * (selectedCategory === "all" ? 8 : 12)}px`,
                "--cube-delay": `${index * -0.67}s`,
                "--cube-duration": `${5.5 + (index % 4) * 0.6}s`,
              } as CSSProperties}>
                <button className="tech-cube-lift" type="button" aria-label={`${tool.name} display stand`}
                  aria-expanded={active} aria-controls={displayId} aria-describedby="tech-stand-hint"
                  onFocus={event => { if (event.currentTarget.matches(":focus-visible")) setFocusedTechnology(tool.name); }}
                  onBlur={() => setFocusedTechnology(null)}
                  onClick={() => {
                    setFocusedTechnology(null);
                    setPinnedTechnology(current => current === tool.name ? null : tool.name);
                  }}>
                  <span className="tech-cube-body">
                    <span className="tech-cube-face tech-cube-top">
                      <span className="tech-cube-content">
                        <Icon className="tech-logo" aria-hidden="true" />
                        <span>{tool.name}</span>
                      </span>
                    </span>
                    <span className="tech-cube-face tech-cube-front" aria-hidden="true"><Icon className="tech-logo" /></span>
                    <span className="tech-cube-face tech-cube-side" aria-hidden="true"><Icon className="tech-logo" /></span>
                    <span className="tech-cube-face tech-cube-back" aria-hidden="true" />
                    <span className="tech-cube-face tech-cube-right" aria-hidden="true" />
                    <span className="tech-cube-face tech-cube-bottom" aria-hidden="true" />
                    <span className="tech-stand-slot" aria-hidden="true" />
                    <span id={displayId} className="tech-cube-stand" aria-hidden="true">
                      <span className="tech-stand-stem" />
                      <span className="tech-stand-symbol">
                        <Icon className="tech-stand-etch" />
                        <Icon className="tech-stand-mark tech-logo" />
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
