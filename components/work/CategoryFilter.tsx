"use client";

import { categoryLabels, type ProjectCategoryValue } from "@/content/projects";
import { cn } from "@/lib/cn";

const categories: (ProjectCategoryValue | "all")[] = ["all", "wedding", "corporate", "milestone", "social", "brand"];

export function CategoryFilter({
  active,
  onChange,
}: {
  active: ProjectCategoryValue | "all";
  onChange: (category: ProjectCategoryValue | "all") => void;
}) {
  return (
    <div role="group" aria-label="Filter by event type" className="flex flex-wrap gap-3">
      {categories.map((category) => {
        const label = category === "all" ? "All" : categoryLabels[category];
        const isActive = category === active;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            aria-pressed={isActive}
            className={cn(
              "rounded-full border px-4 py-2 font-body text-sm uppercase tracking-[0.1em] transition-colors",
              isActive
                ? "border-amber bg-amber text-ink"
                : "border-smoke/40 text-bone hover:border-amber hover:text-amber",
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
