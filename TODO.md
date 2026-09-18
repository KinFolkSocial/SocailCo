# TODO — Design & content punch list

Every placeholder shipped in this build, grouped so a designer, copywriter,
and site owner can each work in parallel.

Nothing false is presented as real — every placeholder is either an obviously
bracketed string (`[Founder Name]`), a clearly-fake attribution (`Client Name
— Wedding, 2025`), or an invented outlet name (`Placeholder Weddings
Quarterly`). All items marked below need real replacements before launch.

---

## 🎨 For the designer

### Photography — every image is placeholder

All files under `/public/placeholders/` are brand-colored gradient SVGs
generated programmatically, not real photography. Replace each with a real,
credited image before launch (see [HANDOFF.md](HANDOFF.md#photography) for
the sourcing guide and cultural direction).

- [ ] `hero-1.svg`, `hero-2.svg` — inline in the Hero headline
- [ ] `founder-portrait.svg` — Intro statement portrait, also used on `/about`
- [ ] `about-hero.svg` — About page hero portrait
- [ ] `team-2.svg`, `team-3.svg` — Team grid portraits
- [ ] `project-1.svg` – `project-6.svg` — Case-study covers
- [ ] `gallery-a.svg` – `gallery-f.svg` — Six shared gradients reused across
      all six case-study galleries. Each case study needs its own set of
      real per-project photography (currently the same six placeholders
      are recycled).
- [ ] `service-header-1.svg`, `service-header-2.svg` — Inline in the Services
      section header
- [ ] `journal-1.svg`, `journal-2.svg`, `journal-3.svg` — Post covers (also
      reused as journal-teaser thumbnails on the homepage)

**When adding real photography**, use `next/image` with a static import so
`placeholder="blur"` generates automatically. Credit every image inline here
as you add it.

### Mega menu preview panel
[`components/layout/MegaMenu.tsx`](components/layout/MegaMenu.tsx) — the
preview panel that changes on nav-link hover is currently a gradient block.
Replace with a real hero image per nav item (Work / Services / About /
Journal / Contact).

### Brand color palette
The default palette in [`app/globals.css`](app/globals.css) is the one
proposed in the brief — ink, bone, amber, clay, jade, smoke, shale. It has
not been user-confirmed; feel free to retune. Any change to a color
requires re-verifying WCAG AA contrast — see
[HANDOFF.md](HANDOFF.md#accessibility-guardrails).

---

## ✍️ For copywriting

### Brand facts (content/brand.ts)

- [ ] **Founder name** — `founder.name` — currently `"[Founder Name]"`
- [ ] **Founder bio** — `founder.bio` — placeholder sentence
- [ ] **Tagline** — `tagline` — drafted as "We build gatherings people
      remember on purpose." Not user-confirmed.

### About page narrative
[`app/about/page.tsx`](app/about/page.tsx) — the founder-story hero
paragraph and the "What we stand for" statement are placeholder marketing
copy written around the placeholder founder name/bio. They deliberately
avoid inventing biographical facts (no history, employer, or hometown), but
still need a real pass once the founder's actual story is available.

### Team members (content/team.ts)
- [ ] Two of three entries are fully invented (`[Team Member Name]`, role,
      bio). Only the founder mirrors `brand.ts`.

### Case-study copy (content/projects.ts)
The narrative, pull quote, vendor credits, and client quote for each of the
six case studies is invented. Replace each once real events land in the
portfolio.

### Testimonials (content/testimonials.ts)
Four fake attributions (`Client Name — Wedding, 2025`). Replace with real
client quotes only. Never invent.

### Stats band (components/sections/StatBand.tsx)
Four placeholder counters: events produced, guests hosted, cities, years.
Replace with real totals only.

### Trust-strip logos (components/sections/LogoScroller.tsx)
Six invented venue/press/brand names (`The Grand Hall`, `Southern Table
Co.`, etc.). No real partnerships exist yet; replace or remove the strip
before launch.

### Press strip (components/about/PressStrip.tsx)
Four invented outlet names. No real press coverage exists yet.

### Journal posts (content/journal/*.mdx)
Three fully-written placeholder posts. The advice is reasonable but the
specifics ("we ran the timeline backward from sunset") are invented, not
sourced from real events. Rewrite or replace with real journal entries.

### Services starting-investment figures (content/services.ts)
Five placeholder dollar bands. Confirm with the studio and replace.

### FAQ answers (content/faqs.ts)
Eight real policy questions I drafted with reasonable defaults, not
fabricated stats or claims. Have the studio confirm each answer matches
actual policy before launch.

### Inquiry-form option bands (lib/inquiry.ts)
The "budget range" and "guest count" pill groups on the contact form are
reasonable guesses (e.g. Under $10k / $10–25k / $25–50k / $50k+). Confirm
these bands with the studio.

---

## 🔧 For the site owner / engineer

### Contact form destination
[`app/contact/actions.ts`](app/contact/actions.ts) — the Server Action
validates, honeypot-checks, and rate-limits a submission, then only
`console.log`s it. Nothing is delivered anywhere real yet. Pick one and
wire it in:

- [ ] Resend (transactional email)
- [ ] HubSpot / Salesforce (CRM)
- [ ] Plain SMTP
- [ ] Calendly / booking tool
- [ ] Something else

Same gap applies to
[`components/forms/NewsletterForm.tsx`](components/forms/NewsletterForm.tsx) —
currently client-side confirmation only.

### Rate limit store
Current rate limit is in-memory only (`app/contact/actions.ts`). Fine for a
traditional single-server deploy; on Vercel/serverless this resets per
request. Switch to a shared store (Upstash Redis or similar) before
relying on it in production.

### Contact facts (content/brand.ts)
- [ ] `contact.phone` — currently `"[TODO — phone number]"`
- [ ] `contact.email` — currently `hello@kinfolksocialco.com`, unverified;
      confirm inbox exists and connects to the contact-form destination
      above
- [ ] `domain` — currently `kinfolksocialco.com`, unconfirmed. Purchase or
      confirm DNS, then update. Sitemap, canonical URLs, and OG images
      all resolve against this field.
- [ ] `social.*` — three guessed handles (`instagram.com/kinfolksocialco`,
      etc.), not verified.

### SEO
- [ ] `lib/seo.ts` — `organizationJsonLd()` deliberately omits `telephone`
      because `brand.contact.phone` is still a placeholder. Add the field
      once the phone number is real.

### Deployment
No custom Vercel config needed — the framework preset handles it. Before
first deploy:

- [ ] Point the domain (see `content/brand.ts`)
- [ ] Set any env vars introduced when the contact-form destination is
      wired
- [ ] Confirm `robots.ts` still disallows `/styleguide`

---

## Reference: original placeholder inventory by phase

Kept for the audit trail — every placeholder above was introduced in one of
these build phases:

- **Phase 1–2**: design tokens, styleguide route (noindex).
- **Phase 3**: mega menu preview panel, newsletter form.
- **Phase 4**: `hero-*`, `founder-portrait`, `project-1`–`6`, `service-header-*`,
  `journal-1`–`3`, logo scroller names.
- **Phase 5**: `gallery-a`–`f`, case-study venue/vendor/client-quote strings.
- **Phase 6**: team members, about narrative, `about-hero.svg`, `team-2/3.svg`,
  press strip.
- **Phase 7**: journal posts (`content/journal/*.mdx`), inquiry-form option bands.
- **Phase 8**: FAQ answers, JSON-LD telephone omission.
- **Phase 9**: audit fixes only (smoke → smoke + shale palette split, gallery
  strip keyboard access) — no new placeholders introduced.
