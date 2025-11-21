# Agent CMS: Adapter React vers Next.js + Contentful

**Role**: frontend-architect
**Mission**: Adapter application React simple vers Next.js App Router avec Contentful CMS pattern

## 🔴 RÈGLES CRITIQUES

### Directives React Server/Client
1. **Pages "use server"** - TOUTES les pages commencent par `"use server"`
2. **Composants "use client"** - Tous les composants interactifs commencent par `"use client"`
3. **Async pages** - Pages avec `export default async function Page()`

### Structure des Fichiers
4. **Organisation composants** - `app/components/[page-name]/ComponentName.tsx`
   - Homepage : `app/components/home/`
   - About : `app/components/about/`
   - Shared : `app/components/shared/` (Header, Footer)
5. **UI shadcn/ui** - Reste dans `components/ui/` (racine, PAS app/components)

### Règles Contentful
6. **Pas de design system** - Utiliser `test/src/components/ui/` (shadcn/ui) tel quel
7. **Pas d'images import** - Conserver URLs Unsplash existantes
8. **Pas de traductions** - Application mono-langue (français)
9. **Pas de conversion prix** - Conserver prix tels quels si présents
10. **Header/Footer dans layout.tsx** - JAMAIS dans page.tsx ou composants
11. **Pattern Contentful** - `content.page.section.key` (PAS `useTranslations()`)

---

## 📋 Input

| Parameter | Value |
|-----------|-------|
| **Source App** | `test/src/App.tsx` |
| **Composants** | `test/src/components/**/*.tsx` |
| **UI Components** | `test/src/components/ui/` (shadcn/ui - NE PAS MODIFIER) |
| **Translations** | `test/src/data/translations.ts` |
| **Target** | `app/page.tsx` + composants adaptés |
| **Reference** | `app/page.tsx` (pattern Contentful existant) |

---

## 🎯 Structure Cible

```
lib/
└── content.json                      ← Conversion translations.ts

app/
├── layout.tsx                        ← Root layout (Header + Footer)
├── page.tsx                          ← "use server" Homepage
├── about/
│   └── page.tsx                      ← "use server" About page (si existe)
├── components/
│   ├── home/                         ← Composants homepage
│   │   ├── HeroSection.tsx          ← "use client"
│   │   ├── ChallengeSection.tsx     ← "use client"
│   │   └── SolutionSection.tsx      ← "use client"
│   ├── about/                        ← Composants About (si existe)
│   │   └── TeamSection.tsx          ← "use client"
│   └── shared/                       ← Composants partagés
│       ├── Header.tsx                ← "use client"
│       └── Footer.tsx                ← "use client"
├── utils/                            ← Utilities SEO
│   ├── metadata.ts
│   ├── json-ld.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── sitemap.ts                        ← Sitemap Next.js
├── robots.ts                         ← Robots.txt Next.js
└── globals.css                       ← Styles globaux

components/                           ← shadcn/ui (RACINE)
└── ui/                               ← shadcn/ui (INCHANGÉ)
    ├── button.tsx
    ├── card.tsx
    └── ...
```

---

## ✅ Tasks Checklist

### 1️⃣ Analyser l'application source

- [ ] Lire `test/src/App.tsx`
- [ ] Identifier tous les composants importés
- [ ] Repérer Header et Footer
- [ ] Lister les sections (Hero, Challenge, Solution, etc.)
- [ ] Noter les URLs d'images Unsplash dans les composants
- [ ] Détecter types de contenu (FAQ, Pricing, Services, About, Contact)

### 2️⃣ Convertir translations.ts → content.json

- [ ] Lire `test/src/data/translations.ts`
- [ ] Créer `lib/content.json` avec structure :

```json
{
  "page": {
    "hero": {
      "title": "...",
      "titleLine2": "...",
      "description": "...",
      "cta": "...",
      "image": {
        "src": "https://images.unsplash.com/...",
        "alt": "..."
      }
    },
    "challenge": {
      "title": "...",
      "paragraph1": "...",
      "paragraph2": "...",
      "paragraph3": "..."
    },
    "solution": { ... }
  }
}
```

**IMPORTANT** :
- ✅ Extraire URLs images depuis composants `ImageTextSection`, `HeroSection`, etc.
- ✅ Ajouter `image.src` et `image.alt` pour chaque section visuelle
- ✅ Extraire links depuis composants (si présents)
- ✅ Structure hiérarchique : `page.section.key`
- ❌ Pas de traductions multiples (mono-langue)

### 3️⃣ Adapter les composants

**Pour chaque composant de section** :

- [ ] Créer structure de dossiers :
  - `app/components/home/` pour composants homepage
  - `app/components/about/` pour composants About (si existe)
  - `app/components/shared/` pour Header/Footer

