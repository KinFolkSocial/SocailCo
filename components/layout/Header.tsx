"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { brand } from "@/content/brand";
import { Button } from "@/components/ui/Button";
import { MegaMenu } from "@/components/layout/MegaMenu";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-5 sm:px-10 lg:px-16">
      <Link href="/" className="font-display text-label uppercase text-bone">
        {brand.shortName}
      </Link>

      <div className="flex items-center gap-6">
        <div className="hidden sm:block">
          <Button href="/contact" size="default">
            Plan with us
          </Button>
        </div>

        <button
          ref={triggerRef}
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={menuOpen}
          className="group relative inline-block overflow-hidden py-1 font-body text-label uppercase text-bone"
        >
          <span className="block transition-transform duration-[var(--duration-micro)] ease-[var(--ease-kinfolk)] group-hover:-translate-y-full">
            Menu
          </span>
          <span
            aria-hidden="true"
            className="absolute inset-0 block translate-y-full text-amber transition-transform duration-[var(--duration-micro)] ease-[var(--ease-kinfolk)] group-hover:translate-y-0"
          >
            Menu
          </span>
        </button>
      </div>

      <MegaMenu open={menuOpen} onClose={() => setMenuOpen(false)} triggerRef={triggerRef} />
    </header>
  );
}
