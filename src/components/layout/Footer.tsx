import Link from "next/link";
import { Component } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full pt-12 sm:pt-16 pb-12 sm:pb-16 mobile-nav-clearance section-px-sm mt-auto bg-surface-container-lowest border-t border-outline-variant/10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 sm:gap-8 w-full max-w-7xl mx-auto">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 group">
              <Component className="text-primary w-6 h-6 shrink-0" />
              <span className="text-primary font-black font-headline text-xl sm:text-2xl tracking-tighter uppercase">Karlos Rivo</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-3 sm:gap-8">
          <Link href="https://github.com/KARLOSSONRIVO" target="_blank" className="font-headline font-bold text-base sm:text-lg uppercase tracking-tight text-on-surface/60 hover:text-primary hover:translate-x-1 transition-all">
            Github
          </Link>
          <Link href="https://www.linkedin.com/in/karlos-son-rivo-8a37bb2a0/" target="_blank" className="font-headline font-bold text-base sm:text-lg uppercase tracking-tight text-on-surface/60 hover:text-primary hover:translate-x-1 transition-all">
            LinkedIn
          </Link>
          <Link href="mailto:Karlosrivo@gmail.com" className="font-headline font-bold text-base sm:text-lg uppercase tracking-tight text-on-surface/60 hover:text-primary hover:translate-x-1 transition-all">
            Email
          </Link>
        </div>
      </div>
    </footer>
  );
}
