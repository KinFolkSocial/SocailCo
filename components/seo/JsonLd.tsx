/** Renders a JSON-LD <script> tag. `data` must come from our own trusted lib/seo.ts builders — never user input. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
