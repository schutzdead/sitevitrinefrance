import type { MetadataRoute } from "next";

export interface SitemapEntry {
  path: string;
  lastModified?: string | Date;
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
}

export interface SitemapConfig {
  baseUrl: string;
  defaultChangeFrequency?: SitemapEntry["changeFrequency"];
  defaultPriority?: number;
}

/**
 * Generate sitemap entries
 */
export function generateSitemapEntries(
  config: SitemapConfig,
  entries: SitemapEntry[]
): MetadataRoute.Sitemap {
  const {
    baseUrl,
    defaultChangeFrequency = "monthly",
    defaultPriority = 0.7,
  } = config;

  return entries.map((entry) => ({
    url: `${baseUrl}${entry.path}`,
    lastModified: entry.lastModified || new Date(),
    changeFrequency: entry.changeFrequency || defaultChangeFrequency,
    priority: entry.priority !== undefined ? entry.priority : defaultPriority,
  }));
}

/**
 * Format entries for Next.js
 */
export function formatForNextJs(
  entries: MetadataRoute.Sitemap
): MetadataRoute.Sitemap {
  return entries;
}
