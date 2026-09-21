import { z } from "zod";
import { brand } from "@/content/brand";

export const TeamMemberSchema = z.object({
  slug: z.string(),
  name: z.string(),
  role: z.string(),
  bio: z.string(),
  portrait: z.string(),
});

export type TeamMember = z.infer<typeof TeamMemberSchema>;

/**
 * The founder entry mirrors content/brand.ts's founder fields so the two
 * never drift.
 */
export const team: TeamMember[] = [
  {
    slug: "founder",
    name: brand.founder.name,
    role: brand.founder.title,
    bio: brand.founder.bio,
    portrait: "/images/team/founder-portrait.jpg",
  },
  {
    slug: "lead-planner",
    name: "Maya Jenkins",
    role: "Senior Event Strategist",
    bio: "Runs point on every full-planning client from first call to load-out, and keeps every vendor relationship warm between events.",
    portrait: "/images/team/team-2.jpg",
  },
  {
    slug: "design-director",
    name: "Marcus Vance",
    role: "Lead Production Director",
    bio: "Builds the mood boards, sources the florals, and makes sure every room looks like it belongs to one idea, not five vendors.",
    portrait: "/images/team/team-3.jpg",
  },
];

z.array(TeamMemberSchema).parse(team);
