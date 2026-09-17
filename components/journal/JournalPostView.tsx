"use client";

import { useRef, type ReactNode } from "react";
import Image from "next/image";
import type { JournalPost } from "@/content/journal";
import { journalCategoryLabels } from "@/content/journal";
import { ReadingProgressBar } from "@/components/journal/ReadingProgressBar";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export function JournalPostView({ post, children }: { post: JournalPost; children: ReactNode }) {
  const articleRef = useRef<HTMLElement>(null);

  return (
    <>
      <ReadingProgressBar targetRef={articleRef} />

      <div className="relative h-[50vh] min-h-[320px] w-full overflow-hidden">
        <Image src={post.cover} alt={post.coverAlt} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/10" />
      </div>

      <article ref={articleRef} className="px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
        <div className="mx-auto max-w-[62ch]">
          <p className="font-body text-label uppercase text-amber">
            {journalCategoryLabels[post.category]} — {formatDate(post.date)}
          </p>
          <h1 className="mt-4 font-display text-display-2 uppercase leading-[0.95]">{post.title}</h1>

          <div className="mt-12">{children}</div>
        </div>
      </article>
    </>
  );
}
