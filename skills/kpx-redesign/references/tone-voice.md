# Tonfall & Sprache (de-CH) — KPX Redesign

## 1. Spracheinstellung

- **Sprache:** Schweizer Standarddeutsch (`de-CH`).
- `<html lang="de">` ist im Root-Layout gesetzt.
- `og.locale: "de_CH"` in jeder SeitensMetadata konstant.
- Datum-Format konstant: `toLocaleDateString("de-CH", { day: "2-digit", month: "long", year: "numeric" })`.

## 2. Rechtschreibung — kei ß → ss

**Konstante Regel:** `ß` wird **immer** durch `ss` ersetzt. Keine Ausnahme.

| Falsch (DE-DE) | Richtig (de-CH) |
|---|---|
| groß | gross |
| müssen | müssen ✓ (identisch) |
| außer | ausser |
| sogenanntes | sog. (kürzer ist oft besser) |
| Fußzeile | Fusszeile |
| Schluss | Schluss ✓ |
| süß | süs |

Wichtigster Treiber: Schweizer Tastaturen und `/de-CH`-Sprachtag haben kein `ß`.

## 3. Kanonische Wortliste (verwende diese Ausdrücke)

| Begriff | Bedeutung |
|---|---|
| KMU | Zielgruppe (KMU = kleine und mittlere Unternehmen, in der Schweiz🏭3-250 Mitarbeiter) |
| DSG-konform | Schweizer Datenschutzgesetz-konform. **Nicht** „DSGVO-konform" (DSGVO ist EU). DSG und DSGVO gemeinsam nur erwähnen, wenn explizite EU-Bezüge erklärt werden. |
| Wallisellen ZH | Ort (Kürzel `ZH` = Kanton Zürich) optional regionale Klarheit |
| SLA | Service-Level-Agreement, immer ausgeschrieben oder als Abkürzung „vertraglich geregelt" |
| Fixpreis / Pauschale | Monetäre Modelle |
| proaktiv | Wichtigster Anspruch — vorausschauend handeln statt im Nachhinein reparieren |
| aus einer Hand | Alle IT-Themen bei einer Ansprechperson |
| fester Ansprechpartner | Kern-USP |
| RTO / RPO | Recovery Time-/Recovery Point-Objective (technisch; nur mit Erklärung benutzen) |
| Immutable Backup | Unveränderliches Backup, nicht „immuell" oder „unveränderbar" |
| 3-2-1-Prinzip | Industriestandard: 3 Kopien, 2 Medien, 1 ausgelagert. Erweitert **3-2-1-1** mit 1 unveränderlichen Kopie. |
| Ransomware | Erpressungstrojaner. Englischer Term ist in CH-DACH alltäglich. |
| ohne Kleingedrucktes | KPX-Versprechen |
| Gratis Erstgespräch | Always gratis, immer unverbindlich — konstanter Eintritts-CTA |
| Ihre IT in zuverlässigen Händen. | Kanonische Final-CTA-Headline |
| Was drin steht, gilt. | Kanonische Offerten-Phrase |
| Sie entscheiden in aller Ruhe. | Kanonische Verkaufs-Phrase |
| Offerte | Schweizer Word fuer „Angebot" — IMMER „Offerte" statt „Angebot" schreiben. Ein Kunde kauft keine „Angebote", sondern erhaelt eine „Offerte" als Dokument. |

## 4. Schreibstil

### 4.1 Direkt, konkret, kein Marketing-Fluff

| ❌ Floskelhaft | ✅ Konkret |
|---|---|
| „Premium-Lösungen für anspruchsvolle Kunden" | „Server- und Client-Management mit verbindlichen SLA" |
| „Innovative Next-Gen-Sicherheit" | „SOC-gestützte Bedrohungserkennung (EDR) mit 24/7-Überwachung" |
| „Wir kümmern uns um alles" | „Wir übernehmen Server, Clients, M365, Cloud, Backup und Firewall" |
| „Viele Jahre Erfahrung" | „20+ Jahre IT-Praxis für Schweizer KMU" |
| „XXL-Service" | „Persönlicher fester Ansprechpartner" |
| „Unschlagbare Preise" | „Transparent kalkuliert, ohne Kleingedrucktes" |

### 4.2 Aussagen als Headings

