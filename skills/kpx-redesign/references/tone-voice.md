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

## 13. Migrations-Pruefungs-Checkliste (vor jedem Push)

Nach jeder Endpoint-/Service-Seiten-Migration diese grep-Checks ausfuehren:

| Check | grep-Muster | Erwartung |
|---|---|---|
| ß verboten | `grep -c "ß" <page.tsx>` | 0 |
| „Angebot" verboten | `grep -c "Angebot" <page.tsx>` | 0 (nur „Offerte") |
| Template-Slot-Platzhalter | `grep -E "<SLOT>\|<Thema>\|<Fakt\|<Service-Name>\|Das Problem, das wir"` | 0 |
| highlight: true verboten in Sektion 8 | `grep -c "highlight: true" <page.tsx>` | 0 |
| „Alle 17 Managed Services entdecken" entfernt | `grep -c "Alle 17 Managed" <page.tsx>` | 0 |
| „Alle Managed Services" Link in ServicePageFooter | `grep -c 'href="/managed-it-services"' components/ServicePageFooter.tsx` | 0 |
| ServicePageFooter Karussell entfernt | `grep -c "ALL_SERVICES\|Karussell" components/ServicePageFooter.tsx` | 0 |
| Quellen als echte Links | `grep -c '<a href="https' <page.tsx>` in Sektion 9 | >= 1 |
| Umlaute vorhanden | `grep -c "[äöü]" <page.tsx>` | > 0 (sonst vermutlich ASCII-Umschrift) |

### Service-spezifische Pruefungen (Endpoint)

