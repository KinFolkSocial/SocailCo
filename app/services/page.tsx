import type { Metadata } from "next";
import { services } from "@/content/services";
import { ServiceSection } from "@/components/services/ServiceSection";
import { Process } from "@/components/sections/Process";

export const metadata: Metadata = {
  title: "Services",
  description: "Full planning, month-of coordination, corporate activations, milestones, and design-only styling.",
};

export default function ServicesPage() {
  return (
    <div>
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

      <Process />
    </div>
  );
}
