/**
 * Master-Template für Managed-IT-Services-Subpages (Blaupause: /managed-it-services/endpoint).
 *
 * Verwendung:
 *  1. Kopiere diese Datei nach app/<managed-it-services>/<slug>/page.tsx
 *  2. Alle {SLOT} / TODO-Kommentare ersetzen.
 *  3. Page-spezifische Grafik-Komponente statt <PageSpecificDiagram /> einsetzen, falls passend.
 *  4. `pnpm tsc --noEmit && pnpm lint` ausführen.
 *
 * Siehe Skill `kpx-redesign` References:
 *   - design-tokens.md   (oklch Farben, Helper-Klassen)
 *   - section-rhythm.md  (13-Sektionen-Rhythmus, kanonische Werte)
 *   - components.md       (Komponenten-Snippets)
 *   - seo-schema.md      (Metadata + JSON-LD @graph)
 *   - tone-voice.md      (de-CH Regeln, inkl. §12 Infobalken-Context-Block)
 *
 * Schema-Übersicht (13 Sektionen):
 *   Vertriebsblock:   1 Hero · 2 Stats · 3 Problem · 4 Lösung/Grafik · 5 Frage · 6 Prozess+CTA · 7 (CTA in 6) · 8 Modelle
 *   Trennelement:     9 Infobalken+Context-Block
 *   Fachtext-Block:   10 FAQ · 11 Services · 12 Blog · 13 Servicegebiet
 *   Abschluss-CTA:    ENTFAELLT — ServicePageFooter uebernimmt
 */

export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, CheckCircle2, ChevronDown, MapPin, Phone,
         TrendingUp, Users, Clock, Shield, Info, AlertTriangle, Briefcase,
         HandshakeIcon, UserCog /* , <...weitere lucide-icons...> */ } from "lucide-react";
// import <PageSpecificDiagram> from "@/components/<PageSpecificDiagram>";
import { getLatestPosts } from "@/lib/blogPosts";
import { produkte } from "@/app/data/produkte";

/* ─────────────────────────── SLOT: Metadata ─────────────────────────── */

const PAGE_TITLE  = "<Service-Name> für KMU – <Optional Untertopic> | KPX";
const PAGE_DESC   = "<140–160 Zeichen, Front-load Hauptkeyword, konkreter Vorteil, CTA.>";
const PAGE_PATH   = "/managed-it-services/<slug>";     // kein Trailing-Slash
const PAGE_URL    = `https://kpx-it.ch${PAGE_PATH}`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESC,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    locale: "de_CH",
    siteName: "KPX AG",
    title: PAGE_TITLE,
    description: PAGE_DESC,
    url: PAGE_URL,
    images: [{ url: "https://kpx-it.ch/og-image.png", width: 1200, height: 630, alt: "KPX AG Logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESC,
    images: ["https://kpx-it.ch/og-image.png"],
  },
};

/* ─────────────────────────── SLOT: Page-Inhalt ─────────────────────────── */

const heroPoints: string[] = [
  "<Punkt 1 – z. B.: 3 Kopien – 2 Medien – 1 ausgelagerter Standort>",
  "<Punkt 2 – z. B.: 1 davon unveraenderlich (Verschluesselungsschutz)>",
  "<Punkt 3 – z. B.: Aktiv durch KPX ueberwacht und geprueft>",
  "<Punkt 4 – z. B.: Datenhaltung in der Schweiz – DSG-konform>",
];

const ctaIntroText = "<Frage an den Leser / Schmerzpunkt – z. B.: Wie gut ist Ihre Datensicherung wirklich aufgestellt?>";
const ctaIntroSub  = "<Subline – z. B.: Wir analysieren Ihre aktuelle Backup-Situation – gratis und unverbindlich.>";

