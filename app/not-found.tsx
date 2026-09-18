import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-32 text-center">
      <p className="font-body text-label uppercase text-amber">404</p>
      <h1 className="font-display text-display-1 uppercase leading-[0.85]">Not here</h1>
      <p className="max-w-[46ch] font-body text-body-lg text-smoke">
        That page doesn&apos;t exist — it may have moved, or the link might be wrong.
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-6">
        <Button href="/">Back to home</Button>
        <Button href="/work" variant="secondary">
          See our work
        </Button>
      </div>
    </div>
  );
}
