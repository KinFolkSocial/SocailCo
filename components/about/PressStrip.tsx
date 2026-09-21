/** Press and awards mentions. */
const mentions = ["Placeholder Weddings Quarterly", "Placeholder Southern Living", "Placeholder Event Awards, 2024", "Placeholder Atlanta Magazine"];

export function PressStrip() {
  return (
    <div className="border-y border-smoke/20 py-10">
      <p className="sr-only">As featured in</p>
      <div aria-hidden="true" className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
        {mentions.map((mention) => (
          <span key={mention} className="font-body text-sm uppercase tracking-[0.15em] text-smoke">
            {mention}
          </span>
        ))}
      </div>
    </div>
  );
}
