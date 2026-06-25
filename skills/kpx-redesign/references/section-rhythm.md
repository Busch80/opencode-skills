# Section-Rhythmus — KPX Redesign

Die Backup-Seite (`app/managed-it-services/backup/page.tsx`) ist die definitorische, vollständig realisierte rhythmische Vorlage. Behandle sie als Master-Template für Service-Subpages. Die anderen drei Referenzseiten sind gezielte Abwandlungen.

## 1. Kanonische 15-Sektionen-Abfolge

| # | Sektion | HG | Breite | Helper | Inhalt |
|---|---|---|---|---|---|
| 1 | **Hero** | dunkel `oklch(0.22 0.07 250)` | `container` (voll) | `relative overflow-hidden`, `minHeight: 520px` | Breadcrumb-Nav, H1, Subtitle, 2×2 Checkmark-Grid, wavy SVG-Divider |
| 2 | **Stats-Bar** | white | `container` | `py-8`, `marginTop: '-1px'` | 4 Stats, `stagger-children`-Grid, `kpx-stat-number` |
| 3 | **Grafik/Diagramm** | light `oklch(0.96 0.008 220)` | `container max-w-5xl mx-auto` | `kpx-section kpx-section-light` | `BackupDiagram` / `ServiceModelArrows` |
| 4 | **CTA-Intro** | dunkel | `container max-w-5xl mx-auto` | `py-10 md:py-12 kpx-section-dark` | Einzeiliger Frage + Subline |
| 5 | **4 Schritte / Prozess** | white | `container max-w-5xl mx-auto` | `kpx-section bg-white` | 4 Step-Karten (01-04), Highlight-Badge, `kpx-btn-cyan` |
| 6 | **Infobalken** | dunkel | `container` → `max-w-5xl mx-auto` | bloßes `<div style={{backgroundColor}}>` | Zentriert fette Überschrift „Allgemeine Informationen rund um …" |
| 7 | **Eigenschaften / Immutable** | light | `container max-w-5xl mx-auto` | `kpx-section kpx-section-light` | Icon-in-Kachel Feature-Cards, 2-spaltig |
| 8 | **Benefits (nummeriert)** | dunkel | `container max-w-5xl mx-auto` | `kpx-section kpx-section-dark` | Nummerierte Cyan-Circles + Titel + Beschr, 2-spaltiges `<ul>` |
| 9 | **Feature-Liste** | white | `container max-w-5xl mx-auto` | `kpx-section bg-white` | `CheckCircle2` (cyan) Checkliste, 2-spaltig |
| 10 | **Was wir sichern** | light | `container max-w-5xl mx-auto` | `kpx-section kpx-section-light` | `CheckCircle2` (cyan) Checkliste, 2-spaltig |
| 11 | **Managed Services-Grid** | light | `container max-w-5xl mx-auto` | `kpx-section kpx-section-light` | `produkte.map`, 6-spaltiges Grid, "Alle 17 Managed Services entdecken" |
| 12 | **FAQ** | dunkel | `container max-w-5xl mx-auto` | `kpx-section kpx-section-dark` | Native `<details>` 2-spaltig, grüner Chevron |
| 13 | **IT-Wissen Blog** | white | `container` (voll) | `kpx-section bg-white` | 4 kuratierte Inline-Posts ODER 3 via `getLatestPosts(3)`, Cyan-Top-Bar Karten |
| 14 | **Servicegebiet** | light-grey `oklch(0.97 0.01 220)` | `container` | `kpx-section` (inline HG) | `MapPin` + Adress-Reihe, order auch `<ServicegebietBlock />` |
| 15 | **Abschluss-CTA** | dunkel | `container mx-auto px-4` → `max-w-3xl` | `py-16`, `borderTop: 3px solid oklch(0.62 0.14 225)` | H2 „Ihre IT in zuverlässigen Händen." + cyan Button + outline Telefon-Button |

Der Rhythmus wechselt dunkel → weiß → light → dunkel → weiß → dunkel → light → dunkel → weiß → light → light → dunkel → weiß → light-grey → dunkel.

**Merkregel:** Niemals drei helle oder drei dunkle Sections aufeinanderfolgend. Zwischen zwei dunklen Sections muss mindestens eine helle (white/light/light-grey)liegen, und umgekehrt.

## 2. Kanonische Werte — wortwörtlich übernehmen

### 2.1 4 Prozess-Schritte

```
01 / Gratis Erstgespräch   / "Gratis"
02 / Erstanalyse            / "Individuell"
03 / Persönliche Offerte    / "Transparent kalkuliert"
04 / Rundum betreut         / "Proaktiv"
```

