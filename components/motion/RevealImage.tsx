"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DURATION, EASE_KINFOLK } from "@/lib/easing";
import { cn } from "@/lib/cn";

/**
 * Overflow-hidden mask that scales its content from 1.08 → 1 as it enters
 * the viewport (brief §3). Wrap a next/image (with `fill`) as children.
 */
export function RevealImage({ children, className }: { children: ReactNode; className?: string }) {
  const reducedMotion = useReducedMotion();

  return (
    <div className={cn("overflow-hidden", className)}>
      <motion.div
        className="size-full"
        initial={reducedMotion ? false : { scale: 1.08, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: DURATION.reveal, ease: EASE_KINFOLK }}
      >
        {children}
      </motion.div>
    </div>
  );
}
