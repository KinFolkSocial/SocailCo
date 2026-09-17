import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getJournalPostMeta, journalLoaders, journalPosts } from "@/content/journal";
import { JournalPostView } from "@/components/journal/JournalPostView";

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
  };
}

export default async function JournalPostPage({ params }: PageProps<"/journal/[slug]">) {
  const { slug } = await params;
  const post = getJournalPostMeta(slug);
  const loader = journalLoaders[slug];
  if (!post || !loader) notFound();

  const { default: PostContent } = await loader();

  return (
    <JournalPostView post={post}>
      <PostContent />
    </JournalPostView>
  );
}
