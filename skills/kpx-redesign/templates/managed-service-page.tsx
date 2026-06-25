/**
 * Master-Template für Managed-IT-Services-Subpages (Blaupause: /managed-it-services/backup).
 *
 * Verwendung:
 *  1. Kopiere diese Datei nach app/<managed-it-services>/<slug>/page.tsx
 *  2. Alle {SLOT} / TODO-Kommentare ersetzen.
 *  3. Page-spezifische Grafik-Komponente statt <ServiceModelArrows /> einsetzen, falls passend.
 *  4. `pnpm tsc --noEmit && pnpm lint` ausführen.
 *
 * Siehe Skill `kpx-redesign` References:
 *   - design-tokens.md   (oklch Farben, Helper-Klassen)
 *   - section-rhythm.md  (15-Sektionen-Rhythmus, kanonische Werte)
 *   - components.md       (Komponenten-Snippets)
 *   - seo-schema.md      (Metadata + JSON-LD @graph)
 *   - tone-voice.md      (de-CH Regeln)
 */

export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, CheckCircle2, ChevronDown, MapPin, Phone,
         TrendingUp, Users, Clock, Shield /* , <...weitere lucide-icons...> */ } from "lucide-react";
// import <PageSpecificDiagram> from "@/components/<PageSpecificDiagram>";   // z. B. BackupDiagram
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
  "<Punkt 1 – z. B.spam: 3 Kopien – 2 Medien – 1 ausgelagerter Standort>",
  "<Punkt 2 – z. B.: 1 davon unveränderlich (Verschlüsselungsschutz)>",
  "<Punkt 3 – z. B.: Aktiv durch KPX überwacht und geprüft>",
  "<Punkt 4 – z. B.: Datenhaltung in der Schweiz – DSG-konform>",
];

const ctaIntroText = "<Frage an den Leser / Schmerzpunkt – z. B.: Wie gut ist Ihre Datensicherung wirklich aufgestellt?>";
const ctaIntroSub  = "<Subline – z. B.: Wir analysieren Ihre aktuelle Backup-Situation – gratis und unverbindlich.>";

const stepProcess: { step: string; title: string; desc: string; highlight: string }[] = [
  { step: "01", title: "Gratis Erstgespräch",      desc: "<2–3 Sätze – was passiert in diesem Schritt>", highlight: "Gratis" },
  { step: "02", title: "Erstanalyse",             desc: "<2–3 Sätze>", highlight: "Individuell" },
  { step: "03", title: "Persönliche Offerte",      desc: "<2–3 Sätze — enthält: 'Was drin steht, gilt.'>", highlight: "Transparent kalkuliert" },
  { step: "04", title: "Vollständig betreut",      desc: "<2–3 Sätze>", highlight: "Proaktiv" }, // oder "Aktiv betreut"
];
const processCtaLabel = "<CTA-Label – z. B.: Gratis Backup-Analyse anfordern>";

const infobalkenTitle = "Allgemeine Informationen rund um das Thema <Thema – z. B. Datensicherung>";

const immutableFeatures: { icon: any; title: string; desc: string }[] = [
  // { icon: Lock,  title: "...", desc: "..." },
  // { icon: Shield, title: "...", desc: "..." },
  // { icon: RefreshCw, title: "...", desc: "..." },
  // { icon: CheckCircle2, title: "...", desc: "..." },
];
const immutableSectionTitle = "<Eigenschafts-Block-Heading — z. B.: Immutable Backup – Ihr Schutz vor Ransomware>";
const immutableSectionIntro  = "<Einleitung 2–4 Sätze>";

const benefits: { title: string; desc: string }[] = [
  // 6 empfohlen
  // { title: "Vollautomatisch", desc: "..." },
];
const benefitsHeading = "<Vorteile-Heading – z. B.: Datensicherung für KMU in der Schweiz – was Sie davon haben>";

const featureListHeading = "<Feature-List-Heading – z. B.: Was unsere <Service>-Lösung leistet>";
const featureListIntro   = "<Einleitung 1–2 Sätze>";
const backupFeatures: string[] = [
  // 8–12 konkrete Feature-Strings
];

const whatWeSecureHeading = "<Was wir sichern/leisten-Heading – z. B.: Welche Systeme und Daten sichern wir?>";
const whatWeSecureIntro   = "<Einleitung 1–2 Sätze>";
const whatWeSecureItems: string[] = [
  // 8 konkrete Einsatz-Items
];

