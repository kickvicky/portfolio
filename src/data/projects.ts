export type ProjectArtType = "map" | "stream" | "cache";

export type Project = {
  slug: string;
  number: string;
  title: string;
  tag: string;
  description: string;
  color: string;
  art: ProjectArtType;
  year: string;
  stack: string[];
  repository: string;
  architecture: string[];
  problem: string[];
  solution: string[];
  results: { value: string; label: string }[];
};

// TODO: replace placeholder repository links and per-project results with real values.
const placeholderResults = [
  { value: "2M+", label: "EVENTS / HOUR" },
  { value: "180ms", label: "P95 LATENCY" },
  { value: "99.99%", label: "UPTIME" },
];

export const projects: Project[] = [
  {
    slug: "geo-pulse",
    number: "01",
    title: "GEO//PULSE",
    tag: "POSTGIS · GO",
    description: "A real-time spatial analytics engine processing 2M+ location events every hour.",
    color: "bg-[#b8ff69]",
    art: "map",
    year: "2024",
    stack: ["Go", "PostGIS", "Kafka", "Redis", "Kubernetes", "OpenTelemetry"],
    repository: "https://github.com",
    architecture: ["Mobile SDK", "Kafka Bus", "Go Workers", "PostGIS"],
    problem: [
      "Location data is deceptively difficult at scale. A single delivery can emit thousands of noisy coordinates, and traditional request-response pipelines buckle when millions of devices report at once.",
      "The existing workflow made fresh spatial data available several minutes late. Operations teams were making decisions against a map that had already moved on.",
    ],
    solution: [
      "GEO//PULSE replaces the synchronous pipeline with a partitioned event stream. Go workers validate, enrich, and batch coordinates before writing spatially indexed records into PostGIS.",
      "The result is a fault-tolerant system that processes more than two million events per hour while keeping p95 ingest latency below 180 milliseconds.",
    ],
    results: placeholderResults,
  },
  {
    slug: "streamctrl",
    number: "02",
    title: "STREAMCTRL",
    tag: "KAFKA · REACT",
    description: "An observability console that makes event-driven systems readable at a glance.",
    color: "bg-[#ffea00]",
    art: "stream",
    year: "2024",
    stack: ["React", "TypeScript", "Kafka", "WebSockets", "ClickHouse", "Docker"],
    repository: "https://github.com",
    architecture: ["Event Topics", "Stream API", "WebSocket", "Control UI"],
    problem: [
      "Event-driven systems are powerful, but their behavior is often hidden across topic logs, consumer groups, and disconnected dashboards.",
      "Engineers lost time correlating lag spikes and failed messages by hand, turning small production incidents into long investigations.",
    ],
    solution: [
      "STREAMCTRL turns the event graph into one live operating surface. A compact stream API normalizes broker metadata and pushes updates directly into a React control room.",
      "Teams can trace a message, inspect consumer health, and spot partition imbalance without leaving the timeline that exposed the issue.",
    ],
    results: placeholderResults,
  },
  {
    slug: "cache-out",
    number: "03",
    title: "CACHE//OUT",
    tag: "REDIS · GO",
    description: "A resilient distributed cache with smart eviction and zero-downtime failover.",
    color: "bg-[#ff4fa3]",
    art: "cache",
    year: "2024",
    stack: ["Go", "Redis", "gRPC", "Raft", "Prometheus", "Terraform"],
    repository: "https://github.com",
    architecture: ["API Clients", "gRPC Router", "Cache Nodes", "Replicas"],
    problem: [
      "A fast cache is only useful when it behaves predictably under pressure. Sudden traffic bursts were producing hot keys, uneven memory use, and cascading retries.",
      "Conventional eviction rules optimized individual nodes but ignored the health of the cluster as a whole.",
    ],
    solution: [
      "CACHE//OUT uses consistent hashing, replicated writes, and workload-aware eviction to keep the cluster balanced as demand changes.",
      "Automated failover redirects traffic without dropping active requests, while a compact telemetry layer makes capacity decisions visible before they become incidents.",
    ],
    results: placeholderResults,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
