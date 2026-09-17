import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { HoverSwapLink } from "@/components/ui/HoverSwapLink";
import { Chip } from "@/components/ui/Chip";
import { TextField, TextAreaField, SelectField } from "@/components/ui/Field";
import { Accordion } from "@/components/ui/Accordion";
import { Marquee } from "@/components/ui/Marquee";
import { Cursor } from "@/components/ui/Cursor";
import { RevealText } from "@/components/motion/RevealText";
import { RevealImage } from "@/components/motion/RevealImage";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";
import { CountUp } from "@/components/motion/CountUp";
import { Parallax } from "@/components/motion/Parallax";
import { StickyStack } from "@/components/motion/StickyStack";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

const colorTokens = [
  { name: "Ink", token: "ink", hex: "#0E0B0A", role: "Base background — dark sections are the default" },
  { name: "Bone", token: "bone", hex: "#F6F1E8", role: "Base foreground / light sections" },
  { name: "Amber", token: "amber", hex: "#E2A03F", role: "Primary accent — large blocks, never thin trim" },
  { name: "Clay", token: "clay", hex: "#A8452E", role: "Secondary accent — burnt terracotta" },
  { name: "Jade", token: "jade", hex: "#1F4D3D", role: "Tertiary accent — deep green" },
  { name: "Smoke", token: "smoke", hex: "#6B635C", role: "Muted text, borders, dividers" },
];

const typeSteps = [
  { label: "Display / 1 — hero", className: "text-display-1 font-display uppercase", sample: "We build" },
  { label: "Display / 2 — section head", className: "text-display-2 font-display", sample: "Featured work" },
  { label: "Display / 3 — card / subsection", className: "text-display-3 font-display", sample: "Full-service planning" },
  { label: "Body / large", className: "text-body-lg font-body", sample: "Photography does the heavy lifting; typography and motion frame it." },
  { label: "Body", className: "text-body font-body", sample: "Every text/background pair clears WCAG AA." },
  { label: "Label / eyebrow", className: "text-label font-body uppercase", sample: "Atlanta · National Travel" },
];

const faqItems = [
  {
    question: "How far in advance should we book?",
    answer: "Most full-service clients book 9–14 months out; brand activations and smaller gatherings can move faster.",
  },
  {
    question: "Do you travel outside Atlanta?",
    answer: "Yes — the studio is based in Atlanta and works nationally, with travel built into every proposal.",
  },
  {
    question: "What's included in full planning?",
    answer: "Design direction, vendor sourcing and management, budget tracking, and full on-site production from load-in to load-out.",
  },
];

const stackItems = [
  { title: "Taste", body: "A point of view on every detail, from tablescape to run-of-show, so nothing feels default." },
  { title: "Logistics", body: "Timelines, vendors, and budgets tracked with the same rigor as the design itself." },
  { title: "Relationships", body: "A vetted bench of venues and vendors built over years of real events, not cold outreach." },
  { title: "Follow-through", body: "We're on-site until the last guest leaves, not gone after the ceremony ends." },
];

function Section({
  title,
  description,
  bleed = false,
  children,
}: {
  title: string;
  description?: string;
  bleed?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-smoke/30 py-16">
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-16">
        <h2 className="font-display text-display-3 uppercase">{title}</h2>
        {description && <p className="mt-2 max-w-[62ch] font-body text-body text-smoke">{description}</p>}
      </div>
      <div className={bleed ? "mt-10" : "mx-auto mt-10 max-w-6xl px-6 sm:px-10 lg:px-16"}>{children}</div>
    </section>
  );
}

