import type { Metadata } from "next";
import { Header } from "@/app/components/shared/Header";
import { Footer } from "@/app/components/shared/Footer";
import { getHomepageContent } from "@/lib/api";
import "./globals.css";

export const metadata: Metadata = {
  title: "WebPro - Sites Vitrines Sur-Mesure",
  description: "Sites vitrines professionnels sur-mesure pour 800€",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const response = await getHomepageContent(false);
  const content = response.content;

  return (
    <html lang="fr">
      <body style={{ fontFamily: 'var(--font-sans)' }}>
        <Header content={content.header} />
        {children}
        <Footer content={content.footer} />
      </body>
    </html>
  );
}
