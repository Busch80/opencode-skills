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

### 7.1 Statische Verifikation (Agent-Aufgabe)

```bash
# 1. Import-Check
grep -n "import.*ComponentName" /path/to/page.tsx

# 2. Section-Anzahl (sollte 13 oder 14 sein)
grep -nE "^      \{/\* \u2500\u2500 [0-9]+[a-z]?\." /path/to/page.tsx | wc -l

# 3. BG-Rhythmus-Verifikation
grep -nE "(bg-white|kpx-section-(light|dark)|oklch\(0\.97|oklch\(0\.22)" /path/to/page.tsx

# 4. Skill-Mirror-Sync
diff -q /kpxitch/.opencode/skills/kpx-redesign/references/X.md /opencode-skills/skills/kpx-redesign/references/X.md

# 5. Token-Reduktion (keine verwaisten Code-Bloecke)
grep -c "export const" /path/to/serviceModelData.ts
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

### Was gut funktioniert hat
- Schrittweise Iterationen mit klaren User-Freigaben
- Plan-Mode mit Frage-Tool fuer Design-Entscheidungen
- Statische Verifikation als Agent-Aufgabe, visuelle Verifikation als User-Aufgabe
- Skill-Updates nach jeder strukturellen Aenderung
- Mirror-Sync direkt nach jedem kpx-itch-Skill-Update

### Was nicht gut funktioniert hat
- Erste Iteration mit Custom-SVG-Timeline war visuelle Opulenz, die User nicht brauchte
- Erste Chevron-Iteration (rot/gelb/cyan) brach die Design-Konsistenz mit Sektion 8
- Visuelle Verifikation erst sehr spaet moeglich, weil Vercel-Token fehlt

## 11. Cross-References

| Thema | Datei |
|---|---|
| BG-Rhythmus und Section-Schema | `references/section-rhythm.md` |
| Komponenten-Patterns und Chevron-Implementation | `references/components.md` |
| Tonalitaet und Migrations-Lektionen | `references/tone-voice.md` |
| FAQ-Patterns | `references/faq.md` |
| Feature-Tabellen | `references/feature-table.md` |
| Infobalken-Context-Block-Regeln | `references/infobalken.md` |
| Skill-Index und Overview | `SKILL.md` |

## 12. Quick-Reference-Checklist

Vor Abschluss einer Migration pruefen:

- [ ] Section-Anzahl im `page.tsx` stimmt mit Skill-Doku (13 oder 14)
- [ ] BG-Rhythmus ohne zwei gleiche BG-Klassen hintereinander
- [ ] Chevron-Komponenten nutzen identische Design-Tokens (np, padding, font)
- [ ] OWNER_STYLES aus `serviceModelData.ts` importiert, nicht dupliziert
- [ ] Mobile Fallback (`StackedStage`) vorhanden und getestet
- [ ] Keine `accentColor`-Props, stattdessen `STAGE_OWNER_MAP`
- [ ] `border-left`-Warnungen auf separaten Flex-Items, nicht auf clipPath-Cells
- [ ] Skill-Mirror nach `opencode-skills` synchron
- [ ] Commit-Message mit korrektem Typ und Scope
- [ ] Author `a.busch <a.busch@kpx-it.ch>` gesetzt
- [ ] Push mit `--force-with-lease`
- [ ] Vercel-Build erfolgreich (manuell durch User verifiziert)
