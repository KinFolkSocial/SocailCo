"use client";

import type { RefObject } from "react";
import { motion, useScroll, useSpring } from "motion/react";

/**
 * Fixed bar under the header, filled 0→100% by scroll through `targetRef`.
 * Not gated behind prefers-reduced-motion: it's a 1:1 scroll-linked value
 * with no independent animation of its own (like a native scrollbar), not
 * a decorative effect — informational feedback, not motion for its own sake.
 */
export function ReadingProgressBar({ targetRef }: { targetRef: RefObject<HTMLElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, mass: 0.2 });

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-0 z-30 h-0.5 bg-smoke/20">
      <motion.div className="h-full origin-left bg-amber" style={{ scaleX }} />
    </div>
  );
}
