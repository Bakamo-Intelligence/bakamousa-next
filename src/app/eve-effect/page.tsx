import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import Link from "next/link";
import { BOOKING_HREF } from "@/lib/booking";
import { ORGANIZATION_REF, pageOpenGraph } from "@/lib/seo";
import { SITE_URL } from "@/lib/site-url";
import Journey from "./Journey";
import {
  BEYOND,
  CCP_DID,
  CLAIM,
  CLIENT,
  CLOSE,
  DESCRIPTION,
  FRONT_LEAD,
  HILMAR_QUOTE,
  METHOD,
  PAGE_PATH,
  QUESTION,
  SKILLS,
  SURVEY_NOTE,
  SURVEY_STATS,
  TITLE,
  VOICES,
} from "./content";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

// Reachable by link and by search, but not listed in the sitemap or linked
// from any other page. See content.ts for the sources and the limits.
export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PAGE_PATH },
  openGraph: { ...pageOpenGraph(PAGE_PATH, `${TITLE} | Bakamo`, DESCRIPTION), type: "article" },
};

const ARTICLE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${PAGE_URL}#article`,
  headline: TITLE,
  description: DESCRIPTION,
  url: PAGE_URL,
  mainEntityOfPage: PAGE_URL,
  image: `${PAGE_URL}/opengraph-image`,
  inLanguage: "en",
  author: ORGANIZATION_REF,
  publisher: ORGANIZATION_REF,
  about: { "@type": "VideoGame", name: "EVE Online", url: "https://www.eveonline.com" },
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs uppercase tracking-[0.2em] text-accent">{children}</p>;
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className={`${cormorant.className} mt-4 text-4xl leading-tight text-white md:text-6xl`}>{children}</h2>;
}

function H3({ children }: { children: React.ReactNode }) {
  return <h3 className={`${cormorant.className} text-2xl leading-tight text-white md:text-3xl`}>{children}</h3>;
}

function Prose({ paragraphs, className = "" }: { paragraphs: string[]; className?: string }) {
  return (
    <div className={`space-y-5 text-lg font-light leading-relaxed text-text-secondary ${className}`}>
      {paragraphs.map((p) => (
        <p key={p}>{p}</p>
      ))}
    </div>
  );
}

