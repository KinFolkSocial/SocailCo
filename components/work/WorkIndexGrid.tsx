"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { projects, type Project, type ProjectCategoryValue } from "@/content/projects";
import { WorkCard } from "@/components/sections/WorkCard";
import { CategoryFilter } from "@/components/work/CategoryFilter";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DURATION, EASE_KINFOLK } from "@/lib/easing";

/**
 * Full, self-contained class strings per aspect (never split into a "base"
 * + per-aspect "override" merged via cn()) — two unprefixed-equivalent
 * utilities for the same property/breakpoint have equal CSS specificity, so
 * whichever cn() puts second doesn't reliably win the cascade. See the
 * Header "hidden sm:inline-flex" bug from Phase 3 for the same footgun.
 */
const aspectClasses: Record<Project["aspect"], string> = {
  portrait: "col-span-2 row-span-2 sm:col-span-1 sm:row-span-2",
  landscape: "col-span-2 sm:col-span-2",
  square: "col-span-2 sm:col-span-1",
};

/** Masonry-ish grid, filterable by category. Filtering animates via Motion's `layout`. */
export function WorkIndexGrid() {
  const [active, setActive] = useState<ProjectCategoryValue | "all">("all");
  const reducedMotion = useReducedMotion();
  const filtered = active === "all" ? projects : projects.filter((project) => project.category === active);

  return (
    <div>
      <CategoryFilter active={active} onChange={setActive} />

      {filtered.length === 0 ? (
        <p className="mt-16 font-body text-body text-smoke">No projects in this category yet.</p>
      ) : (
        <div className="mt-12 grid grid-cols-2 gap-4 auto-rows-[240px] sm:grid-cols-3 sm:auto-rows-[220px]">
          <AnimatePresence>
            {filtered.map((project) => (
              <motion.div
                key={project.slug}
                layout={!reducedMotion}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: DURATION.reveal, ease: EASE_KINFOLK }}
                className={aspectClasses[project.aspect]}
              >
                <WorkCard project={project} fill className="h-full" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
