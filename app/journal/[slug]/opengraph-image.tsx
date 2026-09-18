import { ImageResponse } from "next/og";
import { brand } from "@/content/brand";
import { getJournalPostMeta, journalCategoryLabels, journalPosts } from "@/content/journal";

export const alt = "Journal post cover";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return journalPosts.map((post) => ({ slug: post.slug }));
}

export default async function JournalOpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getJournalPostMeta(slug);

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
          {post ? journalCategoryLabels[post.category] : brand.name}
        </div>
        <div style={{ display: "flex", fontSize: 72, fontWeight: 800, marginTop: 20, lineHeight: 1.05 }}>
          {post?.title ?? brand.name}
        </div>
        <div style={{ display: "flex", fontSize: 28, marginTop: 24, color: "#a89f97" }}>
          {post?.excerpt ?? brand.tagline}
        </div>
      </div>
    ),
    { ...size },
  );
}
