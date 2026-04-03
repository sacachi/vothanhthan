import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://vothanhthan.com";

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${base}/artist`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/news`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/videos`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.5 },
  ];
}
