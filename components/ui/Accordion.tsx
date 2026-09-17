"use client";

import { useId, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { DURATION, EASE_KINFOLK } from "@/lib/easing";
import { cn } from "@/lib/cn";

export type AccordionItemData = {
  question: string;
  answer: string;
};

/** Single-open accordion (FAQ pattern) with full keyboard support. */
export function Accordion({ items, className }: { items: AccordionItemData[]; className?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className={cn("divide-y divide-smoke/40", className)}>
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const buttonId = `${baseId}-button-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left font-display text-display-3"
              >
                <span>{item.question}</span>
                <span aria-hidden="true" className={cn("text-amber transition-transform", isOpen && "rotate-45")}>
                  +
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: DURATION.micro, ease: EASE_KINFOLK }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[62ch] pb-5 font-body text-body text-smoke">{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
