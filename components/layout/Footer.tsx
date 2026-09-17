import { brand } from "@/content/brand";
import { primaryNav } from "@/lib/navigation";
import { HoverSwapLink } from "@/components/ui/HoverSwapLink";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

const socialLinks = [
  { label: "Instagram", href: brand.social.instagram },
  { label: "Pinterest", href: brand.social.pinterest },
  { label: "TikTok", href: brand.social.tiktok },
];

export function Footer() {
  return (
    <footer className="border-t border-smoke/30 bg-ink px-6 pt-20 pb-10 text-bone sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <p className="font-body text-label uppercase text-smoke">{brand.markets.primary} — start a conversation</p>
        <a
          href={`mailto:${brand.contact.email}`}
          className="mt-4 block break-words font-display text-display-1 lowercase leading-[0.9] text-bone transition-colors hover:text-amber"
        >
          {brand.contact.email}
        </a>

        <div className="mt-16 grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div>
            <p className="font-body text-label uppercase text-smoke">Navigate</p>
            <nav aria-label="Footer" className="mt-4 flex flex-col gap-2">
              {primaryNav.map((item) => (
                <HoverSwapLink key={item.href} href={item.href} className="font-body text-body">
                  {item.label}
                </HoverSwapLink>
              ))}
            </nav>
          </div>

          <div>
            <p className="font-body text-label uppercase text-smoke">Follow</p>
            <nav aria-label="Social" className="mt-4 flex flex-col gap-2">
              {socialLinks.map((item) => (
                <HoverSwapLink
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-body"
                >
                  {item.label}
                </HoverSwapLink>
              ))}
            </nav>
          </div>

          <div className="col-span-2">
            <p className="font-body text-label uppercase text-smoke">Newsletter</p>
            <div className="mt-4 max-w-sm">
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-smoke/30 pt-8 text-sm text-smoke sm:flex-row sm:items-center sm:justify-between">
          <p className="font-body">
            © {new Date().getFullYear()} {brand.legalName}. All rights reserved.
          </p>
          <p className="font-body">{brand.contact.responseTime}</p>
          <p className="font-body">{brand.contact.phone}</p>
        </div>
      </div>
    </footer>
  );
}