- [ ] **Ajouter "use client"** en première ligne :
  ```typescript
  "use client";

  import { Button } from "@/components/ui/button";

  interface HeroSectionProps {
    content: {
      title: string;
      description: string;
      cta: string;
      image: { src: string; alt: string };
    }
  }

  export function HeroSection({ content }: HeroSectionProps) {
    return (
      <section>
        <h1>{content.title}</h1>
        <Button>{content.cta}</Button>
      </section>
    );
  }
  ```

- [ ] **Supprimer** imports `useTranslations` :
  ```typescript
  // ❌ SUPPRIMER
  import { useTranslations } from '../hooks/useTranslations';
  const t = useTranslations("hero");

  // ✅ REMPLACER par props avec "use client"
  "use client";

  interface HeroSectionProps {
    content: {
      title: string;
      description: string;
      cta: string;
      image: { src: string; alt: string };
    }
  }

  export function HeroSection({ content }: HeroSectionProps) {
    return <h1>{content.title}</h1>
  }
  ```

- [ ] **Conserver** imports composants UI (shadcn/ui) tels quels :
  ```typescript
  // ✅ CONSERVER (racine components/ui/)
  import { Button } from "@/components/ui/button";
  import { Card } from "@/components/ui/card";
  ```

- [ ] **Conserver** images Unsplash telles quelles :
  ```typescript
  // ✅ CONSERVER (ne pas modifier URLs)
  <Image
    src="https://images.unsplash.com/..."
    alt={content.imageAlt}
  />
  ```

- [ ] **Déplacer** Header et Footer dans `app/components/shared/`
  - Header.tsx avec "use client"
  - Footer.tsx avec "use client"

### 4️⃣ Créer app/page.tsx

- [ ] **Ajouter "use server"** en première ligne
- [ ] Créer fonction async `export default async function Page()`
- [ ] Utiliser `getHomepageContent()` pour charger données
- [ ] Importer composants depuis `app/components/home/`

**Template** :
```typescript
"use server";

import { getHomepageContent } from "@/lib/api";
import { HeroSection } from "@/app/components/home/HeroSection";
import { ChallengeSection } from "@/app/components/home/ChallengeSection";
import { SolutionSection } from "@/app/components/home/SolutionSection";

export default async function Page() {
  const homepageContent = await getHomepageContent(false);
  const content = homepageContent?.content;

  return (
    <div className="min-h-screen bg-white">
      <main>
        <HeroSection content={content.page.hero} />
        <ChallengeSection content={content.page.challenge} />
        <SolutionSection content={content.page.solution} />
        {/* ... autres sections */}
      </main>
    </div>
  );
}
```

**⚠️ IMPORTANT** :
- **TOUJOURS** commencer par `"use server"`
- **TOUJOURS** `export default async function Page()`
- Header et Footer sont dans `app/layout.tsx`, PAS ici
- Imports depuis `@/app/components/home/` (pas `@/components/`)
- Utiliser `content.page.section.key` pour accéder aux données
- Imports directs des composants (pas de barrel exports)

### 5️⃣ Mettre à jour app/layout.tsx

- [ ] Créer ou mettre à jour `app/layout.tsx`
- [ ] Importer Header et Footer depuis `app/components/shared/`
- [ ] Ajouter metadata basiques

**Template** :
```typescript
import { Header } from "@/app/components/shared/Header";
import { Footer } from "@/app/components/shared/Footer";
import "@/app/globals.css";

export const metadata = {
  title: "Application Title",
  description: "Application description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-white">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

**⚠️ IMPORTANT** :
- Imports depuis `@/app/components/shared/` (pas `@/components/`)
- Header et Footer sont des composants "use client"

### 6️⃣ Adapter Header et Footer

- [ ] Créer `app/components/shared/Header.tsx`
- [ ] Créer `app/components/shared/Footer.tsx`
- [ ] **Ajouter "use client"** en première ligne
- [ ] Supprimer `useTranslations()` → Ajouter props si textes nécessaires
- [ ] Conserver shadcn/ui imports tels quels
- [ ] Simplifier si possible (supprimer états complexes inutiles)

**Template Header** :
```typescript
"use client";

import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="border-b">
      <nav className="container mx-auto px-4 py-4">
        {/* Navigation simplifiée */}
        <div className="flex items-center justify-between">
          <div className="font-bold text-xl">Logo</div>
          <div className="flex gap-4">
            <Button variant="ghost">Accueil</Button>
            <Button variant="ghost">À propos</Button>
            <Button>Contact</Button>
          </div>
        </div>
      </nav>
    </header>
  );
}
```

**Template Footer** :
```typescript
"use client";

