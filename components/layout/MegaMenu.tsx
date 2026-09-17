"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { primaryNav } from "@/lib/navigation";
import { brand } from "@/content/brand";
import { useFocusTrap } from "@/hooks/useFocusTrap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useLenisControls } from "@/components/layout/SmoothScrollProvider";
import { DURATION, EASE_KINFOLK } from "@/lib/easing";

export function MegaMenu({
  open,
  onClose,
  triggerRef,
}: {
  open: boolean;
  onClose: () => void;
  triggerRef: RefObject<HTMLButtonElement | null>;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const lenis = useLenisControls();
  const [activeIndex, setActiveIndex] = useState(0);

  useFocusTrap({ active: open, containerRef, triggerRef, onClose });

  useEffect(() => {
    if (open) {
      lenis.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis.start();
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, lenis]);

  const transition = reducedMotion ? { duration: 0 } : { duration: DURATION.reveal, ease: EASE_KINFOLK };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={containerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-50 flex flex-col bg-ink text-bone"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
        >
          <div className="flex items-center justify-between px-6 py-6 sm:px-10 lg:px-16">
            <Link href="/" onClick={onClose} className="font-display text-label uppercase">
              {brand.shortName}
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="font-body text-label uppercase text-bone"
            >
              Close ✕
            </button>
          </div>

          <div className="flex flex-1 flex-col gap-12 overflow-y-auto px-6 pb-12 sm:px-10 lg:flex-row lg:items-center lg:px-16">
            <nav aria-label="Primary" className="flex flex-1 flex-col justify-center gap-2">
              {primaryNav.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  className="group font-display text-display-1 uppercase leading-[0.95] text-smoke transition-colors hover:text-amber focus-visible:text-amber"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden aspect-[4/5] w-full max-w-md shrink-0 overflow-hidden rounded-3xl border border-smoke/40 lg:block">
              <div className="flex size-full items-center justify-center bg-gradient-to-br from-clay via-amber to-jade p-10 text-center">
                <p className="font-body text-body text-ink">{primaryNav[activeIndex]?.preview}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
