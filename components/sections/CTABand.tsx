import Link from "next/link";
import { Marquee } from "@/components/ui/Marquee";

export function CTABand() {
  return (
    <Link href="/contact" aria-label="Start an inquiry" className="block">
      <Marquee text="LET'S PLAN SOMETHING ✦" tone="amber" />
    </Link>
  );
}