- [ ] H2 Sektion 3 = thematisch konkret (z. B. „Unkontrollierte Endgeraete sind ein Risiko")
- [ ] Mini-Flow in Sektion 4 vorhanden (Ohne System → NinjaOne → SentinelOne → Ergebnis)
- [ ] 3 Spalten Erklar-texte in Sektion 9 (SEO-Content)
- [ ] 2-Spalten-Feature-Tabelle (NinjaOne/SentinelOne) in Sektion 9
- [ ] Quellen-Links als `<a href>` in Sektion 9 (BACS, MSRC, NinjaOne, SentinelOne)
- [ ] Sektion 11 ohne „Alle 17 Managed Services entdecken"-Link
- [ ] ServicePageFooter ohne Karussell, ohne „Alle Managed Services"-CTA-Link
- [ ] „Offerte" statt „Angebot" in Prozess-Schritt 03

### Skill-Sync-Workflow

1. Edit in `Busch80/kpx-itch/.opencode/skills/kpx-redesign/` (mehrere Dateien)
2. Kopiere nach `Busch80/opencode-skills/skills/kpx-redesign/`
3. Commit 1 in kpx-itch: `docs(kpx-redesign): ...` mit Author `a.busch <a.busch@kpx-it.ch>`
4. Commit 2 in opencode-skills: identisch, selber Author
5. Push beide Repos (kpx-itch ggf. `--force-with-lease` zu `experimental`)

### Migrations-Lektionen (kompakt)

1. **Templates synchron halten** — wenn `section-rhythm.md` sich aendert, alle Templates pruefen
2. **H2 konkret** — Sektion 3 H2 nennt das Problem, nicht „Das Problem, das wir loesen"
3. **Plain text bevorzugen** — Sektion 4 mit `<h3>`-Ueberschriften und `<ul>`-Listen, KEIN Mini-Flow-Diagramm (siehe Lektion 14)
4. **Betreuungsmodelle gleichwertig** — Sektion 8 niemals hervorheben
5. **SEO-Content statt Bullets** — Sektion 9 = 3 Spalten + Feature-Tabelle + Quellen-Links
6. **Inhaltserhalt** — alte Texte/Features/FAQ/Diagramme nie stillschweigend loeschen, in neue Struktur transportieren
7. **Skill-Mirror** — zwei Repos synchron halten: kpx-itch/.opencode + opencode-skills
8. **ServicePageFooter trimmen** — nur cyan „Gratis Erstgespraech" Button, kein Karussell
9. **Tooling-Verfuegbarkeit pruefen** — `node`/`pnpm` auf dem Worker; bei fehlendem Toolchain manuelle grep-Verifikation dokumentieren
10. **Umlaute statt ae/oe/ue in JSX** — saubere Umlaute in Live-Seiten, ASCII nur in Skill-Kommentaren
11. **Bestehende Komponenten nutzen**: Für Betreuungsmodelle IMMER `ServiceModelArrowsFull` verwenden, keine eigenen Karten bauen. Komponente hat `heading`/`subheading`-Props für seiten-spezifische Texte, Default-Werte für `externe-it-abteilung`. Reihenfolge: Rundum / Gemeinsam / Eigenregie.
12. **Grosszuegiger Abstand zwischen Sektionen**: Nach einer textlastigen Sektion mit klarer Botschaft (z. B. Sektion 3 Problem, Sektion 4 Lösung mit H3-Liste) kann die Folgesektion grosszuegigen `mt-12 md:mt-16` vertragen, um die Lesbarkeit zu verbessern. Default-`gap-5` zwischen Karten reicht oft, aber bei textlastigen Sektionen mehr Whitespace geben.
13. **Service-spezifische Chevron-Diagramm-Komponenten**: Wenn `ServiceModelArrowsFull` fuer einen neuen Service wiederverwendet werden soll, aber die Inhalte (Plattform, Phasen, Modelle) abweichen, **neue separate Komponente erstellen** statt zu generalisieren. Network verwendet `ServiceModelArrowsFullNetwork` mit UniFi + Pro/Max-Switches und Network-spezifischen Phasen. Code-Duplikation wird bewusst in Kauf genommen fuer klare Trennung der Verantwortlichkeiten. Nur generalisieren, wenn die gleiche Komponente in 3+ Services mit identischer Struktur genutzt wird.
14. **Keine Custom-SVG-Diagramme und Eyecatcher-Bilder automatisch erstellen**: Plain text mit `<h3>`-Überschriften und `<ul>`-Listen ist die Standard-Visualisierung für Sektion 4 (Problem-Lösung-Weg). Kein Eyecatcher-Bild in Sektion 3, keine Timeline mit Custom-SVG-Icons und Pfeilen. **Ausnahme:** Wenn der User explizit ein Chevron-Diagramm für Sektion 4 anfordert (z. B. Network 3-Stufen-Evolution), wird eine separate Komponente `NetworkEvolutionChevron.tsx` gebaut. Diese nutzt **identische Design-Tokens wie `ServiceModelArrowsFullNetwork`** (Sektion 8) und die OWNER_STYLES-Palette `kunde` → `geteilt` → `kpx` für die Reifegrad-Aussage. Sonst bleibt die Seite text-first.
15. **Background-Rhythmus mit klaren Kontrasten**: Die Sektionen-BG-Sequenz muss visuell alternieren — **niemals zwei gleiche BG-Klassen direkt hintereinander**. Konkret:
    - **Sektion 4 = `bg-white`** (statt `kpx-section-light`), um Kontrast zu benachbarter Sektion 3 (light) zu schaffen.
    - **Sektion 8 (Komponenten-Sektion) = light-grey (`oklch(0.97 0.01 220)`)**, nicht light/white, damit sie als eigenständige Komponente erkennbar ist.
    - **Zwei direkt aufeinanderfolgende dunkle Sektionen (z. B. 9 → 10)**: Sektion 9 bekommt `borderBottom: "3px solid oklch(0.62 0.14 225)"` (cyan-Trenner), sonst visuelle Verschmelzung.
    - **Ausnahme**: Wenn der User explizit ein anderes BG-Schema wünscht, hat das Vorrang vor dieser Regel. Siehe `references/section-rhythm.md` Abschnitt „Background-Rhythmus" für die vollständige Tabelle.
16. **Iterativer Workflow ist Standard**: Plane nie die finale Lösung beim ersten Versuch. Mind. 3-4 Iterationen mit User-Korrekturen sind normal. Typischer Verlauf: (1) User-Spec oft textbasiert oder erste Designidee, (2) Agent macht Plan mit Frage-Tool zu Design-Optionen, (3) User reviewt visuell auf Vercel und gibt Korrekturen, (4) Agent passt Details an. Erwartungshaltung kommunizieren, nicht zu früh „final" nennen.
17. **Reifegrad via OWNER_STYLES-Sequenz**: Für Evolution-Stages (z. B. Network Sektion 4) wird Reifegrad durch die OWNER_STYLES-Reihenfolge kommuniziert: `kunde` (hellgrau) → `geteilt` (cyan) → `kpx` (dunkelblau). Das ist visuell konsistent mit Sektion 8 (gleiche Farben = gleiche Bedeutung). **Niemals `accentColor` als Prop duplizieren** — Stage-Nummer reicht, intern via `STAGE_OWNER_MAP[stage.number]` ableiten. Verhindert Daten-Duplikation und stellt sicher, dass Farben zentral in `serviceModelData.ts` bleiben.
18. **clipPath + Border = separates Flex-Item**: Wenn eine Chevron-Cell (`clipPath: polygon(...)`) einen Border-Left, Border-Right oder ähnlichen Border braucht, **NICHT** direkt auf die Cell setzen — `clipPath` clippt Borders mit. Lösung: 4px separates Flex-Item mit `flexShrink: 0` vor der Cell. Mobile-Variante: Top-Stripe auf der `StackedStage`-Card statt Left-Stripe. Beispiel aus NetworkEvolutionChevron Stage 1 (4px roter Warn-Akzent).
19. **Thematische BG-Verschmelzung erlaubt (Ausnahme BG-Rhythmus)**: Wenn zwei dunkle Sektionen inhaltlich direkt zusammengehören (z. B. Context-Block liefert Hintergrund, FAQ beantwortet die offenen Fragen dazu), darf der 3px cyan BorderBottom zwischen ihnen entfallen — beide wirken dann als ein zusammenhängender Block. Konkretes Beispiel Network-Migration (Iteration 5): Sektion 9 (Context-Block) + Sektion 10 (FAQ) ohne 3px cyan Border-Trenner, weil FAQ direkt die Context-Block-Inhalte aufgreift. **Entscheidung immer mit User abklären** — ist nicht selbstverständlich, sondern bewusste Ausnahme von der Standard-Regel.
20. **Kein Plattform-Badge in Komponenten-Sektionen**: `ServiceModelArrowsFull` und `ServiceModelArrowsFullNetwork` tragen KEIN separates Plattform-Pill-Badge unter dem Subtitle. Die Plattform-Information steht bereits im Subtitle-Text selbst. Beispiel aus Network-Migration (Iteration 5): `<p className="...rounded-full" style={{ backgroundColor: "oklch(0.62 0.14 225 / 0.12)" }}>Plattform: {plattform}</p>` wurde komplett entfernt. Die `plattform`-Prop entfällt ebenfalls im Komponenten-Aufruf. Visuelles Rauschen vermeiden.
21. **Body-Text in Chevron-Komponenten ist font-medium (500)**: Bullets in `NetworkEvolutionChevron` und `ServiceModelArrowsFull/Network` PhaseCell-Body-Description sollen `font-medium` (font-weight 500) verwenden, NICHT den Default 400. Implementation: `className="leading-snug ... font-medium"` als Tailwind-Utility. NICHT `style={{ fontWeight: 400 }}` setzen — `font-medium` reicht. Begründung: Bullets wirken so als bewusste Listenpunkte, nicht als Fliess-Text; Body-Description in Cells besser lesbar. Beispiel Network-Migration (Iteration 5): beide Komponenten aktualisiert.
22. **Stats-Bar IMMER 1:1 von der Startseite**: Auf allen Service-Seiten (`/managed-it-services/*`, `/managed-network-wireless`, etc.) dieselben 4 Stats verwenden — `20+ Jahre IT-Praxis` / `Persönlich fester Ansprechpartner` / `DSG konforme IT-Services` / `Spezialisiert auf Schweizer KMU`. **Niemals service-spezifische Stats** (z. B. „99.9% Uptime SLA" für Server, „< 1h Reaktionszeit" für Endpoint). Begründung: Konsistenz über alle Seiten stärker als technische Differenzierung. Besucher sehen die gleichen Trust-Signals egal auf welcher Service-Seite sie landen — das baut Markenvertrauen auf. Quelle: User-Feedback „immer standard stats bitte merken" bei Server-Migration (Iteration 6). Implementation: `TrendingUp`, `Users`, `CheckCircle2`, `Clock` Icons in cyan mit Standard-Labels, 4-spaltiges Grid (2-spaltig auf Mobile).
23. **Lokale Build-Verifikation VOR jedem Push**: Bevor ein Service-Page-Commit nach GitHub gepusht wird, MUSS er lokal gebaut und statisch verifiziert werden. Auch wenn `node` im Worker-PATH nicht verfügbar ist (was bei `opencode`-Worker der Fall ist), können die meisten TypeScript-Build-Fehler durch statische Checks abgefangen werden. **Verifizierungs-Checklist vor jedem Push:**
    1. **Icon-Vollständigkeit:** Alle in `icon:` Properties und `<IconClass />` verwendeten Lucide-Icons müssen in den `from "lucide-react"`-Imports sein. Statischer Check per Python-Script (siehe `migrations-playbook.md` §11).
    2. **Komponenten-Props:** Keine `currentServiceId`-Prop auf `<ServiceModelArrowsFull>` (nur auf `<ServiceModelArrowsFullNetwork>`). Andere Komponenten-spezifische Props prüfen.
    3. **Keine `as never`-Workarounds:** Diese verstecken TypeScript-Fehler, statt sie zu lösen. Lieber korrekte Imports ergänzen.
    4. **Section-Anzahl:** 13 Sektionen (oder 14 bei Network/Private-Cloud mit 4b-Erweiterung). Section-Kommentare mit `grep -nE "^\s*\{/\*.*[0-9]+\."` prüfen.
    5. **JSON-LD Schema:** BreadcrumbList + FAQPage + Organization + Service vorhanden. Organization `@id` und `streetAddress` verifizieren (manche alte Schemas fehlen Organization).
    6. **Stats-Bar 1:1** (Lektion 22).
    7. **BG-Rhythmus:** Keine zwei identischen BG-Klassen direkt hintereinander (Ausnahme dokumentiert in §19).
    Begründung: Vercel-Build dauert 1-3 Min und gibt erst dann Feedback. Lokale Checks finden 90% der Fehler in Sekunden. Quelle: User-Feedback „bitte die seite immer einmal local bauen und validieren bevor sie in GitHub hochgeladen wird" nach Vercel-Build-Fehler in Iteration 8 (DollarSign + Clock Imports fehlten in Private-Cloud).
24. **Build-First-Then-Push-Policy (vor jedem Deploy)**: Vor jedem Push zu GitHub MUSS zuerst ein lokaler Build-Versuch gestartet werden. **Reihenfolge:**
    1. **Erste Priorität — echter lokaler Build:** Wenn `node` und `pnpm` im Worker-PATH verfügbar sind (z. B. bei Development-Workern, nicht beim `opencode`-Worker), muss `pnpm install && pnpm build` (oder `next build` direkt) ausgeführt werden. Der Build muss fehlerfrei durchlaufen, **bevor** der Push zu GitHub erfolgt.
    2. **Zweite Priorität — statische Verifikation:** Wenn `node` NICHT verfügbar ist (`opencode`-Worker), muss die statische Verifikation aus `references/build-verification.md` angewendet werden — mindestens 6 Checks: (1) Icon-Vollständigkeit per Python-Script, (2) keine `as never`-Hacks, (3) keine falschen Komponenten-Props, (4) German-Quote-Syntax-Bug, (5) Section-Anzahl stimmt, (6) JSON-LD Schema vollständig.
    3. **Bei erkannten Fehlern:** NICHT pushen. Erst fixen, dann erneut verifizieren, dann pushen.
    **Begründung:** Vercel-Build dauert 1-3 Min und gibt erst nach Push Feedback. Statische Checks finden viele, aber nicht alle Fehler (z. B. Unicode-Escape-Probleme in String-Literalen, JSX-Parse-Errors). Ein echter lokaler Build garantiert 100% Fehler-Erkennung VOR dem Push. Quelle: User-Feedback nach Vercel-Build-Fehler bei Commit `fa851ca` (German-Quotes-Syntax-Bug), wo statische Verifikation den Fehler zwar erkannte, aber der Push bereits erfolgt war. **Nicht wiederholen.**
25. **Schema-Standard-Block in JEDER Service-Seite**: Jede migrierte Service-Seite MUSS einen vollständigen JSON-LD-Schema-Block mit folgenden Entitäten enthalten: `BreadcrumbList` (3 Stufen: Startseite → Managed IT Services → Service-Seite), `FAQPage` (alle FAQ-Items als Question/Answer-Paare), `Organization` mit `@id: "https://kpx-it.ch/#organization"`, `name: "KPX AG"`, vollständiger Adresse (`Grindelstrasse 6`, `8304 Wallisellen`, `CH`), `telephone: "+41445896955"`, `email: "info@kpx-it.ch"`, `logo: "https://kpx-it.ch/kpx-logo.png"` — und `Service` mit `serviceType`, `provider`, `areaServed: Country Schweiz`. **Vor jeder Migration prüfen, ob der Block vorhanden ist.** Quelle: Iteration 12 (`/managed-it-services/email-security`) — die ursprüngliche Seite hatte keinen Organization-Block mit `@id` (nur inline in `provider`), Address fehlte komplett. Bei Migration ergänzt. Lesson: Schema-Block ist Teil des **Standards**, nicht optional.
26. **CloudFront-URL-Audit vor jeder Migration**: Vor jeder Migration MÜSSEN alle `d2xsxph8kpxj0f.cloudfront.net`-URLs per `curl -I` geprüft werden. **Status 200 = OK, 403 = CloudFront-Asset gelöscht/ungültig → lokales Fallback-Bild verwenden oder Hero ganz ohne Image rendern (Pattern-Color statt Bild, wie bei `/managed-it-services/email-security` Migration 12).** Audit-Ergebnisse:
    - `kpx-security-swiss-…webp` → **403** (Quelle: Audit vor Iteration 13)
    - `kpx-edr-hero-…webp` → **200** (OK)
    - `kpx-mdm-mobile-device-…webp` → **200** (OK)
    Quelle: Bei CloudFront-403-Antwort wäre der Vercel-Build erfolgreich, aber die Seite zeigt ein kaputtes Bild. Lokales Fallback-Bild muss vor Push vorbereitet werden.
27. **`produkte.ts` Self-Link-Disziplin**: Wenn eine migrierte Seite in Sektion 11 als verwandte Service-Card erscheinen soll, MUSS sie in `app/data/produkte.ts` registriert sein. **Vor jeder Migration prüfen, ob die Seite eingetragen ist. Falls nein, ergänzen.** Quelle: Bei Iterations 12-15 mussten `Managed Email Security`, `Managed Security Operations`, `Managed Mobile Device` neu hinzugefügt werden (vorher nur 10 Einträge). Lesson: Cross-Selling hängt von vollständigem `produkte.ts` ab.
28. **Plain-Text-Sektion-4 für single-track Inhalte**: Wenn der Service-Inhalt keine natürlichen 3 Reifegrad-Stufen hat (z. B. Email-Security: Grundschutz + Erweiterung sind Erweiterungen, kein Reifegrad), verwende **zwei Sub-Blocks mit plain text `h3+ul`**, KEIN Chevron. Quelle: Iteration 12 (Email-Security) — Chevron-Stages wurden explizit abgelehnt, weil single-track.
29. **CloudFront-403-Fallback bei Hero-Images**: Wenn die CloudFront-URL für den Hero-Bereich 403 antwortet (Asset gelöscht/ungültig), wird der Hero **komplett ohne Image** gerendert — nur radial-gradient Background + Text-Inhalt (Heading, Subtitle, Hero-Punkte, CTA). KEINE kaputten Image-Tags hinterlassen, KEINE lokalen Fallback-Bilder erstellen (würde neuen CloudFront-Storage-Bedarf erzeugen). Pattern-Color ist visuell gleichwertig. **Audit-Ergebnisse:**
    - `kpx-security-swiss-…webp` → **403** (Hero von Iteration 13 angewendet)
    - `kpx-edr-hero-…webp` → **200** (Iteration 14 kann verwenden)
    - `kpx-mdm-mobile-device-…webp` → **200** (Iteration 15 kann verwenden)
    Quelle: Iteration 13 (`/managed-it-services/security`) — Audit vor Migration zeigte 403, Hero wurde ohne Image gebaut. Vercel-Build erfolgreich, Seite funktional.
30. **Plain-Text-Sektion-4 für N-stufige Strukturen (N ≠ 3)**: Wenn ein Inhalt 4+ logische Ebenen/Kategorien hat (z. B. Managed Security: Endpoint/Netzwerk/Cloud/Mensch), verwende **Grid-Layout mit plain text Card pro Ebene** (h3 + Beschreibung + Technologie-Pille), KEIN Chevron. Chevron erzwingt 3-Stages-Reifegrad-Sequenz — das passt nicht für kategorische Strukturen. Quelle: Iteration 13 (Security) — 4 Ebenen sind kategorisch verschieden, kein Reifegrad.
31. **Externe Quellen-Listen als SEO-Booster**: Grössere Seiten (>5 externe Quellen) profitieren von einer **strukturierten Quellen-Liste in Sektion 9** (Kontext-Block), mit je 1-zeiliger Beschreibung pro Quelle. Erhöht SEO-Autorität bei KMU-Themen wie Cybersicherheit, Datenschutz. Quelle: Iteration 13 (Security) — 10 externe Quellen aus Original übernommen (BACS, cyberstudie.ch, Mobiliar, ITSec4KMU, ADSS, EDÖB, eBanking, SATW, antiphishing.ch, BACS Lageberichte). Pattern: 2-Spalten-Grid in dunkler Karte.
32. **NetworkEvolutionChevron mit seiteneigenen 3 Stages**: Wenn eine Security-Seite (oder vergleichbar) bereits natürlich 3 Erkennungs-/Reaktions-Stufen hat, leiten Sie die Stages **aus dem seiteneigenen Inhalt ab** statt ein Standard-Schema zu erzwingen. Beispiele:
    - **EDR** (Iteration 14): Basis-Erkennung (Signatur-AV) → Erweiterte Analyse (KI-Verhalten) → Automatische Reaktion (24/7 SOC + Rollback + NIS2-Reporting)
    - **Firewall** (Iteration 9): Basic Security → Hybrid (Cloud-verwaltet) → Total Protection
    - **Cloud-Firewall** (Iteration 10): Internet Access → Hybrid (VPN-Ersatz) → Total Access
    - **Private Cloud** (Iteration 8): Beim Kunden → Schweizer Rechenzentrum → Hybrid-Option
    - **MDM** (Iteration 15): Manuelle Einrichtung → Zero-Touch Enrollment → Laufende Verwaltung & Sicherheit
    Reifegrad-Sequenz (kunde → geteilt → kpx) bleibt konsistent, Inhalte sind seitenspezifisch.
33. **Vergleichstabellen mit plattformspezifischen Einschränkungen**: Wenn eine Seite zwei Plattformen vergleicht (z. B. Android vs. iOS), dürfen die Zellen nicht nur ✓/– sein, sondern auch qualitative Einschränkungen wie „in Entwicklung", „eingeschränkt", „nur View" enthalten. Diese ehrlichen Differenzierungen sind SEO-relevant (User sucht oft „MDM iOS Einschränkungen") und schaffen Vertrauen. Quelle: Iteration 15 (MDM) — Vergleichstabelle Android vs. iOS mit 4 Einschränkungs-Markern (`in Entwicklung` bei Kiosk-Modus, `eingeschränkt` bei Geolokalisierung, `nur View` bei Remote Support).
34. **NetworkEvolutionChevron Stage-Type-Schema strikt einhalten**: Die Komponente `NetworkEvolutionChevron` erwartet **exakt** das Schema `Stage { number: 1 | 2 | 3; title: string; bullets: string[] }`. `owner` wird intern aus `STAGE_OWNER_MAP[stage.number]` abgeleitet, NICHT als Property übergeben. Zusätzliche Felder wie `id` oder `headline` führen zu TypeScript-Fehler `Object literal may only specify known properties, and '...' does not exist in type 'Stage'`. **Bei jeder Verwendung prüfen, ob Schema korrekt ist.** Quelle: Vercel-Build-Fehler bei Commit `8ab1e25` — Iterations 14 (EDR) + 15 (MDM) verwendeten `id`/`owner`/`headline`-Schema. Statische Checks hatten es nicht erkannt (sie prüfen nur Imports und as-never, nicht TypeScript-Stage-Properties). Fix: `id`/`owner`/`headline` entfernt, `number: 1/2/3` verwendet. Pattern ist identisch zu den 4 anderen Verwendungen (private-cloud, network, firewall, cloud-firewall), die bereits `number`-Schema nutzten.
35. **TypeScript-Stage-Property-Check ergänzen**: Die statische Verifikation in `build-verification.md` muss um **TypeScript-Stage-Property-Check** ergänzt werden. **Python-Script-Logik:** Wenn ein Chevron wie `NetworkEvolutionChevron` importiert wird, prüfe alle `stages={[...]}`-Aufrufe darauf, ob die Object-Literals nur erlaubte Properties enthalten. Für `NetworkEvolutionChevron`: nur `number`, `title`, `bullets` sind erlaubt — `id`, `owner`, `headline` wären Fehler. Quelle: Build-Fehler Commit `8ab1e25` trotz Lektion 24 (statische Checks durchgeführt) — Lesson: statische Checks haben Lücken bei TypeScript-Stage-Properties, müssen ergänzt werden.
36. **Lokaler Build im Worker funktioniert mit Setup-Befehlen**: Auch wenn `node`/`pnpm` initial nicht im `opencode`-Worker-PATH verfügbar sind, kann ein **echter lokaler Build** mit folgenden Befehlen ausgeführt werden:
    ```bash
    apt-get install -y nodejs   # installiert node v24 + npm
    corepack enable pnpm       # aktiviert pnpm via Corepack (pnpm 11)
    cd /path/to/experimental
    ./node_modules/.bin/tsc --noEmit    # schneller TypeScript-only Check
    ./node_modules/.bin/next build      # voller Build mit Turbopack
    ```
    Voraussetzung: `node_modules/` ist bereits installiert (via Vercel-Cache oder frühere Builds). Lokaler Build findet **alle** TypeScript-Fehler VOR Push — Vercel-Build ist nur Bestätigung. **Pattern ab Commit `97e44a3` (Iteration 16-Fix) angewendet: Lokaler `next build` lief fehlerfrei durch (46/46 Seiten, 15s Kompilierung).**
    **Wichtig:** Diese Befehle in `bash`-Tool aufrufen, NICHT via `npx` oder PATH-Set — die `apt`-installierte `node` ist sofort verfügbar und `./node_modules/.bin/next` braucht keinen PATH-Eintrag.