type FaqItem = { q: string; a: string; aLink?: { text: string; href: string } };
const faqs: FaqItem[] = [
  // { q: "Was kostet ... für ein KMU in der Schweiz?", a: "..." },
  // 6–10 FAQs typisch, max 12
];

const blogSectionTitle    = "IT-Wissen zum Thema";
const blogSectionSubTitle = "<Subtext – z. B.: Verständlich erklärt: Datensicherung, Ransomware-Schutz und Business Continuity für Schweizer KMU.>";

// Alternativ zur getLatestPosts-Form: kuratierte 4 Inline-Posts (siehe components.md §13)
// const curatedPosts = [ { slug, category, publishedAt, title, excerpt, readingTimeMin }, ...4 ];
const curatedPosts: { slug: string; category: string; publishedAt: string;
                      title: string; excerpt: string; readingTimeMin: number }[] = [
  // thematisch zur Seite passend, 4 Einträge
];

/* ─────────────────────────── JSON-LD @graph ──────────────────────────── */

const schemaJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Startseite",         "item": "https://kpx-it.ch" },
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
      "description": "<1-Satz-Beschreibung für Schema — z. B.: Vollautomatische, regelmässig geprüfte Datensicherung nach 3-2-1-Prinzip für KMU in der Schweiz. Ransomware-Schutz durch Immutable Backups und kurze Wiederherstellungszeiten.>",
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
              <Hero-Untertitel — 2 Sätze>
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

      {/* ── 3. Grafik / Diagramm (light) ─────────────────────────────── */}
      <section className="kpx-section kpx-section-light">
        <div className="container max-w-5xl mx-auto">
          <div className="fade-in">
            <h2 className="section-heading text-center mb-8"><Grafik-Heading – z. B.: Das 3-2-1-1-Prinzip – so sichern wir Ihre Daten></h2>
            {/* <PageSpecificDiagram /> – falls passende Komponente existiert; sonst icon-basiertes Grid */}
            {/* Beispielsweise <ServiceModelArrows /> oder inline Icon-Grid wie immutableFeatures */}
            <p className="text-sm text-gray-600 leading-relaxed text-center max-w-2xl mx-auto">
              <Optionaler Erklärungstext zur Grafik>
            </p>
          </div>
        </div>
      </section>

      {/* ── 4. CTA-Intro (dunkel) ────────────────────────────────────── */}
      <section className="py-10 md:py-12 kpx-section-dark">
        <div className="container max-w-5xl mx-auto text-center">
          <div className="fade-in">
            <h2 className="section-heading mb-3" style={{ color: "white" }}>{ctaIntroText}</h2>
            <p className="text-lg md:text-xl" style={{ color: "oklch(0.82 0.04 220)" }}>{ctaIntroSub}</p>
          </div>
        </div>
      </section>

      {/* ── 5. 4 Schritte (white) ────────────────────────────────────── */}
      <section className="kpx-section bg-white">
        <div className="container max-w-5xl mx-auto">
          <div className="fade-in">
            <h2 className="section-heading text-center mb-10"><Vom ersten Gespräch zur zuverlässigen <Topic>></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {stepProcess.map((item) => (
                <div key={item.step} className="rounded-xl p-5 border border-gray-200 bg-white flex flex-col">
                  <div className="text-4xl font-extrabold mb-3 leading-none"
                    style={{ color: "oklch(0.62 0.14 225 / 0.15)" }}>
                    {item.step}
                  </div>
                  <h3 className="font-bold text-base mb-2" style={{ color: "oklch(0.22 0.07 250)" }}>{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3 flex-1">{item.desc}</p>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full self-start"
                    style={{ backgroundColor: "oklch(0.62 0.14 225 / 0.10)", color: "oklch(0.62 0.14 225)" }}>
                    {item.highlight}
                  </span>
                </div>
              ))}
            </div>
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

      {/* ── 6. Infobalken (dunkel) ───────────────────────────────────── */}
      <div style={{ backgroundColor: "oklch(0.22 0.07 250)" }}>
        <div className="container">
          <div className="max-w-5xl mx-auto py-5">
            <p className="text-white text-xl md:text-2xl font-bold text-center">{infobalkenTitle}</p>
          </div>
        </div>
      </div>

      {/* ── 7. Eigenschaften (light) ──────────────────────────────────── */}
      <section className="kpx-section kpx-section-light">
        <div className="container max-w-5xl mx-auto">
          <div className="fade-in">
            <h2 className="section-heading text-center mb-6">{immutableSectionTitle}</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-6">{immutableSectionIntro}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {immutableFeatures.map((f, i) => {
                const Icon = f.icon;
                return (
                  <div key={i} className="flex items-start gap-4 p-4 rounded-lg"
                    style={{ backgroundColor: "oklch(0.96 0.008 220)" }}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: "oklch(0.62 0.14 225 / 0.15)" }}>
                      <Icon className="w-4 h-4" style={{ color: "oklch(0.62 0.14 225)" }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-1" style={{ color: "oklch(0.22 0.07 250)" }}>{f.title}</h3>
                      <p className="text-xs text-gray-600 leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. Benefits nummeriert (dunkel) ─────────────────────────── */}
      <section className="kpx-section kpx-section-dark">
        <div className="container max-w-5xl mx-auto">
          <div className="fade-in">
            <h2 className="section-heading text-center mb-8" style={{ color: "white" }}>{benefitsHeading}</h2>
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

      {/* ── 9. Feature-Liste (white) ─────────────────────────────────── */}
      <section className="kpx-section bg-white">
        <div className="container max-w-5xl mx-auto">
          <div className="fade-in">
            <h2 className="section-heading text-center mb-6">{featureListHeading}</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-5">{featureListIntro}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {backupFeatures.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "oklch(0.62 0.14 225)" }} />
                  <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. Was wir sichern (light) ─────────────────────────────────── */}
      <section className="kpx-section kpx-section-light">
        <div className="container max-w-5xl mx-auto">
          <div className="fade-in">
            <h2 className="section-heading text-center mb-6">{whatWeSecureHeading}</h2>
            <p className="text-sm text-gray-600 leading-relaxed mb-5">{whatWeSecureIntro}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {whatWeSecureItems.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "oklch(0.62 0.14 225)" }} />
                  <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. Managed Services Grid (light) ─────────────────────────── */}
      <section className="kpx-section kpx-section-light">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="section-heading mb-2">Störungen erkennen wir, bevor sie Ihren Betrieb erreichen.</h2>
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

      {/* ── 12. FAQ (dunkel, native <details>) ─────────────────────────── */}
      <section className="kpx-section kpx-section-dark">
        <div className="container max-w-5xl mx-auto">
          <div className="fade-in">
            <h2 className="section-heading text-center mb-8" style={{ color: "white" }}>Häufige Fragen</h2>
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
                    style={{ color: "oklch(0.82 0.04 220)", borderTop: "1px solid oklch(0.35 0.07 250)" }}>
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

      {/* ── 13. IT-Wissen Blog (white) ─────────────────────────────────── */}
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

      {/* ── 14. Servicegebiet (light-grey) ──────────────────────────────── */}
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

      {/* ── 15. Abschluss-CTA (dunkel) ────────────────────────────────── */}
      <section style={{ backgroundColor: "oklch(0.22 0.07 250)", borderTop: "3px solid oklch(0.62 0.14 225)" }}
        className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Ihre IT in zuverlässigen Händen.
            </h2>
            <p className="text-lg mb-8" style={{ color: "oklch(0.82 0.04 220)" }}>
              Lernen Sie uns in einem unverbindlichen Erstgespräch kennen. Wir hören zu,
              analysieren und zeigen Ihnen ehrlich, wo wir Ihnen helfen können.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/kontakt"
                className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-3 rounded-lg transition-all duration-200 text-base"
                style={{ backgroundColor: "oklch(0.62 0.14 225)", color: "white" }}>
                Ihre individuelle Erstanalyse
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:0445896955"
                className="inline-flex items-center justify-center gap-2 font-semibold px-8 py-3 rounded-lg transition-all duration-200 text-base border-2"
                style={{ borderColor: "oklch(0.62 0.14 225)", color: "oklch(0.62 0.14 225)", backgroundColor: "transparent" }}>
                <Phone className="w-5 h-5" /> 044 589 695 5
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Optional: Service-Page-Footer-Karussell
      <ServicePageFooter currentServiceId="<slug>" />
      */}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }} />
    </div>
  );
}