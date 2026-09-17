import { z } from "zod";

export const TestimonialSchema = z.object({
  quote: z.string(),
  attribution: z.string(),
});

export type Testimonial = z.infer<typeof TestimonialSchema>;

/** Obviously-fake attributions by design — no real client quotes exist yet. See TODO.md. */
export const testimonials: Testimonial[] = [
  {
    quote:
      "They understood the assignment before we could fully explain it. Every detail felt considered, nothing felt default.",
    attribution: "Client Name — Wedding, 2025",
  },
  {
    quote:
      "Our summit ran exactly on time across two days and eight hundred attendees. We never once felt it.",
    attribution: "Client Name — Corporate Summit, 2024",
  },
  {
    quote: "It felt like they'd known our family for years, not months. That's the whole difference.",
    attribution: "Client Name — Milestone Celebration, 2024",
  },
  {
    quote: "Three cities, one weekend, zero panic. I still don't know how they pulled it off.",
    attribution: "Client Name II — Wedding, 2025",
  },
];

z.array(TestimonialSchema).parse(testimonials);
