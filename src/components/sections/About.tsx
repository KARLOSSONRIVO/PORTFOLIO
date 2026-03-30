export function About() {
  return (
    <section id="about" className="py-32 px-8 md:px-24 bg-surface relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-24 items-center">
        <div className="w-full md:w-1/2">
          <div className="relative w-full aspect-[4/5] bg-surface-container overflow-hidden rounded-xl">
            <img
              alt="The Architect"
              className="w-full h-full object-cover grayscale opacity-60 transition-transform duration-700 hover:scale-105 hover:grayscale-0 hover:opacity-100"
              src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent pointer-events-none"></div>
          </div>
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="font-headline font-black text-5xl md:text-6xl uppercase tracking-tighter mb-8 leading-tight">
            About <br /><span className="text-primary">Me</span>
          </h2>
          <div className="space-y-6 font-body text-lg text-on-surface-variant leading-relaxed">
            <p>
              I am a passionate software developer focused on designing and engineering high-quality, impactful systems. My primary domains of interest include full-stack web development, backend engineering, secure architecture, and implementing AI-driven features to solve real-world problems.
            </p>
            <p>
              My focus lies in building robust foundations: backend orchestration, database optimization, and high-performance APIs. I believe in software that is clean, secure, and highly scalable.
            </p>
          </div>
          <div className="mt-12 pt-8 border-t border-outline-variant/30 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <p className="font-label text-primary text-[10px] uppercase tracking-widest mb-2">Background</p>
              <p className="font-headline font-bold text-xl uppercase tracking-tight">Full-Stack Dev</p>
            </div>
            <div>
              <p className="font-label text-primary text-[10px] uppercase tracking-widest mb-2">Specialization</p>
              <p className="font-headline font-bold text-xl uppercase tracking-tight">Backend & Security</p>
            </div>
            <div>
              <p className="font-label text-primary text-[10px] uppercase tracking-widest mb-2">Emerging Focus</p>
              <p className="font-headline font-bold text-xl uppercase tracking-tight">AI_DEVELOPMENT</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
