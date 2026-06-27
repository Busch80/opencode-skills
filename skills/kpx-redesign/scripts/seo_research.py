#!/usr/bin/env python3
"""
SEO-Research-Werkzeug fuer Lokale Service-Landing-Pages.

Pattern aus Iteration 31 (/it-dienstleister-zuerich):
Phase 1: DataForSEO-Recherche VOR Migration.
Phase 5: GSC-Performance NACH Migration.

Verwendung:
    python3 seo_research.py --slug it-dienstleister-zuerich --keyword "it dienstleister zürich" --variants "IT-Dienstleister Zürich,it dienstleister in zürich"
    python3 seo_research.py --slug it-dienstleister-zuerich --gsc --start 2026-06-01 --end 2026-06-27

Erfordert DataForSEO API-Credentials via Umgebungsvariablen:
    DATAFORSEO_LOGIN
    DATAFORSEO_PASSWORD

Erfordert GSC-Service-Account-JSON unter:
/root/.config/opencode/secrets/gsc-sa.json

Siehe references/seo-research-workflow.md fuer Details.
"""

import argparse
import json
import os
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timedelta

# === Konstanten ===

DATAFORSEO_BASE = "https://api.dataforseo.com/v3"
GSC_BASE = "https://www.googleapis.com/webmasters/v3"
GSC_PROPERTY_DOMAIN = "sc-domain:kpx-it.ch"
GSC_SA_FILE = "/root/.config/opencode/secrets/gsc-sa.json"
GSC_SCOPES = ["https://www.googleapis.com/auth/webmasters.readonly"]


# === Hilfsfunktionen ===

def get_dataforseo_creds():
    login = os.environ.get("DATAFORSEO_LOGIN")
    password = os.environ.get("DATAFORSEO_PASSWORD")
    if not login or not password:
        print("FEHLER: DATAFORSEO_LOGIN und DATAFORSEO_PASSWORD als Umgebungsvariablen setzen.")
        sys.exit(1)
    return login, password


