import { z } from "zod";

export const ProjectCategory = z.enum(["wedding", "corporate", "milestone", "social", "brand"]);
export type ProjectCategoryValue = z.infer<typeof ProjectCategory>;

export const categoryLabels: Record<ProjectCategoryValue, string> = {
  wedding: "Weddings",
  corporate: "Corporate",
  milestone: "Milestone",
  social: "Social",
  brand: "Brand",
};

export const GalleryImageSchema = z.object({
  src: z.string(),
  alt: z.string(),
});

export const VendorCreditSchema = z.object({
  role: z.string(),
  name: z.string(),
});

export const ProjectSchema = z.object({
  slug: z.string(),
  client: z.string(),
  eventType: z.string(),
  category: ProjectCategory,
  year: z.number(),
  location: z.string(),
  venue: z.string(),
  guestCount: z.string(),
  resultLine: z.string(),
  servicesDelivered: z.array(z.string()).min(1),
  cover: z.string(),
  coverAlt: z.string(),
  aspect: z.enum(["portrait", "landscape", "square"]),
  gallery: z.array(GalleryImageSchema).min(1),
  narrative: z.array(z.string()).min(1),
  pullQuote: z.string(),
  clientQuote: z.object({ quote: z.string(), attribution: z.string() }),
  vendorCredits: z.array(VendorCreditSchema).min(1),
});

export type Project = z.infer<typeof ProjectSchema>;

/**
 * All six entries are placeholders by design — no real client names,
 * numbers, venues, vendors, or quotes exist yet. See TODO.md. Gallery
 * images reuse a small shared set of gradient placeholders rather than one
 * unique file per slot.
 */
