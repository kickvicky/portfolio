import { FormEvent, useState } from "react";

const Arrow = ({ diagonal = false }: { diagonal?: boolean }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={`h-5 w-5 ${diagonal ? "-rotate-45" : ""}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
  >
    <path d="M4 12h15M13 5l7 7-7 7" />
  </svg>
);

const Star = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
    <path
      d="M50 2 59 34 87 17 67 42 99 50 67 59 86 84 59 67 50 99 41 67 15 84 33 59 1 50 33 42 14 17 41 34Z"
      fill="currentColor"
      stroke="black"
      strokeWidth="3"
    />
  </svg>
);

const projects = [
  {
    number: "01",
    title: "GEO//PULSE",
    tag: "POSTGIS · GO",
    description: "A real-time spatial analytics engine processing 2M+ location events every hour.",
    color: "bg-[#b8ff69]",
    art: "map",
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
  },
  {
    number: "02",
    title: "STREAMCTRL",
    tag: "KAFKA · REACT",
    description: "An observability console that makes event-driven systems readable at a glance.",
    color: "bg-[#ffea00]",
    art: "stream",
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
  },
  {
    number: "03",
    title: "CACHE//OUT",
    tag: "REDIS · GO",
    description: "A resilient distributed cache with smart eviction and zero-downtime failover.",
    color: "bg-[#ff4fa3]",
    art: "cache",
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
  },
];

const roles = [
  {
    date: "2024—NOW",
    title: "SOFTWARE ENGINEER II",
    company: "WALMART GLOBAL TECH",
    copy: "Building fault-tolerant distributed systems that move inventory data at global scale.",
    color: "bg-[#ffea00]",
  },
  {
    date: "2023—2024",
    title: "SOFTWARE ENGINEER",
    company: "WALMART GLOBAL TECH",
    copy: "Designed event-driven services and production tooling for high-volume commerce systems.",
    color: "bg-[#b8ff69]",
  },
  {
    date: "SUMMER '22",
    title: "ENGINEERING INTERN",
    company: "CLOUD PLATFORM TEAM",
    copy: "Cut deployment feedback loops with internal platform automation and better observability.",
    color: "bg-[#ff4fa3]",
  },
];

function ProjectArt({ type }: { type: string }) {
  if (type === "map") {
    return (
      <div className="relative h-full w-full overflow-hidden bg-white">
        <div className="absolute inset-0 wire-grid" />
        <svg viewBox="0 0 400 210" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <path d="M-20 160 C60 80 85 205 165 120 S285 20 430 90" fill="none" stroke="black" strokeWidth="5" />
          <path d="M40 0 C110 55 88 100 150 140 S255 190 350 125" fill="none" stroke="black" strokeWidth="2" strokeDasharray="8 8" />
          <circle cx="165" cy="120" r="13" fill="#ff4fa3" stroke="black" strokeWidth="4" />
          <circle cx="303" cy="52" r="9" fill="#ffea00" stroke="black" strokeWidth="4" />
          <circle cx="74" cy="126" r="8" fill="#b8ff69" stroke="black" strokeWidth="4" />
        </svg>
        <span className="absolute right-3 top-3 border-2 border-black bg-black px-2 py-1 font-mono text-[10px] text-white">
          37.7749° N
        </span>
      </div>
    );
  }
  if (type === "stream") {
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#111]">
        <div className="flex w-[85%] items-center gap-2">
          {[20, 50, 32, 72, 43].map((height, index) => (
            <div key={index} className="flex flex-1 flex-col gap-2">
              <div className="border-2 border-white bg-[#ffea00] p-2 font-mono text-[9px]">TOPIC_{index + 1}</div>
              <div className="border-2 border-white bg-white" style={{ height }} />
            </div>
          ))}
        </div>
        <div className="absolute left-0 right-0 top-1/2 h-1 bg-[#ff4fa3]" />
      </div>
    );
  }
  return (
    <div className="relative grid h-full w-full grid-cols-5 gap-2 overflow-hidden bg-white p-5 wire-grid">
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
        <div
          key={item}
          className={`border-2 border-black ${item === 3 || item === 7 ? "bg-[#b8ff69]" : "bg-white"}`}
        />
      ))}
      <div className="absolute bottom-3 right-3 border-2 border-black bg-[#ff4fa3] px-3 py-1 font-mono text-xs font-bold">
        HIT 98.7%
      </div>
    </div>
  );
}

type Project = (typeof projects)[number];

function ArchitectureDiagram({ project }: { project: Project }) {
  return (
    <div className="architecture-board">
      <div className="architecture-grid" />
      <div className="architecture-flow">
        {project.architecture.map((label, index) => (
          <div className="contents" key={label}>
            <div className={`architecture-node ${index === 1 ? project.color : "bg-white"}`}>
              <span className="font-mono text-[9px] font-bold">NODE_{String(index + 1).padStart(2, "0")}</span>
              <strong>{label}</strong>
              <span className="status-dot">LIVE</span>
            </div>
            {index < project.architecture.length - 1 && (
              <div className="architecture-arrow" aria-hidden="true">
                <span />
                <Arrow />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="architecture-caption">
        <span>SYSTEM TOPOLOGY / PRODUCTION</span>
        <span>UPTIME 99.99%</span>
      </div>
    </div>
  );
}

function ProjectDetail({ project, onBack }: { project: Project; onBack: () => void }) {
  return (
    <main className="project-detail min-h-screen">
      <div className="border-b-4 border-black bg-[#f8f5ec] px-4 py-5 md:px-8 lg:px-14">
        <button
          type="button"
          onClick={onBack}
          className="brutal-button flex items-center gap-3 bg-[#ffea00] px-5 py-3 font-mono text-xs font-black uppercase"
        >
          <span className="rotate-180"><Arrow /></span> Back to home
        </button>
      </div>

      <header className="relative px-4 pb-14 pt-16 md:px-8 lg:px-14 lg:pt-24">
        <div className="mb-7 flex flex-wrap items-center gap-3 font-mono text-[10px] font-black uppercase">
          <span className="border-2 border-black bg-black px-3 py-1.5 text-white">CASE STUDY</span>
          <span>PROJECT_{project.number}</span>
          <span>/</span>
          <span>2024</span>
        </div>
        <h1 className="detail-title">{project.title}</h1>
        <div className="mt-8 flex flex-col justify-between gap-5 border-t-3 border-black pt-5 md:flex-row md:items-end">
          <p className="max-w-2xl font-display text-xl font-bold leading-tight md:text-3xl">{project.description}</p>
          <p className="font-mono text-[10px] font-bold uppercase leading-relaxed md:text-right">
            Role / Backend engineering<br />
            Scope / Architecture + Build
          </p>
        </div>
      </header>

      <section className="px-4 md:px-8 lg:px-14">
        <ArchitectureDiagram project={project} />
      </section>

      <section className="case-study-layout">
        <article className="editorial-copy">
          <div className="case-section">
            <span className="case-index">01 / THE PROBLEM</span>
            <h2>THE SYSTEM<br />COULDN'T KEEP UP.</h2>
            {project.problem.map((paragraph, index) => (
              <p key={index} className={index === 0 ? "lead-paragraph" : ""}>{paragraph}</p>
            ))}
          </div>
          <div className="case-section">
            <span className="case-index">02 / THE SOLUTION</span>
            <h2>BUILD FOR THE<br />MESSY REAL WORLD.</h2>
            {project.solution.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="result-strip">
            <div><strong>2M+</strong><span>EVENTS / HOUR</span></div>
            <div><strong>180ms</strong><span>P95 LATENCY</span></div>
            <div><strong>99.99%</strong><span>UPTIME</span></div>
          </div>
        </article>

        <aside className="case-sidebar">
          <div className="sticky-card">
            <div className={`${project.color} border-b-3 border-black p-4 font-mono text-xs font-black uppercase`}>
              Build manifest
            </div>
            <div className="p-5">
              <p className="mb-4 font-mono text-[10px] font-bold uppercase text-black/50">// Technology stack</p>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((technology) => (
                  <span key={technology} className="tech-tag">{technology}</span>
                ))}
              </div>
              <div className="my-7 border-t-2 border-dashed border-black" />
              <dl className="sidebar-meta">
                <div><dt>STATUS</dt><dd>SHIPPED</dd></div>
                <div><dt>TYPE</dt><dd>DISTRIBUTED SYSTEM</dd></div>
                <div><dt>YEAR</dt><dd>2024</dd></div>
              </dl>
              <a
                href={project.repository}
                target="_blank"
                rel="noreferrer"
                className="brutal-button mt-7 flex w-full items-center justify-between bg-black px-5 py-4 font-mono text-xs font-black uppercase text-white"
              >
                View repository <Arrow diagonal />
              </a>
            </div>
          </div>
        </aside>
      </section>

      <footer className="mt-10 flex flex-col items-center justify-between gap-5 border-t-4 border-black bg-[#ffea00] px-4 py-8 md:flex-row md:px-8 lg:px-14">
        <span className="font-mono text-xs font-black uppercase">End of file_{project.number}</span>
        <button type="button" onClick={onBack} className="flex items-center gap-3 font-mono text-xs font-black uppercase underline decoration-2 underline-offset-4">
          Return to all projects <span className="rotate-180"><Arrow /></span>
        </button>
      </footer>
    </main>
  );
}

export default function App() {
  const [sent, setSent] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const activeProject = projects.find((project) => project.number === selectedProject);

  const openProject = (projectNumber: string) => {
    setSelectedProject(projectNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeProject = () => {
    setSelectedProject(null);
    window.setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 0);
  };

  const submitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  if (activeProject) {
    return <ProjectDetail project={activeProject} onBack={closeProject} />;
  }

  return (
    <main className="min-h-screen overflow-hidden text-black">
      <nav className="fixed left-0 right-0 top-0 z-50 flex h-16 items-center justify-between border-b-4 border-black bg-[#f8f5ec] px-4 md:px-8">
        <a href="#top" className="font-display text-xl font-black tracking-[-0.06em]">
          VA<span className="text-[#ff4fa3]">.</span>DEV
        </a>
        <div className="hidden items-center gap-8 font-mono text-xs font-bold uppercase md:flex">
          <a className="nav-link" href="#experience">01 / Experience</a>
          <a className="nav-link" href="#projects">02 / Projects</a>
          <a className="nav-link" href="#about">03 / Off-duty</a>
        </div>
        <a href="#contact" className="brutal-button bg-[#ffea00] px-4 py-2 font-mono text-xs font-black uppercase">
          Let's talk <span aria-hidden="true">↗</span>
        </a>
      </nav>

      <section id="top" className="relative flex min-h-[820px] flex-col justify-center px-4 pb-20 pt-28 md:px-8 lg:px-14">
        <div className="page-counter absolute right-4 top-24 md:right-8 md:top-28">
          <span>PAGE</span>
          <strong>01</strong>
          <span>/ 04</span>
        </div>
        <div className="mb-5 flex items-center gap-3 font-mono text-xs font-bold uppercase">
          <span className="inline-block h-3 w-3 animate-pulse border-2 border-black bg-[#b8ff69]" />
          Available for ambitious builds
        </div>
        <h1 className="hero-title hero-title-long max-w-[1400px]">
          VIGNESH
          <br />
          <span className="relative inline-block">
            ANNAMALAI
            <Star className="absolute -right-20 -top-3 hidden w-16 rotate-12 text-[#ffea00] sm:block md:w-24" />
          </span>
          <span className="text-stroke"> .DEV</span>
        </h1>
        <div className="mt-8 grid items-end gap-8 lg:grid-cols-[1fr_1.3fr]">
          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="brutal-button flex items-center gap-4 bg-black px-6 py-4 font-mono text-sm font-black uppercase text-white">
              View my work <Arrow />
            </a>
            <a href="#contact" className="brutal-button flex items-center gap-4 bg-[#b8ff69] px-6 py-4 font-mono text-sm font-black uppercase">
              Contact me <Arrow diagonal />
            </a>
          </div>
          <p className="max-w-3xl font-display text-2xl font-bold leading-tight tracking-tight md:text-4xl">
            Backend Engineer at <span className="marker">Walmart Global Tech</span> building distributed systems.
          </p>
        </div>
        <div className="absolute bottom-6 right-6 hidden items-center gap-3 font-mono text-[10px] font-bold uppercase md:flex">
          Scroll to explore <span className="flex h-10 w-7 items-center justify-center rounded-full border-2 border-black">↓</span>
        </div>
      </section>

      <div className="ticker-wrap -rotate-2 border-y-4 border-black bg-[#ffea00] py-4">
        <div className="ticker font-display text-3xl font-black uppercase md:text-5xl">
          {Array.from({ length: 2 }).map((_, copy) => (
            <span key={copy} className="flex shrink-0 items-center">
              GO <i>✦</i> REACT <i>✦</i> KAFKA <i>✦</i> POSTGIS <i>✦</i> DISTRIBUTED SYSTEMS <i>✦</i>&nbsp;
            </span>
          ))}
        </div>
      </div>

      <section id="experience" className="section-shell">
        <header className="section-heading">
          <span className="section-number">01</span>
          <div>
            <p className="eyebrow">// SELECTED STOPS</p>
            <h2>THE ROUTE<br />SO FAR.</h2>
          </div>
        </header>

        <div className="timeline mx-auto mt-16 max-w-5xl">
          {roles.map((role, index) => (
            <article key={role.date} className="timeline-row">
              <div className="timeline-date">{role.date}</div>
              <div className={`timeline-node ${role.color}`}>
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="brutal-card timeline-card">
                <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3>{role.title}</h3>
                    <p className="font-mono text-xs font-bold">{role.company}</p>
                  </div>
                  {index === 0 && <span className="border-2 border-black bg-[#b8ff69] px-2 py-1 font-mono text-[10px] font-bold">CURRENT</span>}
                </div>
                <p className="max-w-2xl text-lg font-medium leading-snug">{role.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className="border-y-4 border-black bg-[#111] px-4 py-24 text-white md:px-8 lg:px-14">
        <header className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <p className="eyebrow text-[#b8ff69]">// THINGS I SHIPPED</p>
            <h2 className="section-title text-white">PROJECT<br />FILES.</h2>
          </div>
          <p className="max-w-sm font-mono text-xs leading-relaxed text-white/70">
            A selection of systems, tools, and weird experiments made to solve hard problems.
          </p>
        </header>
        <div className="grid gap-7 xl:grid-cols-3">
          {projects.map((project) => (
            <article key={project.number} className="project-card group">
              <div className="project-art"><ProjectArt type={project.art} /></div>
              <div className={`${project.color} border-t-4 border-black p-5 text-black`}>
                <div className="mb-5 flex justify-between font-mono text-[10px] font-black">
                  <span>FILE_{project.number}</span><span>{project.tag}</span>
                </div>
                <h3 className="font-display text-3xl font-black tracking-[-0.04em] md:text-4xl">{project.title}</h3>
                <p className="mt-3 min-h-14 font-medium leading-snug">{project.description}</p>
                <button
                  type="button"
                  onClick={() => openProject(project.number)}
                  className="mt-6 flex w-full items-center justify-between border-t-2 border-black pt-4 font-mono text-xs font-black uppercase"
                >
                  Inspect case study <span className="arrow-box"><Arrow diagonal /></span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="section-shell">
        <header className="section-heading">
          <span className="section-number bg-[#ff4fa3]">02</span>
          <div>
            <p className="eyebrow">// WHEN I'M OFFLINE</p>
            <h2>OUTSIDE<br />THE TERMINAL.</h2>
          </div>
        </header>

        <div className="bento mt-14">
          <article className="bento-climb">
            <img
              src="https://images.unsplash.com/photo-1564769662533-4f00a87b4056?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200"
              alt="Climber traversing an indoor bouldering wall"
            />
            <div className="photo-label bg-[#ffea00]">BOULDERING</div>
            <Star className="absolute right-3 top-3 z-10 w-20 rotate-12 text-[#b8ff69] drop-shadow-[4px_4px_0_#090909] md:w-24" />
          </article>
          <article className="bento-note bg-[#b8ff69]">
            <p className="eyebrow">// BETA LOG</p>
            <strong>V6</strong>
            <p className="font-mono text-xs font-bold uppercase">Current project grade</p>
            <div className="mt-auto barcode" />
          </article>
          <article className="bento-mount">
            <img
              src="https://images.unsplash.com/photo-1554176259-aa961fc32671?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900"
              alt="Snow-covered mountain summit beneath a dramatic sky"
            />
            <div className="photo-label bg-[#b8ff69]">MOUNTAINEERING</div>
          </article>
          <article className="bento-surf">
            <img
              src="https://images.unsplash.com/photo-1526342122811-2a9c8512023d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200"
              alt="Surfer carving across an open wave"
            />
            <div className="photo-label bg-[#ff4fa3]">SURFING</div>
          </article>
          <article className="bento-run">
            <img
              src="https://images.unsplash.com/photo-1778362950179-88f6c8423f8d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=900"
              alt="Trail runner moving across a rocky mountain ridge"
            />
            <div className="photo-label bg-[#ffea00]">RUNNING</div>
          </article>
          <article className="bento-ski">
            <img
              src="https://images.unsplash.com/photo-1551524559-8af4e6624178?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1200"
              alt="Skier launching through powder in the mountains"
            />
            <div className="photo-label bg-white">SKIING</div>
            <div className="absolute right-4 top-4 rotate-6 border-2 border-black bg-[#b8ff69] p-2 font-mono text-[10px] font-bold">
              POWDER<br />HUNTER
            </div>
          </article>
        </div>
      </section>

      <section id="contact" className="border-t-4 border-black bg-[#ff4fa3] px-4 py-24 md:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="mb-5 text-center font-mono text-xs font-black uppercase">// Connection request pending</p>
          <h2 className="mb-12 text-center font-display text-5xl font-black leading-[0.8] tracking-[-0.07em] sm:text-7xl md:text-9xl">
            SAY HELLO.
          </h2>
          <div className="os-window">
            <div className="os-bar">
              <span className="font-mono text-xs font-black">NEW_MESSAGE.EXE</span>
              <div className="flex gap-2">
                <button aria-label="Minimize">_</button>
                <button aria-label="Maximize">□</button>
                <button aria-label="Close" className="bg-[#ffea00]">×</button>
              </div>
            </div>
            <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
              <div className="border-b-4 border-black bg-[#111] p-7 text-white lg:border-b-0 lg:border-r-4">
                <p className="font-display text-3xl font-black leading-none">LET'S BUILD<br />SOMETHING<br /><span className="text-[#b8ff69]">SOLID.</span></p>
                <p className="mt-6 max-w-xs font-mono text-xs leading-relaxed text-white/70">
                  Have a hard systems problem, an interesting role, or a very specific coffee recommendation?
                </p>
                <div className="mt-12 space-y-3 font-mono text-xs font-bold">
                  <a href="mailto:hello@vigneshannamalai.dev" className="social-link">EMAIL ↗</a>
                  <a href="https://github.com" className="social-link">GITHUB ↗</a>
                  <a href="https://linkedin.com" className="social-link">LINKEDIN ↗</a>
                </div>
              </div>
              <form className="space-y-5 bg-[#f8f5ec] p-7" onSubmit={submitForm}>
                <label className="field">
                  <span>01 / YOUR NAME</span>
                  <input required placeholder="TYPE HERE..." />
                </label>
                <label className="field">
                  <span>02 / EMAIL ADDRESS</span>
                  <input required type="email" placeholder="YOU@INTERNET.COM" />
                </label>
                <label className="field">
                  <span>03 / TRANSMISSION</span>
                  <textarea required rows={4} placeholder="WHAT'S ON YOUR MIND?" />
                </label>
                <button className="brutal-button flex w-full items-center justify-between bg-[#ffea00] px-5 py-4 font-mono text-xs font-black uppercase" type="submit">
                  {sent ? "Message queued!" : "Send transmission"} <Arrow />
                </button>
              </form>
            </div>
          </div>
          <footer className="mt-10 flex flex-col justify-between gap-4 border-t-2 border-black pt-5 font-mono text-[10px] font-bold uppercase sm:flex-row">
            <span>© 2025 Vignesh Annamalai</span>
            <span>Designed with intent / Built with caffeine</span>
            <a href="#top">Back to top ↑</a>
          </footer>
        </div>
      </section>
    </main>
  );
}
