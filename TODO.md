# TODO — Placeholders to resolve before launch

Every placeholder shipped in this build is listed here with its file and location.
Nothing false (testimonials, client names, awards, press, stats) is real — all of it
must be replaced with verified content before this site goes live.

## Brand facts (content/brand.ts)

- **Founder name** — `content/brand.ts`, `founder.name` — currently `"[Founder Name]"`.
- **Founder bio** — `content/brand.ts`, `founder.bio` — currently a placeholder sentence.
- **Booking email** — `content/brand.ts`, `contact.email` — currently `hello@kinfolksocialco.com` (unverified, not yet connected to an inbox).
- **Phone number** — `content/brand.ts`, `contact.phone` — currently `"[TODO — phone number]"`.
- **Domain** — `content/brand.ts`, `domain` — currently `kinfolksocialco.com` (unconfirmed — needs purchase/DNS check).
- **Social handles** — `content/brand.ts`, `social.*` — currently guessed handles, not verified to exist or be owned by this business.
- **Tagline** — `content/brand.ts`, `tagline` — drafted copy ("We build gatherings people remember on purpose."), not user-confirmed. Revise freely.

## Booking / inquiry destination

- No form backend is wired yet (Resend / HubSpot / Calendly / plain email). The contact
  form's server action currently needs a real destination — see `app/contact` when built
  in Phase 7.

## Photography

- All imagery is placeholder-sourced. Real photography must show real Black gatherings
  and be credited. Suggested sources: [Nappy.co](https://nappy.co), [CreateHER Stock](https://createherstock.com),
  and Unsplash's Black-creator collections. Every placeholder image's source and credit
  will be listed here as it's added, file by file.

## Placeholder imagery (Phase 3)

- **Mega menu preview panel** — `components/layout/MegaMenu.tsx` — gradient block standing
  in for a real image per nav item (Work/Services/About/Journal/Contact previews).
- **Newsletter form destination** — `components/forms/NewsletterForm.tsx` — validates and
  confirms client-side only; no email service is wired yet (needs the same booking
  destination decision as the contact form).

## Placeholder imagery (Phase 4 — home page)

- **All `/public/placeholders/*.svg` files** — abstract brand-colored gradients generated
  programmatically, not real photography. Every one needs replacing with real, credited
  images (see Photography above) before launch: `hero-1`/`hero-2` (Hero), `founder-portrait`
  (Intro statement), `project-1`–`project-6` (Featured work cards), `service-header-1`/
  `service-header-2` (Services heading), `journal-1`–`journal-3` (Journal teaser).
- Real photography assets should use `next/image` with a static import so `placeholder="blur"`
  generates automatically — the flat placeholder SVGs skip this since it adds no value for an
  instantly-rendered local gradient with zero real network latency.
- **Logo scroller** — `components/sections/LogoScroller.tsx` — six invented venue/press/brand
  names (e.g. "The Grand Hall"), not real partners.

## Placeholder imagery (Phase 5 — work index & case studies)

- **`gallery-a` through `gallery-f`** (`public/placeholders/`) — six shared gradient
  placeholders reused across all six case-study galleries rather than one unique file per
  slot. Replace with real per-project photography.
- Case study **venue names, vendor credits, and client quotes** — all invented
  (e.g. "Placeholder Floral Co.", "The Grand Hall (placeholder venue)") — see
  `content/projects.ts`. None of these vendors or venues exist; do not contact them.

## Placeholder content (Phase 6 — services, about, process)

- **Team members** — `content/team.ts` — two of three entries are fully invented
  (`[Team Member Name]`, role, and bio); only the founder entry mirrors `content/brand.ts`.
- **About narrative copy** — `app/about/page.tsx` — the founder-story and "What we stand for"
  paragraphs are placeholder marketing copy written around the placeholder founder name/bio.
  They deliberately avoid inventing specific biographical facts (no claimed history, prior
  employer, hometown, etc.) but still need a real pass once the founder's actual story and
  point of view are available.
- **`about-hero.svg`, `team-2.svg`, `team-3.svg`** (`public/placeholders/`) — gradient
  placeholders for the founder portrait and two team portraits.
- **Press/awards mentions** — `components/about/PressStrip.tsx` — four invented outlet names
  (e.g. "Placeholder Weddings Quarterly"). No real press coverage exists yet.

## Fabricated-by-design placeholders (never to be shipped as real)

- Testimonials — obviously fake, e.g. `"Client Name — Event Type, 2025"` — see
  `content/testimonials.ts`.
- Case study client names, guest counts, result lines, narrative copy, pull quotes, and
  client quotes — see `content/projects.ts`.
- "Numbers" / stats band (events produced, guests hosted, cities, years) — see
  `components/sections/StatBand.tsx`.
- Trust-strip logos (venues, brands, publications) — see `components/sections/LogoScroller.tsx`.
- Journal teaser posts — invented titles/excerpts in `components/sections/JournalTeaser.tsx`,
  pending real MDX content in a later phase.
- Services starting-investment figures — see `content/services.ts`.
- Press/awards strip on `/about`.

This section will grow as later build phases add content — each new placeholder gets
logged here with its file and line as it's introduced.
