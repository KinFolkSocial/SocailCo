# Design Handoff — Kinfolk Social Co.

Everything you need to pick up the visual side of this site. Written for a
designer who doesn't want to read a full engineering README, but does want to
change fonts, swap palettes, replace photography, and edit copy without
asking permission.

If anything below is unclear, the truth is always **the running site + the
files it maps to**. See [README.md](README.md) for the engineering side.

---

## Start here

1. **`npm install && npm run dev`** in a terminal from the project root.
2. Open **[http://localhost:3000](http://localhost:3000)**.
3. In another tab, open **[http://localhost:3000/styleguide](http://localhost:3000/styleguide)** —
   every UI primitive, type step, color, button state, and motion pattern
   renders on one page. This is the single source of visual truth for the
   design system.
4. Everything hot-reloads as you edit files. You never need to restart.

---

## Design tokens — where the palette, fonts, and motion live

All colors, fonts, easings, durations, and the fluid type scale are declared
as CSS variables in **one file**: [`app/globals.css`](app/globals.css), in
the `@theme { ... }` block at the top.

Change a value there and every use of it updates everywhere, including on
the styleguide page. **You never need to hunt through components to change
a brand color.**

### Color

| Token | Value | Use it for | AA contrast |
|---|---|---|---|
| `--color-ink` | `#0E0B0A` | Dark background (site default) | — |
| `--color-bone` | `#F6F1E8` | Light background | — |
| `--color-amber` | `#E2A03F` | Primary accent (CTAs, highlights) | Passes on `ink` |
| `--color-clay` | `#A8452E` | Secondary accent (terracotta) | Passes on `bone` |
| `--color-jade` | `#1F4D3D` | Tertiary accent (deep green) | Passes on `bone` |
| `--color-smoke` | `#9C948C` | **Muted text on `ink`** (dark bg) | 5.6:1 on ink ✓ |
| `--color-shale` | `#6B635C` | **Muted text on `bone`** (light bg) | 5.4:1 on bone ✓ |

**Smoke vs. shale is the one rule that matters.** They exist because a single
neutral gray can't pass WCAG AA against both dark and light backgrounds.
Getting this wrong is the fastest way to reintroduce accessibility bugs.

- Text on `bg-ink` → `text-smoke`
- Text on `bg-bone` → `text-shale`
- If you introduce a new accent color, verify contrast against both. See
  [Accessibility guardrails](#accessibility-guardrails) below.

### Typography

Fonts are loaded via `next/font/google` in [app/layout.tsx](app/layout.tsx).
To swap either:

- Change the import — `Bricolage_Grotesque` for display, `Inter` for body.
- The rest is automatic. `font-display` and `font-body` utilities pick up the
  new family via CSS variables.

Type scale (fluid, `clamp()`-based) lives in `@theme` in globals.css and
maps to utilities like `text-display-1`, `text-display-2`, `text-display-3`,
`text-body-lg`, `text-body`, `text-label`. Change the clamp bounds to
retune the whole scale at once.

### Motion

- `--ease-kinfolk: cubic-bezier(0.65, 0, 0.35, 1)` — the brand motion curve.
- `--duration-micro: 200ms` — hovers, button taps.
- `--duration-reveal: 800ms` — section entrances.

These are also mirrored in TypeScript at [`lib/easing.ts`](lib/easing.ts)
for use in `motion/react` and GSAP calls. Change both if you retune motion.

---

## Component-to-file map

If you can see it on the site, this is where to change it:

### Global chrome
- **Header** — [components/layout/Header.tsx](components/layout/Header.tsx)
- **Mega menu** (full-screen nav) — [components/layout/MegaMenu.tsx](components/layout/MegaMenu.tsx)
- **Footer** — [components/layout/Footer.tsx](components/layout/Footer.tsx)
- **Nav items** (source of truth) — [lib/navigation.ts](lib/navigation.ts)

### Home page sections (top to bottom)
Match to visual order on `/`:

| Section | File |
|---|---|
| Hero | [components/sections/Hero.tsx](components/sections/Hero.tsx) |
| Trust-strip logos | [components/sections/LogoScroller.tsx](components/sections/LogoScroller.tsx) |
| Intro statement + founder portrait | [components/sections/IntroStatement.tsx](components/sections/IntroStatement.tsx) |
| Featured work grid | [components/sections/WorkGrid.tsx](components/sections/WorkGrid.tsx) |
| Services tiles | [components/sections/Services.tsx](components/sections/Services.tsx) |
| Amber CTA marquee | [components/sections/CTABand.tsx](components/sections/CTABand.tsx) |
| Why us sticky stack | [components/sections/WhyUs.tsx](components/sections/WhyUs.tsx) |
| Stats band | [components/sections/StatBand.tsx](components/sections/StatBand.tsx) |
| Testimonial carousel | [components/sections/TestimonialCarousel.tsx](components/sections/TestimonialCarousel.tsx) |
| Journal teaser | [components/sections/JournalTeaser.tsx](components/sections/JournalTeaser.tsx) |

### Signature component
The **inline-image headline** (huge text with rounded photos between the
words) is [components/sections/InlineImageHeading.tsx](components/sections/InlineImageHeading.tsx).
Used in the Hero, the Services section header, and the Journal teaser
header. Pass `parts` as an array of `{ type: 'text' | 'image', ... }`.

### Case study parts
- Card (used in the homepage Featured Work grid + the Work index) — [components/sections/WorkCard.tsx](components/sections/WorkCard.tsx)
- Full case study page — [components/work/CaseStudy.tsx](components/work/CaseStudy.tsx)
- Horizontal gallery strip — [components/work/GalleryStrip.tsx](components/work/GalleryStrip.tsx)
- Prev/next links at the bottom — [components/work/PrevNextLinks.tsx](components/work/PrevNextLinks.tsx)

---

## Photography

Every image on the site is currently a **brand-colored gradient SVG
placeholder** generated in `/public/placeholders/`. Nothing is real
photography.

### Replacing a placeholder

1. Drop the real image into `/public/` (any subfolder works).
2. Find the placeholder reference — grep for `/placeholders/hero-1.svg`
   (or whichever file), change the path.
3. Update the corresponding `alt` text to describe the *actual* image.
4. Real photography assets should ideally use `next/image` with a **static
   import** so `placeholder="blur"` generates a low-res base64 preview
   automatically:
   ```tsx
   import heroImage from "@/public/photography/hero-1.jpg";
   <Image src={heroImage} alt="..." placeholder="blur" />
   ```

### Image spec

- Aspect ratios are set by the component. Look at each placeholder's
  container to see what ratio the slot expects (4:5, 4:3, etc.).
- Export at 2× the display size — most heroes render around 1200–2000px
  wide, so 3000–4000px source is fine.
- JPEG or WebP. Avoid PNG unless you need transparency.
- `next/image` will resize and convert to AVIF/WebP automatically.

### Cultural direction (from the original brief)

Every person shown should be Black. Real gatherings — second lines,
reception dance floors, HBCU homecomings, milestone celebrations. Faces,
hands, movement, joy. Suggested sourcing:
- [Nappy.co](https://nappy.co)
- [CreateHER Stock](https://createherstock.com)
- Unsplash's Black-creator collections

**Do not** apply kente/mud-cloth patterns as borders, dividers,
backgrounds, or watermarks. Do not use adinkra symbols as icons. Do not
use the pan-African flag as a palette. Draw on the design lineage through
photography and confident typography, not decoration.

Credit every image in TODO.md as you add it.

---

## Editing copy

Copy lives in `/content/*.ts` files as typed constants. No CMS to log
into — just edit and save.

| File | What's editable |
|---|---|
| [content/brand.ts](content/brand.ts) | Company name, tagline, founder name/bio/title, email, phone, socials |
| [content/services.ts](content/services.ts) | Service titles, summaries, included lists, timelines, starting-investment bands |
| [content/projects.ts](content/projects.ts) | Case-study titles, narratives, pull quotes, client quotes, vendor credits |
| [content/testimonials.ts](content/testimonials.ts) | Homepage carousel quotes + attributions |
| [content/team.ts](content/team.ts) | Team member names, roles, bios |
| [content/faqs.ts](content/faqs.ts) | `/services` FAQ questions and answers |
| [content/journal.ts](content/journal.ts) | Post metadata (title, excerpt, date, category, cover) |
| [content/journal/*.mdx](content/journal) | Post bodies — Markdown syntax, no JSX needed |

Zod schemas at the bottom of each file catch bad edits at build time (e.g.
a missing field, an invalid enum value). You'll see a clear error in the
terminal.

### Adding a new case study
Add a new entry to the `projects` array in [content/projects.ts](content/projects.ts).
The Next.js build picks it up automatically — a new `/work/<slug>` page
generates, and it appears in the Work index and homepage grid.

### Adding a new journal post
1. Create `content/journal/<slug>.mdx` with the post body.
2. Add an entry to `journalPosts` in [content/journal.ts](content/journal.ts)
   with the metadata.
3. Add a matching entry to `journalLoaders` in the same file with the
   dynamic import (copy the pattern from the existing entries).

---

## Accessibility guardrails

Everything you do to the design must preserve these:

- **Color contrast: WCAG AA (4.5:1 body text, 3:1 for 24px+/bold and
  non-text UI).** Verify new color combinations at
  [webaim.org/resources/contrastchecker](https://webaim.org/resources/contrastchecker/)
  before committing.
- **Never remove `:focus-visible` styles.** The global rule in
  [app/globals.css](app/globals.css) puts a 2px amber outline on every
  focusable element. Change the color if you want, but don't set it to
  `none`.
- **New animations must respect `prefers-reduced-motion`.** Any new
  component that animates should use the `useReducedMotion` hook
  ([hooks/useReducedMotion.ts](hooks/useReducedMotion.ts)) or a CSS
  `@media (prefers-reduced-motion: reduce)` block.
- **One `<h1>` per page.** Section titles are `<h2>`, subsection titles
  `<h3>`. Don't skip levels.
- **Meaningful alt text** on every meaningful image. Decorative images use
  `alt=""`.

If you're not sure whether a change breaks any of these, run:

```bash
npm run build
```

The build catches Zod content errors, TypeScript errors, and layout errors.
It doesn't catch contrast — for that, use the contrast checker linked above
or drop into the site with axe DevTools installed.

---

## Common design tasks

### "I want to try a different primary accent color"
1. Change `--color-amber` in [app/globals.css](app/globals.css).
2. Reload `/styleguide` — the color card, the buttons, the marquee band, and
   the focus rings all update at once.
3. Verify the new color still passes AA against `ink` (dark bg).

### "I want a different display font"
1. Change the import in [app/layout.tsx](app/layout.tsx) — replace
   `Bricolage_Grotesque` with whatever `next/font/google` supports (or a
   `localFont` for a custom file).
2. All display-scale typography updates automatically.

### "I want to soften the section entrances"
Change `--duration-reveal` in globals.css (currently `800ms`). Or, for a
softer easing curve, change `--ease-kinfolk`. Both are mirrored in
[lib/easing.ts](lib/easing.ts) — update both for consistency.

### "I want to shorten the homepage"
Each section on the home is imported at the top of [app/page.tsx](app/page.tsx).
Comment out or reorder any of them freely.

### "I want the case-study gallery to be 2 up instead of scrolling"
Edit [components/work/GalleryStrip.tsx](components/work/GalleryStrip.tsx).
It's a single component, ~25 lines.

---

## What's placeholder right now

See [TODO.md](TODO.md) for the authoritative punch list. Short version for
a designer:

- **All photography** — placeholder gradients need real Black-gathering
  imagery.
- **Founder name, phone, domain, social handles** — placeholders in
  brand.ts.
- **Client names in case studies** — deliberately fake (`Client Name II`),
  do not treat as real.
- **Stats band numbers** — placeholder values.
- **Trust-strip logo names** — invented (`The Grand Hall`, etc.), do not
  treat as real partners.
- **Press strip mentions** — invented outlet names.
- **Journal cover images** — three shared gradients across all three posts.

Every placeholder is either an obviously-bracketed string (`[Founder Name]`)
or a clearly-labeled fake attribution (`Client Name — Wedding, 2025`), so
nothing false ships by accident. Replace them one at a time and check off
TODO.md as you go.
