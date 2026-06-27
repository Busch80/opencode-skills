# SEO-Research-Workflow (DataForSEO + GSC)

Vollständige Anleitung für SEO-Recherche VOR und Performance-Monitoring NACH jeder Lokale Service-Landing-Page-Migration. Pattern aus Iteration 31 (`/it-dienstleister-zuerich`).

## 1. Überblick

**Warum SEO-Research VOR der Migration:**
- Title, H1, Pain-Points und FAQs müssen zu Suchvolumen + Suchintention passen — nicht „best-guess"
- DataForSEO liefert Schätzungen (140/Monat für „it dienstleister zürich"), GSC liefert Realität (292 Impressions = +109%)
- 7–9 zusätzliche API-Calls pro Migration, sparen aber Nachjustierungen

**Workflow-Übersicht:**

```
Phase 1: SEO-Research VOR der Migration (DataForSEO)
  ├─ 1.1 Hauptkeyword + 5 Varianten (keyword_overview)
  ├─ 1.2 Suchintention (search_intent)
  ├─ 1.3 Long-Tail-Cluster (keyword_ideas)
  ├─ 1.4 Verwandte Keywords (related_keywords)
  ├─ 1.5 Keyword-Difficulty (bulk_keyword_difficulty)
  ├─ 1.6 Wettbewerber-SERP (serp_competitors + serp_organic_live_advanced)
  └─ 1.7 Ergebnisse in app/<slug>/seo-research.md dokumentieren

Phase 2: Code-Migration (mit Daten aus Phase 1)

Phase 3: GSC-Performance 3–4 Wochen NACH Migration
  ├─ 3.1 SearchAnalytics via Service-Account
  ├─ 3.2 Top-Queries, CTR, Position analysieren
  ├─ 3.3 Vergleich DataForSEO-Schätzung vs. GSC-Realität
  ├─ 3.4 Nachjustierungen identifizieren
  └─ 3.5 Ergebnisse in app/<slug>/seo-research.md ergänzen
```

## 2. Phase 1: DataForSEO-Recherche (VOR Migration)

### 2.1 Hauptkeyword + Varianten (keyword_overview)

**Was:** Suchvolumen, Difficulty, CPC, Competition, Suchintention für Hauptkeyword + 3–5 Wortvarianten.

**Tool:** `dataforseo_dataforseo_labs_google_keyword_overview`

**Input-Beispiel:**
```json
{
  "location_name": "Switzerland",
  "language_code": "de",
  "keywords": [
    "it dienstleister zürich",
    "IT-Dienstleister Zürich",
    "IT Dienstleister Zürich",
    "it dienstleister in zürich",
    "zürcher it dienstleister"
  ]
}
```

**Output-Felder die wir nutzen:**
- `keyword_info.search_volume` — monatliches Suchvolumen
- `keyword_info.competition_level` — LOW/MEDIUM/HIGH
- `keyword_info.cpc` — Cost-per-Click in CHF (zeigt kommerzielles Potenzial)
- `keyword_properties.keyword_difficulty` — 0–100 (Schwierigkeit)
- `search_intent_info.main_intent` — commercial/informational/transactional/navigational

**Erfahrungswert aus Iteration 31:**
- Hauptkeyword „it dienstleister zürich": 140/Monat, Difficulty 1, MEDIUM, CPC 21.77 CHF, 75.4% commercial
- Wortvarianten (z. B. „IT-Dienstleister Zürich"): identische Daten (Synonym-Clustering)
- **Wichtig:** DataForSEO gruppiert Synonyme. Alle Wortvarianten mit/ohne Bindestrich liefern oft identische Zahlen.

### 2.2 Suchintention (search_intent)

**Was:** Bestätigung der Suchintention + Sekundär-Intents für Hauptkeyword + Long-Tails.

**Tool:** `dataforseo_dataforseo_labs_search_intent`

**Input-Beispiel:**
```json
{
  "language_code": "de",
  "keywords": [
    "it dienstleister zürich",
    "it dienstleister zürich kmu",
    "it dienstleister zürich kleinunternehmen",
    "was kostet it dienstleister zürich",
    "it dienstleister zürich vergleich"
  ]
}
```

**Output-Felder:**
- `keyword_intent.label` — commercial / informational / transactional / navigational
- `keyword_intent.probability` — 0.0–1.0
- `secondary_keyword_intents[]` — alternative Intents

**Erfahrungswert aus Iteration 31:**
- Hauptkeyword: 75.4% commercial → Conversion-orientierte Seite passt
- „kleinunternehmen": 89.2% commercial → starke Validierung für KMU-Pain-Points
- „vergleich": 85.7% commercial → validiert Vergleichs-Sektion
- „was kostet": 64.8% commercial + 35.2% informational → FAQ-Frage

### 2.3 Long-Tail-Cluster (keyword_ideas)

**Was:** 5–10 Long-Tail-Varianten basierend auf Hauptkeyword-Seed.

**Tool:** `dataforseo_dataforseo_labs_google_keyword_ideas`

**Input-Beispiel:**
```json
{
  "location_name": "Switzerland",
  "language_code": "de",
  "limit": 30,
  "order_by": ["keyword_info.search_volume,desc"],
  "keywords": ["it dienstleister zürich"]
}
```

**Output-Filter:** Filtert nach Suchvolumen (z. B. 10–1000), um nur relevante Long-Tails zu erhalten.

**Erfahrungswert aus Iteration 31:**
- `keyword_ideas` liefert zunächst **breite** Ergebnisse (Wetter, Flughafen etc.) — diese müssen manuell nach Themenrelevanz gefiltert werden
- Empfehlung: Long-Tails per Hand auswählen, die thematisch passen (z. B. „it dienstleister wallisellen", „it support für kmu")
- Bessere Alternative: `related_keywords` für thematisch fokussierte Vorschläge

### 2.4 Verwandte Keywords (related_keywords)

**Was:** Thematisch fokussierte Keyword-Cluster basierend auf Hauptkeyword.

**Tool:** `dataforseo_dataforseo_labs_google_related_keywords`

**Input-Beispiel:**
```json
{
  "keyword": "it dienstleister zürich",
  "location_name": "Switzerland",
  "language_code": "de",
  "limit": 15,
  "order_by": ["keyword_data.keyword_info.search_volume,desc"]
}
```

**Output:** Themen-Cluster mit `keyword_data.keyword_info.search_volume` und `depth` (Verschachtelungstiefe).

**Erfahrungswert aus Iteration 31:**
- `related_keywords` liefert **thematisch relevante** Long-Tails (z. B. „it dienstleister schweiz", „it partner zürich", „it-support für kmu")
- Tiefe 1 = direkt verwandt, Tiefe 2 = weiter verwandt
- **Best Practice:** Depth 1 Keywords für FAQ-Themen, Depth 2 für Blog-Posts

### 2.5 Keyword-Difficulty (bulk_keyword_difficulty)

**Was:** Schwierigkeits-Score (0–100) für mehrere Keywords auf einmal.

**Tool:** `dataforseo_dataforseo_labs_bulk_keyword_difficulty`

**Input-Beispiel:**
```json
{
  "location_name": "Switzerland",
  "language_code": "de",
  "keywords": [
    "it dienstleister zürich",
    "IT-Dienstleister Zürich",
    "it dienstleister kmu zürich",
    "it dienstleister schweiz"
  ]
}
```

**Output-Felder:**
- `keyword_difficulty` — 0–100 (0 = sehr leicht, 100 = extrem schwer)

**Erfahrungswert aus Iteration 31:**
- Hauptkeyword „it dienstleister zürich": Difficulty 1 (extrem niedrig)
- „IT-Dienstleister Zürich" (mit Bindestrich): Difficulty 5
- „it dienstleister schweiz" (national statt regional): Difficulty 26
- „it dienstleister kmu zürich": keine Daten (zu spezifisch oder kein Volumen)

**Interpretation:**
- 0–10: Sehr niedrig, neue Seite kann schnell ranken
- 10–30: Niedrig, mit guter On-Page-SEO erreichbar
- 30–50: Mittel, etablierte Seite + Backlinks nötig
- 50–70: Hoch, viel Authority + Content nötig
- 70+: Extrem hoch, etablierte Wettbewerber dominieren

### 2.6 Wettbewerber-SERP (serp_organic_live_advanced)

**Was:** Top 10 organische Ergebnisse + Local Pack + People Also Search für Hauptkeyword.

**Tool:** `dataforseo_serp_organic_live_advanced`

**Input-Beispiel:**
```json
{
  "search_engine": "google",
  "location_name": "Switzerland",
  "depth": 10,
  "language_code": "de",
  "keyword": "it dienstleister zürich"
}
```

**Output-Felder:**
- `type`: organic / local_pack / people_also_search / related_searches
- `domain`: Wettbewerber-Domain
- `title`: SERP-Titel des Wettbewerbers
- `url`: Wettbewerber-URL
- `description`: Meta-Description
- `rank_absolute`: Position

**Erfahrungswert aus Iteration 31:**
- **Local Pack dominiert** die Top 3 (kmuit.com, cyclone.ch, it4ex.ch) — Google My Business ist kritisch
- care4it.ch ist 2x in den Top 13 (Rang 4 + 12) — stärkster organischer Wettbewerber
- mtf.ch (Rang 5) — grösster Mitbewerber mit eigenem Datacenter
- **Local-Backlinks** in Zürich wichtig (Branchenverzeichnisse, KMU-Portale)

### 2.7 Dokumentation in `app/<slug>/seo-research.md`

**Struktur:**
1. Header mit Recherche-Datum und Datenquellen
2. Hauptkeyword-Tabelle (Suchvolumen, Difficulty, CPC, Competition, Intent)
3. Suchintention-Analyse
4. Long-Tail-Cluster
5. Wettbewerber-SERP (Top 10 + Local Pack + People Also Search)
6. Wettbewerber-Analyse (Domain-Authority, Stärken, Schwächen)
7. Empfehlungen (Title, Description, H1, Pain-Points, FAQs, Sub-Services)
8. Schema.org-Hinweise
9. **Phase-2 (GSC):** Nach 3–4 Wochen ergänzen mit Top-Performance-Queries, CTR, Position

## 3. Phase 2: Code-Migration

**Nach SEO-Research, aber vor Push:**
- Title/Description/H1 an Suchvolumen + Intent anpassen
- Pain-Points mit Long-Tail-Keywords abgleichen (z. B. „hohe Notfallkosten" + „was kostet")
- FAQ-Fragen an `related_keywords` ausrichten
- Schema.org LocalBusiness mit korrektem Geo + areaServed

## 4. Phase 3: GSC-Performance (3–4 Wochen nach Migration)

### 4.1 Service-Account-Setup (EINMALIG pro Repo)

**Was:** OAuth2 Service-Account in GCP erstellen + in GSC als Owner hinzufügen.

**Schritte (User-Aktion erforderlich):**
1. **Google Cloud Console** (https://console.cloud.google.com/)
2. Projekt auswählen (z. B. `api-gsc-500706`)
3. **IAM & Admin → Service Accounts** → „Create Service Account"
4. Name: `opencode-gsc-reader` (oder ähnlich)
5. Rolle: `roles/webmasters.readonly` (oder minimal-berechtigte Custom-Role)
6. Schlüssel erstellen → **JSON herunterladen**
7. Datei ablegen unter `/root/kpx-gsc-service-account.json` (NICHT im `token`-File)
8. **Google Search Console** (https://search.google.com/search-console)
9. Property `kpx-it.ch` auswählen (oder hinzufügen falls nicht vorhanden)
10. **Einstellungen → Nutzer und Berechtigungen**
11. Service-Account-Email (z. B. `opencode-gsc-reader@api-gsc-500706.iam.gserviceaccount.com`) hinzufügen als **„Owner"**
12. ~5–10 Min warten (Google-Propagation)

**Sicherheits-Hinweis:** Datei sollte `chmod 600` Permissions haben (nur root lesbar).

### 4.2 GSC-API-Test (READ-ONLY Python-Snippet)

**Test 1: Auth + Sites auflisten:**
```python
import json, time, urllib.request, urllib.error, urllib.parse
import jwt

SERVICE_ACCOUNT_FILE = "/root/kpx-gsc-service-account.json"
SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]

with open(SERVICE_ACCOUNT_FILE) as f:
    sa = json.load(f)

now = int(time.time())
payload = {
    "iss": sa["client_email"],
    "scope": " ".join(SCOPES),
    "aud": sa["token_uri"],
    "iat": now,
    "exp": now + 3600,
}
assertion = jwt.encode(payload, sa["private_key"], algorithm="RS256", headers={"kid": sa["private_key_id"]})
data = urllib.parse.urlencode({
    "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
    "assertion": assertion,
}).encode()
req = urllib.request.Request(sa["token_uri"], data=data)
with urllib.request.urlopen(req) as resp:
    token = json.loads(resp.read())["access_token"]

# Sites auflisten
req = urllib.request.Request(
    "https://www.googleapis.com/webmasters/v3/sites",
    headers={"Authorization": f"Bearer {token}"}
)
with urllib.request.urlopen(req) as resp:
    sites = json.loads(resp.read())
print(f"Verfügbare Properties: {[s['siteUrl'] for s in sites.get('siteEntry', [])]}")
```

**Test 2: SearchAnalytics (Top 20 Queries):**
```python
test_body = json.dumps({
    "startDate": "2026-06-01",
    "endDate": "2026-06-27",
    "dimensions": ["query"],
    "rowLimit": 20
}).encode()
req = urllib.request.Request(
    "https://www.googleapis.com/webmasters/v3/sites/sc-domain%3Akpx-it.ch/searchAnalytics/query",
    data=test_body,
    headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"},
    method="POST"
)
with urllib.request.urlopen(req) as resp:
    data = json.loads(resp.read())
for row in data.get("rows", []):
    print(f"{row['keys'][0]}: {row['clicks']} clicks, {row['impressions']} impr, CTR {row['ctr']*100:.1f}%, pos {row['position']:.1f}")
```

### 4.3 Wichtige API-Fallen

| Falle | Lösung |
|---|---|
| **Property-Format falsch** | IMMER `sc-domain:kpx-it.ch` URL-encoded als `sc-domain%3Akpx-it.ch`. NICHT `kpx-it.ch` oder `https://kpx-it.ch/`. |
| **API-Key statt OAuth2** | GSC akzeptiert KEINE API-Keys. Nur OAuth2 oder Service-Account. |
| **URL-Property vs Domain-Property** | GSC hat 2 Property-Typen. Service-Account muss explizit für die richtige Property berechtigt werden (siehe Schritt 11). |
| **Rate-Limits** | 1.200 Abfragen/Minute, 30.000/Tag. Für unsere Zwecke ausreichend. |
| **Daten-Verfügerbarkeit** | GSC hat 2–3 Tage Verzögerung. Daten von „heute" erst in 2–3 Tagen verfügbar. |
| **Berechtigungs-403 trotz Owner-Setup** | Falls 403 zurückkommt: Property-Format prüfen (siehe oben) oder 5–10 Min warten für Google-Propagation. |

### 4.4 Auswertung pro Migration

**Top-Performance-Queries extrahieren:**
```python
# Sortiere nach Clicks desc
sorted_rows = sorted(data.get("rows", []), key=lambda r: r["clicks"], reverse=True)

# Oder nach Impressions desc (für SEO-Traffic-Potenzial)
sorted_rows = sorted(data.get("rows", []), key=lambda r: r["impressions"], reverse=True)
```

**CTR-Analyse:**
- CTR > 5%: Exzellent (Title + Description passen sehr gut)
- CTR 1–5%: Branchen-Durchschnitt (für Top 10 Positionen)
- CTR < 1%: Verbesserungswürdig (Title/Description emotionaler machen)

**Position-Analyse:**
- Position 1–3: Top-Ergebnis. Brand-Suche oder sehr spezifische Queries.
- Position 4–10: Top 10. Optimale Zone für CTR.
- Position 11–20: Seite 2. CTR fällt drastisch.
- Position 20+: Optimierung dringend nötig.

### 4.5 Erfahrungswerte aus Iteration 31

**Top-Performance-Queries (`/it-dienstleister-zuerich`, Juni 2026, 27 Tage):**

| Query | Clicks | Impressions | CTR | Position |
|---|---|---|---|---|
| kpx | 3 | 31 | 9.7% | 10.3 |
| **it dienstleister zürich** | **2** | **292** | **0.68%** | **20.6** |
| microsoft 365 sicherheit kmu | 2 | 135 | 1.5% | 5.9 |
| datensicherung für kmu | 1 | 108 | 0.93% | 12.2 |
| it firmen zürich | 1 | 56 | 1.8% | 28.7 |
| kpx ag (Brand) | 1 | 3 | 33.3% | 1.0 |

**Wichtigste Erkenntnisse:**

1. **DataForSEO-Schätzung (140/Monat) unterschätzt Realität** — GSC zeigt 292 Impressions (+109%). Realität ist oft doppelt so hoch wie DataForSEO.

2. **CTR 0.68% für Hauptkeyword bei Position 20.6** ist normal, aber Position-Verbesserung würde Clicks um Faktor 3–5 steigern.

3. **Long-Tail-Queries mit Klicks** zeigen echtes Suchinteresse, das in DataForSEO unsichtbar war:
   - „datensicherung für kmu" → 108 Impressions → Backup-Landingpage empfohlen
   - „it firmen zürich" → 56 Impressions → `/it-firmen-zuerich` Migration priorisieren

4. **Brand-Suche funktioniert** — „kpx ag" auf Position 1 mit 33% CTR.

### 4.6 Typische Nachjustierungen basierend auf GSC-Daten

| GSC-Erkenntnis | Nachjustierung |
|---|---|
| CTR < 1% für Top-10-Position | Title/Description-Iteration: emotionaler, spezifischere Zahlen |
| Position > 20 für Hauptkeyword | Mehr interne/externe Verlinkung, Content-Update |
| Unerwartete Long-Tail-Queries mit Klicks | FAQ-Frage hinzufügen |
| CTR > 5% für Top-3-Position | Erfolgreich — Title/Description beibehalten |
| Impression > 100 mit 0 Clicks | Meta-Description testen (Snippet-Attraktivität) |

## 5. Kosten und Rate-Limits

| Service | Kosten | Rate-Limit |
|---|---|---|
| **DataForSEO** | $0.0006 pro Keyword (sehr günstig) | 2.000 Keywords/Minute |
| **DataForSEO SERP** | $0.0015 pro SERP | 200 SERP/Minute |
| **Google Search Console** | **KOSTENLOS** | 1.200 Abfragen/Minute, 30.000/Tag |

**Pro Migration Kosten:**
- 6 Keyword-Lookups (keyword_overview + difficulty) = $0.004
- 1 SERP-Lookup = $0.0015
- 3 Long-Tail-Lookups = $0.002
- **Total: ~$0.008 pro Migration** (praktisch kostenlos)

## 6. Empfehlungen für 7 ausstehende Migrationen

**Prio-Reihenfolge basierend auf GSC-Daten (Juni 2026):**

| Page | Keyword-Hint | Begründung | GSC-Daten-Hinweis |
|---|---|---|---|
| **1. `/it-firmen-zuerich`** | it firmen zürich | 56 Impressions bestätigen Suchinteresse | Validierung aus GSC |
| **2. `/it-outsourcing-zuerich`** | it outsourcing zürich | Cluster-Schwerpunkt | DataForSEO-Recherche nötig |
| **3. `/it-support-zuerich`** | it support zürich | 170 Impressions (höchste im Cluster!) | Datensatz bereits im GSC |
| **4. `/it-beratung-kmu`** | it beratung kmu | 41 Impressions (Long-Tail „it beratung kmu") | Validierung |
| **5. `/it-sicherheit-kmu`** | it sicherheit kmu | Migration noch nicht in GSC | DataForSEO-Recherche nötig |
| **6. `/microsoft-365-kmu`** | microsoft 365 kmu | M365 bereits stark (Top 10) | Hub-View |
| **7. `/it-dienstleister-kmu`** | it dienstleister kmu | Spezialisierung KMU | DataForSEO-Recherche nötig |
| **8. `/it-notfallservice`** (Prio 1) | it notfallservice | laut SEO-Backlog dringend | Eigene Migration mit DataForSEO |

**Workflow pro Migration:**
1. Phase 1 (DataForSEO-Recherche): 10–15 min, 7–9 API-Calls, $0.008
2. Phase 2 (Code-Migration): 45–60 min nach 13/14-Sektionen-Schema
3. Phase 3 (Build + Push): 10 min
4. Skill-Sync: 5 min
5. **Total: ~75 min pro Migration**

## 7. Siehe auch

- `references/tone-voice.md` Lektion 52 (Lokale Service-Landing-Page)
- `references/tone-voice.md` Lektion 54 (SEO-Research-Workflow)
- `references/tone-voice.md` Lektion 55 (Google Search Console Performance-Daten)
- `references/pages-to-migrate.md` Prio 3 (8 Lokale Service-Landing-Pages)
- `references/migrations-playbook.md` Iteration 31 (erstes Beispiel)
- `app/it-dienstleister-zuerich/seo-research.md` (vollständige Phase-1-Beispielausgabe)
- `/root/kpx-gsc-service-account.json` (Service-Account-Credentials)
- `/root/opencode/workspace/kpxitch/token` (enthält GitHub-Token + Google API-Key, NICHT für GSC)

## 8. Lessons aus Iteration 31

1. **Service-Account-JSON ist sicherer als API-Key** — GSC akzeptiert keine API-Keys, OAuth2 ist Pflicht.
2. **Domain-Property (`sc-domain:`) ist der richtige Property-Format** für API-Calls — URL-Prefix funktioniert nicht.
3. **DataForSEO gruppiert Synonyme** — Wortvarianten (mit/ohne Bindestrich) liefern oft identische Zahlen.
4. **DataForSEO-Schätzungen können um Faktor 2 daneben liegen** — GSC-Daten sind Realität.
5. **Long-Tail-Cluster via `related_keywords`** liefert thematisch fokussierte Ergebnisse, `keyword_ideas` ist breiter.
6. **Local Pack dominiert für lokale Suchen** — Google My Business ist kritisch.
7. **API-Fehler 403 trotz Owner-Setup** deutet auf falsches Property-Format hin (Domain- statt URL-Property).
8. **Brand-Suchen „kpx ag"** ranken zuverlässig auf Position 1 — Brand-Awareness funktioniert.
9. **Long-Tail-Queries mit Impressionen aber 0 Klicks** sind Indikatoren für Title/Description-Optimierung.
10. **Real-Performance-Daten (GSC) sollten IMMER die Code-Migration leiten**, nicht nur DataForSEO-Schätzungen.

## 9. Bekannte Limitationen

- **DataForSEO:** Synonym-Clustering kann dazu führen, dass „echte" Variante-Suchvolumen verschleiert werden.
- **DataForSEO:** `keyword_ideas` ist breit und erfordert manuelle Filterung.
- **GSC:** Datenverfügbarkeit 2–3 Tage verzögert.
- **GSC:** Impression != Klick. Hohe Impression + niedrige CTR = Title/Description-Problem.
- **Local Pack:** Nur über Google My Business steuerbar (User-Aktion).
- **Service-Account-Berechtigung:** Erfordert manuelle Owner-Konfiguration in GSC-Oberfläche (nicht API-automatisierbar).

## 10. Hilfsskript `scripts/seo_research.py`

Ein vorgefertigtes Python-Skript bündelt die 7 API-Calls in einer einzigen ausführbaren Datei. Verwendung:

**Phase 1 (DataForSEO) — VOR Migration:**
```bash
# Umgebungsvariablen setzen
export DATAFORSEO_LOGIN="deine_login"
export DATAFORSEO_PASSWORD="deine_password"

# SEO-Research für /it-dienstleister-zuerich
python3 scripts/seo_research.py \
  --slug it-dienstleister-zuerich \
  --keyword "it dienstleister zürich" \
  --variants "IT-Dienstleister Zürich,it dienstleister in zürich,zürcher it dienstleister" \
  --longtails "it dienstleister zürich kmu,it dienstleister zürich kleinunternehmen,it dienstleister wallisellen,was kostet it dienstleister zürich" \
  --phase1
```

**Phase 5 (GSC) — 3–4 Wochen NACH Migration:**
```bash
python3 scripts/seo_research.py \
  --slug it-dienstleister-zuerich \
  --gsc \
  --start 2026-06-01 \
  --end 2026-06-28
```

**Was das Skript tut:**
1. Phase 1: 6 API-Calls (`keyword_overview`, `search_intent`, `keyword_ideas`, `related_keywords`, `bulk_keyword_difficulty`, `serp_organic_live_advanced`) — Output in der Konsole, kopierbar in `app/<slug>/seo-research.md`
2. Phase 5: 2 API-Calls (Auth-Test + SearchAnalytics für Property `sc-domain:kpx-it.ch`) — Top-20-Queries nach Clicks sortiert

**Erforderliche Python-Pakete:** `pip install pyjwt requests` (für OAuth2-JWT-Generierung).

**Voraussetzungen:**
- DataForSEO API-Credentials als Umgebungsvariablen
- GSC-Service-Account-JSON unter `/root/kpx-gsc-service-account.json`
- Owner-Berechtigung in GSC-Oberfläche für `kpx-it.ch` (User-Aktion)

**Pattern wiederverwendbar für alle 7 ausstehenden Migrationen** (Prio-Reihenfolge in `pages-to-migrate.md`).