# Build-Verifikation für Service-Seiten und Lokale Service-Landing-Pages

Vor jedem Push einer Service-Page (`app/managed-it-services/*/page.tsx`, `app/managed-network-wireless/page.tsx`) oder einer Lokalen Service-Landing-Page (`app/it-*/page.tsx`, `app/microsoft-365-kmu/page.tsx`) MUSS die Seite lokal verifiziert werden. Auch wenn `node` im Worker-PATH nicht verfügbar ist (was bei `opencode`-Workern der Fall ist), können die meisten TypeScript-Build-Fehler durch statische Checks abgefangen werden.

## Schritt 0: Lokaler Build-Versuch (vor allen anderen Checks)

**Vor** jedem Push muss ein **echter lokaler Build-Versuch** gestartet werden. Wenn `node`/`pnpm` im Worker-PATH verfügbar ist:

```bash
# Im Repo-Root (z. B. /root/opencode/workspace/kpxitch/experimental/)
pnpm install && pnpm build
# oder direkt:
npx next build
```

**Exit-Code prüfen.** Nur bei Exit-Code 0 darf der Push erfolgen:

```bash
if [ $? -ne 0 ]; then
  echo "Build failed — fix errors before pushing"
  exit 1
fi
```

**Wenn `node`/`pnpm` NICHT verfügbar ist** (typisch für `opencode`-Worker): Fallback auf die statischen Checks in Schritten 1-7 unten. Statische Checks finden 90% der Fehler — aber nicht alle (z. B. Unicode-Escape-Probleme, JSX-Parse-Errors). **Wenn möglich, versuche einen echten Build zuerst.**

Quelle für diese Regel: User-Feedback nach Vercel-Build-Fehler bei Commit `fa851ca` (German-Quotes-Syntax-Bug). Statische Verifikation hat den Fehler zwar erkannt, aber der Push erfolgte bereits. **Nicht wiederholen.**

## Manuelle Checkliste (immer ausführen — auch nach erfolgreichem Schritt 0)

| # | Check | Wie |
|---|---|---|
| 1 | Icon-Vollständigkeit | Python-Script (siehe unten) |
| 2 | Komponenten-Props korrekt | `grep -B 2 -A 5 "ServiceModelArrowsFull$"` — `currentServiceId` darf NICHT dabei sein |
| 3 | Keine `as never`-Workarounds | `grep -n "as never" <file>` muss LEER sein |
| 4 | German-Quote-Syntax (NEU ab Iteration 10) | Python-Script unten — findet `„..."` Pattern mit ASCII-Closing statt German-Closing |
| 5 | Section-Anzahl | `grep -cE "^\s*\{/\*.*[0-9]+\."` = 13 (oder 14 bei Network/Private-Cloud) |
| 6 | JSON-LD Schema vollständig | `for entity in BreadcrumbList FAQPage Organization Service; do grep -q "@type.:.*$entity" <file>; done` |
| 7 | Stats-Bar 1:1 | `grep -c "Jahre IT-Praxis"` = 1, `grep -c "Schweizer KMU"` = 1 |
| 8 | BG-Rhythmus | Keine zwei `kpx-section-dark` direkt hintereinander (siehe `section-rhythm.md` §19 für Ausnahme) |
| 9 | **Umlaut-Regel (de-CH, NEU ab Iteration 31)** | `grep -nP 'ß' app/<slug>/page.tsx` muss LEER sein (kein `ß`, immer `ss`). `grep -c '[äöüÄÖÜéèà]' app/<slug>/page.tsx` muss > 0 sein (echte Umlaute statt ASCII-Ersatz). ASCII nur in Skill-Kommentaren, nicht in JSX/Skill-Beispielen. |

## Python-Script: Icon-Vollständigkeit prüfen

Speichere als `scripts/check-icons.py` oder führe inline aus:

