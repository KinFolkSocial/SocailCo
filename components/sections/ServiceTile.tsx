import Link from "next/link";
import type { Service } from "@/content/services";

export function ServiceTile({ service }: { service: Service }) {
  return (
    <Link
      href={`/services#${service.slug}`}
      className="group flex flex-col gap-6 border-t border-smoke/30 py-10 transition-colors last:border-b hover:border-amber sm:flex-row sm:items-start sm:justify-between sm:gap-10"
    >
      <div className="flex items-start justify-between gap-6 sm:w-2/5">
        <h3 className="font-display text-display-3 uppercase">{service.title}</h3>
        <span
          aria-hidden="true"
          className="font-display text-display-3 text-smoke transition-transform duration-[var(--duration-micro)] ease-[var(--ease-kinfolk)] group-hover:translate-x-2 group-hover:text-amber"
        >
          →
        </span>
      </div>
      <div className="sm:w-1/2">
        <p className="max-w-[52ch] font-body text-body">{service.summary}</p>
        <p className="mt-3 font-body text-xs uppercase tracking-[0.2em] text-smoke">{service.timeline}</p>
      </div>
    </Link>
  );
}
