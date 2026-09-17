"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** True only once the client has taken over — for SSR-safe progressive enhancement. */
export function useMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
