import { Link as LinkIcon } from "lucide-react";
import { 
  SiTypescript, SiNextdotjs, SiReact, SiNodedotjs, 
  SiExpress, SiFastapi, SiMongodb, SiPython, 
  SiFlutter, SiKotlin 
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

export function TechStack() {
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

  return (
    <section className="py-32 px-8 md:px-24 bg-surface-container-low">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="font-headline font-black text-4xl md:text-5xl uppercase tracking-tighter mb-4">
            Tech <span className="text-primary">Stack</span>
          </h2>
          <p className="font-label text-on-surface-variant uppercase tracking-[0.3em] text-[10px]">
            Tools & Frameworks
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="bg-surface-container-high/40 border border-outline-variant/10 p-8 rounded-xl flex flex-col items-center justify-center hover:bg-primary-container/10 transition-all group shadow-[0_4px_30px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(220,20,60,0.1)]"
            >
              {tool.icon}
              <span className="font-label text-[10px] uppercase tracking-widest text-on-surface">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
