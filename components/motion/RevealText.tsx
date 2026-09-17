"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DURATION, EASE_KINFOLK, STAGGER_CHILD } from "@/lib/easing";

const lineVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: (index: number) => ({
    y: "0%",
    opacity: 1,
    transition: { duration: DURATION.reveal, ease: EASE_KINFOLK, delay: index * STAGGER_CHILD },
  }),
};

/**
 * Masked line-by-line text rise, staggered 60–80ms per line (brief §3).
 * Pass one string per visual line — each gets its own overflow-hidden mask
 * so it rises from below rather than fading in place.
 *
 * The `whileInView` trigger lives on the *outer* (untransformed) mask, not
 * the inner line that actually moves: a translateY(100%) child is, by
 * design, clipped to zero visible area by its own overflow-hidden parent,
 * which makes IntersectionObserver report it as never-in-view if it's the
 * observed target itself. Observing the stationary wrapper and propagating
 * the resulting variant to the child avoids that self-defeating clip.
 */
export function RevealText({
  lines,
  as: Tag = "p",
  className,
}: {
  lines: string[];
  as?: "p" | "h1" | "h2" | "h3";
  className?: string;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <Tag className={className}>
      {lines.map((line, index) => (
        <motion.span
          key={index}
          className="block overflow-hidden"
          initial={reducedMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={{ hidden: {}, visible: {} }}
        >
          <motion.span className="block" custom={index} variants={lineVariants}>
            {line}
          </motion.span>
        </motion.span>
      ))}
    </Tag>
  );
}
