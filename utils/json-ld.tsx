export interface OrganizationSchema {
  name: string;
  url: string;
  logo?: string;
  description?: string;
  contactPoint?: {
    telephone?: string;
    email?: string;
    contactType?: string;
  };
  sameAs?: string[]; // Social media URLs
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    postalCode?: string;
    addressCountry?: string;
  };
}

export interface WebsiteSchema {
  name: string;
  url: string;
  description?: string;
  potentialAction?: {
    query: string;
    target: string;
  };
}

export interface WebPageSchema {
  name: string;
  url: string;
  description?: string;
  isPartOf?: string; // Website URL
  datePublished?: string;
  dateModified?: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

/**
 * Generate Organization JSON-LD
 *
 * Présente votre entreprise à Google : nom, logo, contact, réseaux sociaux. Crucial pour le Knowledge Panel.
 *
 * **Utiliser sur :** Page d'accueil, layout racine, page À propos
 * **Exemples :** /, /about, ou dans app/layout.tsx pour tout le site
 */
export function generateOrganizationJsonLd(
  org: OrganizationSchema
): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: org.name,
    url: org.url,
  };

  if (org.logo) schema.logo = org.logo;
  if (org.description) schema.description = org.description;

  if (org.contactPoint) {
    schema.contactPoint = {
      "@type": "ContactPoint",
      ...org.contactPoint,
    };
  }

  if (org.sameAs && org.sameAs.length > 0) {
    schema.sameAs = org.sameAs;
  }

  if (org.address) {
    schema.address = {
      "@type": "PostalAddress",
      ...org.address,
    };
  }

  return schema;
}

/**
 * Generate Website JSON-LD
 *
 * Décrit votre site web dans son ensemble : nom, fonction de recherche.
 *
 * **Utiliser sur :** Layout racine (une fois par site)
 * **Exemples :** app/layout.tsx
 */
export function generateWebsiteJsonLd(
  website: WebsiteSchema
): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: website.name,
    url: website.url,
  };

  if (website.description) schema.description = website.description;

  if (website.potentialAction) {
    schema.potentialAction = {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: website.potentialAction.target,
      },
      "query-input": `required name=${website.potentialAction.query}`,
    };
  }

  return schema;
}

/**
 * Generate WebPage JSON-LD
 *
 * Schema générique pour n'importe quelle page. Utilisez-le quand il n'y a pas de schema plus spécifique.
 *
 * **Utiliser sur :** Toutes les pages sans schema spécifique
 * **Exemples :** Page d'accueil, pages génériques, pages de contenu
 */
export function generateWebPageJsonLd(
  page: WebPageSchema
): Record<string, unknown> {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.name,
    url: page.url,
  };

  if (page.description) schema.description = page.description;
  if (page.isPartOf) {
    schema.isPartOf = {
      "@type": "WebSite",
      "@id": page.isPartOf,
    };
  }
  if (page.datePublished) schema.datePublished = page.datePublished;
  if (page.dateModified) schema.dateModified = page.dateModified;

  return schema;
}

/**
 * Generate BreadcrumbList JSON-LD
 *
 * Fil d'Ariane de navigation. Google peut l'afficher dans les résultats pour montrer le chemin de navigation.
 *
 * **Utiliser sur :** Pages profondes avec navigation hiérarchique
 * **Exemples :** /services/depannage (Accueil > Services > Dépannage)
 */
export function generateBreadcrumbJsonLd(
  items: BreadcrumbItem[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate Service JSON-LD
 *
 * Décrit un service que vous proposez. Google comprend mieux ce que vous vendez.
 *
 * **Utiliser sur :** Pages de présentation de services individuels
 * **Exemples :** /services/depannage, /services/installation, /services/maintenance
 */
export function generateServiceJsonLd(service: {
  name: string;
  description: string;
  providerName: string;
  serviceType?: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: service.providerName,
    },
    ...(service.serviceType && { serviceType: service.serviceType }),
  };
}

/**
 * Generate Offer JSON-LD
 *
 * Affiche vos prix dans les résultats Google (Rich Results). Crucial pour les pages tarifaires.
 *
 * **Utiliser sur :** Page pricing, pages de forfaits/abonnements
 * **Exemples :** /pricing, /plans, /tarifs
 */
export function generateOfferJsonLd(offer: {
  name: string;
  description: string;
  price: string;
  priceCurrency: string;
  availability?: "InStock" | "OutOfStock" | "PreOrder";
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Offer",
    name: offer.name,
    description: offer.description,
    price: offer.price,
    priceCurrency: offer.priceCurrency,
    availability: `https://schema.org/${offer.availability || "InStock"}`,
  };
}

/**
 * Generate Product with Offers JSON-LD
 *
 * Combine un produit/service avec plusieurs offres tarifaires. Idéal pour page pricing avec plusieurs forfaits.
 *
 * **Utiliser sur :** Page pricing avec plusieurs options (Starter, Pro, Enterprise)
 * **Exemples :** /pricing avec tableau comparatif de forfaits
 */
export function generateProductWithOffersJsonLd(product: {
  name: string;
  description: string;
  offers: Array<{
    name: string;
    price: string;
    priceCurrency: string;
  }>;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    offers: product.offers.map((offer) => ({
      "@type": "Offer",
      name: offer.name,
      price: offer.price,
      priceCurrency: offer.priceCurrency,
      availability: "https://schema.org/InStock",
    })),
  };
}

/**
 * Generate FAQPage JSON-LD
 *
 * TRÈS IMPORTANT ! Google affiche vos FAQ directement dans les résultats de recherche (accordéon déroulant).
 * Maximum impact SEO et visibilité.
 *
 * **Utiliser sur :** Page FAQ uniquement
 * **Exemples :** /faq, /questions-frequentes, /aide
 */
export function generateFAQJsonLd(faqs: Array<{
  question: string;
  answer: string;
}>): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate AboutPage JSON-LD
 *
 * Indique explicitement à Google que c'est votre page "À propos". Renforce votre crédibilité.
 *
 * **Utiliser sur :** Page À propos uniquement
 * **Exemples :** /about, /a-propos, /qui-sommes-nous, /notre-histoire
 */
export function generateAboutPageJsonLd(about: {
  name: string;
  description: string;
  url: string;
  organizationName: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: about.name,
    description: about.description,
    url: about.url,
    mainEntity: {
      "@type": "Organization",
      name: about.organizationName,
    },
  };
}

/**
 * Generate ContactPage JSON-LD
 *
 * Optimise votre page contact pour les recherches "contact + nom entreprise".
 *
 * **Utiliser sur :** Page contact uniquement
 * **Exemples :** /contact, /nous-contacter
 */
export function generateContactPageJsonLd(contact: {
  name: string;
  url: string;
  organizationName: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: contact.name,
    url: contact.url,
    mainEntity: {
      "@type": "Organization",
      name: contact.organizationName,
    },
  };
}

/**
 * Helper to inject JSON-LD into Next.js page
 * Returns a script tag that can be inserted into <head>
 */
export function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}

/**
 * Combine multiple JSON-LD schemas into a single graph
 * Useful when you need multiple schemas on the same page
 */
export function combineJsonLdSchemas(
  schemas: Record<string, unknown>[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": schemas.map((schema) => {
      // Remove @context from individual schemas since we have it at the top level
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { "@context": _, ...rest } = schema;
      return rest;
    }),
  };
}
