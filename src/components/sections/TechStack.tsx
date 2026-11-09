"use client";

import { useEffect, useId, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import { BrainCircuit, CodeXml, Database, Grid2X2, Layers, Link as LinkIcon, Wrench } from "lucide-react";
import {
  SiTypescript, SiNextdotjs, SiReact, SiNodedotjs,
  SiExpress, SiFastapi, SiMongodb, SiPython,
  SiFlutter, SiKotlin, SiDart,
  SiRedis, SiDocker, SiGit, SiMysql, SiPostgresql, SiOllama,
  SiSolidity, SiHtml5, SiCss, SiLaravel, SiPhp, SiDjango, SiJavascript,
} from "react-icons/si";
import type { IconBaseProps, IconType } from "react-icons";
import { FaJava } from "react-icons/fa";
import { useInView, useReducedMotion } from "framer-motion";
import { useSitePreferences } from "@/hooks/useSitePreferences";
import { ProjectLogo } from "@/components/ui/ProjectLogo";
import { stackProjects, techStackUsage } from "@/lib/techStackUsage";

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
  placeholder?: boolean;
};

function QuestionMark(props: IconBaseProps) {
  return <svg viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M9 7a3 3 0 0 1 6 0c0 1.3-.7 2-1.9 2.9C11.7 11 11 12 11 14v1h2v-1c0-1.2.3-1.7 1.4-2.5C15.9 10.4 17 9.2 17 7A5 5 0 0 0 7 7h2Zm2 11h2v3h-2Z" /></svg>;
}

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
  { name: "Dart", icon: SiDart, category: "languages", color: "#54c5f8", lightColor: "#0175c2" },
  { name: "Kotlin", icon: SiKotlin, category: "languages", color: "#bb75ff", lightColor: "#7f3fbf" },
  { name: "Java", icon: FaJava, category: "languages", color: "#f89820", lightColor: "#b85b00" },
  { name: "Redis", icon: SiRedis, category: "databases", color: "#ff655a", lightColor: "#c52c23" },
  { name: "Docker", icon: SiDocker, category: "tools", color: "#45b7ff", lightColor: "#1473b4" },
  { name: "Git", icon: SiGit, category: "tools", color: "#f56a50", lightColor: "#c64129" },
  { name: "MySQL", icon: SiMysql, category: "databases", color: "#63b5df", lightColor: "#00618a" },
  { name: "PostgreSQL", icon: SiPostgresql, category: "databases", color: "#81b6e5", lightColor: "#336791" },
  { name: "Ollama", icon: SiOllama, category: "ai", color: "#f5f5f5", lightColor: "#242424" },
  { name: "CAG/RAG", icon: BrainCircuit, category: "ai", color: "#b59cff", lightColor: "#7447b8" },
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
  const [mobileColumns, setMobileColumns] = useState<number | null>(null);
  const [describedTechnology, setDescribedTechnology] = useState("MongoDB");
  const activeTechnology = hoveredTechnology ?? focusedTechnology ?? pinnedTechnology;
  const visibleTools = selectedCategory === "all" ? tools : tools.filter(tool => tool.category === selectedCategory);
  const squareColumns = Math.ceil(Math.sqrt(visibleTools.length));
  const columns = Math.min(squareColumns, mobileColumns ?? squareColumns);
  const rows = mobileColumns ? Math.ceil(visibleTools.length / columns) : columns;
  const displayTools: Technology[] = [...visibleTools, ...Array.from({ length: columns * rows - visibleTools.length }, (_, index) => ({
    name: `upcoming-${index}`, icon: QuestionMark, category: "ai" as const,
    color: "#c9a5b0", lightColor: "#865269", placeholder: true,
  }))];
  const sceneHeight = selectedCategory === "all" ? 900 : Math.max(360, (columns + rows) * 72 + 220);
  const listId = `${standId}-technologies`;
  const selectedLabel = categories.find(category => category.id === selectedCategory)?.label;
  const describedTool = displayTools.find(tool => tool.name === describedTechnology) ?? visibleTools[0];
  const description = techStackUsage[describedTool.name];
  const DescriptionIcon = describedTool.icon;
  const descriptionId = `${standId}-description`;

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;
    const resizeScene = () => {
      if (window.innerWidth < 768) {
        scene.style.removeProperty("--cube-scale");
        return;
      }
      const styles = getComputedStyle(scene);
      const size = parseFloat(styles.getPropertyValue("--cube-size"));
      const gap = parseFloat(styles.getPropertyValue("--cube-gap")) || 68;
      const projectedWidth = (columns * size + (columns - 1) * gap) * Math.SQRT2 + 80;
      scene.style.setProperty("--cube-scale", String(Math.min(1, (scene.clientWidth - 24) / projectedWidth)));
    };
    const observer = new ResizeObserver(resizeScene);
    observer.observe(scene);
    resizeScene();
    return () => observer.disconnect();
  }, [columns, selectedCategory]);

  useEffect(() => {
    const phone = window.matchMedia("(max-width: 767px)");
    const narrowPhone = window.matchMedia("(max-width: 359px)");
    const syncColumns = () => setMobileColumns(phone.matches ? (narrowPhone.matches ? 2 : 3) : null);
    syncColumns();
    phone.addEventListener("change", syncColumns);
    narrowPhone.addEventListener("change", syncColumns);
    return () => {
      phone.removeEventListener("change", syncColumns);
      narrowPhone.removeEventListener("change", syncColumns);
    };
  }, []);

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
        <p id="tech-stand-hint">Explore a technology to see where I use it.</p>
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
      <div className="tech-stack-layout">
      <div id={descriptionId} className="tech-stack-description" aria-live="polite" aria-atomic="true"
        style={{ "--tech-color": describedTool.color, "--tech-color-light": describedTool.lightColor } as CSSProperties}>
        <div className="tech-description-title">
          <DescriptionIcon className="tech-description-icon tech-logo" aria-hidden="true" />
          <h3>{describedTool.placeholder ? "Coming soon" : describedTool.name}</h3>
        </div>
        <p className="tech-description-copy">{describedTool.placeholder
          ? "Always learning, always building. There is more to come."
          : description.description}</p>
        {!describedTool.placeholder && description.projects.length > 0 && <>
          <h4>Used in</h4>
          <ul className="tech-project-usage">
            {description.projects.map(usage => {
              const project = stackProjects[usage.project];
              return <li key={project.id}>
                <div className="tech-usage-project">
                  <ProjectLogo project={project} className="tech-usage-logo" sizes="44px" />
                  <span>{project.title}</span>
                </div>
                <p>{usage.description}</p>
              </li>;
            })}
          </ul>
        </>}
      </div>
      <div ref={sceneRef} className="tech-cubes-scene" data-running={inView} data-density={selectedCategory === "all" ? "compact" : "regular"}
        data-count={visibleTools.length} style={{ "--cube-columns": columns, "--scene-height": `${sceneHeight}px` } as CSSProperties}
        onPointerMove={tiltScene} onPointerLeave={resetTilt}>
        <ul id={listId} className="tech-cubes-field" aria-label="Technologies I work with">
          {displayTools.map((tool, index) => {
            const Icon = tool.icon;
            const active = activeTechnology === tool.name;
            const displayId = `${standId}-${index}`;
            return (
              <li key={tool.name} className="tech-cube" data-technology={tool.placeholder ? undefined : tool.name}
                data-placeholder={tool.placeholder || undefined} data-category={tool.placeholder ? undefined : tool.category} data-active={active}
                onPointerEnter={event => { if (event.pointerType === "mouse") {
                  setHoveredTechnology(tool.name);
                  setDescribedTechnology(tool.name);
                } }}
                onPointerLeave={() => setHoveredTechnology(null)}
                style={{
                "--tech-color": tool.color,
                "--tech-color-light": tool.lightColor,
                "--cube-elevation": `${(index % columns + rows - 1 - Math.floor(index / columns)) * (selectedCategory === "all" ? 8 : 12)}px`,
                "--cube-delay": `${index * -0.67}s`,
                "--cube-duration": `${5.5 + (index % 4) * 0.6}s`,
              } as CSSProperties}>
                <button className="tech-cube-lift" type="button" aria-label={tool.placeholder ? "Upcoming skill: Soon" : `${tool.name} display stand`}
                  aria-expanded={active} aria-controls={`${displayId} ${descriptionId}`} aria-describedby="tech-stand-hint"
                  onFocus={event => { if (event.currentTarget.matches(":focus-visible")) {
                    setFocusedTechnology(tool.name);
                    setDescribedTechnology(tool.name);
                  } }}
                  onBlur={() => setFocusedTechnology(null)}
                  onClick={() => {
                    setFocusedTechnology(null);
                    setDescribedTechnology(tool.name);
                    setPinnedTechnology(current => current === tool.name ? null : tool.name);
                  }}>
                  <span className="tech-cube-body">
                    <span className="tech-cube-face tech-cube-top">
                      <span className="tech-cube-content">
                        <Icon className="tech-logo" aria-hidden="true" />
                        {!tool.placeholder && <span>{tool.name}</span>}
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
                        {tool.placeholder ? <span className="tech-stand-soon">Soon</span> : <>
                          <Icon className="tech-stand-etch" />
                          <Icon className="tech-stand-mark tech-logo" />
                        </>}
                      </span>
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      </div>
    </section>
  );
}
