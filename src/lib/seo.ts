import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import type { FaqItem } from "@/content/faq";
import { plan } from "@/lib/pricing";

type PageMeta = {
  title?: string;
  description?: string;
  path: string;
};

/** Metadata strony z canonical i OG. OG image dostarczają pliki opengraph-image.tsx. */
export function buildMetadata({ title, description, path }: PageMeta): Metadata {
  const desc = description ?? siteConfig.description;
  const url = new URL(path, siteConfig.url).toString();
  return {
    title: title ?? undefined,
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      url,
      title: title ?? siteConfig.tagline,
      description: desc,
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? siteConfig.tagline,
      description: desc,
    },
  };
}

const abs = (path: string) => new URL(path, siteConfig.url).toString();

const company = siteConfig.company;

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": abs("/#organization"),
    name: siteConfig.name,
    ...(company.legalName ? { legalName: company.legalName } : {}),
    ...(company.nip ? { vatID: `PL${company.nip}` } : {}),
    ...(company.address ? { address: company.address } : {}),
    url: siteConfig.url,
    logo: abs("/icon.svg"),
    email: siteConfig.contactEmail,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: siteConfig.contactEmail,
      availableLanguage: "pl",
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": abs("/#website"),
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "pl-PL",
    publisher: { "@id": abs("/#organization") },
  };
}

export function softwareJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "Appointment scheduling software",
    operatingSystem: "Web",
    inLanguage: "pl-PL",
    publisher: { "@id": abs("/#organization") },
    offers: {
      "@type": "Offer",
      price: plan.monthlyPrice,
      priceCurrency: "PLN",
      url: abs("/cennik"),
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: plan.monthlyPrice,
        priceCurrency: "PLN",
        unitCode: "MON",
        valueAddedTaxIncluded: false,
      },
    },
  };
}

export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Strona główna", path: "/" }, ...items].map(
      (item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: abs(item.path),
      }),
    ),
  };
}
