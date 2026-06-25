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
| 3 | **Problem (light)** | light | `kpx-section-light` | H2 **muss** konkret thematisch sein (nicht Template-Phrase „Das Problem, das wir lösen"). Sub-Heading nennt Symptome und Ursache. Pain-Points als Icon-Grid, 4-6 Items | Plain text mit Pain-Points, KEIN Eyecatcher-Bild automatisch |
| 4 | **Lösung (white)** | white | `kpx-section bg-white` | H2 nennt das konkrete Lösungs-Prinzip. Plain-text-Aufzählung mit `<h3>`-Überschriften und `<ul>`-Listen (Standard). Für Network: 3-stufiges Chevron-Diagramm `<NetworkEvolutionChevron>` als **standalone Komponente mit eigener light-grey Section** (Design-Sprache 1:1 wie Sektion 8 `ServiceModelArrowsFullNetwork`). OWNER_STYLES-Mapping `kunde` → `geteilt` → `kpx` + 4px roter Border-Left auf Stage 1 als Warn-Akzent. Stage-Badge-Labels: Selbstverantwortung / Übergang / KPX übernimmt. Optional Icon-Grid mit 6-8 konkreten Features darunter (Sektion 4b separat). | Plain text bevorzugen. Standard: keine Custom-SVG-Diagramme (siehe §15 Lektion 14). **Ausnahme Network:** Wenn User explizit ein Chevron-Diagramm verlangt, wird `<NetworkEvolutionChevron>` als eigenständige Section gebaut mit OWNER_STYLES-Farbpalette (identisch zu Sektion 8). Lucide-Icons erlaubt. Bei Network folgt eine separate Sektion 4b mit `bg-white` für Switching-Features. |
| 5 | **Frage zur aktuellen Lage** | dunkel | `kpx-section-dark`, `py-10 md:py-12` | Direkte Frage + Subline (Backup-CTA-Intro-Stil) | Soll User zum Handeln animieren |
| 6 | **4 Prozess-Schritte** | white | `kpx-section bg-white` | Standard 01-04: Gratis / Analyse / Offerte / Betrieb | Kanonische Texte aus Skill |
| 7 | **CTA-Button** | white | innerhalbe v. Sektion 6 | Cyan-Button (z. B. "Gratis X-Analyse anfordern") | innerhalb der Prozess-Schritte-Sektion, unter dem Grid |
| 8 | **Chevron-Diagramm (Drei Betreuungsmodelle)** | light-grey | `kpx-section` mit `backgroundColor: "oklch(0.97 0.01 220)"` | Reihenfolge Rundum / Gemeinsam / Eigenregie — konsistent mit `externe-it-abteilung`. NICHT ändern. **Komponentenwahl je nach Service:**<br>• Endpoint / Externe IT: `<ServiceModelArrowsFull>` (Defaults: NinjaOne + SentinelOne)<br>• Network: `<ServiceModelArrowsFullNetwork>` (Defaults: UniFi + Pro/Max-Switches, Network-Phasen)<br>**Code-Duplikation wird bewusst in Kauf genommen** für klare Trennung der Verantwortlichkeiten. | Daten aus `serviceModelData.ts`:<br>• `MODELS_FULL` + `PHASES` (Endpoint / Externe IT)<br>• `MODELS_NETWORK` + `PHASES_NETWORK` (Network)<br>Jede Komponente hat Network-spezifische bzw. Endpoint-spezifische Defaults. **BG `oklch(0.97 0.01 220)` (light-grey) für Kontrast zu benachbarter white-Sektion 6 und dunkler Sektion 9.** |
| 9 | **Infobalken + Context-Block** | dunkel | `bg: oklch(0.22 0.07 250)`, `borderBottom: "3px solid oklch(0.62 0.14 225)"` wenn Sektion 10 folgt | **Heading + Sub-Heading + 3 Spalten Erklaertexte + 2-Spalten-Feature-Tabelle + Quellen-Links** | **Trennelement** zwischen Vertriebs- und Fachtext. KEINE Empfehlung. KEINE Verkaufsabsicht. SEO-optimierter Content, keine reinen Bullets mehr. **Cyan-Border-Trenner (3px solid) nur wenn zwei dunkle Sektionen direkt aufeinander folgen (z. B. 9 → 10).** |
| 10 | **Themen-FAQ** | dunkel | `kpx-section-dark` | Themenspezifische Fragen, native `<details>`, grüner Chevron `oklch(0.72 0.18 145)` | 6-10 Fragen |
| 11 | **Störungen-Sektion** (Managed Services) | light | `kpx-section-light` | Heading "Störungen erkennen wir..." + 6-Card-Grid via `produkte.map`. **KEIN „Alle 17 Managed Services entdecken"-Link** (entfernt) | Cross-Linking via Grid |
| 12 | **IT-Wissen Blog** | white | `kpx-section bg-white` | 3 latest via `getLatestPosts(3)` | 3-Spalten-Grid |
| 13 | **Servicegebiet** | light-grey | `bg: oklch(0.97 0.01 220)` | MapPin + Adresse + 6-Kantone-Pills + Schweizweit remote | `<MapPin />`-Icon cyan |
| — | **Abschluss-CTA** | — | — | **ENTFÄLLT** — `ServicePageFooter` übernimmt | ServicePageFooter: **nur CTA-Banner, KEIN Karussell**, KEIN „Alle Managed Services"-Link im CTA-Banner, nur cyan „Gratis Erstgespräch"-Button. |

## Background-Rhythmus (visuelle Kontraste)

Die Sektionen-BG-Sequenz muss **visuell alternieren**, damit der User klare Trennung zwischen den Sektionen wahrnimmt. Niemals zwei gleiche BG-Klassen direkt hintereinander.

### Standard-Sequenz für 13-Sektionen-Schema

```
1. Hero              — dunkel   (oklch 0.22 0.07 250)
2. Stats-Bar          — weiss    (bg-white)
3. Problem            — light    (kpx-section-light)            ← Pain-Points
4. Lösung             — weiss    (bg-white)                      ← Plain-Text H3+ul
5. Frage              — dunkel   (kpx-section-dark)
6. Prozess + CTA      — weiss    (bg-white)
7. (CTA in Sektion 6)
8. Chevron-Diagramm   — light-grey (oklch 0.97 0.01 220)
9. Context-Block      — dunkel   (oklch 0.22 0.07 250)
10. Themen-FAQ        — dunkel   (kpx-section-dark)             ← wenn direkt nach 9, Border-Trenner einfügen
11. Störungen-Sektion — light    (kpx-section-light)
12. IT-Wissen Blog     — weiss    (bg-white)
13. Servicegebiet     — light-grey (oklch 0.97 0.01 220)
```

### Network-Spezialfall: 14-Sektionen-Erweiterung

Auf `/managed-network-wireless` ersetzt `<NetworkEvolutionChevron>` Sektion 4 (jetzt eigene light-grey Section mit Design-Sprache 1:1 zu Sektion 8) und ein separates **Sektion 4b** (bg-white) mit den Managed-Switching-Features folgt. Damit ergibt sich:

```
3. Problem            — light
4. Lösung             — light-grey (oklch 0.97 0.01 220)        ← NetworkEvolutionChevron standalone
4b. Switching-Features — weiss (bg-white)                       ← nur Network
5. Frage              — dunkel
...
```

BG-Rhythmus bleibt regelkonform: 3 (light) → 4 (light-grey, andere Schattierung als 3) → 4b (white) → 5 (dunkel). Verschiedene Helligkeitsstufen ergeben klaren Kontrast ohne zwei identische BG-Klassen direkt hintereinander.

### Schlüsselregeln

1. **Niemals zwei `light`-Sektionen direkt hintereinander** — zwischen Sektion 3 (light) und Sektion 8 (light) liegt zwingend eine Sektion mit `white` oder `dunkel`. Konkret: Sektion 4 wird zwingend `bg-white`.
2. **Niemals zwei `dunkel`-Sektionen direkt hintereinander ohne Border-Trenner** — Sektion 9 und Sektion 10 sind beide dunkel. Sektion 9 bekommt `borderBottom: "3px solid oklch(0.62 0.14 225)"` als cyan-Trenner.
3. **`bg-white` als Rhythmus-Brecher** — wenn die Sektion neben einer `light`-Sektion liegt, wird sie selbst zu `bg-white` (statt `kpx-section-light`). Das ist der Standardwert für die Übergangssection.
4. **`light-grey` (`oklch(0.97 0.01 220)`) für Komponenten-Sektionen** — wenn eine Sektion als eigene Komponente gerendert wird (z. B. `<ServiceModelArrowsFullNetwork>`), bekommt sie `light-grey` statt `light` oder `white`, damit sie als eigenständige Komponente erkennbar ist.

### Tabelle der BG-Wechsel

| Übergang | Konflikt | Lösung |
|---|---|---|
| 3 (light) → 4 (white) | — | ✅ kein Konflikt |
| 4 (white) → 5 (dunkel) | — | ✅ kein Konflikt |
| 5 (dunkel) → 6 (weiss) | — | ✅ kein Konflikt |
| 6 (weiss) → 8 (light-grey) | — | ✅ kein Konflikt |
| 8 (light-grey) → 9 (dunkel) | — | ✅ kein Konflikt |
| 9 (dunkel) → 10 (dunkel) | ⚠ Konflikt | 3px cyan-Border in Sektion 9 |
| 10 (dunkel) → 11 (light) | — | ✅ kein Konflikt |
| 11 (light) → 12 (weiss) | — | ✅ kein Konflikt |
| 12 (weiss) → 13 (light-grey) | — | ✅ kein Konflikt |

### Implementierung pro Sektion

- **Sektion 1, 5, 9:** `className="kpx-section-dark"` oder inline `style={{ backgroundColor: "oklch(0.22 0.07 250)" }}`
- **Sektion 2, 6, 12:** `className="kpx-section bg-white"`
- **Sektion 3, 11:** `className="kpx-section kpx-section-light"`
- **Sektion 4:** `className="kpx-section bg-white"` (zwingend für Kontrast zu Sektion 3)
- **Sektion 8:** `className="kpx-section" style={{ backgroundColor: "oklch(0.97 0.01 220)" }}`
- **Sektion 9 (wenn 10 folgt):** zusätzlich `borderBottom: "3px solid oklch(0.62 0.14 225)"`
- **Sektion 13:** `className="kpx-section" style={{ backgroundColor: "oklch(0.97 0.01 220)" }}`

### Sektion 3 — H2 konkret, nicht Template-Phrase

Die H2 in Sektion 3 **muss** das konkrete Problem des Service-Themas nennen.
NICHT „Das Problem, das wir loesen" als Template-Text stehen lassen.

Beispiele:
- Endpoint: „Unkontrollierte Endgeraete sind ein Risiko"
- Backup: „Ein Backup, das nie getestet wurde, ist eine Hoffnung"
- Firewall: „Eine Firewall schuetzt nur, wenn jemand sie betreut"

Sub-Heading nennt **Symptome + Ursache** (z. B. „Fehlende Patches, unbekannte
Geraete, blinde Flecken – das entsteht nicht aus Nachlässigkeit, sondern weil
es ohne System schlicht nicht machbar ist").

## Erweiterte Inhalte für Sektion 9 (Infobalken + Context-Block)

Sektion 9 ist **mehr als ein einzeiliger dunkler Balken**. Sie hat einen **strukturierten Aufbau** mit **SEO-optimiertem Content** (nicht nur kurze Bullets):

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
      Was [Thema-K1] ist, warum [Thema-K2] essenziell ist, ...
    </p>

    {/* Teil A: 3 Spalten Erklärungen (SEO-Content) */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      {/* Spalte 1: „Was ist <Thema>? – 3–4 Sätze" */}
      {/* Spalte 2: „Warum <Unterpunkt 1>? – 3–4 Sätze" */}
      {/* Spalte 3: „Warum <Unterpunkt 2>? – 3–4 Sätze" */}
    </div>

    {/* Teil B: 2-Spalten-Feature-Tabelle (RMM / EDR) */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      {/* Spalte links: „NinjaOne – RMM-Features" (6–8 Bullet-Items) */}
      {/* Spalte rechts: „SentinelOne – EDR-Features" (6–8 Bullet-Items) */}
    </div>

    {/* Teil C: Quellen-Angabe mit echten <a href> Links */}
    <p className="text-center text-xs" style={{ color: "oklch(0.65 0.04 220)" }}>
      <span className="font-semibold">Quellen:</span>{" "}
      <a href="https://www.ncsc.admin.ch/...">BACS / NCSC</a> ·
      <a href="https://msrc.microsoft.com/...">Microsoft MSRC</a> ·
      <a href="https://www.ninjaone.com/">NinjaOne</a> ·
      <a href="https://www.sentinelone.com/">SentinelOne</a>
    </p>
  </div>
</section>
```

### Regeln für Sektion 9 (siehe auch `references/tone-voice.md` §12)

- **3 Spalten Erklärungen** — each 3–4 Sätze Fliesstext (~90 Woerter pro Spalte), SEO-optimiert
- **2-Spalten-Feature-Tabelle** — fuer Tools-Vergleich (z. B. RMM/EDR), je 6–8 Bullet-Items
- **Faktenbasiert** — keine Meinungen, keine Werbung, keine Behauptungen ohne Beleg
- **Schweizer Quellen mit echten Links** — BACS/NCSC, MSRC, Microsoft Lifecycle als aktive `<a href>`
- **Vendor-Seiten verlinken** — NinjaOne, SentinelOne direkt als aktive Links
- **KEINE Empfehlung fuer ein Betreuungsmodell** — Sektion 8 ist neutral/gleichwertig
- **KEIN direkter CTA** — die Conversion kommt spaeter im ServicePageFooter
- **Maximal 1 Cross-Verweis** auf verwandte Seite erlaubt (z. B. „Mehr zu EDR: /managed-it-services/endpoint-detection-response")

### Sektion 8: Drei Betreuungsmodelle — neue Regeln

- **Alle 3 Modelle gleichwertig** — KEIN `highlight: true` Feld, KEIN cyan-Border, KEIN „Empfohlen"-Badge
- **Cards identisch stylen** — gleiche Border, gleiche Background-Color, kein Hover-Effekt der selektion simuliert
- **Reihenfolge nach Service-Kontext** — Rundum zuerst fuer Backup (KMU ohne IT-Team), Gemeinsam zuerst fuer Endpoint (KMU mit IT-Team), Eigenregie früher bei Grosse IT-Teams
- **Plattform-Hinweis** — NinjaOne und SentinelOne im Sub-Heading erwähnen

### Beispiel für Endpoint-Theme (referenz-Implementierung)

```
Spalte 1: "Was ist Patch-Management?"  – Definition, BACS-Verweis (inline-Link)
Spalte 2: "Warum Windows- und 3rd-Party-Patches?" – Patch Tuesday, MSRC-Link
Spalte 3: "Warum Aufgaben automatisieren?" – Konsistenz, Helpdesk-Entlastung

Tabelle links:  "NinjaOne – RMM-Features"  (Patching, Inventarisierung, Remote-Support, Skripte, Reporting, ...)
Tabelle rechts: "SentinelOne – EDR-Features" (Autonome AI, Rollback, Storyline, USB-Control, Remediation, ...)

Quellen (als aktive <a href> Links):
  BACS / NCSC · Microsoft MSRC · Microsoft Lifecycle · NinjaOne · SentinelOne
```

### Beispiel für Server-Theme (Platzhalter, später zu füllen)

```
Spalte 1: "Was ist Server-Management?"
Spalte 2: "Warum proaktive Ueberwachung?"
Spalte 3: "Warum Backup-Integration?"

Tabelle links:  "NinjaOne – RMM-Features"   (Patching, Monitoring, Alerting, ...)
Tabelle rechts: "SentinelOne – Server-Security" (EDR, Verhaltensanalyse, ...)

Quellen: [BACS/NCSC, SwissICT, NinjaOne, SentinelOne – als aktive Links]
```

## Wichtige Regeln (Zusammenfassung)

| Regel | Wirkung |
|---|---|
| Stats-Bar IMMER 1:1 von Startseite | Konsistenz über alle Pages, einprägsame Marken-Wiederholung |
| Anweisungen des Kunden haben IMMER Vorrang vor Skill | Skill ist Vorlage, keine Diktatur |
| 3 Betreuungsmodelle IMMER zwischen Prozess-Schritten und Infobalken | Kapitel 8 im neuen Schema, alle gleichwertig, KEIN Highlight |
| KEINE Preise nennen | Direkte Skill-Vorgabe |
| IMMER „Offerte" statt „Angebot" | De-CH-spezifisch: Schweizer IMMER „Offerte", siehe tone-voice.md §3 |
| Token NIE in Skill-Dateien | Sicherheitsvorgabe |
| Sektion 9 IMMER mit SEO-optimiertem Content (3 Spalten + Tabelle + Links) | Mehrwert für User und SEO |
| Quellen IMMER Schweizer-first + Vendor-Seiten mit aktiven Links | Vertrauensaufbau & SEO |
| ServicePageFooter: KEIN Karussell, KEIN „Alle Managed Services"-Link | Nur cyan „Gratis Erstgespräch"-Button im CTA-Banner |
| Endpoint-Seite: KEIN „Alle 17 Managed Services entdecken"-Link in Sektion 11 | Footer-Link entfernt |
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

## Cross-Reference: Migrations-Playbook

Die vollständigen Lessons aus der Network-Migration (Chevron-Design-System, Iterations-Workflow, Commit-Konventionen, häufige Fehlerquellen) sind in `references/migrations-playbook.md` dokumentiert. Für neue Service-Seiten-Migrationen ist das Playbook der Startpunkt.
