---
name: kpx-redesign
description: Use when creating, editing, or migrating pages on the KPX AG website (Next.js App Router, repo github.com/Busch80/kpx-itch, branch devel) to the new design system introduced on the homepage `/`, `/externe-it-abteilung`, `/it-outsourcing-kmu`, and `/managed-it-services/backup`. Front-load triggers: edits to `app/**/page.tsx`, requests to migrieren/redesign/übertragen/einhalten des neuen Designs, new pages under `managed-it-services/`, `it-dienstleister/`, `it-outsourcing-`, `ki-loesungen/`, discussions about KPX oklch colors, section rhythm, FAQ accordion, ServicePageFooter, JSON-LD schema, de-CH copy tone, KPX metadata, BreadcrumbList, FAQPage, Organization @id, or Swiss Standard German copy rules. Use ONLY for the KPX IT codebase (Busch80/kpx-itch); do not use for unrelated projects.
---

# KPX Redesign — Neues Design-System für kpx-itch

Dieser Skill richtet dich ein, das **neue KPX-Design-System** (oklch-basiert, 15-Sektionen-Rhythmus, de-CH-Sprache) auf alle weiteren Seiten des Next.js-Repo `Busch80/kpx-itch` anzuwenden — sowohl beim **Migrieren** bestehender `app/**/page.tsx` als auch beim **Neuerstellen** von Seiten im neuen Stil.

## 1. Kanonische Referenzseiten

Vier Seiten sind bereits im neuen Stil implementiert und sind die alleinige Wahrheitsquelle für das Design:

| Route | Datei | Template-Typ | Spezialität |
|---|---|---|---|
| `/` | `app/page.tsx` | Hub | Hero mit CloudFront-Hintergrundbild + Gradient-Overlay, Cliffhanger-Quote, `<BranchenTabs />`, `<PartnerSlider />`, light FAQ |
| `/managed-it-services/backup` | `app/managed-it-services/backup/page.tsx` | **Service-Subpage (Master)** | Vollständiger 15-Sektionen-Rhythmus, `<BackupDiagram />`, dark FAQ (native `<details>` mit grünem Chevron) |
| `/externe-it-abteilung` | `app/externe-it-abteilung/page.tsx` | Service-Hub | `<ServiceModelArrowsFull />` (3 Modelle), Vergleichstabelle, Ratgeber-Artikel (`max-w-3xl`) |
| `/it-outsourcing-kmu` | `app/it-outsourcing-kmu/page.tsx` | SEO-Hub | `<ServiceModelArrows />` (2 Modelle), 2-Karten-Vergleich, 3-Spalten-Checkliste, light FAQ, compact-`produkte` Array vor Ort |

**Wähle das passende Template nach Seitentyp:**
- `managed-it-services/<slug>` → Master-Template (`templates/managed-service-page.tsx`)
- `it-dienstleister-*`, `it-outsourcing-*`, `it-*`-Cluster, `externe-it-abteilung` → SEO-Hub-Template (`templates/seo-hub-page.tsx`)
- Startseite → lieg `app/page.tsx` direkt als Vorbild zu, sie ist zu speziell für ein generisches Template
- KI-Lösungen → wie SEO-Hub, aber ggf. `<KiPageFooter />` statt `<ServicePageFooter />`

## 2. Repo-Zugriff

```bash
git clone git@github.com:Busch80/kpx-itch.git
cd kpx-itch
git checkout devel
pnpm install
pnpm dev   # http://localhost:3000
```

Alternativ mit Personal Access Token via HTTPS (Credential-Helper). **Schreibe niemals Tokens in Skill-Dateien, Code, oder Commits.** Verwende Umgebungsvariablen, `git credential-helper`, oder die SSH-URL.

Arbeite immer auf Branch `devel` oder einem Feature-Branch von `devel`. Committe nichts, bevor der Kunde es nicht ausdrücklich verlangt.

## 3. Referenzdokumente (Detailwissen)

Diese Dateien liegen neben der `SKILL.md` und enthalten die vollständigen Spezifikationen. Lese sie vor, wenn du Seiten baust oder migrierst:

| Datei | Inhalt |
|---|---|
| `references/design-tokens.md` | Alle oklch-Farbwerte, Layout-Helper-Klassen, Typografie, Buttons, Card-Varianten, Animations-Klassen |
| `references/section-rhythm.md` | Kanonischer 15-Sektionen-Rhythmus, Stats, 4-Step-Prozess, Infobalken, Mischungsregeln |
| `references/components.md` | Snippets für alle wiederkehrenden Blöcke (Hero, Stats, Infobalken, Steps, Benefits, FAQ hell/dunkel, Services-Grid, Blog, Servicegebiet, Final-CTA) |
| `references/seo-schema.md` | Metadata-Export, JSON-LD `@graph` (BreadcrumbList, FAQPage, Organization `@id:#organization`, Service), Robot/Sitemap |
| `references/tone-voice.md` | de-CH Regeln (kein ß → ss), Wortliste, kanonische Phrasen, harte Fakten statt Marketing |
| `references/pages-to-migrate.md` | Inventar aller 55 zu migrierenden `app/**/page.tsx` mit Prioritäten, Routing-Konflikten, SEO-Backlog |
| `templates/managed-service-page.tsx` | Blanko-Vorlage für `managed-it-services/*` Subpages (Backup-Blaupause) |
| `templates/seo-hub-page.tsx` | Blanko-Vorlage für IT-Dienstleister/KMU-Cluster (externe-it-abteilung-Blaupause) |

