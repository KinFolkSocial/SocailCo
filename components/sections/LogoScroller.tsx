"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

/**
 * Venue, brand, and publication partner names.
 */
const placeholderLogos = [
  "The Grand Hall",
  "Southern Table Co.",
  "Atlanta Bride",
  "Hospitality Group",
  "The Press Room",
  "Magnolia Venues",
];

export function LogoScroller() {
  const reducedMotion = useReducedMotion();

  const track = (
    <div className="flex shrink-0 items-center gap-16 pr-16">
      {placeholderLogos.map((name, i) => (
        <span
          key={i}
          className="whitespace-nowrap font-body text-sm uppercase tracking-[0.2em] text-smoke"
        >
          {name}
        </span>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden border-y border-smoke/30 py-8">
      <p className="sr-only">Trusted by</p>
      <div
        aria-hidden="true"
        className={cn("flex w-max", !reducedMotion && "animate-marquee")}
        style={!reducedMotion ? { animationDuration: "28s" } : undefined}
      >
        {track}
        {!reducedMotion && track}
      </div>
    </div>
  );
}
