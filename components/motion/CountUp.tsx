"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, animate } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Counts up from 0 to `value` once it scrolls into view. */
export function CountUp({
  value,
  suffix = "",
  prefix = "",
  className,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const reducedMotion = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, value, {
      duration: reducedMotion ? 0 : 1.4,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    });

    return () => controls.stop();
  }, [isInView, reducedMotion, value]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
}
