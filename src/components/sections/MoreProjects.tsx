"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectPreview } from "@/components/ui/ProjectPreview";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { moreProjects } from "@/lib/moreProjects";

export function MoreProjects() {
  const [selectedProject, setSelectedProject] = useState<typeof moreProjects[number] | null>(null);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const { ref, isInView } = useScrollReveal({ margin: "-40px" });

  return (
    <section id="more-projects" className="more-projects section-px" aria-labelledby="more-projects-title">
      <div className="max-w-7xl mx-auto">
        <header className="more-projects-header">
          <div>
            <h2 id="more-projects-title">More projects<span>.</span></h2>
            <p>Web, mobile, and smaller builds.</p>
          </div>
          <span className="more-projects-count">{moreProjects.length} projects</span>
        </header>
        <motion.div
          ref={ref}
          className="featured-project-grid"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {moreProjects.map(project => (
            <ProjectCard key={project.id} project={project} onOpen={origin => { setOrigin(origin); setSelectedProject(project); }} />
          ))}
        </motion.div>
      </div>
      {selectedProject && <ProjectPreview project={selectedProject} origin={origin} onClose={() => setSelectedProject(null)} />}
    </section>
  );
}
