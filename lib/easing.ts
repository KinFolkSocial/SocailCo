/** Single source of truth for the brand's motion curve (brief §3 Motion principles). */
export const EASE_KINFOLK = [0.65, 0, 0.35, 1] as const;
export const EASE_KINFOLK_CSS = "cubic-bezier(0.65, 0, 0.35, 1)";

export const DURATION = {
  micro: 0.2,
  reveal: 0.8,
} as const;

export const STAGGER_CHILD = 0.07;
