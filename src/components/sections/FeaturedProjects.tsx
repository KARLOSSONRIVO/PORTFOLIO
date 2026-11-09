"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ProjectPreview } from "@/components/ui/ProjectPreview";
import { ProjectCard } from "@/components/ui/ProjectCard";

const projects = [
  {
    id: "carbonsense",
    title: "CarbonSense",
    tagline: "Intelligent Carbon Footprint Tracking",
    description: "A carbon footprint tracker that calculates everyday emissions, recommends greener alternatives, and turns sustainable habits into measurable progress.",
    tags: ["Sustainability", "AI Recommendations"],
    tech: ["Express.js", "Node.js", "MongoDB", "Python", "FastAPI"],
    logo: "/projects/logos/carbonsense.png",
    role: "Full-stack development",
    projectType: "Carbon footprint web application",
    contribution: "I built a web application for tracking and analyzing carbon footprints, with emissions calculations for transportation, diet, and energy use. I added AI-driven recommendations, achievements, progress tracking, and dashboard visualizations to help users build more sustainable habits.",
    features: [
      "Activity tracking and robust CO₂ emission calculation engine.",
      "Personalized recommendations generated through AI embeddings.",
      "Interactive analytics dashboards visualizing user activity trends.",
      "Seamless integration between the Express/Node.js backend and Python/FastAPI ML services.",
    ],
    detailTech: ["Next.js", "Express.js", "Node.js", "MongoDB", "Python", "FastAPI", "CAG/RAG"],
  },
  {
    id: "finshield",
    title: "FinShield",
    tagline: "Role-Based Invoice Management & Verification",
    description: "An invoice management platform for SMEs, combining company and branch workflows, secure document storage, and blockchain-backed invoice verification.",
    tags: ["Invoice Management", "Blockchain"],
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Python", "Polygon"],
    logo: "/projects/logos/finshield.svg",
    role: "Full-stack development",
    projectType: "Invoice management & verification",
    contribution: "I developed a role-based invoice management platform for SMEs, including invoice processing, refunds, credit memos, reporting, and company and branch management. I integrated secure S3 storage, QR/PDF verification, document-change detection, and Polygon anchoring, with Redis/BullMQ and Python services for asynchronous processing.",
    features: [
      "Role-based invoice processing, refunds, credit memos, and reporting.",
      "Company and branch management with secure S3 document storage.",
      "QR/PDF verification and document-change detection.",
      "Polygon blockchain anchoring and audit logging for integrity and traceability.",
      "Asynchronous document processing with Redis/BullMQ and Python services.",
    ],
    detailTech: ["Next.js", "TypeScript", "Node.js", "Express.js", "PostgreSQL", "Python", "Redis/BullMQ", "S3", "Polygon"],
  },
  {
    id: "daguconnect",
    title: "DaguConnect",
    tagline: "Tradesmen Booking & Job Marketplace",
    description: "A web and mobile platform connecting clients with skilled tradesmen through bookings, job posts, applications, and chat, with a web companion for managing the service.",
    tags: ["Service Marketplace", "Web & Mobile"],
    tech: ["Kotlin", "Jetpack Compose", "PHP", "MySQL", "JavaScript"],
    logo: "/projects/logos/daguconnect.png",
    role: "Web, mobile & backend development",
    projectType: "Tradesmen booking & job marketplace",
    contribution: "I developed a platform that connects clients with skilled tradesmen such as plumbers and roofers. I built direct booking and job-posting flows, enabled tradesmen to browse and apply for suitable jobs, and implemented chat for communication and job coordination. I also built the web companion's user, booking, rating, payment, and report screens, with dashboard charts and table previews using sample data.",
    features: [
      "Direct booking of skilled tradesmen for home and service needs.",
      "Job posting for clients looking for the right tradesman.",
      "Job browsing and applications based on tradesmen's skills.",
      "Client-to-tradesman chat for direct communication and job coordination.",
      "Web companion screens for users, bookings, ratings, payments, and reports.",
      "Chart.js dashboard visualizations and table filters demonstrated with sample data.",
    ],
    detailTech: ["Kotlin", "Jetpack Compose", "PHP", "MySQL", "HTML", "CSS", "JavaScript", "Chart.js"],
  },
  {
    id: "anchorwatch",
    title: "AnchorWatch",
    tagline: "FinTech Stablecoin Monitoring",
    description: "A financial monitoring platform for stablecoin and USDC activity, bringing together analytics, alerts, and AI-generated financial summaries.",
    tags: ["FinTech", "AI Insights"],
    tech: ["Python", "FastAPI", "MongoDB", "Flutter", "Ollama"],
    logo: "/projects/logos/anchorwatch.png",
    role: "Backend & AI development",
    projectType: "Stablecoin monitoring platform",
    contribution: "I developed a FinTech platform for monitoring stablecoin and USDC-related activity with analytics and alerts. I engineered Python and FastAPI backend services with MongoDB, and implemented AI-powered financial summaries to turn the data into structured insights.",
    features: [
      "Monitoring of stablecoin and USDC-related financial activity.",
      "Analytics and alerts to support financial analysis.",
      "Python and FastAPI backend services with MongoDB data management.",
      "AI-powered financial data summarization and structured insights.",
    ],
    detailTech: ["Python", "FastAPI", "MongoDB", "Flutter", "Ollama"],
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
  const [selectedProject, setSelectedProject] = useState<typeof projects[number] | null>(null);
  const [previewOrigin, setPreviewOrigin] = useState({ x: 0, y: 0 });
  const { ref: headingRef, isInView: headingInView } = useScrollReveal();
  const { ref: gridRef, isInView: gridInView } = useScrollReveal({ margin: "-60px" });

  return (
    <section id="projects" className="py-20 sm:py-24 md:py-32 section-px">
      <div className="max-w-7xl mx-auto">

        {/* Heading row */}
        <motion.div
          ref={headingRef}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-14 md:mb-20 gap-4 sm:gap-8"
          initial="hidden"
          animate={headingInView ? "visible" : "hidden"}
        >
          <motion.h2
            custom={0}
            variants={fadeUp}
            className="font-headline font-black text-heading uppercase tracking-tighter"
          >
            Featured <br /><span className="text-primary">Projects</span>
          </motion.h2>
          <motion.p
            custom={1}
            variants={fadeUp}
            className="font-body text-on-surface-variant max-w-sm md:text-right"
          >
            Selected work across web, mobile, and AI-powered platforms.
          </motion.p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          ref={gridRef}
          className="featured-project-grid"
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
        >
          {projects.map((project, i) => (
            <motion.div key={project.id} custom={i} variants={fadeUp} className="min-w-0 h-full">
              <ProjectCard project={project} onOpen={origin => { setPreviewOrigin(origin); setSelectedProject(project); }} />
            </motion.div>
          ))}
        </motion.div>
      </div>
      {selectedProject && <ProjectPreview project={selectedProject} origin={previewOrigin} onClose={() => setSelectedProject(null)} />}
    </section>
  );
}
