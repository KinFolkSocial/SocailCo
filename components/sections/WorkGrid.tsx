import { projects } from "@/content/projects";
import { WorkCard } from "@/components/sections/WorkCard";
import { RevealText } from "@/components/motion/RevealText";
import { HoverSwapLink } from "@/components/ui/HoverSwapLink";

const spanClasses = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
  "lg:col-span-6",
  "lg:col-span-6",
];

export function WorkGrid() {
  return (
    <section className="px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <RevealText as="h2" lines={["Featured work"]} className="font-display text-display-2 uppercase" />
        <HoverSwapLink href="/work" className="font-body text-body uppercase">
          View all work
        </HoverSwapLink>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {projects.map((project, index) => (
          <WorkCard key={project.slug} project={project} className={spanClasses[index % spanClasses.length]} />
        ))}
      </div>
    </section>
  );
}
