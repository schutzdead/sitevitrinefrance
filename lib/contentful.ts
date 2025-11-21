import contentData from '@/lib/content.json';

export interface HeroContent {
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  image: {
    src: string;
    alt: string;
  };
}

export interface ComparisonContent {
  badge: string;
  title: string;
  subtitle: string;
  beforeLabel: string;
  afterLabel: string;
  beforeTitle: string;
  beforePoints: string[];
  afterTitle: string;
  afterPoints: string[];
  beforeImage: {
    src: string;
    alt: string;
  };
  afterImage: {
    src: string;
    alt: string;
  };
}

export interface Feature {
  title: string;
  description: string;
  imageAlt: string;
  color: string;
}

export interface FeaturesContent {
  badge: string;
  title: string;
  subtitle: string;
  items: Feature[];
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface ProcessContent {
  badge: string;
  title: string;
  subtitle: string;
  steps: ProcessStep[];
}

export interface PricingContent {
  badge: string;
  title: string;
  subtitle: string;
  priceAmount: string;
  priceLabel: string;
  includedTitle: string;
  includedItems: string[];
  ctaButton: string;
  guarantee: string;
}

export interface FormContent {
  badge: string;
  title: string;
  subtitle: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  companyLabel: string;
  companyPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  projectLabel: string;
  projectPlaceholder: string;
  inspirationLabel: string;
  inspirationPlaceholder: string;
  colorsLabel: string;
  colorsPlaceholder: string;
  additionalLabel: string;
  additionalPlaceholder: string;
  submitButton: string;
  submitting: string;
  successTitle: string;
  successMessage: string;
  errorTitle: string;
  errorMessage: string;
  requiredNote: string;
}

export interface FinalCtaContent {
  badge: string;
  title: string;
  subtitle: string;
  ctaButton: string;
  trustBadges: string[];
}

export interface NavItem {
  label: string;
  href: string;
}

export interface HeaderContent {
  logo: string;
  logoAlt: string;
  navItems: NavItem[];
  ctaButton: string;
}

export interface FooterContent {
  tagline: string;
  description: string;
  quickLinks: {
    title: string;
    items: NavItem[];
  };
  services: {
    title: string;
    items: string[];
  };
  contact: {
    title: string;
    email: string;
    phone: string;
  };
  copyright: string;
  madeWith: string;
}

export interface SeoContent {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export interface Content {
  page: {
    hero: HeroContent;
    comparison: ComparisonContent;
    features: FeaturesContent;
    process: ProcessContent;
    pricing: PricingContent;
    form: FormContent;
    finalCta: FinalCtaContent;
  };
  header: HeaderContent;
  footer: FooterContent;
  seo: SeoContent;
}

/**
 * Récupère le contenu de la page d'accueil depuis Contentful
 *
 * @param preview - Si true, récupère le contenu en preview (draft)
 * @returns Le contenu de la page d'accueil
 *
 * Note: En production, cette fonction fera un appel API à Contentful.
 * Pour le moment, elle retourne les données depuis content.json
 */
export async function getHomepageContent(preview: boolean = false): Promise<Content> {
  // En production, ceci ferait un appel API à Contentful :
  // const client = createClient({ ... })
  // const entry = await client.getEntry('homepageId', { preview })
  // return transformContentfulData(entry)

  // Pour le moment, on retourne les données JSON statiques
  return contentData as Content;
}
