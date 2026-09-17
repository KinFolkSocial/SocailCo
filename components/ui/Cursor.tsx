"use client";

import { useRef, useState, type ReactNode, type PointerEvent } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

/**
 * Custom cursor ring that follows the pointer inside its bounding container.
 * Scoped to a container (rather than the whole viewport) so it can be reused
 * either as a contained hover effect or wired to the document later.
 * Disabled entirely on coarse/touch pointers and under reduced motion.
 */
export function Cursor({ children, className }: { children: ReactNode; className?: string }) {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const bounds = containerRef.current?.getBoundingClientRect();
    if (!bounds) return;
    x.set(event.clientX - bounds.left);
    y.set(event.clientY - bounds.top);
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative cursor-none", className)}
      onPointerMove={handlePointerMove}
      onPointerEnter={(event) => event.pointerType === "mouse" && setActive(true)}
      onPointerLeave={() => setActive(false)}
    >
      {children}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 z-10 size-10 rounded-full border border-amber"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: active ? 1 : 0,
        }}
      />
    </div>
  );
}