export const projects: Project[] = [
  {
    slug: "golden-hour-gala",
    client: "Client Name",
    eventType: "Corporate Gala",
    category: "corporate",
    year: 2025,
    location: "Atlanta, GA",
    venue: "The Grand Hall (placeholder venue)",
    guestCount: "400 guests",
    resultLine: "400 guests, one golden hour",
    servicesDelivered: ["Creative direction", "Vendor sourcing", "Full day-of production"],
    cover: "/placeholders/project-1.svg",
    coverAlt: "Placeholder cover image for the Golden Hour Gala case study",
    aspect: "landscape",
    gallery: [
      { src: "/placeholders/gallery-a.svg", alt: "Placeholder gallery image — reception detail" },
      { src: "/placeholders/gallery-b.svg", alt: "Placeholder gallery image — guests arriving" },
      { src: "/placeholders/gallery-c.svg", alt: "Placeholder gallery image — stage lighting" },
      { src: "/placeholders/gallery-d.svg", alt: "Placeholder gallery image — tablescape" },
    ],
    narrative: [
      "The brief was simple to say and hard to do: make a corporate gala feel like a real party, not a networking event with a stage. Golden hour became the whole design logic — every sightline, every lighting cue, timed to it.",
      "We built the run-of-show backward from sunset, coordinating five vendor teams so the room transformed in under twelve minutes while guests were on the terrace for cocktail hour.",
      "By the time doors opened, the space read as one continuous idea rather than a series of separately-booked vendors — which was always the point.",
    ],
    pullQuote: "Every sightline, every lighting cue, timed to golden hour.",
    clientQuote: {
      quote: "They understood the assignment before we could fully explain it.",
      attribution: "Client Name — Corporate Gala, 2025",
    },
    vendorCredits: [
      { role: "Venue", name: "The Grand Hall (placeholder)" },
      { role: "Florals", name: "Placeholder Floral Co." },
      { role: "Catering", name: "Placeholder Catering Group" },
      { role: "Lighting", name: "Placeholder Lighting Design" },
    ],
  },
  {
    slug: "three-city-wedding",
    client: "Client Name II",
    eventType: "Wedding",
    category: "wedding",
    year: 2025,
    location: "Atlanta → Charleston → New Orleans",
    venue: "Three venues (placeholder)",
    guestCount: "600 guests",
    resultLine: "600 guests, 3 cities, one weekend",
    servicesDelivered: ["Full planning & design", "Multi-city logistics", "Guest travel coordination"],
    cover: "/placeholders/project-2.svg",
    coverAlt: "Placeholder cover image for the Three-City Wedding case study",
    aspect: "portrait",
    gallery: [
      { src: "/placeholders/gallery-b.svg", alt: "Placeholder gallery image — first look" },
      { src: "/placeholders/gallery-e.svg", alt: "Placeholder gallery image — second line procession" },
      { src: "/placeholders/gallery-a.svg", alt: "Placeholder gallery image — reception toast" },
      { src: "/placeholders/gallery-f.svg", alt: "Placeholder gallery image — closing brunch" },
    ],
    narrative: [
      "Three cities in one weekend meant the plan had to survive being wrong about something — a flight delay, a truck stuck in traffic — without the couple ever knowing it happened.",
      "We ran a duplicate vendor bench in every city so nothing was a single point of failure, and briefed a traveling production lead to hold continuity across all three days.",
      "The couple's only job all weekend was to show up. Everything else moved around them.",
    ],
    pullQuote: "The plan had to survive being wrong about something.",
    clientQuote: {
      quote: "Three cities, one weekend, zero panic. I still don't know how they pulled it off.",
      attribution: "Client Name II — Wedding, 2025",
    },
    vendorCredits: [
      { role: "Lead Venue", name: "Placeholder Atlanta Estate" },
      { role: "Travel Coordination", name: "Placeholder Travel Partners" },
      { role: "Florals", name: "Placeholder Floral Co." },
      { role: "Photography", name: "Placeholder Studio" },
    ],
  },
  {
    slug: "homecoming-tailgate",
    client: "Client Name III",
    eventType: "Brand Activation",
    category: "brand",
    year: 2024,
    location: "Atlanta, GA",
    venue: "Placeholder Stadium Grounds",
    guestCount: "1,200 guests",
    resultLine: "1,200 guests, one homecoming",
    servicesDelivered: ["Concept & staging", "Vendor sourcing", "On-site production"],
    cover: "/placeholders/project-3.svg",
    coverAlt: "Placeholder cover image for the Homecoming Tailgate case study",
    aspect: "landscape",
    gallery: [
      { src: "/placeholders/gallery-c.svg", alt: "Placeholder gallery image — tailgate lounge setup" },
      { src: "/placeholders/gallery-d.svg", alt: "Placeholder gallery image — brand activation booth" },
      { src: "/placeholders/gallery-f.svg", alt: "Placeholder gallery image — crowd energy" },
    ],
    narrative: [
      "A brand activation only works if it doesn't feel like one. We built the tailgate around HBCU homecoming traditions first, brand presence second — never the other way around.",
      "Modular staging let us stand up a 1,200-guest footprint in six hours and strike it in three, with zero disruption to the surrounding campus grounds.",
    ],
    pullQuote: "Brand presence second, tradition first — never the other way around.",
    clientQuote: {
      quote: "Our summit ran exactly on time. We never once felt it.",
      attribution: "Client Name III — Brand Activation, 2024",
    },
    vendorCredits: [
      { role: "Staging", name: "Placeholder Structures Co." },
      { role: "Catering", name: "Placeholder Catering Group" },
      { role: "Sound & AV", name: "Placeholder AV Partners" },
    ],
  },
  {
    slug: "fiftieth-anniversary",
    client: "Client Name IV",
    eventType: "Milestone Celebration",
    category: "milestone",
    year: 2024,
    location: "Atlanta, GA",
    venue: "Placeholder Family Estate",
    guestCount: "180 guests",
    resultLine: "3 generations, one dance floor",
    servicesDelivered: ["Creative direction", "Guest experience design", "Full day-of production"],
    cover: "/placeholders/project-4.svg",
    coverAlt: "Placeholder cover image for the Fiftieth Anniversary case study",
    aspect: "square",
    gallery: [
      { src: "/placeholders/gallery-a.svg", alt: "Placeholder gallery image — family portraits" },
      { src: "/placeholders/gallery-b.svg", alt: "Placeholder gallery image — dance floor" },
      { src: "/placeholders/gallery-e.svg", alt: "Placeholder gallery image — toast" },
    ],
    narrative: [
      "Fifty years called for a room that could hold three generations at once — a dance floor for grandchildren, a quiet corner for old friends, and a table plan that didn't leave that decision to chance.",
      "We built the evening's pacing around one unscripted moment: the couple's first dance, moved to the very end, after everyone else had already had theirs.",
    ],
    pullQuote: "A dance floor for grandchildren, a quiet corner for old friends.",
    clientQuote: {
      quote: "It felt like they'd known our family for years, not months.",
      attribution: "Client Name IV — Milestone Celebration, 2024",
    },
    vendorCredits: [
      { role: "Florals", name: "Placeholder Floral Co." },
      { role: "Catering", name: "Placeholder Catering Group" },
      { role: "Music", name: "Placeholder Live Band" },
    ],
  },
  {
    slug: "diversity-summit",
    client: "Client Name V",
    eventType: "Corporate Summit",
    category: "corporate",
    year: 2024,
    location: "Atlanta, GA",
    venue: "Placeholder Conference Center",
    guestCount: "850 attendees",
    resultLine: "850 attendees, 2 days, 1 stage",
    servicesDelivered: ["Concept & staging", "Vendor & venue sourcing", "Post-event reporting"],
    cover: "/placeholders/project-5.svg",
    coverAlt: "Placeholder cover image for the Diversity Summit case study",
    aspect: "landscape",
    gallery: [
      { src: "/placeholders/gallery-d.svg", alt: "Placeholder gallery image — main stage" },
      { src: "/placeholders/gallery-c.svg", alt: "Placeholder gallery image — breakout session" },
      { src: "/placeholders/gallery-f.svg", alt: "Placeholder gallery image — networking lounge" },
      { src: "/placeholders/gallery-a.svg", alt: "Placeholder gallery image — closing panel" },
    ],
    narrative: [
      "Two days, one stage, eight hundred and fifty attendees who needed the schedule to actually hold. We built a production timeline with built-in slack at every transition, so one long keynote never cascaded into a missed lunch.",
      "The room's format changed four times across the two days — plenary, breakout, panel, gala — without a single dead hour of load-in visible to attendees.",
    ],
    pullQuote: "Built-in slack at every transition, so nothing cascaded.",
    clientQuote: {
      quote: "Our summit ran exactly on time across two days and eight hundred attendees.",
      attribution: "Client Name V — Corporate Summit, 2024",
    },
    vendorCredits: [
      { role: "Venue", name: "Placeholder Conference Center" },
      { role: "AV Production", name: "Placeholder AV Partners" },
      { role: "Catering", name: "Placeholder Catering Group" },
    ],
  },
  {
    slug: "second-line-reception",
    client: "Client Name VI",
    eventType: "Wedding",
    category: "wedding",
    year: 2023,
    location: "New Orleans, LA",
    venue: "Placeholder French Quarter Hall",
    guestCount: "220 guests",
    resultLine: "One second line through the French Quarter",
    servicesDelivered: ["Full planning & design", "Vendor sourcing", "Day-of production"],
    cover: "/placeholders/project-6.svg",
    coverAlt: "Placeholder cover image for the Second Line Reception case study",
    aspect: "portrait",
    gallery: [
      { src: "/placeholders/gallery-e.svg", alt: "Placeholder gallery image — second line brass band" },
      { src: "/placeholders/gallery-b.svg", alt: "Placeholder gallery image — parasols and guests" },
      { src: "/placeholders/gallery-a.svg", alt: "Placeholder gallery image — reception hall" },
    ],
    narrative: [
      "A second line isn't a photo op — it's a real New Orleans tradition, and the couple wanted it done right, not staged for content. We worked with a local brass band and a parade permit, not a stock playlist.",
      "Guests carried handkerchiefs and parasols through three blocks of the French Quarter before arriving at the reception hall already dancing.",
    ],
    pullQuote: "A real tradition, not staged for content.",
    clientQuote: {
      quote: "It felt like our whole neighborhood showed up to walk with us.",
      attribution: "Client Name VI — Wedding, 2023",
    },
    vendorCredits: [
      { role: "Brass Band", name: "Placeholder Second Line Band" },
      { role: "Venue", name: "Placeholder French Quarter Hall" },
      { role: "Catering", name: "Placeholder Catering Group" },
    ],
  },
];

z.array(ProjectSchema).parse(projects);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string): { prev: Project | null; next: Project | null } {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return { prev: null, next: null };
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return { prev, next };
}
