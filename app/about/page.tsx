import type { Metadata } from "next";
import Image from "next/image";
import { brand } from "@/content/brand";
import { team } from "@/content/team";
import { RevealText } from "@/components/motion/RevealText";
import { RevealImage } from "@/components/motion/RevealImage";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { TeamGrid } from "@/components/about/TeamGrid";
import { PressStrip } from "@/components/about/PressStrip";

export const metadata: Metadata = {
  title: "About",
  description: `${brand.name}'s founder story, studio philosophy, and the people behind the work.`,
};

const values = [
  {
    title: "Craft over costume",
    body: "We build around the traditions our clients actually carry — the second line, the toast, the Sunday-best dress code nobody had to explain — not symbols applied as decoration.",
  },
  {
    title: "Every guest is the guest of honor",
    body: "From the flower girl to the great-aunt in the back row, hospitality doesn't have a tier system at our events.",
  },
  {
    title: "Rigor, not just taste",
    body: "We run budgets, timelines, and vendor contracts with the same discipline a hotel brings to a state dinner.",
  },
  {
    title: "Follow-through",
    body: "We're the last vendor to leave, every time — not gone the moment the ceremony ends.",
  },
];

export default function AboutPage() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-10 px-6 pt-32 pb-16 sm:px-10 lg:grid-cols-12 lg:gap-8 lg:px-16 lg:pb-24">
        <div className="lg:col-span-7">
          <h1 className="font-display text-display-1 uppercase leading-[0.85]">About</h1>
          <p className="mt-6 max-w-[46ch] font-body text-body-lg text-smoke">
            {brand.founder.name} founded {brand.name} on a simple idea: the events that matter most
            deserve the same rigor a luxury hotel brings to a state dinner — and the same warmth a
            family brings to a Sunday table.
          </p>
        </div>
        <div className="lg:col-span-4 lg:col-start-9">
          <RevealImage className="aspect-[4/5] w-full rounded-3xl">
            <Image
              src="/placeholders/about-hero.svg"
              alt={`Portrait of ${brand.founder.name}, ${brand.founder.title.toLowerCase()}`}
              fill
              sizes="(max-width: 1024px) 80vw, 400px"
              className="object-cover"
            />
          </RevealImage>
        </div>
      </div>

      <section className="bg-bone px-6 py-24 text-ink sm:px-10 lg:px-16 lg:py-32">
        <div className="max-w-[62ch]">
          <RevealText
            as="h2"
            className="font-display text-display-2 uppercase"
            lines={["What we", "stand for"]}
          />
          <div className="mt-8 flex flex-col gap-6">
            <p className="font-body text-body-lg">
              We started this studio because too many event planners treat Black clients like a
              niche instead of a culture. We don&apos;t. A wedding with a jumping broom, a
              homecoming tailgate that runs like a product launch, a repast that&apos;s really a
              celebration — we plan all of it with the same craft a top agency brings to any brand.
            </p>
            <p className="font-body text-body-lg">
              Craft comes first. We don&apos;t decorate our work with symbols; we build it around
              the traditions our clients actually carry. That&apos;s the point of view. Everything
              else is execution.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <RevealText as="h2" lines={["The team"]} className="font-display text-display-2 uppercase" />
        <div className="mt-12">
          <TeamGrid members={team} />
        </div>
      </section>

      <section className="bg-bone px-6 py-24 text-ink sm:px-10 lg:px-16 lg:py-32">
        <RevealText as="h2" lines={["What we value"]} className="font-display text-display-2 uppercase" />
        <StaggerGroup className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {values.map((value) => (
            <StaggerItem key={value.title} className="border-t border-smoke/30 pt-6">
              <h3 className="font-display text-display-3">{value.title}</h3>
              <p className="mt-3 max-w-[52ch] font-body text-body">{value.body}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <PressStrip />
    </div>
  );
}
