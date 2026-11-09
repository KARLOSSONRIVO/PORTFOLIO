import { Hero } from "@/components/sections/Hero";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { MoreProjects } from "@/components/sections/MoreProjects";
import { TechStack } from "@/components/sections/TechStack";
import { Contact } from "@/components/sections/Contact";
import { ProjectBackground } from "@/components/ui/ProjectBackground";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="portfolio-sections-background">
        <div className="project-showcase">
          <ProjectBackground />
          <FeaturedProjects />
          <MoreProjects />
        </div>
        <TechStack />
        <Contact />
      </div>
    </>
  );
}

