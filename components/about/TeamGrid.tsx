import Image from "next/image";
import type { TeamMember } from "@/content/team";
import { RevealImage } from "@/components/motion/RevealImage";

/** Portrait scales and a short bio slides up over it on hover/focus. */
export function TeamGrid({ members }: { members: TeamMember[] }) {
  return (
    <div className="grid grid-cols-1 gap-10 sm:grid-cols-3">
      {members.map((member) => (
        <div key={member.slug} className="group" tabIndex={0}>
          <RevealImage className="aspect-[4/5] w-full overflow-hidden rounded-2xl">
            <div className="relative size-full">
              <Image
                src={member.portrait}
                alt={`Portrait of ${member.name}, ${member.role.toLowerCase()}`}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-[var(--duration-reveal)] ease-[var(--ease-kinfolk)] group-hover:scale-105 group-focus-visible:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
              <div
                className="absolute inset-x-0 bottom-0 translate-y-3 p-6 opacity-0 transition-all duration-[var(--duration-reveal)] ease-[var(--ease-kinfolk)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
              >
                <p className="font-body text-sm text-bone">{member.bio}</p>
              </div>
            </div>
          </RevealImage>
          <p className="mt-4 font-display text-display-3">{member.name}</p>
          <p className="mt-1 font-body text-sm uppercase tracking-[0.15em] text-smoke">{member.role}</p>
        </div>
      ))}
    </div>
  );
}
