"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DURATION, EASE_KINFOLK } from "@/lib/easing";

/**
 * Simple entrance fade/rise on every route change. Lives in app/template.tsx
 * (not layout.tsx) so it remounts on navigation — App Router doesn't expose
 * exit animations without intercepting the router, so this deliberately
 * only animates in, never out. Instant under reduced motion.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className="flex flex-1 flex-col"
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DURATION.reveal, ease: EASE_KINFOLK }}
    >
      {children}
    </motion.div>
  );
}
