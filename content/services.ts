import { z } from "zod";

export const ServiceSchema = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  included: z.array(z.string()).min(1),
  timeline: z.string(),
  startingInvestment: z.string(),
});

export type Service = z.infer<typeof ServiceSchema>;

export const services: Service[] = [
  {
    slug: "full-planning",
    title: "Full Planning & Design",
    summary: "Start-to-finish direction — concept, vendors, budget, and every detail of the day itself.",
    included: ["Creative direction", "Vendor sourcing & booking", "Budget management", "Full day-of production"],
    timeline: "9–14 months",
    startingInvestment: "Starting at $35,000 — placeholder, see TODO.md",
  },
  {
    slug: "month-of-coordination",
    title: "Month-Of Coordination",
    summary: "You've built the vision — we step in to run it, so nothing falls on you the week of.",
    included: ["Vendor confirmations", "Timeline & floor plan", "Rehearsal direction", "Day-of production team"],
    timeline: "6–8 weeks out",
    startingInvestment: "Starting at $6,500 — placeholder, see TODO.md",
  },
  {
    slug: "corporate-brand-activations",
    title: "Corporate & Brand Activations",
    summary: "Galas, summits, and brand moments produced with the same craft as our private events.",
    included: ["Concept & staging", "Vendor & venue sourcing", "On-site production", "Post-event reporting"],
    timeline: "3–6 months",
    startingInvestment: "Starting at $25,000 — placeholder, see TODO.md",
  },
  {
    slug: "milestone-celebrations",
    title: "Milestone Celebrations",
    summary: "Birthdays, anniversaries, homecomings — the gatherings that mark a real chapter.",
    included: ["Creative direction", "Vendor sourcing", "Guest experience design", "Day-of production"],
    timeline: "4–6 months",
    startingInvestment: "Starting at $12,000 — placeholder, see TODO.md",
  },
  {
    slug: "design-styling",
    title: "Design & Styling Only",
    summary: "Already have a planner? We bring the look — tablescapes, florals, lighting, and staging.",
    included: ["Mood boards & renderings", "Rental & florist sourcing", "On-site styling", "Teardown coordination"],
    timeline: "2–4 months",
    startingInvestment: "Starting at $8,000 — placeholder, see TODO.md",
  },
];

z.array(ServiceSchema).parse(services);