Step-Formulierung wortwörtlich von der Backup-Seite. Highlight-Badge-Texte konstant. Bei Service-Hub-Seiten (externe-it-abteilung) ist Schritt 4 homogener gehalten ("Aktiv betreut"); der Master-Template-Wortlaut ist die bevorzugte Variante.

### 2.2 4 Stats (Stats-Bar)

| Value | Label | Icon |
|---|---|---|
| `20+` | `Jahre IT-Praxis` | `TrendingUp` |
| `Persönlich` | `fester Ansprechpartner` | `Users` |
| `DSG` | `konforme IT-Services` | `CheckCircle2` |
| `Spezialisiert` | `auf Schweizer KMU` | `Clock` |

**Regel:** Diese Stats sind die kanonischen Facts der KPX-Website und müssen **1:1 von der Startseite** (`app/page.tsx`) übernommen werden. Falls die Stats der Startseite sich ändern, müssen alle Service- und Hub-Seiten nachgezogen werden. Icon-Farbe konstant cyan `oklch(0.62 0.14 225)`.

### 2.3 Wavy SVG-Divider (Hero-Unterkante)

```tsx
<div className="absolute bottom-0 left-0 right-0" style={{ lineHeight: 0, fontSize: 0 }}>
  <svg viewBox="0 0 1440 80" preserveAspectRatio="none"
    style={{ display: "block", width: "100%", height: "60px", marginBottom: "-3px" }}>
    <path d="M0 80L1440 80L1440 30C1200 70 960 10 720 30C480 50 240 10 0 30L0 80Z" fill="white" />
  </svg>
</div>
```

Pfad `M0 80L1440 80L1440 30C1200 70 960 10 720 30C480 50 240 10 0 30L0 80Z` konstant. `fill="white"` damit sie in die nachfolgende weiße Stats-Bar übergeht.

### 2.4 2×2 Hero-Checkmark-Grid

```tsx
<div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-2">
  {heroPoints.map((label) => (
    <div key={label} className="flex items-start gap-2.5">
      <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "oklch(0.72 0.18 145)" }} />
      <span className="text-sm font-semibold text-white">{label}</span>
    </div>
  ))}
</div>
```

Icon-Größe `w-4 h-4`, Farbe konstant **grün** `oklch(0.72 0.18 145)`. Label 4-6 Worte lang.

## 3. Hero-Padding

```tsx
<section className="relative overflow-hidden" style={{ backgroundColor: "oklch(0.22 0.07 250)", minHeight: "520px" }}>
  <div className="container relative z-10" style={{ paddingTop: "calc(80px + 56px)", paddingBottom: "80px" }}>
```

- `paddingTop: "calc(80px + 56px)"` — clears fixed 80px Navbar + 56px Puffer.
- `minHeight: "520px"` — konstant. Stark texteintensive Helden auf Service-Hub-Seiten können höher ausfallen, nie kürzer.

## 4. Services-Grid — Canonical Link

```tsx
<a href="/managed-it-services" className="inline-flex items-center gap-2 text-base font-semibold"
  style={{ color: "oklch(0.62 0.14 225)" }}>
  Alle 17 Managed Services entdecken
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
  </svg>
</a>
```

Spricht von "17 Managed Services". Falls sich die Produkttabelle ändert, diese Zahl aktualisieren (siehe `app/data/produkte.ts`).

## 5. Final-CTA Canonical

```tsx
<section style={{ backgroundColor: "oklch(0.22 0.07 250)", borderTop: "3px solid oklch(0.62 0.14 225)" }} className="py-16">
  <div className="container mx-auto px-4">
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Ihre IT in zuverlässigen Händen.</h2>
      <p className="text-lg mb-8" style={{ color: "oklch(0.82 0.04 220)" }}>
        Lernen Sie uns in einem unverbindlichen Erstgespräch kennen. Wir hören zu,
        analysieren und zeigen Ihnen ehrlich, wo wir Ihnen helfen können.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/kontakt" className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-3 rounded-lg text-base"
          style={{ backgroundColor: "oklch(0.62 0.14 225)", color: "white" }}>
          Ihre individuelle Erstanalyse <ArrowRight className="w-5 h-5" />
        </Link>
        <a href="tel:0445896955" className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-3 rounded-lg text-base border-2"
          style={{ borderColor: "oklch(0.62 0.14 225)", color: "oklch(0.62 0.14 225)", backgroundColor: "transparent" }}>
          <Phone className="w-5 h-5" /> 044 589 695 5
        </a>
      </div>
    </div>
  </div>
</section>
```

