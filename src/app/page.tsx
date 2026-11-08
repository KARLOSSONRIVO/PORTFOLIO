import { Hero } from "@/components/sections/Hero";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { TechStack } from "@/components/sections/TechStack";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="portfolio-sections-background">
        <FeaturedProjects />
        <TechStack />
        <Contact />
      </div>
    </>
  );
}

