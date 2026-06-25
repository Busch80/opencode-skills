# Design-Tokens — KPX Redesign

Alle Farben sind als **CSS `oklch()` Strings** realisiert — entweder als CSS-Variablen in `app/globals.css` unter `@theme inline` definiert oder als Inline-`style`-Props auf den Seiten. Bevorzugt **die CSS-Helper-Klassen** verwenden; Inline-Styles nur, wenn die Klasse nicht passt.

## 1. Primärpalette (`@theme inline` in `app/globals.css`)

| Token | oklch | Semantische Rolle |
|---|---|---|
| `--color-kpx-900` | `oklch(0.22 0.07 250)` | **Dunkelblau** — Hero-HG, dunkle Sektionen, Footer, CTA-HG, Heading-Textfarbe, Button-primary-HG |
| `--color-kpx-700` | `oklch(0.38 0.12 245)` | Dunkleres Mittelblau (selten inline genutzt) |
| `--color-kpx-500` | `oklch(0.62 0.14 225)` | **Akzent-Cyan** — Icons, Links, Checkmarks, Buttons, Badges, Dots, Borders-Akzent |
| `--color-kpx-400` | `oklch(0.55 0.14 225)` | Hover für Cyan-Button |
| `--color-kpx-300` | `oklch(0.78 0.09 220)` | Hellblau (Breadcrumb-Alternative) |
| `--color-kpx-200` | `oklch(0.82 0.06 225)` | Heller Text auf dunklem Grund (Hero-Untertitel alt) |
| `--color-kpx-100` | `oklch(0.94 0.03 220)` | Tag-Hintergrund |
| `--color-kpx-50`  | `oklch(0.96 0.008 220)` | Light-Section-HG (= `kpx-section-light`) |

## 2. Die drei zentralen Inline-Farbwerte

Diese drei Strings sind die am häufigsten wiederkehrenden Inline-Werte und müssen exakt so verwendet werden:

| Name | oklch-String | Einsatz |
|---|---|---|
| **Akzent-Cyan** | `oklch(0.62 0.14 225)` | Jedes Icon (ausser Hero-Checkmarks), Links, Badges, Buttons, Step-Nummern-Tint, Step-Highlight-Pill, Services-Grid-Dot, Links-Pfeil |
| **Akzent-Grün (Check)** | `oklch(0.72 0.18 145)` | `CheckCircle2` in Hero-2x2-Grid und FAQ-dark-Chevron — die „positiv/verifiziert"-Farbe |
| Akzent-Grün (Zitat) | `oklch(0.72 0.18 200)` | Cliffhanger-Quote-Emphasis-Span auf der Startseite |

## 3. Alpha-Varianten von Cyan (wiederkehrend)

```css
oklch(0.62 0.14 225 / 0.10)   /* Badge-HG, Step-Nummern-Tint */
oklch(0.62 0.14 225 / 0.15)   /* Icon-Kachel-HG, Step-Nummer, Benefits-Circle-Alt */
oklch(0.62 0.14 225 / 0.20)   /* Hero-Badge-Pill-HG, Final-CTA-Highlight */
oklch(0.62 0.14 225 / 0.4)    /* Final-CTA-Top-Border, Servicegebiet-Border-Tag */
```

## 4. Sektions-Hintergründe (Rhythmus)

| Rolle | oklch-String | Helper-Klasse |
|---|---|---|
| **Dunkle Section** | `oklch(0.22 0.07 250)` | `.kpx-section-dark` oder Inline-`style` |
| **Light Section** | `oklch(0.96 0.008 220)` | `.kpx-section-light` (= `--color-kpx-50`) |
| Light-Grey alt | `oklch(0.97 0.01 220)` | inline (Services-Grid, Servicegebiet) |
| Navbar-HG | `oklch(0.97 0.005 220)` | inline |
| White | `white` / Tailwind `bg-white` | Stats-Bar, Prozess-Steps, Feature-Listen, Blog |

> **Rhythmus-Regel:** Niemals drei helle oder drei dunkle Sections aufeinander. Siehe `section-rhythm.md` für die kanonische Abfolge.

