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
 * never drift — everything else here is an invented placeholder teammate.
 * See TODO.md.
 */
export const team: TeamMember[] = [
  {
    slug: "founder",
    name: brand.founder.name,
    role: brand.founder.title,
    bio: brand.founder.bio,
    portrait: "/placeholders/founder-portrait.svg",
  },
  {
    slug: "lead-planner",
    name: "[Team Member Name]",
    role: "Lead Planner",
    bio: "Runs point on every full-planning client from first call to load-out, and keeps every vendor relationship warm between events.",
    portrait: "/placeholders/team-2.svg",
  },
  {
    slug: "design-director",
    name: "[Team Member Name]",
    role: "Design Director",
    bio: "Builds the mood boards, sources the florals, and makes sure every room looks like it belongs to one idea, not five vendors.",
    portrait: "/placeholders/team-3.svg",
  },
];

z.array(TeamMemberSchema).parse(team);