Verwende Aussagen als Section-Headings, nicht bloße Etiketten:
- ✅ „Störungen erkennen wir, bevor sie Ihren Betrieb erreichen."
- ✅ „Vom ersten Gespräch zur zuverlässigen Datensicherung"
- ✅ „Was übernimmt IT Outsourcing für KMU konkret?"
- ❌ „Unsere Services" / „Vorteile" / „FAQ"

### 4.3 Harte Fakten statt Versprechen

Bevorzug konkrete Zahlen:
- „CHF 80'000–120'000 pro Jahr für eigene IT-Mitarbeitende"
- „CHF 488'000 durchschnittlicher Schaden bei Datenverlust (Swisscom)"
- „Reaktionszeit von 1 Stunde vertraglich festgelegt"
- „ab 5 Mitarbeitenden", „Mindestvertragslaufzeit: 12 Monate transparent"
- „20+ Jahre IT-Praxis"

Fakten sind wichtig zur Differenzierung. Keine unkonkrete Behauptungen — Zitate mit Quellen sind erlaubt (Swisscom, Veritas-Studien, etc.).

### 4.4 du oder Sie?

Einziges gültiges Personalpronomen ist **Sie** (grossgeschrieben am Satzanfang/Anrede, kleingeschrieben sonst). Keine `Du`-Form irgendwo im Frontend.

## 5. CTAs — kanonische Varianten

| Anlass | Text | Link href |
|---|---|---|
| Standard-Eintritt | `Gratis Erstgespräch vereinbaren` | `/kontakt` |
| Individuelle Offerte | `Ihre individuelle Erstanalyse` | `/kontakt` |
| Final-CTA-Button cyan | `Gratis Erstgespräch vereinbaren` oder seitenpezifisch `Ihre individuelle Erstanalyse` | `/kontakt` |
| Telefon-Button (Final-CTA) | `<Phone /> 044 589 695 5` | `tel:0445896955` |
| Services-Grid | `Alle 17 Managed Services entdecken` | `/managed-it-services` |
| Mehr erfahren | `Mehr erfahren →` | (page-spezifisch) |
| Blog weiterlesen | `Lesen <ArrowRight />` | `/it-wissen/<slug>` |
| Blog-Index weiterlesen | `Alle Artikel <ArrowRight />` | `/it-wissen` |

## 6. Konstante Adress- & Kontaktdaten

| Feld | Wert |
|---|---|
| Firmenname | `KPX AG` |
| Strasse | `Grindelstrasse 6` |
| PLZ Ort | `8304 Wallisellen` |
| Kanton | `Kanton Zürich` |
| Land | `Schweiz` |
| Telefon (display) | `044 589 695 5` |
| Telefon (href) | `tel:0445896955` |
| Telefon (Schema) | `+41445896955` |
| E-Mail | `info@kpx-it.ch` |
| Geo (LocalBusiness) | `latitude: 47.4135, longitude: 8.5849` (prüfen vor aktuellem Einsatz!) |
| Servicegebiet Tags | `Zürich Stadt, Zürich Nord, Glattal, Winterthur, Zug, Aargau, Schweizweit remote` |

Diese Werte anstehen in JSON-LD, Footer, Navbar, Servicegebiet-Blöcken — überall identisch. Bevor Änderungen (Umzug, neue Nummer) einfließen, zentrifugieren: zuerst Root-Layout-`LocalBusiness`, dann alle Skill-Texte, dann Footer/Navbar.

## 7. Typografie-Feinheiten

| Element | Briefing |
|---|---|
| H1 | `<Title in Aussage>` – `<br/>` `<Subline>` (z. B. `Datensicherung für KMU –<br/>Managed Backup Schweiz`) |
| H2 (section-heading) | Aussage als Heading, 1.875rem → 2.25rem md, weight 700, Farbe dunkelblau |
| Subheadings (section-subheading) | 1.125rem, muted-foreground, max-width 42rem, max. 20 Worte, Aussage |
| Body | `text-sm` default, `leading-relaxed`, keine langen Sätze (>22 Wörter vermeiden) |
| Listen | Bullet-points `CheckCircle2` mit cyan/max. 6-12 Wörter pro Punkt |
| Herzstück-Zitate | Short sentences, oft mit Fakten am Ende: „Ein sauberes, getestetes Backup ist die wichtigste Massnahme gegen Ransomware." |

## 8. FAQ-Stil

