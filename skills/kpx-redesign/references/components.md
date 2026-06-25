# Komponenten — KPX Redesign

Wiederkehrende Blöcke mit Snippets, die in Seiten verwendet werden. Komponenten-Importe vorziehen (Komponente existiert) vor Inline-Snippets.

## Import-Fundus

| Symbol | Pfad | Zweck |
|---|---|---|
| `FaqAccordion` | `@/components/FaqAccordion` | Light-FAQ-Accordion ("use client", 2-spaltig genutzt) |
| `ServicegebietBlock` | `@/components/ServicegebietBlock` | Vollständige Servicegebiet-Sektion mit SVG-Karte |
| `ServiceModelArrows` | `@/components/ServiceModelArrows` | 2-Modell-Pfeildiagramm (it-outsourcing-kmu) |
| `ServiceModelArrowsFull` | `@/components/ServiceModelArrowsFull` | 3-Modell-Pfeildiagramm (externe-it-abteilung) |
| `ServicePageFooter` | `@/components/ServicePageFooter` | Footer-Karussell für Managed-Services-Subpages + `ServiceBadges` |
| `KiPageFooter` | `@/components/KiPageFooter` | Footer für KI-Lösungsseiten (statt `ServicePageFooter`) |
| `BranchenTabs` | `@/components/BranchenTabs` | Branchen-Tabs (nur Startseite) |
| `PartnerSlider` | `@/components/PartnerSlider` | Partnerlogos-Slider (nur Startseite) |
| `HeroSlider` | `@/components/HeroSlider` | Hero-Slider variante |
| `BackupDiagram` | `@/components/BackupDiagram` | Visualisierung 3-2-1-1-Prinzip (nur `/managed-it-services/backup`) |
| `getLatestPosts`, `getBlogPostBySlug`, `getBlogPostsByCategory`, `blogCategories`, `BlogPost` type | `@/lib/blogPosts` | Blog-Daten |
| `produkte` | `@/app/data/produkte` | 6 zentrale Managed Services für das Services-Grid |
| `serviceModelData` | `@/components/serviceModelData` | Datenquelle für `ServiceModelArrows`/`Full` (enthält noch Hex-Werte; siehe design-tokens.md §8) |

## Icons (lucide-react)

```tsx
import { ArrowRight, Calendar, CheckCircle2, ChevronDown, ChevronRight,
         MapPin, HardDrive, Phone, Shield, Database, Lock, RefreshCw, Cloud,
         TrendingUp, Users, Clock, Server, Cpu, Flame } from "lucide-react";
```

Zwei semantische Icon-Farben:
- **Grün (positiv/verifiziert):** `oklch(0.72 0.18 145)` — nur für `CheckCircle2` in Hero-2x2-Grid und FAQ-dark `ChevronDown`.
- **Cyan:** `oklch(0.62 0.14 225)` — alle anderen Icons, Feature-Checklists `CheckCircle2`, Badges, Links.

---

## 1. Hero

### Standard-Hero (Backup-Subpages, externe-it-abteilung, it-outsourcing-kmu)

```tsx
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
      <span style={{ color: "oklch(0.62 0.14 225)" }}>Managed Backup</span>
    </nav>
    <div className="max-w-3xl">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 text-white">
        Datensicherung für KMU –<br />Managed Backup Schweiz
      </h1>
      <p className="text-base md:text-lg font-semibold mb-6"
        style={{ color: "oklch(0.82 0.04 220)" }}>
        Vollautomatische Datensicherung nach der 3-2-1-1-Strategie – mit Immutable Storage und aktivem Monitoring durch KPX.
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
```

### Startseiten-Hero (Spezial)

Zusätzlich zum Standard:
- Hintergrund-Div mit `backgroundImage`, `backgroundSize: "cover"`, `backgroundPosition: "65% center"`, `opacity: 0.75`.
- Overlay: `linear-gradient(to right, oklch(0.22 0.07 250 / 0.97) 0%, oklch(0.22 0.07 250 / 0.30) 100%)`.
- Badge-Pill mit `animate-pulse`-Dot oben vor H1.
- Optional `<HeroSlider />` statt statischer Hero.

---

## 2. Stats-Bar

```tsx
<section className="py-8 bg-white" style={{ marginTop: '-1px' }}>
  <div className="container">
    <div className="stagger-children grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
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
```

Wortwörtlich identisch auf allen 4 Referenzseiten. `marginTop: '-1px'` schliesst an die Wellen-SVG an.

---

## 3. Infobalken

```tsx
<div style={{ backgroundColor: "oklch(0.22 0.07 250)" }}>
  <div className="container">
    <div className="max-w-5xl mx-auto py-5">
      <p className="text-white text-xl md:text-2xl font-bold text-center">
        Allgemeine Informationen rund um das Thema Datensicherung
      </p>
    </div>
  </div>
</div>
```

Thema-Namen anpassen („Datensicherung", „IT Outsourcing", …). Immer vor der längsten inhaltlichen Sektion der Seite.

---

## 4. CTA-Intro (dunkel, Mini-CTA)

