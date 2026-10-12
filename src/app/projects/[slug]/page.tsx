import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetail from "@/components/projects/ProjectDetail";
import { getProject, projects } from "@/data/projects";
import { site } from "@/lib/site";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

// Only the slugs returned below exist; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  // openGraph/twitter objects are shallow-merged with the root layout — each one replaces the parent's
  // object entirely, so every field we want must be repeated here.
  const title = `${project.title} — ${site.name}`;
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      siteName: site.name,
      title,
      description: project.description,
      url: `/projects/${project.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.description,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return <ProjectDetail project={project} />;
}
