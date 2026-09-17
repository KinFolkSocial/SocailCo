import Image from "next/image";
import Link from "next/link";
import { Chip } from "@/components/ui/Chip";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/cn";

/**
 * Cover image scales and the full metadata (year/type/result) slides in on
 * hover — but a baseline caption stays visible by default so keyboard and
 * touch users (who never trigger :hover) aren't the only ones missing it.
 * group-focus-visible: mirrors the hover reveal for keyboard navigation.
 */
export function WorkCard({
  project,
  className,
  fill = false,
}: {
  project: Project;
  className?: string;
  /** Fill the parent's height instead of forcing a 4:5 aspect ratio — for grids that set height via row-span (e.g. the /work masonry index). */
  fill?: boolean;
}) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className={cn(
        "group relative block overflow-hidden rounded-3xl border border-smoke/20",
        className,
      )}
    >
      <div className={cn("relative w-full overflow-hidden", fill ? "h-full" : "aspect-[4/5]")}>
        <Image
          src={project.cover}
          alt={project.coverAlt}
          fill
          sizes="(max-width: 768px) 100vw, 480px"
          className="object-cover transition-transform duration-[var(--duration-reveal)] ease-[var(--ease-kinfolk)] group-hover:scale-110 group-focus-visible:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 p-6 transition-opacity duration-[var(--duration-micro)] group-hover:opacity-0 group-focus-visible:opacity-0">
          <p className="font-display text-display-3 uppercase text-bone">{project.eventType}</p>
          <p className="mt-1 font-body text-sm text-smoke">{project.year}</p>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex translate-y-4 flex-wrap gap-2 p-6 opacity-0 transition-all duration-[var(--duration-reveal)] ease-[var(--ease-kinfolk)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
          <Chip tone="amber">{String(project.year)}</Chip>
          <Chip>{project.eventType}</Chip>
          <Chip tone="clay">{project.resultLine}</Chip>
        </div>
      </div>
    </Link>
  );
}
