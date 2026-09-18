import { ImageResponse } from "next/og";
import { brand } from "@/content/brand";
import { categoryLabels, getProjectBySlug, projects } from "@/content/projects";

export const alt = "Case study cover";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function CaseStudyOpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 80,
          backgroundColor: "#0E0B0A",
          color: "#F6F1E8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 6, color: "#E2A03F", textTransform: "uppercase" }}>
          {project ? categoryLabels[project.category] : brand.name}
        </div>
        <div style={{ display: "flex", fontSize: 84, fontWeight: 800, marginTop: 20, lineHeight: 1, textTransform: "uppercase" }}>
          {project?.eventType ?? brand.name}
        </div>
        <div style={{ display: "flex", fontSize: 30, marginTop: 24, color: "#a89f97" }}>
          {project?.resultLine ?? brand.tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
