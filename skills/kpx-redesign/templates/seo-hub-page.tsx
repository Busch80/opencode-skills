/**
 * Template für IT-Dienstleister / SEO-Hub / KMU-Cluster-Seiten
 * (Blaupause: /externe-it-abteilung und /it-outsourcing-kmu).
 *
 * Verwendung:
 *  1. Kopiere diese Datei nach app/<seo-cluster-route>/page.tsx
 *  2. Alle {SLOT} / TODO-Kommentare ersetzen.
 *  3. Wahl zwischen <ServiceModelArrowsFull /> (3 Modelle) und <ServiceModelArrows /> (2 Modelle)
 *     anhand In-Page-Anforderung. externe-it-abteilung nutzt Full.
 *  4. Statt Ratgeber-Artikel kann auch eine 4-Spalten-Checkliste (it-outsourcing-kmu-Stil) stehen — siehe §3.
 *  5. FAQ kann dark (native <details>) oder light (<FaqAccordion />) sein. Vorbild orientieren.
 *  6. `pnpm tsc --noEmit && pnpm lint` ausführen.
 *
 * Siehe Skill `kpx-redesign` References (design-tokens.md, section-rhythm.md, components.md, seo-schema.md, tone-voice.md).
 */

export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, CheckCircle2, ChevronDown, MapPin,
         Users, TrendingUp, Clock, Shield, Info, HardDrive /* , <...weitere lucide-icons...> */ } from "lucide-react";
import ServiceModelArrowsFull from "@/components/ServiceModelArrowsFull";
// alternativ: import ServiceModelArrows from "@/components/ServiceModelArrows";
import FaqAccordion from "@/components/FaqAccordion";   // für light-FAQ-Variante
import { getLatestPosts } from "@/lib/blogPosts";
// Falls local produkte-Alternative wie in it-outsourcing-kmu:
// const produkteLocal = [
//   { title, href, desc, icon }, // 6 Einträge
// ];

const PAGE_TITLE  = "<SEO-Title>: <Hauptkeyword> <Breadcrumb-Region/kmu> | KPX";
const PAGE_DESC   = "<140–160 Zeichen, Front-load Hauptkeyword, regionaler Bezug, konkreter Vorteil, CTA>";
const PAGE_PATH   = "/<seo-cluster-route>";        // kein Trailing-Slash
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
  "<Punkt 1>",
  "<Punkt 2>",
  "<Punkt 3>",
  "<Punkt 4>",
];

const introQuestion   = "<Frage an den Leser – z. B.: Brauchen Sie<body eine IT-Abteilung, ohne eine eigene aufzubauen?>";
const introSubline     = "<Subline – konkret, nicht fluff-ig>";

// Service-Modell-Abschnitt (3 Modelle wie externe-it-abteilung)
const serviceModelTitle = "<Heading – z. B.: 3 Wege zur externen IT-Abteilung – je nach Ihrem Bedarf>";

// Inhaltlicher Vergleich (Vergleichstabelle oder Karten)
const comparisonTitle   = "<Heading – z. B.: Eigene IT-Abteilung vs. KPX: Was passt zu Ihnen?>";
const comparisonCards: { name: string; pros: string[]; cons?: string[]; highlight?: boolean }[] = [
  // { name: "Eigene IT-Abteilung", pros: ["..."], cons: ["..."] },
  // { name: "Extern: KPX",         pros: ["..."], highlight: true },
];

// Ratgeber-Checkliste (alternativ zum langen <article>-Block)
const ratgeber: { heading: string; items: string[] }[] = [
  // { heading: "...", items: ["..."] }, // 3-4 Sektionen, je 6-10 Items
];
// Alternativ: <article> mit max-w-3xl, Absätzen, Zwischenüberschriften — Vorbild externe-it-abteilung

