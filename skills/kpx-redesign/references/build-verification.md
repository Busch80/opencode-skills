# Build-Verifikation für Service-Seiten

Vor jedem Push einer Service-Page (`app/managed-it-services/*/page.tsx` oder `app/managed-network-wireless/page.tsx`) MUSS die Seite lokal verifiziert werden. Auch wenn `node` im Worker-PATH nicht verfügbar ist (was bei `opencode`-Workern der Fall ist), können die meisten TypeScript-Build-Fehler durch statische Checks abgefangen werden.

## Manuelle Checkliste (immer ausführen)

| # | Check | Wie |
|---|---|---|
| 1 | Icon-Vollständigkeit | Python-Script (siehe unten) |
| 2 | Komponenten-Props korrekt | `grep -B 2 -A 5 "ServiceModelArrowsFull$"` — `currentServiceId` darf NICHT dabei sein |
| 3 | Keine `as never`-Workarounds | `grep -n "as never" <file>` muss LEER sein |
| 4 | Section-Anzahl | `grep -cE "^\s*\{/\*.*[0-9]+\."` = 13 (oder 14 bei Network/Private-Cloud) |
| 5 | JSON-LD Schema vollständig | `for entity in BreadcrumbList FAQPage Organization Service; do grep -q "@type.:.*$entity" <file>; done` |
| 6 | Stats-Bar 1:1 | `grep -c "Jahre IT-Praxis"` = 1, `grep -c "Schweizer KMU"` = 1 |
| 7 | BG-Rhythmus | Keine zwei `kpx-section-dark` direkt hintereinander (siehe `section-rhythm.md` §19 für Ausnahme) |

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

| Fehler | Ursache | Fix |
|---|---|---|
| `Cannot find name 'X'` (Lucide-Icon) | Icon in `icon:` oder `<X />` verwendet, aber nicht importiert | Icon zum `from "lucide-react"`-Import hinzufügen |
| `Property 'X' does not exist on type 'ComponentProps'` | Komponente unterstützt Prop nicht | Prop entfernen oder andere Komponente verwenden |
| `Type 'X' is not assignable to type 'Y'` | TypeScript-Mismatch (z. B. falscher Union-Typ) | Korrekten Typ verwenden, `as never`-Workarounds VERMEIDEN |

## Lessons aus Iterations

- **Iteration 6 (Server):** `currentServiceId` auf `<ServiceModelArrowsFull>` → Vercel-Build-Fehler. Fix: Prop entfernt (nur Network-Variante hat es).
- **Iteration 8 (Private-Cloud):** `DollarSign` und `Clock` Icons fehlten in Imports. Fix: Beide ergänzt.
- Beide Fehler wurden durch User-Prompt erkannt, nicht durch lokale Verifikation. Mit dem Python-Script oben lassen sich 90% solcher Fehler vorher abfangen.

## Siehe auch

- `references/tone-voice.md` Lektion 23 (Lokale Build-Verifikation vor Push)
- `references/migrations-playbook.md` §11 Cross-References
