import { z } from "zod";

export const FaqSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export type Faq = z.infer<typeof FaqSchema>;

export const faqs: Faq[] = [
  {
    question: "How far in advance should we book?",
    answer:
      "Most full-planning clients book 9–14 months out. Month-of coordination and design-only styling can move faster — sometimes just a few months.",
  },
  {
    question: "Do you travel outside Atlanta?",
    answer:
      "Yes — the studio is based in Atlanta and works nationally, with travel built into every proposal from the start.",
  },
  {
    question: "What's the difference between full planning and month-of coordination?",
    answer:
      "Full planning means we're involved from concept through the day itself — design, vendors, budget, all of it. Month-of coordination means you've built the plan and we step in a few weeks out to run it.",
  },
  {
    question: "Can we mix and match services?",
    answer:
      "Often, yes. A lot of clients start with design and styling and add day-of production later. Tell us what you already have and we'll tell you honestly what's missing.",
  },
  {
    question: "Do you have a minimum budget?",
    answer:
      "Each service has a starting investment listed above — those are a floor, not a target. We'll tell you early if a vision and a budget don't match, rather than let it become a surprise later.",
  },
  {
    question: "What if our date isn't confirmed yet?",
    answer:
      "That's fine — a lot of full-planning engagements start before a date is locked. Put \"TBD\" on the inquiry form and we'll work through venue and date together.",
  },
  {
    question: "Do you work with vendors we've already booked?",
    answer:
      "Yes. We'll fold in vendors you trust and fill any gaps from our own bench — we're not precious about who gets the credit, just about how the day comes together.",
  },
  {
    question: "How do we start?",
    answer:
      "Send an inquiry with your event type, rough date, and vision. We reply within one business day with next steps.",
  },
];

z.array(FaqSchema).parse(faqs);