export default function EveEffectPage() {
  return (
    <main className="relative min-h-screen w-full bg-near-black text-text-primary">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <div className="grain-overlay" />

      {/* Front */}
      <section
        id="front"
        className="relative isolate overflow-hidden px-6 pb-16 pt-32 md:pb-24 md:pt-44"
        data-analytics-section="eve_front"
        data-analytics-label="EVE Effect Front"
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_15%,rgba(201,169,110,0.14),transparent_40%)]" />
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center gap-4">
            <span className="rounded-full border border-accent/30 px-4 py-1 text-xs uppercase tracking-[0.22em] text-accent">
              The EVE Effect
            </span>
            <span className="text-xs uppercase tracking-[0.16em] text-text-muted">
              Research for {CLIENT} &middot; 2019 to 2020
            </span>
          </div>
          <h1
            className={`${cormorant.className} mt-8 max-w-5xl text-[clamp(3rem,7vw,6.5rem)] leading-[0.92] tracking-tight text-white`}
          >
            {CLAIM}
          </h1>
          <div className="mt-10 h-px w-16 bg-accent" />
          <Prose paragraphs={FRONT_LEAD} className="mt-10 max-w-3xl text-xl" />
        </div>
      </section>

      {/* Survey figures and the Hilmar quote */}
      <section className="px-6 pb-20 pt-14 md:pb-28" data-analytics-section="eve_figures" data-analytics-label="Survey Figures">
        <div className="mx-auto max-w-6xl">
          <dl className="grid gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10 md:grid-cols-3">
            {SURVEY_STATS.map((stat) => (
              <div key={stat.label} className="bg-near-black/90 p-6 md:p-8">
                <dd className={`${cormorant.className} text-6xl leading-none text-accent md:text-7xl`}>{stat.value}</dd>
                <dt className="mt-3 text-xs uppercase tracking-[0.16em] text-text-muted">{stat.label}</dt>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm font-light text-text-muted">{SURVEY_NOTE}</p>

          <blockquote className="mt-16 max-w-4xl">
            <p className={`${cormorant.className} text-3xl italic leading-snug text-white md:text-4xl`}>
              &quot;{HILMAR_QUOTE.text}&quot;
            </p>
            <footer className="mt-6 text-xs uppercase tracking-[0.16em] text-text-muted">
              <span className="text-accent">{HILMAR_QUOTE.name}</span>
              <span className="mx-2">&middot;</span>
              {HILMAR_QUOTE.role}
            </footer>
          </blockquote>
        </div>
      </section>

      {/* The question */}
      <section
        id="question"
        className="scroll-mt-28 border-t border-border-grey px-6 py-20 md:py-28"
        data-analytics-section="eve_question"
        data-analytics-label="The Question"
      >
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_1.4fr]">
          <div>
            <Eyebrow>CCP&apos;s question</Eyebrow>
            <H2>{QUESTION.heading}</H2>
          </div>
          <Prose paragraphs={QUESTION.body} className="md:pt-3" />
        </div>
      </section>

      {/* How we read */}
      <section
        id="how-we-read"
        className="scroll-mt-28 border-t border-border-grey bg-dark-grey/60 px-6 py-20 md:py-28"
        data-analytics-section="eve_method"
        data-analytics-label="How We Read"
      >
        <div className="mx-auto max-w-6xl">
          <Eyebrow>Method</Eyebrow>
          <H2>{METHOD.heading}</H2>
          <p className={`${cormorant.className} mt-8 max-w-3xl text-2xl italic leading-snug text-text-secondary md:text-3xl`}>
            {METHOD.lead}
          </p>

          <div className="mt-16 grid gap-14 md:grid-cols-2 md:gap-16">
            <div>
              <H3>{METHOD.where.heading}</H3>
              <p className="mt-4 text-lg font-light leading-relaxed text-text-secondary">{METHOD.where.body}</p>
              <ul className="mt-6 divide-y divide-border-grey border-y border-border-grey">
                {METHOD.where.sources.map((source) => (
                  <li key={source.name} className="py-4">
                    <p className="text-white">{source.name}</p>
                    <p className="mt-1 text-sm font-light text-text-muted">{source.note}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <H3>{METHOD.failed.heading}</H3>
              <Prose paragraphs={METHOD.failed.body} className="mt-4" />
            </div>
          </div>

          <div className="mt-20">
            <H3>{METHOD.steps.heading}</H3>
            <ol className="mt-8 grid gap-6 md:grid-cols-4">
              {METHOD.steps.items.map((step, i) => (
                <li key={step} className="method-step">
                  <p className={`${cormorant.className} text-4xl leading-none text-accent`}>{String(i + 1).padStart(2, "0")}</p>
                  <p className="mt-4 font-light leading-relaxed text-text-secondary">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* The journey: pinned pyramid and seven steps */}
      <Journey serif={cormorant.className} />

      {/* The skills */}
      <section
        id="skills"
        className="scroll-mt-28 border-t border-border-grey bg-dark-grey/60 px-6 py-20 md:py-28"
        data-analytics-section="eve_skills"
        data-analytics-label="The Skills"
      >
        <div className="mx-auto max-w-6xl">
          <Eyebrow>Skills</Eyebrow>
          <H2>{SKILLS.heading}</H2>
          <p className="mt-8 max-w-3xl text-lg font-light leading-relaxed text-text-secondary">{SKILLS.lead}</p>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {SKILLS.groups.map((group) => (
              <div key={group.name}>
                <p className="border-b border-accent/60 pb-3 text-xs uppercase tracking-[0.2em] text-accent">{group.name}</p>
                <ul className="divide-y divide-border-grey">
                  {group.items.map((item) => (
                    <li key={item} className="py-3 text-white">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* In their words */}
      <section
        id="in-their-words"
        className="scroll-mt-28 border-t border-border-grey px-6 py-20 md:py-28"
        data-analytics-section="eve_voices"
        data-analytics-label="In Their Words"
      >
        <div className="mx-auto max-w-6xl">
          <Eyebrow>Player quotes</Eyebrow>
          <H2>{VOICES.heading}</H2>
          <p className="mt-8 max-w-3xl text-lg font-light leading-relaxed text-text-secondary">{VOICES.lead}</p>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {VOICES.items.map((voice) => (
              <li key={voice.text} className="flex flex-col justify-between rounded-[1.25rem] border border-white/10 bg-near-black/60 p-6">
                <p className={`${cormorant.className} text-2xl leading-snug text-white`}>&quot;{voice.text}&quot;</p>
                <p className="mt-6 text-xs uppercase tracking-[0.16em] text-accent">{voice.source}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What CCP did */}
      <section
        id="what-ccp-did"
        className="scroll-mt-28 border-t border-border-grey bg-dark-grey/60 px-6 py-20 md:py-28"
        data-analytics-section="eve_ccp"
        data-analytics-label="What CCP Did"
      >
        <div className="mx-auto max-w-6xl">
          <Eyebrow>What CCP did</Eyebrow>
          <H2>{CCP_DID.heading}</H2>
          <Prose paragraphs={CCP_DID.body} className="mt-8 max-w-3xl" />

          <div className="mt-20 grid gap-12 md:grid-cols-2 md:gap-16">
            <div>
              <H3>{CCP_DID.changes.heading}</H3>
              <p className="mt-2 text-sm font-light text-text-muted">{CCP_DID.changes.note}</p>
              <ul className="mt-6 space-y-4">
                {CCP_DID.changes.items.map((item) => (
                  <li key={item} className="flex gap-4 font-light leading-relaxed text-text-secondary">
                    <span aria-hidden="true" className="mt-3 h-px w-5 shrink-0 bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <H3>Published material</H3>
              <ul className="mt-6 space-y-4">
                {CCP_DID.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-[1.25rem] border border-white/10 p-6 transition-colors hover:border-accent/60"
                      data-analytics-event="cta_click"
                      data-analytics-label={link.label}
                      data-analytics-location="eve_ccp"
                      data-analytics-destination={link.href}
                    >
                      <p className="text-accent">{link.label} &rarr;</p>
                      <p className="mt-2 text-sm font-light leading-relaxed text-text-secondary">{link.detail}</p>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Beyond EVE */}
      <section
        id="beyond"
        className="scroll-mt-28 border-t border-border-grey px-6 py-20 md:py-28"
        data-analytics-section="eve_beyond"
        data-analytics-label="Beyond EVE"
      >
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_1.4fr]">
          <div>
            <Eyebrow>For recruiters</Eyebrow>
            <H2>{BEYOND.heading}</H2>
            <div className="mt-10 border-l border-accent/60 pl-5">
              <p className={`${cormorant.className} text-5xl leading-none text-accent md:text-6xl`}>{BEYOND.stat.value}</p>
              <p className="mt-2 max-w-xs text-xs uppercase tracking-[0.16em] text-text-muted">{BEYOND.stat.label}</p>
            </div>
          </div>
          <Prose paragraphs={BEYOND.body} className="md:pt-3" />
        </div>
      </section>

      {/* Close */}
      <section
        className="border-t border-border-grey px-6 py-28 text-center md:py-36"
        data-analytics-section="eve_cta"
        data-analytics-label="EVE Effect CTA"
      >
        <div className="mx-auto max-w-4xl">
          <h2 className={`${cormorant.className} text-5xl leading-none text-white md:text-7xl`}>{CLOSE.heading}</h2>
          <p className="mt-8 text-lg font-light text-text-secondary">{CLOSE.body}</p>
          <Link
            href={BOOKING_HREF}
            className="cta-button mt-10 text-sm"
            data-analytics-event="book_demo_click"
            data-analytics-label={CLOSE.cta}
            data-analytics-location="eve_cta"
            data-analytics-destination={BOOKING_HREF}
          >
            {CLOSE.cta}
          </Link>
        </div>
      </section>
    </main>
  );
}
