import Image from "next/image";
import Link from "next/link";
import { InlineImageHeading } from "@/components/sections/InlineImageHeading";
import { RevealImage } from "@/components/motion/RevealImage";

/**
 * Placeholder posts — no real journal content exists yet (MDX infra lands
 * in a later phase). See TODO.md.
 */
const posts = [
  {
    slug: "how-we-plan-a-three-city-wedding",
    title: "How We Plan a Three-City Wedding",
    excerpt: "Notes on logistics, vendor trust, and knowing when to simplify.",
    date: "2025-08-12",
    cover: "/placeholders/journal-1.svg",
  },
  {
    slug: "sourcing-vendors-who-get-it",
    title: "Sourcing Vendors Who Get It",
    excerpt: "What we look for before we ever book a venue.",
    date: "2025-06-03",
    cover: "/placeholders/journal-2.svg",
  },
  {
    slug: "the-case-for-a-real-rehearsal",
    title: "The Case for a Real Rehearsal",
    excerpt: "Why we never skip it, even for a guest list of twenty.",
    date: "2025-04-21",
    cover: "/placeholders/journal-3.svg",
  },
];

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export function JournalTeaser() {
  return (
    <section className="bg-bone px-6 py-24 text-ink sm:px-10 lg:px-16 lg:py-32">
      <InlineImageHeading
        as="h2"
        className="font-display text-display-2 uppercase"
        parts={[
          { type: "text", value: "Notes from" },
          { type: "image", src: "/placeholders/hero-1.svg", alt: "A planning desk mid-session" },
          { type: "text", value: "the field" },
        ]}
      />

      <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.slug} href={`/journal/${post.slug}`} className="group flex flex-col gap-4">
            <RevealImage className="aspect-[4/3] w-full rounded-2xl">
              <Image
                src={post.cover}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-[var(--duration-reveal)] ease-[var(--ease-kinfolk)] group-hover:scale-105"
              />
            </RevealImage>
            <div>
              <p className="font-body text-xs uppercase tracking-[0.15em] text-smoke">{formatDate(post.date)}</p>
              <h3 className="mt-2 font-display text-display-3">{post.title}</h3>
              <p className="mt-2 font-body text-body text-smoke">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
