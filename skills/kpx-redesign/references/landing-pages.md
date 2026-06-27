# Lokale Service-Landing-Pages — Vollständiger Bau-Guide

> **Single-Source-of-Truth** für die Erstellung, Migration und das Refinement von Lokalen Service-Landing-Pages auf kpx-it.ch.
>
> **Begriff:** „Lokale Service-Landing-Page" (kurz: **LSL**) ersetzt den älteren Begriff „SEO-Cluster" vollständig (siehe Lektion 52). Es handelt sich um Hub-Pages, die **regionale Suchanfragen** (z. B. „it dienstleister zürich", „it firmen zürich", „it support zürich") bedienen und auf die Managed-Services-Subpages verlinken.

## 1. Definition & Zweck

Eine **Lokale Service-Landing-Page** ist eine Hub-Seite, die:

1. Eine **regionale, kaufabsichtsstarke Suchanfrage** bedient (meistens „\<Dienstleistung\> \<Region\>")
2. Den **User vor der Entscheidung** zwischen 3 Betreuungsmodellen abholt (Rundum / Gemeinsam / Eigenregie)
3. **Konkrete Vorteile** (typischerweise 6 nummerierte) für die Wahl von KPX liefert
4. **Auf Managed-Service-Subpages verlinkt** (z. B. `/managed-it-services/server`, `/cloud`)
5. **Lokale Trust-Signale** zeigt (Adresse Wallisellen, Regionen, Direktkontakt)

**Zweck:** Lead-Generierung für regionale IT-Services bei Schweizer KMU.

## 2. Kanonische Referenzseite

**`/it-dienstleister-zuerich`** ist die Master-Referenz für Lokale Service-Landing-Pages (Iteration 33).

| Route | Datei | Status |
|---|---|---|
| `/it-dienstleister-zuerich` | `app/it-dienstleister-zuerich/page.tsx` | ✅ Iteriert 33+, vollständig |
| `/it-firmen-zuerich` | `app/it-firmen-zuerich/page.tsx` | ⏳ Prio 1 (nächste Migration) |
| `/it-outsourcing-zuerich` | `app/it-outsourcing-zuerich/page.tsx` | ⏳ Prio 2 |
| `/it-support-zuerich` | `app/it-support-zuerich/page.tsx` | ⏳ Prio 3 |
| `/it-beratung-kmu` | `app/it-beratung-kmu/page.tsx` | ⏳ Prio 4 |
| `/it-sicherheit-kmu` | `app/it-sicherheit-kmu/page.tsx` | ⏳ Prio 5 |
| `/microsoft-365-kmu` | `app/microsoft-365-kmu/page.tsx` | ⏳ Prio 6 |
| `/it-dienstleister-kmu` | `app/it-dienstleister-kmu/page.tsx` | ⏳ Prio 7 |

## 3. 13-Sektionen-Schema (kanonisch)

Aus Lektion 52, validiert auf `/it-dienstleister-zuerich` (Iteration 30.2 → 33).

| # | Sektion | Komponente / Typ | BG |
|---|---|---|---|
| 1 | Hero | Standard-Blau Hue 245, radial-gradient, `/zurich-hero.jpg` (CloudFront-Fallback: kein Image) | blau (radial-gradient) |
| 2 | Stats-Bar | 4 Stats (20+ / Persönlich / DSG / Spezialisiert), IMMER 1:1 von Startseite (Lektion 22) | weiß |
| 3 | Problem (Schmerz) | Plain-Text-Sektion, 4 Pain-Points mit Icons (`AlertCircle`, `Clock`, `Lock`, `Eye`) | light (`kpx-section-light`) |
| **4** | **Frage „Ihre IT läuft. Ihr Betrieb auch?"** | Dunkle Center-Section mit provokativer Headline + 30-Min-Versprechen | **dunkel (`kpx-section-dark`)** |
| **5** | **Chevron „Drei Betreuungsmodelle"** | `<ServiceModelArrowsFull />` mit `heading`/`subheading`-Props | **weiß** |
| **6** | **6 Vorteile in 2 Spalten** | `grid grid-cols-1 md:grid-cols-2 gap-4` mit `loesungsFeatures`-Array | **light-grey (`oklch(0.97 0.01 220)`)** |
| 7 | 4 Prozess-Schritte | `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` mit `step`/`title`/`desc`/`highlight` | weiß |
| 8 | Infobalken + Context-Block | 3 Sub-Blöcke: A KPX-Arbeitsweise (4 Cards, 2×2) + B Allgemeine Informationen (3 Spalten + Quellen) + C IT-Beratung (3 Absätze + Link) | dunkel |
| 9 | Themen-FAQ | 10 FAQs in `grid grid-cols-1 md:grid-cols-2 gap-3` (Lektion 60) | dunkel, `borderTop: 3px solid oklch(0.62 0.14 225)` |
| 10 | Störungen-Sektion | Managed Services Grid aus `produkte.ts`, 6 Cards `lg:grid-cols-6` + 2 Extra Services + 5 Verwandte Links | light (`kpx-section-light`) |
| 11 | IT-Wissen Blog | 4 neueste Posts aus `getLatestPosts(4)` mit Fallback-Array | weiß |
| 12 | Servicegebiet | Direktkontakt-Box (mit „KPX AG, Grindelstrasse 6") + Regionen-Badges + Calculator-Mini-Banner | light-grey |
| — | ServicePageFooter | Final-CTA `currentServiceId="<slug>"` | weiß |

**14-Sektionen-Variante** für Hub-Pages mit besonders viel Content: zusätzliche Sektion 13 (z. B. Vergleichstabelle, FAQ-Erweiterung, Testimonials).

## 4. Argumentations-Reihenfolge (Lektion 59)

**Pain → Frage → Lösung → Detail → Prozess → Kontext → Trust → CTA**

| Stufe | Sektion | Funktion |
|---|---|---|
| **1. Schmerz aufzeigen** | 3 Problem | User erkennt sein Problem wieder |
| **2. Frage aufwerfen** | 4 Frage | User wird emotional aktiviert („läuft Ihre IT auch wirklich?") |
| **3. Grobe Entscheidungs-Hilfe** | 5 Chevron | User sieht 3 Modelle, wählt seinen Bedarf |
| **4. Detail-Vorteile** | 6 Vorteile | User erhält konkrete Mehrwerte für KPX |
| **5. Wie gehen wir vor?** | 7 Prozess | User versteht Ablauf, gewinnt Vertrauen |
| **6. Kontext** | 8 Context | User lernt KPX-Methodik kennen (informational) |
| **7. Trust** | 9-11 FAQ, Störungen, IT-Wissen | User erhält Antworten + Domain-Wissen |
| **8. CTA** | 12-13 Servicegebiet + ServicePageFooter | User konvertiert (Kontakt, Gratis-Erstgespräch) |

**Warum genau diese Reihenfolge?**
- Schmerz und Frage aktivieren emotional (1-2)
- Lösung und Vorteile liefern Argumentations-Kette (3-4)
- Prozess und Kontext liefern Vertrauen (5-6)
- Trust-Sektionen beantworten verbleibende Fragen (7)
- CTA schliesst ab (8)

## 5. BG-Rhythmus (Lektion 53)

Kanonische Sequenz auf `/it-dienstleister-zuerich`:

```
Hero (blau) → Stats (weiß) → Problem (light) → Frage (dunkel)
   → Chevron (weiß) → Vorteile (light-grey) → Prozess (weiß)
   → Context (dunkel) → FAQ (dunkel) → Störungen (light)
   → IT-Wissen (weiß) → Servicegebiet (light-grey)
```

**Regel:** JEDER Übergang zwischen 2 verschiedenen BG-Werten. Niemals zwei `light-grey` direkt hintereinander, niemals zwei `dark` direkt hintereinander (außer FAQ mit `borderTop` als Trenner).

**Vorteile-Karten-BG:** Bei light-grey-Section immer `style={{ backgroundColor: "white" }}` für die Cards (Kontrast).

## 6. FAQ-Layout-Standard (Lektion 60)

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
  {faqs.map((faq, i) => (
    <details key={i} className="group rounded-lg border p-6"
      style={{ borderColor: "oklch(0.35 0.07 250)", backgroundColor: "oklch(0.22 0.07 250)" }}>
      <summary className="flex items-center justify-between cursor-pointer list-none font-semibold text-sm py-1"
        style={{ color: "white" }}>
        {faq.q}
        <ChevronDown className="w-4 h-4 flex-shrink-0 ml-3 transition-transform group-open:rotate-180"
          style={{ color: "oklch(0.72 0.18 145)" }} />
      </summary>
      <p className="text-sm leading-relaxed mt-3 pt-3 font-medium"
        style={{ color: "oklch(0.82 0.04 220)", borderTop: "1px solid oklch(0.35 0.07 250)" }}>
        {faq.a}
      </p>
    </details>
  ))}
</div>
```

**Standard:** 10 FAQs pro LSL-Sektion. Bei weniger Content: weniger, aber mindestens 8.

**Schema.org FAQPage:** muss alle FAQs als `mainEntity` enthalten, zentral im `schemaJsonLd`-Block definiert.

## 7. KPX vs. KPX AG Naming (Lektion 58)

| Stelle | Wert |
|---|---|
| Hero-Subtitle | `KPX ist Ihr lokaler IT Dienstleister...` |
| Pain-Points (Sektion 3) | kein Firmenname-Erwähnung |
| Chevron-Subheading (Sektion 5) | `KPX betreut Ihre IT als vollständiger Dienstleister...` |
| USPs / Context-Block (Sektion 8) | `Bei KPX haben Sie einen festen IT-Verantwortlichen...` |
| Vergleichskarten | `Externer IT-Dienstleister (KPX)` |
| FAQ-Fragen und Antworten | `Was macht KPX als IT Dienstleister in Zürich?` |
| ServicePageFooter ctaDesc | `KPX ist Ihr IT Dienstleister in Zürich...` |
| ServicePageFooter ctaTitle | unverändert (z. B. „Ihre IT in zuverlässigen Händen.") |
| Metadata Title/Description | `KPX` (z. B. „IT Dienstleister Zürich – IT Dienstleistungen für KMU \| KPX") |
| Metadata OG siteName | `KPX` |
| Metadata OG/Twitter alt/title | `KPX` |
| **Schema.org `name` (LocalBusiness)** | **`KPX AG`** ← bleibt für Brand-Erkennung |
| **Schema.org `provider.name`** | **`KPX AG`** ← bleibt |
| **Schema.org `description`** (LocalBusiness, Service) | `KPX ist...` ← Sichttext-Regel |
| **Direktkontakt-Adresse (Sektion 12)** | **`KPX AG, Grindelstrasse 6`** ← Ausnahme „ausser bei der Adresse" |
| `kpx-` Prefix in CSS-Klassen | unverändert (Code, kein Sichttext) |

## 8. SEO-Research-Workflow (Lektionen 54-56)

Vollständige Anleitung: `references/seo-research-workflow.md`.

### Phase 1 — VOR Migration (DataForSEO)

```bash
python3 scripts/seo_research.py \
  --slug it-firmen-zuerich \
  --keyword "it firmen zürich" \
  --variants "IT-Firmen Zürich,it firmen in zürich" \
  --longtails "it firmen zürich kmu,it firmen wallisellen" \
  --phase1
```

**6 API-Calls:** `keyword_overview`, `search_intent`, `keyword_ideas`, `related_keywords`, `bulk_keyword_difficulty`, `serp_organic_live_advanced`.

Output dokumentieren in `app/<slug>/seo-research.md` (siehe `/it-dienstleister-zuerich/seo-research.md` als Vorbild).

### Phase 2 — Code-Migration
- Title/Description an Suchvolumen + Intent anpassen
- Pain-Points mit Long-Tail-Keywords abgleichen
- FAQ-Fragen an `related_keywords` ausrichten
- Vorteile und Chevron-Inhalte suchintentspezifisch schreiben

### Phase 5 — 3-4 Wochen NACH Migration (GSC)

```bash
python3 scripts/seo_research.py \
  --slug it-firmen-zuerich \
  --gsc \
  --start 2026-07-01 \
  --end 2026-07-31
```

**Voraussetzungen:**
- Service-Account-JSON `/root/kpx-gsc-service-account.json`
- Property-Format `sc-domain:kpx-it.ch` (NICHT URL-Prefix)
- Owner-Permission in GSC-Oberfläche (User-Aktion)

Output ergänzen in `app/<slug>/seo-research.md`.

## 9. Sektion-Tausch-Logik (Lektion 57)

Beim Refinement (z. B. User-Wunsch „Sektion 4 mit Sektion 8 tauschen"):

1. **Argumentations-Logik wichtiger als Seitennummer** — User trifft Entscheidung anhand Pain → Lösungs-Übersicht → Vertrauensaufbau
2. **BG-Rhythmus prüfen vor Swap** — sicherstellen, dass keine 2 gleichen BGs aufeinander folgen
3. **Section-Komponenten-Identität bleibt** — `<ServiceModelArrowsFull />` rendert mit eigenem internen Padding/Margin, Section-BG-Wechsel unproblematisch
4. **Card-in-Section-BG anpassen** — bei light-grey-Section müssen Cards `white` sein für Kontrast
5. **Nachgelagerte Sektionen umnummerieren** — Kommentare (`{/* ── N. ... */}`) aktualisieren

## 10. Hub-Template (Lektion 49)

LSL-Template für Migration aus `pages-to-migrate.md`:

```tsx
import ServiceModelArrowsFull from "@/components/ServiceModelArrowsFull";
import ServicePageFooter from "@/components/ServicePageFooter";
import { getLatestPosts } from "@/lib/blogPosts";
import { produkte } from "@/app/data/produkte";

export const dynamic = "force-dynamic";

const PAGE_TITLE = "<Service> <Region> – <Dienstleistungen> für KMU | KPX";
const PAGE_DESC = "<Service> <Region> für KMU: <Bullet 1>, <Bullet 2>. <Trust-Signal>.";
const PAGE_URL = "https://kpx-it.ch/<slug>";
const HERO_IMG = "/<slug>-hero.jpg";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: { canonical: PAGE_URL },
  openGraph: { /* ... */ },
};

const heroPoints = [/* 4 Trust-Signale */];
const locationBadges = [/* Region-Badges */];
const problemPoints = [/* 4 Pain-Points mit icon */];
const loesungsFeatures = [/* 6 Vorteile */];
const subServices = [/* aus produkte.ts */];
const kpxArbeitsweise = [/* 4 Cards */];
const allgemeineErklaerungen = [/* 3 Spalten */];
const itBeratungAbsaetze = [/* 3 Absätze */];
const regions = [/* Region-Liste */];
const verwandteLinks = [/* 5 verwandte Seiten */];
const faqs = [/* 10 FAQs */];

const schemaJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    /* BreadcrumbList, LocalBusiness, WebPage, Service, FAQPage */
  ],
};

export default function <PageName>() {
  const latestPosts = (() => {
    const posts = getLatestPosts(4);
    return posts.length >= 4
      ? posts.slice(0, 4).map(/* ... */)
      : fallbackPosts.map(/* ... */);
  })();

  return (
    <div className="min-h-screen flex flex-col">
      {/* 13 Sektionen gemäß Schema in §3 */}
      <ServicePageFooter
        currentServiceId="<slug>"
        ctaTitle="<kanonische Final-CTA-Headline>"
        ctaDesc="<kanonische ctaDesc>"
        itWissenLinks={[]}
      />
      <script type="application/ld+json" /* ... */ />
    </div>
  );
}
```

## 11. Context-Block-Pattern (Lektion 48)

Sektion 8 (Infobalken + Context-Block) ist immer 3-Sub-Block-Struktur auf dunklem BG:

### Sub-Block A — KPX-Arbeitsweise (4 Cards, 2×2-Grid, ZUERST)

```tsx
<h2>So arbeiten wir als <Service> in <Region></h2>
<p><Sub-Heading></p>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
  {kpxArbeitsweise.map((card) => (
    <div key={card.h3} className="rounded-lg p-5"
      style={{ backgroundColor: "oklch(0.28 0.07 250)", border: "1px solid oklch(0.35 0.07 250)" }}>
      <h3>{card.h3}</h3>
      <p>{card.text}</p>
    </div>
  ))}
</div>
```

### Trennelement zwischen A und B

```tsx
<div className="border-t my-12" style={{ borderColor: "oklch(0.62 0.14 225 / 0.3)" }} />
```

### Sub-Block B — Allgemeine Informationen (3 Spalten, mit Quellen-Links, ZWEITENS)

```tsx
<h2>Allgemeine Informationen rund um <Service></h2>
<p><Sub-Heading></p>
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
  {allgemeineErklaerungen.map((col) => /* Card mit externen Quellen-Links */)}
</div>
<p><Quellen: BACS/NCSC, SwissICT, KMU-Admin (SECO), EDÖB — Datenschutz></p>
```

### Trennelement zwischen B und C

```tsx
<div className="border-t my-12" style={{ borderColor: "oklch(0.62 0.14 225 / 0.3)" }} />
```

### Sub-Block C — IT-Beratung (3 Absätze + Link, DRITTENS)

```tsx
<h2>IT-Beratung und <Service> für KMU in <Region></h2>
<p><Sub-Heading></p>
<div className="max-w-3xl mx-auto space-y-4">
  {itBeratungAbsaetze.map((absatz, i) => <p key={i}>{absatz}</p>)}
</div>
<div className="text-center mt-6">
  <Link href="/kontakt">Gratis IT-Beratungsgespräch vereinbaren →</Link>
</div>
```

**Reihenfolge:** Immer **A → B → C** (Commercial-Top / Informational-Bottom, Lektion 53).

## 12. Statische Checkliste vor Push (Lektion 24, 36, 40, 60)

```bash
cd /root/opencode/workspace/kpxitch/experimental

# 1. TypeScript
./node_modules/.bin/tsc --noEmit
echo "tsc Exit: $?"  # muss 0 sein

# 2. Next.js Build
./node_modules/.bin/next build
echo "next Exit: $?"  # muss 0 sein

# 3. Umlaut-Check (sollte > 50 sein)
grep -cE "ä|ö|ü|Ä|Ö|Ü|é|è|à" app/<slug>/page.tsx

# 4. ß-Check (muss 0 sein)
grep -c "ß" app/<slug>/page.tsx

# 5. KPX/AG-Check (nur Schema + Adresse erlaubt)
grep -n "KPX AG" app/<slug>/page.tsx
# erwartete Ausgabe: 2 Treffer (Schema.name + Direktkontakt)

# 6. Sektions-Reihenfolge verifizieren
grep -E "^\s*\{/\* ── \d+\." app/<slug>/page.tsx
# erwartete Ausgabe: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 (LSL mit 12 Sektionen + Footer)
```

## 13. Prio-Reihenfolge für 7 ausstehende Migrationen

Basierend auf DataForSEO + GSC-Daten aus Iteration 31:

| Prio | Route | Begründung |
|---|---|---|
| 1 | `/it-firmen-zuerich` | 56 GSC-Impressions bestätigen Suchinteresse |
| 2 | `/it-outsourcing-zuerich` | Cluster-Schwerpunkt |
| 3 | `/it-support-zuerich` | 170 GSC-Impressions — höchste im Cluster |
| 4 | `/it-beratung-kmu` | 41 GSC-Impressions |
| 5 | `/it-sicherheit-kmu` | DataForSEO-Recherche nötig |
| 6 | `/microsoft-365-kmu` | M365 bereits Top 10 |
| 7 | `/it-dienstleister-kmu` | KMU-Spezialisierung |

**Pro Migration:**
1. Phase 1 SEO-Research (10–15 min, `scripts/seo_research.py --phase1`)
2. Migration nach 13-Sektionen-Schema (45–60 min)
3. Statische Checks + Build (10 min)
4. Commit + Push (5 min)
5. Skill-Sync (5 min)
6. 3-4 Wochen warten, dann Phase 5 GSC-Check (10 min)

**Total: ~75 min pro Migration, dann 4 Wochen Monitoring.**

## 14. Häufige Fehlerquellen

1. **BG-Rhythmus verletzt** — zwei light-grey Sektionen hintereinander (Lektion 53)
2. **KPX AG im Sichttext** — Schema + Direktkontakt sind die einzigen Ausnahmen (Lektion 58)
3. **Hero-Background falsch** — IMMER Hue 245 Standard-Blau radial-gradient (Lektion 41)
4. **Chevron-Highlight** — KEIN `highlight: true`, kein „Empfohlen"-Badge, kein cyan-Border-Highlight
5. **`ServiceModelArrowsFull currentServiceId`-Prop** — existiert NICHT, ist verboten (Lektion 38)
6. **`ß` im Sichttext** — IMMER `ss`
7. **Trailing-Slash in Canonical** — `https://kpx-it.ch/<slug>` OHNE trailing `/`
8. **OG-Image nicht 1200×630** — `images: [{ url: HERO_IMG, width: 1200, height: 630, ... }]`
9. **`<script type="application/ld+json">` fehlt** — muss am Seitenende rendern, mit `JSON.stringify(schemaJsonLd)`
10. **`@id` der Organisation falsch** — IMMER `https://kpx-it.ch/#organization`

## 15. Referenzen

- `references/seo-research-workflow.md` — vollständiger SEO-Workflow (Phase 1 + 5)
- `references/section-rhythm.md` — Sektionen-Schemata
- `references/components.md` — Komponenten-Snippets
- `references/design-tokens.md` — oklch-Farbwerte
- `references/seo-schema.md` — Metadata-Export, JSON-LD `@graph`
- `references/tone-voice.md` — de-CH-Regeln, Wortliste, Lektionen 1–60
- `references/migrations-playbook.md` — alle bisherigen Iterationen (1–34)
- `references/pages-to-migrate.md` — Inventar aller zu migrierenden Seiten
- `references/build-verification.md` — Build-Verifikation
- `scripts/seo_research.py` — Python-Hilfsskript für Phase 1 + 5