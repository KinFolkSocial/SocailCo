"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RevealText } from "@/components/motion/RevealText";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: "Discovery",
    body: "A real conversation about the vision, the guest list, and the budget — before a single vendor gets a call.",
  },
  {
    title: "Design",
    body: "Mood boards, floor plans, and a look that holds together as one idea rather than a series of separate decisions.",
  },
  {
    title: "Sourcing",
    body: "Vendors booked from a vetted bench, contracts reviewed, and a budget tracked line by line.",
  },
  {
    title: "Production",
    body: "Timelines, load-in schedules, and a run-of-show tight enough that nothing depends on luck.",
  },
  {
    title: "The Day",
    body: "A full production team on-site from load-in to load-out, so the only job left for you is to be there.",
  },
];

/** Five-step timeline with a scroll-scrubbed progress line down the left edge. */
export function Process() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const container = containerRef.current;
    const progress = progressRef.current;
    if (!container || !progress) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        progress,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top center",
            end: "bottom center",
            scrub: true,
          },
        },
      );
    }, container);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="process" className="border-t border-smoke/20 px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <RevealText as="h2" lines={["Our process"]} className="font-display text-display-2 uppercase" />

      <div ref={containerRef} className="relative mt-16 flex flex-col gap-16 pl-10 sm:pl-14">
        <div aria-hidden="true" className="absolute top-0 bottom-0 left-0 w-px bg-smoke/30" />
        {!reducedMotion && (
          <div
            ref={progressRef}
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-0 w-px origin-top bg-amber"
            style={{ transform: "scaleY(0)" }}
          />
        )}

        {steps.map((step, index) => (
          <div key={step.title} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-10 top-1 flex size-6 items-center justify-center rounded-full border border-smoke/40 bg-ink font-body text-xs text-smoke sm:-left-14"
            >
              {index + 1}
            </span>
            <h3 className="font-display text-display-3 uppercase">{step.title}</h3>
            <p className="mt-2 max-w-[52ch] font-body text-body text-smoke">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
