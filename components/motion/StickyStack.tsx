"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

export type StickyStackItem = {
  title: string;
  body: string;
};

/**
 * Column of value-prop cards that stick to the same viewport slot and
 * appear to stack as you scroll. Sticking is native CSS `position: sticky`
 * (robust, no JS pin math); only the scale-down/dim effect on a card as the
 * next one arrives is GSAP ScrollTrigger-scrubbed, and that part is skipped
 * entirely under reduced motion.
 */
export function StickyStack({ items, className }: { items: StickyStackItem[]; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".sticky-stack-card", container);
      cards.forEach((card, index) => {
        const next = cards[index + 1];
        if (!next) return;
        gsap.to(card, {
          scale: 0.94,
          opacity: 0.45,
          ease: "none",
          scrollTrigger: {
            trigger: next,
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      });
    }, container);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {items.map((item, index) => (
        <div
          key={item.title}
          className="sticky-stack-card sticky top-24 mb-6 min-h-[60vh] origin-top rounded-3xl border border-smoke/40 bg-ink p-10"
          style={{ zIndex: index + 1 }}
        >
          <h3 className="font-display text-display-3">{item.title}</h3>
          <p className="mt-4 max-w-[52ch] font-body text-body text-smoke">{item.body}</p>
        </div>
      ))}
    </div>
  );
}
