import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { industries } from "@/content/industries";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const url = (path: string) => new URL(path, siteConfig.url).toString();

  return [
    { url: url("/"), lastModified, changeFrequency: "weekly", priority: 1 },
    {
      url: url("/funkcje"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: url("/cennik"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...industries.map((i) => ({
      url: url(`/dla/${i.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: url("/kontakt"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];
}