```tsx
<section className="py-10 md:py-12 kpx-section-dark">
  <div className="container max-w-5xl mx-auto text-center">
    <div className="fade-in">
      <h2 className="section-heading mb-3" style={{ color: "white" }}>
        Wie gut ist Ihre Datensicherung wirklich aufgestellt?
      </h2>
      <p className="text-lg md:text-xl" style={{ color: "oklch(0.82 0.04 220)" }}>
        Wir analysieren Ihre aktuelle Backup-Situation – gratis und unverbindlich.
      </p>
    </div>
  </div>
</section>
```

Verbindung zwischen Grafik-Sektion und Prozess-Schritten. Text page-spezifisch.

---

## 5. Prozess-Schritte (4 Karten)

```tsx
<section className="kpx-section bg-white">
  <div className="container max-w-5xl mx-auto">
    <div className="fade-in">
      <h2 className="section-heading text-center mb-10">Vom ersten Gespräch zur zuverlässigen Datensicherung</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { step: "01", title: "Gratis Erstgespräch", desc: "Sie schildern uns Ihre Situation. Wir hören zu und fragen nach. So verstehen wir, welche Daten für Sie kritisch sind.", highlight: "Gratis" },
          { step: "02", title: "Backup-Analyse", desc: "Wir schauen uns Ihre bestehende Datensicherung genau an und zeigen Ihnen klar, was heute schon funktioniert – und wo Ihre Daten im Ernstfall gefährdet sind.", highlight: "Individuell" },
          { step: "03", title: "Persönliche Offerte", desc: "Sie erhalten eine auf Ihre Daten und Systeme zugeschnittene Offerte – ohne Kleingedrucktes. Was drin steht, gilt. Sie entscheiden in aller Ruhe.", highlight: "Transparent kalkuliert" },
          { step: "04", title: "Vollständig gesichert", desc: "Wir richten Ihre Backup-Lösung ein und überwachen sie täglich – damit Sie im Ernstfall keine böse Überraschung erleben.", highlight: "Aktiv betreut" },
        ].map((item) => (
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
        <Link href="/kontakt" className="inline-flex items-center gap-2 font-bold text-base px-8 py-4 rounded-lg text-white"
          style={{ backgroundColor: "oklch(0.62 0.14 225)" }}>
          Gratis Backup-Analyse anfordern
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  </div>
</section>
```

Titel (`01..04`) und Highlight-Badge konstant (siehe `section-rhythm.md §2.1`). Page-spezifisch nur die Step-Titel-Texte und CTA-Button-Label.

---

## 6. Benefits-Liste (nummeriert, dunkel)

```tsx
<section className="kpx-section kpx-section-dark">
  <div className="container max-w-5xl mx-auto">
    <div className="fade-in">
      <h2 className="section-heading text-center mb-8" style={{ color: "white" }}>
        Datensicherung für KMU in der Schweiz – was Sie davon haben
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
```

6 Benefits empfohlen (Backup-Seite: exakt 6).

---

## 7. Eigenschaften / Immutable (Icon-Kachel, light)

```tsx
<section className="kpx-section kpx-section-light">
  <div className="container max-w-5xl mx-auto">
    <div className="fade-in">
      <h2 className="section-heading text-center mb-6">Immutable Backup – Ihr Schutz vor Ransomware</h2>
      <p className="text-sm text-gray-600 leading-relaxed mb-6">
        Ransomware kann normale Backups verschlüsseln oder löschen. Immutable Backups verhindern das. …
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {features.map((f, i) => {
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
```

Icon-Kachel-HG: `oklch(0.62 0.14 225 / 0.15)`. Icon-Farbe cyan. 4 Karten typisch.

---

## 8. Feature-Checkliste (cyan, white)

```tsx
<section className="kpx-section bg-white">
  <div className="container max-w-5xl mx-auto">
    <div className="fade-in">
      <h2 className="section-heading text-center mb-6">Was unsere Backup-Lösung leistet</h2>
      <p className="text-sm text-gray-600 leading-relaxed mb-5">Einleitungstext…</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {features.map((feature, i) => (
          <div key={i} className="flex items-start gap-3">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "oklch(0.62 0.14 225)" }} />
            <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
```

8-12 Features typisch. Cyan (nicht grün) `CheckCircle2` — das ist die „Wichtig, eine zutreffende Eigenschaft"-Farbe, nicht „positiv verifiziert".

---

## 9. Managed Services-Grid

```tsx
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
          <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
        </svg>
      </a>
    </div>
  </div>
</section>
```

`produkte` aus `@/app/data/produkte` (6 Einträge). Seiten wie `it-outsourcing-kmu` definieren ein lokales Array mit anderen hrefs (`/managed-it-services/endpoint` etc.) — dort der lokalen Variante folgen.

---

## 10. FAQ — Light-Variante (`<FaqAccordion />`)

```tsx
<section className="kpx-section kpx-section-light">
  <script type="application/ld+json" dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question", name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    }),
  }} />
  <div className="container">
    <div className="fade-in text-center mb-10">
      <h2 className="section-heading">Häufige Fragen zum IT Outsourcing für KMU</h2>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FaqAccordion items={faqs.slice(0, Math.ceil(faqs.length / 2))} />
      <FaqAccordion items={faqs.slice(Math.ceil(faqs.length / 2))} />
    </div>
  </div>
</section>
```

