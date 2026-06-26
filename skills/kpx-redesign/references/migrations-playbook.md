# Migrations-Playbook

Chronologische Sammlung aller Lessons aus der Network-Migration (`/managed-network-wireless`) auf das 13- bzw. 14-Sektionen-Schema. Dient als Blaupause fuer kuenftige Service-Seiten-Migrationen.

## 1. Uebersicht

### Wann anwenden
- Eine bestehende Service-Seite (z. B. Endpoint, Server, Security, M365, Cloud, Backup) soll auf das neue Sektionen-Schema migriert werden.
- Eine neue Service-Seite wird nach dem Schema aufgebaut.
- Eine bestehende Seite braucht ein Chevron-Diagramm oder eine andere Komponenten-Visualisierung.

### Erwartete Iterationen
**Plane nie die finale Loesung beim ersten Versuch.** Mind. 3-4 Iterationen mit User-Korrekturen sind normal. Typischer Verlauf:

1. Iteration 1: Initiale Spec des Users (oft text-basiert oder eine erste Designidee)
2. Iteration 2: Agent macht Plan, fragt Design-Optionen via Frage-Tool ab, fuehrt aus
3. Iteration 3: User reviewt visuell auf Vercel, gibt Korrekturen
4. Iteration 4: Agent passt Details an (Farben, Spacing, Borders, Accents)

### Was dieses Playbook abdeckt
- Schema-Struktur (13-Sektionen-Standard + Network 14-Sektionen-Erweiterung)
- Chevron-Diagramm Design-System mit identischen Tokens
- Iterations-Workflow mit dem User
- Statische Verifikation (Agent-Aufgabe)
- Commit- und Branch-Konventionen
- Haeufige Fehlerquellen
- Lessons aus der Network-Migration (chronologisch)

## 2. Vorbereitung

### Branch und Working Directory
- Branch `experimental` fuer Migration-Commits (Haupt-Repo `kpx-itch`)
- Branch `main` fuer Skill-Updates (Mirror-Repo `opencode-skills`)
- Push zu `experimental` mit `--force-with-lease`
- Push zu `main` (opencode-skills) mit `--force-with-lease`
- Author: `a.busch <a.busch@kpx-it.ch>`

### Token-Situation
- **GitHub-Token vorhanden** in `/root/opencode/workspace/kpxitch/token` (Format `ghp_...`)
- **Kein Vercel-Token** im Workspace. Vercel-API antwortet `invalidToken`.
- **Konsequenz:** Visuelle Verifikation kann nur durch User manuell erfolgen, nicht durch Agent.

### Skill-Sync-Discipline
- Skill-Files in **zwei Repos** synchron halten:
  - `kpx-itch/.opencode/skills/kpx-redesign/` (Haupt-Repo)
  - `opencode-skills/skills/kpx-redesign/` (Mirror-Repo)
- Nach **jedem** Skill-Update in `kpx-itch` sofort nach `opencode-skills` mirrorn.
- Drift-Risiko bei verpasstem Sync: kuenftige Agent-Iterationen arbeiten mit veralteten Regeln.

### Daten sammeln vor Implementation
- Bestehende Seiten-Texte (Hero, Pain-Points, Loesungen, FAQ)
- Bilder (lokale Pfade in `public/` oder CloudFront-URLs)
- Icons (Lucide, bereits im Projekt verfuegbar)
- Bullet-Listen mit konkreten Features
- Quellen-Links fuer Context-Block (BACS/NCSC, Microsoft, Vendor-Seiten)

## 3. 13-Sektionen-Schema (Standard)

Standard fuer alle Service-Seiten ausser Network. Vollstaendige Tabelle in `references/section-rhythm.md`.

```
1.  Hero              — dunkel   (oklch 0.22 0.07 250)
2.  Stats-Bar          — weiss    (bg-white)
3.  Problem            — light    (kpx-section-light)
4.  Loesung            — weiss    (bg-white)       ← Plain-Text H3+ul ODER Chevron
5.  Frage              — dunkel   (kpx-section-dark)
6.  Prozess + CTA      — weiss    (bg-white)
7.  (CTA in Sektion 6)
8.  Chevron-Diagramm   — light-grey (oklch 0.97 0.01 220)
9.  Context-Block      — dunkel   (oklch 0.22 0.07 250)
10. Themen-FAQ        — dunkel   (kpx-section-dark)
11. Stoerungen         — light    (kpx-section-light)
12. IT-Wissen          — weiss    (bg-white)
13. Servicegebiet      — light-grey (oklch 0.97 0.01 220)
```

## 4. Network 14-Sektionen-Erweiterung

Network hat **eine zusaetzliche Sektion 4b** (Managed Switching Features), weil der Sektion-4-Chevron standalone mehr Platz braucht und die Switching-Features nicht in dieselbe Section passen.

```
3.  Problem            — light
4.  Loesung-Chevron    — light-grey (oklch 0.97 0.01 220)  ← NetworkEvolutionChevron standalone
4b. Switching-Features — weiss (bg-white)                   ← nur Network, separat
5.  Frage              — dunkel
...
```

### BG-Rhythmus bleibt regelkonform
- 3 (light `kpx-section-light`) -> 4 (light-grey `oklch 0.97 0.01 220`): verschiedene Schattierungen, kein Konflikt
- 4 (light-grey) -> 4b (white): klarer Kontrast
- 4b (white) -> 5 (dunkel): klarer Kontrast

Andere Services folgen dem 13-Sektionen-Standard ohne Erweiterung.

## 5. Chevron-Diagramm Design-System

Drei Chevron-Komponenten teilen identische Design-Tokens. **Design-Sprache 1:1 ueber alle drei Komponenten hinweg.**

### 5.1 Komponenten-Typen

| Komponente | Struktur | Verwendung |
|---|---|---|
| `ServiceModelArrowsFull` | Phasen x Modelle (z. B. 4 Phasen x 3 Modelle) | Endpoint, Externe IT, generische Service-Seiten |
| `ServiceModelArrowsFullNetwork` | Phasen x Modelle (4 x 3) | Network (Phasen: Planung/Installation/Monitoring/Support) |
| `NetworkEvolutionChevron` | 1 Reihe x 3 Stages | Network Sektion 4 (3-Stufen-Evolution) |

### 5.2 Identische Design-Tokens (alle drei Komponenten)

```ts
const NP = 9;                          // Chevron-Cut-Tiefe in %
const SECTION_BG = "oklch(0.97 0.01 220)";  // light-grey section BG
const CARD_BG = "white";
const CARD_BORDER = "1px solid oklch(0.88 0.01 220)";
const CARD_SHADOW = "0 2px 20px oklch(0.32 0.10 250 / 0.07)";

// Chevron-Cell:
const CELL_PADDING_Y = "py-3";
const CELL_MIN_HEIGHT = "120px";       // 220px fuer Stages mit Bullets
const CELL_PADDING_LEFT_FIRST = "5%";
const CELL_PADDING_LEFT_MIDDLE = `${NP * 0.9}%`;   // 8.1%
const CELL_PADDING_RIGHT_LAST = "5%";
const CELL_PADDING_RIGHT_MIDDLE = `${NP * 0.9}%`;  // 8.1%

// Body-Text (Beschreibungen, Bullets):
const BODY_FONT_SIZE = "clamp(9px, 0.72vw, 11px)";
const BODY_LINE_HEIGHT = "snug";
const BODY_TEXT_ALIGN = "center";

// Badge (Owner-Label, Stufe-Label):
const BADGE_CLASS = "text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full whitespace-nowrap";
const BADGE_BG = "rgba(255,255,255,0.18)";
const BADGE_BORDER = "1px solid rgba(255,255,255,0.25)";
```

### 5.3 OWNER_STYLES-Palette (kommt aus `serviceModelData.ts`)

| Owner | BG | Text | Semantik |
|---|---|---|---|
| `kpx` | `oklch(0.32 0.10 250)` (dunkelblau) | `white` | KPX uebernimmt |
| `geteilt` | `oklch(0.62 0.14 225)` (cyan) | `white` | Geteilt |
| `kunde` | `oklch(0.92 0.02 220)` (hellgrau) | `oklch(0.28 0.06 240)` (dunkel) | Ihr Team uebernimmt |

Diese Palette wird **nicht** in der Komponente neu definiert, sondern aus `OWNER_STYLES` importiert. Verhindert Drift.

### 5.4 Reifegrad via OWNER_STYLES-Sequenz

Fuer Evolution-Stages (z. B. Network Sektion 4) wird Reifegrad durch die OWNER_STYLES-Reihenfolge kommuniziert:

| Stage | Owner | Visuell | Bedeutung |
|---|---|---|---|
| 1 | `kunde` | hellgrau | Selbstverantwortung / ungeplant |
| 2 | `geteilt` | cyan | Uebergang / in Konzeption |
| 3 | `kpx` | dunkelblau | KPX uebernimmt / voll gemanaged |

Mapping intern via `STAGE_OWNER_MAP` Konstante:
```ts
const STAGE_OWNER_MAP: Record<1|2|3, Owner> = {
  1: "kunde",
  2: "geteilt",
  3: "kpx",
};
```

**Niemals `accentColor` als Prop duplizieren** — Stage-Nummer reicht, intern ableiten.

### 5.5 4px Border-Left-Trick fuer Warn-Stufen

