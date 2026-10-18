import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import Link from "next/link";
import { BOOKING_HREF } from "@/lib/booking";
import { ORGANIZATION_REF, pageOpenGraph } from "@/lib/seo";
import { SITE_URL } from "@/lib/site-url";
import {
  ANXIETIES,
  COUNTRIES,
  NARRATIVES,
  TIMELINE,
  formatPct,
  leadingNarrative,
} from "@/data/migration-narratives";
import { SelectionProvider } from "@/components/migration-narratives/SelectionContext";
import TileMap from "@/components/migration-narratives/TileMap";
import CountryBars, { NarrativeLegend } from "@/components/migration-narratives/CountryBars";
import Scatter from "@/components/migration-narratives/Scatter";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["normal", "italic"],
  display: "swap",
});

// Every figure on this page comes from the FES final report and the 28 country
// reports, through src/data/migration-narratives.ts. Do not add figures that
// are not in them.

const TITLE = "Migration narratives in Europe";
const PAGE_PATH = "/research/migration-narratives-eu";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const FES_PDF = "/media/FES_Final%20Report_FINAL%20VERSION.pdf";
const DESCRIPTION =
  "One year of public social media conversation about migration in all 28 EU member states, read in each country's own language. Five narratives, and the weight each one carries country by country.";

export const metadata: Metadata = {
  title: `${TITLE}: the 28-country dashboard`,
  description: DESCRIPTION,
  alternates: {
    canonical: PAGE_PATH,
  },
  openGraph: { ...pageOpenGraph(PAGE_PATH, `${TITLE} | Bakamo`, DESCRIPTION), type: "article" },
};

const ARTICLE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  "@id": `${PAGE_URL}#dataset`,
  name: "Migration Narratives in Europe, 28 country shares",
  description: DESCRIPTION,
  url: PAGE_URL,
  inLanguage: "en",
  creator: ORGANIZATION_REF,
  publisher: ORGANIZATION_REF,
  temporalCoverage: "2017-08-01/2018-07-31",
  spatialCoverage: "European Union, 28 member states",
  isBasedOn: {
    "@type": "Report",
    name: "Migration Narratives in Europe",
    url: `${SITE_URL}${FES_PDF}`,
    encodingFormat: "application/pdf",
    datePublished: "2019",
    author: ORGANIZATION_REF,
  },
};

const DEFAULT_COUNTRY = "DE";

const totalPosts = COUNTRIES.reduce((a, c) => a + c.total_posts, 0);

const NARRATIVE_CARDS = NARRATIVES.map((n) => {
  const share =
    (100 * COUNTRIES.reduce((a, c) => a + c.total_posts * ((c.narratives_pct[n.key] || 0) / 100), 0)) /
    totalPosts;
  const top = [...COUNTRIES].sort(
    (a, b) => (b.narratives_pct[n.key] || 0) - (a.narratives_pct[n.key] || 0),
  )[0];
  const leads = COUNTRIES.filter((c) => leadingNarrative(c).key === n.key).length;
  return { ...n, share, top, leads };
});

const ANXIETY_CARDS = ANXIETIES.map((g) => ({
  ...g,
  codes: COUNTRIES.filter((c) => g.pattern.test(c.existential_anxiety)).map((c) => c.code),
}));

const TABLE_ROWS = [...COUNTRIES].sort((a, b) => a.country.localeCompare(b.country));