const stepProcess: { step: string; title: string; desc: string; highlight: string }[] = [
  { step: "01", title: "Gratis Erstgespraech",      desc: "<2–3 Saetze – was passiert in diesem Schritt>", highlight: "Gratis" },
  { step: "02", title: "Erstanalyse",               desc: "<2–3 Saetze>", highlight: "Individuell" },
  { step: "03", title: "Persoenliche Offerte",      desc: "<2–3 Saetze — enthaelt: 'Was drin steht, gilt.'>", highlight: "Transparent kalkuliert" },
  { step: "04", title: "Vollstaendig betreut",      desc: "<2–3 Saetze>", highlight: "Proaktiv" },
];
const processCtaLabel = "<CTA-Label – z. B.: Gratis Backup-Analyse anfordern>";

/* Sektion 8: drei Betreuungsmodelle.
   - Reihenfolge der Karten je nach Service anpassen (z. B. "Rundum" zuerst fuer Backup,
     "Gemeinsam" zuerst fuer Endpoint, "Eigenregie" frueher bei grossen IT-Teams).
   - ALLE 3 MODELLE GLEICHWERTIG — KEIN `highlight` Feld, KEIN „Empfohlen"-Badge. */
const careModels: { id: "rundum" | "gemeinsam" | "eigenregie";
                    icon: any; title: string; desc: string }[] = [
  { id: "rundum",     icon: Briefcase,
    title: "Rundum",
    desc: "Wir uebernehmen die volle Verantwortung fuer Ihre <Thema>-Loesung – von der Einrichtung bis zum 24/7-Betrieb. Sie nutzen Ihre Endpunkte, wir sorgen fuer den Rest." },
  { id: "gemeinsam",  icon: HandshakeIcon,
    title: "Gemeinsam",
    desc: "Ihr IT-Team arbeitet eng mit unseren Spezialisten zusammen. Geteilte Verantwortung, geteiltes Wissen – ideal fuer KMU mit eigenem IT-Personal." },
  { id: "eigenregie", icon: UserCog,
    title: "Eigenregie",
    desc: "Sie betreiben Ihre Loesung selbst, nutzen aber unsere Plattformen, Tools und unseren Support on-demand. Maximale Kontrolle, minimale externe Abhaengigkeit." },
];

/* Sektion 9: Infobalken + Context-Block (Trennelement).
   - 3 Spalten Erklaertexte (je 3-4 Saetze, ~90 Woerter pro Spalte)
   - 2-Spalten-Feature-Tabelle (NinjaOne / SentinelOne, je 6-8 Bullet-Items)
   - Quellen-Angabe mit echten <a href> Links
   - Faktenbasiert, keine Empfehlung, keine Verkaufsabsicht.
   - Schweizer Quellen mit Links (BACS, MSRC, NinjaOne, SentinelOne).
   - Siehe references/tone-voice.md §12. */
const contextBlock = {
  heading: "Allgemeine Informationen rund um <Thema> fuer KMU",
  sub:     "Was <Thema-Thema-K1> ist, warum <Thema-K2> essenziell ist, ...",
  explanations: [
    {
      h3: "Was ist <Thema>?",
      text: "<3-4 Saetze Fliesstext, ~90 Woerter. Definition + Schweizer Quelle als inline-Link.>",
    },
    {
      h3: "Warum <Unterpunkt 1>?",
      text: "<3-4 Saetze Fliesstext, ~90 Woerter. Mit ggf. Hersteller-Quelle als inline-Link.>",
    },
    {
      h3: "Warum <Unterpunkt 2>?",
      text: "<3-4 Saetze Fliesstext, ~90 Woerter.>",
    },
  ],
  featureTables: [
    {
      title: "NinjaOne – RMM-Features",
      icon: HardDrive,
      items: [
        "<Feature 1 – z.B. Automatisches Patch-Management>",
        "<Feature 2>",
        "<Feature 3>",
        "<Feature 4 – 6-8 Elemente>",
      ],
    },
    {
      title: "SentinelOne – EDR-Features",
      icon: Shield,
      items: [
        "<Feature 1 – z.B. Autonome AI>",
        "<Feature 2>",
        "<Feature 3>",
        "<Feature 4 – 6-8 Elemente>",
      ],
    },
  ],
  sources: [
    { label: "BACS / NCSC",           href: "https://www.ncsc.admin.ch/ncsc/de/home.html" },
    { label: "Microsoft MSRC",         href: "https://msrc.microsoft.com/update-guide" },
    { label: "Microsoft Lifecycle",    href: "https://learn.microsoft.com/en-us/lifecycle/" },
    { label: "NinjaOne",               href: "https://www.ninjaone.com/" },
    { label: "SentinelOne",            href: "https://www.sentinelone.com/" },
  ],
};

