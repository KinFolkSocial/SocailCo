import type { Service } from "@/content/services";

/** Sticky title on one side, scrolling detail on the other — per service. */
export function ServiceSection({ service, index }: { service: Service; index: number }) {
  return (
    <section
      id={service.slug}
      className="grid grid-cols-1 gap-8 border-t border-smoke/20 px-6 py-16 sm:px-10 lg:grid-cols-12 lg:gap-12 lg:px-16 lg:py-24"
    >
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-32">
          <p className="font-body text-label uppercase text-amber">{String(index + 1).padStart(2, "0")}</p>
          <h2 className="mt-3 font-display text-display-2 uppercase">{service.title}</h2>
        </div>
      </div>

      <div className="lg:col-span-7 lg:col-start-6">
        <p className="max-w-[62ch] font-body text-body-lg text-smoke">{service.summary}</p>

        <div className="mt-10">
          <p className="font-body text-xs uppercase tracking-[0.2em] text-smoke">What&apos;s included</p>
          <ul className="mt-4 flex flex-col gap-3">
            {service.included.map((item) => (
              <li key={item} className="border-t border-smoke/20 pt-3 font-body text-body first:border-t-0 first:pt-0">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-8">
          <div>
            <p className="font-body text-xs uppercase tracking-[0.2em] text-smoke">Typical timeline</p>
            <p className="mt-2 font-body text-body">{service.timeline}</p>
          </div>
          <div>
            <p className="font-body text-xs uppercase tracking-[0.2em] text-smoke">Starting investment</p>
            <p className="mt-2 font-body text-body">{service.startingInvestment}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
