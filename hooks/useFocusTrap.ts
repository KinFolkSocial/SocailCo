"use client";

import { useEffect, type RefObject } from "react";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Traps Tab/Shift+Tab focus inside `containerRef` while `active` is true,
 * calls `onClose` on Escape, and returns focus to `triggerRef` on close —
 * the keyboard contract the brief requires for the mega menu and mobile nav.
 */
export function useFocusTrap({
  active,
  containerRef,
  triggerRef,
  onClose,
}: {
  active: boolean;
  containerRef: RefObject<HTMLElement | null>;
  triggerRef: RefObject<HTMLElement | null>;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!active) return;
    const container = containerRef.current;
    if (!container) return;

    const getFocusable = () => Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));

    const first = getFocusable()[0];
    first?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = getFocusable();
      if (focusable.length === 0) return;

      const firstEl = focusable[0];
      const lastEl = focusable[focusable.length - 1];
      const activeEl = document.activeElement;

      if (event.shiftKey && activeEl === firstEl) {
        event.preventDefault();
        lastEl.focus();
      } else if (!event.shiftKey && activeEl === lastEl) {
        event.preventDefault();
        firstEl.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const trigger = triggerRef.current;
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      trigger?.focus();
    };
  }, [active, containerRef, triggerRef, onClose]);
}
