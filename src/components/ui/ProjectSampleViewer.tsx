"use client";

import { ArrowLeft, ArrowUpRight, LoaderCircle, Monitor, Smartphone } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import type { ProjectSample, SampleDevice } from "@/lib/projectSamples";
import { NativeSampleFrame } from "@/components/project-samples/NativeSampleFrame";

export function ProjectSampleViewer({ title, samples, onBack }: {
  title: string;
  samples: readonly ProjectSample[];
  onBack: () => void;
}) {
  const [device, setDevice] = useState<SampleDevice>(samples[0].device);
  const [loading, setLoading] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const [failed, setFailed] = useState(false);
  const backRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const sample = samples.find(item => item.device === device) ?? samples[0];
  const hasVariants = samples.length > 1;

  useEffect(() => { backRef.current?.focus({ preventScroll: true }); }, []);

  function select(next: SampleDevice) {
    if (next === device) return;
    setDevice(next);
    setLoading(true);
    setRevealed(false);
    setFailed(false);
  }

  return (
    <div className="project-sample-viewer">
      <div className="project-sample-toolbar">
        <button ref={backRef} type="button" className="project-sample-back" onClick={onBack}>
          <ArrowLeft size={16} aria-hidden="true" /> Project details
        </button>
        {hasVariants ? (
          <div className="project-sample-tabs" role="tablist" aria-label="Sample screen format">
            {samples.map((item, index) => (
              <button
                key={item.device}
                id={`${panelId}-${item.device}`}
                type="button"
                role="tab"
                aria-selected={item.device === device}
                aria-controls={panelId}
                tabIndex={item.device === device ? 0 : -1}
                onClick={() => select(item.device)}
                onKeyDown={event => {
                  const direction = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
                  if (!direction && event.key !== "Home" && event.key !== "End") return;
                  event.preventDefault();
                  const next = event.key === "Home" ? 0 : event.key === "End" ? samples.length - 1 : (index + direction + samples.length) % samples.length;
                  select(samples[next].device);
                  document.getElementById(`${panelId}-${samples[next].device}`)?.focus();
                }}
              >
                {item.device === "mobile" ? <Smartphone size={15} aria-hidden="true" /> : <Monitor size={15} aria-hidden="true" />}
                {item.device === "mobile" ? "Mobile" : "Desktop"}
              </button>
            ))}
          </div>
        ) : (
          <span className="project-sample-format" id={`${panelId}-${device}`}>
            {device === "mobile" ? <Smartphone size={15} aria-hidden="true" /> : <Monitor size={15} aria-hidden="true" />}
            {sample.label}
          </span>
        )}
      </div>
      <div className="project-sample-caption">
        <span>{sample.label} · Fictional data</span>
        {sample.src && <a href={sample.src} target="_blank" rel="noopener noreferrer">Open sample <ArrowUpRight size={14} aria-hidden="true" /><span className="sr-only"> in a new tab</span></a>}
      </div>
      <section
        id={panelId}
        className="project-sample-stage"
        data-device={device}
        role={hasVariants ? "tabpanel" : undefined}
        aria-labelledby={`${panelId}-${device}`}
        aria-busy={loading}
      >
        <div
          className="project-sample-device"
          data-loaded={!loading && !failed}
          data-revealed={revealed}
          onAnimationEnd={event => {
            if (event.target === event.currentTarget) setRevealed(true);
          }}
        >
          {loading && <div className="project-sample-loading" role="status"><LoaderCircle size={20} aria-hidden="true" /> Opening sample…</div>}
          {sample.native ? <NativeSampleFrame key={sample.native} project={sample.native} title={title} onReady={()=>setLoading(false)}/> : <iframe
            key={sample.src}
            src={sample.src}
            title={`${title} — ${sample.label}, fictional data`}
            sandbox="allow-scripts"
            referrerPolicy="no-referrer"
            onLoad={() => setLoading(false)}
            onError={() => { setLoading(false); setFailed(true); }}
          />}
        </div>
        {failed && <p className="project-sample-error" role="alert">The sample couldn’t load. Use Open sample to view it separately.</p>}
      </section>
    </div>
  );
}
