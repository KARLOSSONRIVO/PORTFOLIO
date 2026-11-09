export type SampleDevice = "desktop" | "mobile";
export type NativeSampleId = "carbonsense" | "finshield";
export type ProjectSample = { device: SampleDevice; label: string } & (
  | { native: NativeSampleId; src?: never }
  | { src: string; native?: never }
);

const projectSamples: Record<string, ProjectSample[]> = {
  carbonsense: [{ device: "desktop", label: "Web dashboard", native: "carbonsense" }],
  finshield: [{ device: "desktop", label: "Company dashboard", native: "finshield" }],
  daguconnect: [
    { device: "desktop", label: "Web dashboard", src: "/project-samples/daguconnect-desktop.html" },
    { device: "mobile", label: "Android home", src: "/project-samples/daguconnect-mobile.html" },
  ],
  anchorwatch: [
    { device: "desktop", label: "Web dashboard", src: "/project-samples/anchorwatch-desktop.html" },
    { device: "mobile", label: "Flutter dashboard", src: "/project-samples/anchorwatch-mobile.html" },
  ],
  ucash: [{ device: "desktop", label: "Desktop home", src: "/project-samples/ucash-desktop.html" }],
  paldex: [{ device: "desktop", label: "Original home screen", src: "/project-samples/paldex-desktop.html" }],
  "send-notes": [{ device: "mobile", label: "Android home", src: "/project-samples/send-notes-mobile.html" }],
};

export function getProjectSamples(projectId: string): readonly ProjectSample[] {
  return projectSamples[projectId] ?? [];
}
