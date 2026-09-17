"use client";

import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

/**
 * Full-bleed band of oversized scrolling text, duplicated across two tracks
 * for a seamless loop. Marquees are the one exception to "nothing linear"
 * (brief §3) — but they still stop completely under reduced motion.
 */
export function Marquee({
  text,
  tone = "amber",
  speedSeconds = 20,
  className,
}: {
  text: string;
  tone?: "amber" | "clay" | "ink";
  speedSeconds?: number;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();

  const backgrounds = {
    amber: "bg-amber text-ink",
    clay: "bg-clay text-bone",
    ink: "bg-ink text-bone",
  };

  const track = (
    <div className="flex shrink-0 items-center">
      {Array.from({ length: 6 }).map((_, i) => (
        <span key={i} className="mx-6 whitespace-nowrap font-display text-display-2 uppercase">
          {text}
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn("overflow-hidden py-6", backgrounds[tone], className)}>
      <div
        className={cn("flex w-max", !reducedMotion && "animate-marquee")}
        style={!reducedMotion ? { animationDuration: `${speedSeconds}s` } : undefined}
      >
        {track}
        {!reducedMotion && track}
      </div>
    </div>
  );
}