Wenn eine Stage einen Warn-Akzent braucht (z. B. „Ohne Planung"), kann NICHT einfach `border-left` auf die Chevron-Cell gesetzt werden — `clipPath: polygon(...)` clippt Borders mit.

**Loesung:** Separates Flex-Item vor der Chevron-Cell:

```tsx
<div className="flex-1 min-w-0 flex items-stretch">
  {stage.number === 1 && (
    <div
      className="flex-shrink-0"
      style={{ width: "4px", backgroundColor: "oklch(0.62 0.18 25)" }}
    />
  )}
  <div
    className="flex-1 min-w-0 flex flex-col py-3"
    style={{ clipPath: ..., /* rest der Chevron-Cell */ }}
  >
    {/* Content */}
  </div>
</div>
```

Der 4px-Stripe sitzt VOR der Cell, wird nicht geclippt. Stage 1 hat 4px weniger Platz als Stage 2/3 — vernachlaessigbar visuell.

**Mobile-Variante:** Top-Stripe statt Left-Stripe auf der `StackedStage`-Card:

```tsx
<div className="rounded-xl overflow-hidden" style={{ background: "white", border: ... }}>
  {stage.number === 1 && (
    <div style={{ height: "4px", backgroundColor: WARNING_COLOR }} />
  )}
  <div className="px-4 py-3" style={{ background: s.bg }}>
    {/* Header mit Badges + Title */}
  </div>
  <ul className="px-4 py-3 space-y-1.5">
    {stage.bullets.map(...)}
  </ul>
</div>
```

### 5.6 Mobile Fallback

Beim Mobile-Breakpoint (`<md`, unter 768px) wird die Chevron-Reihe zu gestapelten Cards. Pro Stage:

- `StackedStage`-Card mit `rounded-xl`, weisser BG, 1px Border
- Header mit OWNER-BG-Farbe und Stage-Badges + Title
- Body mit Bullets in dunkelblauer Standard-Schrift (`oklch 0.32 0.10 250`, 13px)

## 6. Iterations-Workflow mit User

### Phase 1: User-Spec
Der User gibt eine initiale Spec, typischerweise:
- Eine textbasierte Beschreibung (alt: text mit `<ol>` + `<ul>`)
- Eine Skizze oder Designidee
- Eine Anforderung wie „gleiches Design wie Sektion 8"

### Phase 2: Plan Mode (Agent)
Der Agent tritt in **Plan Mode** und:
- Liest relevante Files (`page.tsx`, bestehende Komponenten, Skill-Files)
- Erkennt Schema-Position und BG-Kontext
- Erstellt einen detaillierten Plan mit Visual-Struktur
- Stellt **2-3 fokussierte Fragen** via Frage-Tool:
  - Platzierung von Begleit-Content (z. B. „Switching-Features in Sektion 4 behalten oder verschieben?")
  - Design-Optionen (z. B. „Reifegrad rot/gelb/cyan oder OWNER_STYLES?")
  - Akzent-Entscheidungen (z. B. „Warn-Akzent auf Stage 1 ja/nein?")

### Phase 3: Ausfuehrung (Agent)
Nach User-Antworten fuehrt der Agent aus:
- Neue Komponente erstellen (z. B. `NetworkEvolutionChevron.tsx`)
- Page anpassen (Sections hinzufuegen/ersetzen/splitten)
- Skill-Files aktualisieren (BG-Rhythmus, Lektionen)
- Mirror nach `opencode-skills`
- 2 Commits (Haupt-Repo + Mirror-Repo)

### Phase 4: Visuelle Verifikation (User)
Der User oeffnet die Vercel-Preview-URL und prueft visuell:
- Layout, Spacing, Farben, Lesbarkeit
- Mobile-Ansicht
- Uebergaenge zwischen Sektionen

### Phase 5: Korrektur-Iteration (Agent)
Basierend auf User-Feedback:
- Design-Anpassungen (Farben, Borders, Spacing)
- Content-Korrekturen (Texte, Bullet-Reihenfolge)
- Schema-Anpassungen (z. B. Sektion 4b extrahieren)

Typischerweise **3-4 Iterationen** bis zur finalen Version.

## 7. Verifikation & Deploy

### 7.0 Build-First-Then-Push (NEU ab Iteration 11, Lektion 24)

**Vor** jedem Push MUSS zuerst ein lokaler Build-Versuch gestartet werden:

```bash
# Erste Prioritaet — echter lokaler Build:
pnpm install && pnpm build
# oder direkt:
npx next build

# Exit-Code 0 = OK, alles andere = fixen, dann nochmal.
```

**Zweite Prioritaet** (wenn `node`/`pnpm` NICHT im Worker-PATH verfuegbar sind — typisch fuer `opencode`-Worker): statische Checks wie bisher. **Aber:** Statische Checks finden 90%, nicht 100%. Ein lokaler Build garantiert 100%.

Quelle: User-Feedback nach Vercel-Build-Fehler bei Commit `fa851ca` (German-Quotes-Syntax-Bug). Statische Verifikation hat den Fehler zwar erkannt, aber der Push erfolgte bereits.

### 7.1 Statische Verifikation (Agent-Aufgabe, Fallback ohne node)

```bash
# 1. Import-Check
grep -n "import.*ComponentName" /path/to/page.tsx

# 2. Section-Anzahl (sollte 13 oder 14 sein)
grep -nE "^      \{/\* ── [0-9]+[a-z]?\." /path/to/page.tsx | wc -l

# 3. BG-Rhythmus-Verifikation
grep -nE "(bg-white|kpx-section-(light|dark)|oklch\(0\.97|oklch\(0\.22)" /path/to/page.tsx

# 4. Skill-Mirror-Sync
diff -q /kpxitch/.opencode/skills/kpx-redesign/references/X.md /opencode-skills/skills/kpx-redesign/references/X.md

# 5. Token-Reduktion (keine verwaisten Code-Bloecke)
grep -c "export const" /path/to/serviceModelData.ts

# 6. Icon-Vollstaendigkeit (Python-Script, siehe build-verification.md §1)
python3 scripts/check-icons.py

# 7. German-Quote-Syntax (Python-Script, siehe build-verification.md §4)
python3 scripts/check-german-quotes.py

# 8. Keine `as never`-Hacks
grep -n "as never" /path/to/page.tsx   # muss LEER sein

# 9. Stats-Bar 1:1 (Lektion 22)
grep -c "Jahre IT-Praxis" /path/to/page.tsx   # = 1
grep -c "Schweizer KMU" /path/to/page.tsx     # = 1

# 10. JSON-LD Schema vollstaendig
for entity in BreadcrumbList FAQPage Organization Service; do
  grep -q "@type.:.*$entity" /path/to/page.tsx || echo "MISSING: $entity"
done
```

### 7.2 Visuelle Verifikation (User-Aufgabe)

- Vercel-Preview-URL oeffnen (manuell aus Vercel-Dashboard holen)
- Alle Breakpoints pruefen (Mobile, Tablet, Desktop)
- Konkrete Pruef-Punkte je nach Aenderung dokumentieren

### 7.3 Vercel-Deploy (User-Aufgabe)

- Push zu `origin/experimental` loest **nicht garantiert** Auto-Deploy aus
- Falls kein Auto-Deploy: manuell via Vercel-Dashboard triggern
- Agent hat keinen Vercel-Zugriff, kann nur Code pushen

## 8. Commit-Schema

### 8.1 Commit-Message-Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### 8.2 Typen und Scopes

| Typ | Scope-Beispiele | Verwendung |
|---|---|---|
| `feat` | `managed-network-wireless`, `managed-endpoint` | Neue Feature-Migration |
| `fix` | `managed-network-wireless`, `serviceModelData`, `section-rhythm` | Bugfix oder Korrektur |
| `docs` | `kpx-redesign` | Skill-Updates |
| `chore` | `deps`, `config` | Build-, Dependency-, Config-Aenderungen |

### 8.3 Branch-Konventionen

| Repo | Branch | Push-Flag | Verwendung |
|---|---|---|---|
| `kpx-itch` | `experimental` | `--force-with-lease` | Migration-Experimente, neue Features |
| `opencode-skills` | `main` | `--force-with-lease` | Skill-Mirror-Updates |

### 8.4 Author

`a.busch <a.busch@kpx-it.ch>`

### 8.5 Commit-Beispiele aus der Network-Migration

```
feat(managed-network-wireless): Migration aufs 13-Sektionen-Schema
feat(managed-network-wireless): Sektion 4 als 3-stufiges Chevron-Diagramm
feat(managed-network-wireless): NetworkEvolutionChevron im selben Design wie Sektion 8
fix(managed-network-wireless): Eyecatcher-Bild + 3-stufige Timeline entfernt, plain text
fix(managed-network-wireless): BG-Kontraste verbessert (Sektion 4 + 8 + 9)
fix(serviceModelData): verwaisten Code-Block nach MODELS_NETWORK entfernt
fix(managed-network-wireless): Eyecatcher-Bild auf lokales it-outsourcing-hero.jpg
docs(kpx-redesign): Background-Rhythmus mit klaren Kontrasten dokumentiert
docs(kpx-redesign): NetworkEvolutionChevron als Ausnahme dokumentiert (Skill-Sync)
docs(kpx-redesign): NetworkEvolutionChevron Design-Match mit Sektion 8 (Skill-Sync)
```

## 9. Haeufige Fehlerquellen

### 9.1 Verwaiste Code-Bloecke nach Refactor

**Symptom:** Build-Fehler wegen dupliziertem Code ohne `export const`.

**Beispiel aus Commit `b8d34b6`:** Nach Hinzufuegen von `MODELS_NETWORK` und `PHASES_NETWORK` blieb ein verwaistes Code-Duplikat ohne `export const` uebrig.

**Fix:** Datei komplett reviewen, sicherstellen dass jede Top-Level-Deklaration ein `export` hat oder geloescht ist.

### 9.2 403 CloudFront-URLs

**Symptom:** Eyecatcher-Bild oder anderes Asset zeigt 403 Forbidden.

**Beispiel:** `kpx-cloud-team-KaWEf3iqHVJdxYMHXUGcgb.webp` (CloudFront-URL) antwortet 403.

**Fix:** Lokales Bild aus `public/`-Verzeichnis verwenden.

### 9.3 clipPath + Border Anti-Pattern

**Symptom:** `border-left` oder `border-right` auf einer geclippten Cell wird nicht angezeigt.

**Ursache:** `clipPath: polygon(...)` clippt Borders mit.

**Fix:** Siehe Abschnitt 5.5 — 4px separates Flex-Item vor der Cell.

### 9.4 Kein lokales node/pnpm

**Symptom:** `next build` oder `tsc` kann nicht ausgefuehrt werden, weil kein `node` im PATH.

**Konsequenz:** Agent kann Code nicht lokal kompilieren, nur statisch reviewen.

**Workaround:** Statische Verifikation (grep, code review), visuelle Verifikation durch User.

### 9.5 Token im Klartext

**Risiko:** GitHub-Token `ghp_...` in `/root/opencode/workspace/kpxitch/token` ist im Klartext lesbar.

**Mitigation:** Token regelmaessig rotieren, Datei-Berechtigungen einschraenken (`chmod 600`).

### 9.6 Schema-Drift zwischen Skill und Code

**Symptom:** Skill dokumentiert 13 Sektionen, Code hat 14.

**Mitigation:** Bei jedem Schema-Aenderung Skill und Code synchron halten, idealerweise im selben Commit-Block dokumentiert.

## 10. Lessons Learned aus der Network-Migration

Chronologische Aufzeichnung der 4 Iterationen mit Begruendungen.

### Iteration 1: Initiale Migration (Commit `95b9ea1`)

**Was:** Komplette Migration von `/managed-network-wireless` auf 13-Sektionen-Schema.

**Inhalt:** Sektion 3 (Pain-Points text-basiert), Sektion 4 (3-stufige Timeline mit Custom-SVG-Icons), Sektion 8 (Chevron-Diagramm fuer Betreuungsmodelle), Sektion 9 (Context-Block).

**Lesson:** Bei einer Migration zuerst das grosse Bild (Sektionen-Struktur, BG-Sequenz) festlegen, dann Details. Custom-SVG-Icons und Timeline-Visuals sind verfuehrerisch, aber nicht noetig (siehe Lektion 14 in `tone-voice.md`).

### Iteration 2: 3-stufige Chevron statt Timeline (Commits `b637923` + `06cc616`)

**Was:** Eyecatcher-Bild und 3-stufige Timeline mit Custom-SVG-Icons entfernt, durch plain text ersetzt. Lokales Bild statt CloudFront-URL verwendet.

**Lesson:** User-Pragmatismus schlaegt visuelle Opulenz. Plain text mit `<h3>` und `<ul>` ist oft klarer als animierte Visuals.

### Iteration 3: Rot/Gelb/Cyan Chevron (Commit `6a74e4c`)

**Was:** User-Anforderung: Sektion 4 als Chevron-Diagramm. Erste Iteration mit Reifegrad-Farben rot/gelb/cyan.

**Lesson:** Auch bei User-Anforderung die Schema-Konventionen pruefen. Chevron-Diagramm als **standalone Section** macht mehr Sinn als nested in einer bestehenden Section. Bei eigenstaendigen Komponenten mit eigenem Section-Wrapper das BG auf `light-grey` setzen fuer visuellen Kontrast.

### Iteration 4: 1:1 Design-Match mit Sektion 8 (Commit `408570e`)

**Was:** User-Korrektur: „das chevron bitte in den seleben design wie das andere cheron weiter unten auf der seite". Komplettes Redesign von `NetworkEvolutionChevron`: identische Tokens, OWNER_STYLES-Palette statt rot/gelb/cyan, Stage 1 mit 4px rotem Border-Left als Warn-Akzent.

**Lesson:** **Design-Konsistenz schlaegt individuelle Farbgebung.** Wenn zwei Chevron-Komponenten auf der gleichen Seite sind, muessen sie dieselbe Design-Sprache sprechen. Reifegrad wird durch OWNER_STYLES-Sequenz impliziert, statt durch explizite Reifegrad-Farben.

### Iteration 5: Visuelles Polishing + Skill-Update (Commit `3f65df3`)

**Was:** User-Inspektion der Vercel-URL `kpx-it-nextjs-gw3cy11y7-kpxit.vercel.app/managed-network-wireless` mit drei Anweisungen:
1. „Entferne den Strich nach den Quellen" → 3px cyan BorderBottom zwischen Sektion 9 (Context-Block) und Sektion 10 (FAQ) entfernt
2. „Schrift im Chevron kräftiger" → font-medium (500) für Bullets in `NetworkEvolutionChevron` (Desktop + Mobile) und PhaseCell Body in `ServiceModelArrowsFullNetwork`
3. „Plattform-Badge entfernen" → `<p className="...rounded-full">Plattform: ...</p>` aus `ServiceModelArrowsFullNetwork` entfernt, `plattform=`-Prop im Aufruf bereinigt

**Lesson:**
- **Visuelles Rauschen vermeiden:** Plattform-Badge war redundant — Subtitle enthält bereits die Plattform-Info. Pill-Badge nur visueller Lärm.
- **Body-Text braucht `font-medium`:** Default 400 wirkt zu schwach für Bullet-Punkte. 500 ist bewusster Listenpunkt, nicht Fliesstext.
- **BG-Rhythmus-Regel darf Ausnahmen haben:** Wenn zwei dunkle Sektionen thematisch zusammengehören (FAQ erklärt Context-Block), kann der Border-Trenner entfallen. Wichtig: User-Entscheidung, nicht Agent-Eigenmächtig.

### Iteration 6: Server-Seite Migration + Standard-Stats-Regel (Commit TBD)

**Was:** Migration von `/managed-it-services/server` auf das 13-Sektionen-Schema. Die Seite war komplett anders strukturiert (Sidebar-Layout mit 1 Hero + 1 Main Content + 1 CTA am Ende). Komplett umschreiben auf 13 Sektionen:
- Hero mit radial-gradient (kein Image)
- Standard-Stats-Bar (User-Regel: IMMER 1:1 von Startseite)
- Problem mit 4 Pain-Points aus aktuellem Problem-Intro abgeleitet
- Lösung (Sektion 4) mit RMM (6 Features cyan) + EDR (6 Features rot) als 2 Sub-Blocks
- Frage (Sektion 5) aus aktueller Bottom-Frage
- Prozess (Sektion 6) mit 4 NEU erstellten Schritten (Audit → Offerte → Betrieb)
- Chevron Sektion 8 mit `<ServiceModelArrowsFull>` generischem Subheading
- Context-Block (Sektion 9) mit 3 SEO-Spalten + RMM/EDR Vergleichstabelle (12 Zeilen Zebra) + Quellen
- FAQ (Sektion 10) in dark Theme verschoben
- Störungen (Sektion 11) mit 7 produkte-Cards + Hover cyan
- IT-Wissen (Sektion 12) mit `getLatestPosts(4)`
- Servicegebiet (Sektion 13) mit MapPin-Akzent 12x12px
- `ServicePageFooter` für Final-CTA

**Lesson:**
- **Sidebar-Layout zu Section-Schema:** Die Server-Seite hatte ein völlig anderes Layout (Sidebar mit Sticky-CTA + Image). Die Inhalte mussten neu verteilt werden: Sidebar-Items (CTA-Card, Image, „Was wir übernehmen", Servicegebiet, IT-Wissen-Links) → in eigene Sektionen aufgeteilt (Sektion 11/12/13, Final-CTA via ServicePageFooter).
- **Standard-Stats als feste Regel:** User-Anweisung „immer standard stats bitte merken" war eine QUERSCHNITT-ENTSCHEIDUNG, nicht nur für die Server-Seite. Wird in `tone-voice.md` Lektion 22 dokumentiert. Gilt für alle Service-Seiten.
- **RMM + EDR als 2 Sub-Blocks:** Die zwei Plattformen (RMM = cyan, EDR = rot) bleiben visuell erkennbar (Akzentfarbe), aber inhaltlich in einer Sektion vereint. Vermeidet 14-Sektionen-Erweiterung wie bei Network.

### Iteration 7: Cloud-Seite Migration (Commit `e886e66`)

**Was:** Migration von `/managed-it-services/cloud` auf das 13-Sektionen-Schema. Sidebar-Layout → 13 Sektionen analog Server/Network.
- Hero mit radial-gradient, 4 Hero-Punkte (Kostenkontrolle, Azure+M365, BACS-Sicherheit, Rightsizing)
- Standard-Stats-Bar (User-Lektion 22)
- Problem mit 4 Pain-Points (Ressourcen unkontrolliert, Sicherheit Standard, Kosten unkontrolliert, Vendor Lock-in)
- Lösung (Sektion 4) mit 6 Benefits (2-col Grid) + 6 Feature-Cards „Was wir konkret für Sie übernehmen" (3-col Grid)
- Prozess (Sektion 6) mit 4 NEUEN Schritten (Cloud-Analyse → Migration → Kosten-Optimierung → Vollbetrieb)
- Chevron (Sektion 8) mit `<ServiceModelArrowsFull>` Azure+M365-Subheading
- Context-Block (Sektion 9) mit 3 SEO-Spalten + Vergleichstabelle 3 Cloud-Modelle (Public/Private/Hybrid × 5 Merkmale, Zebra) + Quellen
- FAQ (Sektion 10) 4 Fragen dark
- Störungen (Sektion 11) 7 produkte-Cards
- ServicePageFooter für Final-CTA

**Lesson:**
- **Vercel-Build-Fehler aus Iteration 6 vermieden:** KEIN `currentServiceId`-Prop auf `<ServiceModelArrowsFull>` — das Prop existiert nur auf der Network-Variante `<ServiceModelArrowsFullNetwork>`. Lesson: beim Kopieren von Chevron-Code zwischen Service-Seiten die spezifische Komponente prüfen.
- **Cloud braucht keine Sektion-4-Erweiterung:** Anders als Network (mit 4b für Switching-Features) und Private-Cloud (mit 4b für Included Features) ist Cloud schlanker — die 6 Benefits + 6 Feature-Cards passen in eine Sektion. Vermeidet 14-Sektionen-Erweiterung wo nicht nötig.
- **Address-Korrektur:** Schema-Organization hatte `Industriestrasse 10` statt `Grindelstrasse 6` — bei jeder Migration verifizieren.

### Iteration 8: Private-Cloud-Seite Migration (Commit `ee763c0`)

**Was:** Migration von `/managed-it-services/private-cloud` auf 14-Sektionen-Schema (analog Network mit 4b-Erweiterung).
- Hero mit radial-gradient, 4 Hero-Punkte (HCI ab 1 HE, vor Ort oder Rechenzentrum, VMware-Alternative, betreut)
- Standard-Stats-Bar
- Problem mit 4 Pain-Points (Public Cloud unkontrollierbar, Server zu komplex, VMware-Lizenzkosten, Vendor Lock-in)
- **Lösung (Sektion 4) mit `<NetworkEvolutionChevron>` und 3 Stages:**
  - Stage 1 „Beim Kunden vor Ort" (kunde/hellgrau, 4px rot Akzent) — Selbstverantwortung
  - Stage 2 „Im Schweizer Rechenzentrum" (geteilt/cyan) — Übergang
  - Stage 3 „Hybrid-Option" (kpx/dunkelblau) — KPX übernimmt
- Sektion 4b: 6 Feature-Cards „Was im Managed-Betrieb enthalten ist"
- Prozess (Sektion 6) mit 4 NEUEN Schritten (HCI-Analyse → Konzept → Migration → Vollbetrieb)
- Chevron (Sektion 8) mit `<ServiceModelArrowsFull>` HCI-Subheading
- Context-Block (Sektion 9) mit 3 SEO-Spalten + Vergleichstabelle 4 Plattformen (HCI vs VMware vs Hyper-V vs Proxmox × 5 Merkmale) + Quellen (BACS, Proxmox, NIST)
- FAQ (Sektion 10) 8 Fragen dark
- Störungen (Sektion 11) **8** produkte-Cards (NEU: Managed Private Cloud hinzugefügt)
- ServicePageFooter für Final-CTA
- **Schema ergänzt:** Organization @id war im Original fehlend

**Lesson:**
- **NetworkEvolutionChevron für Deployment-Optionen:** Die semantische Zuordnung funktioniert: „Selbstverantwortung" für On-Premises (Sie tragen Verantwortung), „Übergang" für Rechenzentrum (shared), „KPX übernimmt" für Hybrid (full managed). OWNER_STYLES-Sequenz kommuniziert Reifegrad auch für Deployment-Optionen.
- **Sektion-4-Erweiterung (4b) für mehr Inhalt:** Bei Private-Cloud passt die Lösung nicht in eine Sektion — NetworkEvolutionChevron für Stages + separate Sektion 4b für Included Features. Analog Network-Pattern.
- **Produkte-Array erweitern:** Wenn eine migrierte Seite in Sektion 11 als Service-Card erscheinen soll, muss sie in `produkte.ts` registriert sein. Private-Cloud fehlte dort — wurde bei Migration hinzugefügt. Lesson: vor jeder Migration `produkte.ts` prüfen, ob die Seite eingetragen ist.

### Iteration 9: Hardware-Firewall-Seite Migration (Commit `6263e5f`)

**Was:** Migration von `/managed-it-services/firewall` auf 13-Sektionen-Schema.
- Hero mit radial-gradient, 4 Hero-Punkte (Cloud-verwaltet, 3 Schutzstufen, SLA, laufendes Monitoring)
- Standard-Stats-Bar
- Problem mit 4 Pain-Points (Firewall ohne Betreuung, Lokal-verwaltet-veraltet, Veraltetes Regelwerk, Kein Monitoring)
- **Lösung (Sektion 4) mit `<NetworkEvolutionChevron>` und 3 Stages:**
  - Stage 1 „Basic Security" (kunde/hellgrau/rot-Akzent) — Selbstverantwortung mit 6 Standard-Features
  - Stage 2 „Hybrid (Cloud-verwaltet)" (geteilt/cyan) — KPX übernimmt Cloud-Verwaltung + automatische Updates
  - Stage 3 „Total Protection" (kpx/dunkelblau) — KPX übernimmt alles + 6 Advanced-Features
- Sektion 4b: 8 Managed-Leistungen mit Nummer-Circles
- Prozess (Sektion 6) mit 4 NEUEN Schritten (Firewall-Audit → Schutzstufe wählen → Inbetriebnahme → Laufender Betrieb)
- Chevron (Sektion 8) mit `<ServiceModelArrowsFull>` Firewall-Subheading
- Context-Block (Sektion 9) mit 3 SEO-Spalten + Vergleichstabelle 10 Merkmale × 3 Schutzstufen (Basic/Hybrid/Total) + Quellen (BACS, NIST, SwissICT)
- FAQ (Sektion 10) 6 Fragen dark
- Störungen (Sektion 11) 8 produkte-Cards
- ServicePageFooter für Final-CTA
- Schema ergänzt: Organization @id war im Original fehlend

**Lesson:**
- **3-Stage-Reifegrad auch für bestehende 2-Stufen-Pages:** Die Original-Seite hatte Basic Security + Total Protection (2 Stufen). User wollte 3 Stages mit Hybrid-Option. Lösung: Hybrid-Stufe kombiniert Basic-Features + cloud-basierte Verwaltung (kein neuer Content nötig, nur andere Akzentuierung). Reifegrad-Sequenz kunde → geteilt → kpx bleibt konsistent.
- **build-verification.md funktioniert:** Das Python-Script aus dem vorherigen Build-Fehler-Fix hat alle Icon-Imports, `as never`-Workarounds und `currentServiceId`-Props abgefangen. Beide Seiten (Firewall + Cloud-Firewall) waren beim ersten Push build-clean.

### Iteration 10: Cloud-Firewall-Seite Migration (Commit `073ccaf`)

**Was:** Migration von `/managed-cloud-firewall` auf 13-Sektionen-Schema. Separate URL (nicht in `/managed-it-services/`), weil Cloud-Firewall separates Produkt ist (Zero Trust vs. klassische Hardware-Firewall).
- Hero mit radial-gradient, 4 Hero-Punkte (Cloud-native, 3 Schutzstufen, Zero Trust ohne VPN, Remote-Nutzer)
- Standard-Stats-Bar
- Problem mit 4 Pain-Points (Remote-Nutzer ungeschützt, VPN-Komplexität, Cloud-Apps nicht abgedeckt, Zero-Trust fehlt)
- **Lösung (Sektion 4) mit `<NetworkEvolutionChevron>` und 3 Stages:**
  - Stage 1 „Internet Access" (kunde/hellgrau/rot-Akzent) — Selbstverantwortung mit 8 Web-Schutz-Features
  - Stage 2 „Hybrid (VPN-Ersatz)" (geteilt/cyan) — Internet Access + Private Application Cloaking + App-Level-Zugriff
  - Stage 3 „Total Access" (kpx/dunkelblau) — Vollständiges ZTNA + alle 6 Extras
- Sektion 4b: 8 Managed-Leistungen
- Prozess (Sektion 6) mit 4 NEUEN Schritten (Schutzanalyse → Onboarding → Richtlinien-Anpassung → Laufender Betrieb)
- Chevron (Sektion 8) mit `<ServiceModelArrowsFull>` Cloud-Firewall-Subheading
- Context-Block (Sektion 9) mit 3 SEO-Spalten + Vergleichstabelle Cloud vs Hardware (7 Merkmale) + Quellen
- FAQ (Sektion 10) 6 Fragen dark
- Störungen (Sektion 11) 8 produkte-Cards
- ServicePageFooter für Final-CTA
- Schema ergänzt: Organization @id war im Original fehlend

**Lesson:**
- **Separate URLs als bewusste Design-Entscheidung:** `/managed-it-services/firewall` (Hardware, im `managed-it-services`-Cluster) und `/managed-cloud-firewall` (Cloud, separat) bleiben beide eigenständige Seiten. Beide sind eigenständige Produkte mit unterschiedlicher Wertproposition — keine Consolidation nötig.
- **Cross-Linking zwischen verwandten Seiten:** Die Original Cloud-Firewall-Seite hatte Bottom-Links zu „Managed Firewall (Hardware)" und „Managed Security". Diese Struktur ist im neuen Schema weniger prominent (Sektion 11 zeigt beide als Cards), aber die inhaltliche Verknüpfung bleibt über die FAQ-Antworten erhalten.
- **Vergleichstabellen in Sektion 9 als Differenzierung:** Statt nur 3 SEO-Spalten + Quellen kann Sektion 9 auch Vergleichstabellen enthalten (Cloud-Firewall: Cloud vs Hardware; Hardware-Firewall: 3 Schutzstufen). Pro Seite angepasst an den Content-Schwerpunkt.

### Iteration 9+10 produkte-Erweiterung (Commit `719fe37`)

**Was:** `produkte.ts` um 2 Einträge erweitert (jetzt 10 statt 8):
- Managed Firewall: `oklch(0.50 0.16 30)` (rot-orange Akzent)
- Managed Cloud Firewall: `oklch(0.55 0.18 245)` (blauer Akzent für Cloud-Dienste)

**Lesson:**
- **Firewall-Familie als zusammengehörige Service-Gruppe:** Die beiden Firewall-Seiten haben unterschiedliche Wertproposition (on-prem Hardware vs Cloud SaaS), gehören aber zusammen. Die `produkte.ts`-Einträge spiegeln das mit unterschiedlichen Farben — auf Sektion 11 anderer Seiten erscheinen sie nebeneinander.
- **`produkte.ts` ist jetzt 10 Einträge** — Performance-Check nicht nötig (kein Virtual-Scrolling), aber bei weiterem Wachstum sollten Pagination oder Filter in Betracht gezogen werden.

### Was gut funktioniert hat
- Schrittweise Iterationen mit klaren User-Freigaben
- Plan-Mode mit Frage-Tool fuer Design-Entscheidungen
- Statische Verifikation als Agent-Aufgabe, visuelle Verifikation als User-Aufgabe
- Skill-Updates nach jeder strukturellen Aenderung (Iteration 5 hat 3 neue Lektionen + Components/Section-Rhythmus Updates gefordert)
- Mirror-Sync direkt nach jedem kpx-itch-Skill-Update
- **Vercel-URL nach Git-Push funktioniert automatisch** (neuer Deployment-Hash nach jedem Push) — User kann ohne manuelle Trigger visuell verifizieren
- **Bestehende Schema-Patterns wiederverwendet:** Endpoint-Seite als Vorlage für Layout, Network-Seite für BG-Rhythmus und Chevron-Integration
- **User-Anweisungen früh festhalten:** Standard-Stats-Regel wurde als Lektion 22 dokumentiert, damit künftige Migrationen sie automatisch anwenden
- **Vercel-Build-Fehler-Vermeidung:** currentServiceId-Prop aus Iteration 6 nicht wiederholt in Iterations 7+8
- **NetworkEvolutionChevron mehrfach einsetzbar:** Network (Sektion 4 Evolution) und Private-Cloud (Sektion 4 Deployment) — gleiche Komponente, verschiedene Stages

### Was nicht gut funktioniert hat
- Erste Iteration mit Custom-SVG-Timeline war visuelle Opulenz, die User nicht brauchte
- Erste Chevron-Iteration (rot/gelb/cyan) brach die Design-Konsistenz mit Sektion 8
- Erste Pain-Point-Icons-Annahme (cyan) war falsch — waren bereits orange-rot, keine Aenderung noetig
- Skill-Updates wurden in fruehen Iterationen vom User explizit verzoegert („erstmal nicht anpassen") — Skill-Sync-Discipline braucht User-Vorgabe
- Server-Migration startete mit Plan ohne User-Bestätigung der Pain-Point-Ableitung — diese sind jetzt aus aktuellem Problem-Text interpretiert, sollten aber mit User verifiziert werden
- Vercel-Build-Fehler bei Iteration 6 (currentServiceId) trotz Code-Review — TypeScript-Fehler wurden im Agent-Loop übersehen

### Iteration 11: German-Quotes-Bug + Build-First-Then-Push-Policy (Commit `fa851ca` + Lektion 24)

**Was:**
1. **German-Quotes-Syntax-Bug in `firewall/page.tsx` (Zeile 91) und `managed-cloud-firewall/page.tsx` (Zeile 442):** Beide Stellen hatten `"...„Begriff" mehr Text"` mit ASCII-Closing-Quote `"` (U+0022) statt German-Closing-Quote `"` (U+201C). Folge: Turbopack parst den ASCII-`"` als JS-String-Ende und interpretiert `mehr Text` außerhalb des Strings → `Expected ',', got 'ident'` Parse-Fehler beim Vercel-Build.
2. **User-Feedback nach Bug-Fix:** „bitte die seite immer einmal local bauen und validieren bevor sie in GitHub hochgeladen wird, ist das im skill abgebildet?" — daraus entstand Lektion 24 **Build-First-Then-Push-Policy**.
3. **Skill-Update:** `tone-voice.md` Lektion 24, `build-verification.md` Schritt 0 (lokaler Build vor allen anderen Checks), `migrations-playbook.md` §7.0 (Build-First-Then-Push als Sektion 7.0 vor §7.1), §12 Quick-Reference-Checklist erweitert.

**Lesson:**
- **Turbopack vs. webpack/esbuild:** Turbopack ist bei String-Literalen mit Unicode-Characters strikter. ASCII-`"` als inneres Anführungszeichen schliesst den String. **Immer beide inneren Quotes als Deutsche verwenden** (U+201E + U+201C).
- **Statische Checks vs. echter Build:** Statische Checks haben den German-Quotes-Bug bei Iteration 10 erkannt — der Push erfolgte aber trotzdem. Der Fix `fa851ca` musste nachträglich gemacht werden. **Lesson:** Ein echter lokaler Build (`pnpm build`) garantiert 100% Fehler-Erkennung VOR dem Push und ist der „source of truth".
- **Build-First-Then-Push ist nicht optional:** Lektion 24 in `tone-voice.md` dokumentiert die Regel. Build-Verification.md ergänzt `Schritt 0: Lokaler Build-Versuch` als erste Priorität (vor allen statischen Checks).

### Iteration 12: Managed E-Mail Security Migration (Commit `05e1104` + Lektionen 25-28)

**Was:** Migration von `/managed-it-services/email-security` auf das 13-Sektionen-Schema. Erste Single-Track-Seite (kein Chevron, weil Inhalt keine 3 Reifegrad-Stufen hat).
- Hero mit radial-gradient (kein Hero-Image)
- Standard-Stats-Bar (Lektion 22)
- Problem mit 4 Pain-Points aus E-Mail-Bedrohungs-Lage (90 % Angriffe per Mail, Spam-Filter reicht nicht, Phishing zunehmend gezielt, Domain-Missbrauch)
- **Lösung (Sektion 4) mit 2 Sub-Blocks plain text h3+ul** (kein Chevron): Grundschutz (6 Features) + Erweiterter Schutz (6 Features)
- Prozess (Sektion 6) mit 4 NEUEN Schritten (Audit → Schutzumfang → Inbetriebnahme → Betrieb)
- Chevron (Sektion 8) mit `<ServiceModelArrowsFull>` generischem Subheading
- Context-Block (Sektion 9) mit 3 SEO-Spalten + Vergleichstabelle Grundschutz/Erweiterung (10 Merkmale × 2 Spalten, Zebra) + Quellen (BACS, antiphishing.ch, MELANI)
- FAQ (Sektion 10) 8 Fragen dark
- Störungen (Sektion 11) 13 produkte-Cards (NEU: Email Security + Security Operations + MDM hinzugefügt)
- ServicePageFooter für Final-CTA
- **Schema ergänzt:** Organization @id war im Original fehlend, nur inline in `provider`

**Querschnitts-Aufgaben einmalig vor Migration 12:**
1. `produkte.ts` von 10 auf 13 Einträge erweitert (Lektion 27 Self-Link-Disziplin)
2. Schema-Standard-Block aus `security/page.tsx` als Vorlage extrahiert
3. CloudFront-URL-Audit per `curl -I` (Lektion 26): Security-Bild antwortet 403

**Lesson:**
- **Plain-Text-Sektion-4 für Single-Track-Inhalte (Lektion 28):** Email-Security hat keine 3 Reifegrad-Stufen — Grundschutz + Erweiterung sind Erweiterungen, kein Reifegrad. Zwei Sub-Blocks mit h3+ul sind klarer als erzwungene Chevron-Stages.
- **Schema-Standard-Block als Querschnittsregel (Lektion 25):** Jede Service-Seite MUSS Organization @id + vollständige Adresse + Telefon + E-Mail + Logo haben. Vor Migration prüfen, ob vorhanden.
- **CloudFront-403 → Hero ohne Image (Lektion 26):** Wenn die CloudFront-URL für den Hero 403 antwortet, wird der Hero komplett ohne Image gerendert (radial-gradient Background). Pattern-Farbe als visuelle Kompensation.
- **Querschnitts-Aufgaben einmalig dokumentieren:** Wenn eine Migration Querschnitts-Aufgaben triggert (Schema-Block, produkte.ts), diese VOR der ersten Migration ausführen und im Skill dokumentieren — nachfolgende Migrationen profitieren.

### Iteration 13: Managed Security Migration (Commit `151e0f0` + Lektionen 29-31)

**Was:** Migration von `/managed-it-services/security` auf das 13-Sektionen-Schema. Erste Seite mit **4+ Schutzebenen** (Endpoint/Netzwerk/Cloud/Mensch).
- Hero (dunkel, radial-gradient) — **KEIN Hero-Image**, weil CloudFront-URL `kpx-security-swiss-…webp` antwortet 403 (Audit vor Migration bestätigt). Pattern-Color als visueller Ersatz.
- Standard-Stats-Bar (Lektion 22)
- Problem (light) mit 4 Pain-Points (Irrtum „zu klein", 200 Vorfälle/Tag laut BACS, sinkendes Vertrauen 42 %, Meldepflicht Art. 74a revISG)
- **Lösung (Sektion 4) mit 4 Schutzebenen plain text Card-Grid** (kein Chevron weil 4 Ebenen, nicht 3 Reifegrad-Stufen): Endpoint / Netzwerk / Cloud / Mensch — je mit Icon + Titel + Beschreibung + Technologie-Pille
- Frage (dunkel)
- Prozess (white, 4 NEUE Schritte: Assessment → Konzept → Umsetzung → Betrieb)
- Chevron (Sektion 8) mit `<ServiceModelArrowsFull>` SOC-Subheading
- Context-Block (dunkel) mit 3 SEO-Spalten + Vergleichstabelle 11 SOC-Stufen (Basic/Standard/Premium × 11 Merkmale) + **10 externe Quellen mit echten Links** (BACS, cyberstudie.ch, Mobiliar, ITSec4KMU, ADSS, EDÖB, eBanking, SATW, antiphishing.ch, BACS Lageberichte)
- FAQ (dunkel, 6 native details) — aus Original übernommen
- Störungen (Sektion 11) 13 produkte-Cards
- ServicePageFooter für Final-CTA
- Schema-Script von Ende an Anfang verschoben (vor Footer statt nach — vorherige Iterationen haben Script am Anfang)

**Lesson:**
- **CloudFront-403-Fallback (Lektion 29):** Audit-Ergebnisse dokumentiert. Hero ohne Image bei 403 ist sauberer als lokales Fallback-Bild. Pattern-Color radial-gradient liefert visuell gleichwertigen Hero.
- **Plain-Text-Sektion-4 für N-stufige Strukturen (Lektion 30):** Bei 4+ kategorischen Ebenen (nicht Reifegrad) Grid-Layout mit plain text Card pro Ebene. Chevron ist 3-Stages-fixiert.
- **Externe Quellen-Listen als SEO-Booster (Lektion 31):** 10+ externe Quellen strukturieren in 2-Spalten-Grid in dunkler Karte. Erhöht SEO-Autorität bei KMU-Themen. Pattern wiederverwendbar für andere Seiten mit Quellen-Sammlungen (z. B. M365, Cloud).

### Iteration 14: Endpoint Detection & Response Migration (Commit `c3f9cf2` + Lektion 32)

**Was:** Migration von `/managed-it-services/endpoint-detection-response` auf das 13-Sektionen-Schema. Erste Seite mit **NetworkEvolutionChevron für Erkennungs-Stufen** (nicht Deployment oder Schutzstufen).
- Hero (dunkel, radial-gradient mit rot-Akzent für EDR-Bedrohungs-Fokus) + 4 Hero-Punkten
- CloudFront-URL `kpx-edr-hero-…webp` antwortet 200 (Audit bestätigt) — bleibt für OpenGraph/Twitter-Karten erhalten
- Standard-Stats-Bar (Lektion 22)
- Problem (light) mit 4 Pain-Points (dateilose Angriffe, Living-off-the-Land, Zero-Day, Ransomware-Speed)
- **Lösung (Sektion 4) mit NetworkEvolutionChevron 3 Stages aus seiteneigenen Inhalten abgeleitet**:
  - Stage 1 „Basis-Erkennung" (kunde, 4px rot Border-Left): Signatur-AV — reagiert nur auf bekannte Schadsoftware
  - Stage 2 „Erweiterte Analyse" (geteilt): SentinelOne mit KI-Verhaltensanalyse, manuelle Reaktion
  - Stage 3 „Automatische Reaktion" (kpx): 24/7 SOC + automatische Isolation + Rollback + NIS2-Reporting
- Frage (dunkel)
- Prozess (white, 4 NEUE Schritte: Audit → Stufe wählen → Deployment → Betrieb)
- Chevron (Sektion 8) mit `<ServiceModelArrowsFull>` SOC-Subheading
- Context-Block (dunkel) mit 3 SEO-Spalten + Vergleichstabelle 10 Erkennungsstufen (Basis/Erweitert/Managed × 10 Merkmale) + BACS/MITRE ATT&CK/NCSC Quellen
- FAQ (dunkel, 7 native details) — aus Original übernommen, NIS2-Frage ergänzt
- Störungen (Sektion 11) 13 produkte-Cards
- ServicePageFooter für Final-CTA
- Schema bereits vollständig (Org @id vorhanden), Script am Anfang beibehalten

**Lesson:**
- **NetworkEvolutionChevron mit seiteneigenen 3 Stages (Lektion 32):** Erkennungs-Reifegrade bei EDR sind seiteneigen — Basis-AV vs. KI-Verhalten vs. SOC-Betrieb. Reifegrad-Sequenz kunde → geteilt → kpx bleibt, Inhalte sind Security-spezifisch. Pattern: 5 Bullets pro Stage, max. 8 Wörter pro Bullet.

### Iteration 15: Managed Mobile Device Migration (Commit `8ab1e25` + Lektion 33)

**Was:** Migration von `/managed-mobile-device` auf das 13-Sektionen-Schema. Erste Seite mit **NetworkEvolutionChevron für MDM-Einrichtungs-Stufen** + **Vergleichstabelle Plattform-Features**.
- Hero (dunkel, radial-gradient mit grün-cyan-Akzent für Mobile-Fokus) + 4 Hero-Punkten
- CloudFront-URL `kpx-mdm-mobile-device-…webp` antwortet 200 (Audit bestätigt) — wird für OpenGraph verwendet
- Standard-Stats-Bar (Lektion 22)
- Problem (light) mit 4 Pain-Points (Smartphones ungeschützt, Verlust/Diebstahl Realität, BYOD unkontrolliert, Aussendienst ohne Tracking)
- **Lösung (Sektion 4) mit NetworkEvolutionChevron 3 Stages**:
  - Stage 1 „Manuelle Einrichtung" (kunde, 4px rot Border-Left): jedes Gerät einzeln konfiguriert
  - Stage 2 „Zero-Touch Enrollment" (geteilt): automatische Konfiguration + zentrale Konsole + BYOD
  - Stage 3 „Laufende Verwaltung & Sicherheit" (kpx): Remote Wipe in Sekunden + Geolokalisierung + 24/7 KPX-Betrieb
- Frage (dunkel)
- Prozess (white, 4 NEUE Schritte: Audit → Stufe wählen → Rollout → Betrieb)
- Chevron (Sektion 8) mit `<ServiceModelArrowsFull>` Mobile-Subheading
- Context-Block (dunkel) mit 3 SEO-Spalten + **Vergleichstabelle Android vs. iOS** (10 Funktionen × 2 Spalten) mit plattformspezifischen Einschränkungs-Markern (`in Entwicklung`, `eingeschränkt`, `nur View`) + Apple Business Manager / Android Enterprise / NCSC Quellen
- FAQ (dunkel, 7 native details) — aus Original übernommen
- Störungen (Sektion 11) 13 produkte-Cards
- ServicePageFooter für Final-CTA
- Schema bereits vollständig (Org @id vorhanden), Script am Anfang verschoben

**Lesson:**
- **Vergleichstabellen mit plattformspezifischen Einschränkungen (Lektion 33):** Android vs. iOS-Tabelle mit ehrlichen Differenzierungen statt nur ✓/–. SEO-relevant (User sucht oft nach „MDM iOS Einschränkungen"), schafft Vertrauen durch Transparenz.
- **MDM als einzige Seite mit `currentServiceId="mobile-device"`:** Service-URL ist `/managed-mobile-device` (nicht `/managed-it-services/...`), aber `currentServiceId` in ServicePageFooter verwendet slug `mobile-device` (analog zu network/email-security/cloud-firewall).

### Iteration 16: NetworkEvolutionChevron TypeScript-Stage-Property-Bug (Commit `7504915` + Lektionen 34-35)

**Was:** Vercel-Build-Fehler bei Commit `8ab1e25` (MDM):
```
./app/managed-it-services/endpoint-detection-response/page.tsx:303:19
Type error: Object literal may only specify known properties, and 'id' does not exist in type 'Stage'.
```

**Ursache:** Iterations 14 (EDR, Commit `c3f9cf2`) und 15 (MDM, Commit `8ab1e25`) verwendeten `NetworkEvolutionChevron` mit eigenem Schema:
```ts
stages={[
  { id: "basis", title: "...", owner: "kunde", headline: "...", bullets: [...] },
  ...
]}
```

Aber die `Stage`-Type-Definition in `components/NetworkEvolutionChevron.tsx:28-32` erwartet strikt:
```ts
interface Stage {
  number: 1 | 2 | 3;
  title: string;
  bullets: string[];
}
```

`owner` wird intern aus `STAGE_OWNER_MAP[stage.number]` abgeleitet, `id` und `headline` sind nicht im Type.

**Warum statische Checks den Fehler nicht erkannten (Lektion 24 Lücke):** Die Python-Skripte in `build-verification.md` prüfen Icon-Vollständigkeit, `as never`, Section-Anzahl, Schema-Vollständigkeit — aber NICHT die TypeScript-Properties von Stage-Objekten. Vercel hat den Fehler zuverlässig erkannt, aber erst NACH dem Push.

**Fix (Commit `7504915`):**
- Beide Seiten: Stages auf `number: 1/2/3` migriert
- `id`, `owner`, `headline` entfernt (Headline-Inhalt ging verloren — wurde nicht im Stage-Type unterstützt)
- Pattern ist identisch zu den 4 anderen Verwendungen (private-cloud, network, firewall, cloud-firewall), die bereits `number`-Schema nutzten

**Lesson:**
- **NetworkEvolutionChevron Stage-Type-Schema strikt einhalten (Lektion 34):** Bei jeder Verwendung das Schema exakt prüfen — `number`, `title`, `bullets`. KEIN `id`, `owner`, `headline`.
- **TypeScript-Stage-Property-Check ergänzen (Lektion 35):** Statische Verifikation muss TypeScript-Stage-Properties prüfen. Python-Skript-Logik: bei Chevron-Imports die `stages={[...]}`-Aufrufe gegen erlaubte Property-Liste prüfen. **Pattern wiederverwendbar für alle typisierten Komponenten** (ServiceModelArrowsFull, NetworkEvolutionChevron etc.).
- **Lokaler Build im Worker möglich (Lektion 36):** Mit `apt-get install -y nodejs` + `corepack enable pnpm` + `./node_modules/.bin/{tsc,next}` ist ein echter lokaler Build möglich — findet 100% der TypeScript-Fehler VOR Push. **Lesson aus User-Feedback:** „warum testet du den buiold nicht local?" — Lektion 24 (Build-First-Then-Push) ist nicht nur ein Schritt in der Verifikation, sondern MUSS vor jedem Push ausgeführt werden. Vercel-Build ist Bestätigung, nicht primärer Validierungs-Schritt.
- **NetworkEvolutionChevron Heading-Rendering (Lektion 38):** Die Komponente rendert `heading` + `subheading` selbst. Wrapper darf KEIN äußeres `<h2>` + `<p>` haben.
- **Self-Link-Filterung in Sektion 11 (Lektion 39):** `produkte.filter((p) => p.href !== "/current-url")` verhindert Self-Link-Card.
- **Lokaler Build ist Pflicht (Lektion 40):** Vor jedem Push MUSS `./node_modules/bin/{tsc,next build}` Exit-Code 0 liefern.

### Iteration 18: Hero-Farb-Inkonsistenz (Commit `f59004c` + Lektionen 41-42)

**Was:** User-Feedback „warum haben die heros der letzten beiden seiten so unetrschiedliche farben" — visuelle Inkonsistenz in den migrierten Service-Seiten-Heroes. Analyse ergab 4 verschiedene Hue-Werte:

| Seite | Hue | Farbe |
|---|---|---|
| firewall, cloud, server, private-cloud, network, cloud-firewall | 245 | Standard-Blau |
| security | Pattern (kein radial) | Standard-Blau (Fallback) |
| endpoint-detection-response | 20-30 | rot-orange |
| managed-mobile-device | 165-175 | grün-cyan |
| email-security | 220-240 | kühleres Blau (subtil) |

**Ursache:** Iterationen 12 (email-security), 14 (EDR), 15 (MDM) hatten ohne User-Anweisung service-spezifische Hero-Akzentfarben gewählt. Agent-Eigenmächtigkeit ohne dokumentiertes Pattern.

**Fix (Commit `f59004c`):** 3 Seiten auf Standard-Blau (Hue 245) angeglichen.

**Lesson:**
- **Hero-Background IMMER Hue 245 (Lektion 41):** Service-spezifische Akzentfarben sind nicht erlaubt ohne explizite User-Anweisung. Standard-Pattern dokumentiert.
- **Hero-Farb-Konsistenz-Check (Lektion 42):** Vor jeder Migration `grep -h "radial-gradient.*oklch" app/managed-*/page.tsx` ausführen, alle Hue-Werte vergleichen, bei Abweichung User fragen.

### Iteration 19: Chevron-Kategorie-Labels kräftiger (Commit `928fce7` + Lektion 43)

**Was:** User-Feedback „kannst du da bitte etwas kräftiger von der schrift machen" — die 4 Kategorie-Spalten-Header im Chevron wirkten zu schwach.

**Fix:** `font-semibold` (600) → `font-bold` (700) in beiden Chevron-Komponenten (`ServiceModelArrowsFull.tsx:195` und `ServiceModelArrowsFullNetwork.tsx:200`).

**Auswirkung:** 12 migrierte Seiten + `/externe-it-abteilung` einheitlich kräftiger. Owner-Badge-Stil (bereits `font-bold uppercase`) bleibt unverändert — jetzt konsistent mit Label.

**Lesson (Lektion 43):** Chevron-Kategorie-Labels IMMER `text-xs font-bold` (700), nie `font-semibold`. Pattern für zukünftige Chevron-Komponenten übernehmen.

### Iteration 20: HeaderBar-Schrift kräftiger + dunkler (Commit `e2ef0c2` + Lektion 44)

**Was:** Nach Iteration 19 meldete User „ist immernoch blass" — die 4 Kategorie-Header in der HeaderBar oben (PLATTFORM & LIZENZEN etc.) wirkten noch zu schwach und zu klein.

**Ursache:** Die `ServiceModelArrowsFull`/`Network` Komponenten rendern die Kategorie-Labels an **zwei separaten Stellen**:
- **PhaseCard** (Zeile ~195): `text-xs font-bold` — bereits in Iteration 19 gefixt
- **HeaderBar oben** (Zeile ~248): inline-Styles mit `fontSize: "9px"`, `color: "oklch(0.70 0.02 220)"` (hellgrau 70%), `letterSpacing: "0.07em"` — **war übersehen worden**

**Fix:** HeaderBar-Styles in beiden Komponenten:
- `fontSize: 9px` → `11px` (größer, besser lesbar)
- `color: oklch(0.70 0.02 220)` → `oklch(0.32 0.06 250)` (KPX-Blau, kräftig)
- `letterSpacing: 0.07em` → `0.04em` (dichter, wirkt fett statt verschnörkelt)
- `fontWeight: 700` (bleibt)
- `textTransform: uppercase` (bleibt)

**Lesson (Lektion 44):** Bei Component-Refactorings **ALLE Render-Stellen prüfen**, nicht nur die offensichtliche. HeaderBar hatte separate inline-Styles, die bei Iteration 19 übersehen wurden. Pattern: Wenn ein User-Feedback nach erstem Fix sagt „immernoch das gleiche Problem", liegt es meist an einer zweiten Style-Stelle.

### Iteration 21: Dritte Chevron-Komponente `/it-outsourcing-kmu` (Commit `d69d872` + Lektion 45)

**Was:** User-Feedback: „/it-outsourcing-kmu das ist auch ein anderes chevron mit der selben überschrift die müsste auch so angepasst werden" — eine dritte Chevron-Variante wurde bei Iterations 19+20 übersehen.

**Befund:** Es gibt **drei** Chevron-Komponenten:
- `ServiceModelArrowsFull.tsx` (3-Modelle-Variante, Standard)
- `ServiceModelArrowsFullNetwork.tsx` (Network-Variante)
- `ServiceModelArrows.tsx` (2-Modelle-Variante, **ältere, schmalere Version** — nur von `/it-outsourcing-kmu` verwendet)

`/it-outsourcing-kmu` ist eine **alte Seite**, die nicht auf das 13-Sektionen-Schema migriert wurde. Sie nutzt weiterhin die ältere Chevron-Komponente mit den alten Style-Werten.

**Fix:** Analog zu Iterations 19+20 an zwei Stellen in `ServiceModelArrows.tsx`:
- PhaseCard Zeile 192: `font-semibold` → `font-bold` (700)
- HeaderBar Zeile 246-260: `fontSize: 9px` → `11px`, `color: #94A3B8` → `oklch(0.32 0.06 250)`, `letterSpacing: 0.07em` → `0.04em`

**Lesson (Lektion 45):** Bei Chevron-Schrift-Anpassungen immer **alle drei Komponenten** prüfen (`grep -l "font-semibold\|fontSize: \"9px\"" components/ServiceModelArrows*.tsx`). Pattern-Check ergänzt die Lessons 43+44.

### Iteration 22: „Störungen"-Grid auf 5 kuratierte Services (Commit `58327f2` + Lektion 46)

**Was:** User-Feedback „druchsue alle seiten auf denen diese darstellung git und zeige immer nur 5 managed service an" — das „Störungen"-Grid mit allen 13 Managed Services ist visuell zu dominant.

**Architektur:**
1. `app/data/produkte.ts`: `slug`-Property pro Eintrag (endpoint, server, edr, security, email-security, m365, cloud, private-cloud, backup, network, firewall, cloud-firewall, mobile-device)
2. **15 page.tsx-Dateien**: lokal kuratiertes `featuredProducts` Array (5 Slugs pro Seite) + `produkte.filter((p) => featuredProducts.includes(p.slug ?? "") && p.href !== "/current-url").map(...)`
3. Link „Alle 13 Managed Services entdecken →" zu `/managed-it-services`

**Kuration pro Seite:**
- Startseite, externe-it-abteilung: endpoint, server, security, cloud, backup
- endpoint: server, edr, security, firewall, backup
- server: endpoint, edr, security, cloud, backup
- cloud: server, backup, m365, security, private-cloud
- private-cloud: cloud, server, backup, security, endpoint
- security: edr, firewall, email-security, backup, endpoint
- email-security: security, edr, endpoint, m365, backup
- firewall: security, edr, cloud-firewall, endpoint, backup
- endpoint-detection-response: security, firewall, endpoint, backup, email-security
- cloud-firewall: firewall, security, edr, endpoint, email-security
- network-wireless: server, cloud, security, endpoint, backup
- backup: endpoint, server, cloud, security, edr
- mobile-device: endpoint, security, edr, email-security, firewall
- it-outsourcing-kmu: endpoint, server, cloud, security, backup

**Lesson (Lektion 46):** „Störungen"-Grid mit 5 kuratierten Services pro Seite + Link zur Vollständigen Liste. Self-Link-Filter (Lektion 39) bleibt aktiv. Kuration pro Seite ist individuell — Pattern: lokales featuredProducts-Array mit Slugs.

### Iteration 23: 6 kuratierte Services + Cards zentriert (Commit `4301784` + Lektion 47)

**Was:** User-Feedback „bitte doch auf 6 erweiter schau mal auf das bild un die muessen zentriert sein" — 5 Cards nicht zentriert, sollte auf 6 erweitert werden mit Cards-Zentrierung (Inhalt bleibt links).

**Fix in allen 15 page.tsx-Dateien:**
- Grid: `lg:grid-cols-5/7/8` → `lg:grid-cols-6` (alle einheitlich)
- **Neu:** `justify-items-center` auf Grid-Container (zentriert Cards horizontal in ihren Spalten-Zellen, Inhalt bleibt links)
- Featured-Products: jeweils ein 6. Slug ergänzt (firewall oder m365 je nach Seiten-Domain)

**Lesson (Lektion 47):** Featured-Grid mit 6 kuratierten Services + Cards zentriert. `justify-items-center` ist die saubere CSS-Lösung für „Cards zentriert ohne Inhalt-Zentrierung". Grid bleibt full-width, Cards schmaler als Spalte → Whitespace links/rechts jeder Card.

### Iteration 17: Doppel-Heading + Self-Link-Filter (Commit `34c1146` + Lektionen 38-40)

**Was:** Vercel-URL User-Feedback auf `/managed-it-services/endpoint-detection-response`: NetworkEvolutionChevron doppelt gerendert (Heading + Subheading zweimal sichtbar). Self-Link-Card in Sektion 11 zeigt migrierte Seite selbst.

**Ursache 1 (Doppel-Heading):** Iterations 14 (EDR) + 15 (MDM) hatten im Sektion-4-Wrapper ein zusätzliches `<h2>` + `<p>` über der `<NetworkEvolutionChevron>`. Die Komponente rendert heading + subheading **selbst** (über Props), das äußere Heading war redundant.

**Ursache 2 (Self-Link):** Iterationen 12-15 haben in Sektion 11 (`{produkte.map(...)}`) die migrierte Seite selbst als Card gezeigt, weil `produkte.ts` sie enthält. Pattern war in allen Seiten identisch.

**Fix (Commit `34c1146`):**
- EDR + MDM: äußeres `<h2>` + `<p>` im Sektion-4-Wrapper entfernt
- Alle 4 Seiten: `produkte.filter((p) => p.href !== "/current-url").map(...)` in Sektion 11

**Verifikation:** Erste Anwendung des lokalen Build-Patterns (Lektion 36/40):
- `apt-get install -y nodejs` (einmalig)
- `corepack enable pnpm` (einmalig)
- `./node_modules/.bin/tsc --noEmit` → keine Fehler
- `./node_modules/.bin/next build` → ✓ Compiled in 14.3s, 46/46 Seiten, Exit-Code 0
- Push erst nach lokalem Build

**Lesson:**
- **NetworkEvolutionChevron Heading-Rendering (Lektion 38):** Komponente rendert selbst, Wrapper ohne äußeres Heading.
- **Self-Link-Filterung (Lektion 39):** Konsistenz-Fix für alle Service-Seiten.
- **Lokaler Build ist Pflicht (Lektion 40):** Vercel-Build ist nicht primärer Validierungs-Schritt.

### Iteration 24: Managed VoIP Migration (Commit `6a5f350`)

**Was:** `/managed-it-services/voip` auf das 13-Sektionen-Schema migriert.

**Besonderheiten:**
- **Sektion 4 (Lösung):** plain text h3+ul mit 6 Vorteilen (VoIP-fokussiert: Festnetz, Mobil, Konferenzen, Sicherheit, Integration, Kostenkontrolle).
- **CloudFront-URL Audit:** `kpx-voip-meeting-…webp` → **403** (Iteration 24). Hero ohne Image, Pattern-Color radial-gradient als visueller Ersatz (Lektion 29).

**Lokaler Build:** `tsc --noEmit` + `next build` (46/46 Seiten), Exit-Code 0.

### Iteration 25: Managed Prozesse Migration (Commit `397ca60`)

**Was:** `/managed-prozesse` auf das 13-Sektionen-Schema migriert. Themen-Schwerpunkt: KI-gestützte Prozessautomatisierung für KMU.

**Besonderheiten:**
- **Sektion 4 (Lösung):** plain text h3+ul mit 4 Vorteilen (Prozessanalyse, KI-Automatisierung, Integration in M365, laufende Optimierung).
- **CloudFront-URL Audit:** `kpx-prozesse-swiss-…webp` → **200** (einzige Seite mit erfolgreichem CloudFront-Image in Iterations 24-28).
- Icon-Set: Workflow-bezogen (Workflow, Bot, GitBranch, Settings o. ä.).

**Lokaler Build:** Exit-Code 0.

### Iteration 26: Managed M365-Backup Migration (Commit `aa7d9be`)

**Was:** `/managed-it-services/microsoft-365-backup` auf das 13-Sektionen-Schema migriert.

**Besonderheiten:**
- **Sektion 4 (Lösung):** 4-Workloads-Grid (Exchange Online, SharePoint, OneDrive, Teams) — pattern passt zur Struktur.
- **CloudFront-URL Audit:** `kpx-m365-collaboration-…webp` → **403**. Hero ohne Image.

**Lokaler Build:** Exit-Code 0.

### Iteration 27: Managed Mail-Archiv Migration (Commit `4b48c4d`)

**Was:** `/managed-it-services/mail-archiv` auf das 13-Sektionen-Schema migriert. Compliance-Fokus (FINMA, DSG, Geschäftsverwaltung).

**Besonderheiten:**
- **Sektion 4 (Lösung):** NetworkEvolutionChevron mit 3 Stages — **Lokal / Cloud / Compliance-Vollbetrieb** (eigene Stages, nicht Standard-Schema; Lektion 32).
- **Keine CloudFront-URL** definiert. Hero ohne Image.
- Stages spiegeln Reifegrad der Archivierung: 1) manuelles Speichern lokal, 2) Cloud-Archiv (z. B. M365-Online-Archiv), 3) Vollbetrieb mit WORM + Audit + Compliance-Reports.

**Lokaler Build:** Exit-Code 0 (45/45 Seiten — die einzige Iteration mit reduzierter Seiten-Anzahl, da M365-Backup-Route in dieser Phase noch nicht existierte).

### Iteration 28: Managed M365 Migration (Commit `f020093` + Lektion 48)

**Was:** `/managed-it-services/m365` auf das 13-Sektionen-Schema migriert.

**Besonderheiten:**
- **Sektion 4 (Lösung):** plain text h3+ul mit 5 nummerierten Features (Lizenzoptimierung, Datensicherung, Sicherheitskonfiguration, Nahtlose Integration, Laufende Betreuung).
- **Sektion 9 (Infobalken + Context-Block, neu):** 3-spaltige Erklärungen + Vergleichstabelle Basis/Standard/Premium + Quellen mit echten `<a href>` Links (Microsoft-Doku, EDÖB). Etabliert das **Context-Block-Pattern** für zukünftige Service-Seiten.
- **CloudFront-URL Audit:** `kpx-m365-collaboration-…webp` → **403**. Hero ohne Image.

**Lessons (Lektion 48):** Context-Block Sektion 9 mit Vergleichstabelle + Quellen-Links. Pattern:
```tsx
<section style={{ backgroundColor: "oklch(0.22 0.07 250)" }}>
  <div className="container">
    <div className="max-w-5xl mx-auto py-12">
      {/* Infobalken-Headline */}
      {/* Teil A: 3 Spalten Erklärungen (bg oklch(0.28 0.07 250), border 1px oklch(0.35 0.07 250)) */}
      {/* Teil B: Vergleichstabelle Basis/Standard/Premium mit ✓ / – */}
      {/* Teil C: Quellen mit echten <a href> Links (Hersteller, Behörden) */}
    </div>
  </div>
</section>
```
Vergleichstabellen verwenden `✓` für enthalten, `–` für nicht enthalten. Quellen mit echten `<a href>` Links auf Hersteller-Doku, Schweizer Behörden (EDÖB, BAKOM), Fachverbände.

**Lokaler Build:** `tsc --noEmit` + `next build` (46/46 Seiten in 14.2s), Exit-Code 0.

## 11. Cross-References

| Thema | Datei |
|---|---|
| BG-Rhythmus und Section-Schema | `references/section-rhythm.md` |
| Komponenten-Patterns und Chevron-Implementation | `references/components.md` |
| Tonalitaet und Migrations-Lektionen | `references/tone-voice.md` |
| FAQ-Patterns | `references/faq.md` |
| Feature-Tabellen | `references/feature-table.md` |
| Infobalken-Context-Block-Regeln | `references/infobalken.md` |
| **Build-Verifikation (vor Push)** | `references/build-verification.md` |
| Skill-Index und Overview | `SKILL.md` |

## 12. Quick-Reference-Checklist

Vor Abschluss einer Migration pruefen:

- [ ] **Schritt 0: Lokaler Build** (`pnpm build` / `npx next build`) — Exit-Code 0 **vor** Push. Wenn `node`/`pnpm` nicht verfuegbar: statische Checks (Schritte 1-10 in §7.1) als Fallback.
- [ ] Section-Anzahl im `page.tsx` stimmt mit Skill-Doku (13 oder 14)
- [ ] BG-Rhythmus ohne zwei gleiche BG-Klassen hintereinander
- [ ] Chevron-Komponenten nutzen identische Design-Tokens (np, padding, font)
- [ ] OWNER_STYLES aus `serviceModelData.ts` importiert, nicht dupliziert
- [ ] Mobile Fallback (`StackedStage`) vorhanden und getestet
- [ ] Keine `accentColor`-Props, stattdessen `STAGE_OWNER_MAP`
- [ ] `border-left`-Warnungen auf separaten Flex-Items, nicht auf clipPath-Cells
- [ ] **Icon-Vollstaendigkeit:** Alle Lucide-Icons in `from "lucide-react"`-Imports
- [ ] **Keine `as never`-Workarounds** (Lektion 23)
- [ ] **Stats-Bar 1:1** von Startseite (Lektion 22)
- [ ] **JSON-LD Schema:** BreadcrumbList + FAQPage + Organization @id + Service vorhanden (Lektion 25)
- [ ] **German-Quote-Syntax:** Alle `„..."` mit U+201E + U+201C (kein ASCII-Closing!)
- [ ] **CloudFront-URL-Audit:** `curl -I` fuer alle CloudFront-URLs, 403-Fallback dokumentiert (Lektion 26)
- [ ] **produkte.ts Self-Link:** Service-Seite ist in `app/data/produkte.ts` eingetragen (Lektion 27)
- [ ] **Sektion 4 Single-Track:** Bei fehlenden Reifegrad-Stufen plain text h3+ul statt Chevron (Lektion 28)
- [ ] **Sektion 4 N-stufige Strukturen:** Bei 4+ kategorischen Ebenen Grid-Layout mit Card pro Ebene statt Chevron (Lektion 30)
- [ ] **CloudFront-403-Fallback:** Bei 403-Antwort Hero ohne Image rendern, Pattern-Color statt Bild (Lektion 29)
- [ ] **Externe Quellen-Listen:** Bei 5+ Quellen 2-Spalten-Grid in dunkler Karte (Lektion 31)
- [ ] **NetworkEvolutionChevron Stages seiteneigen:** Stages aus seiteneigenen Inhalten ableiten (EDR: Basis → Analyse → Reaktion), nicht Standard-Schema erzwingen (Lektion 32)
- [ ] **Vergleichstabellen mit Einschraenkungen:** Bei Plattform-Vergleichen (z. B. Android/iOS) qualitative Marker wie 'in Entwicklung', 'eingeschraenkt', 'nur View' statt nur Checkmarks (Lektion 33)
- [ ] **NetworkEvolutionChevron Stage-Type-Schema:** Stages muessen genau `number: 1|2|3`, `title: string`, `bullets: string[]` enthalten. KEIN `id`, `owner`, `headline`. (Lektion 34)
- [ ] **NetworkEvolutionChevron Pflicht-Props:** `heading` und `subheading` muessen immer uebergeben werden (nicht nur `stages`). (Lektion 37)
- [ ] **NetworkEvolutionChevron kein Wrapper-Heading:** KEIN aeusseres `<h2>` + `<p>` im Sektion-4-Wrapper — Komponente rendert selbst. (Lektion 38)
- [ ] **Self-Link-Filter:** `produkte.filter((p) => p.href !== "/current-url")` in Sektion 11. (Lektion 39)
- [ ] **Lokaler Build Pflicht:** `./node_modules/.bin/{tsc,next build}` mit Exit-Code 0 VOR Push. (Lektion 40)
- [ ] **Hero-Hue 245:** Hero-Background IMMER `oklch(0.28 0.10 245)` (Standard-Blau), keine service-spezifischen Akzentfarben. (Lektion 41)
- [ ] **Hero-Konsistenz-Check:** `grep -h "radial-gradient.*oklch" app/managed-*/page.tsx` — alle Hue-Werte muessen identisch sein. (Lektion 42)
- [ ] **Chevron-Kategorie-Labels:** IMMER `text-xs font-bold` (700), nie `font-semibold`. (Lektion 43)
- [ ] **Chevron-HeaderBar prüfen:** Bei Chevron-Anpassungen ALLE Render-Stellen (PhaseCard + HeaderBar) prüfen — HeaderBar hat separate inline-Styles. (Lektion 44)
- [ ] **DREI Chevron-Komponenten prüfen:** `ServiceModelArrowsFull`, `ServiceModelArrowsFullNetwork`, `ServiceModelArrows` (alle drei bei Chevron-Anpassungen). (Lektion 45)
- [ ] **Stoerungen-Grid 5 kuratierte Services:** `produkte.filter((p) => ["slug1", ...].includes(p.slug ?? "") && p.href !== "/current-url")` + Link zu `/managed-it-services`. (Lektion 46)
- [ ] **Grid lg:grid-cols-6 + justify-items-center:** Cards zentriert in Spalten, Inhalt bleibt links. (Lektion 47)
- [ ] **Context-Block Sektion 9 mit Vergleichstabelle + Quellen-Links:** 3-spaltige Erklaerungen + Vergleichstabelle Basis/Standard/Premium (mit ✓/–) + echte <a href> Quellen-Links auf Hersteller-Doku und Schweizer Behoerden. (Lektion 48)
- [ ] **TypeScript-Stage-Property-Check:** Bei jeder Verwendung einer Chevron-Komponente (NetworkEvolutionChevron, ServiceModelArrowsFull etc.) TypeScript-Schema pruefen (Lektion 35)
- [ ] Skill-Mirror nach `opencode-skills` synchron
- [ ] Commit-Message mit korrektem Typ und Scope
- [ ] Author `a.busch <a.busch@kpx-it.ch>` gesetzt
- [ ] Push mit `--force-with-lease`
- [ ] Vercel-Build erfolgreich (manuell durch User verifiziert)