## 5. Textfarben

| Rolle | oklch-String |
|---|---|
| Body Default (Body-CSS) | `oklch(0.18 0.04 250)` |
| Headings auf Hell | `oklch(0.22 0.07 250)` (= `kpx-900`) |
| Muted/Body sekundär | `oklch(0.42 0.05 245)` (= `.text-muted-foreground`) |
| Ratgeber-Body alt | `oklch(0.40 0.04 220)`, `oklch(0.45 0.05 245)`, `oklch(0.45 0.05 250)`, `oklch(0.50 0.04 220)` |
| **Text auf Dunkel (primär)** | `oklch(0.82 0.04 220)` |
| Text auf Dunkel (heller) | `oklch(0.92 0.03 220)`, `oklch(0.90 0.03 220)` |
| Text auf Dunkel (muted) | `oklch(0.75 0.04 220)`, `oklch(0.70 0.04 220)`, `oklch(0.65 0.04 220)`, `oklch(0.60 0.04 245)` |
| White | `white` / `oklch(0.98 0 0)` (`.kpx-section-dark color`) |

## 6. Border-Farben

| Rolle | oklch-String |
|---|---|
| Card/Input-Border (hell) | `oklch(0.90 0.01 220)`, `oklch(0.90 0.02 220)`, `oklch(0.91 0.01 220)` |
| Accordion-Border | `oklch(0.88 0.03 220)` |
| Dezenter Divider | `oklch(0.92 0.01 220)`, `oklch(0.93 0.01 220)` |
| **Dunkle Section-Border** (FAQ-details, Footer-top) | `oklch(0.35 0.07 250)` |
| Dunkle Card-Border alt | `oklch(0.30 0.08 248)`, `oklch(0.30 0.07 250)` |
| Akzent-Border (Tint) | `oklch(0.62 0.14 225 / 0.3)`, `oklch(0.62 0.14 225 / 0.4)` |

## 7. Breadcrumb-Farben (Hero-Nav)

| Element | oklch-String |
|---|---|
| Link (Parent) | `oklch(0.72 0.08 225)` |
| Slash-Separator `&#47;` | `oklch(0.52 0.06 225)` |
| Aktuelle Seite | `oklch(0.62 0.14 225)` |

## 8. Bekannte Ausnahme — Hex-Werte (offen)

`components/ServiceModelArrowsFull.tsx` und `components/serviceModelData.ts` nutzen noch Hex-Werte: `#0B4A7F`, `#1B8FC4`, `#D6E6F0`, `#CBD5E1`, `#E2EBF3`. Diese sind die einzigen Stellen im System, die nicht auf der oklch-Skala stehen. Bei neuer Arbeit daran auf oklch umstellen; bis dahin mitnehmen, aber nicht kopieren.

## 9. Typografie / Schrift

- **Schriftart:** DM Sans (single family, weights 100–1000 via variable woff2 von CloudFront, `font-display: swap`). Keine Serif.
- **H1:** `text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-white` — typischerweise mit `<br/>` oder En/Em-Dash unterteilt.
- **H2 (`section-heading`):** `1.875rem` → `2.25rem` md, weight 700, Farbe `oklch(0.22 0.07 250)` (oder white auf dunkel via `section-heading-light`).
- **Subheading:** `section-subheading` `1.125rem` colour `oklch(0.42 0.05 245)` `max-width: 42rem`.
- **Body:** Basis `text-sm`/`text-base`, `leading-relaxed`, muted `oklch(0.42 0.05 245)` oder Tailwind `text-gray-600`/`text-gray-700`.

## 10. Layout-Helper-Klassen

### Container

```css
.container { width: 100%; margin: 0 auto; padding: 0 1rem; }
@media (min-width: 640px)  { .container { padding: 0 1.5rem; } }
@media (min-width: 1024px) { .container { padding: 0 2rem; max-width: 1280px; } }
```