function Chapter({
  id,
  number,
  title,
  note,
  children,
}: {
  id: string;
  number: number;
  title: string;
  note: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-28 border-t border-white/10 px-6 py-12"
      data-analytics-section={`migration_narratives_${id.replace(/-/g, "_")}`}
      data-analytics-label={title}
    >
      <div className="mx-auto grid max-w-6xl gap-6">
        <div className="grid grid-cols-[56px_1fr] items-start gap-3.5">
          <span
            className={`${cormorant.className} pt-0.5 text-[1.9rem] leading-none tabular-nums text-accent`}
            aria-hidden="true"
          >
            {String(number).padStart(2, "0")}
          </span>
          <div className="grid gap-2">
            <h2 className={`${cormorant.className} text-3xl font-light leading-[1.08] text-white md:text-4xl`}>
              {title}
            </h2>
            <p className="max-w-[72ch] text-[0.84rem] font-light leading-relaxed text-text-muted">{note}</p>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

function Card({
  label,
  children,
  style,
}: {
  label?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div className="grid min-w-0 content-start gap-2 border border-white/10 bg-dark-grey p-[18px]" style={style}>
      {label ? <p className="text-[0.7rem] uppercase tracking-[0.22em] text-accent">{label}</p> : null}
      {children}
    </div>
  );
}

export default function MigrationNarrativesPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-near-black pb-24 text-text-primary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }}
      />
      <div className="grain-overlay" />

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
        <header
          className="relative px-6 pb-12 pt-32 md:pt-44"
          data-analytics-section="migration_narratives_hero"
          data-analytics-label="Migration Narratives Hero"
        >
          <div className="mx-auto grid max-w-6xl gap-5">
            <nav aria-label="Breadcrumb">
              <Link
                href="/research"
                className="text-xs uppercase tracking-[0.18em] text-text-muted transition-colors hover:text-white"
              >
                Research
              </Link>
            </nav>
            <p className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-accent">
              Bakamo Public for the Friedrich-Ebert-Stiftung
            </p>
            <h1
              className={`${cormorant.className} text-[clamp(2.4rem,5.6vw,4.2rem)] font-light leading-[1.08] tracking-tight text-white`}
            >
              {TITLE}
            </h1>
            <p className="max-w-[60ch] text-[1.08rem] font-light leading-relaxed text-text-secondary">
              One year of public social media conversation about migration in all 28 EU member
              states, read in each country&apos;s own language. The study found five narratives
              present in every country. What differs from country to country is the weight each one
              carries.
            </p>
            <div className="flex flex-wrap gap-x-7 gap-y-2.5 text-[0.84rem] text-text-muted">
              <span>
                <b className="font-medium tabular-nums text-white">45M</b> posts collected
              </span>
              <span>
                <b className="font-medium tabular-nums text-white">28</b> member states
              </span>
              <span>
                <b className="font-medium tabular-nums text-white">10,000+</b> posts read per country
              </span>
              <span>
                <b className="font-medium tabular-nums text-white">100+</b> native readers
              </span>
              <span>1 Aug 2017 to 31 Jul 2018</span>
            </div>
            <p className="text-[0.84rem] text-text-muted">
              <a
                href={FES_PDF}
                type="application/pdf"
                className="text-accent underline-offset-[3px] hover:underline"
                data-analytics-event="cta_click"
                data-analytics-label="Download FES Report"
                data-analytics-location="migration_narratives_hero"
                data-analytics-destination={FES_PDF}
              >
                Download the final report (PDF)
              </a>
            </p>
          </div>
        </header>

        {/* 01 The five narratives */}
        <Chapter
          id="stories"
          number={1}
          title="The five narratives"
          note="Found first by reading in six countries, then confirmed in all 28. Each narrative is a topic, not a stance: it holds both anti-migrant and pro-migrant voices. The share is post-weighted across the 28 conversations."
        >
          <div className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-3">
            {NARRATIVE_CARDS.map((n) => (
              <div
                key={n.key}
                className="grid min-w-0 content-start gap-2.5 border border-white/10 bg-dark-grey p-[18px]"
                style={{ borderTopWidth: 3, borderTopColor: n.color }}
              >
                <div className={`${cormorant.className} text-[2.4rem] leading-none tabular-nums text-white`}>
                  {formatPct(n.share)}
                  <small className="ml-1 font-sans text-[0.95rem] text-text-muted">of all posts</small>
                </div>
                <h3 className={`${cormorant.className} text-[1.25rem] font-normal text-white`}>{n.label}</h3>
                <p className="text-[0.82rem] font-light leading-relaxed text-text-secondary">{n.description}</p>
                <p className="text-[0.74rem] text-text-muted">
                  Highest in <b className="font-medium text-white">{n.top.country}</b> at{" "}
                  {formatPct(n.top.narratives_pct[n.key])}. Leads in{" "}
                  <b className="font-medium text-white">{n.leads}</b> of 28.
                </p>
              </div>
            ))}
          </div>
        </Chapter>

        <SelectionProvider initial={DEFAULT_COUNTRY}>
          {/* 02 Tile map */}
          <Chapter
            id="map"
            number={2}
            title="Which story leads where"
            note="Each tile is a country, coloured by its leading narrative. The small number is the fear share: security and identity added together. Tap a tile to open the country."
          >
            <div className="grid items-start gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(240px,0.9fr)]">
              <TileMap />
              <div className="grid gap-3.5">
                <NarrativeLegend />
                <Card label="The line through Europe">
                  <p className="text-[0.9rem] font-light leading-relaxed text-text-secondary">
                    Security leads from Estonia down to Bulgaria and across Austria and Germany.
                    Humanitarian talk leads along the Atlantic and the Mediterranean. The Netherlands
                    is the one country where identity leads outright. Denmark is the one where the
                    economy comes close to leading.
                  </p>
                </Card>
                <Card label="Fear where migrants are not">
                  <p className="text-[0.9rem] font-light leading-relaxed text-text-secondary">
                    Hungary and Poland had among the fewest asylum seekers in the union and the
                    highest fear shares. In both, the report found the conversation kept alive by
                    domestic politics and by news of crime abroad rather than by migrants present in
                    the country.
                  </p>
                </Card>
              </div>
            </div>
          </Chapter>

          {/* 03 Bars and detail */}
          <Chapter
            id="shape"
            number={3}
            title="The shape of each country's conversation"
            note="Each bar is one country's year of conversation, split by narrative. Click a bar to read what the conversation is really about. Sort to see the fault lines."
          >
            <CountryBars displayClass={cormorant.className} />
          </Chapter>

          {/* 04 Scatter */}
          <Chapter
            id="line"
            number={4}
            title="Where fear grows, compassion shrinks"
            note="The report's central finding, drawn to scale. Each dot is a country. Up is more security and identity talk; right is more humanitarian talk. Dot size follows the log of conversation volume."
          >
            <div className="grid items-start gap-6 md:grid-cols-[minmax(0,1fr)_minmax(240px,0.6fr)]">
              <div className="min-w-0 border border-white/10 bg-dark-grey p-3">
                <Scatter />
              </div>
              <Card label="How to read it">
                <p className="text-[0.9rem] font-light leading-relaxed text-text-secondary">
                  Countries sit on a line from top left to bottom right. In the top left, migrants
                  are scarcely present and the conversation is about threat. In the bottom right, the
                  fight is over whether the state helps too much or too little.
                </p>
                <p className="text-[0.9rem] font-light leading-relaxed text-text-secondary">
                  Humanitarian talk is not the same as support. In France and Spain, anti-migrant
                  voices argue inside the humanitarian frame: these people are not real refugees, so
                  they do not deserve help.
                </p>
                <p className="text-[0.9rem] font-light leading-relaxed text-text-secondary">
                  Two countries sit off the line. The United Kingdom is the one large conversation
                  high on both security and humanitarian talk. The Netherlands is the one country
                  where identity leads.
                </p>
              </Card>
            </div>
          </Chapter>
        </SelectionProvider>

        {/* 05 Anxieties */}
        <Chapter
          id="under"
          number={5}
          title="What the local reading found"
          note="The country-by-country reading found that the narratives are carried by local issues and by three anxieties: fear for personal safety, lack of economic stability, and a sense of lost cultural identity. Each country report names which one is at work."
        >
          <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3">
            {ANXIETY_CARDS.map((g) => (
              <Card key={g.title} style={{ borderTopWidth: 2, borderTopColor: g.color }}>
                <div className={`${cormorant.className} text-[2.2rem] leading-none text-white`}>{g.codes.length}</div>
                <h3 className={`${cormorant.className} text-[1.4rem] font-normal text-white`}>{g.title}</h3>
                <p className="text-[0.9rem] font-light leading-relaxed text-text-secondary">{g.description}</p>
                <p className="text-[0.9rem] font-light leading-relaxed text-text-secondary">
                  Named in {g.codes.length} of 28 country reports. A country can appear under more
                  than one.
                </p>
                <p className="text-[0.78rem] text-text-muted">{g.codes.join(" · ")}</p>
              </Card>
            ))}
          </div>
        </Chapter>

        {/* 06 Timeline */}
        <Chapter
          id="since"
          number={6}
          title="Before and since"
          note="The EU 28 study is the largest of a series. Bakamo has read migration conversation in the local language since 2015, in Europe and beyond it."
        >
          <ol className="relative grid auto-cols-[minmax(200px,1fr)] grid-flow-col gap-3.5 overflow-x-auto pb-2 before:absolute before:inset-x-0 before:top-[7px] before:h-px before:bg-border-grey">
            {TIMELINE.map((e) => (
              <li key={e.year + e.where} className="relative grid min-w-0 content-start gap-1.5 pt-[22px]">
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-0.5 h-[11px] w-[11px] rounded-full border-[1.5px] border-accent ${
                    e.here ? "bg-accent" : "bg-near-black"
                  }`}
                />
                <span className={`${cormorant.className} text-[1.5rem] leading-none text-white`}>{e.year}</span>
                <span className="text-[0.82rem] font-medium text-white">{e.where}</span>
                <span className="text-[0.74rem] uppercase tracking-[0.06em] text-accent">{e.client}</span>
                <p className="text-[0.8rem] font-light leading-relaxed text-text-secondary">{e.text}</p>
                <span className="text-[0.74rem] tabular-nums text-text-muted">{e.scale}</span>
              </li>
            ))}
          </ol>
          <Card label="Keep it current">
            <p className="text-[0.9rem] font-light leading-relaxed text-text-secondary">
              The same reading can be repeated for one country or one migrant community, as a
              baseline and then in waves, so the shifts in the five narratives are seen as they
              happen.
            </p>
            <Link
              href={BOOKING_HREF}
              className="mt-2 inline-flex w-max items-center gap-2.5 rounded-[2px] border border-accent px-[18px] py-2.5 text-[0.82rem] uppercase tracking-[0.1em] text-accent transition-colors hover:bg-accent-dim"
              data-analytics-event="book_demo_click"
              data-analytics-label="Book a meeting"
              data-analytics-location="migration_narratives_since"
              data-analytics-destination={BOOKING_HREF}
            >
              Book a meeting
            </Link>
          </Card>
        </Chapter>

        {/* 07 Table */}
        <Chapter
          id="numbers"
          number={7}
          title="All the numbers"
          note="Share of each country's conversation by narrative, as printed in the 28 country reports. Where a report printed counts only, the share was computed from them."
        >
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-[0.82rem] tabular-nums">
              <thead>
                <tr>
                  <th scope="col" className="whitespace-nowrap border-b border-white/10 px-2 py-1.5 text-left font-medium text-text-muted">
                    Country
                  </th>
                  <th scope="col" className="whitespace-nowrap border-b border-white/10 px-2 py-1.5 text-right font-medium text-text-muted">
                    Posts
                  </th>
                  {NARRATIVES.map((n) => (
                    <th
                      key={n.key}
                      scope="col"
                      className="whitespace-nowrap border-b border-white/10 px-2 py-1.5 text-right font-medium text-text-muted"
                    >
                      {n.label}
                    </th>
                  ))}
                  <th scope="col" className="whitespace-nowrap border-b border-white/10 px-2 py-1.5 text-left font-medium text-text-muted">
                    Leads
                  </th>
                </tr>
              </thead>
              <tbody>
                {TABLE_ROWS.map((c) => (
                  <tr key={c.code}>
                    <th scope="row" className="whitespace-nowrap border-b border-white/10 px-2 py-1.5 text-left font-light text-white">
                      {c.country}
                    </th>
                    <td className="whitespace-nowrap border-b border-white/10 px-2 py-1.5 text-right text-text-secondary">
                      {c.total_posts.toLocaleString("en-GB")}
                    </td>
                    {NARRATIVES.map((n) => (
                      <td
                        key={n.key}
                        className="whitespace-nowrap border-b border-white/10 px-2 py-1.5 text-right text-text-secondary"
                      >
                        {formatPct(c.narratives_pct[n.key])}
                      </td>
                    ))}
                    <td className="whitespace-nowrap border-b border-white/10 px-2 py-1.5 text-left text-text-secondary">
                      {leadingNarrative(c).label}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[0.78rem] leading-relaxed text-text-muted">
            Source: Bakamo Public for the Friedrich-Ebert-Stiftung, Migration Narratives in Europe,
            2019, final report and 28 country reports. Data gathered with Talkwalker from public
            posts on news sites, forums, blogs, Twitter and Instagram. Facebook was not available.
            The series entries cite Bakamo for the Open Society Foundations, 2015; Bakamo for the
            International Centre for Policy Advocacy, 2021; Bakamo, Turkish Migration Discourse and
            Sentiment, 2021; Gallup International and Bakamo, 2023.
          </p>
        </Chapter>
      </article>
    </main>
  );
}