/* Sektion-6-Context-Block (Infobalken + SEO-Content + Feature-Tabelle + Quellen-Links).
   - 3 Spalten Erklaertexte (je 3-4 Saetze, ~90 Woerter pro Spalte)
   - 2-Spalten-Feature-Tabelle (NinjaOne / SentinelOne, je 6-8 Bullet-Items)
   - Quellen-Angabe mit echten <a href> Links
   - Faktenbasiert, keine Empfehlung, keine Verkaufsabsicht.
   - Schweizer Quellen mit Links. Siehe references/tone-voice.md §12. */
const contextBlock = {
  heading: "Allgemeine Informationen rund um <Thema – z. B. IT Outsourcing>",
  sub:     "Was <Thema-K1> ist, warum <Thema-K2> essenziell ist, ...",
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
    { label: "BACS / NCSC",         href: "https://www.ncsc.admin.ch/ncsc/de/home.html" },
    { label: "Microsoft MSRC",      href: "https://msrc.microsoft.com/update-guide" },
    { label: "Microsoft Lifecycle", href: "https://learn.microsoft.com/en-us/lifecycle/" },
    { label: "NinjaOne",            href: "https://www.ninjaone.com/" },
    { label: "SentinelOne",         href: "https://www.sentinelone.com/" },
  ],
};

const benefits: { title: string; desc: string }[] = [
  // 6 Benefits
];

type FaqItem = { question: string; answer: string; link?: { href: string; label: string } };
const faqs: FaqItem[] = [
  // 6–10 FAQs — keys "question"/"answer" für light FaqAccordion
];

const blogSectionTitle    = "IT-Wissen für Ihren Betrieb";
const blogSectionSubTitle = "<Subtext – z. B.: Verständlich erklärt: IT-Sicherheit, Cloud und Managed Services für Schweizer KMU.>";

/* ─────────────────────────── JSON-LD @graph ─────────────────────────── */

const schemaJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Startseite", "item": "https://kpx-it.ch" },
        // ggf. intermediate Cluster-Stufe
        { "@type": "ListItem", "position": 2, "name": "<Service-/Cluster-Name>", "item": PAGE_URL },
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": { "@type": "Answer", "text": f.answer },
      })),
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://kpx-it.ch/#organization",
      "name": "KPX AG",
      "url": "https://kpx-it.ch",
      "logo": "https://kpx-it.ch/kpx-logo.png",
      "image": "https://kpx-it.ch/og-image.png",
      "telephone": "+41445896955",
      "email": "info@kpx-it.ch",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Grindelstrasse 6",
        "addressLocality": "Wallisellen",
        "postalCode": "8304",
        "addressCountry": "CH",
      },
      "geo": { "@type": "GeoCoordinates", "latitude": 47.4135, "longitude": 8.5849 },
      "areaServed": [
        { "@type": "City", "name": "Zürich" },
        { "@type": "State", "name": "Kanton Zürich" },
        { "@type": "Country", "name": "Schweiz" },
      ],
      "priceRange": "$$",
    },
    {
      "@type": "Service",
      "name": "<Service-Name>/<Cluster>",
      "description": "<1-Satz-Beschreibung>",
      "provider": { "@id": "https://kpx-it.ch/#organization" },
      "areaServed": { "@type": "Country", "name": "Schweiz" },
      "serviceType": "IT-Dienstleistung",
    },
    {
      "@type": "WebPage",
      "isPartOf": { "@id": "https://kpx-it.ch/#website" },
      "url": PAGE_URL,
      "name": "<Seiten-Name>",
    },
  ],
};

/* ─────────────────────────── Komponente ─────────────────────────── */

