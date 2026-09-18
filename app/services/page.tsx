import type { Metadata } from "next";
import { services } from "@/content/services";
import { faqs } from "@/content/faqs";
import { ServiceSection } from "@/components/services/ServiceSection";
import { Process } from "@/components/sections/Process";
import { Accordion } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Services",
  description: "Full planning, month-of coordination, corporate activations, milestones, and design-only styling.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <div>
      <JsonLd data={faqPageJsonLd(faqs)} />

      <div className="px-6 pt-32 pb-16 sm:px-10 lg:px-16">
        <h1 className="font-display text-display-1 uppercase leading-[0.85]">Services</h1>
        <p className="mt-6 max-w-[62ch] font-body text-body-lg text-smoke">
          Five ways to work with us, from full planning to design-only styling. Every engagement
          starts with the same discovery conversation — see the process below.
        </p>
      </div>

      <div>
        {services.map((service, index) => (
          <ServiceSection key={service.slug} service={service} index={index} />
        ))}
      </div>

      <section className="border-t border-smoke/20 px-6 py-24 sm:px-10 lg:px-16 lg:py-32">
        <h2 className="font-display text-display-2 uppercase">Questions</h2>
        <div className="mt-12 max-w-3xl">
          <Accordion items={faqs} />
        </div>
      </section>

      <Process />
    </div>
  );
}