type FaqItem = { q: string; a: string; aLink?: { text: string; href: string } };
const faqs: FaqItem[] = [
  // { q: "Was kostet ... fuer ein KMU in der Schweiz?", a: "..." },
  // 6–10 FAQs typisch, max 12
];

const blogSectionTitle    = "IT-Wissen zum Thema";
const blogSectionSubTitle = "<Subtext – z. B.: Verstaendlich erklaert: Datensicherung, Ransomware-Schutz und Business Continuity fuer Schweizer KMU.>";

// Alternativ zur getLatestPosts-Form: kuratierte 4 Inline-Posts (siehe components.md §13)
// const curatedPosts = [ { slug, category, publishedAt, title, excerpt, readingTimeMin }, ...4 ];
const curatedPosts: { slug: string; category: string; publishedAt: string;
                      title: string; excerpt: string; readingTimeMin: number }[] = [
  // thematisch zur Seite passend, 4 Eintraega
];

/* ─────────────────────────── JSON-LD @graph ──────────────────────────── */

const schemaJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Startseite",          "item": "https://kpx-it.ch" },
        { "@type": "ListItem", "position": 2, "name": "Managed IT Services", "item": "https://kpx-it.ch/managed-it-services" },
        { "@type": "ListItem", "position": 3, "name": "<Service-Name>",      "item": PAGE_URL },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a },
      })),
    },
    {
      "@type": "Organization",
      "@id": "https://kpx-it.ch/#organization",
      "name": "KPX AG",
      "url": "https://kpx-it.ch",
      "logo": "https://kpx-it.ch/kpx-logo.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Grindelstrasse 6",
        "addressLocality": "Wallisellen",
        "postalCode": "8304",
        "addressCountry": "CH",
      },
      "telephone": "+41445896955",
      "email": "info@kpx-it.ch",
    },
    {
      "@type": "Service",
      "name": "<Service-Name>",
      "description": "<1-Satz-Beschreibung fuer Schema — z. B.: Vollautomatische, regelmaessig gepruefte Datensicherung nach 3-2-1-Prinzip fuer KMU in der Schweiz. Ransomware-Schutz durch Immutable Backups und kurze Wiederherstellungszeiten.>",
      "provider": { "@type": "Organization", "name": "KPX AG", "url": "https://kpx-it.ch" },
      "areaServed": { "@type": "Country", "name": "Schweiz" },
      "serviceType": "IT-Dienstleistung",
    },
  ],
};

/* ─────────────────────────── Komponente ─────────────────────────── */

