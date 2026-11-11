import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import Link from "next/link";
import { BOOKING_HREF } from "@/lib/booking";
import AtlasPlates from "@/components/AtlasPlates";
import { pageOpenGraph } from "@/lib/seo";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const TITLE = "The Atlas of the Unexpected: Cases and Research";
const DESCRIPTION =
  "Each case shows what a client or an industry expected, what Bakamo found in the conversation, and the question it raised. With Bakamo's published studies.";

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
    title: "The EVE Effect: Playing EVE Online Gets People Better Jobs",
    year: "2019",
    context: "CCP Games (now Fenris Creations) · EVE Online players, worldwide",
    summary:
      "Read what EVE Online players say to each other about their lives outside the game. Friendship comes first, skills follow, and 72% of 759 surveyed players think EVE skills have helped people get better jobs.",
    href: "/eve-effect",
    linkLabel: "Read the study",
    analyticsLabel: "Research Study: The EVE Effect",
  },
  {
    title: "Migration Narratives in Europe",
    year: "2019",
    context: "Friedrich-Ebert-Stiftung · 28 EU member states",
    summary:
      "Identified the migration narrative frames that cross every border (security, identity, economy and demographics, humanitarianism, and the political-establishment frame) and mapped how their weight shifts country by country.",
    href: "/research/migration-narratives-eu",
    linkLabel: "Open the dashboard",
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

type Case = {
  id: string;
  name: string;
  context: string;
  expected: string;
  found: string;
  questions: string[];
  next?: string;
  href?: string;
  linkLabel?: string;
};

// From the website copy deck v3, November 2026. Keep the wording as approved.
const CASES: Case[] = [
  {
    id: "bare",
    name: "BARE Zero Proof",
    context: "Non-alcoholic drinks",
    expected:
      "Industry trend reports described the buyer of non-alcoholic drinks as young: a generation choosing to drink less.",
    found:
      "In the public conversation about these drinks, the most engaged voices were people who had decided to stop drinking alcohol. They wrote about the category often, in detail, and with a lot at stake.",
    questions: [
      "How much of the category's volume comes from people who have stopped drinking?",
      "What do they need from a drink that someone cutting down does not?",
      "Does the way the category talks about itself include them?",
    ],
    href: "/research/bare-zero-proof",
    linkLabel: "Read the case study",
  },
  {
    id: "hospitals",
    name: "Hospitals",
    context: "Public health",
    expected:
      "Patients judge a hospital on clinical expertise, waiting times and technology, the items on a satisfaction survey.",
    found:
      "When patients and families describe a stay to each other, they write about food, the state of the rooms and how staff spoke to them. Many say they cannot judge clinical skill.",
    questions: [
      "Do patients read everyday care as a sign of clinical care?",
      "Which everyday signs weigh most when people recommend or choose a hospital?",
      "Where does the satisfaction survey ask about them?",
    ],
  },
  {
    id: "king",
    name: "King",
    context: "Mobile games",
    expected: "Casual puzzle games fill spare minutes: on a commute, in a queue.",
    found:
      "Some players describe a fixed daily session between leaving work and arriving home. They talk about it as time to switch off before the evening begins.",
    questions: [
      "How many players use the game this way?",
      "What do notifications and session length do to that moment?",
      "What else competes for it?",
    ],
  },
  {
    id: "pet-food",
    name: "Premium pet food",
    context: "Pet care",
    expected:
      "Owners choose pet food on ingredients and nutrition, and research kept confirming interest in both.",
    found:
      "In owner communities, people describe feeding as a way of showing what kind of carer they are. The ingredient list comes up as support for that, not as the starting point.",
    questions: [
      "Which ideas of care do buyers hold?",
      "Which of them does the brand speak to today?",
      "What does a buyer feel the pack says about them?",
    ],
  },
  {
    id: "eve-online",
    name: "EVE Online",
    context: "CCP Games",
    expected: "A multiplayer space game is an escape from work.",
    found:
      "Players described friendship as the main benefit, and after it the skills they had learned running large in-game organisations. Several linked those skills to their jobs.",
    questions: ["Do players believe the game has helped their careers?"],
    next: "The question went into a survey. Of 759 players, 72% said EVE skills had helped them get better jobs.",
    href: "/eve-effect",
    linkLabel: "Read the study",
  },
  {
    id: "migration-narratives",
    name: "Migration narratives in Europe",
    context: "28 EU states",
    expected: "Each country argues about migration in its own terms.",
    found:
      "Five narratives appeared across borders. What differed from country to country was the weight of each.",
    questions: [
      "Which narrative does your audience hold?",
      "What would move someone from one narrative to another?",
      "Are \"for\" and \"against\" the right answer options at all?",
    ],
    href: "/research/migration-narratives-eu",
    linkLabel: "Open the dashboard",
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
            Cases
          </span>

          <h1
            className={`${cormorant.className} text-[clamp(2.4rem,5.5vw,4.8rem)] leading-[1.02] tracking-tight text-white`}
          >
            The Atlas of the Unexpected.
          </h1>

          <div className="w-16 h-px bg-accent mt-10 mb-10" />

          <p className="text-lg font-light leading-relaxed text-text-secondary max-w-3xl">
            Each case shows what a client or an industry expected, what we found in the
            conversation, and the question it raised. Some clients went on to measure the answer.
            All of them left with a question they had not brought.
          </p>
        </div>
      </section>

      {/* Cases: expected, found, the questions raised */}
      <section
        id="cases"
        className="px-6 py-20 scroll-mt-24"
        data-analytics-section="research_cases"
        data-analytics-label="Cases"
      >
        <ol className="max-w-5xl mx-auto space-y-6">
          {CASES.map((item, index) => (
            <li
              key={item.id}
              id={item.id}
              className="scroll-mt-28 rounded-[2rem] border border-white/10 p-8 md:p-12"
              style={{
                background:
                  "linear-gradient(160deg, rgba(26,53,80,0.22), rgba(20,20,20,0.94) 40%, rgba(10,10,10,0.98))",
              }}
            >
              <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                <span className={`${cormorant.className} text-2xl text-accent`}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className={`${cormorant.className} text-4xl md:text-5xl font-light text-white leading-tight`}>
                  {item.name}
                </h2>
                <span className="text-xs uppercase tracking-[0.16em] text-text-muted">{item.context}</span>
              </div>

              <div className="mt-10 grid gap-10 md:grid-cols-2">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Expected</p>
                  <p className="mt-3 text-lg font-light leading-relaxed text-text-secondary">{item.expected}</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-accent">Found</p>
                  <p className="mt-3 text-lg leading-relaxed text-white">{item.found}</p>
                </div>
              </div>

              <div className="mt-10 border-t border-accent/50 pt-8">
                <p className="text-[11px] uppercase tracking-[0.18em] text-accent">
                  {item.questions.length > 1 ? "The questions it raised" : "The question it raised"}
                </p>
                <ul className="mt-4 space-y-3">
                  {item.questions.map((question) => (
                    <li
                      key={question}
                      className={`${cormorant.className} text-2xl md:text-3xl italic leading-snug text-white`}
                    >
                      {question}
                    </li>
                  ))}
                </ul>
              </div>

              {item.next ? (
                <div className="mt-8">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-accent">What happened next</p>
                  <p className="mt-3 text-lg font-light leading-relaxed text-text-secondary">{item.next}</p>
                </div>
              ) : null}

              {item.href ? (
                <Link
                  href={item.href}
                  className="mt-8 inline-flex items-center gap-2 text-sm text-accent hover:underline underline-offset-4"
                  data-analytics-event="cta_click"
                  data-analytics-label={`Case: ${item.name}`}
                  data-analytics-location="research_cases"
                  data-analytics-destination={item.href}
                >
                  {item.linkLabel}
                  <span className="sr-only">: {item.name}</span>
                  <ArrowIcon />
                </Link>
              ) : null}
            </li>
          ))}
        </ol>
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
                Every case here ended with a question the brief did not contain.
              </h2>
            </div>
            <div className="space-y-4">
              <Link
                href={BOOKING_HREF}
                className="cta-button text-sm w-full text-center block"
                data-analytics-event="book_demo_click"
                data-analytics-label="Bring us your brief"
                data-analytics-location="research_cta"
                data-analytics-destination={BOOKING_HREF}
              >
                Bring us your brief
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

      {/* More Atlas entries: locator globe plus a list of cases; every case stays server-rendered and linkable */}
      <section
        id="atlas"
        className="px-6 py-20 scroll-mt-24"
        data-analytics-section="research_atlas"
        data-analytics-label="Atlas"
      >
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4">The Atlas</p>
            <h2
              className={`${cormorant.className} text-3xl md:text-5xl font-light text-white mb-8 leading-tight`}
            >
              More from the Atlas
            </h2>
            <p className="text-base font-light leading-relaxed text-text-secondary">
              A selection of our work, wherever the conversation lives.
            </p>
          </div>

          <AtlasPlates />
        </div>
      </section>

    </main>
  );
}
