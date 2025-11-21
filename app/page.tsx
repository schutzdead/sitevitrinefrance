"use server";

import { getHomepageContent } from "@/lib/api";
import { generatePageMetadata } from "@/app/utils/metadata";
import { HeroSection } from "@/app/components/home/HeroSection";
import { ComparisonSection } from "@/app/components/home/ComparisonSection";
import { FeaturesSection } from "@/app/components/home/FeaturesSection";
import { ProcessSection } from "@/app/components/home/ProcessSection";
import { PricingSection } from "@/app/components/home/PricingSection";
import { ContactFormSection } from "@/app/components/home/ContactFormSection";
import { FinalCtaSection } from "@/app/components/home/FinalCtaSection";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://example.com";

export async function generateMetadata() {
  const response = await getHomepageContent(false);
  const content = response.content;

  return generatePageMetadata(
    content.seo?.title || "WebPro - Sites Vitrines",
    content.seo?.description || "Sites vitrines professionnels sur-mesure",
    {
      canonicalUrl: `${baseUrl}/`,
      images: content.seo?.image
        ? [
            {
              url: content.seo.image,
              width: 1200,
              height: 630,
              alt: content.seo?.imageAlt || "WebPro",
            },
          ]
        : undefined,
    }
  );
}

export default async function Page() {
  const response = await getHomepageContent(false);
  const content = response.content;

  return (
    <div className="min-h-screen bg-white">
      <HeroSection content={content?.page.hero} />
      <ComparisonSection content={content.page.comparison} />
      <div id="features">
        <FeaturesSection content={content.page.features} />
      </div>
      <div id="process">
        <ProcessSection content={content.page.process} />
      </div>
      <div id="pricing">
        <PricingSection content={content.page.pricing} />
      </div>
      <div id="contact">
        <ContactFormSection content={content.page.form} />
      </div>
      <FinalCtaSection content={content.page.finalCta} />
    </div>
  );
}
