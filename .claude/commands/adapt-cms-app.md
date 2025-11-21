# adapt-cms-app - Adapter l'application test/ vers structure CMS Contentful

Adapter l'application React de `test/src/` vers une architecture Next.js avec Contentful CMS.

## Usage

```
/sc:adapt-cms-app
```

## 🔴 RÈGLES DE STRUCTURE CRITIQUES

### Architecture des Pages et Composants

**Pages** (app/\*\*/page.tsx) :
- ✅ TOUJOURS commencer par `"use server"`
- ✅ Fichiers async avec `export default async function Page()`
- ✅ Fonction `generateMetadata()` pour SEO
- ✅ Import des composants depuis `app/components/[page-name]/`

**Composants** (app/components/\*\*/\*.tsx) :
- ✅ TOUJOURS commencer par `"use client"` si interactifs (hooks, events, state)
- ✅ Organisation par dossier de page : `app/components/home/`, `app/components/about/`
- ✅ Composants partagés dans `app/components/shared/`
- ✅ UI shadcn/ui dans `components/ui/` (racine, PAS app/components)

**Exemple structure** :
```
app/
├── page.tsx                          ← "use server" (Homepage)
├── about/
│   └── page.tsx                      ← "use server" (About page)
├── components/
│   ├── home/                         ← Composants de la homepage
│   │   ├── HeroSection.tsx          ← "use client"
│   │   ├── ChallengeSection.tsx     ← "use client"
│   │   └── SolutionSection.tsx      ← "use client"
│   ├── about/                        ← Composants de la page About
│   │   ├── TeamSection.tsx          ← "use client"
│   │   └── HistorySection.tsx       ← "use client"
│   └── shared/                       ← Composants partagés
│       ├── Header.tsx                ← "use client"
│       └── Footer.tsx                ← "use client"
├── layout.tsx                        ← Root layout
└── utils/                            ← Utilities SEO

components/                           ← shadcn/ui (RACINE)
└── ui/
    ├── button.tsx
    ├── card.tsx
    └── ...
```

---

## Vue d'ensemble

| Phase | Description | Durée |
|-------|-------------|-------|
| **Phase 1** | Conversion translations → JSON CMS | ~2 min |
| **Phase 2** | Adaptation composants et pages | ~3-5 min |
| **Phase 3** | Intégration Layout | ~1 min |
| **Phase 4** | SEO : Metadata, JSON-LD, Sitemap, Robots | ~2-3 min |

---

## Phase 1: Conversion Translations → JSON CMS

### 1. Convertir translations.ts → lib/content.json

**Source** : `test/src/data/translations.ts`
**Destination** : `lib/content.json`

**Structure cible** :
```json
{
  "page": {
    "hero": {
      "title": "...",
      "description": "...",
      "cta": "...",
      "image": {
        "src": "https://...",
        "alt": "..."
      }
    },
    "challenge": { ... },
    "solution": { ... }
  }
}
```

**Règles** :
- ✅ Ajouter `image.src` (URLs Unsplash existantes dans composants)
- ✅ Ajouter `image.alt` depuis translations
- ✅ Extraire tous les links depuis composants
- ✅ Structure hiérarchique par section
- ❌ Pas de traductions multiples (mono-langue)

---

## Phase 2: Adaptation Composants et Pages

### 1. Détecter la structure

```bash
# Vérifier si pages multiples
find test/src/app -name "page.tsx" -type f

# Si aucune page trouvée → Adapter App.tsx comme page unique
ls test/src/App.tsx
```

### 2. Lancer l'agent d'adaptation

**Si App.tsx unique** :
- Agent unique pour adapter `App.tsx` + tous composants
- Suivre `workflows/agents/cms_adapter.md`

**Configuration agent** :
```
subagent_type: frontend-architect
task: Adapter test/src/ vers app/ avec Contentful CMS
input: test/src/App.tsx + test/src/components/
output: app/page.tsx + composants adaptés
```

