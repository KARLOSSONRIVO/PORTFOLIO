"use client";

import { ProjectLogo } from "@/components/ui/ProjectLogo";
import { TechnologyLabel } from "@/components/ui/TechnologyLabel";
import { ProjectSampleViewer } from "@/components/ui/ProjectSampleViewer";
import { getProjectSamples } from "@/lib/projectSamples";
import { useSitePreferences } from "@/hooks/useSitePreferences";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";

type ProjectDetails = {
  id: string;
  title: string;
  tagline: string;
  logo: string;
  role: string;
  projectType: string;
  contribution: string;
  features: string[];
  detailTech: string[];
};

export function ProjectPreview({ project, origin, onClose }: { project: ProjectDetails; origin: { x: number; y: number }; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const sampleLaunchRef = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closingRef = useRef(false);
  const [closing, setClosing] = useState(false);
  const [showSample, setShowSample] = useState(false);
  const samples = getProjectSamples(project.id);
  const reducedMotion = useReducedMotion();
  const { paused } = useSitePreferences();
  const quiet = reducedMotion || paused;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const root = document.documentElement;
    const previous = { body: document.body.style.overflow, root: root.style.overflow, padding: root.style.paddingRight };
    const scrollbar = window.innerWidth - root.clientWidth;
    if (scrollbar > 0) root.style.paddingRight = `${scrollbar}px`;
    document.body.style.overflow = "hidden";
    root.style.overflow = "hidden";
    root.dataset.projectPreviewOpen = "true";
    window.dispatchEvent(new CustomEvent("projectPreviewChange", { detail: { open: true } }));
    dialog.showModal();
    closeRef.current?.focus({ preventScroll: true });

    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      dialog.close();
      document.body.style.overflow = previous.body;
      root.style.overflow = previous.root;
      root.style.paddingRight = previous.padding;
      delete root.dataset.projectPreviewOpen;
      window.dispatchEvent(new CustomEvent("projectPreviewChange", { detail: { open: false } }));
      opener?.focus({ preventScroll: true });
    };
  }, []);

  function dismiss() {
    if (closingRef.current) return;
    closingRef.current = true;
    setClosing(true);
    if (quiet) onClose();
    else closeTimer.current = setTimeout(onClose, 180);
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="project-preview"
      aria-labelledby="project-preview-title"
      aria-describedby="project-preview-tagline"
      data-state={closing ? "closing" : "open"}
      data-quiet={Boolean(quiet)}
      data-sample-open={showSample}
      style={{ "--certificate-origin-x": `${origin.x * 0.18}px`, "--certificate-origin-y": `${origin.y * 0.18}px` } as CSSProperties}
      data-lenis-prevent
      onCancel={event => { event.preventDefault(); dismiss(); }}
      onClick={event => { if (event.target === event.currentTarget) dismiss(); }}
      onKeyDown={event => {
        if (event.key === "Escape") { event.preventDefault(); dismiss(); return; }
        if (event.key !== "Tab") return;
        const targets = [...event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]):not([tabindex="-1"]), a[href], iframe, [tabindex="0"]')].filter(element => element.getClientRects().length > 0);
        const first = targets[0];
        const last = targets[targets.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
    >
      <div className="project-preview-panel">
        <header className="project-preview-header">
          <div className="project-preview-identity">
            <ProjectLogo project={project} className="project-preview-logo" sizes="72px" />
            <div>
              <h2 id="project-preview-title">{project.title}</h2>
              <p id="project-preview-tagline">{project.tagline}</p>
            </div>
          </div>
          <button ref={closeRef} type="button" className="project-preview-close" onClick={dismiss} aria-label="Close project details" title="Close project details">
            <X size={22} aria-hidden="true" />
          </button>
        </header>
        <div ref={contentRef} className="project-preview-content" data-lenis-prevent tabIndex={0} role="region" aria-label={`${project.title} ${showSample ? "sample screen" : "project details"}`}>
          {showSample ? (
            <ProjectSampleViewer title={project.title} samples={samples} onBack={() => {
              setShowSample(false);
              requestAnimationFrame(() => sampleLaunchRef.current?.focus({ preventScroll: true }));
            }} />
          ) : (
          <div className="project-preview-details">
            {samples.length > 0 && <div className="project-sample-launch">
              <div><h3>Explore the dashboard</h3><p>A sample screen with fictional data.</p></div>
              <button ref={sampleLaunchRef} type="button" onClick={() => {
                contentRef.current?.scrollTo({ top: 0, behavior: "instant" });
                setShowSample(true);
              }}>View sample <ArrowUpRight size={17} aria-hidden="true" /></button>
            </div>}
            <dl className="project-preview-meta">
              <div>
                <dt>My role</dt>
                <dd>{project.role}</dd>
              </div>
              <div>
                <dt>Project</dt>
                <dd>{project.projectType}</dd>
              </div>
            </dl>
            <section className="project-preview-overview" aria-labelledby="project-overview-title">
              <h3 id="project-overview-title">My contribution</h3>
              <p>{project.contribution}</p>
            </section>
            <section className="project-preview-features" aria-labelledby="project-features-title">
              <h3 id="project-features-title">A closer look</h3>
              <ul>{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
            </section>
            <section className="project-preview-technologies" aria-labelledby="project-tech-title">
              <h3 id="project-tech-title">Built with</h3>
              <ul className="project-preview-tech">{project.detailTech.map(tech => <li key={tech}><TechnologyLabel name={tech} /></li>)}</ul>
            </section>
          </div>
          )}
        </div>
      </div>
    </dialog>,
    document.body,
  );
}
