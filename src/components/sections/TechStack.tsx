"use client";

import { Link as LinkIcon } from "lucide-react";
import {
  SiTypescript, SiNextdotjs, SiReact, SiNodedotjs,
  SiExpress, SiFastapi, SiMongodb, SiPython,
  SiFlutter, SiKotlin
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const tools = [
  { name: "TypeScript", icon: <SiTypescript className="w-8 h-8 mb-4 group-hover:text-primary transition-colors" /> },
  { name: "Next.js", icon: <SiNextdotjs className="w-8 h-8 mb-4 group-hover:text-primary transition-colors" /> },
  { name: "React", icon: <SiReact className="w-8 h-8 mb-4 group-hover:text-primary transition-colors" /> },
  { name: "Node.js", icon: <SiNodedotjs className="w-8 h-8 mb-4 group-hover:text-primary transition-colors" /> },
  { name: "Express.js", icon: <SiExpress className="w-8 h-8 mb-4 group-hover:text-primary transition-colors" /> },
  { name: "MongoDB", icon: <SiMongodb className="w-8 h-8 mb-4 group-hover:text-primary transition-colors" /> },
  { name: "Python", icon: <SiPython className="w-8 h-8 mb-4 group-hover:text-primary transition-colors" /> },
  { name: "FastAPI", icon: <SiFastapi className="w-8 h-8 mb-4 group-hover:text-primary transition-colors" /> },
  { name: "Blockchain", icon: <LinkIcon className="w-8 h-8 mb-4 group-hover:text-primary transition-colors" /> },
  { name: "Flutter", icon: <SiFlutter className="w-8 h-8 mb-4 group-hover:text-primary transition-colors" /> },
  { name: "Kotlin", icon: <SiKotlin className="w-8 h-8 mb-4 group-hover:text-primary transition-colors" /> },
  { name: "Java", icon: <FaJava className="w-8 h-8 mb-4 group-hover:text-primary transition-colors" /> },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.55,
      delay: i * 0.06,
      ease: [0.25, 0.4, 0.25, 1] as const,
    },
  }),
};

export function TechStack() {
  const { ref: headingRef, isInView: headingInView } = useScrollReveal();
  const { ref: gridRef, isInView: gridInView } = useScrollReveal({ margin: "-40px" });

  return (
    <section className="py-32 px-8 md:px-24 bg-surface-container-low">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <motion.div
          ref={headingRef}
          className="text-center mb-24"
          initial={{ opacity: 0, y: 40 }}
          animate={headingInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <h2 className="font-headline font-black text-4xl md:text-5xl uppercase tracking-tighter mb-4">
            Tech <span className="text-primary">Stack</span>
          </h2>
          <p className="font-label text-on-surface-variant uppercase tracking-[0.3em] text-[10px]">
            Tools &amp; Frameworks
          </p>
        </motion.div>

        {/* Icons grid — staggered */}
        <motion.div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
        >
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              custom={i}
              variants={cardVariants}
              className="bg-surface-container-high/40 border border-outline-variant/10 p-8 rounded-xl flex flex-col items-center justify-center hover:bg-primary-container/10 transition-all group shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(220,20,60,0.1)] cursor-default"
            >
              {tool.icon}
              <span className="font-label text-[10px] uppercase tracking-widest text-on-surface">
                {tool.name}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
