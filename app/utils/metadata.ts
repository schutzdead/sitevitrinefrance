import { Metadata } from 'next';

interface MetadataOptions {
  canonicalUrl?: string;
  images?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  }[];
  noindex?: boolean;
}

/**
 * Génère les métadonnées pour une page
 *
 * @param title - Le titre de la page
 * @param description - La description de la page
 * @param options - Options supplémentaires (canonical, images, noindex)
 * @returns Les métadonnées Next.js
 */
export function generatePageMetadata(
  title: string,
  description: string,
  options: MetadataOptions = {}
): Metadata {
  const { canonicalUrl, images, noindex = false } = options;

  const metadata: Metadata = {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'fr_FR',
      ...(canonicalUrl && { url: canonicalUrl }),
      ...(images && { images }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(images && images[0] && { images: [images[0].url] }),
    },
    ...(canonicalUrl && {
      alternates: {
        canonical: canonicalUrl,
      },
    }),
    ...(noindex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };

  return metadata;
}
