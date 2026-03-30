import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function FinShieldPage() {
  return (
    <div className="pt-32 pb-24 max-w-4xl mx-auto px-6">
      <Link href="/#projects" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to Projects
      </Link>
      
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">FinShield</h1>
      <p className="text-xl text-blue-400 mb-12">Secure Invoice Audit & Verification</p>
      
      <div className="aspect-video bg-zinc-900 rounded-2xl w-full mb-16 relative overflow-hidden border border-white/5 flex items-center justify-center">
        {/* Placeholder for the real image */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/5 pointer-events-none" />
        <span className="text-zinc-500 font-medium z-10">Project Screenshot / Mockup Placeholder</span>
      </div>
      
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-4">Overview</h2>
          <p className="text-zinc-300 leading-relaxed text-lg">
            FinShield is an enterprise-grade invoice audit and verification system emphasizing uncompromising security. It focuses on fraud detection, anomaly identification, and secure document handling, fortified by blockchain anchoring.
          </p>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">Core Features</h2>
          <ul className="list-disc list-inside space-y-3 text-zinc-300 leading-relaxed text-lg marker:text-blue-500">
            <li>Advanced fraud and anomaly detection utilizing Python-based Machine Learning models.</li>
            <li>Role-based access control and strict audit workflows to maintain compliance.</li>
            <li>Tamper-evident verification of documents using IPFS and Blockchain anchoring strategies.</li>
            <li>Highly secure and scalable backend architecture powered by Node.js and MongoDB.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Tech Stack</h2>
          <div className="flex flex-wrap gap-3">
            {["Next.js", "Express.js", "MongoDB", "Python", "FastAPI", "Blockchain", "IPFS"].map(tech => (
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
