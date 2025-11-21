// Types JSON-LD
type JsonLdBase = {
  "@context": string;
  "@type": string;
};

type OrganizationJsonLd = JsonLdBase & {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  contactPoint?: {
    "@type": string;
    telephone?: string;
    email?: string;
    contactType: string;
  };
};

type WebsiteJsonLd = JsonLdBase & {
  name: string;
  url: string;
  description?: string;
  publisher?: {
    "@type": string;
    name: string;
  };
};

type WebPageJsonLd = JsonLdBase & {
  name: string;
  url: string;
  description?: string;
  isPartOf?: string;
};

type FAQJsonLd = JsonLdBase & {
  mainEntity: Array<{
    "@type": string;
    name: string;
    acceptedAnswer: {
      "@type": string;
      text: string;
    };
  }>;
};

type ProductJsonLd = JsonLdBase & {
  name: string;
  description?: string;
  offers?: Array<{
    "@type": string;
    name: string;
    price: string;
    priceCurrency: string;
  }>;
};

/**
 * Generate JSON-LD for an organization
 */
export function generateOrganizationJsonLd(data: {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  phone?: string;
  email?: string;
}): OrganizationJsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: data.name,
    url: data.url,
    ...(data.logo && { logo: data.logo }),
    ...(data.description && { description: data.description }),
    ...((data.phone || data.email) && {
      contactPoint: {
        "@type": "ContactPoint",
        ...(data.phone && { telephone: data.phone }),
        ...(data.email && { email: data.email }),
        contactType: "customer service",
      },
    }),
  };
}

/**
 * Generate JSON-LD for a website
 */
export function generateWebsiteJsonLd(data: {
  name: string;
  url: string;
  description?: string;
}): WebsiteJsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: data.name,
    url: data.url,
    ...(data.description && { description: data.description }),
  };
}

/**
 * Generate JSON-LD for a web page
 */
export function generateWebPageJsonLd(data: {
  name: string;
  url: string;
  description?: string;
  isPartOf?: string;
}): WebPageJsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: data.name,
    url: data.url,
    ...(data.description && { description: data.description }),
    ...(data.isPartOf && { isPartOf: data.isPartOf }),
  };
}

/**
 * Generate JSON-LD for FAQ
 */
export function generateFAQJsonLd(
  questions: Array<{ question: string; answer: string }>
): FAQJsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };
}

/**
 * Generate JSON-LD for product with offers
 */
export function generateProductWithOffersJsonLd(data: {
  name: string;
  description?: string;
  offers: Array<{
    name: string;
    price: string;
    priceCurrency: string;
  }>;
}): ProductJsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: data.name,
    ...(data.description && { description: data.description }),
    offers: data.offers.map((offer) => ({
      "@type": "Offer",
      name: offer.name,
      price: offer.price,
      priceCurrency: offer.priceCurrency,
    })),
  };
}

/**
 * Combine multiple JSON-LD schemas
 */
export function combineJsonLdSchemas(schemas: JsonLdBase[]): { "@graph": JsonLdBase[] } {
  return {
    "@graph": schemas,
  };
}

/**
 * Generate JSON-LD script tag for page injection
 * Use with dangerouslySetInnerHTML in React component
 */
export function generateJsonLdScript(data: object): string {
  return JSON.stringify(data);
}
