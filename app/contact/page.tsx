import type { Metadata } from "next";
import { brand } from "@/content/brand";
import { InquiryForm } from "@/components/forms/InquiryForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start an inquiry — most replies land within one business day.",
};

export default function ContactPage() {
  return (
    <div className="grid grid-cols-1 gap-12 px-6 pt-32 pb-24 sm:px-10 lg:grid-cols-12 lg:gap-8 lg:px-16 lg:pb-32">
      <div className="lg:col-span-4">
        <h1 className="font-display text-display-1 uppercase leading-[0.85]">Let&apos;s talk</h1>
        <p className="mt-6 max-w-[42ch] font-body text-body-lg text-smoke">
          Tell us about your event and we&apos;ll follow up with next steps.
        </p>

        <dl className="mt-12 flex flex-col gap-6 border-t border-smoke/20 pt-8">
          <div>
            <dt className="font-body text-xs uppercase tracking-[0.2em] text-smoke">Email</dt>
            <dd className="mt-1 font-body text-body">
              <a href={`mailto:${brand.contact.email}`} className="hover:text-amber">
                {brand.contact.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="font-body text-xs uppercase tracking-[0.2em] text-smoke">Phone</dt>
            <dd className="mt-1 font-body text-body">{brand.contact.phone}</dd>
          </div>
          <div>
            <dt className="font-body text-xs uppercase tracking-[0.2em] text-smoke">Response time</dt>
            <dd className="mt-1 font-body text-body">{brand.contact.responseTime}</dd>
          </div>
          <div>
            <dt className="font-body text-xs uppercase tracking-[0.2em] text-smoke">Service area</dt>
            <dd className="mt-1 font-body text-body">
              {brand.markets.primary} — {brand.markets.note}
            </dd>
          </div>
        </dl>
      </div>

      <div className="lg:col-span-7 lg:col-start-6">
        <InquiryForm />
      </div>
    </div>
  );
}
