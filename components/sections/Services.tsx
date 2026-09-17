import { services } from "@/content/services";
import { InlineImageHeading } from "@/components/sections/InlineImageHeading";
import { ServiceTile } from "@/components/sections/ServiceTile";

export function Services() {
  return (
    <section className="bg-bone px-6 py-24 text-ink sm:px-10 lg:px-16 lg:py-32">
      <InlineImageHeading
        as="h2"
        className="font-display text-display-2 uppercase"
        parts={[
          { type: "text", value: "What we" },
          { type: "image", src: "/placeholders/service-header-1.svg", alt: "Florals being arranged for an event" },
          { type: "text", value: "plan," },
          { type: "image", src: "/placeholders/service-header-2.svg", alt: "A reception venue staged for guests" },
          { type: "text", value: "start to finish" },
        ]}
      />

      <div className="mt-12">
        {services.map((service) => (
          <ServiceTile key={service.slug} service={service} />
        ))}
      </div>
    </section>
  );
}
