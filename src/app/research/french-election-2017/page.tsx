import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import Link from "next/link";
import { ORGANIZATION_REF, pageOpenGraph } from "@/lib/seo";
import { SITE_URL } from "@/lib/site-url";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

// Every figure and finding on this page comes from the report itself
// (public/media/Deck_French Presidential Election Report TotalFinal.pdf).
// Page numbers refer to that PDF. Do not add figures that are not in it.

const REPORT_TITLE = "French Election Social Media Landscape Report 2017";
const PAGE_PATH = "/research/french-election-2017";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
// Short URL cited by Wikipedia and press; rewritten to the PDF in next.config.ts.
const REPORT_PATH = "/frenchelection";
const REPORT_URL = `${SITE_URL}${REPORT_PATH}`;
const DESCRIPTION =
  "Summary of Bakamo’s 2017 French presidential election study: 8 million shared links, 1,000+ media sources, echo chambers and four disinformation tactics.";

export const metadata: Metadata = {
  title: REPORT_TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PAGE_PATH,
  },
  openGraph: { ...pageOpenGraph(PAGE_PATH, `${REPORT_TITLE} | Bakamo`, DESCRIPTION), type: "article" },
};

// The report states no publication date, so none is given here.
const ARTICLE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${PAGE_URL}#article`,
  headline: REPORT_TITLE,
  description: DESCRIPTION,
  url: PAGE_URL,
  mainEntityOfPage: PAGE_URL,
  image: `${PAGE_URL}/opengraph-image`,
  inLanguage: "en",
  author: ORGANIZATION_REF,
  publisher: ORGANIZATION_REF,
  about: { "@type": "Thing", name: "2017 French presidential election" },
  temporalCoverage: "2016-11-01/2017-05-22",
  isBasedOn: {
    "@type": "Report",
    name: REPORT_TITLE,
    url: REPORT_URL,
    encodingFormat: "application/pdf",
    inLanguage: "en",
    author: ORGANIZATION_REF,
    publisher: ORGANIZATION_REF,
    temporalCoverage: "2016-11-01/2017-05-22",
  },
};

const KEY_FACTS: Array<{ term: string; detail: string; source: string }> = [
  {
    term: "Report",
    detail: "The final report of a three-phase study: non-traditional media map, social media sharing behaviour, and patterns of disinformation. 175 pages.",
    source: "pp. 3, 41, 175",
  },
  {
    term: "Period",
    detail: "November 1, 2016 to May 22, 2017.",
    source: "p. 5",
  },
  {
    term: "Sources",
    detail: "Public conversation on Facebook, Twitter, blogs and forum sites, in French.",
    source: "pp. 5, 167",
  },
  {
    term: "Volume",
    detail: "More than 20 million social media conversations captured. Over 8 million shared links analyzed. 1,000+ media sources analyzed, 800 of them non-traditional. The research summary states that 50,000 social media posts were read and coded (p. 5); the methodology section describes 5,000 coded posts and 4,200 coded Facebook comments (p. 174).",
    source: "pp. 5, 174",
  },
  {
    term: "Team",
    detail: "Bakamo.Social and a team of over 20 analysts, with input from journalist Pierre Haski. Zsigmond (Fifou) Szabó, Balázs Berkovits and Blanka Réti contributed to the analysis.",
    source: "pp. 3, 5, 175",
  },
  {
    term: "Support",
    detail: "With support from The Open Society Foundation, which the report thanks for making the study possible.",
    source: "pp. 3, 175",
  },
  {
    term: "Tools",
    detail: "Talkwalker, a social media monitoring platform, for data collection. Posts and comments were coded manually, through human reading and interpretation.",
    source: "pp. 5, 167, 174",
  },
];

const FINDINGS: Array<{ text: string; source: string }> = [
  {
    text: "57 percent of shared links pointed to traditional media or campaign sites. The other 43 percent pointed to non-traditional sources, which the report sorts into three sections: Extend (civic media adhering to journalistic standards), Reframe (sources aiming to counterbalance traditional media) and Alternative (publishers of conspiratorial and “confusionist” content).",
    source: "pp. 10–11",
  },
  {
    text: "The 800 non-traditional sources fell into 17 clusters. Three intertwined hard-right clusters resonated most: French Identity, Anti-Islam and Anti-Global Patriots.",
    source: "pp. 13–14",
  },
  {
    text: "There was virtually no common ground. Users overwhelmingly shared links from only one section of the media map. Of the top 100 sharers by number of followers, no more than 3 shared content across the divide between traditional media and Reframe and Alternative sources.",
    source: "pp. 17, 19, 86",
  },
  {
    text: "Four disinformation tactics were identified: credibility cloak, time shifting, fake polls and hoax sites. All aim to co-opt the trustworthiness of traditional media while undermining it. Sharing behaviour suggests these campaigns resonate on an emotional level.",
    source: "pp. 16, 90",
  },
  {
    text: "The only foreign influence detected among the media sources was Russian, seen in citations of broadcasters such as RT and Sputnik and in French-speaking Russian news blogs. The report notes that its approach identifies correlation, not causality.",
    source: "pp. 17, 51–52",
  },
];

function DownloadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export default function FrenchElection2017Page() {
  return (
    <main className="relative w-full min-h-screen bg-near-black text-text-primary overflow-x-hidden pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }}
      />
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

      <article>
        {/* Hero */}
        <section
          className="relative pt-32 md:pt-44 pb-16 px-6"
          data-analytics-section="french_election_hero"
          data-analytics-label="French Election 2017 Hero"
        >
          <div className="max-w-3xl mx-auto">
            <nav aria-label="Breadcrumb" className="mb-8">
              <Link
                href="/research"
                className="text-xs uppercase tracking-[0.18em] text-text-muted transition-colors hover:text-white"
              >
                Research
              </Link>
            </nav>

            <div className="flex flex-wrap items-center gap-4 mb-8">
              <span className="text-xs uppercase tracking-[0.22em] text-accent border border-accent/30 rounded-full px-4 py-1">
                Public Report
              </span>
              <span className="text-xs uppercase tracking-[0.16em] text-text-muted">
                French presidential election &middot; 2017
              </span>
            </div>

            <h1
              className={`${cormorant.className} text-[clamp(2.4rem,5.5vw,4.4rem)] leading-[1.02] tracking-tight text-white`}
            >
              {REPORT_TITLE}
            </h1>

            <div className="w-16 h-px bg-accent mt-10 mb-10" />

            <div className="space-y-5 text-lg font-light leading-relaxed text-text-secondary">
              <p>
                Around the 2017 French presidential election, Bakamo studied how French social media
                users shared news. The study mapped the media sources they linked to, the ways they
                shared them, and the patterns of disinformation that moved through the conversation.
              </p>
              <p>
                This is the final report of the study. It summarizes the earlier phases and adds new
                findings on what people share, and why.
              </p>
            </div>

            <div className="mt-10">
              <a
                href={REPORT_PATH}
                type="application/pdf"
                className="cta-button text-sm inline-flex items-center gap-3"
                data-analytics-event="cta_click"
                data-analytics-label="Download French Election Report"
                data-analytics-location="french_election_hero"
                data-analytics-destination={REPORT_PATH}
              >
                <DownloadIcon />
                Download the full report (PDF)
              </a>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* Key facts */}
        <section
          className="px-6 py-16"
          data-analytics-section="french_election_facts"
          data-analytics-label="Key Facts"
        >
          <div className="max-w-3xl mx-auto">
            <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4">Key Facts</p>
            <h2
              className={`${cormorant.className} text-3xl md:text-4xl font-light text-white mb-10 leading-tight`}
            >
              The study at a glance
            </h2>
            <dl className="divide-y divide-white/10 border-y border-white/10">
              {KEY_FACTS.map((fact) => (
                <div key={fact.term} className="grid gap-2 py-5 md:grid-cols-[10rem_1fr] md:gap-8">
                  <dt className="text-xs uppercase tracking-[0.18em] text-accent md:pt-1">
                    {fact.term}
                  </dt>
                  <dd className="text-base font-light leading-relaxed text-text-secondary">
                    {fact.detail}{" "}
                    <span className="whitespace-nowrap text-xs text-text-muted">
                      (Report, {fact.source})
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Findings */}
        <section
          className="px-6 py-16"
          data-analytics-section="french_election_findings"
          data-analytics-label="Headline Findings"
        >
          <div className="max-w-3xl mx-auto">
            <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4">Headline Findings</p>
            <h2
              className={`${cormorant.className} text-3xl md:text-4xl font-light text-white mb-10 leading-tight`}
            >
              What the report found
            </h2>
            <ol className="space-y-6">
              {FINDINGS.map((finding, index) => (
                <li
                  key={index}
                  className="grid grid-cols-[2rem_1fr] gap-4 border-l border-white/10 pl-5"
                >
                  <span
                    className={`${cormorant.className} text-2xl leading-none text-accent`}
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                  <p className="text-base font-light leading-relaxed text-text-secondary">
                    {finding.text}{" "}
                    <span className="whitespace-nowrap text-xs text-text-muted">
                      (Report, {finding.source})
                    </span>
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Citation */}
        <section
          className="px-6 py-16 bg-dark-grey/70"
          data-analytics-section="french_election_citation"
          data-analytics-label="Citation"
        >
          <div className="max-w-3xl mx-auto">
            <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4">Cite this report</p>
            <p className="rounded-[1.5rem] border border-white/10 bg-black/20 p-6 text-base leading-relaxed text-text-primary">
              Bakamo (2017). <cite>{REPORT_TITLE}</cite>.{" "}
              <a
                href={REPORT_PATH}
                type="application/pdf"
                className="break-all text-accent hover:underline underline-offset-4"
              >
                {REPORT_URL}
              </a>
            </p>
            <p className="mt-4 text-sm font-light leading-relaxed text-text-muted">
              The report was published under the name Bakamo.Social.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <a
                href={REPORT_PATH}
                type="application/pdf"
                className="inline-flex items-center gap-2 text-sm text-accent hover:underline underline-offset-4"
                data-analytics-event="cta_click"
                data-analytics-label="Download French Election Report"
                data-analytics-location="french_election_citation"
                data-analytics-destination={REPORT_PATH}
              >
                <DownloadIcon />
                Download the full report (PDF)
              </a>
              <Link
                href="/research"
                className="text-sm uppercase tracking-[0.16em] text-text-muted transition-colors hover:text-white"
                data-analytics-event="cta_click"
                data-analytics-label="More Research"
                data-analytics-location="french_election_citation"
                data-analytics-destination="/research"
              >
                More research &rarr;
              </Link>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