Varianten zwischen den Seiten:
- H2-Text darf page-spezifisch angepasst werden, sollte aber ein kurzer, vertrauensbildender Satz bleiben.
- CTA-Button-Label darf variieren: `Ihre individuelle Erstanalyse`, `Gratis Erstgespräch vereinbaren`, `Jetzt individuelle Erstanalyse vereinbaren`.
- it-outsourcing-kmu setzt einen Badge-Pill `oklch(0.62 0.14 225 / 0.2)` oben drüber.
- externe-it-abteilung nutzt `borderTop` ohne Alpha-Variante.
- Telefon `044 589 695 5` ist konstant.

## 6. Infobalken (Canonical)

```tsx
<div style={{ backgroundColor: "oklch(0.22 0.07 250)" }}>
  <div className="container">
    <div className="max-w-5xl mx-auto py-5">
      <p className="text-white text-xl md:text-2xl font-bold text-center">
        Allgemeine Informationen rund um das Thema Datensicherung
      </p>
    </div>
  </div>
</div>
```

Immer einzeilig, immer dunkel, immer zentriert. Steht immer **vor** der längsten Ratgeber- oder Eigenschafts-Sektion der Seite. Themawort anpassen („Datensicherung", „IT Outsourcing", …).

## 7. Page-spezifische Abwandlungen

### 7.1 Startseite (`app/page.tsx`)

- Kein Infobalken, keine Vergleichstabelle.
- Hero mit CloudFront-Hintergrundbild (`backgroundSize: cover`, `opacity: 0.75`), `linear-gradient(to right, oklch(0.22 0.07 250 / 0.97) 0%, … / 0.30) 100%)` Overlay, Badge-Pill mit `animate-pulse` Dot.
- Cliffhanger-Quote-Sektion (Text `oklch(0.92 0.03 220)`, Emphasis `oklch(0.72 0.18 200)`).
- `<BranchenTabs />` und `<PartnerSlider />`.
- FAQ **hell** via `<FaqAccordion />` 2-spaltig.
- Final-CTA nutzt `kpx-btn-cyan` + `kpx-btn-outline`.

### 7.2 `externe-it-abteilung`

- Keine Grafik-Sektion, statt dessen direkt nach Stats: `<ServiceModelArrowsFull />` (3 Modelle).
- Vergleichstabelle (Tabelle mit dunklem Header-Row).
- Langer Ratgeber-Artikel (`<article>` mit `max-w-3xl`) nach Vergleichstabelle.
- Inline 6-Item "Weiterführende Artikel"-Querverlinkungsgrid.
- FAQ **dunkel** native `<details>`.
- Infobalken vorhanden.

### 7.3 `it-outsourcing-kmu`

- `<ServiceModelArrows />` (nur 2 Modelle, nicht Full).
- 2-Karten-Vergleich (Eigene IT vs KPX), dunkle Card mit `border-2 oklch(0.62 0.14 225)`.
- 3-Spalten-Checkliste mit Checkbox-Squares `border-2 oklch(0.62 0.14 225)`.
- 4-spaltiger Ratgeber (nicht 1-spaltiger Artikel).
- Compact-`produkte` Array inline (abweichend von `app/data/produkte.ts`).
- FAQ **hell** via `<FaqAccordion />` 2-spaltig.
- Infobalken vorhanden.

### 7.4 Service-Subpages  (`managed-it-services/*`)

Orientieren sich 1:1 am 15-Sektionen-Rhythmus der Backup-Seite. Page-spezifische Austausche:
- Sektion 3-Grafik: `<BackupDiagram />` → seitenpezifische Komponente (z. B. `<ServiceModelArrows />` falls passend, sonst passendes Diagramm/Icon-Grid).
- Benefits, Feature-Listen, „Was wir sichern"-Listen: page-spezifisch.
- FAQ-Antworten page-spezifisch.
- Optional `<ServicePageFooter currentServiceId="<slug>" />` als Footer-Karussell nach Final-CTA.

## 8. Mini-Regeln

- **Keine Sektion überspringen.** Jede der 15 Sektionen ist entweder vorhanden oder page-spezifisch gleichwertig ersetzt. Lücken hinterlassen visuelle Unruhe und brechen SEO-Intention (کلarity, scope).
- **Reihenfolge einhalten.** Hero immer zuerst, Stats-Bar unmittelbar danach (sie schliesst an die Welle an), Final-CTA immer zuletzt.
- **Light vor dunkel.** Zwei dunkle Sektionen nie unmittelbar aufeinander. Der Infobalken (dunkel) darf nicht direkt an eine andere dunkle Sektion grenzen — immer ein heller Übergang dazwischen.
- **`max-w-5xl mx-auto`** standard für inhaltszentrierte Sektionen. `container` voll nur für Stats-Bar, Services-Grid, Blog, Servicegebiet.
- **`fade-in` um Sektions-Headings/Intros**, **`stagger-children` um Grids**, nie umgekehrt.