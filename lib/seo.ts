import { brand } from "@/content/brand";
import type { Project } from "@/content/projects";
import type { Faq } from "@/content/faqs";

export const siteUrl = `https://${brand.domain}`;

export function absoluteUrl(path: string): string {
  return new URL(path, siteUrl).toString();
}

/**
 * Sitewide Organization + LocalBusiness node.
 */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: brand.name,
    legalName: brand.legalName,
    url: siteUrl,
    description: brand.tagline,
    email: brand.contact.email,
    telephone: brand.contact.phone,
    areaServed: brand.markets.primary,
    address: {
      "@type": "PostalAddress",
      addressLocality: brand.markets.primary,
    },
    sameAs: [brand.social.instagram, brand.social.pinterest, brand.social.tiktok],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function caseStudyJsonLd(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: `${project.eventType} — ${project.resultLine}`,
    description: project.narrative[0],
    image: absoluteUrl(project.cover),
    datePublished: String(project.year),
    author: {
      "@type": "Organization",
      name: brand.name,
    },
    about: project.eventType,
    locationCreated: project.location,
  };
}

export function faqPageJsonLd(items: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