**Instructions agent** :
```
Adapter l'application React vers Next.js + Contentful :

1. Convertir App.tsx → app/page.tsx (Next.js App Router)
   - Ajouter "use server" en première ligne
   - Fonction async : export default async function Page()
   - Ajouter generateMetadata() pour SEO

2. Adapter composants : useTranslations() → content props
   - Ajouter "use client" en première ligne pour composants interactifs
   - Organiser dans app/components/home/ pour homepage
   - Organiser dans app/components/[page-name]/ pour autres pages

3. Extraire Header/Footer → app/components/shared/
   - Header.tsx et Footer.tsx avec "use client"
   - Importer dans app/layout.tsx

4. Conserver composants UI (test/src/components/ui/) tels quels
   - Rester dans components/ui/ (racine, PAS app/components)

5. Pattern Contentful : getHomepageContent() comme dans app/page.tsx

Règles :
- ✅ Pages : "use server" + async function
- ✅ Composants : "use client" si interactifs
- ✅ Structure : app/components/[page-name]/ComponentName.tsx
- ✅ Shared : app/components/shared/ pour Header/Footer
- ✅ UI shadcn/ui : components/ui/ (racine)
- ✅ Utiliser shadcn/ui existant (pas d'adaptation design system)
- ✅ Conserver images Unsplash telles quelles
- ✅ Mono-langue (pas de i18n)
- ✅ Pas de conversion prix
- ✅ Header/Footer dans layout.tsx UNIQUEMENT
- ✅ Pattern : content.page.section.key (pas de useTranslations)
```

### 3. Success Criteria

- ✅ `lib/content.json` créé avec URLs images + links
- ✅ `app/page.tsx` adapté avec pattern Contentful
- ✅ Composants utilisent props content (pas useTranslations)
- ✅ Header/Footer dans `app/layout.tsx`
- ✅ Composants UI shadcn/ui préservés
- ✅ Images Unsplash conservées
- ✅ Mono-langue (pas de traductions)

---

## Phase 3: Intégration Layout

### 1. Mettre à jour app/layout.tsx

**Ajouter** :
- Import Header/Footer
- Structure HTML complète
- Metadata basiques

**Template** :
```typescript
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
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
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

### 2. Validation finale

- [ ] TypeScript : `npx tsc --noEmit`
- [ ] Imports corrects (pas d'erreurs)
- [ ] Header/Footer dans layout uniquement
- [ ] Page fonctionne avec pattern Contentful

---

## Phase 4: SEO - Metadata, JSON-LD, Sitemap, Robots

### 1. Générer metadata pour chaque page

**Pour chaque page créée** (`app/page.tsx`, `app/about/page.tsx`, etc.) :

- [ ] Ajouter `export const dynamic = 'force-static'` en haut du fichier
- [ ] Créer fonction `generateMetadata()` avec `generatePageMetadata()`
- [ ] Déterminer baseUrl depuis variables d'environnement

**Template metadata** :
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

### 2. Ajouter JSON-LD adapté au contenu

**Analyser le contenu de la page** et ajouter les JSON-LD appropriés :

**Règles de détection** :
- FAQ présente → `generateFAQJsonLd()`
- Pricing/Prix → `generateProductWithOffersJsonLd()`
- Services → `generateServiceJsonLd()`
- About page → `generateAboutPageJsonLd()`
- Contact page → `generateContactPageJsonLd()`
- Homepage → `generateOrganizationJsonLd()` + `generateWebsiteJsonLd()` + `generateWebPageJsonLd()`
- Breadcrumb navigation → `generateBreadcrumbJsonLd()`

**Template JSON-LD** :
```typescript
import {
  generateOrganizationJsonLd,
  generateWebsiteJsonLd,
  generateWebPageJsonLd,
  generateFAQJsonLd,
  generateProductWithOffersJsonLd,
  combineJsonLdSchemas,
  JsonLdScript
} from "@/app/utils/json-ld";

