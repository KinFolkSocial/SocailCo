import Image from "next/image";
import { cn } from "@/lib/cn";

export type InlineImageHeadingPart =
  | { type: "text"; value: string }
  | { type: "image"; src: string; alt: string };

/**
 * The signature move: huge headline with rounded images set inline between
 * words, scaled to the surrounding text's cap height via em units so it
 * works at hero scale or section-header scale with no size prop. Images
 * collapse away below `sm` rather than breaking the line rhythm.
 */
export function InlineImageHeading({
  parts,
  as: Tag = "h2",
  className,
}: {
  parts: InlineImageHeadingPart[];
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  return (
    <Tag className={cn("flex flex-wrap items-center gap-x-[0.28em] gap-y-2", className)}>
      {parts.map((part, index) =>
        part.type === "text" ? (
          <span key={index}>{part.value}</span>
        ) : (
          <span
            key={index}
            className="relative hidden h-[0.8em] w-[1.6em] shrink-0 overflow-hidden rounded-full align-middle sm:inline-block"
          >
            <Image
              src={part.src}
              alt={part.alt}
              fill
              sizes="(max-width: 640px) 0px, 320px"
              className="object-cover"
            />
          </span>
        ),
      )}
    </Tag>
  );
}
