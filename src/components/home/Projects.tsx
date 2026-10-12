import ProjectCard from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";

export default function Projects() {
  return (
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
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
