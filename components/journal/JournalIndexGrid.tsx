"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { journalPosts, type JournalCategoryValue } from "@/content/journal";
import { JournalCategoryFilter } from "@/components/journal/JournalCategoryFilter";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DURATION, EASE_KINFOLK } from "@/lib/easing";

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

export function JournalIndexGrid() {
  const [active, setActive] = useState<JournalCategoryValue | "all">("all");
  const reducedMotion = useReducedMotion();
  const filtered = active === "all" ? journalPosts : journalPosts.filter((post) => post.category === active);

  return (
    <div>
      <JournalCategoryFilter active={active} onChange={setActive} />

      {filtered.length === 0 ? (
        <p className="mt-16 font-body text-body text-smoke">No posts in this category yet.</p>
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3">
          <AnimatePresence>
            {filtered.map((post) => (
              <motion.div
                key={post.slug}
                layout={!reducedMotion}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: DURATION.reveal, ease: EASE_KINFOLK }}
              >
                <Link href={`/journal/${post.slug}`} className="group flex flex-col gap-4">
                  <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl">
                    <Image
                      src={post.cover}
                      alt={post.coverAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-[var(--duration-reveal)] ease-[var(--ease-kinfolk)] group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <p className="font-body text-xs uppercase tracking-[0.15em] text-smoke">
                      {formatDate(post.date)}
                    </p>
                    <h2 className="mt-2 font-display text-display-3">{post.title}</h2>
                    <p className="mt-2 font-body text-body text-smoke">{post.excerpt}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
