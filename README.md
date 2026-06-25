# opencode-skills

Zentrale Sammlung von [opencode](https://opencode.ai)-Skills für KPX-Websites und Marketing.

## Skills

| Skill | Beschreibung |
|---|---|
| [skills/kpx-redesign](./skills/kpx-redesign/SKILL.md) | Design-System-Migration für `kpx-itch` (KPX-Website auf Next.js). 15-Sektionen-Rhythmus, oklch-Farbpalette, de-CH-Sprache, JSON-LD `@graph`, 17 Service-Pages zum Migrieren. |
| [skills/kpx-schweiz-marketing](./skills/kpx-schweiz-marketing/SKILL.md) | Marketing-Texte, E-Mails, Offerten für KPX AG (Schweiz). Tonalität, Schweizer Wording-Mapping, KPIs, Vertrauenssignale. |

## Installation

Skills werden in einem opencode-Projekt installiert, indem man den Skill-Ordner in `.opencode/skills/` (Projekt-Scope) oder `~/.config/opencode/skills/` (User-Scope) kopiert oder als Submodul einbindet.

### Variante A: Direkter Clone

```bash
# Projekt-Scope (nur dieses Repo)
git clone https://github.com/Busch80/opencode-skills.git /tmp/opencode-skills
cp -r /tmp/opencode-skills/skills/kpx-redesign /path/to/your-project/.opencode/skills/

# User-Scope (alle deine Projekte)
git clone https://github.com/Busch80/opencode-skills.git /tmp/opencode-skills
cp -r /tmp/opencode-skills/skills/kpx-redesign ~/.config/opencode/skills/
```

Danach opencode neu starten, damit die Skills geladen werden.

### Variante B: Git-Submodul

```bash
# Im Projekt-Wurzelverzeichnis:
mkdir -p .opencode
git submodule add https://github.com/Busch80/opencode-skills.git .opencode/opencode-skills
ln -s ../opencode-skills/skills/kpx-redesign .opencode/skills/kpx-redesign
```

Danach opencode neu starten.

### Variante C: opencode-Config (ab opencode 1.x mit `skills.paths`)

In `opencode.json` (Projekt) oder `~/.config/opencode/opencode.json` (User):

```json
{
  "skills": {
    "paths": [
      "/path/to/opencode-skills/skills/kpx-redesign",
      "/path/to/opencode-skills/skills/kpx-schweiz-marketing"
    ]
  }
}
```

## Verwendung

Nach der Installation werden die Skills automatisch geladen, wenn ihre Trigger-Keywords in deiner Anfrage vorkommen. Du kannst einen Skill auch explizit über den Skill-Picker auswählen.

Beispiel: öffne opencode im `kpx-itch`-Repo und frage *"migriere die Backup-Seite ins neue Design"* — der Skill `kpx-redesign` wird automatisch aktiv.

## Struktur

```
opencode-skills/
├── README.md
└── skills/
    ├── kpx-redesign/
    │   ├── SKILL.md                     # Hauptanweisung
    │   ├── references/                  # Detaildokumente
    │   │   ├── design-tokens.md
    │   │   ├── section-rhythm.md
    │   │   ├── components.md
    │   │   ├── seo-schema.md
    │   │   ├── tone-voice.md
    │   │   └── pages-to-migrate.md
    │   └── templates/                   # Blanko-Vorlagen
    │       ├── managed-service-page.tsx
    │       └── seo-hub-page.tsx
    └── kpx-schweiz-marketing/
        └── SKILL.md
```

## Lizenz & Kontakt

Privater Repo für interne KPX-Arbeiten. Bei Fragen: `a.busch@kpx-it.ch`.
