import { ArrowUpRight } from "lucide-react";
import { ProjectLogo } from "@/components/ui/ProjectLogo";
import { TechnologyLabel } from "@/components/ui/TechnologyLabel";

type ProjectCardData = {
  id: string;
  title: string;
  description: string;
  logo: string;
  tags: string[];
  tech: string[];
};

export function ProjectCard({ project, onOpen }: { project: ProjectCardData; onOpen: (origin: { x: number; y: number }) => void }) {
  return (
    <button
      type="button"
      className="project-card"
      aria-label={`View ${project.title} project`}
      aria-haspopup="dialog"
      onClick={event => {
        const bounds = event.currentTarget.getBoundingClientRect();
        onOpen({ x: bounds.left + bounds.width / 2 - window.innerWidth / 2, y: bounds.top + bounds.height / 2 - window.innerHeight / 2 });
      }}
    >
      <div className="project-card-body">
        <div className="project-card-heading">
          <p className="project-card-category">{project.tags.join(" / ")}</p>
          <h3>{project.title}</h3>
        </div>
        <ProjectLogo project={project} className="project-card-logo" sizes="112px" />
        <p className="project-card-description">{project.description}</p>
      </div>
      <ul className="project-card-stack" aria-label="Technologies">
        {project.tech.map(tech => <li key={tech}><TechnologyLabel name={tech} /></li>)}
      </ul>
      <div className="project-card-footer" aria-hidden="true">
        <span>View project</span>
        <ArrowUpRight size={18} />
      </div>
    </button>
  );
}