## 4. Workflow A — Bestehende Seite migrieren

Beim Migrieren einer bestehenden `app/<route>/page.tsx` ins neue Design:

1. **Seitentyp erkennen** anhand der Route:
   - `managed-it-services/*` → Master-Template, Backup-Seite als Vorbild
   - `it-dienstleister-*`, `it-outsourcing-*`, `externe-it-abteilung`, `it-*`-Cluster, `microsoft-365-kmu`, `diese-it-probleme-loesen-wir`, `probleme` → SEO-Hub-Template, externe-it-abteilung als Vorbild
   - `ki-loesungen/*` → SEO-Hub-Template + `KiPageFooter` prüfen
   - Legals (`impressum`, `datenschutz`, `agb`) → zentraler Article-Block mit `max-w-3xl`
   - `/en/*` → eigene Vorlage (englisch; nur wenn explizit verlangt)
2. **Bestehenden Inhalt inventarisieren**: Titel (H1), Hauptaussage, Benefits, Features, FAQ, Blog-Referenzen, Schematyp, Canonical. Behalte alle Inhalte und Fakten bei, nur Design/Sprache/SEO werden auf neuen Stil gesetzt.
3. **Schemafeld-Belegung vorbereiten**: `PAGE_TITLE`, `PAGE_DESC`, Canonical (ohne Trailing-Slash), Breadcrumb-Levels, Service-Name, FAQ-Array.
4. **Neue Datei aus Template bauen** ( Kopiere `templates/<passend>.tsx` als Startpunkt, passe Slots aus. Nutze `references/components.md` für Snippets.
5. **Sektionen-Modell prüfen** anhand `references/section-rhythm.md`. Page-spezifische Grafiken (Backup-Diagram → ServiceModelArrows etc.) ersetzen. Optional Sections (Cliffhanger, BranchenTabs, PartnerSlider) nur dort, wo das Vorbild sie hat.
6. **SEO + JSON-LD vollständig neu aufbauen** nach `references/seo-schema.md`. Verwende immer `@graph`-Struktur. Canonical exakt ohne Trailing-Slash (`https://kpx-it.ch/managed-it-services/backup`). og-image immer 1200×630, locale `de_CH`.
7. **Sprache de-CH prüfen**: ß → ss, Datum `toLocaleDateString("de-CH", ...)`, Wortliste aus `references/tone-voice.md`. Keine Phrasendrescherei, sondern konkrete Fakten.
8. **Build & Lint ausführen**: `pnpm tsc --noEmit && pnpm lint`. Rot/Type-Fehler beheben, nicht unterdrücken.
9. **Visuell prüfen** via `pnpm dev` und Side-by-Side-Vergleich mit der nächstgelegenen Referenzseite.

## 5. Workflow B — Neue Seite erstellen

Beim Neuerstellen einer Seite (z. B. aus SEO-Backlog `references/pages-to-migrate.md`):

1. **Route und Dateiort festlegen**: Neue `app/<route>/page.tsx`. Falls die Route schon belegt ist, kläre mit dem Kunden — duppliziere keine Routen.
2. **SEO-Recherche**: Intention (informational/transactional), Haupt-/Zweit-Keyword, FAQ-Skizze, Schema-Service-Typ. Normaleien auf Schweizer Markt (`… für KMU`, `… in der Schweiz`, `… Schweiz`).
3. **Template auswählen und ausfüllen**: `templates/managed-service-page.tsx` oder `templates/seo-hub-page.tsx` kopieren, alle `{SLOT}`-Felder ersetzen.
4. **Inhalte nach Plan**: Hero-Hauptaussage (1 Satz), 4-6 Benefits mit Beschrieb, Features-Checkliste 8-12 Punkte, 6-10 FAQs (aus Recherche + eigener Kenntn TLS), Blog-Sektion (`getLatestPosts(3)` oder 4 kuratierte, thematisch passende Artikel).
5. **Schema bauen** wie in Migration, Schritt 6. Falls Neue-/Cluster-Seite, füge `WebPage` (`isPartOf #website`) hinzu.
6. **Interne Verlinkung**: Neue Seite im Navbar/Footer eintragen (`components/Navbar.tsx`, `components/Footer.tsx`), sowie in `app/sitemap.ts` (`defaultSitemap` ind vom Rechner aus passend ausgelegt). Keine orphan-Seiten.
7. **Legal/Compliance**: DSG erwähnen (Datenhaltung in CH), keine Versprechungen ohne SLA-Hysterese, Telefonnummer, Adresse korrekt.

## 6. Immer gültige Vorgaben (Kurzgut)

- **Farben nur via oklch** aus `references/design-tokens.md`; keine Hex-Werte (Ausnahme: `ServiceModelArrowsFull` steht noch aus; neue Arbeiten daran solltest du oklch-isiert mit abliefern).
- **Background-Rhythmus**: dark `oklch(0.22 0.07 250)` ↔ light `oklch(0.96 0.008 220)` ↔ white ↔ light-grey `oklch(0.97 0.01 220)`. Niemals drei helle oder drei dunkle Sections aufeinander.
- **Akzentfarben**: cyan `oklch(0.62 0.14 225)` für Links/Icons/Badges/Buttons; grün `oklch(0.72 0.18 145)` nur für positive Checkmarks/verifizierte Eigenschaften.
- **Klassenhelfer verwenden**: `kpx-section{,-light,-dark}`, `container {max-w-5xl mx-auto}`, `section-heading{,-light}`, `fade-in`, `stagger-children`. Keine Original-Styles für Standardpatterns erfinden.
- **Hero-PaddingTop**:`calc(80px + 56px)` (Navbar-Höhe + Puffer), `minHeight: "520px"`, Welle-SVG ganz unten.
- **Telefon/Adresse konstant**: `044 589 695 5`, `Grindelstrasse 6, 8304 Wallisellen`, `Kanton Zürich, Schweiz`.
- **de-CH**: kein ß, Datum-Format, kanonische Phrasen("Ihre IT in zuverlässigen Händen.", "Was drin steht, gilt.").
- **Metadata-Template**: `title`, `description`, `alternates.canonical` (KEIN Trailing-Slash ausser Root), `openGraph` (1200×630 og-image.png, `locale: "de_CH"`), `twitter.summary_large_image`.
- **JSON-LD**: `@graph` mit `BreadcrumbList` + `FAQPage` + `Organization @id` + `Service`/`WebPage`/`Article`. Render via `<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }} />` am Seitenende.
- **`@id` der Organisation konstant**: `https://kpx-it.ch/#organization` (wird von `app/layout.tsx` global referenziert).
- **Komponenten-Importe**: `FaqAccordion` aus `@/components/FaqAccordion`, `ServicegebietBlock` aus `@/components/ServicegebietBlock`, `ServiceModelArrowsFull` aus `@/components/ServiceModelArrowsFull`, `ServicePageFooter` aus `@/components/ServicePageFooter`, `getLatestPosts` aus `@/lib/blogPosts`, `produkte` aus `@/app/data/produkte`.
- **Icons nur aus `lucide-react`**; niemals eigene SVGs einbauen (ausser der Hero-Wellen-Divider).
- **Build-Test nach jeder Änderung**: `pnpm tsc --noEmit && pnpm lint`. Beide müssen grün sein, bevor du eine Seite als „fertig migriert" markierst.
- **Keine Komponenten neu erfinden**: Eher bestehende Komponenten erweitern als duplizieren.

## 7. Wann den Skill nicht verwenden

- Allgemeine Next.js-, React- oder Tailwind-Fragen ohne Bezug zur KPX-Codebase
- Edits am Backend (Supabase/Docbee-Integration), Preisrechner-Logik (`lib/calculateTotals.ts`), oder Mail-Versand (`app/api/contact/route.ts`) — das ist Domäne eigener, fachlicher Agenten/Reviews
- Allgemeine SEO-Beratung ohne Umsetzung in `kpx-itch`

## 8. Bekannte offene Punkte

- `ServiceModelArrowsFull.tsx` und `components/serviceModelData.ts` nutzen noch Hex-Werte (`#0B4A7F`, `#1B8FC4`, `#D6E6F0`, …). Diese sollten bei nächster Gelegenheit auf die oklch-Skala gesetzt werden. Eine Migration dieses Bausteins ist ein separater PR, nicht Teil einzelner Seiten-Migration.
- Routing-Konflikte in `produkte.ts`: `/managed-it-services/endpoint` vs `/managed-it-services/client`. Vor Migration klären, welche Route die kanonische ist.
- `/managed-it-services/backup` vs `/managed-it-services/microsoft-365-backup` — unterschiedliche Services, ohne canonical-`hreflang`-Bezug; vor Migration prüfen.

## 9. Aktivierung

Damit opencode diesen Skill lädt: Beim Öffnen des geklonten `kpx-itch`-Verzeichnisses liest opencode `.opencode/skills/kpx-redesign/SKILL.md` automatisch ein. Falls du den Skill in der laufenden Session noch nicht siehst: **opencode.Quit und neu starten**. Der Skill wird dann vom Loader erfasst und bei passenden Keywords automatisch vorgeschlagen.