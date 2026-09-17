"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

/**
 * Moves its content vertically at a different rate than the page scroll,
 * scrubbed to scroll position via GSAP ScrollTrigger. `depth` is roughly
 * the fraction of the container's height the content drifts. Disabled
 * entirely under reduced motion (no transform ever applied).
 */
export function Parallax({
  children,
  depth = 0.15,
  className,
}: {
  children: ReactNode;
  depth?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const container = containerRef.current;
    const target = targetRef.current;
    if (!container || !target) return;

    const ctx = gsap.context(() => {
      gsap.to(target, {
        yPercent: depth * 100,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, [reducedMotion, depth]);

  return (
    <div ref={containerRef} className={cn("overflow-hidden", className)}>
      <div ref={targetRef}>{children}</div>
    </div>
  );
}