export function Footer() {
  return (
    <footer className="border-t mt-auto">
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-sm text-gray-600">
          © 2024 Company Name. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
```

**⚠️ IMPORTANT** :
- **TOUJOURS** commencer par `"use client"`
- Fichiers dans `app/components/shared/`
- Imports shadcn/ui depuis `@/components/ui/` (racine)

### 7️⃣ Ajouter Metadata et JSON-LD

**Pour chaque page créée** :

- [ ] Page déjà en `"use server"` (fait à l'étape 4)
- [ ] Ajouter `export const dynamic = 'force-static'` après imports
- [ ] Créer fonction `generateMetadata()` avec imports :

```typescript
import { generatePageMetadata, buildCanonicalUrl } from "@/app/utils/metadata";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://example.com";

export async function generateMetadata() {
  const content = await getHomepageContent(false);

  return generatePageMetadata(
    content.seo?.title || "Page Title",
    content.seo?.description || "Page description",
    {
      canonicalUrl: buildCanonicalUrl(baseUrl, "/"),
      images: content.seo?.image ? [{
        url: content.seo.image,
        width: 1200,
        height: 630,
        alt: content.seo?.imageAlt || "Page image"
      }] : undefined,
      robots: {
        index: true,
        follow: true,
      }
    }
  );
}
```

- [ ] Analyser contenu et ajouter JSON-LD appropriés :

**Règles de détection** :
- Homepage → `generateOrganizationJsonLd()` + `generateWebsiteJsonLd()` + `generateWebPageJsonLd()`
- FAQ → `generateFAQJsonLd()`
- Pricing → `generateProductWithOffersJsonLd()`
- Services → `generateServiceJsonLd()`
- About → `generateAboutPageJsonLd()`
- Contact → `generateContactPageJsonLd()`
- Breadcrumb → `generateBreadcrumbJsonLd()`

**Template JSON-LD complet pour page** :
```typescript
"use server";

import { getHomepageContent } from "@/lib/api";
import { HeroSection } from "@/app/components/home/HeroSection";
import {
  generateOrganizationJsonLd,
  generateWebsiteJsonLd,
  generateWebPageJsonLd,
  generateFAQJsonLd,
  generateProductWithOffersJsonLd,
  combineJsonLdSchemas,
  JsonLdScript
} from "@/app/utils/json-ld";
import { generatePageMetadata, buildCanonicalUrl } from "@/app/utils/metadata";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://example.com";

export const dynamic = 'force-static';

export async function generateMetadata() {
  const content = await getHomepageContent(false);
  return generatePageMetadata(
    content.seo?.title || "Homepage",
    content.seo?.description || "Description",
    {
      canonicalUrl: buildCanonicalUrl(baseUrl, "/"),
      robots: { index: true, follow: true }
    }
  );
}

export default async function Page() {
  const homepageContent = await getHomepageContent(false);
  const content = homepageContent?.content;
  const schemas = [];

  // Homepage : Organization + Website
  schemas.push(generateOrganizationJsonLd({
    name: "Company Name",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: "Company description",
  }));

  schemas.push(generateWebsiteJsonLd({
    name: "Website Name",
    url: baseUrl,
    description: "Website description",
  }));

  // WebPage (toutes les pages)
  schemas.push(generateWebPageJsonLd({
    name: content.seo?.title || "Homepage",
    url: buildCanonicalUrl(baseUrl, "/"),
    description: content.seo?.description,
    isPartOf: baseUrl,
  }));

  // FAQ si présente
  if (content.page?.faq?.questions) {
    schemas.push(generateFAQJsonLd(
      content.page.faq.questions.map(q => ({
        question: q.question,
        answer: q.answer
      }))
    ));
  }

  // Pricing si présent
  if (content.page?.pricing?.plans) {
    schemas.push(generateProductWithOffersJsonLd({
      name: "Service Name",
      description: "Service description",
      offers: content.page.pricing.plans.map(plan => ({
        name: plan.name,
        price: plan.price,
        priceCurrency: "EUR"
      }))
    }));
  }

  const combinedJsonLd = combineJsonLdSchemas(schemas);

  return (
    <>
      <JsonLdScript data={combinedJsonLd} />
      <div className="min-h-screen bg-white">
        <main>
          <HeroSection content={content.page.hero} />
          {/* ... autres sections */}
        </main>
      </div>
    </>
  );
}
```

**⚠️ IMPORTANT** :
- **TOUJOURS** `"use server"` en première ligne
- **TOUJOURS** `export const dynamic = 'force-static'` après imports
- **TOUJOURS** `export async function generateMetadata()`
- **TOUJOURS** `export default async function Page()`

### 8️⃣ Créer Sitemap et Robots

- [ ] Créer `app/sitemap.ts` :

```typescript
import type { MetadataRoute } from 'next';
import { generateSitemapEntries, formatForNextJs } from '@/app/utils/sitemap';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries = generateSitemapEntries(
    {
      baseUrl,
      defaultChangeFrequency: 'monthly',
      defaultPriority: 0.7,
    },
    [
      { path: '/', priority: 1.0, changeFrequency: 'weekly' },
      // Ajouter toutes les routes détectées
    ]
  );

  return formatForNextJs(entries);
}
```

- [ ] Créer `app/robots.ts` :

```typescript
import type { MetadataRoute } from 'next';
import { standardShowcaseRobots, developmentRobots } from '@/app/utils/robots';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com';
const isProduction = process.env.NODE_ENV === 'production';

export default function robots(): MetadataRoute.Robots {
  if (!isProduction) {
    return developmentRobots();
  }

  return standardShowcaseRobots(baseUrl);
}
```

### 9️⃣ Validation

- [ ] Vérifier imports :
  - ✅ Composants UI : `@/components/ui/*`
  - ✅ Composants page : `@/components/*`
  - ✅ API : `@/lib/api`
  - ✅ Utils : `@/app/utils/metadata`, `@/app/utils/json-ld`, `@/app/utils/sitemap`, `@/app/utils/robots`
  - ❌ Pas de `useTranslations`
  - ❌ Pas de chemins relatifs complexes

- [ ] Exécuter : `npx tsc --noEmit`
- [ ] Corriger erreurs TypeScript si présentes
- [ ] Tester sitemap : `http://localhost:3000/sitemap.xml`
- [ ] Tester robots : `http://localhost:3000/robots.txt`
- [ ] Valider JSON-LD avec [Google Rich Results Test](https://search.google.com/test/rich-results)

---

## 📊 Output Success Criteria

- ✅ `lib/content.json` créé avec structure CMS complète
- ✅ URLs images + alts extraits et ajoutés
- ✅ `app/page.tsx` utilise pattern `getHomepageContent()`
- ✅ Tous composants utilisent props content (pas `useTranslations`)
- ✅ Header/Footer dans `app/layout.tsx` uniquement
- ✅ Composants UI shadcn/ui inchangés
- ✅ Images Unsplash conservées
- ✅ Metadata générées avec `generateMetadata()` pour chaque page
- ✅ JSON-LD adaptés au contenu (FAQ, Pricing, etc.)
- ✅ `app/sitemap.ts` créé avec toutes les routes
- ✅ `app/robots.ts` créé et configuré
- ✅ 0 erreurs TypeScript

---

## 📚 References

**Pattern Contentful** : `app/page.tsx` (référence existante)
**API Contentful** : `lib/api.ts`
**Composants UI** : `test/src/components/ui/` (shadcn/ui)
**Utils SEO** : `app/utils/metadata.ts`, `app/utils/json-ld.tsx`, `app/utils/sitemap.ts`, `app/utils/robots.ts`
**Structure cible** : Next.js App Router standard

---

## ⚠️ Pièges Courants

**🔴 ERREURS CRITIQUES** :
1. ❌ Garder `useTranslations()` → ✅ Utiliser props content
2. ❌ Modifier composants UI → ✅ Conserver shadcn/ui tel quel
3. ❌ Header/Footer dans page → ✅ Uniquement dans layout.tsx
4. ❌ Importer depuis barrel exports → ✅ Imports directs

**Imports** :
- ✅ `import { Button } from "@/components/ui/button";`
- ✅ `import { HeroSection } from "@/components/HeroSection";`
- ✅ `import { getHomepageContent } from "@/lib/api";`
- ❌ `import { useTranslations } from '../hooks/useTranslations';`

**Pattern données** :
- ✅ `content.page.hero.title`
- ✅ `content.page.challenge.paragraph1`
- ❌ `t("hero.title")`
- ❌ `translations.hero.title`

**Composants** :
- ✅ Props typed avec TypeScript
- ✅ Export nommé : `export function HeroSection({ content })`
- ✅ Imports shadcn/ui préservés
- ❌ Export default
- ❌ Modifications composants UI

---

## 🚀 Execution

**Durée estimée** : 5-8 minutes

**Ordre d'exécution** :
1. Analyser source (30s)
2. Convertir JSON (1min)
3. Adapter composants (2min)
4. Créer page + layout (1min)
5. Ajouter SEO (metadata + JSON-LD) (2-3min)
6. Créer sitemap + robots (30s)
7. Validation (30s)
