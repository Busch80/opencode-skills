# SEO & Schema.org — KPX Redesign

## 1. Metadata-Export (pro Seite)

```tsx
import type { Metadata } from "next";

const PAGE_TITLE = "... | KPX";        // 客户可读
const PAGE_DESC = "..."               // 140-160 Zeichen, Hauptkeyword Front-load
const PAGE_URL = "https://kpx-it.ch/<path>";   // kanonisch, ohne Trailing-Slash (außer root)

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",                  // oder "article"
    locale: "de_CH",
    siteName: "KPX AG",
    title: PAGE_TITLE,
    description: PAGE_DESC,
    url: PAGE_URL,
    images: [{ url: "https://kpx-it.ch/og-image.png", width: 1200, height: 630, alt: "..." }],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESC,
    images: ["https://kpx-it.ch/og-image.png"],
  },
};
```

**Konstante Vorgaben:**
- Canonical: `https://kpx-it.ch/<path>` — **kein Trailing-Slash** (außer Root `https://kpx-it.ch/`).
- og-image immer 1200×630, Standard `https://kpx-it.ch/og-image.png`. Page-spezifisch erlaubt, z. B. CloudFront-PNGs.
- `locale` konstant `"de_CH"`.
- Twitter-Card konstant `summary_large_image`.

## 2. `export const dynamic`

Oben in der Seite:

```tsx
export const dynamic = "force-dynamic";   // default für Service-Subpages und homeseite
// oder
export const dynamic = "force-static";    // z.B. it-outsourcing-kmu
```

Empfehlung: `force-dynamic`, sobald `getLatestPosts()` oder Benutzer dynamischer Daten genutzt werden. `force-static` für reine Content-Seiten, die sich nie ändern.

## 3. Root-Layout (global)

`app/layout.tsx` exportiert bereits:
- `metadataBase: new URL("https://kpx-it.ch")`
- `title: { default: "KPX IT-Dienstleister in Zürich – Managed IT Services für KMU", template: "%s | KPX AG" }`
- `openGraph`-Default `og-image.png`
- `robots: { index: true, follow: true, googleBot: { …, "max-image-preview": "large" } }`
- `alternates.canonical: "https://kpx-it.ch"`
- globale JSON-LD `LocalBusiness` + `ITService` mit `@id: "https://kpx-it.ch/#organization"` und ClickRank-Verification-`<script>`
- `<html lang="de">`, `<head>` enthält `<link rel="sitemap" href="/sitemap.xml" />`

Die per-seitige `Organization`-JSON-LD referenziert die gleiche `@id` (siehe §5).

## 4. Robots & Sitemap

- `app/robots.ts` — Robots-Rule-Export.
- `app/sitemap.ts` — liefert `defaultSitemap` (oder page-spezifisch überschrieben). Neue Seiten müssen in `defaultSitemap` ergänzt werden (siehe Datei aktuell).

## 5. JSON-LD `@graph` Schema (kanonisch, pro Seite)

Die Backup-Seite ist die Referenz — ein einzelnes `@context` + `@graph`-Array, render am Seitenende:

```tsx
const schemaJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://kpx-it.ch" },
        { "@type": "ListItem", "position": 2, "name": "Managed IT Services", "item": "https://kpx-it.ch/managed-it-services" },
        { "@type": "ListItem", "position": 3, "name": "Managed Backup", "item": "https://kpx-it.ch/managed-it-services/backup" }
      ]
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a }
      }))
    },
    {
      "@type": "Organization",
      "@id": "https://kpx-it.ch/#organization",
      "name": "KPX AG",
      "url": "https://kpx-it.ch",
      "logo": "https://kpx-it.ch/kpx-logo.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Grindelstrasse 6",
        "addressLocality": "Wallisellen",
        "postalCode": "8304",
        "addressCountry": "CH"
      },
      "telephone": "+41445896955",
      "email": "info@kpx-it.ch"
    },
    {
      "@type": "Service",
      "name": "Managed Backup",
      "description": "Vollautomatische, regelmässig geprüfte Datensicherung …",
      "provider": { "@type": "Organization", "name": "KPX AG", "url": "https://kpx-it.ch" },
      "areaServed": { "@type": "Country", "name": "Schweiz" },
      "serviceType": "IT-Dienstleistung"
    }
  ]
};

// Render am Ende der Seite (vor </div>):
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }} />
```

