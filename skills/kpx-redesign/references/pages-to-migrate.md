# Zu migrierende Seiten — KPX Redesign

Status nach Stand Branch `devel`. Die vier Referenzseiten gelten als **fertig** und sind die alleinige Wahrheitsquelle für das neue Design:

- ✅ `app/page.tsx` (/)
- ✅ `app/externe-it-abteilung/page.tsx` (/externe-it-abteilung)
- ✅ `app/it-outsourcing-kmu/page.tsx` (/it-outsourcing-kmu)
- ✅ `app/managed-it-services/backup/page.tsx` (/managed-it-services/backup)

Alle anderen `app/**/page.tsx` sind Migration candidates. Unten komplettes Inventar mit Prioritäten und Template-Zuweisung.

## Aktuelle Routing-Bestand (Stand devel)

Quelle: GitHub API tree (`git/trees/devel?recursive=1`), Verzeichnis `app/**/page.tsx`. Routing-Konflikte und Duplikate sind im jeweiligen Block markiert.

---

## Priorität 1 — `managed-it-services/*` Subpages (Master-Template)

Diese 13 Seiten folgen dem identischen 15-Sektionen-Rhythmus wie die Backup-Seite und sollten zuerst migriert werden. **Template:** `templates/managed-service-page.tsx`, **Vorbild:** `app/managed-it-services/backup/page.tsx`.

| Pfad | Anmerkungen |
|---|---|
| `app/managed-it-services/page.tsx` | Übersicht/Hub — benötigt eventuell angepaßte Layout-Anordnung (Eingang понад Hub-Format); höchstwahrscheinlich enthält sie Tabelle der Subservices, kein einzelnes Service-Diagramm |
| `app/managed-it-services/server/page.tsx` | direkte Backup-Template-Zwilling |
| `app/managed-it-services/security/page.tsx` | direkte Zwilling |
| `app/managed-it-services/endpoint-detection-response/page.tsx` | direkte Zwilling |
| `app/managed-it-services/endpoint/page.tsx` | ⚠️ Routing-Konflikt: `/endpoint` vs `/client` unten. Navbar linkt `/client`, produkte linkt `/endpoint`. Vor Migration klären. |
| `app/managed-it-services/client/page.tsx` | ⚠️ s. `/endpoint` Konflikt |
| `app/managed-it-services/firewall/page.tsx` | direkte Zwilling |
| `app/managed-it-services/cloud/page.tsx` | direkte Zwilling |
| `app/managed-it-services/private-cloud/page.tsx` | direkte Zwilling |
| `app/managed-it-services/m365/page.tsx` | direkte Zwilling |
| `app/managed-it-services/microsoft-365-backup/page.tsx` | ⚠️ Cannheit zu `/backup`: unterschiedliche Services. Vor Migration nicht mit canonical `hreflang` verknüpfen, prüfen ob Routeredundanz. |
| `app/managed-it-services/mail-archiv/page.tsx` | direkte Zwilling |
| `app/managed-it-services/voip/page.tsx` | direchte Zwilling |
| `app/managed-it-services/email-security/page.tsx` | direkte Zwilling |

### Empfehlung zu `/endpoint` vs `/client`
Bestehend 2 Routen, mit identischen (oder ähnlichen) Inhalten. Optionen:
1. Eine als kanonisch erklären, die andere als Redirect (301) auf die kanonische via `next.config.ts` redirects Array.
2. Inhaltichtlich differenzieren: `/endpoint` = Endgeräte-Management macOS/Linux; `/client` = Windows-Arbeitsplätze (oder umgekehrt) — explizite Positionierung.

Vor Migration klärt das mit dem Kunden和提高 nicht durch Agent.

---

## Priorität 2 — Weitere Managed-Seiten (top-level)

–en: Template hängt vom Inhalt ab. Meist Service-Hub-Format, ggf. kompaktere Umsetzung als Prio-1.

| Pfad | Anmerkungen |
|---|---|
| `app/managed-cloud-firewall/page.tsx` | Top-Level; Service-Diagramms-Section benötigt. |
| `app/managed-mobile-device/page.tsx` | Top-Level; MD-MDM (Mobile Device Management)-smooth整合. |
| `app/managed-network-wireless/page.tsx` | Top-Level; Network/WLAN-Scope. |
| `app/managed-prozesse/page.tsx` | Prozessoptimierung — Hub-ähnlich. |

---

## Priorität 3 — Lokale Service-Landing-Pages (ehemals SEO-Cluster)

Diese Seiten sind SEO-driven und auf lokale Suchanfragen ausgerichtet (z. B. `it dienstleister zürich`, `it outsourcing zürich`, `it firmen zürich`). Sie bündeln Geo-Bezug (Standort, Region), Service-Page-Struktur (13 Sektionen + ServicePageFooter) und breite Thematik. **Template:** `templates/seo-hub-page.tsx`, **Vorbild:** `app/it-dienstleister-zuerich/page.tsx` (Iteration 30.2).

