import Link from "next/link";
import { Component, Mail } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="w-full pt-6 pb-[calc(var(--mobile-nav-clearance)+1rem)] md:pb-6 section-px-sm mt-auto bg-surface-container-lowest border-t border-outline-variant/10">
      <div className="grid grid-cols-1 items-center gap-x-6 gap-y-5 md:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <Link href="/" className="inline-flex min-h-11 items-center justify-self-center md:justify-self-start gap-2 text-primary font-black text-xl tracking-tight uppercase w-fit hover:text-on-surface transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4">
          <Component className="w-6 h-6 shrink-0" aria-hidden="true" />
          <span>Karlos Rivo</span>
        </Link>
        <p className="order-3 text-center text-sm leading-relaxed text-on-surface-variant md:col-span-2 xl:order-none xl:col-span-1">
          <span className="inline-block">&copy; {new Date().getFullYear()} Karlos Son Rivo. All rights reserved.</span>{" "}
          <span className="inline-block">Designed and built by Karlos Son Rivo.</span>
        </p>
        <div className="flex flex-wrap items-center justify-center justify-self-center gap-x-6 gap-y-3 text-sm font-bold uppercase text-on-surface-variant md:justify-self-end">
          <Link href="https://github.com/KARLOSSONRIVO" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4">
            <FaGithub className="w-4 h-4 shrink-0" aria-hidden="true" />
            GitHub
          </Link>
          <Link href="https://www.linkedin.com/in/karlos-son-rivo-8a37bb2a0/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4">
            <FaLinkedinIn className="w-4 h-4 shrink-0" aria-hidden="true" />
            LinkedIn
          </Link>
          <Link href="mailto:Karlosrivo@gmail.com" className="inline-flex min-h-11 items-center gap-2 hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-4">
            <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
            Email
          </Link>
        </div>
      </div>
    </footer>
  );
}
