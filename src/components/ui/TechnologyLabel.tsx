import { BrainCircuit, Cloud, CodeXml, Network, type LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";
import { FaJava } from "react-icons/fa";
import {
  SiExpress, SiFastapi, SiFlutter, SiJetpackcompose, SiKotlin,
  SiMongodb, SiMysql, SiNextdotjs, SiNodedotjs, SiOllama,
  SiPhp, SiPolygon, SiPostgresql, SiPython, SiRedis, SiTypescript,
  SiHtml5, SiCss, SiJavascript, SiAndroid, SiLaravel, SiChartdotjs,
} from "react-icons/si";

const technologyIcons: Record<string, IconType | LucideIcon> = {
  "Express.js": SiExpress,
  "FastAPI": SiFastapi,
  "Flutter": SiFlutter,
  "Jetpack Compose": SiJetpackcompose,
  "Kotlin": SiKotlin,
  "MongoDB": SiMongodb,
  "MySQL": SiMysql,
  "Next.js": SiNextdotjs,
  "Node.js": SiNodedotjs,
  "Ollama": SiOllama,
  "PHP": SiPhp,
  "Polygon": SiPolygon,
  "PostgreSQL": SiPostgresql,
  "Python": SiPython,
  "Redis/BullMQ": SiRedis,
  "TypeScript": SiTypescript,
  "S3": Cloud,
  "AI Embeddings": BrainCircuit,
  "CAG/RAG": BrainCircuit,
  "HTML": SiHtml5,
  "CSS": SiCss,
  "JavaScript": SiJavascript,
  "Android": SiAndroid,
  "Laravel": SiLaravel,
  "Chart.js": SiChartdotjs,
  "Retrofit": Network,
  "Java": FaJava,
};

export function TechnologyLabel({ name }: { name: string }) {
  const Icon = technologyIcons[name] ?? CodeXml;

  return (
    <span className="project-technology" data-technology={name}>
      <Icon size={15} aria-hidden="true" />
      <span>{name}</span>
    </span>
  );
}
