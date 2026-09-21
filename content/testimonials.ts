import { z } from "zod";

export const TestimonialSchema = z.object({
  quote: z.string(),
  attribution: z.string(),
});

export type Testimonial = z.infer<typeof TestimonialSchema>;

/** Client testimonials and attributions. */
export const testimonials: Testimonial[] = [
  {
    quote:
      "They understood the assignment before we could fully explain it. Every detail felt considered, nothing felt default.",
    attribution: "Nia & Marcus Vance — Wedding, 2025",
  },
  {
    quote:
      "Our summit ran exactly on time across two days and eight hundred attendees. We never once felt it.",
    attribution: "Global Innovation Alliance — Corporate Summit, 2024",
  },
  {
    quote: "It felt like they'd known our family for years, not months. That's the whole difference.",
    attribution: "The Washington Family — Milestone Celebration, 2024",
  },
  {
    quote: "Three cities, one weekend, zero panic. I still don't know how they pulled it off.",
    attribution: "Maya & Devon Jenkins — Wedding, 2025",
  },
];

z.array(TestimonialSchema).parse(testimonials);
