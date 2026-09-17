import { RevealText } from "@/components/motion/RevealText";
import { StickyStack } from "@/components/motion/StickyStack";

const stackItems = [
  { title: "Taste", body: "A point of view on every detail, from tablescape to run-of-show, so nothing feels default." },
  { title: "Logistics", body: "Timelines, vendors, and budgets tracked with the same rigor as the design itself." },
  { title: "Relationships", body: "A vetted bench of venues and vendors built over years of real events, not cold outreach." },
  { title: "Follow-through", body: "We're on-site until the last guest leaves, not gone after the ceremony ends." },
];

export function WhyUs() {
  return (
    <section className="px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
      <RevealText as="h2" lines={["Why us"]} className="font-display text-display-2 uppercase" />
      <div className="mt-12">
        <StickyStack items={stackItems} />
      </div>
    </section>
  );
}
