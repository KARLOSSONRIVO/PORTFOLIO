import Image from "next/image";

type ProjectBrand = { id: string; title: string; logo: string };

export function ProjectLogo({ project, className = "", sizes = "(max-width: 768px) 100vw, 50vw" }: { project: ProjectBrand; className?: string; sizes?: string }) {
  return (
    <div className={`project-logo-stage ${className}`} data-project={project.id}>
      {project.id === "ucash" ? (
        <svg className="ucash-logo" viewBox="110 20 440 115" role="img" aria-label="U-Cash logo">
          <image href={project.logo} width="651" height="769" />
        </svg>
      ) : (
        <Image src={project.logo} alt={`${project.title} logo`} fill unoptimized sizes={sizes} />
      )}
    </div>
  );
}