export default function Managed<ServiceName>PascalPage() {
  const latestPosts = getLatestPosts(3);

  return (
    <div className="min-h-screen flex flex-col">

      {/* ── 1. Hero (dunkel) ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden"
        style={{ backgroundColor: "oklch(0.22 0.07 250)", minHeight: "520px" }}>
        <div className="container relative z-10"
          style={{ paddingTop: "calc(80px + 56px)", paddingBottom: "80px" }}>
          <nav className="flex items-center gap-2 text-xs mb-6"
            style={{ color: "oklch(0.62 0.14 225)" }}>
            <Link href="/" className="hover:underline" style={{ color: "oklch(0.72 0.08 225)" }}>Startseite</Link>
            <span style={{ color: "oklch(0.52 0.06 225)" }}>&#47;</span>
            <Link href="/managed-it-services" className="hover:underline" style={{ color: "oklch(0.72 0.08 225)" }}>Managed Services</Link>
            <span style={{ color: "oklch(0.52 0.06 225)" }}>&#47;</span>
            <span style={{ color: "oklch(0.62 0.14 225)" }}><Service-Name></span>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 text-white">
              <H1 Teil 1> –<br /><H1 Teil 2>
            </h1>
            <p className="text-base md:text-lg font-semibold mb-6"
              style={{ color: "oklch(0.82 0.04 220)" }}>
              <Hero-Untertitel — 2 Saetze>
            </p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mt-2">
              {heroPoints.map((label) => (
                <div key={label} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5"
                    style={{ color: "oklch(0.72 0.18 145)" }} />
                  <span className="text-sm font-semibold text-white">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0" style={{ lineHeight: 0, fontSize: 0 }}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "60px", marginBottom: "-3px" }}>
            <path d="M0 80L1440 80L1440 30C1200 70 960 10 720 30C480 50 240 10 0 30L0 80Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── 2. Stats-Bar (white) ─────────────────────────────────────── */}
      {/* Regel: Stats-Bar IMMER 1:1 von der Startseite (app/page.tsx) uebernehmen.
          Falls die Startseiten-Stats sich aendern, muessen alle Service- und Hub-Seiten
          nachgezogen werden. Siehe references/section-rhythm.md §2.2. */}
      <section className="py-8 bg-white" style={{ marginTop: "-1px" }}>
        <div className="container">
          <div className="stagger-children grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { value: "20+",         label: "Jahre IT-Praxis",          icon: TrendingUp },
              { value: "Persoenlich", label: "fester Ansprechpartner",   icon: Users },
              { value: "DSG",         label: "konforme IT-Services",     icon: CheckCircle2 },
              { value: "Spezialisiert", label: "auf Schweizer KMU",      icon: Clock },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="text-center">
                  <div className="flex justify-center mb-2">
                    <Icon className="w-6 h-6" style={{ color: "oklch(0.62 0.14 225)" }} />
                  </div>
                  <div className="kpx-stat-number">{stat.value}</div>
                  <p className="text-sm text-muted-foreground mt-1 leading-tight">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. Das Problem, das wir loesen (light) ─────────────────────── */}
      <section className="kpx-section kpx-section-light">
        <div className="container max-w-5xl mx-auto">
          <div className="fade-in">
            <h2 className="section-heading text-center mb-6">
              <Problem-Heading – z. B.: Wo <Thema> bei KMU typischerweise scheitert>
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-8 text-center max-w-3xl mx-auto">
              <Problem-Einleitung – 1-2 Saetze, die das Problem umreissen.>
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* SLOT: 4-6 Problem-Kacheln mit Lucide-Icon */}
              {[
                { icon: AlertTriangle, title: "<Pain 1>", desc: "<1-2 Saetze>" },
                { icon: AlertTriangle, title: "<Pain 2>", desc: "<1-2 Saetze>" },
                { icon: AlertTriangle, title: "<Pain 3>", desc: "<1-2 Saetze>" },
                { icon: AlertTriangle, title: "<Pain 4>", desc: "<1-2 Saetze>" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-lg"
                    style={{ backgroundColor: "oklch(0.96 0.008 220)" }}>
                    <Icon className="w-5 h-5 flex-shrink-0 mt-0.5"
                      style={{ color: "oklch(0.62 0.14 225)" }} />
                    <div>
                      <h3 className="font-semibold text-sm mb-1"
                        style={{ color: "oklch(0.22 0.07 250)" }}>{item.title}</h3>
                      <p className="text-xs text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Wie wir es loesen (light, mit optionaler Grafik) ────────── */}
      <section className="kpx-section kpx-section-light">
        <div className="container max-w-5xl mx-auto">
          <div className="fade-in">
            <h2 className="section-heading text-center mb-8">
              <Loesungs-Heading – z. B.: So bringen wir Ordnung in Ihre <Thema>-Landschaft>
            </h2>
            {/* <PageSpecificDiagram /> – falls passende Komponente existiert; sonst icon-basiertes Grid */}
            <p className="text-sm text-gray-600 leading-relaxed text-center max-w-2xl mx-auto">
              <Optionaler Erklaerungstext zur Grafik – 2-3 Saetze.>
            </p>
          </div>
        </div>
      </section>

      {/* ── 5. Frage zur aktuellen Lage (dunkel) ──────────────────────── */}
      <section className="py-10 md:py-12 kpx-section-dark">
        <div className="container max-w-5xl mx-auto text-center">
          <div className="fade-in">
            <h2 className="section-heading mb-3" style={{ color: "white" }}>{ctaIntroText}</h2>
            <p className="text-lg md:text-xl" style={{ color: "oklch(0.82 0.04 220)" }}>{ctaIntroSub}</p>
          </div>
        </div>
      </section>

      {/* ── 6. 4 Prozess-Schritte (white) ─────────────────────────────── */}
      <section className="kpx-section bg-white">
        <div className="container max-w-5xl mx-auto">
          <div className="fade-in">
            <h2 className="section-heading text-center mb-10">
              <Vom ersten Gespraech zur zuverlaessigen <Topic>>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {stepProcess.map((item) => (
                <div key={item.step} className="rounded-xl p-5 border border-gray-200 bg-white flex flex-col">
                  <div className="text-4xl font-extrabold mb-3 leading-none"
                    style={{ color: "oklch(0.62 0.14 225 / 0.15)" }}>
                    {item.step}
                  </div>
                  <h3 className="font-bold text-base mb-2"
                    style={{ color: "oklch(0.22 0.07 250)" }}>{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3 flex-1">{item.desc}</p>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full self-start"
                    style={{ backgroundColor: "oklch(0.62 0.14 225 / 0.10)", color: "oklch(0.62 0.14 225)" }}>
                    {item.highlight}
                  </span>
                </div>
              ))}
            </div>
            {/* ── 7. CTA-Button (innerhalb der Prozess-Sektion) ──────────── */}
            <div className="mt-6 text-center">
              <Link href="/kontakt"
                className="inline-flex items-center gap-2 font-bold text-base px-8 py-4 rounded-lg text-white"
                style={{ backgroundColor: "oklch(0.62 0.14 225)" }}>
                {processCtaLabel}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. Drei Betreuungsmodelle (light, alle gleichwertig) ───────── */}
      <section className="kpx-section kpx-section-light">
        <div className="container max-w-5xl mx-auto">
          <div className="fade-in">
            <h2 className="section-heading text-center mb-4">
              Drei Betreuungsmodelle – passend zu Ihrem KMU
            </h2>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-8 text-center max-w-3xl mx-auto">
              Sie entscheiden, wie viel Verantwortung Sie abgeben moechten. Wir liefern auf
              allen drei Stufen die gleiche Qualitaet – mit Plattformen wie NinjaOne (RMM),
              SentinelOne (EDR) und unserem Schweizer Support-Stack. Alle Modelle sind gleichwertig.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {careModels.map((m) => {
                const Icon = m.icon;
                return (
                  <div key={m.id}
                    className="flex flex-col rounded-xl p-5"
                    style={{
                      backgroundColor: "white",
                      border: "1px solid oklch(0.91 0.01 220)",
                    }}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: "oklch(0.62 0.14 225 / 0.15)" }}>
                        <Icon className="w-4 h-4" style={{ color: "oklch(0.62 0.14 225)" }} />
                      </div>
                      <h3 className="font-bold text-base"
                        style={{ color: "oklch(0.22 0.07 250)" }}>{m.title}</h3>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed flex-1">{m.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. Infobalken + Context-Block (dunkel, TRENNELEMENT) ─────────
          - Heading + Sub-Heading
          - 3 Spalten Erklaertexte (SEO-Content)
          - 2-Spalten-Feature-Tabelle (NinjaOne / SentinelOne)
          - Quellen-Angabe mit echten <a href> Links
          - KEINE Empfehlung, KEIN direkter CTA
          - Siehe references/tone-voice.md §12. */}
      <section style={{ backgroundColor: "oklch(0.22 0.07 250)" }}>
        <div className="container">
          <div className="max-w-5xl mx-auto py-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white text-center mb-3">
              {contextBlock.heading}
            </h2>
            <p className="text-center text-sm md:text-base mb-8 max-w-3xl mx-auto"
              style={{ color: "oklch(0.82 0.04 220)" }}>
              {contextBlock.sub}
            </p>

            {/* Teil A: 3 Spalten Erklärungen (SEO-Content) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              {contextBlock.explanations.map((col, i) => (
                <div key={i} className="rounded-lg p-5"
                  style={{ backgroundColor: "oklch(0.28 0.07 250)",
                           border: "1px solid oklch(0.35 0.07 250)" }}>
                  <h3 className="font-bold text-base mb-2 text-white">{col.h3}</h3>
                  <p className="text-sm leading-relaxed"
                    style={{ color: "oklch(0.82 0.04 220)" }}
                    dangerouslySetInnerHTML={{ __html: col.text }} />
                </div>
              ))}
            </div>

            {/* Teil B: 2-Spalten-Feature-Tabelle (NinjaOne / SentinelOne) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {contextBlock.featureTables.map((table, i) => {
                const Icon = table.icon;
                return (
                  <div key={i} className="rounded-xl p-6"
                    style={{ backgroundColor: "oklch(0.28 0.07 250)",
                             border: "1px solid oklch(0.35 0.07 250)" }}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: "oklch(0.62 0.14 225 / 0.15)" }}>
                        <Icon className="w-4 h-4" style={{ color: "oklch(0.62 0.14 225)" }} />
                      </div>
                      <h3 className="font-bold text-base text-white">{table.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {table.items.map((feature) => (
                        <li key={feature} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5"
                            style={{ color: "oklch(0.72 0.18 145)" }} />
                          <span className="text-sm leading-relaxed"
                            style={{ color: "oklch(0.92 0.02 220)" }}>
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            {/* Teil C: Quellenangabe mit echten Links */}
            <p className="text-center text-xs" style={{ color: "oklch(0.65 0.04 220)" }}>
              <span className="font-semibold">Quellen:</span>{" "}
              {contextBlock.sources.map((s, i) => (
                <span key={s.href}>
                  {i > 0 && " · "}
                  <a href={s.href} target="_blank" rel="noopener noreferrer"
                    className="underline" style={{ color: "oklch(0.72 0.18 145)" }}>
                    {s.label}
                  </a>
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      {/* ── 10. Themen-FAQ (dunkel, native <details>) ──────────────────── */}
      <section className="kpx-section kpx-section-dark">
        <div className="container max-w-5xl mx-auto">
          <div className="fade-in">
            <h2 className="section-heading text-center mb-8" style={{ color: "white" }}>
              Haeufige Fragen zum Thema
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {faqs.map((faq, i) => (
                <details key={i} className="group rounded-lg border p-6"
                  style={{ borderColor: "oklch(0.35 0.07 250)", backgroundColor: "oklch(0.22 0.07 250)" }}>
                  <summary className="flex items-center justify-between cursor-pointer list-none font-semibold text-sm py-1"
                    style={{ color: "white" }}>
                    {faq.q}
                    <ChevronDown className="w-4 h-4 flex-shrink-0 ml-3 transition-transform group-open:rotate-180"
                      style={{ color: "oklch(0.72 0.18 145)" }} />
                  </summary>
                  <p className="text-sm leading-relaxed mt-3 pt-3"
                    style={{ color: "oklch(0.82 0.04 220)",
                             borderTop: "1px solid oklch(0.35 0.07 250)" }}>
                    {faq.a}
                  </p>
                  {faq.aLink && (
                    <p className="text-xs mt-2" style={{ color: "oklch(0.65 0.04 220)" }}>
                      <a href={faq.aLink.href} target="_blank" rel="noopener noreferrer" className="underline"
                        style={{ color: "oklch(0.72 0.18 145)" }}>
                        {faq.aLink.text}
                      </a>
                    </p>
                  )}
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. Störungen-Sektion / Managed Services Grid (light) ─────── */}
      <section className="kpx-section kpx-section-light">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="section-heading mb-2">
              Stoerungen erkennen wir, bevor sie Ihren Betrieb erreichen.
            </h2>
            <p className="text-xl font-medium" style={{ color: "oklch(0.45 0.05 250)" }}>
              Das sind die Managed Services, mit denen wir das sicherstellen
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
            {produkte.map((p) => (
              <a key={p.title} href={p.href}
                className="flex flex-col rounded-xl p-4 transition-all h-full hover:shadow-md"
                style={{ backgroundColor: "white", border: "1px solid oklch(0.91 0.01 220)", textDecoration: "none" }}>
                <div className="w-2 h-2 rounded-full mb-2" style={{ backgroundColor: "oklch(0.62 0.14 225)" }} />
                <p className="text-sm font-bold mb-1" style={{ color: "oklch(0.22 0.07 250)" }}>{p.title}</p>
                <p className="text-xs leading-relaxed mb-3 flex-1" style={{ color: "oklch(0.45 0.05 245)" }}>{p.desc}</p>
                <span className="text-xs font-semibold mt-auto" style={{ color: "oklch(0.62 0.14 225)" }}>Mehr erfahren →</span>
              </a>
            ))}
          </div>
          <div className="text-center mt-8">
            <a href="/managed-it-services" className="inline-flex items-center gap-2 text-base font-semibold"
              style={{ color: "oklch(0.62 0.14 225)" }}>
              Alle 17 Managed Services entdecken
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── 12. IT-Wissen Blog (white) ─────────────────────────────────── */}
      <section className="kpx-section bg-white">
        <div className="container">
          <div className="fade-in text-center mb-10">
            <h2 className="section-heading">{blogSectionTitle}</h2>
            <p className="section-subheading mt-2 mx-auto">{blogSectionSubTitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {(curatedPosts.length > 0 ? curatedPosts : latestPosts).map((post: any) => (
              <Link key={post.slug} href={`/it-wissen/${post.slug}`}
                className="group flex flex-col rounded-2xl border bg-white hover:shadow-md transition-all duration-200 overflow-hidden"
                style={{ borderColor: "oklch(0.9 0.01 220)" }}>
                <div className="h-1 w-full flex-shrink-0" style={{ backgroundColor: "oklch(0.62 0.14 225)" }} />
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: "oklch(0.62 0.14 225 / 0.1)", color: "oklch(0.62 0.14 225)" }}>
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.publishedAt).toLocaleDateString("de-CH", { day: "2-digit", month: "long", year: "numeric" })}
                    </span>
                  </div>
                  <h3 className="font-bold text-base leading-snug mb-2 group-hover:underline"
                    style={{ color: "oklch(0.22 0.07 250)" }}>
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs text-muted-foreground">{post.readingTimeMin} Min. Lesezeit</span>
                    <span className="flex items-center gap-1 text-xs font-semibold"
                      style={{ color: "oklch(0.62 0.14 225)" }}>
                      Lesen <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/it-wissen"
              className="flex items-center justify-center gap-2 text-sm font-semibold hover:opacity-70 transition-opacity"
              style={{ color: "oklch(0.62 0.14 225)" }}>
              Alle Artikel <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 13. Servicegebiet (light-grey) ──────────────────────────────── */}
      <section className="kpx-section" style={{ backgroundColor: "oklch(0.97 0.01 220)" }}>
        <div className="container">
          <div className="fade-in flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: "oklch(0.62 0.14 225)" }} />
              <div>
                <p className="font-bold text-sm mb-0.5" style={{ color: "oklch(0.22 0.07 250)" }}>Servicegebiet</p>
                <p className="text-sm font-semibold" style={{ color: "oklch(0.22 0.07 250)" }}>KPX AG</p>
                <p className="text-sm text-gray-500">Grindelstrasse 6, 8304 Wallisellen</p>
                <p className="text-sm text-gray-500">Kanton Zuerich, Schweiz</p>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600">
                Wir betreuen KMU in der ganzen Schweiz – remote und wenn noetig auch vor Ort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* KEINE Abschluss-CTA-Sektion mehr (Sektion 14 entfaellt).
          ServicePageFooter (im Layout eingebunden) uebernimmt den Schluss-CTA. */}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }} />
    </div>
  );
}
