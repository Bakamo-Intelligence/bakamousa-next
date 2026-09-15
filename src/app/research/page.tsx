import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import Link from "next/link";
import { BOOKING_HREF } from "@/lib/booking";
import { ACTIVE_ATLAS_CASES } from "@/lib/atlas";
import { pageOpenGraph } from "@/lib/seo";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const TITLE = "Research: Social Intelligence Studies";
const DESCRIPTION =
  "Bakamo’s public research: studies of elections and migration read from unprompted social media conversation, plus the Atlas of Social Truths.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/research",
  },
  openGraph: pageOpenGraph("/research", `${TITLE} | Bakamo`, DESCRIPTION),
};

type Study = {
  title: string;
  year: string;
  context: string;
  summary: string;
  href: string;
  linkLabel: string;
  analyticsLabel: string;
};

// Every summary is taken from the study's own page or report. Keep it that way.
const STUDIES: Study[] = [
  {
    title: "Hungarian Election 2026: A Psychographic Divide",
    year: "2026",
    context: "Research briefing · Hungary",
    summary:
      "Before the 12 April 2026 parliamentary election, Tisza supporters produced a substantially higher share of inner-directed social media expressions than Fidesz supporters: a gap of 12.4 percentage points.",
    href: "/elections",
    linkLabel: "Read the briefing",
    analyticsLabel: "Research Study: Hungarian Election 2026",
  },
  {
    title: "Migration Narratives in Europe",
    year: "2019",
    context: "Friedrich-Ebert-Stiftung · 28 EU member states",
    summary:
      "Identified the migration narrative frames that cross every border (security, identity, economy and demographics, humanitarianism, and the political-establishment frame) and mapped how their weight shifts country by country.",
    href: "/migration",
    linkLabel: "See the study",
    analyticsLabel: "Research Study: Migration Narratives in Europe",
  },
  {
    title: "French Election Social Media Landscape Report 2017",
    year: "2017",
    context: "With support from The Open Society Foundation · France",
    summary:
      "Analyzed more than 8 million shared links and 1,000+ media sources around the French presidential election, and found that 43 percent of shared links pointed to non-traditional sources.",
    href: "/research/french-election-2017",
    linkLabel: "Read the summary",
    analyticsLabel: "Research Study: French Election 2017",
  },
  {
    title: "Refugees in Hungarian Social Media",
    year: "2015",
    context: "Open Society Foundation · Hungary",
    summary:
      "At the height of the 2015 refugee crisis, mapped how Hungarians discussed the situation on social media and how government communication was reshaping that conversation.",
    href: "/migration",
    linkLabel: "See the study",
    analyticsLabel: "Research Study: Refugees in Hungarian Social Media",
  },
];

function ArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