export default async function Page() {
  const content = await getHomepageContent(false);

  // Détecter le contenu et générer JSON-LD adapté
  const schemas = [];

  // Organisation (homepage uniquement)
  schemas.push(generateOrganizationJsonLd({
    name: "Company Name",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: "Company description",
  }));

  // Website (homepage uniquement)
  schemas.push(generateWebsiteJsonLd({
    name: "Website Name",
    url: baseUrl,
    description: "Website description",
  }));

  // WebPage (toutes les pages)
  schemas.push(generateWebPageJsonLd({
    name: content.seo?.title || "Page Title",
    url: buildCanonicalUrl(baseUrl, "/"),
    description: content.seo?.description || "Page description",
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
        {/* Page content */}
      </div>
    </>
  );
}
```

### 3. Créer app/sitemap.ts

- [ ] Créer `app/sitemap.ts`
- [ ] Utiliser `generateSitemapEntries()` et `formatForNextJs()`
- [ ] Lister toutes les routes statiques

**Template** :
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
      { path: '/about', priority: 0.8 },
      { path: '/contact', priority: 0.8 },
      // Ajouter toutes les routes statiques détectées
    ]
  );

  return formatForNextJs(entries);
}
```

### 4. Créer app/robots.ts

- [ ] Créer `app/robots.ts`
- [ ] Utiliser `standardShowcaseRobots()` pour production
- [ ] Configurer selon l'environnement

**Template** :
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

### 5. Validation SEO

- [ ] TypeScript : `npx tsc --noEmit`
- [ ] Tester metadata : vérifier `<head>` généré
- [ ] Tester JSON-LD : vérifier scripts dans page source
- [ ] Tester sitemap : `http://localhost:3000/sitemap.xml`
- [ ] Tester robots : `http://localhost:3000/robots.txt`
- [ ] Valider JSON-LD : [Google Rich Results Test](https://search.google.com/test/rich-results)

---

## Format du rapport final

```
✅ Phase 1: Conversion JSON (x min)
   - lib/content.json créé
   - URLs images + links ajoutés
   - Structure hiérarchique par section

✅ Phase 2: Adaptation (x min)
   - App.tsx → app/page.tsx
   - N composants adaptés (pattern content props)
   - Composants UI shadcn/ui préservés
   - Images conservées

✅ Phase 3: Layout (x min)
   - Header/Footer intégrés
   - TypeScript : 0 erreurs
   - Structure Next.js complète

✅ Phase 4: SEO (x min)
   - Metadata générées pour N pages
   - JSON-LD adaptés au contenu (FAQ, Pricing, etc.)
   - app/sitemap.ts créé avec N routes
   - app/robots.ts configuré
   - Validation Google Rich Results : ✅

🎉 Workflow complet : ~x min
   - Application prête pour Contentful CMS
   - SEO optimisé avec metadata et JSON-LD
   - Sitemap et robots configurés
   - JSON à ajouter manuellement dans Contentful
```

---

## Success Criteria Global

✅ `lib/content.json` prêt pour Contentful
✅ Pattern Contentful implémenté (`content.page.section.key`)
✅ Composants UI shadcn/ui préservés
✅ Images Unsplash conservées
✅ Mono-langue (pas de i18n)
✅ Pas de conversion prix
✅ Header/Footer dans layout.tsx uniquement
✅ Metadata générées avec `generatePageMetadata()`
✅ JSON-LD adaptés au contenu de chaque page
✅ `app/sitemap.ts` créé et fonctionnel
✅ `app/robots.ts` créé et configuré
✅ 0 erreurs TypeScript

---

## Notes

| Simplification | Bénéfice |
|----------------|----------|
| **Pas de design system** | Utilise shadcn/ui existant |
| **Pas d'images import** | Conserve URLs Unsplash |
| **Pas de traductions** | Mono-langue français |
| **Pas de prix** | Application informative simple |
| **Pattern Contentful** | Structure data-driven prête pour CMS |
