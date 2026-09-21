import type { Metadata } from "next";
import { WorkIndexGrid } from "@/components/work/WorkIndexGrid";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Case studies across weddings, corporate galas, milestone celebrations, and brand activations.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <div className="px-6 pt-32 pb-24 sm:px-10 lg:px-16 lg:pb-32">
      <h1 className="font-display text-display-1 uppercase leading-[0.85]">Work</h1>
      <p className="mt-6 max-w-[62ch] font-body text-body-lg text-smoke">
        Six case studies across luxury weddings, corporate galas, milestone celebrations, and brand activations.
      </p>

      <div className="mt-16">
        <WorkIndexGrid />
      </div>
    </div>
  );
}