Begrenzungs-Varianten inline genutzt:
- `<div className="container max-w-5xl mx-auto">` — Standard Content-Breite (Diagramme, Benefits, FAQ)
- `<div className="container max-w-3xl mx-auto">` — Ratgeber-Artikel, Final-CTA
- `<div className="container">` —volle 1280px (Stats-Bar, Services-Grid, Blog)

### Sections

```css
.kpx-section        { padding: 4rem 0; }
@media (min-width: 768px) { .kpx-section { padding: 6rem 0; } }
.kpx-section-light  { background-color: oklch(0.96 0.008 220); }
.kpx-section-dark   { background-color: oklch(0.22 0.07 250); color: oklch(0.98 0 0); }
```

Non-`kpx-section` Paddings:
- Stats-Bar: `className="py-8"` + `marginTop: '-1px'` (merge mit Hero-Welle)
- Infobalken: `py-5` innen in `max-w-5xl`
- Mini-CTA: `py-10` (oder `py-10 md:py-12`)
- Final-CTA: `className="py-16"` (Innencontainer `container mx-auto px-4`)

### Cards

```css
.kpx-card        { background: white; border-radius: 0.5rem; border: 1px solid oklch(0.90 0.01 220);
                   padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,.08); transition: all .2s; }
.kpx-card:hover  { box-shadow: 0 4px 12px rgba(0,0,0,.12); transform: translateY(-2px);
                   border-color: oklch(0.62 0.14 225); }
.kpx-card-accent { border-top: 4px solid oklch(0.62 0.14 225); }   /* Prozess-Step-Karten */
.kpx-card-light  { background: oklch(0.96 0.008 220); ... }
```

### Buttons

```css
.kpx-btn-primary { background: oklch(0.22 0.07 250); color: white; padding: .75rem 1.5rem;
                   border-radius: .375rem; font-weight: 600; display: inline-flex; gap: .5rem; }
.kpx-btn-primary:hover { background: oklch(0.30 0.09 248); }
.kpx-btn-outline  { border: 2px solid white; color: white; ... }       /* auf dunklem HG */
.kpx-btn-cyan    { background: oklch(0.62 0.14 225); color: white; ... }
.kpx-btn-cyan:hover { background: oklch(0.55 0.14 225); transform: translateY(-1px); }
```

### Typografie-Helper

```css
.section-heading        { font-size: 1.875rem; font-weight: 700; margin-bottom: 1rem;
                          color: oklch(0.22 0.07 250); }
@media (min-width: 768px) { .section-heading { font-size: 2.25rem; } }
.section-heading-light  { /* wie oben, color: white */ }
.section-subheading     { font-size: 1.125rem; color: oklch(0.42 0.05 245); max-width: 42rem; }
.section-subheading-light { color: oklch(0.90 0.03 220); }
.kpx-stat-number        { color: oklch(0.22 0.07 250); font-size: 1.5rem; font-weight: 800; }
@media (min-width: 640px) { .kpx-stat-number { font-size: 2.5rem; } }
.kpx-stat-number-light  { color: oklch(0.62 0.14 225); ... }
.kpx-tag { background: oklch(0.94 0.03 220); color: oklch(0.38 0.12 245);
           font-size: .75rem; font-weight: 600; padding: .25rem .75rem; border-radius: 9999px;
           text-transform: uppercase; letter-spacing: .05em; }
```

## 11. Scroll-Animationen (Progressive Enhancement)

```css
@media (hover: hover) {
  .fade-in { opacity: 0; transform: translateY(24px); transition: opacity .5s, transform .5s; }
  .fade-in.visible { opacity: 1; transform: translateY(0); }
  .stagger-children > * { opacity: 0; transform: translateY(20px); transition: opacity .4s, transform .4s; }
  .stagger-children.visible > *:nth-child(1) { transition-delay: 0ms; }
  /* …bis nth-child(8) bei 560ms */
}
```

**Wichtig:** Inhalte sind **immer sichtbar** ohne JS — die `.visible`-Klasse wird von `components/ScrollAnimations.tsx` nur auf Desktop gesetzt. Mobile/Touch versteckt nichts. `.fade-in` wrappt Sektions-Headings/Intros; `.stagger-children` wrappt Grids (Stats, Step-Karten).