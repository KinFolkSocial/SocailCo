"use client";

import Link from "next/link";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { DURATION, EASE_KINFOLK } from "@/lib/easing";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "default" | "large";

type ButtonOwnProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
};

type ButtonAsButton = ButtonOwnProps & {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit";
};

type ButtonAsLink = ButtonOwnProps & {
  href: string;
  onClick?: () => void;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const base =
  "inline-flex items-center justify-center gap-2 font-body font-medium uppercase tracking-[0.08em] transition-colors disabled:opacity-40 disabled:pointer-events-none";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-amber text-ink hover:bg-bone",
  secondary: "border border-bone text-bone hover:bg-bone hover:text-ink",
  ghost: "text-bone underline underline-offset-4 decoration-smoke hover:decoration-amber",
};

const sizes: Record<ButtonSize, string> = {
  default: "px-6 py-3 text-sm",
  large: "px-8 py-4 text-base",
};

/**
 * Single button primitive used everywhere in the site. Renders an <a> via
 * next/link when `href` is passed, otherwise a native <button>, so callers
 * never have to pick the right element themselves.
 */
export function Button({
  variant = "primary",
  size = "default",
  children,
  className,
  disabled,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  const tap = disabled ? {} : { scale: 0.97 };

  if ("href" in rest && rest.href) {
    return (
      <motion.span
        whileTap={tap}
        transition={{ duration: DURATION.micro, ease: EASE_KINFOLK }}
        className="inline-block"
      >
        <Link href={rest.href} onClick={rest.onClick} className={classes} aria-disabled={disabled}>
          {children}
        </Link>
      </motion.span>
    );
  }

  const { type = "button", onClick } = rest as ButtonAsButton;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={tap}
      transition={{ duration: DURATION.micro, ease: EASE_KINFOLK }}
      className={classes}
    >
      {children}
    </motion.button>
  );
}