### 5.1 `@graph`-Knoten-Varianten

| Knoten | Pflicht | Inhalt |
|---|---|---|
| `BreadcrumbList` | immer | 3 Levels für Service-Subpages (`Startseite → Managed IT Services → <Service>`); 3 für externe-it-abteilung (`Startseite → IT Dienstleistungen Zürich → Externe IT Abteilung`); ggf. nur 2 für Top-Level. Jede `item`-URL ohne Trailing-Slash. |
| `FAQPage` | immer | `mainEntity` mapped from der Seitens `faqs`-Array. Bei light-Faq `f.question`/`f.answer`, bei dark `f.q`/`f.a` — Schema-Property ist für beide `Question/Answer.text`. |
| `Organization` | immer, except when referziert via `@id` | `@id: "https://kpx-it.ch/#organization"` (referenziert globale LocalBusiness aus `app/layout.tsx`). |
| `Service` | für alle `managed-it-services/*` und Themenseiten | `name` = Seite-Topic, `description` = 1-Satz-Zusammenfassung, `provider` (entweder inline oder `{ "@id": "https://kpx-it.ch/#organization" }`), `areaServed: { Country Schweiz }`, `serviceType: "IT-Dienstleistung"`. |
| `LocalBusiness` | optional statt `Organization` für SEO-Hubs | it-outsourcing-kmu verwendet dieses mit `@id #organization`, zusätzlich `geo` (LatLng) und `areaServed` als Array. |
| `Article` | für Ratgeber-Seiten | externe-it-abteilung ergänzt `Article` mit `headline`, `author`, `publisher` (`@id #organization`), `datePublished`, `dateModified`, `mainEntityOfPage`. |
| `WebPage` | für non-Service-Seiten | `isPartOf: { "@id": "https://kpx-it.ch/#website" }` — für Cluster-Saiten wie it-outsourcing-kmu. |
| `WebSite` | nur Startseite | `@id: "https://kpx-it.ch/#website"`. |

### 5.2 Render-Position

Variiert zwischen den Referenzseiten — beide Varianten sind gültig:
- **Ende der Komponente** (innerhalb des Seiten-`<div>`): backup-page praktiziert das.
- **Anfang der Komponente** (vor `<main>`): externe-it-abteilung, homeseite praktizieren das.

Empfehlung: Render am Ende, direkt vor dem schließenden Seiten-`<div>` — halten JSON-LD am Ort der inhaltlichen Bezugnahme und vermeiden Top-of-File-Unübersicht.

### 5.3Sonderfall it-outsourcing-kmu

Diese Seite bettet einen **zweiten** `FAQPage`-Script **innerhalb** der FAQ-`<section>` ein (zusätzlich zum `@graph`):

```tsx
<section className="kpx-section kpx-section-light">
  <script type="application/ld+json" dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    }),
  }} />
  {/* … */}
</section>
```

Das ist zulässig, aber für neue Seiten **bevorzugeben**: ein einziges `@graph` pro Seite, `FAQPage` als Knoten darin. Doppeltes Rendering nur beibehalten, wenn die Existenz der FAQ-Sektion mit der Light-Accordion-Render-Position gekoppelt werden muss.

## 6. Startseiten-Schema (Spezial)

Startseite verwendet ein **flaches Array** (kein `@graph`):

```tsx
const schemaJsonLd = [
  { "@context": "https://schema.org", "@type": "WebSite", /* @id #website, … */ },
  { "@context": "https://schema.org", "@type": "Organization", /* @id #organization, … */ },
  { "@context": "https://schema.org", "@type": "LocalBusiness", /* … */ },
  { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: homeFaqItems.map(...) },
];
```

