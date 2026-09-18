import type { Metadata } from "next";
import { JournalIndexGrid } from "@/components/journal/JournalIndexGrid";

export const metadata: Metadata = {
  title: "Journal",
  description: "Notes from the field — process, vendors, and craft.",
  alternates: { canonical: "/journal" },
};

export default function JournalPage() {
  return (
    <div className="px-6 pt-32 pb-24 sm:px-10 lg:px-16 lg:pb-32">
      <h1 className="font-display text-display-1 uppercase leading-[0.85]">Journal</h1>
      <p className="mt-6 max-w-[62ch] font-body text-body-lg text-smoke">
        Notes from the field — how we plan, who we work with, and why we do it the way we do.
      </p>

      <div className="mt-16">
        <JournalIndexGrid />
      </div>
    </div>
  );
}
