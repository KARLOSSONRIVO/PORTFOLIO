"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const projects = [
  {
    id: "carbonsense",
    title: "CarbonSense",
    tagline: "Intelligent Carbon Footprint Tracking",
    description: "A real-time sustainability engine tracking industrial carbon footprints using high-throughput data processing and predictive analytics.",
    tags: ["Sustainability", "AI Engine"],
    tech: ["Express.js", "Node.js", "MongoDB", "Python", "FastAPI"],
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: "finshield",
    title: "FinShield",
    tagline: "Secure Invoice Audit & Verification",
    description: "Decentralized financial security layer protecting transactions through cryptographically secure blockchain consensus mechanisms.",
    tags: ["Security", "Blockchain"],
    tech: ["Express.js", "MongoDB", "Python", "Blockchain", "IPFS"],
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=80",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.18, ease: [0.25, 0.4, 0.25, 1] as const },
  }),
};

export function FeaturedProjects() {
  const { ref: headingRef, isInView: headingInView } = useScrollReveal();
  const { ref: gridRef, isInView: gridInView } = useScrollReveal({ margin: "-60px" });

  return (
    <section id="projects" className="py-32 px-8 md:px-24 bg-surface-container-low">
      <div className="max-w-7xl mx-auto">

        {/* Heading row */}
        <motion.div
          ref={headingRef}
          className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8"
          initial="hidden"
          animate={headingInView ? "visible" : "hidden"}
        >
          <motion.h2
            custom={0}
            variants={fadeUp}
            className="font-headline font-black text-5xl md:text-7xl uppercase tracking-tighter"
          >
            Featured <br /><span className="text-primary">Projects</span>
          </motion.h2>
          <motion.p
            custom={1}
            variants={fadeUp}
            className="font-body text-on-surface-variant max-w-sm md:text-right"
          >
            A selection of technical marvels built with precision and modern architectural patterns.
          </motion.p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
        >
          {projects.map((project, i) => (
            <motion.div key={project.id} custom={i} variants={fadeUp}>
              <Link href={`/projects/${project.id}`} className="block group">
                <div className="relative glass-panel p-8 rounded-xl shadow-[0_0_40px_rgba(220,20,60,0.08)] flex flex-col h-full overflow-hidden">
                  {/* Project Image */}
                  <div className="aspect-video w-full mb-8 overflow-hidden rounded-lg bg-zinc-900">
                    <img
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                      src={project.image}
                    />
                  </div>

                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-headline font-bold text-3xl uppercase tracking-tight text-on-surface group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="text-primary w-8 h-8 opacity-0 group-hover:opacity-100 -translate-x-2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                  </div>

                  <p className="font-body text-on-surface-variant mb-8 flex-grow text-lg">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-surface-container-lowest text-primary font-label text-[10px] uppercase tracking-wider rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-zinc-500 font-mono mt-auto pt-6 border-t border-outline-variant/20">
                    {project.tech.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
