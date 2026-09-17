import { brand } from "@/content/brand";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <p className="font-body text-sm uppercase tracking-[0.3em] text-amber">
        {brand.markets.primary}
      </p>
      <h1 className="font-display text-[clamp(2.5rem,10vw,7rem)] uppercase leading-[0.85] tracking-[-0.03em]">
        {brand.name}
      </h1>
      <p className="max-w-[42ch] font-body text-lg text-smoke">
        {brand.tagline}
      </p>
    </main>
  );
}
