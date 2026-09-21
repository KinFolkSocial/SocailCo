import { z } from "zod";
import type { ComponentType } from "react";

export const JournalCategory = z.enum(["process", "vendors", "culture"]);
export type JournalCategoryValue = z.infer<typeof JournalCategory>;

export const journalCategoryLabels: Record<JournalCategoryValue, string> = {
  process: "Process",
  vendors: "Vendors",
  culture: "Culture",
};

export const JournalPostSchema = z.object({
  slug: z.string(),
  title: z.string(),
  excerpt: z.string(),
  date: z.string(),
  category: JournalCategory,
  cover: z.string(),
  coverAlt: z.string(),
});

export type JournalPost = z.infer<typeof JournalPostSchema>;

/**
 * Metadata lives here (typed + Zod-validated, matching every other /content
 * file) rather than as an export inside each .mdx file, so it stays fully
 * typed without hand-written ambient module declarations per post. The .mdx
 * files hold body content only, loaded on demand via `journalLoaders`.
 */
export const journalPosts: JournalPost[] = [
  {
    slug: "how-we-plan-a-three-city-wedding",
    title: "How We Plan a Three-City Wedding",
    excerpt: "Notes on logistics, vendor trust, and knowing when to simplify.",
    date: "2025-08-12",
    category: "process",
    cover: "/images/journal/journal-1.jpg",
    coverAlt: "Intimate candlelit luxury African American dinner party celebration in Atlanta",
  },
  {
    slug: "sourcing-vendors-who-get-it",
    title: "Sourcing Vendors Who Get It",
    excerpt: "What we look for before we ever book a venue.",
    date: "2025-06-03",
    category: "vendors",
    cover: "/images/journal/journal-2.jpg",
    coverAlt: "African American luxury event florist styling floral arch centerpiece",
  },
  {
    slug: "the-case-for-a-real-rehearsal",
    title: "The Case for a Real Rehearsal",
    excerpt: "Why we never skip it, even for a guest list of twenty.",
    date: "2025-04-21",
    category: "process",
    cover: "/images/journal/journal-3.jpg",
    coverAlt: "Chic African American couple raising champagne glasses in an evening outdoor toast",
  },
];

z.array(JournalPostSchema).parse(journalPosts);

export function getJournalPostMeta(slug: string): JournalPost | undefined {
  return journalPosts.find((post) => post.slug === slug);
}

/** One loader per slug — keeps the dynamic import path a static string per entry, which bundlers need to analyze correctly. */
export const journalLoaders: Record<string, () => Promise<{ default: ComponentType }>> = {
  "how-we-plan-a-three-city-wedding": () => import("@/content/journal/how-we-plan-a-three-city-wedding.mdx"),
  "sourcing-vendors-who-get-it": () => import("@/content/journal/sourcing-vendors-who-get-it.mdx"),
  "the-case-for-a-real-rehearsal": () => import("@/content/journal/the-case-for-a-real-rehearsal.mdx"),
};
