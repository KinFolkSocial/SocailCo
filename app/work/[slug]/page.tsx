import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAdjacentProjects, getProjectBySlug, projects } from "@/content/projects";
import { CaseStudy } from "@/components/work/CaseStudy";
import { PrevNextLinks } from "@/components/work/PrevNextLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, caseStudyJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  const title = `${project.eventType} — ${project.resultLine}`;
  const description = project.narrative[0];

  return {
    title,
    description,
    alternates: { canonical: `/work/${slug}` },
    openGraph: { title, description, url: `/work/${slug}` },
    twitter: { title, description },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacentProjects(slug);

  return (
    <>
      <JsonLd data={caseStudyJsonLd(project)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: project.eventType, path: `/work/${slug}` },
        ])}
      />
      <CaseStudy project={project} />
      <PrevNextLinks prev={prev} next={next} />
    </>
  );
}