37. **NetworkEvolutionChevron Pflicht-Props `heading` + `subheading`**: Die Komponente `NetworkEvolutionChevron` benötigt neben `stages` AUCH `heading` und `subheading` als Pflicht-Props. Diese sind nicht optional. **Bei jeder Verwendung prüfen, dass beide Props übergeben werden.** Quelle: Vercel-Build-Fehler bei Commit `be182e7` — Type error `missing the following properties from type 'NetworkEvolutionChevronProps': heading, subheading`. Fix: `heading` und `subheading` aus dem Sektion-Heading/Subheading der jeweiligen Seite übernommen. Lokaler Build mit `tsc --noEmit` + `next build` hat den Fix bestätigt (Iteration 16, Commit `97e44a3`).
38. **NetworkEvolutionChevron rendert eigenes Heading**: Die Komponente `NetworkEvolutionChevron` rendert `heading` + `subheading` **selbst** (innerhalb der Komponente). Im Wrapper der Seite darf **KEIN** zusätzliches `<h2 className="section-heading">...</h2>` + `<p className="text-center">...</p>` stehen. Quelle: Vercel-Feedback Commit `34c1146` — User meldete „NetworkEvolutionChevron doppelt gerendert" (Heading + Subheading zweimal sichtbar). Fix: äußeres Heading + Subheading entfernt bei EDR + MDM. Pattern: nur Komponenten-Props übergeben, Wrapper hat nur das `<section>` + `<div className="fade-in">`. **Gilt für alle zukünftigen Verwendungen von NetworkEvolutionChevron, ServiceModelArrowsFull und ähnlichen Komponenten mit eigenem Heading-Rendering.**
39. **Self-Link-Filterung in Sektion 11**: Die migrierte Seite selbst darf NICHT als Card in ihrer eigenen Sektion 11 erscheinen. **Pattern:** `{produkte.filter((p) => p.href !== "/current-url").map(...)}`. Quelle: Commit `34c1146` — alle 4 migrierten Seiten (email-security, security, edr, mdm) hatten Self-Link-Cards. Konsistenz-Fix. **Gilt für alle Service-Seiten-Migrationen ab jetzt.**
40. **Lokaler Build ist Pflicht vor jedem Push**: Lektion 24 + 36 + jetzt bestätigt: Vor jedem Push zu GitHub MUSS `./node_modules/.bin/tsc --noEmit` UND `./node_modules/.bin/next build` lokal mit Exit-Code 0 laufen. Vercel-Build ist nur Bestätigung, nicht primärer Validierungs-Schritt. Pattern-Befehle im opencode-Worker:
    ```bash
    apt-get install -y nodejs   # einmalig pro Worker (idempotent)
    corepack enable pnpm       # einmalig pro Worker (idempotent)
    cd /path/to/experimental
    ./node_modules/.bin/tsc --noEmit    # TypeScript-Check
    ./node_modules/.bin/next build      # Voller Build
    ```
    **User-Feedback am 2026-06-26:** „warum testet du den buiold nicht local?" — Lesson: Lektion 24 ist nicht nur ein Verifikations-Schritt, sondern MUSS vor jedem Push ausgeführt werden. Pattern aus Commit `34c1146`: lokaler Build fand 0 Fehler, Push erfolgt.
