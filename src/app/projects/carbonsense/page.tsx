import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import carbonsenseImg from "@/app/images/Projects/Carbonsense.png";

export default function CarbonSensePage() {
  return (
    <div className="pt-32 pb-24 max-w-4xl mx-auto px-6">
      <Link href="/#projects" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to Projects
      </Link>
      
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">CarbonSense</h1>
      <p className="text-xl text-green-400 mb-12">Intelligent Carbon Footprint Tracking</p>
      
      <div className="aspect-video bg-zinc-900 rounded-2xl w-full mb-16 relative overflow-hidden border border-white/5 flex items-center justify-center">
        <img 
          src={carbonsenseImg.src} 
          alt="CarbonSense Project Screenshot" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <p className="text-zinc-300 leading-relaxed text-lg">
            CarbonSense is a sustainability platform designed to track user activities and calculate corresponding CO₂ emissions. It goes beyond simple tracking by utilizing AI-powered recommendations and embeddings to deliver highly personalized sustainability insights, driving actionable behavioral changes.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">Core Features</h2>
          <ul className="list-disc list-inside space-y-3 text-zinc-300 leading-relaxed text-lg marker:text-green-500">
            <li>Activity tracking and robust CO₂ emission calculation engine.</li>
            <li>Personalized recommendations generated through AI embeddings.</li>
            <li>Interactive analytics dashboards visualizing user activity trends.</li>
            <li>Seamless integration between the Express/Node.js backend and Python/FastAPI ML services.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-3">
            {["Next.js", "Express.js", "Node.js", "MongoDB", "Python", "FastAPI", "AI Embeddings"].map(tech => (
              <span key={tech} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-zinc-300 text-sm font-medium">
                {tech}
              </span>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