export default function SeoHubPage() {
  const latestPosts = getLatestPosts(3);

  return (
    <div className="min-h-screen flex flex-col">

      {/* ── 1. Hero (dunkel) ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden"
        style={{ backgroundColor: "oklch(0.22 0.07 250)", minHeight: "520px" }}>
        <div className="container relative z-10"
          style={{ paddingTop: "calc(80px + 56px)", paddingBottom: "80px" }}>
          <nav className="flex items-center gap-2 text-xs mb-6"
            style={{ color: "oklch(0.62 0.14 225)" }}>
            <Link href="/" className="hover:underline" style={{ color: "oklch(0.72 0.08 225)" }}>Startseite</Link>
            <span style={{ color: "oklch(0.52 0.06 225)" }}>&#47;</span>
            <span style={{ color: "oklch(0.62 0.14 225)" }}><Aktuelle-Seite></span>
          </nav>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 text-white">
              <H1 Teil 1>
            </h1>
            <p className="text-base md:text-lg font-semibold mb-6"
              style={{ color: "oklch(0.82 0.04 220)" }}>
              <Hero-Subline>
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

      {/* ── 2. Stats-Bar ──────────────────────────────────────────────── */}
      {/* Regel: Stats-Bar IMMER 1:1 von der Startseite (app/page.tsx) übernehmen.
          Falls die Startseiten-Stats sich ändern, müssen alle Service- und Hub-Seiten
          nachgezogen werden. Siehe references/section-rhythm.md §2.2. */}
      <section className="py-8 bg-white" style={{ marginTop: "-1px" }}>
        <div className="container">
          <div className="stagger-children grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {/* TODO: Diese Stats 1:1 aus app/page.tsx übernehmen. */}
            {[
              { value: "20+", label: "Jahre IT-Praxis", icon: TrendingUp },
              { value: "Persönlich", label: "fester Ansprechpartner", icon: Users },
              { value: "DSG", label: "konforme IT-Services", icon: CheckCircle2 },
              { value: "Spezialisiert", label: "auf Schweizer KMU", icon: Clock },
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

      {/* ── 3. Service-Modell (light, max-w-5xl) ──────────────────────── */}
      <section className="kpx-section kpx-section-light">
        <div className="container max-w-5xl mx-auto">
          <div className="fade-in">
            <h2 className="section-heading text-center mb-8">{serviceModelTitle}</h2>
            <ServiceModelArrowsFull />
            {/* alternativ: <ServiceModelArrows /> */}
          </div>
        </div>
      </section>

      {/* ── 4. Intro-Frage (dunkel, Mini-CTA) ────────────────────────── */}
      <section className="py-10 md:py-12 kpx-section-dark">
        <div className="container max-w-5xl mx-auto text-center">
          <div className="fade-in">
            <h2 className="section-heading mb-3" style={{ color: "white" }}>{introQuestion}</h2>
            <p className="text-lg md:text-xl" style={{ color: "oklch(0.82 0.04 220)" }}>{introSubline}</p>
          </div>
        </div>
      </section>

      {/* ── 5. Vergleichstabelle / -karten (white) ────────────────────── */}
      <section className="kpx-section bg-white">
        <div className="container max-w-5xl mx-auto">
          <div className="fade-in">
            <h2 className="section-heading text-center mb-10">{comparisonTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {comparisonCards.map((card) => (
                <div key={card.name}
                  className={`rounded-xl p-8 ${card.highlight ? "border-2" : "border"}`}
                  style={{
                    backgroundColor: card.highlight ? "oklch(0.22 0.07 250)" : "white",
                    borderColor: card.highlight ? "oklch(0.62 0.14 225)" : "oklch(0.90 0.01 220)",
                    color: card.highlight ? "white" : "oklch(0.22 0.07 250)",
                  }}>
                  <h3 className="font-extrabold text-2xl mb-4">{card.name}</h3>
                  <ul className="space-y-2">
                    {card.pros.map((p) => (
                      <li key={p} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5"
                          style={{ color: card.highlight ? "oklch(0.72 0.18 145)" : "oklch(0.62 0.14 225)" }} />
                        <span className="text-base leading-relaxed"
                          style={{ color: card.highlight ? "oklch(0.90 0.03 220)" : "oklch(0.40 0.04 220)" }}>{p}</span>
                      </li>
                    ))}
                  </ul>
                  {card.cons && card.cons.length > 0 && (
                    <ul className="space-y-2 mt-4">
                      {card.cons.map((c) => (
                        <li key={c} className="flex items-start gap-3 text-base"
                          style={{ color: card.highlight ? "oklch(0.75 0.04 220)" : "oklch(0.55 0.04 220)" }}>
                          <span className="text-xl leading-none">–</span>
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. Infobalken + Context-Block (dunkel, TRENNELEMENT) ───────
          - 3 Spalten Erklaertexte + 2-Spalten-Feature-Tabelle + Quellen-Links
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

      {/* ── 7. Ratgeber-Checkliste / Artikel (light) ─────────────────── */}
      {/* Variante A: 3-4 Spalten Checkliste (it-outsourcing-kmu Stil) */}
      <section className="kpx-section kpx-section-light">
        <div className="container max-w-5xl mx-auto">
          <div className="fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {ratgeber.map((section, i) => (
                <div key={i}>
                  <h2 className="text-2xl md:text-3xl font-extrabold mb-4"
                    style={{ color: "oklch(0.22 0.07 250)" }}>{section.heading}</h2>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-base"
                        style={{ color: "oklch(0.40 0.04 220)" }}>
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5"
                          style={{ color: "oklch(0.62 0.14 225)" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Alternativ Variante B: <article max-w-3xl>, Absätze + Zwischenüberschriften
        <section className="kpx-section kpx-section-light">
          <div className="container max-w-3xl mx-auto">
            <article className="prose prose-lg">
              <h2>...</h2>
              <p>...</p>
            </article>
          </div>
        </section>
      */}

      {/* ── 8. Benefits nummeriert (dunkel) ────────────────────────── */}
      <section className="kpx-section kpx-section-dark">
        <div className="container max-w-5xl mx-auto">
          <div className="fade-in">
            <h2 className="section-heading text-center mb-8" style={{ color: "white" }}>
              <Benefits-Heading>
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 font-bold text-sm text-white"
                    style={{ backgroundColor: "oklch(0.62 0.14 225)" }}>
                    {i + 1}
                  </div>
                  <div className="pt-1">
                    <p className="font-semibold text-sm mb-0.5" style={{ color: "white" }}>{benefit.title}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "oklch(0.90 0.03 220)" }}>{benefit.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 9. FAQ (light via FaqAccordion) ──────────────────────────── */}
      <section className="kpx-section kpx-section-light">
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          }),
        }} />
        <div className="container">
          <div className="fade-in text-center mb-10">
            <h2 className="section-heading"><FAQ-Heading – z.B.: Häufige Fragen zum IT Outsourcing für KMU></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FaqAccordion items={faqs.slice(0, Math.ceil(faqs.length / 2))} />
            <FaqAccordion items={faqs.slice(Math.ceil(faqs.length / 2))} />
          </div>
        </div>
      </section>

      {/* Alternativ: FAQ dark (native <details>) — siehe managed-service-page.tsx Sektion 12 */}

      {/* ── 10. IT-Wissen Blog (white) ────────────────────────────────── */}
      <section className="kpx-section bg-white">
        <div className="container">
          <div className="fade-in text-center mb-10">
            <h2 className="section-heading">{blogSectionTitle}</h2>
            <p className="section-subheading mt-2 mx-auto">{blogSectionSubTitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestPosts.map((post) => (
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

      {/* ── 11. Servicegebiet (light-grey) ────────────────────────────── */}
      <section className="kpx-section" style={{ backgroundColor: "oklch(0.97 0.01 220)" }}>
        <div className="container">
          <div className="fade-in flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: "oklch(0.62 0.14 225)" }} />
              <div>
                <p className="font-bold text-sm mb-0.5" style={{ color: "oklch(0.22 0.07 250)" }}>Servicegebiet</p>
                <p className="text-sm font-semibold" style={{ color: "oklch(0.22 0.07 250)" }}>KPX AG</p>
                <p className="text-sm text-gray-500">Grindelstrasse 6, 8304 Wallisellen</p>
                <p className="text-sm text-gray-500">Kanton Zürich, Schweiz</p>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600">
                Wir betreuen KMU in der ganzen Schweiz – remote und wenn nötig auch vor Ort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* KEINE Abschluss-CTA-Sektion mehr.
          ServicePageFooter (im Layout eingebunden) uebernimmt den Schluss-CTA. */}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }} />
    </div>
  );
}