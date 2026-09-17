"use client";

import { journalCategoryLabels, type JournalCategoryValue } from "@/content/journal";
import { cn } from "@/lib/cn";

const categories: (JournalCategoryValue | "all")[] = ["all", "process", "vendors", "culture"];

export function JournalCategoryFilter({
  active,
  onChange,
}: {
  active: JournalCategoryValue | "all";
  onChange: (category: JournalCategoryValue | "all") => void;
}) {
  return (
    <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-3">
      {categories.map((category) => {
        const label = category === "all" ? "All" : journalCategoryLabels[category];
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
