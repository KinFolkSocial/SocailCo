"use client";

import { motion } from "motion/react";
import { InlineImageHeading } from "@/components/sections/InlineImageHeading";
import { Button } from "@/components/ui/Button";
import { HoverSwapLink } from "@/components/ui/HoverSwapLink";
import { brand } from "@/content/brand";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { DURATION, EASE_KINFOLK } from "@/lib/easing";

function ScrollCue() {
  const reducedMotion = useReducedMotion();

  return (
    <div aria-hidden="true" className="absolute bottom-10 left-6 flex items-center gap-3 sm:left-10 lg:left-16">
      <motion.span
        className="block h-10 w-px bg-smoke"
        animate={reducedMotion ? undefined : { scaleY: [0.3, 1, 0.3] }}
        transition={reducedMotion ? undefined : { duration: 2, repeat: Infinity, ease: EASE_KINFOLK }}
        style={{ transformOrigin: "top" }}
      />
      <span className="font-body text-xs uppercase tracking-[0.2em] text-smoke">Scroll</span>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center gap-10 overflow-hidden px-6 pt-32 pb-24 sm:px-10 lg:px-16">
      <p className="font-body text-label uppercase text-amber">{brand.markets.primary}</p>

      <InlineImageHeading
        as="h1"
        className="font-display text-display-1 uppercase leading-[0.85]"
        parts={[
          { type: "text", value: "We build" },
          { type: "image", src: "/placeholders/hero-1.svg", alt: "Guests dancing at a reception" },
          { type: "text", value: "moments worth" },
          { type: "image", src: "/placeholders/hero-2.svg", alt: "A tablescape set for a celebration" },
          { type: "text", value: "remembering" },
        ]}
      />

      <p className="max-w-[46ch] font-body text-body-lg text-smoke">
        Full-service planning and design for weddings, corporate galas, milestone celebrations, and brand
        activations — {brand.markets.note}.
      </p>

      <div className="flex flex-wrap items-center gap-8">
        <Button href="/contact" size="large">
          Start an inquiry
        </Button>
        <HoverSwapLink href="/work" className="font-body text-body uppercase">
          View our work
        </HoverSwapLink>
      </div>

      <motion.div
        className="pointer-events-none absolute right-[-10%] top-1/2 -z-10 h-[60vmin] w-[60vmin] -translate-y-1/2 rounded-full bg-clay/20 blur-3xl"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DURATION.reveal * 2, ease: EASE_KINFOLK }}
      />

      <ScrollCue />
    </section>
  );
}
