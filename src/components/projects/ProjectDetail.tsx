import Link from "next/link";
import { Fragment } from "react";
import Arrow from "@/components/icons/Arrow";
import ArchitectureDiagram from "@/components/projects/ArchitectureDiagram";
import type { Project } from "@/data/projects";
import { accentBg } from "@/lib/theme";

function Headline({ lines }: { lines: string[] }) {
  return (
    <h2>
      {lines.map((line, index) => (
        <Fragment key={line}>
          {index > 0 && <br />}
          {line}
        </Fragment>
      ))}
    </h2>
  );
}

export default function ProjectDetail({ project }: { project: Project }) {
  return (
    <main className="project-detail min-h-screen">
      <div className="border-b-4 border-black bg-paper px-4 py-5 md:px-8 lg:px-14">
        <Link
          href="/"
          className="brutal-button inline-flex items-center gap-3 bg-yellow px-5 py-3 font-mono text-xs font-black uppercase"
        >
          <span className="rotate-180"><Arrow /></span> Back to home
        </Link>
      </div>

      <header className="relative px-4 pb-14 pt-16 md:px-8 lg:px-14 lg:pt-24">
        <div className="mb-7 flex flex-wrap items-center gap-3 font-mono text-[10px] font-black uppercase">
          <span className="border-2 border-black bg-black px-3 py-1.5 text-white">CASE STUDY</span>
          <span>PROJECT_{project.number}</span>
          <span>/</span>
          <span>{project.year}</span>
        </div>
        <h1 className="detail-title">{project.title}</h1>
        <div className="mt-8 flex flex-col justify-between gap-5 border-t-3 border-black pt-5 md:flex-row md:items-end">
          <p className="max-w-2xl font-display text-xl font-bold leading-tight md:text-3xl">{project.description}</p>
          <p className="font-mono text-[10px] font-bold uppercase leading-relaxed md:text-right">
            Role / {project.role}<br />
            Scope / {project.scope}
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
            <Headline lines={project.problemHeadline} />
            {project.problem.map((paragraph, index) => (
              <p key={paragraph} className={index === 0 ? "lead-paragraph" : ""}>{paragraph}</p>
            ))}
          </div>
          <div className="case-section">
            <span className="case-index">02 / THE SOLUTION</span>
            <Headline lines={project.solutionHeadline} />
            {project.solution.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <div className="result-strip">
            {project.results.map((result) => (
              <div key={result.label}>
                <strong>{result.value}</strong>
                <span>{result.label}</span>
              </div>
            ))}
          </div>
        </article>

        <aside className="case-sidebar">
          <div className="sticky-card">
            <div className={`${accentBg[project.color]} border-b-3 border-black p-4 font-mono text-xs font-black uppercase`}>
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
                <div><dt>STATUS</dt><dd>{project.status}</dd></div>
                <div><dt>TYPE</dt><dd>{project.type}</dd></div>
                <div><dt>YEAR</dt><dd>{project.year}</dd></div>
              </dl>
              {project.repositories && project.repositories.length > 0 && (
                <div className="mt-7 space-y-3">
                  {project.repositories.map((repo) => (
                    <a
                      key={repo.url}
                      href={repo.url}
                      target="_blank"
                      rel="noreferrer"
                      className="brutal-button flex w-full items-center justify-between bg-black px-5 py-4 font-mono text-xs font-black uppercase text-white"
                    >
                      {repo.label} <Arrow diagonal />
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </aside>
      </section>

      <footer className="mt-10 flex flex-col items-center justify-between gap-5 border-t-4 border-black bg-yellow px-4 py-8 md:flex-row md:px-8 lg:px-14">
        <span className="font-mono text-xs font-black uppercase">End of file_{project.number}</span>
        <Link
          href="/#projects"
          className="flex items-center gap-3 font-mono text-xs font-black uppercase underline decoration-2 underline-offset-4"
        >
          Return to all projects <span className="rotate-180"><Arrow /></span>
        </Link>
      </footer>
    </main>
  );
}