export default function StyleguidePage() {
  return (
    <main className="pb-32">
      <header className="px-6 py-20 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <p className="font-body text-label uppercase text-amber">Internal — not indexed</p>
          <h1 className="mt-4 font-display text-display-1 uppercase leading-[0.85]">Styleguide</h1>
          <p className="mt-6 max-w-[62ch] font-body text-body-lg text-smoke">
            Every token, type step, button state, and motion primitive the site is built from. Scroll through
            to trigger the viewport-based animations; toggle your OS&apos;s reduced-motion setting to confirm
            everything collapses to instant-on.
          </p>
        </div>
      </header>

      <Section title="Color" description="Dark sections are the default. Accents run at full saturation in large blocks, never as thin trim.">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {colorTokens.map((color) => (
            <div key={color.token} className="flex flex-col gap-3">
              <div
                className="h-24 w-full rounded-2xl border border-smoke/40"
                style={{ backgroundColor: color.hex }}
                aria-hidden="true"
              />
              <div>
                <p className="font-body text-sm font-medium text-bone">{color.name}</p>
                <p className="font-body text-xs text-smoke">{color.hex}</p>
                <p className="mt-1 font-body text-xs text-smoke">{color.role}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Typography" description="Fluid via clamp(). Scale contrast — huge headlines next to tiny labels — is the main design lever.">
        <div className="flex flex-col gap-10">
          {typeSteps.map((step) => (
            <div key={step.label}>
              <p className="font-body text-xs uppercase tracking-[0.2em] text-smoke">{step.label}</p>
              <p className={`mt-2 ${step.className}`}>{step.sample}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Buttons" description="Primary, secondary, and ghost, at two sizes. Tab through to check focus rings; hover to check color shift.">
        <div className="flex flex-col gap-8">
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary">Plan with us</Button>
            <Button variant="secondary">View our work</Button>
            <Button variant="ghost">Learn more</Button>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="primary" size="large">
              Start an inquiry
            </Button>
            <Button variant="secondary" size="large" disabled>
              Disabled state
            </Button>
          </div>
        </div>
      </Section>

      <Section title="Hover-swap links" description="Label slides up, an identical label slides in beneath it. Pure CSS, no JS.">
        <nav className="flex flex-wrap gap-10 font-body text-body-lg uppercase">
          <HoverSwapLink href="#">Work</HoverSwapLink>
          <HoverSwapLink href="#">Services</HoverSwapLink>
          <HoverSwapLink href="#">Journal</HoverSwapLink>
          <HoverSwapLink href="#">Contact</HoverSwapLink>
        </nav>
      </Section>

      <Section title="Chips" description="Metadata pills used on case-study cards — year, event type, headline result.">
        <div className="flex flex-wrap gap-3">
          <Chip tone="amber">2025</Chip>
          <Chip tone="neutral">Corporate Gala</Chip>
          <Chip tone="clay">600 guests, 3 cities</Chip>
          <Chip tone="jade">Brand Activation</Chip>
        </div>
      </Section>

      <Section title="Fields" description="Text, textarea, and select, plus an error state. All wired for keyboard and screen-reader use.">
        <form className="grid max-w-xl gap-8">
          <TextField label="Full name" placeholder="Jordan Ellis" />
          <TextField label="Email" type="email" placeholder="you@example.com" error="Enter a valid email address." />
          <SelectField
            label="Event type"
            options={[
              { value: "wedding", label: "Wedding" },
              { value: "corporate", label: "Corporate" },
              { value: "milestone", label: "Milestone celebration" },
            ]}
          />
          <TextAreaField label="Tell us about it" placeholder="A few sentences on the vision..." />
        </form>
      </Section>

      <Section title="Accordion" description="Single-open, full keyboard support — used for FAQs.">
        <Accordion items={faqItems} />
      </Section>

      <Section title="Cursor" description="Custom cursor ring, scoped to its container. Move your mouse inside the box below.">
        <Cursor className="flex h-48 items-center justify-center rounded-2xl border border-smoke/40 bg-bone/5">
          <p className="font-body text-body text-smoke">Hover here</p>
        </Cursor>
      </Section>

      <Section title="Reveal text" description="Masked line-by-line rise, staggered 60–80ms per line, triggered on scroll into view.">
        <RevealText
          as="h3"
          className="font-display text-display-2 uppercase"
          lines={["We build", "moments worth", "remembering"]}
        />
      </Section>

      <Section title="Reveal image" description="Overflow-hidden mask, scales 1.08 → 1 as it enters the viewport.">
        <RevealImage className="aspect-video max-w-2xl rounded-2xl">
          <div className="flex size-full items-center justify-center bg-gradient-to-br from-clay via-amber to-jade">
            <span className="font-body text-sm uppercase tracking-[0.2em] text-ink">Placeholder — real photography in Phase 4+</span>
          </div>
        </RevealImage>
      </Section>

      <Section title="Stagger group" description="Parent stages its children in with a 60–80ms stagger on viewport entry.">
        <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {["Discovery", "Design", "Delivery"].map((label) => (
            <StaggerItem key={label} className="rounded-2xl border border-smoke/40 p-8">
              <p className="font-display text-display-3">{label}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Section>

      <Section title="Count up" description="Stat numbers count from 0 on viewport entry; jump straight to the final value under reduced motion.">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {[
            { value: 180, suffix: "+", label: "Events produced" },
            { value: 42000, suffix: "+", label: "Guests hosted" },
            { value: 14, suffix: "", label: "Cities" },
            { value: 9, suffix: "", label: "Years" },
          ].map((stat) => (
            <div key={stat.label}>
              <CountUp value={stat.value} suffix={stat.suffix} className="font-display text-display-3 text-amber" />
              <p className="mt-1 font-body text-xs uppercase tracking-[0.2em] text-smoke">{stat.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 font-body text-xs text-smoke">Placeholder values — see TODO.md.</p>
      </Section>

      <Section title="Parallax" description="Content drifts at a different rate than scroll, scrubbed via GSAP ScrollTrigger. Scroll this section to see it.">
        <div className="relative flex h-[60vh] items-center justify-center overflow-hidden rounded-2xl border border-smoke/40">
          <Parallax depth={0.3} className="absolute inset-0">
            <div className="flex h-[140%] items-center justify-center bg-gradient-to-b from-jade to-ink">
              <p className="font-display text-display-3 text-bone">Drifting layer</p>
            </div>
          </Parallax>
        </div>
      </Section>

      <Section title="Sticky stack" description="Value-prop cards that pin and stack as you scroll — used for the homepage &quot;Why us&quot; section.">
        <StickyStack items={stackItems} />
      </Section>

      <Section
        title="Marquee"
        description="Full-bleed scrolling band. The one place motion is linear — and it stops completely under reduced motion."
        bleed
      >
        <Marquee text="LET'S PLAN SOMETHING ✦" />
      </Section>
    </main>
  );
}
