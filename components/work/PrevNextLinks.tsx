import Link from "next/link";
import type { Project } from "@/content/projects";

export function PrevNextLinks({ prev, next }: { prev: Project | null; next: Project | null }) {
  if (!prev && !next) return null;

  return (
    <nav
      aria-label="More case studies"
      className="grid grid-cols-1 gap-px border-t border-smoke/30 bg-smoke/30 sm:grid-cols-2"
    >
      {prev && (
        <Link href={`/work/${prev.slug}`} className="group flex flex-col gap-2 bg-ink px-6 py-12 sm:px-10">
          <span className="font-body text-xs uppercase tracking-[0.2em] text-smoke">Previous</span>
          <span className="font-display text-display-3 uppercase transition-colors group-hover:text-amber">
            {prev.eventType}
          </span>
        </Link>
      )}
      {next && (
        <Link
          href={`/work/${next.slug}`}
          className="group flex flex-col items-start gap-2 bg-ink px-6 py-12 text-left sm:items-end sm:px-10 sm:text-right"
        >
          <span className="font-body text-xs uppercase tracking-[0.2em] text-smoke">Next</span>
          <span className="font-display text-display-3 uppercase transition-colors group-hover:text-amber">
            {next.eventType}
          </span>
        </Link>
      )}
    </nav>
  );
}
