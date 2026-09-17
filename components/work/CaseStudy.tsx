import Image from "next/image";
import type { Project } from "@/content/projects";
import { RevealImage } from "@/components/motion/RevealImage";
import { RevealText } from "@/components/motion/RevealText";
import { GalleryStrip } from "@/components/work/GalleryStrip";

const metaFields = (project: Project) => [
  { label: "Client", value: project.client },
  { label: "Year", value: String(project.year) },
  { label: "Venue", value: project.venue },
  { label: "Guests", value: project.guestCount },
];

export function CaseStudy({ project }: { project: Project }) {
  const [firstParagraph, ...restParagraphs] = project.narrative;

  return (
    <article>
      <div className="relative h-[70vh] min-h-[420px] w-full overflow-hidden">
        <Image
          src={project.cover}
          alt={project.coverAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/10" />
        <div className="absolute inset-x-0 bottom-0 px-6 pb-12 sm:px-10 lg:px-16">
          <p className="font-body text-label uppercase text-amber">
            {project.location} — {project.year}
          </p>
          <h1 className="mt-3 font-display text-display-1 uppercase leading-[0.85]">{project.eventType}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-10 px-6 py-16 sm:px-10 lg:grid-cols-4 lg:px-16 lg:py-24">
        {metaFields(project).map((field) => (
          <div key={field.label}>
            <p className="font-body text-xs uppercase tracking-[0.2em] text-smoke">{field.label}</p>
            <p className="mt-2 font-body text-body">{field.value}</p>
          </div>
        ))}
        <div className="lg:col-span-4">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-smoke">Services delivered</p>
          <p className="mt-2 font-body text-body">{project.servicesDelivered.join(" · ")}</p>
        </div>
      </div>

      <div className="px-6 sm:px-10 lg:px-16">
        <div className="max-w-[62ch]">
          <RevealText as="p" lines={[firstParagraph]} className="font-body text-body-lg" />
        </div>

        <blockquote className="my-12 max-w-[48ch] border-l-2 border-amber pl-6">
          <p className="font-display text-display-3 leading-[1.05]">&ldquo;{project.pullQuote}&rdquo;</p>
        </blockquote>

        <div className="flex max-w-[62ch] flex-col gap-6">
          {restParagraphs.map((paragraph, index) => (
            <p key={index} className="font-body text-body-lg text-smoke">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <GalleryStrip images={project.gallery} />
      </div>

      <div className="grid grid-cols-1 gap-12 px-6 py-16 sm:px-10 lg:grid-cols-2 lg:px-16 lg:py-24">
        <div>
          <p className="font-body text-xs uppercase tracking-[0.2em] text-smoke">Vendor credits</p>
          <dl className="mt-6 flex flex-col gap-4">
            {project.vendorCredits.map((credit) => (
              <div key={credit.role} className="flex items-baseline justify-between gap-4 border-b border-smoke/20 pb-3">
                <dt className="font-body text-sm text-smoke">{credit.role}</dt>
                <dd className="font-body text-body">{credit.name}</dd>
              </div>
            ))}
          </dl>
        </div>

        <RevealImage className="aspect-square w-full max-w-md rounded-3xl lg:justify-self-end">
          <div className="flex size-full flex-col justify-end bg-jade p-10">
            <p className="font-display text-display-3 leading-[1.05] text-bone">
              &ldquo;{project.clientQuote.quote}&rdquo;
            </p>
            <p className="mt-4 font-body text-sm uppercase tracking-[0.15em] text-bone/70">
              {project.clientQuote.attribution}
            </p>
          </div>
        </RevealImage>
      </div>
    </article>
  );
}