| Pfad | Keyword-Hint | Anmerkungen |
|---|---|---|
| `app/it-outsourcing-zuerich/page.tsx` | `it outsourcing zürich` | Lokal-Pendant zu `/it-outsourcing-kmu`. |
| `app/it-dienstleister-zuerich/page.tsx` | `it dienstleister zürich` | Hauptseite der Lokalen Service-Landing-Pages per `references/seo-backlog.md`. Iteration 30.2 — 13 Sektionen + ServicePageFooter. |
| `app/it-dienstleister-kmu/page.tsx` | `it dienstleister kmu` | KMU-Ausrichtung. |
| `app/it-firmen-zuerich/page.tsx` | `it firmen zürich` | |
| `app/it-support-zuerich/page.tsx` | `it support zürich` | Prio 3 per `seo-backlog.md`. |
| `app/it-notfallservice/page.tsx` | `it notfall service / it notfallservice zürich` | **Prio 1 per `seo-backlog.md`** — Ranks #14 ohne dedizierte Seite (Difficulty 6). |
| `app/it-sicherheit-kmu/page.tsx` | `it sicherheit kmu` | |
| `app/it-beratung-kmu/page.tsx` | `it beratung kmu` | |
| `app/microsoft-365-kmu/page.tsx` | `microsoft 365 kmu` | |
| `app/diese-it-probleme-loesen-wir/page.tsx` | `it probleme lösen` (Variationen) | Hub-Seite; Layout ist bereits `app/diese-it-probleme-loesen-wir/layout.tsx` definiert. |
| `app/probleme/page.tsx` | short URL / Redirect-Seite | Möglichst 301-Redirect auf `diese-it-probleme-loesen-wir` statt duplicate Content. |

### SEO-Backlog-Termine `references/seo-backlog.md`

- `/it-notfallservice` Prio 1 (Schaffung/Erweiterung einer dedizierten Seite)
- `/it-outsourcing-kmu` Prio 2 — bereits erledigt (Referenzseite)
- `/it-support-zuerich` Prio 3
- Nationale keywords (`it dienstleister schweiz`, `it unternehmen schweiz`, `it firmen schweiz`, `it consulting schweiz`, `it support schweiz`, `schweizer it firmen`) organisch auf der Homepage und der `/it-dienstleister-zuerich` Hauptseite verwweben (keine neuen Standalone-Seiten nötig).
- **Vor jeder Migration: DataForSEO-Recherche** durchführen (Suchvolumen, Difficulty, Suchintention, Wettbewerber). Pattern: siehe Lektion 54 in `tone-voice.md`.

---

## Priorität 4 — Cloud / KI-Lösungen

| Pfad | Vorbild |
|---|---|
| `app/cloud/page.tsx` | Service-Hub |
| `app/ki-loesungen/page.tsx` | SEO-Hub, ggf. `<KiPageFooter />` statt `ServicePageFooter` rendern |
| `app/ki-loesungen/copilot/page.tsx` | Subpage-Layout (ähnlich `managed-it-services/*`), `<KiPageFooter />` |
| `app/ki-loesungen/datenanalyse/page.tsx` | wie oben |
| `app/ki-loesungen/ki-sicher-nutzen/page.tsx` | wie oben |
| `app/ki-loesungen/kundenbetreuung/page.tsx` | wie oben |
| `app/ki-loesungen/prozessautomatisierung/page.tsx` | wie oben |

---

## Priorität 5 — Lösungen / IT-Wissen / Über uns / Kontakt / Tools

