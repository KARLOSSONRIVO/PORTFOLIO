import { Mail, ArrowRight } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-32 px-4 md:px-8 bg-surface text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center">
        <h2 className="font-label text-primary tracking-[0.3em] uppercase text-sm mb-6 flex items-center gap-4">
          <span className="w-12 h-[1px] bg-primary/50" />
          What's Next?
          <span className="w-12 h-[1px] bg-primary/50" />
        </h2>
        
        <h3 className="font-headline font-black text-5xl md:text-7xl tracking-tighter mb-8">
          Get In Touch
        </h3>
        
        <p className="font-body text-on-surface-variant text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed">
          I'm currently looking for new opportunities and collaborations. Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!
        </p>

        <a 
          href="mailto:karlosrivo@gmail.com"
          className="group inline-flex items-center gap-3 px-8 py-4 bg-primary text-black font-bold uppercase tracking-widest rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(220,20,60,0.3)] hover:shadow-[0_0_40px_rgba(220,20,60,0.5)]"
        >
          <Mail className="w-5 h-5" />
          Say Hello
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>

        <div className="mt-24 flex items-center justify-center gap-12 border-t border-outline-variant/30 pt-8 w-full max-w-sm">
          <a href="#" className="font-label text-sm uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">
            LinkedIn
          </a>
          <a href="#" className="font-label text-sm uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors">
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
