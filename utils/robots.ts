/**
 * Robots.txt generation utilities for Next.js App Router
 * Provides type-safe robots.txt configuration
 */

export interface RobotsRule {
  userAgent: string | string[];
  allow?: string | string[];
  disallow?: string | string[];
  crawlDelay?: number;
}

export interface RobotsConfig {
  rules: RobotsRule | RobotsRule[];
  sitemap?: string | string[];
  host?: string;
}

/**
 * Generate robots.txt configuration for Next.js
 * Compatible with Next.js App Router MetadataRoute.Robots
 *
 * @example
 * ```ts
 * // app/robots.ts
 * import type { MetadataRoute } from 'next';
 * import { generateRobots } from '@utils/robots';
 *
 * export default function robots(): MetadataRoute.Robots {
 *   return generateRobots({
 *     rules: {
 *       userAgent: '*',
 *       allow: '/',
 *       disallow: '/admin'
 *     },
 *     sitemap: 'https://example.com/sitemap.xml'
 *   });
 * }
 * ```
 */
export function generateRobots(config: RobotsConfig): {
  rules: Array<{
    userAgent: string | string[];
    allow?: string | string[];
    disallow?: string | string[];
    crawlDelay?: number;
  }>;
  sitemap?: string | string[];
  host?: string;
} {
  const rules = Array.isArray(config.rules) ? config.rules : [config.rules];

  return {
    rules,
    ...(config.sitemap && { sitemap: config.sitemap }),
    ...(config.host && { host: config.host }),
  };
}

/**
 * Preset: Standard showcase/vitrine website robots.txt
 * Allows all crawlers, references sitemap
 *
 * @example
 * ```ts
 * export default function robots(): MetadataRoute.Robots {
 *   return standardShowcaseRobots('https://example.com');
 * }
 * ```
 */
export function standardShowcaseRobots(baseUrl: string) {
  return generateRobots({
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  });
}

/**
 * Preset: Development/staging robots.txt
 * Disallows all crawlers to prevent indexing
 *
 * @example
 * ```ts
 * export default function robots(): MetadataRoute.Robots {
 *   return process.env.NODE_ENV === 'production'
 *     ? standardShowcaseRobots('https://example.com')
 *     : developmentRobots();
 * }
 * ```
 */
export function developmentRobots() {
  return generateRobots({
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  });
}


/**
 * Advanced: Custom robots configuration with multiple user agents
 *
 * @example
 * ```ts
 * export default function robots(): MetadataRoute.Robots {
 *   return advancedRobots('https://example.com', {
 *     allowPaths: ['/'],
 *     disallowPaths: ['/admin', '/api']
 *   });
 * }
 * ```
 */
export function advancedRobots(
  baseUrl: string,
  options: {
    allowPaths?: string[];
    disallowPaths?: string[];
    specificRules?: RobotsRule[];
  }
) {
  const { allowPaths = ["/"], disallowPaths = [], specificRules = [] } = options;

  return generateRobots({
    rules: [
      {
        userAgent: "*",
        allow: allowPaths,
        ...(disallowPaths.length > 0 && { disallow: disallowPaths }),
      },
      ...specificRules,
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  });
}