```python
import re

def check_page(file_path, name):
    print(f"=== {name} ===")
    with open(file_path) as f:
        content = f.read()

    # Lucide-Import parsen
    import_match = re.search(r'import\s*\{([^}]+)\}\s*from\s*["\']lucide-react["\']', content)
    if not import_match:
        print("  ⚠ Kein lucide-react Import")
        return
    imported = set(re.findall(r'\b([A-Z][a-zA-Z0-9]+)\b', import_match.group(1)))

    # icon: Properties
    icon_uses = set(re.findall(r'icon:\s*([A-Z][a-zA-Z0-9]+)', content))

    # <IconClass /> direkte Verwendungen (Variable "Icon" ausschließen)
    icon_component_uses = set(
        m.group(1) for m in re.finditer(r'<([A-Z][a-zA-Z0-9]+)\s+className=', content)
        if m.group(1) != 'Icon'
    )

    needed = icon_uses | icon_component_uses
    missing = needed - imported

    if missing:
        print(f"  ✗ FEHLEND: {', '.join(sorted(missing))}")
    else:
        print(f"  ✓ Alle {len(needed)} Icons importiert")


# Aufruf für mehrere Seiten
for path, name in [
    ('/root/opencode/workspace/kpxitch/experimental/app/managed-it-services/server/page.tsx', 'server'),
    ('/root/opencode/workspace/kpxitch/experimental/app/managed-it-services/cloud/page.tsx', 'cloud'),
    ('/root/opencode/workspace/kpxitch/experimental/app/managed-it-services/private-cloud/page.tsx', 'private-cloud'),
    ('/root/opencode/workspace/kpxitch/experimental/app/managed-network-wireless/page.tsx', 'network'),
]:
    check_page(path, name)
    print()
```

## Bash-Einzeiler (schnelle Variante)

```bash
python3 -c "
import re, sys
file = '$1'
with open(file) as f: c = f.read()
imp_match = re.search(r'import\s*\{([^}]+)\}\s*from\s*[\"\'']lucide-react[\"\'']', c)
imp = set(re.findall(r'\b([A-Z][a-zA-Z0-9]+)\b', imp_match.group(1)))
uses = set(re.findall(r'icon:\s*([A-Z][a-zA-Z0-9]+)', c))
uses |= set(m.group(1) for m in re.finditer(r'<([A-Z][a-zA-Z0-9]+)\s+className=', c) if m.group(1) != 'Icon')
miss = uses - imp
print(f'{\"✓ Alle \" + str(len(uses)) + \" Icons\" if not miss else \"✗ FEHLEND: \" + \", \".join(sorted(miss))}')
"
```

## Häufige Build-Fehler & Fixes

| Fehler | Ursache | Fix | Durch Schritt 0 (lokaler Build) erkennbar? |
|---|---|---|---|
| `Cannot find name 'X'` (Lucide-Icon) | Icon in `icon:` oder `<X />` verwendet, aber nicht importiert | Icon zum `from "lucide-react"`-Import hinzufügen | ✓ Ja |
| `Property 'X' does not exist on type 'ComponentProps'` | Komponente unterstützt Prop nicht | Prop entfernen oder andere Komponente verwenden | ✓ Ja |
| `Type 'X' is not assignable to type 'Y'` | TypeScript-Mismatch (z. B. falscher Union-Typ) | Korrekten Typ verwenden, `as never`-Workarounds VERMEIDEN | ✓ Ja |
| `Expected ',', got 'ident'` (Turbopack-Parse-Fehler) | ASCII `"` (U+0022) schliesst JS-String vorzeitig, weil davor ein deutsches `„` (U+201E) als inneres Anführungszeichen steht. Beispiel: `"...„Begriff" mehr Text"` → ASCII `"` terminiert String, `mehr Text` ist außerhalb. | **Beide inneren Quotes als Deutsche verwenden:** `„...\"` mit U+201E + U+201C. Python-Skript zur Validierung siehe unten. | ✓ Ja |

**Alle 4 dokumentierten Fehlertypen werden durch Schritt 0 (lokaler Build) zuverlässig erkannt.** Statische Checks (Schritte 1-8) sind nur ein Fallback, wenn kein `node` verfügbar ist.

