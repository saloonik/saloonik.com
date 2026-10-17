import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { industries } from "@/content/industries";

// No lastModified: a build timestamp on every URL tells crawlers nothing.
export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, siteConfig.url).toString();

  return [
    { url: url("/"), changeFrequency: "weekly", priority: 1 },
    { url: url("/funkcje"), changeFrequency: "monthly", priority: 0.9 },
    { url: url("/cennik"), changeFrequency: "monthly", priority: 0.9 },
    ...industries.map((i) => ({
      url: url(`/dla/${i.slug}`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: i.photo ? [url(i.photo.src)] : undefined,
    })),
    { url: url("/kontakt"), changeFrequency: "yearly", priority: 0.5 },
  ];
}
