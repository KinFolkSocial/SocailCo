export type NavItem = {
  label: string;
  href: string;
  preview: string;
};

/**
 * Primary site navigation. Shared between the header's inline links and the
 * full-screen mega menu (which additionally uses `preview` for the
 * image-on-hover panel). Not CMS content — this is routing structure, so it
 * stays a plain constant rather than a typed /content file.
 */
export const primaryNav: NavItem[] = [
  { label: "Work", href: "/work", preview: "A second line, guests mid-step, motion caught wide." },
  { label: "Services", href: "/services", preview: "Full planning, design, and day-of production." },
  { label: "About", href: "/about", preview: "The studio's people, philosophy, and point of view." },
  { label: "Journal", href: "/journal", preview: "Notes from the field — process, vendors, craft." },
  { label: "Contact", href: "/contact", preview: "Start an inquiry — most replies land same day." },
];