## Lessons aus Iterations

- **Iteration 6 (Server):** `currentServiceId` auf `<ServiceModelArrowsFull>` → Vercel-Build-Fehler. Fix: Prop entfernt (nur Network-Variante hat es).
- **Iteration 8 (Private-Cloud):** `DollarSign` und `Clock` Icons fehlten in Imports. Fix: Beide ergänzt.
- **Iteration 10 (Firewall + Cloud-Firewall):** `„..."` mit ASCII-Closing statt German-Closing → Turbopack-Parse-Fehler `Expected ',', got 'ident'`. Fix: Beide inneren Quotes als Deutsche (U+201E + U+201C).
- **Iteration 11 (Firewall Fix):** Lesson aus User-Feedback — `pnpm build` MUSS vor jedem Push laufen, nicht nur statische Checks. Statische Checks erkennen 90%, aber nicht alle Fehler. Ein lokaler Build garantiert 100%.

## German-Quote-Syntax-Validierung (Python)

```python
import re

file_path = '/path/to/page.tsx'
with open(file_path) as f:
    content = f.read()

issues = []
for i, line in enumerate(content.split('\n'), 1):
    op_pos = line.find('\u201E')  # German opening „
    if op_pos >= 0:
        # Find next ASCII " (potential premature string-closer)
        ascii_close = line.find('"', op_pos + 1)
        # Find next German closing " (U+201C)
        german_close = line.find('\u201C', op_pos + 1)
        # If ASCII " comes BEFORE German close (or no German close), it's a syntax bug
        if ascii_close > 0 and (german_close == -1 or ascii_close < german_close):
            issues.append((i, line.strip()[:100]))

if issues:
    for line_no, snippet in issues:
        print(f"  Line {line_no}: {snippet}")
else:
    print("  ✓ alle German-quotes korrekt gepaart")
```

## Siehe auch

- `references/tone-voice.md` Lektion 23 (Lokale Build-Verifikation vor Push), Lektion 54 (SEO-Research-Workflow)
- `references/migrations-playbook.md` §11 Cross-References

## Umlaut-Regel (de-CH) — statischer Pre-Commit-Check

Vor jedem Commit einer Service-Page oder Lokalen Service-Landing-Page prüfen:

```bash
# 1. Kein ß (immer ss statt ß)
grep -nP 'ß' app/<slug>/page.tsx
# Erwartet: LEER. Wenn Treffer: ersetzen mit ss.

# 2. Echte Umlaute vorhanden (nicht versehentlich ASCII-Ersatz verwendet)
grep -c '[äöüÄÖÜéèà]' app/<slug>/page.tsx
# Erwartet: > 0. Wenn 0: Umlaute sind versehentlich als ae/oe/ue geschrieben.

# 3. Optional: ASCII-Kommentare (Skill-Texte) prüfen — erlaubt
grep -c '[äöüÄÖÜéèà]' .opencode/skills/kpx-redesign/references/*.md
# Erwartet: > 0 in Skill-Beispielen, aber ASCII in Code-Kommentaren OK.
```

**Regeln:**
- **Im JSX/Skill-Beispielen:** Echte Umlaute (ä, ö, ü, Ä, Ö, Ü, é, è, à) statt ASCII-Ersatz (ae, oe, ue).
- **Immer `ss`** statt `ß` (de-CH Standarddeutsch).
- **In Code-Kommentaren:** ASCII erlaubt (für Lesbarkeit).
- **In Commit-Messages:** ASCII erlaubt.

**Quelle:** User-Anforderung „umlaute bitte richtig ausschreiben verwende Ü Ö Ä anstatt ae oe und ue" (Session vor Iteration 31). Konsistent mit beiden Skills:
- `kpx-redesign` Lektion 10 (Umlaute statt ae/oe/ue in JSX)
- `kpx-schweiz-marketing` (Beispiel: „Übertriebenes Eigenlob" mit echtem Ü)
- `kpx-redesign` Lektion 2 (`ß` immer durch `ss` ersetzen)