Pro Seite 6-10 (max. 12) FAQs. Stil:
- **Frage:** User-natürlich formuliert („Was kostet…", „Was ist der Unterschied zwischen X und Y?", „Wie schützt mich X vor Y?"). Enthält oft das Haupt- oder Nebenkeyword.
- **Antwort:** 2-4 Sätze, konkret. Enthält mindestens einen konkreten Wert (Preis, Zeit, Verhältnis), ggf. Quellenangabe. Endet oft mit Handlungsvorschlag: „Im Gratis-Erstgespräch erhalten Sie eine transparente Einschätzung."
- Link-Feld bei Bedarf: `link: { href: "/it-wissen/<slug>", label: "<kurzer Label>" }` — für thematisch passenden Ratgeber-Verweis.

Antworten sind **nicht** für Schema-dedupliziert — genau der gleiche Text in `faqs`-Array dient sowohl Render als auch `FAQPage.mainEntity`. Niemals separate Schema-Antwort-Strings pflegen.

## 9. Verbindliche Satzzeichen & Zeichen

- Apostroph in Zahlen: `80'000`, `120'000`, `488'000` — Schweizer Schreibweise mit `'` (nicht `,`).
- Bindestrich mit Gedankenstrich: `–` (em- oder en-dash) vor Subline-Teil der H1 (z. B. `Datensicherung für KMU –<br/>Managed Backup Schweiz`).
- Keine „&" statt „und" in Fließtext (außer Markenbezüge: „M365 & Co."-Stil).
- Keine Ausrufezeichen in Adjektiv-Headings (keine „Innovativ!").
- Kein Emojis in Skill-Dateien oder Frontend.

## 10. Keyword-Dichte (Ratschlag)

- Hauptkeyword in H1, Meta-Title, first paragraph, 1 laz-Zwischenüberschrift, 1 FAQ-Frage — nicht öfter.
- DSG, Ransomware, Schweiz, KMU, Wallisellen, Managed Services als thematisch passende Nebenkeywords in H2s, Listen, FAQs verwenden — natürlich, nicht gestoppt.
- Verwenden „Schweiz" statt „CH" in Fließtext. „CH" bleibt in Badges/Schema-Länderkürzel erlaubt.

## 11. Tipps für Migration

- Bestehenden Text nicht neu erfinden — Inhalte erhalten, nur Design/Sprache/Dichte optimieren.
- Falls du auf eine ß/SS-Umwandlung im Code stößt: `global case-sensitive find & replace`, Erlaube-Ausnahmen sind Zeichennamen wie „Baßgeige" (nicht relevant für IT-Texte aber princiof).
- Kürzere Sätze: aus 40-Wort-Sätzen 2 × 20-Wort.
- Vermeide Modalverb-Stacking („sollten könnten müssen")

## 12. Infobalken+Context-Block (Sektion 9) — Regeln

Der Infobalken zwischen Vertriebsblock und Fachtext-Block ist **mehr als ein dekorativer Trenner**. Er liefert **faktenbasierte Context-Informationen** und **SEO-optimierte Erklärtexte** zum Thema der Seite.

### Aufbau (Schema: 3 Spalten + Feature-Tabelle + Quellen-Links)

```
[Heading: Allgemeine Informationen rund um <Thema> für KMU]
[Sub-Heading: Was <Thema-K1> ist, warum <Thema-K2> essenziell ist, ...]

[Teil A: 3 Spalten Erklärungen (SEO-Content)]
  Spalte 1: "Was ist <Thema>? – 3–4 Sätze"
  Spalte 2: "Warum <Unterpunkt 1>? – 3–4 Sätze"
  Spalte 3: "Warum <Unterpunkt 2>? – 3–4 Sätze"

[Teil B: 2-Spalten-Feature-Tabelle]
  Spalte links:  "NinjaOne – RMM-Features"     (6–8 Bullet-Items)
  Spalte rechts: "SentinelOne – EDR-Features"  (6–8 Bullet-Items)

[Teil C: Quellen-Angabe mit echten Links]
  Quellen: <a>BACS/NCSC</a> · <a>Microsoft MSRC</a> · <a>Microsoft Lifecycle</a> · <a>NinjaOne</a> · <a>SentinelOne</a>
```

### 7 Regeln

1. **3 Spalten Erklärungen** — each 3–4 Sätze Fliesstext (gesamt ~250–400 Woerter). SEO-optimiert, kein Stichwort-Schmierzettel.
2. **2-Spalten-Feature-Tabelle** — fuer Tools-Vergleich (z.B. RMM vs EDR, NinjaOne vs SentinelOne). 6–8 Bullet-Items je Spalte, Cyan-Checkmarks.
3. **Faktenbasiert** — keine Meinungen, keine Werbung, keine Behauptungen ohne Beleg. Inline-Quellen-Links als `<a href>`.
4. **Schweizer Quellen mit Links** — BACS/NCSC als aktiver Link (`https://www.ncsc.admin.ch/ncsc/de/home.html`), Microsoft-Quellen (MSRC, Lifecycle) als aktiver Link. Vendor-Seiten (NinjaOne, SentinelOne) verlinken direkt.
5. **KEINE Empfehlung fuer ein Betreuungsmodell** — der Block ist neutral, faktenbasiert. Betreuungsmodelle (Sektion 8) sind alle gleichwertig, kein Highlight, kein Badge.
6. **KEIN direkter CTA** — keine „Jetzt kaufen"-Buttons, keine Telefonnummern. Die Conversion laeuft spaeter im ServicePageFooter.
7. **Sprache de-CH** — Umlaute (ae, oe, ue), kein ß (immer ss). „Offerte" statt „Angebot" (siehe §3 Wortliste).

### Themenbezogene Beispiele (Vorlagen)

**Fuer Endpoint-Theme (referenz-Implementierung):**
- Spalte 1: „Was ist Patch-Management?" — definition, BACS-Verweis
- Spalte 2: „Warum Windows- und 3rd-Party-Patches?" — Patch Tuesday, MSRC Link
- Spalte 3: „Warum Aufgaben automatisieren?" — Konsistenz, Helpdesk-Entlastung
- Tabelle links: „NinjaOne – RMM-Features" (Patching, Inventar, Remote-Support, Skripte, Reporting)
- Tabelle rechts: „SentinelOne – EDR-Features" (Autonome AI, Rollback, Storyline, USB-Control)
- Quellen: BACS/NCSC, MSRC, Lifecycle, NinjaOne, SentinelOne (alle als aktive Links)

**Fuer Server-Theme (Platzhalter):**
- Spalte 1: „Was ist Server-Management?"
- Spalte 2: „Warum proaktive Ueberwachung?"
- Spalte 3: „Warum Backup-Integration?"
- Tabelle links:  „NinjaOne – RMM-Features"
- Tabelle rechts: „SentinelOne – Server-Security"
- Quellen: [BACS/NCSC, SwissICT, NinjaOne, SentinelOne — alle als aktive Links]

### Workflow fuer neue Sektion 9

1. **DataForSEO-Validierung** der Hauptkeywords — was suchen Nutzer tatsaechlich?
2. **SERP-Analyse** der Top-Rankings — welche Fakten erwaehnen diese?
3. **Schweizer Quellen bevorzugen** — BACS, NCSC, ISB, SwissICT.
4. **3 Spalten Erklaertexte** schreiben (je 3–4 Saetze, ~90 Woerter pro Spalte).
5. **Feature-Tabelle** erstellen — je 6–8 Bullet-Items fuer Tool-Plattform (z.B. RMM/EDR).
6. **Quellen-Angabe** als echte `<a href>` Links inline ins Markup.
7. **Cross-Check mit Skill-Vorgaben** (kpx-schweiz-marketing §4, §9) — keine Superlative, keine leeren Versprechen.
8. **Betruuungsmodelle (Sektion 8)** — alle 3 Modelle identisch stylen, KEIN `highlight: true`, KEIN Empfohlen-Badge.

### Verstoesse gegen diese Regeln (sind zu vermeiden)

- ❌ 5 Bullet-Kacheln mit 1-Satz-Inhalt — zu duenn fuer SEO
- ❌ 30+ Woerter pro Bullet ohne Quellenbeleg — wirkt unserioes
- ❌ Quellen als reiner Textstring ohne Link — schlecht fuer SEO & UX
- ❌ „Wir empfehlen das Gemeinsam-Modell, weil..." — direkte Empfehlung im Infobalken
- ❌ Highlight-Border bei einem Betreuungsmodell — Sektion 8 ist gleichwertig
- ❌ „Mit KPX sind Sie immer auf der sicheren Seite." — Marketing-Floskel ohne Beleg
- ❌ „Unser Managed Endpoint ist der beste der Schweiz." — Superlativ
- ❌ „Angebot" — falsches Wort fuer de-CH, immer „Offerte"
- ❌ Quellenlose Aussagen mit konkreten Zahlen — wirkt unseriös