41. **Hero-Background IMMER Standard-Blau Hue 245**: Die Hero-Sektion aller Service-Seiten verwendet **ausschliesslich** den KPX-Blau-Hue 245. Service-spezifische Akzentfarben (rot für EDR, grün für MDM, kühleres Blau für email-security etc.) sind **nicht erlaubt** ohne explizite User-Anweisung. **Standard-Pattern:**
    ```ts
    background: "radial-gradient(ellipse at top right, oklch(0.28 0.10 245) 0%, oklch(0.22 0.07 250) 45%, oklch(0.18 0.06 250) 100%)"
    ```
    Ausnahme: Wenn CloudFront-Hero-URL 403 antwortet (Lektion 29), wird radial-gradient durch Pattern-Color ersetzt — dann aber konsistent dunkelblau (`oklch(0.22 0.07 250)` oder ähnlich).
    Quelle: User-Feedback „warum haben die heros der letzten beiden seiten so unetrschiedliche farben" — Iterationen 12, 14, 15 hatten eigenmächtig service-spezifische Hero-Farben gewählt. Fix in Commit `f59004c`. **Bei jeder Migration: Hero-Hue-Wert aus den anderen Service-Seiten übernehmen, nicht selbst wählen.**
42. **Hero-Farb-Konsistenz-Check über alle Service-Seiten**: Vor jeder Migration MÜSSEN alle bestehenden Hero-Backgrounds verglichen werden. **Befehl:**
    ```bash
    grep -h "radial-gradient.*oklch" app/managed-*/page.tsx app/managed-mobile-device/page.tsx
    ```
    Alle Hero-Hue-Werte sollten identisch sein (`245`). Bei Abweichung → Frage an User, ob Eigenmächtigkeit oder explizite Anweisung. Quelle: Commit `f59004c` — vor dem Fix waren 3 verschiedene Hue-Werte im Bestand (245, 220-240, 20-30, 165-175). Lesson: Inkonsistenzen müssen VOR dem Push aktiv gesucht werden.