import type { Metadata } from "next";

export interface MetadataOptions {
  canonicalUrl?: string;
  //optimal ratio image : 1200 x 630 (1.91:1)
  //second ratio : 800 x 420
  //PNG only
  images?: {
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  }[];
  robots?: {
    index?: boolean;
    follow?: boolean;
    noarchive?: boolean;
    nosnippet?: boolean;
    noimageindex?: boolean;
  };
}

export function generatePageMetadata(
  title: string,
  description: string,
  options?: MetadataOptions
): Metadata {
  const metadata: Metadata = {
    title,
    description,
  };

  // Canonical URL
  if (options?.canonicalUrl) {
    metadata.alternates = {
      canonical: options.canonicalUrl,
    };
  }

  // OpenGraph + Twitter cards
  if (options?.images) {
    metadata.openGraph = {
      title,
      description,
      images: options.images,
    };
    metadata.twitter = {
      card: 'summary_large_image',
      title,
      description,
      images: options.images.map(img => img.url),
    };
  }

  // Robots
  if (options?.robots) {
    metadata.robots = options.robots;
  }

  return metadata;
}


export function buildCanonicalUrl(
  baseUrl: string,
  path: string
): string {
  // Remove trailing slash from baseUrl
  const cleanBaseUrl = baseUrl.replace(/\/$/, "");

  // Ensure path starts with /
  const cleanPath = path.startsWith("/") ? path : `/${path}`;

  return `${cleanBaseUrl}${cleanPath}`;
}
