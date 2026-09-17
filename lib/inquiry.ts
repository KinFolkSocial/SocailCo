import { z } from "zod";

export const eventTypeValues = ["wedding", "corporate", "milestone", "social", "brand"] as const;
export const guestCountValues = ["under-50", "50-150", "150-300", "300-plus"] as const;
export const budgetRangeValues = ["under-10k", "10k-25k", "25k-50k", "50k-plus"] as const;

export const eventTypeOptions: { value: (typeof eventTypeValues)[number]; label: string }[] = [
  { value: "wedding", label: "Wedding" },
  { value: "corporate", label: "Corporate" },
  { value: "milestone", label: "Milestone celebration" },
  { value: "social", label: "Social gathering" },
  { value: "brand", label: "Brand activation" },
];

export const guestCountOptions: { value: (typeof guestCountValues)[number]; label: string }[] = [
  { value: "under-50", label: "Under 50" },
  { value: "50-150", label: "50–150" },
  { value: "150-300", label: "150–300" },
  { value: "300-plus", label: "300+" },
];

export const budgetRangeOptions: { value: (typeof budgetRangeValues)[number]; label: string }[] = [
  { value: "under-10k", label: "Under $10,000" },
  { value: "10k-25k", label: "$10,000 – $25,000" },
  { value: "25k-50k", label: "$25,000 – $50,000" },
  { value: "50k-plus", label: "$50,000+" },
];

export const InquirySchema = z.object({
  eventType: z.enum(eventTypeValues, { message: "Choose an event type." }),
  eventDate: z.string().min(1, 'Enter a date, or "TBD".'),
  location: z.string().min(2, "Enter a city or venue."),
  guestCount: z.enum(guestCountValues, { message: "Choose a guest count." }),
  budgetRange: z.enum(budgetRangeValues, { message: "Choose a budget range." }),
  name: z.string().min(2, "Enter your name."),
  email: z.string().email("Enter a valid email address."),
  phone: z.string().min(7, "Enter a phone number."),
  details: z.string().min(10, "Tell us a little more — at least 10 characters."),
  // Honeypot — real users never fill this in; bots that autofill every field do.
  company: z.string().max(0).optional(),
});

export type InquiryValues = z.infer<typeof InquirySchema>;

export const inquirySteps: { id: string; title: string; fields: (keyof InquiryValues)[] }[] = [
  { id: "event-type", title: "What kind of event is it?", fields: ["eventType"] },
  { id: "date", title: "When is it?", fields: ["eventDate"] },
  { id: "location", title: "Where is it?", fields: ["location"] },
  { id: "guest-count", title: "About how many guests?", fields: ["guestCount"] },
  { id: "budget", title: "What's the budget range?", fields: ["budgetRange"] },
  { id: "contact", title: "How can we reach you?", fields: ["name", "email", "phone"] },
  { id: "details", title: "Tell us about it", fields: ["details"] },
];
