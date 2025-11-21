export interface SitemapEntry {
  url: string;
  lastModified?: Date | string;
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
}

export interface SitemapConfig {
  baseUrl: string;
  defaultChangeFrequency?: SitemapEntry["changeFrequency"];
  defaultPriority?: number;
}

export function generateSitemapEntries(
  config: SitemapConfig,
  routes: Array<{
    path: string;
    lastModified?: Date | string;
    changeFrequency?: SitemapEntry["changeFrequency"];
    priority?: number;
  }>
): SitemapEntry[] {
  const {
    baseUrl,
    defaultChangeFrequency = "monthly",
    defaultPriority = 0.5,
  } = config;

  const entries: SitemapEntry[] = [];

  for (const route of routes) {
    entries.push({
      url: `${baseUrl}${route.path}`,
      lastModified: route.lastModified || new Date(),
      changeFrequency: route.changeFrequency || defaultChangeFrequency,
      priority: route.priority ?? defaultPriority,
    });
  }

  return entries;
}

/**
 * Format sitemap entries for Next.js sitemap.ts file
 * Compatible with Next.js App Router MetadataRoute.Sitemap
 **/

export function formatForNextJs(entries: SitemapEntry[]): Array<{
  url: string;
  lastModified?: Date | string;
  changeFrequency?: SitemapEntry["changeFrequency"];
  priority?: number;
}> {
  return entries.map((entry) => ({
    url: entry.url,
    lastModified: entry.lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}

/**
 * Helper pour fournir l'autocompletion TS et validation de type
 */
export function defineRoutes(
  routes: Array<{
    path: string;
    lastModified?: Date | string;
    changeFrequency?: SitemapEntry["changeFrequency"];
    priority?: number;
  }>
) {
  return routes;
}
