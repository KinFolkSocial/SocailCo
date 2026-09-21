# Kinfolk Social Co. — Website

Marketing site for the Atlanta-based event planning studio. Next.js 16 App
Router, TypeScript strict, Tailwind CSS v4, Motion + GSAP + Lenis.

---

## Quickstart

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The site hot-reloads on
file changes.

**Verification before every commit:**

```bash
npm run lint && npx tsc --noEmit && npm run build
```

All three must be clean.

---

## Tech stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack, Server Components by default) |
| Language | TypeScript, `strict: true` |
| Styling | Tailwind CSS v4 with `@theme` tokens — no arbitrary hex in JSX |
| Fonts | `next/font/google` — Bricolage Grotesque (display) + Inter (body), `display: swap` |
| Animation | [motion](https://motion.dev) for component-level, GSAP + ScrollTrigger for scroll-driven, [Lenis](https://lenis.darkroom.engineering) for smooth scroll |
| Forms | React Hook Form + Zod, Server Actions |
| Content | Typed TS files in `/content` + MDX for journal posts |
| Deployment | Vercel |

**Structural rules:**
- Server Components by default. Add `"use client"` only when the component needs interactivity, browser APIs, or animation.
- No component library. UI primitives live in [components/ui/](components/ui).
- No arbitrary color hex values in JSX. Every color comes from a token in [app/globals.css](app/globals.css).
- `prefers-reduced-motion: reduce` is honored across every animation, including Lenis and marquees. Never bypass this.

---

## Project layout

```
app/                      Next.js App Router
  layout.tsx              Root layout — fonts, JSON-LD, header, footer, skip link
  template.tsx            Per-navigation transition wrapper (page fade/rise)
  page.tsx                Home (composed of 11 sections in components/sections/)
  work/                   Portfolio index + case-study template
    [slug]/               Dynamic case-study page + per-slug opengraph-image
  services/               Services page (pinned sections, Process timeline, FAQ)
  about/                  Founder story, team grid, values, press strip
  journal/                MDX index + [slug] template + per-slug opengraph-image
  contact/                Multi-step inquiry form + Server Action
  styleguide/             Every UI + motion primitive rendered (noindex)
  opengraph-image.tsx     Default OG image
  sitemap.ts              Enumerates every route
  robots.ts               Allows / disallows /styleguide
  not-found.tsx           404
  error.tsx               Error boundary
  globals.css             All design tokens (@theme layer)

components/
  layout/                 Header, MegaMenu, Footer, SmoothScrollProvider, PageTransition
  ui/                     Button, HoverSwapLink, Marquee, Chip, Field, Accordion, Cursor
  motion/                 RevealText, RevealImage, StaggerGroup, Parallax, CountUp, StickyStack
  sections/               Home-page sections (Hero, WorkGrid, Services, etc.)
  work/                   Case-study components (CaseStudy, GalleryStrip, CategoryFilter, PrevNextLinks)
  services/               ServiceSection (pinned title / scrolling detail)
  about/                  TeamGrid, PressStrip
  journal/                JournalIndexGrid, JournalPostView, ReadingProgressBar, JournalCategoryFilter
  forms/                  InquiryForm, NewsletterForm, PillRadioGroup
  seo/                    JsonLd

content/                  Typed content, Zod-validated at import
  brand.ts                Company name, tagline, markets, founder, contact, socials
  services.ts             Five service tiers
  projects.ts             Six case studies (metadata + narrative + gallery + credits)
  testimonials.ts         Client quotes
  team.ts                 Team member entries (founder mirrors brand.ts)
  faqs.ts                 Service page FAQ
  journal.ts              Journal post metadata + MDX loader map
  journal/*.mdx           Post bodies

hooks/
  useReducedMotion.ts     Live-tracks prefers-reduced-motion via useSyncExternalStore
  useFocusTrap.ts         Focus trap + Escape handler for the MegaMenu
  useMounted.ts           Post-hydration flag for progressive enhancement

lib/
  cn.ts                   clsx wrapper
  easing.ts               Brand motion curve + durations
  navigation.ts           Primary nav config
  inquiry.ts              Contact form schema + option lists
  seo.ts                  JSON-LD builders (Organization, Breadcrumb, CaseStudy, FAQ)

public/placeholders/      Brand-colored gradient SVGs
```

---

## Editing content

All copy, photography paths, and business facts live under `/content` as typed
TypeScript. Zod schemas at the bottom of each file validate at import time —
bad content fails the build rather than the page.

| File | What it holds |
|---|---|
| [content/brand.ts](content/brand.ts) | Company name, tagline, founder name/bio, email/phone, domain, socials |
| [content/services.ts](content/services.ts) | Five services with title, summary, included list, timeline, starting investment |
| [content/projects.ts](content/projects.ts) | Six case studies (metadata + narrative + gallery + vendor credits + client quote) |
| [content/testimonials.ts](content/testimonials.ts) | Homepage carousel quotes |
| [content/team.ts](content/team.ts) | Team members (founder pulls from brand.ts) |
| [content/faqs.ts](content/faqs.ts) | `/services` FAQ accordion (also powers FAQPage JSON-LD) |
| [content/journal.ts](content/journal.ts) | Post metadata + slug → MDX loader map |
| [content/journal/*.mdx](content/journal) | Post bodies (Markdown + inline MDX components) |

### Adding a journal post

1. Add the `.mdx` file under [content/journal/](content/journal).
2. Register it in [content/journal.ts](content/journal.ts): add an entry to
   `journalPosts` (metadata) *and* to `journalLoaders` (dynamic import).
3. Optional: add a cover image to `/public/placeholders` and reference it.

### Adding a case study

Add an entry to `projects` in [content/projects.ts](content/projects.ts). It
must include `slug`, `client`, `eventType`, `category`, `year`, `location`,
`venue`, `guestCount`, `resultLine`, `servicesDelivered`, `cover`, `coverAlt`,
`aspect`, `gallery`, `narrative`, `pullQuote`, `clientQuote`, and
`vendorCredits`. Zod will tell you at build time if anything's missing.
`generateStaticParams` picks it up automatically.

---

## Design tokens

Every color, font, easing, duration, and type step is a CSS custom property
declared in the `@theme` block at the top of [app/globals.css](app/globals.css).
Tailwind v4 generates matching utility classes for each token (e.g.
`--color-amber` → `bg-amber`, `text-amber`, `border-amber`).

**Never write arbitrary hex in JSX.** If you need a color that doesn't exist,
add a token first, then use the utility.

See [HANDOFF.md](HANDOFF.md) for a designer-facing walkthrough of the tokens.

The `/styleguide` route renders every token, type step, button state, and
motion primitive on one page. It's `noindex` and safe to visit any time.

---

## SEO

- Per-route `canonical` + `openGraph` + `twitter` metadata via
  `generateMetadata` or `export const metadata`.
- Sitewide Organization + LocalBusiness JSON-LD in the root layout.
- Per-route BreadcrumbList + CreativeWork on `/work/[slug]`, Article on
  `/journal/[slug]`, FAQPage on `/services`.
- Dynamic OG images pre-rendered per slug via [`next/og`](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image).
- [app/sitemap.ts](app/sitemap.ts) enumerates every route; [app/robots.ts](app/robots.ts)
  allows `/` and disallows `/styleguide`.

Everything SEO-related is domain-dependent via the `content/brand.ts` domain field.

---

## Accessibility

- WCAG 2.1 AA for color contrast, verified page-by-page with axe-core
  ([HANDOFF.md#accessibility-guardrails](HANDOFF.md#accessibility-guardrails)
  covers the smoke/shale split that keeps both dark and light backgrounds AA).
- One `<h1>` per page; heading levels never skip.
- Focus rings on every focusable element via a global `:focus-visible` rule.
- Full keyboard operation for MegaMenu (focus trap, Escape closes, focus
  returns to trigger), the testimonial carousel (arrow keys + buttons), and
  the case-study gallery strip (tabindex + arrow-key scroll).
- `prefers-reduced-motion: reduce` is honored by 20 components via the
  `useReducedMotion` hook, plus a CSS-level fallback in `globals.css` that
  caps every animation to 0.01ms.

**When making changes, don't:**
- Remove `:focus-visible` styles.
- Add new colors that don't clear AA against their background — [HANDOFF.md](HANDOFF.md)
  has the palette contrast matrix.
- Add animations without a reduced-motion path.

---

## Contact form

The multi-step inquiry form at `/contact` is a single always-complete `<form>`
that degrades to a plain long form without JavaScript. Once hydrated, a
`useMounted` flag CSS-hides all but the current step. Submission runs through
a Server Action in [app/contact/actions.ts](app/contact/actions.ts) — honeypot
check, in-memory rate limit, and Zod re-validation server-side.

**Currently the action just `console.log`s the payload** — no email/CRM backend destination is wired yet.

---

## CMS migration path

Content is structured to accept a headless CMS (Sanity recommended) without
touching components. Every `/content/*.ts` file exports:

1. A Zod schema (e.g. `ProjectSchema`)
2. A typed constant (e.g. `projects: Project[]`)
3. Optional lookup helpers (e.g. `getProjectBySlug`)

To migrate, keep the schema, replace the constant with data fetched from the
CMS (e.g. in a `cache()`d server function), and update the lookup helpers to
call it. Components import the type, not the constant, so they don't change.

MDX bodies (`content/journal/*.mdx`) are the exception — those move to
portable text and a MDX-remote renderer. The metadata layer in `journal.ts`
stays the same.

---

## Deployment

Deploy to [Vercel](https://vercel.com). No custom build configuration needed —
the framework preset handles everything.

**Environment variables:** none required today. When the contact form is wired
to a real backend, this will change (Resend key, HubSpot token, etc.). Log any
new vars here.

**Domain:** the `metadataBase`, canonical URLs, sitemap entries, and OG image
URLs all resolve against `brand.domain` in
[content/brand.ts](content/brand.ts). Update that field before pointing DNS.

---

## Useful commands

```bash
npm run dev             # dev server (Turbopack, port 3000)
npm run build           # production build; static-generates every route it can
npm run start           # serve production build (test perf here, not in dev)
npm run lint            # eslint (next core-web-vitals + TS rules)
npx tsc --noEmit        # type-check without emitting
```

---

## Production Readiness

Review photography, domain settings, and contact form destinations before final launch.
"# SocailCo" 
