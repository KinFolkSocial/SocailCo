import Image from "next/image";
import { RevealText } from "@/components/motion/RevealText";
import { RevealImage } from "@/components/motion/RevealImage";

const statementLines = [
  "Kinfolk Social Co. exists for the events",
  "that deserve more than a checklist —",
  "the ones with real people, real joy,",
  "and a story worth telling twice.",
];

export function IntroStatement() {
  return (
    <section className="grid grid-cols-1 gap-12 px-6 py-24 sm:px-10 lg:grid-cols-12 lg:gap-8 lg:px-16 lg:py-32">
      <RevealText
        as="p"
        lines={statementLines}
        className="font-display text-display-2 leading-[0.95] lg:col-span-7"
      />

      <div className="lg:col-span-4 lg:col-start-9 lg:-mt-16">
        <RevealImage className="aspect-[4/5] w-full max-w-sm rounded-3xl sm:max-w-md lg:max-w-none">
          <Image
            src="/images/intro-celebration.jpg"
            alt="Joyful guests celebrating with champagne at a Kinfolk Social Co. luxury gathering"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            className="object-cover"
          />
        </RevealImage>
      </div>
    </section>
  );
}
