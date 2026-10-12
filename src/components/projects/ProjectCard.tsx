import Link from "next/link";
import Arrow from "@/components/icons/Arrow";
import ProjectArt from "@/components/projects/ProjectArt";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card group">
      <div className="project-art">
        <ProjectArt type={project.art} />
      </div>
      <div className={`${project.color} border-t-4 border-black p-5 text-black`}>
        <div className="mb-5 flex justify-between font-mono text-[10px] font-black">
          <span>FILE_{project.number}</span>
          <span>{project.tag}</span>
        </div>
        <h3 className="font-display text-3xl font-black tracking-[-0.04em] md:text-4xl">{project.title}</h3>
        <p className="mt-3 min-h-14 font-medium leading-snug">{project.description}</p>
        <Link
          href={`/projects/${project.slug}`}
          className="mt-6 flex w-full items-center justify-between border-t-2 border-black pt-4 font-mono text-xs font-black uppercase"
        >
          Inspect case study{" "}
          <span className="arrow-box">
            <Arrow diagonal />
          </span>
        </Link>
      </div>
    </article>
  );
}
