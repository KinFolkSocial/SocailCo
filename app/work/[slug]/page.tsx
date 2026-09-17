import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAdjacentProjects, getProjectBySlug, projects } from "@/content/projects";
import { CaseStudy } from "@/components/work/CaseStudy";
import { PrevNextLinks } from "@/components/work/PrevNextLinks";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.eventType} — ${project.resultLine}`,
    description: project.narrative[0],
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);

  return (
    <>
      <CaseStudy project={project} />
      <PrevNextLinks prev={prev} next={next} />
    </>
  );
}
