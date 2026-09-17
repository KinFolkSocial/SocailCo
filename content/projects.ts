import { z } from "zod";

export const ProjectSchema = z.object({
  slug: z.string(),
  client: z.string(),
  eventType: z.string(),
  year: z.number(),
  location: z.string(),
  guestCount: z.string(),
  resultLine: z.string(),
  cover: z.string(),
  coverAlt: z.string(),
});

export type Project = z.infer<typeof ProjectSchema>;

/**
 * All six entries are placeholders by design — no real client names,
 * numbers, or venues exist yet. See TODO.md.
 */
export const projects: Project[] = [
  {
    slug: "golden-hour-gala",
    client: "Client Name",
    eventType: "Corporate Gala",
    year: 2025,
    location: "Atlanta, GA",
    guestCount: "400 guests",
    resultLine: "400 guests, one golden hour",
    cover: "/placeholders/project-1.svg",
    coverAlt: "Placeholder cover image for the Golden Hour Gala case study",
  },
  {
    slug: "three-city-wedding",
    client: "Client Name II",
    eventType: "Wedding",
    year: 2025,
    location: "Atlanta → Charleston → New Orleans",
    guestCount: "600 guests",
    resultLine: "600 guests, 3 cities, one weekend",
    cover: "/placeholders/project-2.svg",
    coverAlt: "Placeholder cover image for the Three-City Wedding case study",
  },
  {
    slug: "homecoming-tailgate",
    client: "Client Name III",
    eventType: "Brand Activation",
    year: 2024,
    location: "Atlanta, GA",
    guestCount: "1,200 guests",
    resultLine: "1,200 guests, one homecoming",
    cover: "/placeholders/project-3.svg",
    coverAlt: "Placeholder cover image for the Homecoming Tailgate case study",
  },
  {
    slug: "fiftieth-anniversary",
    client: "Client Name IV",
    eventType: "Milestone Celebration",
    year: 2024,
    location: "Atlanta, GA",
    guestCount: "180 guests",
    resultLine: "3 generations, one dance floor",
    cover: "/placeholders/project-4.svg",
    coverAlt: "Placeholder cover image for the Fiftieth Anniversary case study",
  },
  {
    slug: "diversity-summit",
    client: "Client Name V",
    eventType: "Corporate Summit",
    year: 2024,
    location: "Atlanta, GA",
    guestCount: "850 attendees",
    resultLine: "850 attendees, 2 days, 1 stage",
    cover: "/placeholders/project-5.svg",
    coverAlt: "Placeholder cover image for the Diversity Summit case study",
  },
  {
    slug: "second-line-reception",
    client: "Client Name VI",
    eventType: "Wedding",
    year: 2023,
    location: "New Orleans, LA",
    guestCount: "220 guests",
    resultLine: "One second line through the French Quarter",
    cover: "/placeholders/project-6.svg",
    coverAlt: "Placeholder cover image for the Second Line Reception case study",
  },
];

z.array(ProjectSchema).parse(projects);
