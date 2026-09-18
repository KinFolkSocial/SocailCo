"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-32 text-center">
      <p className="font-body text-label uppercase text-clay">Error</p>
      <h1 className="font-display text-display-1 uppercase leading-[0.85]">Something broke</h1>
      <p className="max-w-[46ch] font-body text-body-lg text-smoke">
        Something went wrong loading this page. It&apos;s on us — try again, or head back home.
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-6">
        <Button onClick={reset}>Try again</Button>
        <Button href="/" variant="secondary">
          Back to home
        </Button>
      </div>
    </div>
  );
}
