"use client";

import { useState, type KeyboardEvent } from "react";
import { motion, type PanInfo } from "motion/react";
import { testimonials } from "@/content/testimonials";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DURATION, EASE_KINFOLK } from "@/lib/easing";
import { cn } from "@/lib/cn";

/**
 * Draggable, but never drag-only: prev/next buttons and arrow keys drive
 * the same index-based snap (brief §7 accessibility requirement).
 */
export function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const count = testimonials.length;

  const go = (next: number) => setIndex(((next % count) + count) % count);

  const handleDragEnd = (_event: unknown, info: PanInfo) => {
    const threshold = 80;
    if (info.offset.x < -threshold) go(index + 1);
    else if (info.offset.x > threshold) go(index - 1);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(index + 1);
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(index - 1);
    }
  };

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="px-6 py-24 focus-visible:outline-none sm:px-10 lg:px-16 lg:py-32"
    >
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          drag={reducedMotion ? false : "x"}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          onDragEnd={handleDragEnd}
          animate={{ x: `-${index * 100}%` }}
          transition={{ duration: DURATION.reveal, ease: EASE_KINFOLK }}
        >
          {testimonials.map((testimonial, i) => (
            <div key={i} className="w-full shrink-0 px-1">
              <blockquote className="max-w-3xl">
                <p className="font-display text-display-3 leading-[1.05]">&ldquo;{testimonial.quote}&rdquo;</p>
                <footer className="mt-6 font-body text-sm uppercase tracking-[0.15em] text-smoke">
                  {testimonial.attribution}
                </footer>
              </blockquote>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="mt-10 flex items-center gap-4">
        <button
          type="button"
          onClick={() => go(index - 1)}
          aria-label="Previous testimonial"
          className="border border-smoke/40 px-4 py-2 font-body text-sm uppercase transition-colors hover:border-amber hover:text-amber"
        >
          Prev
        </button>
        <button
          type="button"
          onClick={() => go(index + 1)}
          aria-label="Next testimonial"
          className="border border-smoke/40 px-4 py-2 font-body text-sm uppercase transition-colors hover:border-amber hover:text-amber"
        >
          Next
        </button>
        <div className="flex items-center gap-2" aria-hidden="true">
          {testimonials.map((_, i) => (
            <span
              key={i}
              className={cn("h-1.5 w-1.5 rounded-full", i === index ? "bg-amber" : "bg-smoke/40")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
