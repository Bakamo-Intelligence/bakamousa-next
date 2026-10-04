import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import Image from "next/image";
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
  "Bakamo’s study of the 2017 French presidential election on social media: 8 million shared links, echo chambers, Russian influence and four disinformation tactics.";

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

// The long-form sections below retell the report chapter by chapter, in the
// report's own order. Each paragraph ends with the PDF pages it draws on.
const CHAPTERS: Array<{ id: string; title: string }> = [
  { id: "why", title: "Why the study was done" },
  { id: "media-map", title: "The Media Map" },
  { id: "narrative-frames", title: "Two narrative frames" },
  { id: "clusters", title: "17 clusters of non-traditional media" },
  { id: "foreign-influence", title: "Foreign influence" },
  { id: "sharing", title: "How people share" },
  { id: "disinformation", title: "Four disinformation tactics" },
  { id: "implications", title: "What it means" },
  { id: "recommendations", title: "Recommendations" },
  { id: "methodology", title: "Methodology" },
];

const MEDIA_MAP_SECTIONS: Array<{ name: string; share: string; detail: string }> = [
  {
    name: "Traditional",
    share: "50%",
    detail:
      "Commercial and public news organizations: national and regional newspapers, TV and radio stations, online portals adhering to journalistic standards, and news aggregators.",
  },
  {
    name: "Campaign",
    share: "7%",
    detail: "The official web presences of candidates and parties, including local and regional party chapters.",
  },
  {
    name: "Extend",
    share: "20%",
    detail:
      "Civic media that extend the journalistic scope of traditional media: investigative reporting, anti-corruption watchdogs, personal and community perspectives, petitions and humour.",
  },
  {
    name: "Reframe",
    share: "19%",
    detail:
      "Sources that set out to counter the traditional media narrative and “re-inform” readers. This section breaks with the traditions of journalism and expresses radical opinions.",
  },
  {
    name: "Alternative",
    share: "4%",
    detail:
      "An incoherent, confusing space that fuses radical left and right views, unified in their opposition to globalization. Narratives are often mythical or conspiratorial.",
  },
];

const CLUSTERS: Array<{ section: string; names: string[] }> = [
  {
    section: "Extend",
    names: [
      "Comedy / Parody / Satire",
      "Online Petitions / Citizen Engagement",
      "Nonpartisan and Centrist Blogs",
      "Investigative Journalism",
      "Environment",
      "LGBTQ / Human Rights",
      "Left Wing Blogs",
      "Right Wing Blogs",
    ],
  },
  {
    section: "Reframe",
    names: [
      "French Identity",
      "Anti-Islam",
      "Anti-Global Patriots",
      "Anti-Imperialist",
      "Anti-Corporate",
      "Protest and Revolution",
      "Pro-Islam",
    ],
  },
  {
    section: "Alternative",
    names: ["Conspiratorial / Anti-System", "Confusion / Beyond Information"],
  },
];

// Report, p. 85. Sharers in thousands.
const SHARING_METRICS: Array<{ section: string; sharers: string; links: string; perLink: string; perSharer: string }> = [
  { section: "Traditional", sharers: "390,000", links: "13", perLink: "10.1", perSharer: "129" },
  { section: "Campaign", sharers: "96,000", links: "7", perLink: "4.0", perSharer: "27" },
  { section: "Extend", sharers: "315,000", links: "6", perLink: "0.2", perSharer: "1" },
  { section: "Reframe", sharers: "80,000", links: "21", perLink: "0.8", perSharer: "16" },
  { section: "Alternative", sharers: "35,000", links: "9", perLink: "0.6", perSharer: "5" },
];

function Src({ p }: { p: string }) {
  return <span className="whitespace-nowrap text-xs text-text-muted">(Report, {p})</span>;
}

function Chapter({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 px-6 py-14"
      data-analytics-section={`french_election_${id.replace(/-/g, "_")}`}
      data-analytics-label={title}
    >
      <div className="max-w-3xl mx-auto">
        <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4">
          {String(number).padStart(2, "0")}
        </p>
        <h2
          className={`${cormorant.className} text-3xl md:text-4xl font-light text-white mb-8 leading-tight`}
        >
          {title}
        </h2>
        <div className="space-y-5 text-base font-light leading-relaxed text-text-secondary">
          {children}
        </div>
      </div>
    </section>
  );
}

function SubHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className={`${cormorant.className} pt-4 text-2xl font-normal leading-snug text-white`}>
      {children}
    </h3>
  );
}

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

            <p className={`${cormorant.className} mt-6 text-2xl italic leading-snug text-text-secondary md:text-3xl`}>
              Fake news, echo chambers and Russian influence in the 2017 French presidential
              election.
            </p>

            <div className="w-16 h-px bg-accent mt-10 mb-10" />

            <div className="space-y-5 text-lg font-light leading-relaxed text-text-secondary">
              <p>
                Around the 2017 French presidential election, Bakamo studied how French social media
                users shared news. The study mapped the media sources they linked to, the ways they
                shared them, and the patterns of disinformation that moved through the conversation.
              </p>
              <p>
                This is the final report of the study. It summarizes the earlier phases and adds new
                findings on what people share, and why. You can read it on this page, or download
                the original.
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
              <a
                href="#why"
                className="ml-8 text-sm uppercase tracking-[0.16em] text-text-muted transition-colors hover:text-white"
              >
                Read it here &darr;
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

        <div className="section-divider" />

        {/* Contents */}
        <section className="px-6 pt-16 pb-4" aria-labelledby="report-contents">
          <div className="max-w-3xl mx-auto">
            <p id="report-contents" className="text-accent uppercase tracking-[0.2em] text-sm mb-4">
              Read the report
            </p>
            <p className="mb-8 text-base font-light leading-relaxed text-text-secondary">
              The original is a 175-page slide deck. What follows is the same report as a page you
              can read: its argument, its numbers and its examples, in the order the report gives
              them.
            </p>
            <nav aria-label="Report contents">
              <ol className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
                {CHAPTERS.map((chapter, index) => (
                  <li key={chapter.id}>
                    <a
                      href={`#${chapter.id}`}
                      className="group flex items-baseline gap-3 text-base font-light text-text-secondary transition-colors hover:text-white"
                    >
                      <span className="text-xs tabular-nums text-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="group-hover:underline underline-offset-4">{chapter.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </section>

        <Chapter id="why" number={1} title="Why the study was done">
          <p>
            Social media hosts a significant part of public discourse and has a growing effect on
            people’s opinions and choices. The Internet has changed how people come across news,
            and it has reduced the role of information gatekeepers such as traditional media.{" "}
            <Src p="p. 2" />
          </p>
          <p>
            By 2017 the debate was fuelled by the perceived rise of disinformation (fake news,
            manipulation and foreign influence) in elections in the United Kingdom, the United
            States and Colombia. None of these were new. Their spread through social media was.{" "}
            <Src p="p. 2" />
          </p>
          <p>
            The study set out to map the space between the news media and their audiences in the
            months before the French presidential election: what kinds of content circulated, how
            people behaved with it, and how disinformation moved. It is an exploratory study. It
            confirms three assumptions that were widely held at the time: that far-right media
            content had a massively outsized presence in French social media, that manipulation
            techniques were used to boost it, and that Russian attempts to influence French media
            reporting before the election were real. <Src p="pp. 3–4" />
          </p>
        </Chapter>

        <Chapter id="media-map" number={2} title="The Media Map">
          <p>
            The Media Map charts the sources French social media users linked to when they talked
            about the election, the candidates, the parties or the issues. The more often users
            shared links to a source, the larger it appears on the map. Five types of source were
            publishing content relevant to the public discourse. <Src p="pp. 10, 44" />
          </p>
          <dl className="divide-y divide-white/10 border-y border-white/10">
            {MEDIA_MAP_SECTIONS.map((section) => (
              <div
                key={section.name}
                className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-2 py-5 md:grid-cols-[9rem_4rem_1fr]"
              >
                <dt className="text-sm uppercase tracking-[0.16em] text-white">{section.name}</dt>
                <dd className={`${cormorant.className} text-2xl leading-none text-accent md:order-none`}>
                  {section.share}
                </dd>
                <dd className="col-span-2 md:col-span-1">{section.detail}</dd>
              </div>
            ))}
          </dl>
          <p>
            The percentages are each section’s share of shared links. Traditional media and
            campaign sites together account for 57 percent. The other 43 percent points to
            non-traditional sources, and the study concentrates on those three sections.{" "}
            <Src p="pp. 11, 44–45, 47" />
          </p>
          <p>
            Sharing rose as the election came closer. New users joined the conversation steadily,
            and each user shared more. Traditional and campaign sources gained most: in April,
            almost two thirds of the content shared came from traditional news or official campaign
            sources. Non-traditional sources did not benefit as much from the extra attention, but
            remained a significant part of the discourse. <Src p="pp. 53–54" />
          </p>
        </Chapter>

        <Chapter id="narrative-frames" number={3} title="Two narrative frames">
          <p>
            Sources position themselves through a narrative frame, a binary opposition that
            organises how they present the world. The study found two. <Src p="pp. 12, 46" />
          </p>
          <SubHeading>Left versus right</SubHeading>
          <p>
            The established frame. It works for traditional media, and for the Extend section,
            where sources may hold opposing views but still argue along the same left-to-right
            line. It applies less to Reframe sources, and content in the Alternative section cannot
            be classified by it at all. <Src p="p. 46" />
          </p>
          <SubHeading>Global versus local</SubHeading>
          <p>
            The further a source sits from traditional media, the less a left or right label fits.
            In its place is a divide that pits globalization and transnational organizations against
            local, patriotic interests. Hard-left and hard-right Reframe sources converge here.
            They differ mainly in their attitudes to Islam and migrants, and otherwise share one
            enemy: globalization and the liberal economics associated with it. Alternative sources
            are fully immersed in this frame. <Src p="pp. 12, 46" />
          </p>
        </Chapter>

        <Chapter id="clusters" number={4} title="17 clusters of non-traditional media">
          <p>
            The study took the 800 non-traditional sources shared most often and grouped them by
            what they publish, the narrative frame they use, who they reject, who they cite, how
            they look, which candidates they support, whether they show Russian influence, and
            whether they carry advertising. The result is 17 clusters. <Src p="pp. 14, 47" />
          </p>
          <figure className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-white">
            <Image
              src="/media/french-election/media-map.png"
              alt="The Media Map from the report: 17 clusters of non-traditional media sources placed across the Extend, Reframe and Alternative sections, sized by how often they were shared."
              width={1500}
              height={895}
              sizes="(min-width: 768px) 768px, 100vw"
              className="h-auto w-full"
            />
            <figcaption className="border-t border-black/10 bg-near-black px-5 py-3 text-xs text-text-muted">
              The Media Map. 800 non-traditional media sources fall into 17 clusters. Report, p. 13.
            </figcaption>
          </figure>
          <div className="grid gap-8 sm:grid-cols-3">
            {CLUSTERS.map((group) => (
              <div key={group.section}>
                <p className="mb-3 text-xs uppercase tracking-[0.18em] text-accent">{group.section}</p>
                <ul className="space-y-2 text-sm">
                  {group.names.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p>
            The Extend section is dominated by petition sites, comedy and non-partisan blogs. The
            Reframe section is dominated by three hard-right clusters that are closely intertwined:
            French Identity, Anti-Islam and Anti-Global Patriots. These three resonated most of all
            non-traditional sources. <Src p="pp. 13–14, 48" />
          </p>
          <SubHeading>Who the clusters supported</SubHeading>
          <p>
            A large share of non-traditional sources openly backed a candidate, and support was
            strongest for candidates with an anti-establishment agenda. Marine Le Pen and the Front
            National dominate the largest clusters. Sources in the French Identity cluster
            overwhelmingly supported her, with a few backing François Fillon. In the Anti-Islam
            cluster she was the only candidate supported. <Src p="pp. 17, 50" />
          </p>
          <p>
            The Anti-Global Patriots cluster supported both Le Pen and Jean-Luc Mélenchon, two
            candidates traditionally placed at opposite ends of the spectrum. On the left of the
            Reframe section, the Anti-Corporate and Anti-Imperialist clusters mainly supported
            Mélenchon and Philippe Poutou and, to a limited extent, Le Pen. The report reads this
            as further evidence that the global versus local frame is superseding left versus
            right. <Src p="p. 50" />
          </p>
        </Chapter>

        <Chapter id="foreign-influence" number={5} title="Foreign influence">
          <p>
            Each source was checked against four criteria: overt support for a foreign nation’s
            views or policy goals, use of foreign media to counter traditional media narratives,
            recommendations of and links to foreign media, and French-language sources operated
            from abroad. At least five articles from each source were read, along with the
            source’s permanent content. <Src p="p. 51" />
          </p>
          <p>
            The only foreign influence the analysis identified was Russian. It shows in citations
            of Russian broadcasters such as RT and Sputnik, and in a range of French-speaking
            Russian news blogs. Some sources are marked as Russian outright, and some link directly
            to Russian government institutions. <Src p="pp. 17, 51–52" />
          </p>
          <ul className="list-disc space-y-3 pl-5 marker:text-accent">
            <li>
              In the Alternative section, almost half of the sources in both clusters show signs of
              Russian influence.
            </li>
            <li>
              In the Reframe section, one third of the sources in the French Identity and
              Anti-Islam clusters show such signs, as does one third of the hard-left
              Anti-Imperialist cluster. In Anti-Global Patriots it is one tenth.
            </li>
            <li>
              The impact is greatest on the far right, because those clusters reach a much larger
              audience.
            </li>
          </ul>
          <p>
            Russian content tends to be set against stories reported by traditional media, to show
            that traditional media does not tell the whole story. A dominant theme is the war in
            Syria and the refugee crisis. <Src p="p. 52" />
          </p>
          <p>
            The report is explicit about the limit of this finding. Its approach is not suited to
            detecting intentional manipulation or state-sponsored campaigns. It identifies
            correlation, not causality. <Src p="p. 52" />
          </p>
        </Chapter>

        <Chapter id="sharing" number={6} title="How people share">
          <p>
            Influence on social media does not come from publishing alone. It comes from users
            sharing content and responding to it. The study describes this as two steps: people
            post a link to their followers, and other people discuss it. <Src p="pp. 57, 59" />
          </p>
          <SubHeading>Three ways of posting</SubHeading>
          <ul className="space-y-4">
            <li>
              <strong className="font-normal text-white">Repeat.</strong> The post contains the
              title of the article and the link, with no personal comment. It amplifies the article
              and affirms membership of a community.
            </li>
            <li>
              <strong className="font-normal text-white">Mission.</strong> The user frames the
              article with their own interpretation and puts it to work for their own objectives.
              It is an opening for others to join the discussion.
            </li>
            <li>
              <strong className="font-normal text-white">Provoke.</strong> The article is shared
              with a message written to hurt and humiliate people who hold the opposite view.
            </li>
          </ul>
          <p>
            Repeat is the most widespread behaviour in every section, and it is more dominant
            still in the Reframe and Alternative sections. More than half of the entire discourse
            consists of shared news articles without a personal opinion.{" "}
            <Src p="pp. 15, 32, 61" />
          </p>
          <SubHeading>Three ways of responding</SubHeading>
          <p>
            People who comment on a shared article either agree with it publicly, debate it in an
            honest effort to reach consensus, or debunk it. Debunking often rests on fact-checking.
            It is also used as a weapon: content that may be true but runs counter to a user’s
            view is “debunked” by citing counter fact-checkers that claim to expose manipulation by
            traditional media. <Src p="p. 72" />
          </p>
          <SubHeading>The numbers</SubHeading>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[32rem] border-y border-white/10 text-left text-sm">
              <thead>
                <tr className="text-xs uppercase tracking-[0.14em] text-accent">
                  <th scope="col" className="py-3 pr-4 font-normal">Section</th>
                  <th scope="col" className="py-3 pr-4 text-right font-normal">Unique sharers</th>
                  <th scope="col" className="py-3 pr-4 text-right font-normal">Links per sharer</th>
                  <th scope="col" className="py-3 pr-4 text-right font-normal">Engagement per link</th>
                  <th scope="col" className="py-3 text-right font-normal">Engagement per sharer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 border-t border-white/10 tabular-nums">
                {SHARING_METRICS.map((row) => (
                  <tr key={row.section}>
                    <th scope="row" className="py-3 pr-4 font-light text-white">{row.section}</th>
                    <td className="py-3 pr-4 text-right">{row.sharers}</td>
                    <td className="py-3 pr-4 text-right">{row.links}</td>
                    <td className="py-3 pr-4 text-right">{row.perLink}</td>
                    <td className="py-3 text-right">{row.perSharer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            About 390,000 unique users shared content from traditional media, and 354,000 shared
            content from the three non-traditional sections. The 80,000 users sharing Reframe
            sources stand out: a fairly small group that posted more links per person than any
            other and drove a huge amount of content into the discourse. <Src p="p. 85" />
          </p>
          <SubHeading>Almost nobody shares across the divide</SubHeading>
          <p>
            The study looked at the 100 sharers with the most followers. 34 of them shared content
            from both the Reframe and Alternative sections, the largest overlap on the map. No more
            than 3 shared content across the divide that separates Reframe and Alternative sources
            from traditional media. <Src p="p. 86" />
          </p>
          <p>
            Two things follow. Confusing and conspiratorial narratives reach a much larger pool of
            users through the people who share both Alternative and Reframe content. And with
            virtually no sharing across the divide, users stay inside their own narratives, sure
            only that the other side is receiving biased information. <Src p="p. 87" />
          </p>
        </Chapter>

        <Chapter id="disinformation" number={7} title="Four disinformation tactics">
          <p>
            Sources in the Reframe and Alternative sections seek to counter traditional media
            narratives. The study observed four patterns by which false or deliberately confusing
            information entered the discourse. They share one strategy: borrow the authority of
            traditional sources while using it to undermine them. The result is a general sense of
            distrust and chaos, which makes radical solutions more appealing. <Src p="p. 90" />
          </p>
          <SubHeading>Credibility cloak</SubHeading>
          <p>
            Respected outlets host open platforms where anyone can publish. A false story placed
            there is then presented as if the outlet itself had reported it. The campaign linking
            Emmanuel Macron to offshore funds began with an article on the open collaborative blog
            attached to Mediapart. It never explicitly accused Macron, but the suggestion spread
            through the hashtag #EmmanuelCahuzac, shared by people who believed, or pretended to
            believe, that Mediapart was the author. A more radical version alleges censorship: one
            site claimed that an investigative newspaper held a report on Macron’s offshore
            accounts and that its own editors had censored it. <Src p="pp. 91–92" />
          </p>
          <SubHeading>Time shifting</SubHeading>
          <p>
            Information that was true when it was published is recycled, often without its date,
            to give the impression that it still holds. In April an article announced that François
            Fillon had been cleared in the “fake job” scandal, citing a lawyer’s opinion from the
            end of February. Fillon had been indicted a month after that opinion was given.{" "}
            <Src p="p. 93" />
          </p>
          <SubHeading>Fake polls</SubHeading>
          <p>
            Unscientific polls were published in the months before the vote, alongside the claim
            that traditional polling was biased towards the candidate of the elite. On 29 March,
            Sputnik reported a poll by Brand Analytics, a Moscow-based social media company, that
            showed Fillon in the lead. Reframe sources cited it as proof that classical polling was
            unreliable. That these polls proved inaccurate is immaterial. They created uncertainty
            and undermined legitimate polls. <Src p="pp. 16, 94" />
          </p>
          <SubHeading>Hoax sites</SubHeading>
          <p>
            Cloned websites imitated reputable ones. LeSoir.info copied the look of the Belgian
            newspaper site LeSoir.be to publish a false allegation that Macron received financial
            support from Saudi Arabia. Another site imitated LinkedIn to post a fake, disparaging
            profile of Macron. <Src p="p. 95" />
          </p>
          <p>
            Sharing behaviour suggests these campaigns work on an emotional level. People
            understand the information to be false, yet pass it on to soothe their anger.{" "}
            <Src p="p. 16" />
          </p>
        </Chapter>

        <Chapter id="implications" number={8} title="What it means">
          <SubHeading>There is virtually no common ground</SubHeading>
          <p>
            Public discourse needs people to see and understand views other than their own. The
            study found the conversation around the election partitioned into two camps:
            traditional media and the Extend section on one side, the Reframe and Alternative
            sections on the other. The second camp is home to multiple echo chambers. Its sources
            define themselves by “re-information”, the need to counter an alleged elitist deceit,
            and their content reduces the chance of common ground with anyone who does not already
            share their view. <Src p="pp. 19–20" />
          </p>
          <SubHeading>Fake news is emotional, not factual</SubHeading>
          <p>
            Fake news stories are episodic bursts. They grow out of the counter-narratives of the
            Reframe and Alternative sections, and the two cannot be separated. Counter-narratives
            speak to frustration and fear, and they raise a user’s sense of self-worth. A fake
            story works as a proof-point for the counter-narrative, and efforts by traditional
            authorities to debunk it only reinforce its credibility. <Src p="pp. 21–22" />
          </p>
          <SubHeading>Narratives travel along three routes</SubHeading>
          <p>
            Extend publications elaborate on and critique traditional media. Reframe sources use
            the conspiratorial narratives of Alternative sources to prove traditional media wrong,
            exposing a broader audience to them. And both Reframe and Alternative sources cite
            French-language content from Russian sources, which gives the counter-narrative a
            constant stream of stories. <Src p="p. 23" />
          </p>
          <SubHeading>By sharing, people seek community and identity</SubHeading>
          <p>
            Users form a symbolic relationship with the publications that match their views. The
            publication says what resonates, and the audience takes it upon itself to amplify it.
            The exchange confirms a feeling: “My opinion is that of many.” The quest for belonging
            is a strong driver of behaviour, most visibly around Reframe and Alternative sources,
            where sharing polarizing content becomes a display of identity. The report reads this
            as a sign that these users experience insecurity and emotional distress in everyday
            life. <Src p="pp. 24–25" />
          </p>
          <SubHeading>Debunking has its limits</SubHeading>
          <p>
            Fact-checking is necessary but has limited impact, and may backfire. Refutations do not
            reach the people who posted the story, and may be read as confirmation that it was
            true. Reframe and Alternative media run their own counter fact-checkers. And fighting
            false stories one by one leaves the larger counter-narrative, and the issues that
            inspired it, untouched. <Src p="p. 26" />
          </p>
        </Chapter>

        <Chapter id="recommendations" number={9} title="Recommendations">
          <p>
            The recommendations rest on one premise: open, successful, democratic societies require
            a healthy public discourse. <Src p="p. 27" />
          </p>
          <SubHeading>For media organizations</SubHeading>
          <p>
            The study indicates that about one third of the audience has disengaged from
            traditional sources of information. To win it back: address contentious topics such as
            national identity, community and migration in non-nativist frames; simplify language
            and avoid labels, which create distance; tell audiences that the counter-narrative
            exists; and give hostile audiences space to voice their concerns. <Src p="p. 29" />
          </p>
          <SubHeading>For social media platforms</SubHeading>
          <p>
            Platforms are part of the infrastructure of public discourse, and their business
            interest is time on site, not common ground. The report asks them to discourage the
            Repeat behaviour and rank meaningful conversations higher; to fight botnets and
            eliminate fake accounts; to make the mechanisms that select and prioritize content
            understandable to any member of the public; to make all paid political communication
            public; and to take active steps against echo chambers, including exposing segregated
            communities to other views. <Src p="pp. 30–35" />
          </p>
          <SubHeading>For regulators and political actors</SubHeading>
          <p>
            Regulators should educate citizens about personalization and targeting, create a legal
            framework that enforces transparency on moderation, content prioritization and targeted
            dark advertising, and monitor and publish campaign spending. Political actors should
            adhere to a transparent code of conduct covering their data operations, their targeting
            of voter segments and their use of dark advertising. <Src p="pp. 36–37" />
          </p>
          <SubHeading>For citizens</SubHeading>
          <p>
            Follow people you do not agree with. Do not simply share articles: say what they mean
            to you. Pay for journalism. Explore the media landscape and be your own fact-checker.
            Press the platforms to change. <Src p="p. 38" />
          </p>
        </Chapter>

        <Chapter id="methodology" number={10} title="Methodology">
          <p>
            The method combines technology with human qualitative analysis at scale, and is built
            to discover what users share and why. Every insight in the report comes from public
            social media conversation. <Src p="p. 42" />
          </p>
          <p>
            Data was collected with Talkwalker using several hundred keywords in four categories:
            election terms, candidates, parties and issues. A comment had to be in French and had
            to contain a shared link. The resulting dataset held over one hundred million comments,
            of which a random sample of 300,000 was downloaded for further processing.{" "}
            <Src p="p. 167" />
          </p>
          <p>
            Posts and comments were then coded by hand, through human reading and interpretation.
            A random sample was drawn for each cluster: 5,000 posts in total, and 4,200 Facebook
            comments on those posts. <Src p="p. 174" />
          </p>
          <p>
            The full report adds a cluster-by-cluster analysis with quoted posts, and the five
            steps used to build the Media Map.{" "}
            <a
              href={REPORT_PATH}
              type="application/pdf"
              className="text-accent hover:underline underline-offset-4"
              data-analytics-event="cta_click"
              data-analytics-label="Download French Election Report"
              data-analytics-location="french_election_methodology"
              data-analytics-destination={REPORT_PATH}
            >
              Download it as a PDF
            </a>
            .
          </p>
        </Chapter>

        <div className="section-divider" />

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
