import type { MetadataRoute } from "next";
import { industries } from "@/lib/industries";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: absoluteUrl("/"), lastModified, changeFrequency: "monthly", priority: 1 },
    ...industries.map((i) => ({
      url: absoluteUrl(`/industries/${i.slug}`),
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: absoluteUrl("/company"), lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/about"), lastModified, changeFrequency: "monthly", priority: 0.7 },
    {
      url: absoluteUrl("/apply/strategic-collaboration"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: absoluteUrl("/apply/strategic-conversation"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    { url: absoluteUrl("/apply/join-team"), lastModified, changeFrequency: "yearly", priority: 0.5 },
    { url: absoluteUrl("/privacy"), lastModified, changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/terms"), lastModified, changeFrequency: "yearly", priority: 0.2 },
  ];
}
