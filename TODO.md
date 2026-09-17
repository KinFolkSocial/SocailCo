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

## Fabricated-by-design placeholders (never to be shipped as real)

- Testimonials — obviously fake, e.g. `"Client Name — Event Type, 2025"`.
- Case study client names, guest counts, and result lines.
- "Numbers" / stats band (events produced, guests hosted, cities, years).
- Trust-strip logos (venues, brands, publications).
- Press/awards strip on `/about`.

This section will grow as later build phases add content — each new placeholder gets
logged here with its file and line as it's introduced.
