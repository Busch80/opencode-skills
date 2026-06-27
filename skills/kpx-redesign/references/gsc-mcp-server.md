# GSC MCP-Server — Globale Google-Search-Console-Anbindung für alle opencode-Workspaces

> **Zweck:** Globale, einmalige Einrichtung, die in jedem opencode-Workspace (kpx-itch, opencode-skills, kpx-de, kpx-fr, etc.) automatisch verfügbar ist — ohne Token-Setup pro Workspace.

## 1. Architektur

```
~/.config/opencode/
├── secrets/
│   └── gsc-sa.json            # Service-Account-JSON (chmod 600, NICHT in Git)
├── mcp-servers/
│   └── gsc/
│       ├── server.py          # Python MCP-Server (~280 Zeilen)
│       └── requirements.txt   # mcp, google-auth, google-api-python-client
└── opencode.json              # globale MCP-Server-Config
```

**Authentifizierung:** OAuth2 mit Service-Account (KEIN API-Key, KEIN User-OAuth).
**OAuth2-Scope:** `https://www.googleapis.com/auth/webmasters.readonly`
**Service-Account:** `opencode@api-gsc-500706.iam.gserviceaccount.com` mit Owner-Permission für `sc-domain:kpx-it.ch` und `sc-domain:kpx-it.de`.

## 2. Installation

### Schritt 1: Verzeichnisstruktur anlegen

```bash
mkdir -p ~/.config/opencode/mcp-servers/gsc
mkdir -p ~/.config/opencode/secrets
```

### Schritt 2: Service-Account-JSON migrieren

```bash
# Backup des bestehenden SA-JSON
cp /root/kpx-gsc-service-account.json /tmp/gsc-sa.backup.json

# Migration
mv /root/kpx-gsc-service-account.json ~/.config/opencode/secrets/gsc-sa.json
chmod 600 ~/.config/opencode/secrets/gsc-sa.json
chown root:root ~/.config/opencode/secrets/gsc-sa.json

# Verifikation
ls -la ~/.config/opencode/secrets/gsc-sa.json
# Erwartet: -rw------- 1 root root 2352 ... gsc-sa.json

python3 -c "import json; d=json.load(open('$HOME/.config/opencode/secrets/gsc-sa.json')); print(d['client_email'])"
# Erwartet: opencode@api-gsc-500706.iam.gserviceaccount.com
```

### Schritt 3: Python-Pakete installieren

```bash
pip3 install --break-system-packages --ignore-installed mcp google-auth google-api-python-client
```

### Schritt 4: MCP-Server-Code kopieren

Siehe `/root/.config/opencode/mcp-servers/gsc/server.py` (280 Zeilen Python). Der Server nutzt die offizielle `mcp` Python-Library (≥1.0.0) und kommuniziert via stdio mit opencode.

### Schritt 5: opencode.json global registrieren

In `~/.config/opencode/opencode.json` unter `mcp` ergänzen:

```json
{
  "mcp": {
    "gsc": {
      "type": "local",
      "command": ["python3", "/root/.config/opencode/mcp-servers/gsc/server.py"],
      "environment": {
        "GSC_SERVICE_ACCOUNT_FILE": "/root/.config/opencode/secrets/gsc-sa.json"
      },
      "enabled": true
    }
  }
}
```

**Wichtig:** opencode verwendet das Feld **`environment`** (nicht `env` wie viele andere MCP-Implementierungen).

### Schritt 6: Test

```bash
opencode mcp list
# Erwartet: ✓ gsc connected
```

## 3. Tool-Referenz

### Tool 1: `gsc_list_sites`

Listet alle Search-Console-Properties, auf die der Service-Account Zugriff hat.

**Parameter:** keine

**Output:**
```
# GSC Properties

| Site-URL | Permission | Type |
|---|---|---|
| sc-domain:kpx-it.ch | siteFullUser | ? |
| sc-domain:kpx-it.de | siteFullUser | ? |

Total: 2
```

### Tool 2: `gsc_search_analytics`

