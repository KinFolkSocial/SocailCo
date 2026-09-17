import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Nav-style link where the label slides up on hover and an identical label
 * slides in from beneath it. Pure CSS (group-hover + transform), no JS —
 * cheap enough to use for every nav item and mega menu entry.
 */
export function HoverSwapLink({
  href,
  children,
  className,
  target,
  rel,
}: {
  href: string;
  children: string;
  className?: string;
  target?: string;
  rel?: string;
}) {
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={cn(
        "group relative inline-block overflow-hidden py-1 leading-none",
        className,
      )}
    >
      <span className="block transition-transform duration-[var(--duration-micro)] ease-[var(--ease-kinfolk)] group-hover:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 block translate-y-full text-amber transition-transform duration-[var(--duration-micro)] ease-[var(--ease-kinfolk)] group-hover:translate-y-0"
      >
        {children}
      </span>
    </Link>
  );
}
