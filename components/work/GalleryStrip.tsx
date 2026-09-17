import Image from "next/image";
import type { Project } from "@/content/projects";

/**
 * Horizontally-scrolling image strip — native scroll, no JS needed.
 * `data-lenis-prevent` tells Lenis to leave this element's own scrolling
 * alone rather than intercepting wheel input meant for it (a documented
 * Lenis + nested-scroll-container gotcha).
 */
export function GalleryStrip({ images }: { images: Project["gallery"] }) {
  return (
    <div
      data-lenis-prevent
      className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 sm:px-10 lg:px-16"
    >
      {images.map((image, index) => (
        <div
          key={index}
          className="relative aspect-[4/5] w-[80vw] shrink-0 snap-start overflow-hidden rounded-2xl sm:w-[420px]"
        >
          <Image src={image.src} alt={image.alt} fill sizes="(max-width: 640px) 80vw, 420px" className="object-cover" />
        </div>
      ))}
    </div>
  );
}
