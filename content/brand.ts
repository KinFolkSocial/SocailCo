import { z } from "zod";

/**
 * Single source of truth for company identity copy. Structured so a headless
 * CMS (Sanity) can replace this file later without touching components —
 * every consumer imports the `brand` object, never hardcodes these values.
 */

export const BrandSchema = z.object({
  name: z.string(),
  shortName: z.string(),
  legalName: z.string(),
  tagline: z.string(),
  markets: z.object({
    primary: z.string(),
    note: z.string(),
  }),
  eventTypes: z.array(z.string()).min(1),
  founder: z.object({
    name: z.string(),
    title: z.string(),
    bio: z.string(),
  }),
  contact: z.object({
    email: z.string().email(),
    phone: z.string(),
    responseTime: z.string(),
  }),
  domain: z.string(),
  social: z.object({
    instagram: z.string(),
    pinterest: z.string(),
    tiktok: z.string(),
  }),
});

export type Brand = z.infer<typeof BrandSchema>;

export const brand: Brand = {
  name: "Kinfolk Social Co.",
  shortName: "Kinfolk",
  legalName: "Kinfolk Social Co.",
  tagline: "We build gatherings people remember on purpose.",
  markets: {
    primary: "Atlanta, GA",
    note: "based in Atlanta, available for travel nationwide",
  },
  eventTypes: [
    "Luxury weddings",
    "Corporate galas & activations",
    "Milestone celebrations",
    "Brand experiences",
  ],
  founder: {
    // TODO(brand): replace with real founder name — see TODO.md
    name: "[Founder Name]",
    title: "Founder & Creative Director",
    // TODO(brand): replace with real one-line bio — see TODO.md
    bio: "[One-line founder bio placeholder — background, point of view, and why this studio exists.]",
  },
  contact: {
    // TODO(brand): confirm real inbox / booking destination — see TODO.md
    email: "hello@kinfolksocialco.com",
    // TODO(brand): confirm real phone number — see TODO.md
    phone: "[TODO — phone number]",
    responseTime: "We reply within one business day.",
  },
  // TODO(brand): confirm/purchase real domain — see TODO.md
  domain: "kinfolksocialco.com",
  social: {
    // TODO(brand): confirm real social handles — see TODO.md
    instagram: "https://instagram.com/kinfolksocialco",
    pinterest: "https://pinterest.com/kinfolksocialco",
    tiktok: "https://tiktok.com/@kinfolksocialco",
  },
};

// Validate at module load so bad content fails the build, not the page.
BrandSchema.parse(brand);
