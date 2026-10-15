import type { Accent } from "@/lib/theme";

export type ProjectArtType = "map" | "vision" | "perimeter";

export type Project = {
  slug: string;
  number: string;
  title: string;
  tag: string;
  description: string;
  color: Accent;
  art: ProjectArtType;
  year: string;
  /** Shown in the case-study sidebar and diagram caption, e.g. "IN PROGRESS", "COMPLETED". */
  status: string;
  type: string;
  role: string;
  scope: string;
  stack: string[];
  /** Public source links, one button each. Omit for private / unpublished code and no buttons are shown. */
  repositories?: { label: string; url: string }[];
  architecture: string[];
  /** Case-study section headlines; each array item renders on its own line. */
  problemHeadline: string[];
  solutionHeadline: string[];
  problem: string[];
  solution: string[];
  results: { value: string; label: string }[];
};

// TODO: add `repositories` for CCTV//LOG and FLEET//TRACK if they're public on github.com/kickvicky.
export const projects: Project[] = [
  {
    slug: "radius",
    number: "01",
    title: "RADIUS",
    tag: "SPRING · POSTGIS",
    description: "A location-based community feed that serves nearby posts with indexed PostGIS radius queries.",
    color: "lime",
    art: "map",
    year: "2026",
    status: "IN PROGRESS",
    type: "MICROSERVICES",
    role: "Full-stack engineering",
    scope: "Architecture + Build",
    stack: ["Java", "Spring Boot", "Spring Cloud", "Next.js", "Redis", "PostgreSQL", "PostGIS", "Docker"],
    repositories: [
      { label: "Backend services", url: "https://github.com/kickvicky/radius-microservices" },
      { label: "Web app", url: "https://github.com/kickvicky/radius-web" },
    ],
    architecture: ["Next.js SSR", "API Gateway", "Spring Boot", "PostGIS"],
    problemHeadline: ["NEARBY SHOULDN'T", "MEAN FULL SCAN."],
    solutionHeadline: ["INDEX THE MAP.", "CENTRALISE TRUST."],
    problem: [
      "A community feed is only useful if it's local: every request has to answer “what's been posted near me?” Done naively, that means measuring the distance to every post in the table, and the cost grows with every new post.",
      "Authentication needed the same care. Tokens that browser scripts can read invite XSS, and sessions pinned to one server instance log users out on every deploy or container restart.",
    ],
    solution: [
      "Posts are stored as PostGIS Geography types behind a GiST index, so each feed is an ST_DWithin radius query that uses the index instead of scanning the whole table.",
      "A Spring Cloud API Gateway handles OAuth2 in one place. The browser only ever holds an HttpOnly session, which the gateway exchanges for stateless JWTs for the backend services. Sessions live in Redis via Spring Session, so instances can restart or redeploy without logging anyone out, and the Next.js front end is server-rendered for SEO and fast first loads.",
    ],
    results: [
      { value: "0", label: "FULL-TABLE SCANS" },
      { value: "JWT", label: "STATELESS BACKEND AUTH" },
      { value: "REDIS", label: "SESSIONS SURVIVE RESTARTS" },
    ],
  },
  {
    slug: "cctv-log",
    number: "02",
    title: "CCTV//LOG",
    tag: "OPENCV · CGAN",
    description: "A computer-vision pipeline that turns raw CCTV footage into searchable, timestamped subject timelines.",
    color: "yellow",
    art: "vision",
    year: "2022",
    status: "COMPLETED",
    type: "COMPUTER VISION",
    role: "Computer vision + Full-stack",
    scope: "Pipeline + Web app",
    stack: ["Python", "OpenCV", "TensorFlow", "PyTorch", "Node.js", "React", "MongoDB"],
    architecture: ["Raw Footage", "Haar + cGAN", "MongoDB", "Timeline App"],
    problemHeadline: ["HOURS OF FOOTAGE,", "ONE SUBJECT."],
    solutionHeadline: ["LET THE PIPELINE", "DO THE WATCHING."],
    problem: [
      "Security reviews meant scrubbing through hours of CCTV footage by hand to work out when and where one person appeared.",
      "Even when the subject was on camera, the footage often didn't help: low-light, low-resolution frames left the region of interest too pixelated to recognise reliably.",
    ],
    solution: [
      "A custom Haar cascade detects subjects in each frame, and a conditional GAN (cGAN) restores the pixelated, low-light regions of interest so recognition still works on poor footage.",
      "An automated ingestion backend runs raw footage through the pipeline and writes every timestamped sighting to a cloud-hosted, distributed MongoDB database. A full-stack web app queries those records and builds a chronological timeline for any subject, replacing hours of manual searching with a single query.",
    ],
    results: [
      { value: "cGAN", label: "LOW-LIGHT ROI ENHANCEMENT" },
      { value: "AUTO", label: "FOOTAGE INGESTION" },
      { value: "1", label: "QUERY PER SUBJECT TIMELINE" },
    ],
  },
  {
    slug: "fleet-track",
    number: "03",
    title: "FLEET//TRACK",
    tag: "OPENCV · GEOFENCING",
    description: "Real-time fleet tracking across construction-site perimeters. 2nd of 563 teams at Caterpillar CodeAthon.",
    color: "pink",
    art: "perimeter",
    year: "2022",
    status: "RUNNER-UP",
    type: "SPATIAL TRACKING",
    role: "Computer vision",
    scope: "Hackathon prototype",
    stack: ["OpenCV", "Computer Vision", "Point-in-Polygon", "Geofencing"],
    architecture: ["Site Footage", "OpenCV Tracking", "Point-in-Polygon", "Perimeter Monitor"],
    problemHeadline: ["WHO'S INSIDE", "THE LINE?"],
    solutionHeadline: ["LET GEOMETRY", "KEEP WATCH."],
    problem: [
      "Construction sites move heavy fleets across large, irregular perimeters. Knowing in real time which machines are inside the site boundary, and which have left it, is hard to do reliably by eye.",
      "Caterpillar's CodeAthon challenge was to automate that kind of spatial monitoring for commercial environments.",
    ],
    solution: [
      "OpenCV tracks each vehicle's position through the site footage in real time. Every position is tested against the site's perimeter polygon with a point-in-polygon check, so the system always knows which vehicles are inside the boundary.",
      "The prototype placed 2nd among 563 teams at Caterpillar CodeAthon 2022.",
    ],
    results: [
      { value: "2ND", label: "OF 563 TEAMS" },
      { value: "LIVE", label: "FLEET POSITIONS" },
      { value: "PIP", label: "PERIMETER CHECKS" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
