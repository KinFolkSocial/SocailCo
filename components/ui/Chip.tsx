import { cn } from "@/lib/cn";

type ChipTone = "neutral" | "amber" | "clay" | "jade";

const tones: Record<ChipTone, string> = {
  neutral: "border-smoke text-bone",
  amber: "border-amber text-amber",
  clay: "border-clay text-clay",
  jade: "border-jade text-jade",
};

/** Small metadata pill — year, event type, result line on case-study cards. */
export function Chip({
  children,
  tone = "neutral",
  className,
}: {
  children: string;
  tone?: ChipTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 font-body text-xs uppercase tracking-[0.12em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
