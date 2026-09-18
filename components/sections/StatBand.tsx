import { CountUp } from "@/components/motion/CountUp";

/** Placeholder values — no real totals exist yet. See TODO.md. */
const stats = [
  { value: 180, suffix: "+", label: "Events produced" },
  { value: 42000, suffix: "+", label: "Guests hosted" },
  { value: 14, suffix: "", label: "Cities" },
  { value: 9, suffix: "", label: "Years" },
];

export function StatBand() {
  return (
    <section className="bg-bone px-6 py-24 text-ink sm:px-10 lg:px-16 lg:py-32">
      <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <CountUp value={stat.value} suffix={stat.suffix} className="font-display text-display-2 text-clay" />
            <p className="mt-2 font-body text-xs uppercase tracking-[0.2em] text-shale">{stat.label}</p>
          </div>
        ))}
      </div>
      <p className="mt-10 font-body text-xs text-shale">Placeholder values — see TODO.md.</p>
    </section>
  );
}
