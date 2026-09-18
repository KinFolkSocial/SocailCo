import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJournalPostMeta, journalLoaders, journalPosts } from "@/content/journal";
import { JournalPostView } from "@/components/journal/JournalPostView";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";
import { brand } from "@/content/brand";

export function generateStaticParams() {
  return journalPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/journal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPostMeta(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/journal/${slug}` },
    openGraph: { title: post.title, description: post.excerpt, url: `/journal/${slug}`, type: "article" },
    twitter: { title: post.title, description: post.excerpt },
  };
}

export default async function JournalPostPage({ params }: PageProps<"/journal/[slug]">) {
  const { slug } = await params;
  const post = getJournalPostMeta(slug);
  const loader = journalLoaders[slug];
  if (!post || !loader) notFound();

  const { default: PostContent } = await loader();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: absoluteUrl(post.cover),
    datePublished: post.date,
    author: { "@type": "Organization", name: brand.name },
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Journal", path: "/journal" },
          { name: post.title, path: `/journal/${slug}` },
        ])}
      />
      <JournalPostView post={post}>
        <PostContent />
      </JournalPostView>
    </>
  );
}