export default function ResearchPage() {
  return (
    <main className="relative w-full min-h-screen bg-near-black text-text-primary overflow-x-hidden pb-24">
      <div className="grain-overlay" />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] overflow-hidden">
        <div
          className="absolute left-[-4rem] top-24 h-64 w-64 rounded-full blur-3xl"
          style={{ background: "rgba(201,169,110,0.1)" }}
        />
        <div
          className="absolute right-[-6rem] top-16 h-80 w-80 rounded-full blur-3xl"
          style={{ background: "rgba(26,53,80,0.25)" }}
        />
      </div>

      {/* Hero */}
      <section
        className="relative pt-32 md:pt-44 pb-20 px-6"
        data-analytics-section="research_hero"
        data-analytics-label="Research Hero"
      >
        <div className="max-w-4xl mx-auto">
          <span className="text-xs uppercase tracking-[0.22em] text-accent border border-accent/30 rounded-full px-4 py-1 inline-block mb-8">
            The Research
          </span>

          <h1
            className={`${cormorant.className} text-[clamp(2.4rem,5.5vw,4.8rem)] leading-[1.02] tracking-tight text-white`}
          >
            Social Intelligence Studies
          </h1>

          <div className="w-16 h-px bg-accent mt-10 mb-10" />

          <p className="text-lg font-light leading-relaxed text-text-secondary max-w-3xl">
            This is Bakamo&rsquo;s public research. Each study reads the unprompted conversation
            around a contested question &mdash; an election, migration, a public debate &mdash; and
            reports what people say to each other, not what they say when asked. Every study links
            to its full report.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* Studies */}
      <section
        id="studies"
        className="px-6 py-20 scroll-mt-24"
        data-analytics-section="research_studies"
        data-analytics-label="Research Studies"
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4">The Studies</p>
          <h2
            className={`${cormorant.className} text-3xl md:text-5xl font-light text-white mb-16 leading-tight max-w-3xl`}
          >
            Published research.
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {STUDIES.map((study) => (
              <article
                key={study.title}
                className="flex flex-col rounded-[2rem] border border-white/10 p-8 md:p-10"
                style={{
                  background:
                    "linear-gradient(160deg, rgba(26,53,80,0.22), rgba(20,20,20,0.94) 40%, rgba(10,10,10,0.98))",
                }}
              >
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <span className="text-[10px] uppercase tracking-[0.18em] bg-accent text-black px-3 py-1 rounded-full font-semibold">
                    {study.year}
                  </span>
                  <span className="text-xs uppercase tracking-[0.14em] text-text-muted">
                    {study.context}
                  </span>
                </div>

                <h3
                  className={`${cormorant.className} text-2xl md:text-3xl font-light text-white leading-tight mb-5`}
                >
                  {study.title}
                </h3>

                <p className="text-base font-light leading-relaxed text-text-secondary">
                  {study.summary}
                </p>

                <div className="mt-auto pt-8">
                  <Link
                    href={study.href}
                    className="inline-flex items-center gap-2 text-sm text-accent hover:underline underline-offset-4"
                    data-analytics-event="cta_click"
                    data-analytics-label={study.analyticsLabel}
                    data-analytics-location="research_studies"
                    data-analytics-destination={study.href}
                  >
                    {study.linkLabel}
                    <span className="sr-only">: {study.title}</span>
                    <ArrowIcon />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Atlas of Social Truths, as text so every case can be linked and read without JavaScript */}
      <section
        id="atlas"
        className="px-6 py-20 scroll-mt-24"
        data-analytics-section="research_atlas"
        data-analytics-label="Atlas of Social Truths"
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4">The Atlas</p>
          <h2
            className={`${cormorant.className} text-3xl md:text-5xl font-light text-white mb-8 leading-tight`}
          >
            Atlas of Social Truths
          </h2>
          <p className="text-base font-light leading-relaxed text-text-secondary">
            A selection of our work, wherever the conversation lives. Each entry states the Social
            Truth we found: the shared meaning, tension or assumption beneath an unprompted
            conversation.
          </p>

          <div className="mt-14">
            {ACTIVE_ATLAS_CASES.map((atlasCase) => {
              const studyHref =
                atlasCase.href && !atlasCase.href.startsWith("/research") ? atlasCase.href : null;

              return (
                <article
                  key={atlasCase.id}
                  id={atlasCase.id}
                  className="scroll-mt-24 border-t border-border-grey py-12"
                >
                  <h3
                    className={`${cormorant.className} text-2xl md:text-3xl font-light text-white leading-tight`}
                  >
                    {atlasCase.name}
                  </h3>
                  {atlasCase.sectorRegion ? (
                    <p className="mt-3 text-xs uppercase tracking-[0.18em] text-accent">
                      {atlasCase.sectorRegion}
                    </p>
                  ) : null}
                  <div
                    className={`${cormorant.className} mt-6 space-y-4 border-l border-accent pl-6 text-lg italic leading-snug text-white md:text-xl`}
                  >
                    {atlasCase.essence.split("\n\n").map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                  {studyHref ? (
                    <Link
                      href={studyHref}
                      className="mt-6 inline-flex items-center gap-2 text-sm text-accent hover:underline underline-offset-4"
                      data-analytics-event="cta_click"
                      data-analytics-label={`Atlas case: ${atlasCase.name}`}
                      data-analytics-location="research_atlas"
                      data-analytics-destination={studyHref}
                    >
                      See the study
                      <span className="sr-only">: {atlasCase.name}</span>
                      <ArrowIcon />
                    </Link>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="px-6 py-24"
        data-analytics-section="research_cta"
        data-analytics-label="Research CTA"
      >
        <div
          className="max-w-5xl mx-auto rounded-[2rem] border border-accent/20 p-8 md:p-14"
          style={{
            background:
              "linear-gradient(145deg, rgba(201,169,110,0.12), rgba(20,20,20,0.94) 36%, rgba(10,10,10,1))",
          }}
        >
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-accent mb-4">Work with Bakamo</p>
              <h2
                className={`${cormorant.className} text-3xl md:text-4xl font-light text-white leading-tight`}
              >
                Every study here started with a question.
              </h2>
              <p className="mt-6 text-base font-light leading-relaxed text-text-secondary">
                Tell us yours. We read the conversation around it first, then build the instruments
                that measure what we find.
              </p>
            </div>
            <div className="space-y-4">
              <Link
                href={BOOKING_HREF}
                className="cta-button text-sm w-full text-center block"
                data-analytics-event="book_demo_click"
                data-analytics-label="Book a demo"
                data-analytics-location="research_cta"
                data-analytics-destination={BOOKING_HREF}
              >
                Book a demo
              </Link>
              <Link
                href="/our-method"
                className="inline-flex items-center justify-center w-full rounded-full border border-white/15 px-6 py-3 text-sm uppercase tracking-[0.16em] text-white transition-colors hover:border-accent hover:text-accent"
                data-analytics-event="cta_click"
                data-analytics-label="See Our Method"
                data-analytics-location="research_cta"
                data-analytics-destination="/our-method"
              >
                See Our Method
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
