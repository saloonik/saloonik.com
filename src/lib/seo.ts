import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import type { FaqItem } from "@/content/faq";
import { plan } from "@/lib/pricing";

type PageMeta = {
  title?: string;
  description?: string;
  path: string;
};

export function buildMetadata({
  title,
  description,
  path,
}: PageMeta): Metadata {
  const desc = description ?? siteConfig.description;
  const url = new URL(path, siteConfig.url).toString();
  const socialTitle = title
    ? `${title} | ${siteConfig.name}`
    : `${siteConfig.name} — ${siteConfig.tagline}`;
  return {
    // an explicit undefined title would wipe the layout default
    ...(title && { title }),
    description: desc,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      url,
      title: socialTitle,
      description: desc,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
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
    legalName: company.legalName,
    vatID: `PL${company.nip}`,
    taxID: company.nip,
    address: {
      "@type": "PostalAddress",
      streetAddress: company.street,
      postalCode: company.postalCode,
      addressLocality: company.city,
      addressCountry: "PL",
    },
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

export function softwareJsonLd(industry?: {
  name: string;
  slug: string;
  metaDescription: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    description: industry?.metaDescription ?? siteConfig.description,
    url: industry ? abs(`/dla/${industry.slug}`) : siteConfig.url,
    ...(industry && {
      audience: { "@type": "BusinessAudience", name: industry.name },
    }),
    image: abs(
      industry ? `/dla/${industry.slug}/opengraph-image` : "/opengraph-image",
    ),
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
        valueAddedTaxIncluded: true,
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