`FaqItem`-Shape (aus `@/lib/blogPosts`): `{ question: string; answer: string; link?: { href: string; label: string } }`.

---

## 11. FAQ — Dark-Variante (native `<details>`)

```tsx
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
          </details>
        ))}
      </div>
    </div>
  </div>
</section>
```

Dark-FAQ-Keys sind `q`/`a` (nicht `question`/`answer`!). Chevron grün. Sowohl `FAQPage`-JSON-LD einbetten (siehe `seo-schema.md`) als auch dark-Render verwenden — beides parallel.

---

## 12. IT-Wissen Blog — Form A (3 aktuelle Posts)

```tsx
const latestPosts = getLatestPosts(3);
// …
<section className="kpx-section bg-white">
  <div className="container">
    <div className="fade-in text-center mb-10">
      <h2 className="section-heading">IT-Wissen für Ihren Betrieb</h2>
      <p className="section-subheading mt-2 mx-auto">
        Verständlich erklärt: IT-Sicherheit, Cloud und Managed Services für Schweizer KMU.
      </p>
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
            <h3 className="font-bold text-base leading-snug mb-2 group-hover:underline" style={{ color: "oklch(0.22 0.07 250)" }}>
              {post.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-1">{post.excerpt}</p>
            <div className="flex items-center justify-between mt-auto">
              <span className="text-xs text-muted-foreground">{post.readingTimeMin} Min. Lesezeit</span>
              <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: "oklch(0.62 0.14 225)" }}>
                Lesen <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
    <div className="text-center mt-8">
      <Link href="/it-wissen" className="flex items-center justify-center gap-2 text-sm font-semibold hover:opacity-70 transition-opacity"
        style={{ color: "oklch(0.62 0.14 225)" }}>
        Alle Artikel <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  </div>
</section>
```

---

## 13. IT-Wissen Blog — Form B (4 kuratierte Inline-Posts)

Wie Form A, aber:
- `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`
- Statt `latestPosts.map` ein lokales Array mit 4 handverlesenen Posts:

```tsx
const curatedPosts = [
  { slug: "...", category: "...", publishedAt: "2026-01-08", title: "...", excerpt: "...", readingTimeMin: 9 },
  // …4 Einträge, thematisch zur Seite passend
];
```

Nur einsetzen, wenn gezielt thematisch passende Artikel statt der 3 neuesten gezeigt werden sollen. Subsubheading kann `whiteSpace: "nowrap"` bekommen (it-outsourcing-kmu tut das).

---

## 14. Servicegebiet — Inline minimal

```tsx
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
        <p className="text-sm text-gray-600">Wir betreuen KMU in der ganzen Schweiz – remote und wenn nötig auch vor Ort.</p>
      </div>
    </div>
  </div>
</section>
```

---

## 15. Servicegebiet — Voll `<ServicegebietBlock />`

Reichhaltiger: SVG-Karte mit Regionenpunkten, Direktkontakt-Box, Region-Tags (Zürich Stadt, Zürich Nord, Glattal, Winterthur, Zug, Aargau, Schweizweit remote), Erreichbarkeit (Car/Train/Plane). Für SEO-Hub-Seiten, die Regionalität betonen wollen.

```tsx
<ServicegebietBlock />
```

---

## 16. Final-CTA (dunkel)

Siehe `section-rhythm.md §5`. Kanonischer Text und Buttons dort dokumentiert.

---

## 17. ServicePageFooter (nur für `managed-it-services/*`)

Horizontal-Karussell von 8 Services mit aktuellem hervorgehoben, plus dunkles CTA-Banner mit 3 Badges (SLA / CH / Wallisellen).

```tsx
import ServicePageFooter, { ServiceBadges } from "@/components/ServicePageFooter";

<ServicePageFooter currentServiceId="backup" />
// oder nur Badges:
<ServiceBadges />
```

Position: direkt nach Final-CTA, vor `</div>`-Root-Wrapper der Seite.

---

## 18. Mini-Regeln fürs Komponenten-Bauen

- **Nicht duplizieren.** Existiert die Komponente (`FaqAccordion`, `ServicegebietBlock`, `ServiceModelArrowsFull`), importiere sie — nicht nachbauen.
- **Always export `dynamic`** — `export const dynamic = "force-dynamic";` oben in jeder Seite (~alle Referenzseiten machen das). Ausnahme `it-outsourcing-kmu` nutzt `"force-static"`.
- **`produkte`-Datenhaltung:** zentrales Array in `@/app/data/produkte` (6 Einträge). Falls Sidebar mit erweiterten Services gebraucht wird, `ServicePageFooter`'s `ALL_SERVICES` nutzen.
- **Kein CSS-In-JS-Framework** (styled-components etc.). Inline-`style` + Tailwind-Utility + `kpx-*`-Klassen — genauso wie Referenzseiten.
- **Keine nouveaues Komponente erstellen** für einen einmaligen Block. Lieber inline direkt in der Seite mit Snippet aus dieser Datei.