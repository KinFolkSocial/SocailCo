import type { MDXComponents } from "mdx/types";

/**
 * Hand-styled prose — no @tailwindcss/typography plugin, matching the
 * brief's "no component library" rule for UI primitives.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => <h2 className="mt-12 font-display text-display-3 uppercase" {...props} />,
    h3: (props) => <h3 className="mt-8 font-display text-2xl" {...props} />,
    p: (props) => <p className="mt-6 font-body text-body-lg text-smoke" {...props} />,
    ul: (props) => (
      <ul className="mt-6 flex flex-col gap-2 pl-5 font-body text-body-lg text-smoke marker:text-amber [&>li]:list-disc" {...props} />
    ),
    ol: (props) => (
      <ol className="mt-6 flex flex-col gap-2 pl-5 font-body text-body-lg text-smoke marker:text-amber [&>li]:list-decimal" {...props} />
    ),
    blockquote: (props) => (
      <blockquote className="my-8 border-l-2 border-amber pl-6 font-display text-display-3 leading-[1.05] text-bone" {...props} />
    ),
    a: (props) => <a className="underline decoration-amber underline-offset-4 hover:text-amber" {...props} />,
    strong: (props) => <strong className="font-semibold text-bone" {...props} />,
    ...components,
  };
}
