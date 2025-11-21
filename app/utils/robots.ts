import type { MetadataRoute } from "next";

/**
 * Standard robots.txt configuration for showcase site
 * Allows full indexation by all robots
 */
export function standardShowcaseRobots(baseUrl: string): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

/**
 * Development environment robots.txt configuration
 * Blocks all robots
 */
export function developmentRobots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}

/**
 * Custom robots.txt configuration
 */
export function customRobots(
  rules: MetadataRoute.Robots["rules"],
  sitemap?: string
): MetadataRoute.Robots {
  return {
    rules,
    ...(sitemap && { sitemap }),
  };
}