Wohlgeformt, aber das @graph-Format aus §5 ist für neue Seiten vorzuziehen — kompakter und für Google besser referenzierbar.

## 7. `ServicePageFooter`-Schema

`ServicePageFooter` hat seinen eigenen JSON-LD-Footer-Render (Badges, SLA, CH, Wallisellen) — nicht duplizieren. Service-Schema-Render in `<ServicePageFooter />` nicht überschneiden mit Seiten-`@graph`.

## 8. LocalBusiness-Template (für SEO-Hub-Seiten)

```tsx
{
  "@type": "LocalBusiness",
  "@id": "https://kpx-it.ch/#organization",
  "name": "KPX AG",
  "url": "https://kpx-it.ch",
  "logo": "https://kpx-it.ch/kpx-logo.png",
  "image": "https://kpx-it.ch/og-image.png",
  "telephone": "+41445896955",
  "email": "info@kpx-it.ch",
  "address": { "@type": "PostalAddress", /* … wie oben … */ },
  "geo": { "@type": "GeoCoordinates", "latitude": 47.4135, "longitude": 8.5849 },
  "areaServed": [
    { "@type": "City", "name": "Zürich" },
    { "@type": "State", "name": "Kanton Zürich" },
    { "@type": "Country", "name": "Schweiz" }
  ],
  "priceRange": "$$"
}
```

Statt kleinerer `Organization`-Nodes, LocalBusiness direkt mit `@id #organization` referenzieren — vermeidet Redundanz, Google kann gleichbleibende lokale Relevanz verknüpfen.

## 9. Schreibstil-Plan für Titel & Beschreibungen

| Element | Muster | Beispiel |
|---|---|---|
| `PAGE_TITLE` | `<Hauptkeyword> für <Nische> in <Region>` ‖ `<Brand>`-Suffix | `Managed Backup für KMU – Automatisierte Datensicherung \| KPX` |
| `PAGE_DESC` | 1-Satz-Vorteil + Nebenkeyword + Call-to-Action | `Automatisierte, geprüfte Datensicherung für Ihr KMU – lokal, cloud oder hybrid. … Jetzt beraten lassen.` |

Vermeide:
- Keyword-Stuffing oder Mehrfach-Wiederholungen im Title
- SEO-Buzz („#1", „Premium", „Top"); Nutze-concrete Vorteile („Ransomware-sicher")
- Englisches Title-Case; Nutze `de-CH`-Kleinbuchstaben nach dem ersten Wort

## 10. Trailing-Slash-Konvention

Alle internen Links (gemäß Beobachtung im Code) verwende **keine** Trailing-Slash:
- Links: `<Link href="/managed-it-services/backup">` ✓
- Canonical: `https://kpx-it.ch/managed-it-services/backup` ✓
- Ausnahme: Root `https://kpx-it.ch/` (einzigster erlaubter Trailing-Slash)

`next.config.ts` kann einen Trailing-Slash-Redirect aktivieren oder deaktivieren — bestehende Seiten sind konsistent ohne, neue nicht abweichen.

## 11. Testing

- [Google Rich Results Test](https://search.google.com/test/rich-results) gegen dev-URL prüfen nach Schema-Änderung.
- Side-by-Side-Vergleich der Canonical und og-image über `curl https://kpx-it.ch/<path>` — nich beide existent und `200 OK` vor Deployment.

## 12. Vorschriften für Migration

- **Keine bestehenden Canonicals ändern** ohne Genehmigung (Fehlerdinest SEO-Relevanz). Nur ergänzen.
- **Keine `noindex`-Seiten erstellen**, außer das Backend ist dem Kunden ausdrücklich kommuniziert.
- **`faqs`-Array-Driven JSON-LD** — Schema immer aus dem gleichen Array wie die Render-FAQs abgeleitet, nie separate Strings pflegen.