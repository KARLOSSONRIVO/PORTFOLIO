"use client";

import { Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay: i * 0.15, ease: [0.25, 0.4, 0.25, 1] as const },
  }),
};

export function Contact() {
  const { ref, isInView } = useScrollReveal({ margin: "-60px" });

  return (
    <section
      id="contact"
      className="py-32 px-4 md:px-8 bg-surface text-center relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />

      <motion.div
        ref={ref}
        className="max-w-3xl mx-auto relative z-10 flex flex-col items-center"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Eyebrow */}
        <motion.h2
          custom={0}
          variants={fadeUp}
          className="font-label text-primary tracking-[0.3em] uppercase text-sm mb-6 flex items-center gap-4"
        >
          <span className="w-12 h-[1px] bg-primary/50" />
          What&apos;s Next?
          <span className="w-12 h-[1px] bg-primary/50" />
        </motion.h2>

        <motion.h3
          custom={1}
          variants={fadeUp}
          className="font-headline font-black text-5xl md:text-7xl tracking-tighter mb-8"
        >
          Get In Touch
        </motion.h3>

        <motion.p
          custom={2}
          variants={fadeUp}
          className="font-body text-on-surface-variant text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed"
        >
          I&apos;m currently looking for new opportunities and collaborations. Whether you
          have a question, a project idea, or just want to say hi, I&apos;ll try my best
          to get back to you!
        </motion.p>

        <motion.a
          custom={3}
          variants={fadeUp}
          href="mailto:karlosrivo@gmail.com"
          className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-black font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(220,20,60,0.3)] hover:shadow-[0_0_40px_rgba(220,20,60,0.5)]"
        >
          <Mail className="w-5 h-5" />
          Say Hello
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.a>

        <motion.div
          custom={4}
          variants={fadeUp}
          className="mt-24 flex items-center justify-center gap-12 border-t border-outline-variant/30 pt-8 w-full max-w-sm"
        >
          <a
            href="https://www.linkedin.com/in/karlos-rivo/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-label text-sm uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/KarlossonRivo"
            target="_blank"
            rel="noopener noreferrer"
            className="font-label text-sm uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors"
          >
            GitHub
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