Performance-Daten abfragen (Impressions, Clicks, CTR, Position).

**Parameter:**

| Name | Typ | Required | Default | Beschreibung |
|---|---|---|---|---|
| `site_url` | string | ✓ | — | Property-URL, z. B. `sc-domain:kpx-it.ch` oder `https://kpx-it.ch/` |
| `start_date` | string (YYYY-MM-DD) | ✓ | — | Start-Datum |
| `end_date` | string (YYYY-MM-DD) | ✓ | — | End-Datum |
| `dimensions` | array | — | `["query"]` | Dimensionen: `query`, `page`, `country`, `device`, `searchAppearance`, `date` |
| `row_limit` | integer | — | 100 | Max Rows (max: 25000) |
| `filters` | array | — | — | dimensionFilterGroups (z. B. Query-Filter) |

**Beispiel:**
```json
{
  "site_url": "sc-domain:kpx-it.ch",
  "start_date": "2026-06-01",
  "end_date": "2026-06-28",
  "dimensions": ["query"],
  "row_limit": 10
}
```

**Output:**
```
# Search Analytics: sc-domain:kpx-it.ch

**Zeitraum:** 2026-06-01–2026-06-28  
**Dimensionen:** query  
**Total Rows:** 10

| Query | Clicks | Impressions | CTR (%) | Position |
|---|---|---|---|---|
| kpx | 3 | 31 | 9.68 | 10.3 |
| it dienstleister zürich | 2 | 292 | 0.68 | 20.6 |
```

### Tool 3: `gsc_query_filter`

Detail-Performance für eine spezifische Query im Zeitverlauf (nach Datum aufgeschlüsselt).

**Parameter:**

| Name | Typ | Required | Beschreibung |
|---|---|---|---|
| `site_url` | string | ✓ | Property-URL |
| `query` | string | ✓ | Suchanfrage, z. B. `it dienstleister zürich` |
| `start_date` | string | ✓ | Start-Datum |
| `end_date` | string | ✓ | End-Datum |

**Beispiel:**
```json
{
  "site_url": "sc-domain:kpx-it.ch",
  "query": "it dienstleister zürich",
  "start_date": "2026-06-01",
  "end_date": "2026-06-28"
}
```

**Output:** Datums-basierte Tabelle mit Clicks/Impressions/CTR/Position pro Tag.

### Tool 4: `gsc_url_inspection`

Prüft eine einzelne URL auf Index-Status, Mobile-Usability und Rich-Results.

**Parameter:**

| Name | Typ | Required | Beschreibung |
|---|---|---|---|
| `site_url` | string | ✓ | Property-URL |
| `url` | string | ✓ | Vollständige URL, z. B. `https://kpx-it.ch/it-dienstleister-zuerich` |

**Output:** Strukturierte Markdown-Liste mit `Verdict`, `Coverage`, `Last Crawl`, `Page Fetch`, `Robots.txt`, `Mobile-Usability`, `Rich-Results`.

### Tool 5: `gsc_sitemaps`

Listet alle eingereichten Sitemaps einer Property.

**Parameter:**

| Name | Typ | Required | Beschreibung |
|---|---|---|---|
| `site_url` | string | ✓ | Property-URL |

**Output:** Tabelle mit Path, Type, Status, Submitted, Downloaded, Warnings, Errors.

## 4. Sicherheits-Hinweise

| Aspekt | Empfehlung |
|---|---|
| Service-Account-JSON | `chmod 600` (nur root lesbar), `chown root:root` |
| Token-Storage | NIE in `token`-Datei, NIE in Git committen |
| Workspace-`.gitignore` | `/root/.config/opencode/secrets/` global ausschließen |
| ENV-Var statt File-Pfad | `GSC_SERVICE_ACCOUNT_FILE` ist sicherer als Hardcoding |
| Rotation | SA-JSON jederzeit ersetzbar, kein Code-Change nötig |
| Logging | Server loggt nach stderr (MCP-Standard) — keine sensiblen Daten loggen |
| OAuth2-Scope | `readonly` — keine schreibenden Operationen möglich |

