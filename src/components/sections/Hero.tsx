// Rebuilt landing background via shadcn pattern implementation
"use client";

import { HeroGeometric } from "@/components/ui/shape-landing-hero";

export function Hero() {
  return (
    <section id="home">
      <HeroGeometric
        badge="Digital Engineering & Design"
        title1="Full-Stack / "
        title2="Software Developer"
        subtitle="Engineering high-impact systems where technical complexity meets architectural elegance. Specializing in resilient backends and monolithic digital experiences."
      />
    </section>
  );
}
