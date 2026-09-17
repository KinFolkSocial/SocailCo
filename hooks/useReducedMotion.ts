"use client";

import { useSyncExternalStore } from "react";

const query = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mql = window.matchMedia(query);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(query).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * Tracks `prefers-reduced-motion: reduce` live, including changes made
 * mid-session (OS-level toggle), not just at first paint.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