| Pfad | Spezialität |
|---|---|
| `app/it-wissen/page.tsx` | Blog-Index — Sonderformat |
| `app/it-wissen/[slug]/page.tsx` | Artikel-Template (driven by `lib/blogPosts.ts`); voraussichtlich Editorial-Template, selbst eigen |
| `app/it-loesungen/page.tsx` | Sehr groß (115 KB) — Branchen-Tabs-orientiert; `it-loesungen/layout.tsx` vorhanden. Migration nur sprechweise. |
| `app/it-loesungen/handwerk/page.tsx` | Stub/Redirect (122 bytes) — nur canonical klären |
| `app/it-loesungen/treuhand/page.tsx` | Stub/Redirect (122 bytes) |
| `app/ueber-uns/page.tsx` | Über uns-Seite; eher eine Editorial-Hub-Struktur |
| `app/ueber-uns/engagement/page.tsx` | Sonderseite (Engagement ist eigen) |
| `app/kontakt/page.tsx` | Kontaktseite mit Form; rechtliche + 严重 Form-Validierung beachten |
| `app/it-kosten-rechner/page.tsx` | Preiskalkulator-Wizard (`PriceCalculatorWizard` + wizard/* components); kein Template, Dyn-Form — nur in Scope, wenn Explicity verlangt |

---

## Priorität 6 — Legal / English / System

| Pfad | Anmerkungen |
|---|---|
| `app/impressum/page.tsx` | Legal; zentraler Article-Block `max-w-3xl` |
| `app/datenschutz/page.tsx` | Legal; wie oben |
| `app/agb/page.tsx` | Legal; wie oben |
| `app/en/page.tsx` | Englische Version — separate Skill/Workflow bei ausdrücklicher Anfrage |
| `app/en/contact/page.tsx` | English contact |
| `app/en/managed-it-services/page.tsx` | English services overview |
| `app/en/managed-it-services/endpoint-detection-response/page.tsx` | English EDR |
| `app/en/managed-it-services/it-lifecycle-field-service/page.tsx` | English-only — kein deutsches Pendant vorhanden |
| `app/not-found.tsx` | 404 (keine route, aber styled) — kann im Stil bleiben |

---

## Voraussichtlicher Migrations-Aufwand

Grobe Einschätzung der Arbeitszeit pro Seite (subjectiv, ohne Blog-Content, ohne Backend-Anpassungen). **Migrations der Skill-Begleitung vorausgesetzt**

| Priorität | Seiten | Aufwand pro Seite | Gesamt |
|---|---|---|---|
| 1 (managed-it-services/*) | 13 | 1.5–2.5 h | 20–35 h |
| 2 (andere managed-/*) | 4 | 2–3 h | 8–12 h |
| 3 (it-* cluster) | 11 | 2–4 h | 22–44 h |
| 4 (KI) | 7 | 2–3 h | 14–21 h |
| 5 (verschiedene) | 9 | 3–6 h | 27–54 h |
| 6 (Legal/EN/System) | 9 | 0.5–2 h | 4–18 h |
| **Gesamt** | **~53** | | **95–184 h** |

Long-tail; nicht im Unit-Task zu erledigen. Realistisch als Folge von kleinen PRs, einer pro Priorität oder pro sub-cluster.

---

## Routing-Vorpruef-Liste (vor jeder Migration abarbeiten)

- [ ] Ist die Route kanonisch? (Kein `/endpoint` vs `/client` Problem)
- [ ] Canonical in Metadaten ohne Trailing-Slash
- [ ] Sitemap-Eintrag in `app/sitemap.ts` aktualisiert
- [ ] Navbar (`components/Navbar.tsx`) enthält diesen Link fallser fallser: bestehende verlinknung nicht brechen
- [ ] Footer (`components/Footer.tsx`) Querverlinkungen checken
- [ ] Falls neue Service-Röhre — `app/data/produkte.ts` ggf. ergänzen oder lokal Array
- [ ] SEO-Backlog (`references/seo-backlog.md`) auf entsprechende Prio prüfen und ggf. haken nach Migration

---

## Sanity-Check post-Migration

- [ ] `pnpm tsc --noEmit` grün
- [ ] `pnpm lint` grün
- [ ] `pnpm dev` → Besuch `<path>` → keine Console-Fehler, visuell Side-by-Side mit nächstgelegener Referenzseite
- [ ] [Google Rich Results Test](https://search.google.com/test/rich-results) für neue URL → `BreadcrumbList`, `FAQPage`, `Service` valid erkannt
- [ ] Canonical vergleichen: breadcrumb-Pfad, organisation-`@id`, image 1200×630 alt
- [ ] Telefonnummer / Adresse identisch mit anderen Seiten
- [ ] Keine `ß` characters (de-CH check); `grep -ri 'ß' app/<path>/page.tsx` muss leer sein
- [ ] Hero-Wellen-SVG vorhanden und sticky am unteren End der Hero
- [ ] FAQ in Schema und Render identische Texte (kein Schema-vs-Content mismatch)

## Vor jeder Migration: SEO-Research durchführen

Vor jeder Lokale Service-Landing-Page-Migration (siehe Prio 3 oben) **MUSS** eine SEO-Recherche via DataForSEO durchgeführt werden. Vollständige Anleitung in `references/seo-research-workflow.md`. Workflow:

1. `keyword_overview` für Hauptkeyword + 3–5 Wortvarianten
2. `search_intent` für Suchintention-Validierung
3. `related_keywords` für Long-Tail-Cluster
4. `bulk_keyword_difficulty` für Schwierigkeit
5. `serp_organic_live_advanced` für Top-10-Wettbewerber + Local Pack
6. Ergebnisse in `app/<slug>/seo-research.md` dokumentieren

**GSC-Daten 3–4 Wochen nach Migration holen** (Phase 5, siehe Lektion 55). Service-Account-JSON in `/root/kpx-gsc-service-account.json`, Owner-Setup in GSC-Oberfläche erforderlich.