## 5. Troubleshooting

### Fehler: `MCP error -32000: Connection closed`

**Ursache:** opencode kann den lokalen MCP-Server nicht starten.

**Lösungen:**
1. **ENV-Feld prüfen:** opencode erwartet `environment`, nicht `env`
   ```json
   { "type": "local", "command": [...], "environment": {...} }
   ```
2. **Pfad prüfen:** `ls -la /root/.config/opencode/mcp-servers/gsc/server.py` muss existieren
3. **Manuell testen:**
   ```bash
   GSC_SERVICE_ACCOUNT_FILE=/root/.config/opencode/secrets/gsc-sa.json python3 /root/.config/opencode/mcp-servers/gsc/server.py
   # Sollte sofort beenden ohne Fehler (wartet auf stdin)
   ```
4. **Python-Pakete prüfen:**
   ```bash
   python3 -c "import mcp; from google.oauth2 import service_account; print('OK')"
   ```

### Fehler: `Service-Account nicht gefunden`

**Ursache:** `GSC_SERVICE_ACCOUNT_FILE` zeigt auf falschen Pfad oder Datei existiert nicht.

**Lösung:**
```bash
echo $GSC_SERVICE_ACCOUNT_FILE  # debug
ls -la /root/.config/opencode/secrets/gsc-sa.json  # muss existieren mit -rw-------
```

### Fehler: `403 Forbidden` bei API-Calls

**Ursache:** Service-Account hat keine Owner-Permission für die Property.

**Lösung:**
1. GSC-Oberfläche öffnen → Property → Einstellungen → Nutzer und Berechtigungen
2. `opencode@api-gsc-500706.iam.gserviceaccount.com` als „Owner" hinzufügen
3. Warten ~5 Minuten bis Berechtigung propagiert ist

### Fehler: Property-Format falsch

**Ursache:** Site-URL muss entweder `sc-domain:example.com` (Domain-Property) oder `https://example.com/` (URL-Prefix-Property) sein.

**Lösung:** Mit `gsc_list_sites` das exakte Format prüfen, dann 1:1 übernehmen.

### Fehler: API-Quota überschritten

**Ursache:** GSC erlaubt ~200 Queries/Minute für Search-Analytics.

**Lösung:** Bei großen Datenmengen `row_limit` reduzieren oder mehrere kleinere Queries statt einer großen.

## 6. Erweiterung

### Weitere Google-APIs hinzufügen

Das gleiche Pattern funktioniert für:
- **Google Analytics 4 (GA4):** Service-Account + Scope `analytics.readonly`
- **Google PageSpeed Insights:** API-Key reicht, kein OAuth
- **Google Search Ads:** OAuth2 mit MCC-Account

Für jeden neuen MCP-Server: separater Ordner unter `~/.config/opencode/mcp-servers/<name>/`, separater Eintrag in `opencode.json`.

### Andere Workspace-Lokationen

Falls GSC nur in bestimmten Workspaces verfügbar sein soll (statt global): statt in `~/.config/opencode/opencode.json` in `<workspace>/.opencode/opencode.json` registrieren.

## 7. Backwards-Compatibility

Das bestehende Python-Skript `seo_research.py` (in `kpx-itch/.opencode/skills/kpx-redesign/scripts/`) funktioniert weiterhin und nutzt jetzt den gleichen Service-Account-Pfad (`/root/.config/opencode/secrets/gsc-sa.json`). Beide Systeme (CLI + MCP) sind kompatibel.

## 8. Referenzen

- [opencode MCP-Dokumentation](https://opencode.ai/docs/mcp-servers/)
- [Google Search Console API Reference](https://developers.google.com/webmaster-tools/v1/api_reference_index)
- [google-auth-library Python](https://googleapis.dev/python/google-auth/latest/index.html)
- [MCP Python SDK](https://github.com/modelcontextprotocol/python-sdk)
- Service-Account Setup: `references/seo-research-workflow.md` §Phase 5