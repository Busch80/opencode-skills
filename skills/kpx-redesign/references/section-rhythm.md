# Sektion-Reihenfolge — KPX Redesign

Diese Reihenfolge ist **kanonisch für alle `app/managed-it-services/<slug>/page.tsx`** (Service-Subpages) und **adaptierbar für Hub-Pages** (siehe `templates/seo-hub-page.tsx`).

## Grundprinzip: 13 Sektionen

Aufteilung in zwei Blöcke mit einem harten Trennelement:

| Block | Sektionen | Zweck |
|---|---|---|
| **A — Vertrieb** | 1–8 | User vom Hero zur Conversion führen |
| **Trennelement** | 9 | Harten Bruch zwischen Vertrieb und Fachtext setzen |
| **B — Fachtext** | 10–13 | Orientierung, Vertrauen, Cross-Selling |

## Kanonische Reihenfolge

| # | Element | HG | Helper-Klasse | Inhalt | Notiz |
|---|---|---|---|---|---|
| 1 | **Hero** | dunkel | `kpx-section-dark`, `minHeight: 520px` | Breadcrumb-Nav, H1, Subline, 4 Hero-Punkte, Wellen-SVG | paddingTop: `calc(80px + 56px)` |
| 2 | **Stats-Bar** | white | `py-8`, `marginTop: '-1px'` | **1:1 von Startseite** — diese Stats werden IMMER aus `app/page.tsx` kopiert, niemals angepasst | s. `references/design-tokens.md` für Layout |
| 3 | **Das Problem, das wir lösen** | light | `kpx-section-light` | Einleitung + Pain-Points (z. B. Patch-Stau, Helpdesk-Lücke, Inventar-Wirrwarr) | Icon-Grid oder Cards, 4-6 Items |
| 4 | **Wie wir es lösen (mit Grafik)** | light | `kpx-section-light` | Visualisierung der Lösung — Diagramm-Komponente ODER Icon-Grid (6-12 Items) | Eigene Diagramm-Komponente optional |
| 5 | **Frage zur aktuellen Lage** | dunkel | `kpx-section-dark`, `py-10 md:py-12` | Direkte Frage + Subline (Backup-CTA-Intro-Stil) | Soll User zum Handeln animieren |
| 6 | **4 Prozess-Schritte** | white | `kpx-section bg-white` | Standard 01-04: Gratis / Analyse / Offerte / Betrieb | Kanonische Texte aus Skill |
| 7 | **CTA-Button** | white | innerhalbe v. Sektion 6 | Cyan-Button (z. B. "Gratis X-Analyse anfordern") | innerhalb der Prozess-Schritte-Sektion, unter dem Grid |
| 8 | **Drei Betreuungsmodelle** | light | `kpx-section-light` | Rundum / Gemeinsam / Eigenregie + Plattform-Hinweis (NinjaOne/SentinelOne) | Reihenfolge der Karten je nach Service anpassen (z. B. "Gemeinsam" zuerst bei Endpoint) |
| 9 | **Infobalken + Context-Block** | dunkel | `bg: oklch(0.22 0.07 250)` | **Heading + Sub-Heading + 5 Fact-Kacheln + Quellenangabe** | **Trennelement** zwischen Vertriebs- und Fachtext. KEINE Empfehlung. KEINE Verkaufsabsicht. |
| 10 | **Themen-FAQ** | dunkel | `kpx-section-dark` | Themenspezifische Fragen, native `<details>`, grüner Chevron `oklch(0.72 0.18 145)` | 6-10 Fragen |
| 11 | **Störungen-Sektion** (Managed Services) | light | `kpx-section-light` | Heading "Störungen erkennen wir..." + 6-Card-Grid via `produkte.map` + "Alle 17 Managed Services entdecken"-Link | Cross-Linking |
| 12 | **IT-Wissen Blog** | white | `kpx-section bg-white` | 3 latest via `getLatestPosts(3)` | 3-Spalten-Grid |
| 13 | **Servicegebiet** | light-grey | `bg: oklch(0.97 0.01 220)` | MapPin + Adresse + 6-Kantone-Pills + Schweizweit remote | `<MapPin />`-Icon cyan |
| — | **Abschluss-CTA** | — | — | **ENTFÄLLT** — `ServicePageFooter` übernimmt | ServicePageFooter enthält eigenen CTA-Banner |

## Erweiterte Inhalte für Sektion 9 (Infobalken + Context-Block)

Sektion 9 ist **mehr als ein einzeiliger dunkler Balken**. Sie hat einen **strukturierten Aufbau**:

```tsx
{/* Sektion 9 — Trennelement + Context-Block */}
<section style={{ backgroundColor: "oklch(0.22 0.07 250)" }}>
  <div className="container max-w-5xl mx-auto py-12">
    {/* Heading + Sub-Heading */}
    <h2 className="text-2xl md:text-3xl font-extrabold text-white text-center mb-3">
      Allgemeine Informationen rund um [Thema] für KMU
    </h2>
    <p className="text-center text-sm md:text-base mb-8 max-w-3xl mx-auto"
       style={{ color: "oklch(0.82 0.04 220)" }}>
      Daten und Fakten, die für Ihre [Thema]-Strategie relevant sind.
    </p>

    {/* Grid: 5 Fact-Kacheln */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {/* jede Kachel: Bullet-Text + Symbol/Icon */}
    </div>

    {/* Quellenangabe */}
    <p className="text-center text-xs" style={{ color: "oklch(0.65 0.04 220)" }}>
      Quellen: [Bundesbehörde / Branchenverband], [Microsoft / Standardwerk].
    </p>
  </div>
</section>
```

### Regeln für Sektion 9 (siehe auch `references/tone-voice.md` §12)

- **Maximal 5 Kacheln** (Bullets)
- **Maximal 20 Wörter pro Bullet**
- **Faktenbasiert** — keine Meinungen, keine Werbung
- **Schweizer Quellen bevorzugt** (BACS, MELANI/NCSC, ISB, SECO, SwissICT, kantonale Datenschutz)
- **Bei bekannten Vendor-Fakten** (z. B. „Patch Tuesday monatlich"): Microsoft-Quellen
- **Quellenangabe klein am Ende des Blocks** (z. B. „Quellen: BACS Lagebericht, Microsoft Security Response Center.")
- **KEINE Empfehlung für ein Betreuungsmodell** — der Block ist neutral
- **KEIN direkter CTA** — die Conversion kommt später (Sektionen 12–14 bzw. ServicePageFooter)
- **Maximal 1 Cross-Verweis** auf verwandte Seite erlaubt (z. B. „Mehr zu MDM: /managed-mobile-device")

### Beispiel für Endpoint-Theme (mit Schweizer Quellen)

```
1. Microsoft veröffentlicht Windows-Sicherheits-Patches monatlich am Patch Tuesday;
   verzögerte Patches sind laut BACS eine häufige Angriffsfläche für KMU.
2. Windows 10 hat im Oktober 2025 das offizielle Support-Ende erreicht;
   ein Weiterbetrieb ohne Updates erhöht das Risiko erheblich.
3. Browser, PDF-Reader und Adobe-Produkte gehören laut BACS zu den am häufigsten
   angegriffenen Drittanbieter-Programmen bei KMU.
4. Viele Cyber-Versicherer verlangen bei Schweizer KMU den Nachweis regelmässiger
   Patch- und Update-Prozesse als Policen-Voraussetzung.
5. Laut BACS-Lagebericht ist Phishing der häufigste initiale Angriffsvektor auf
   KMU-Endpunkte; Patches schliessen diese Lücken nur teilweise.

Quellen: BACS Lagebericht zur Cyber-Sicherheit Schweiz,
Microsoft Security Response Center, Microsoft Lifecycle Policy.
```

### Beispiel für Server-Theme (Platzhalter, später zu füllen)

```
1. Server-Ausfallzeiten kosten Schweizer KMU durchschnittlich [Quelle] Franken pro Stunde.
2. RMM-Plattformen überwachen rund 200 Metriken pro Server; manuelle Überwachung skaliert nicht.
3. …

Quellen: [BACS / Branchenverband / Microsoft / andere].
```

## Wichtige Regeln (Zusammenfassung)

| Regel | Wirkung |
|---|---|
| Stats-Bar IMMER 1:1 von Startseite | Konsistenz über alle Pages, einprägsame Marken-Wiederholung |
| Anweisungen des Kunden haben IMMER Vorrang vor Skill | Skill ist Vorlage, keine Diktatur |
| 3 Betreuungsmodelle IMMER zwischen Prozess-Schritten und Infobalken | Kapitel 8 im neuen Schema |
| KEINE Preise nennen | Direkte Skill-Vorgabe |
| Token NIE in Skill-Dateien | Sicherheitsvorgabe |
| Sektion 9 IMMER mit echtem Content (nicht nur Headline) | Mehrwert für User und SEO |
| Quellen IMMER Schweizer-first | Vertrauensaufbau |
| Abschluss-CTA entfällt | ServicePageFooter übernimmt |

## Rhythmus-Diagramme

### Vertriebsblock (Sektionen 1–8)

```
[Hero]          → [Stats]        → [Problem]      → [Lösung]
                                          ↓
[Frage?]        → [Prozess]      → [CTA]          → [Modelle]
                                                                  ↓
                                                          [Infobalken+Context]
```

### Fachtext-Block (Sektionen 10–13)

```
[FAQ]            → [Services]       → [Blog]          → [Servicegebiet]
                                                                          ↓
                                                              [ServicePageFooter]
```

### Der harte Schnitt

**Sektion 9 (Infobalken)** ist ein **visuelles und thematisches Trennelement**. Sie trennt den Vertriebsblock (User wird zum Handeln geführt) vom Fachtext-Block (User wird informiert). Diese Trennung ist **konzeptionell wichtig** und sollte in allen Subpages konsistent sein.