def dataforseo_post(path, body):
    """DataForSEO POST-Request."""
    login, password = get_dataforseo_creds()
    import base64
    auth = base64.b64encode(f"{login}:{password}".encode()).decode()
    req = urllib.request.Request(
        f"{DATAFORSEO_BASE}{path}",
        data=json.dumps(body).encode(),
        headers={
            "Authorization": f"Basic {auth}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        print(f"FEHLER DataForSEO {path}: HTTP {e.code} {e.reason}")
        return {"error": e.read().decode()[:500]}


def get_gsc_token():
    """Liest Service-Account-JSON und holt OAuth2-Access-Token via JWT."""
    try:
        with open(GSC_SA_FILE) as f:
            sa = json.load(f)
    except FileNotFoundError:
        print(f"FEHLER: {GSC_SA_FILE} nicht gefunden. Owner-Setup in GSC-Oberflaeche erforderlich.")
        sys.exit(1)

    try:
        import jwt
    except ImportError:
        print("FEHLER: PyJWT nicht installiert. pip install pyjwt")
        sys.exit(1)

    now = int(time.time())
    payload = {
        "iss": sa["client_email"],
        "scope": " ".join(GSC_SCOPES),
        "aud": sa["token_uri"],
        "iat": now,
        "exp": now + 3600,
    }
    assertion = jwt.encode(
        payload,
        sa["private_key"],
        algorithm="RS256",
        headers={"kid": sa["private_key_id"]},
    )
    data = urllib.parse.urlencode({
        "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
        "assertion": assertion,
    }).encode()
    req = urllib.request.Request(sa["token_uri"], data=data)
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read())["access_token"]


def gsc_get(path, token):
    """GSC GET-Request."""
    req = urllib.request.Request(
        f"{GSC_BASE}{path}",
        headers={"Authorization": f"Bearer {token}"},
    )
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        print(f"FEHLER GSC {path}: HTTP {e.code} {e.reason}")
        print(e.read().decode()[:500])
        return {"error": e.read().decode()[:500]}


def gsc_post(path, body, token):
    """GSC POST-Request."""
    req = urllib.request.Request(
        f"{GSC_BASE}{path}",
        data=json.dumps(body).encode(),
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        print(f"FEHLER GSC {path}: HTTP {e.code} {e.reason}")
        print(e.read().decode()[:500])
        return {"error": e.read().decode()[:500]}


# === Phase 1: DataForSEO-Recherche ===

def phase1_keyword_overview(keywords, location="Switzerland", language="de"):
    """Keyword-Suchvolumen, Difficulty, CPC, Competition."""
    print(f"\n=== Phase 1.1: keyword_overview ({len(keywords)} keywords) ===")
    body = [{"location_name": location, "language_code": language, "keywords": keywords}]
    result = dataforseo_post("/keywords_data/google/search_volume/live", body)
    if "tasks" in result:
        for task in result["tasks"]:
            for kw_data in task.get("result", []) or []:
                print(f"  {kw_data['keyword']}: vol={kw_data['search_volume']}, cpc={kw_data['cpc']}, comp={kw_data['competition_level']}")
    return result


def phase1_search_intent(keywords, language="de"):
    """Suchintention-Analyse (commercial/informational/transactional/navigational)."""
    print(f"\n=== Phase 1.2: search_intent ({len(keywords)} keywords) ===")
    body = {"language_code": language, "keywords": keywords}
    result = dataforseo_post("/dataforseo_labs/google/search_intent/live", body)
    if "tasks" in result:
        for task in result["tasks"]:
            for item in task.get("result", {}).get("items", []):
                intent = item["keyword_intent"]
                print(f"  {item['keyword']}: {intent['label']} ({intent['probability']*100:.1f}%)")
    return result


def phase1_keyword_ideas(seed_keyword, location="Switzerland", language="de", limit=30):
    """Long-Tail-Keyword-Ideen (breit)."""
    print(f"\n=== Phase 1.3: keyword_ideas (limit {limit}) ===")
    body = {
        "location_name": location,
        "language_code": language,
        "limit": limit,
        "order_by": ["keyword_info.search_volume,desc"],
        "keywords": [seed_keyword],
    }
    result = dataforseo_post("/dataforseo_labs/google/keyword_ideas/live", body)
    if "tasks" in result:
        for task in result["tasks"]:
            for item in task.get("result", {}).get("items", []):
                print(f"  {item['keyword']}: vol={item['keyword_info']['search_volume']}")
    return result


def phase1_related_keywords(seed_keyword, location="Switzerland", language="de", limit=15):
    """Thematisch fokussierte verwandte Keywords."""
    print(f"\n=== Phase 1.4: related_keywords (limit {limit}) ===")
    body = {
        "keyword": seed_keyword,
        "location_name": location,
        "language_code": language,
        "limit": limit,
        "order_by": ["keyword_data.keyword_info.search_volume,desc"],
    }
    result = dataforseo_post("/dataforseo_labs/google/related_keywords/live", body)
    if "tasks" in result:
        for task in result["tasks"]:
            for item in task.get("result", {}).get("items", []):
                if "keyword_data" in item:
                    kw = item["keyword_data"]
                    print(f"  {kw['keyword']}: vol={kw['keyword_info']['search_volume']}, depth={item['depth']}")
    return result


def phase1_bulk_keyword_difficulty(keywords, location="Switzerland", language="de"):
    """Keyword-Difficulty (0-100)."""
    print(f"\n=== Phase 1.5: bulk_keyword_difficulty ({len(keywords)} keywords) ===")
    body = {
        "location_name": location,
        "language_code": language,
        "keywords": keywords,
    }
    result = dataforseo_post("/dataforseo_labs/bulk_keyword_difficulty/live", body)
    if "tasks" in result:
        for task in result["tasks"]:
            for item in task.get("result", {}).get("items", []):
                kw = item.get("keyword", "?")
                diff = item.get("keyword_difficulty", "N/A")
                print(f"  {kw}: difficulty={diff}")
    return result


def phase1_serp(keyword, location="Switzerland", language="de", depth=10):
    """Top-10-Google-SERP + Local Pack + People Also Search."""
    print(f"\n=== Phase 1.6: serp_organic_live_advanced (depth {depth}) ===")
    body = {
        "search_engine": "google",
        "location_name": location,
        "language_code": language,
        "depth": depth,
        "keyword": keyword,
    }
    result = dataforseo_post("/serp/google/organic/live/advanced", body)
    if "tasks" in result:
        for task in result["tasks"]:
            for item in task.get("result", []) or []:
                rank = item.get("rank_absolute", "?")
                title = item.get("title", "(no title)")
                domain = item.get("domain", "?")
                print(f"  Rank {rank}: {title} ({domain})")
    return result


# === Phase 5: GSC-Performance ===

def phase5_gsc_test():
    """Test: GSC-Auth + Sites auflisten."""
    print("\n=== Phase 5.1: GSC Auth-Test ===")
    token = get_gsc_token()
    sites = gsc_get("/sites", token)
    if "siteEntry" in sites:
        print(f"  Verfuegbare Properties: {[s['siteUrl'] for s in sites['siteEntry']]}")
        return sites
    return None


def phase5_gsc_search_analytics(start_date, end_date, dimensions="query", row_limit=20):
    """Top-Queries aus GSC mit Clicks, Impressions, CTR, Position."""
    print(f"\n=== Phase 5.2: GSC SearchAnalytics ({start_date} bis {end_date}) ===")
    token = get_gsc_token()
    body = {
        "startDate": start_date,
        "endDate": end_date,
        "dimensions": [dimensions],
        "rowLimit": row_limit,
    }
    result = gsc_post(f"/sites/{GSC_PROPERTY_DOMAIN}/searchAnalytics/query", body, token)
    if "rows" in result:
        sorted_rows = sorted(result["rows"], key=lambda r: r["clicks"], reverse=True)
        for row in sorted_rows:
            print(f"  {row['keys'][0]}: {row['clicks']} clicks, {row['impressions']} impr, CTR {row['ctr']*100:.1f}%, pos {row['position']:.1f}")
    elif "error" in result:
        print(f"  Fehler: {result['error'][:200]}")
    return result


# === Main ===

def main():
    parser = argparse.ArgumentParser(description="SEO-Research-Werkzeug fuer Lokale Service-Landing-Pages")
    parser.add_argument("--slug", required=True, help="z.B. it-dienstleister-zuerich")
    parser.add_argument("--keyword", help="Hauptkeyword fuer Phase 1 (DataForSEO)")
    parser.add_argument("--variants", help="Komma-getrennte Wortvarianten fuer Phase 1")
    parser.add_argument("--longtails", help="Komma-getrennte Long-Tail-Keywords fuer Phase 1.5")
    parser.add_argument("--gsc", action="store_true", help="Phase 5 (GSC) ausfuehren")
    parser.add_argument("--start", help="GSC-Start-Datum (YYYY-MM-DD)")
    parser.add_argument("--end", help="GSC-End-Datum (YYYY-MM-DD)")
    parser.add_argument("--phase1", action="store_true", help="Phase 1 (DataForSEO) ausfuehren")

    args = parser.parse_args()

    print(f"=== SEO-Research: {args.slug} ===")

    if args.phase1 or args.keyword:
        if not args.keyword:
            print("FEHLER: --keyword erforderlich fuer Phase 1.")
            sys.exit(1)

        variants = args.variants.split(",") if args.variants else []
        longtails = args.longtails.split(",") if args.longtails else []

        all_keywords = [args.keyword] + variants + longtails

        phase1_keyword_overview(all_keywords)
        phase1_search_intent([args.keyword] + variants)
        phase1_keyword_ideas(args.keyword, limit=30)
        phase1_related_keywords(args.keyword, limit=15)
        phase1_bulk_keyword_difficulty(all_keywords)
        phase1_serp(args.keyword, depth=10)

    if args.gsc:
        if not args.start or not args.end:
            end = datetime.now().strftime("%Y-%m-%d")
            start = (datetime.now() - timedelta(days=28)).strftime("%Y-%m-%d")
            print(f"Kein Datum angegeben. Verwende {start} bis {end}")
            args.start = start
            args.end = end

        phase5_gsc_test()
        phase5_gsc_search_analytics(args.start, args.end)


if __name__ == "__main__":
    main()