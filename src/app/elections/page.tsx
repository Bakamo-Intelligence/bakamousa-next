import type { Metadata } from "next";
import { ORGANIZATION_REF, pageOpenGraph } from "@/lib/seo";
import { SITE_URL } from "@/lib/site-url";
import { Cormorant_Garamond } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const PAGE_TITLE = "Hungarian Election 2026: Social Media Psychographic Analysis";
const PAGE_DESCRIPTION =
  "Before Hungary's April 2026 vote, Tisza supporters showed a 12.4-point higher inner-directed share online than Fidesz supporters. Updated with the result.";
const DATE_PUBLISHED = "2026-03-23";
const DATE_MODIFIED = "2026-09-15";

// Final result of the 12 April 2026 election, as published by the National
// Election Office (NVI). Checked 15 September 2026.
const NVI_RESULTS_URL = "https://vtr.valasztas.hu/ogy2026";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/elections",
  },
  openGraph: {
    ...pageOpenGraph(
      "/elections",
      `${PAGE_TITLE} | Bakamo`,
      "What Bakamo's March briefing found in Hungarian social media, and how it reads next to the official result of the 12 April 2026 election.",
    ),
    type: "article",
    publishedTime: DATE_PUBLISHED,
    modifiedTime: DATE_MODIFIED,
  },
};

const ARTICLE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  datePublished: DATE_PUBLISHED,
  dateModified: DATE_MODIFIED,
  author: ORGANIZATION_REF,
  publisher: ORGANIZATION_REF,
  about: {
    "@type": "Event",
    name: "2026 Hungarian parliamentary election",
    startDate: "2026-04-12",
    location: { "@type": "Country", name: "Hungary" },
  },
  mainEntityOfPage: `${SITE_URL}/elections`,
};

function PieChart({
  innerPct,
  label,
  innerLabel,
  outerLabel,
}: {
  innerPct: number;
  label: string;
  innerLabel: string;
  outerLabel: string;
}) {
  const outerPct = 100 - innerPct;
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-xs uppercase tracking-[0.18em] text-text-muted text-center">{label}</p>
      <div
        className="h-40 w-40 rounded-full"
        style={{
          background: `conic-gradient(#c9a96e 0% ${innerPct}%, #1a3550 ${innerPct}% 100%)`,
          boxShadow: "0 0 40px rgba(201,169,110,0.12)",
        }}
      />
      <div className="space-y-2 text-center">
        <div className="flex items-center gap-2 justify-center">
          <span className="h-2 w-2 rounded-full bg-accent inline-block" />
          <span className="text-sm text-text-secondary">
            Inner Directed <span className="text-white font-medium">{innerPct}%</span>
          </span>
        </div>
        <div className="flex items-center gap-2 justify-center">
          <span className="h-2 w-2 rounded-full inline-block" style={{ background: "#1a3550" }} />
          <span className="text-sm text-text-secondary">
            Outer Directed <span className="text-white font-medium">{outerPct}%</span>
          </span>
        </div>
      </div>
      <p className="sr-only">{innerLabel} inner-directed, {outerLabel} outer-directed</p>
    </div>
  );
}

function PullQuote({
  quote,
  translation,
  attribution,
}: {
  quote: string;
  translation?: string;
  attribution: string;
}) {
  return (
    <blockquote className="my-10 border-l-2 border-accent pl-6 py-1">
      <p className="text-accent italic text-lg font-light leading-relaxed">&ldquo;{quote}&rdquo;</p>
      {translation && (
        <p lang="hu" className="mt-3 text-text-muted text-sm italic leading-relaxed">{translation}</p>
      )}
      <footer className="mt-4 text-xs uppercase tracking-[0.16em] text-text-muted">{attribution}</footer>
    </blockquote>
  );
}

const PDF_PATH = "/media/Bakakmo_HU_Election_PressRelease_EN.pdf";

export default function ElectionsPage() {
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

      {/* Hero */}
      <section
        className="relative pt-32 md:pt-44 pb-16 px-6"
        data-analytics-section="elections_hero"
        data-analytics-label="Elections Hero"
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3 mb-8">
            <span className="text-xs uppercase tracking-[0.22em] text-accent border border-accent/30 rounded-full px-4 py-1">
              Research briefing
            </span>
            <span className="text-xs uppercase tracking-[0.16em] text-text-muted">
              Published <time dateTime={DATE_PUBLISHED}>23 March 2026</time>
            </span>
            <span aria-hidden="true" className="text-xs text-text-muted">
              &middot;
            </span>
            <span className="text-xs uppercase tracking-[0.16em] text-text-muted">
              Updated <time dateTime={DATE_MODIFIED}>15 September 2026</time>
            </span>
          </div>

          <p className="text-accent uppercase tracking-[0.2em] text-sm mb-6">
            Bakamo Global Social Intelligence
          </p>

          <h1
            className={`${cormorant.className} text-[clamp(2.4rem,5.5vw,4.8rem)] leading-[1.02] tracking-tight text-white`}
          >
            A Psychographic Divide in Hungarian Political Discourse: Tisza Supporters Show
            a Significantly Higher Inner-Directed&nbsp;Share
          </h1>

          <div className="w-16 h-px bg-accent mt-10 mb-10" />

          <p className="text-lg font-light leading-relaxed text-text-secondary max-w-3xl">
            Budapest &mdash; Bakamo, a global social intelligence agency, publishes findings from a
            large-scale semantic analysis of Hungarian social media conversations ahead of the April
            12, 2026 parliamentary elections. The research reveals a measurable psychographic divide
            between supporters of Tisza (Péter Magyar) and supporters of Fidesz (Viktor Orbán) &mdash;
            one with significant implications for understanding the resilience and trajectory of each
            support base.
          </p>

          <p className="mt-6 text-base font-light leading-relaxed text-text-secondary max-w-3xl">
            Bakamo conducted a qualitative semantic analysis of over 10,000 social media expressions
            (generated between March 11&ndash;18). The finding &mdash; subsequently validated at scale
            by multi-stage AI classification &mdash; is consistent: Tisza supporters produce a
            substantially higher share of inner-directed expressions than Fidesz supporters, with a
            gap of{" "}
            <span className="text-white font-medium">12.4 percentage points</span>. Both supporter
            groups are predominantly outer-directed, as is typical for political discourse on social
            media. But the difference in inner-directed share is significant, persistent across
            sources, and &mdash; we argue &mdash; carries predictive weight.
          </p>

          <div className="mt-10">
            <a
              href={PDF_PATH}
              download
              className="cta-button text-sm inline-flex items-center gap-3"
              data-analytics-event="cta_click"
              data-analytics-label="Download Full Report"
              data-analytics-location="elections_hero"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download Full Report (PDF)
            </a>
          </div>
        </div>
      </section>

      {/* Post-election update (15 September 2026), placed ahead of the March briefing. */}
      <section
        className="relative px-6 pb-16"
        aria-labelledby="after-the-vote-heading"
        data-analytics-section="elections_after_the_vote"
        data-analytics-label="After the Vote"
      >
        <div className="max-w-4xl mx-auto">
          <div
            className="rounded-[2rem] border border-accent/25 p-8 md:p-12"
            style={{
              background:
                "linear-gradient(150deg, rgba(201,169,110,0.08), rgba(20,20,20,0.94) 40%, rgba(10,10,10,0.98))",
            }}
          >
            <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4">
              Updated <time dateTime={DATE_MODIFIED}>15 September 2026</time>
            </p>
            <h2
              id="after-the-vote-heading"
              className={`${cormorant.className} text-3xl md:text-4xl font-light text-white mb-8 leading-tight`}
            >
              After the vote
            </h2>
            <div className="space-y-5 text-base font-light leading-relaxed text-text-secondary max-w-3xl">
              <p>
                In March we reported that Tisza supporters produced a higher share of inner-directed
                expressions than Fidesz supporters, &ldquo;with a gap of 12.4 percentage
                points.&rdquo; We called that gap &ldquo;a predictive indicator that Tisza&apos;s
                discourse is structured to grow&rdquo; and wrote: &ldquo;we expect this tendency to
                manifest in widening Tisza&apos;s lead in survey-based polling.&rdquo;
              </p>
              <p>
                Hungary voted on 12 April 2026. In the final result published by the{" "}
                <a
                  href={NVI_RESULTS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline underline-offset-4"
                  data-analytics-event="outbound_click"
                  data-analytics-label="NVI Official Results"
                  data-analytics-location="elections_after_the_vote"
                >
                  National Election Office
                </a>
                , Tisza won <span className="text-white font-medium">141 of the 199 seats</span> and{" "}
                <span className="text-white font-medium">53.18%</span> of valid national list votes;
                Fidesz&ndash;KDNP won 52 seats and 38.61%, and Mi Hazánk won 6 seats.
              </p>
              <p>
                The result is consistent with the direction the briefing described: the party whose
                supporters showed the higher inner-directed share won, and won by a wide margin. It
                does not confirm the mechanism.
              </p>
              <p className="text-text-primary">
                The briefing was a reading of unprompted online conversation in March, weeks before
                the vote. It was not a vote forecast or a seat model. It did not estimate vote shares,
                turnout or seats, and it cannot show whether the gap changed any vote. Its stated
                expectation was about survey-based polling, which this update does not assess. The
                limitations set out in the briefing below still apply.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Image juxtaposition */}
      <section className="px-6 pb-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">

            {/* Inner-directed */}
            <figure className="flex flex-col gap-3">
              <div className="relative overflow-hidden rounded-[1.25rem]" style={{ height: "340px" }}>
                <Image
                  src="/media/imaggeinnerdirected.png"
                  alt="Personal sign: '03.15 ITT VOLTAM — 04.12 OTT LESZEK'"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.18em] bg-accent text-black px-3 py-1 rounded-full font-semibold">
                  Inner-Directed
                </span>
              </div>
              <figcaption className="px-1">
                <p lang="hu" className="text-accent text-sm italic font-light leading-snug">
                  &ldquo;03.15 ITT VOLTAM &mdash; 04.12 OTT LESZEK&rdquo;
                </p>
                <p className="text-text-muted text-xs mt-1.5 leading-relaxed">
                  I was here on March 15 &mdash; I will be there on April 12. Personal commitment anchored in individual agency.
                </p>
              </figcaption>
            </figure>

            {/* Outer-directed */}
            <figure className="flex flex-col gap-3">
              <div className="relative overflow-hidden rounded-[1.25rem]" style={{ height: "340px" }}>
                <Image
                  src="/media/Imageouterdirected.png"
                  alt="Crowd banner: 'Együtt erő vagyunk!'"
                  fill
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <span className="absolute top-3 left-3 text-[10px] uppercase tracking-[0.18em] bg-white/15 text-white border border-white/25 backdrop-blur-sm px-3 py-1 rounded-full">
                  Outer-Directed
                </span>
              </div>
              <figcaption className="px-1">
                <p lang="hu" className="text-text-primary text-sm italic font-light leading-snug">
                  &ldquo;Együtt erő vagyunk! 🇭🇺&rdquo;
                </p>
                <p className="text-text-muted text-xs mt-1.5 leading-relaxed">
                  Together we are strong. Group identity, collective belonging, social validation.
                </p>
              </figcaption>
            </figure>

          </div>
        </div>
      </section>

      {/* Section: What Inner/Outer Mean */}
      <section
        className="px-6 py-16"
        data-analytics-section="elections_framework"
        data-analytics-label="Framework Explanation"
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4">The Framework</p>
          <h2
            className={`${cormorant.className} text-3xl md:text-4xl font-light text-white mb-8 leading-tight`}
          >
            What Inner-Directed and Outer-Directed Mean
          </h2>
          <div className="space-y-5 text-base font-light leading-relaxed text-text-secondary">
            <p>
              These terms originate in social psychology and communication theory. David Riesman&apos;s
              foundational work <em className="text-text-primary">The Lonely Crowd</em> (1950)
              distinguished between individuals whose orientation is guided primarily by internalised
              values and those guided primarily by signals from their social environment. Julian
              Rotter&apos;s concept of locus of control (1966) draws a related distinction: individuals
              with an internal locus of control attribute outcomes to their own actions; those with an
              external locus attribute them to forces beyond themselves.
            </p>
            <p>
              We apply this framework not to classify people, but to classify the language of their
              organic social media expressions. When a person posts on social media without being asked,
              the structure of their language reveals the motivational frame &mdash; the thing that
              caused them to speak.
            </p>
            <p>
              An <span className="text-white">inner-directed expression</span> references the self as
              the source: personal feelings, lived experience, individual values, direct personal
              consequence. An <span className="text-white">outer-directed expression</span> references
              the social world as the trigger: group norms, collective identity, abstract systems,
              national narratives, or external validation.
            </p>
            <p className="text-text-primary">
              The analytical question is not who the person is &mdash; but what frames the expression,
              and how that frame is encoded in the language of the post.
            </p>
          </div>

          <PullQuote
            quote="How many cases like this are there within families... Like in our case, it's the older generation. Luckily there's only one... Everyone else is a Tisza Party voter."
            translation="Hány ilyen van családon belül.. Mondjuk a mi esetünkben az idősebb generáció. Szerencsére csak egy.. Mindenki más Tisza párt szavazó."
            attribution="Tisza supporter — Facebook — inner-directed"
          />

          <PullQuote
            quote="The Tisza crowd already soiled themselves with all things Ukrainian last year alongside the liposuctioned luxury general, their &lsquo;Ukrainian brother&rsquo; Roland Tseber, and their MEPs parading around in Ukrainian t-shirts; and this year it's with Zelensky's threatening remarks and the shutting off of the oil pipeline. Everyone has seen it, heard it, and knows it. Even in Brussels..."
            translation="A tiszások már tavaly összeukránozták magukat a zsírleszívott luxi-tábornokkal, ukrán testvérükkel Tseber Rolanddal, az ukrán pólóban díszelgő EP-képviselőikkel, idén meg Zelenszkij fenyegető kijelentéseivel és az olajvezeték elzárásával. Mindenki látta-hallotta-tudja. Még Brüsszelben is..."
            attribution="Fidesz supporter — Facebook — outer-directed"
          />

          <p className="text-base font-light leading-relaxed text-text-secondary mt-6">
            The contrast is illustrative. One post anchors the stakes in a concrete family situation
            &mdash; a personal reality. The other anchors them in a chain of national-level associations
            and an appeal to shared knowledge (&ldquo;everyone saw-heard-knows&rdquo;). Our research shows
            this pattern &mdash; self vs. system, personal consequence vs. collective mythology &mdash;
            runs consistently through the data.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* Section: Key Findings */}
      <section
        className="px-6 py-20"
        data-analytics-section="elections_findings"
        data-analytics-label="Key Findings"
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4">Key Findings</p>
          <h2
            className={`${cormorant.className} text-3xl md:text-5xl font-light text-white mb-12 leading-tight max-w-3xl`}
          >
            A consistent, cross-platform psychographic split.
          </h2>

          {/* Charts */}
          <div
            className="rounded-[2rem] border border-white/10 p-10 md:p-14 mb-12"
            style={{
              background:
                "linear-gradient(160deg, rgba(26,53,80,0.18), rgba(20,20,20,0.94) 40%, rgba(10,10,10,0.98))",
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8">
              <PieChart
                innerPct={7.2}
                label="Fidesz Supporters Social Media Conversations"
                innerLabel="7.2%"
                outerLabel="92.8%"
              />
              <PieChart
                innerPct={19.6}
                label="Tisza Supporters Social Media Conversations"
                innerLabel="19.6%"
                outerLabel="80.4%"
              />
            </div>
            <p className="mt-10 text-center text-xs uppercase tracking-[0.18em] text-text-muted">
              Inner-directed share — Brandwatch data, Mar 11–19, 2026
            </p>
          </div>

          <div className="space-y-5 text-base font-light leading-relaxed text-text-secondary max-w-3xl">
            <p>
              From an initial N=10,000 social media mentions, 69.6% were identified as relevant, of
              which 54.7% supported Fidesz and 45.3% were in support of Tisza.
            </p>
            <p>
              Across the dataset, Tisza supporters produce a meaningfully higher share of social media
              expressions rooted in personal conviction, direct life experience, and individual agency
              &mdash; approximately{" "}
              <span className="text-white font-medium">12.4 percentage points more</span> than Fidesz
              supporters. Fidesz supporters more frequently produce expressions rooted in collective
              identity, national threat narratives, and appeals to shared group knowledge.
            </p>
            <p>
              Both groups are majority outer-directed. This is expected: political social media is
              inherently a space of public positioning, and outer-directed framing is the default
              register. What is analytically significant is not the absolute level but the relative
              difference &mdash; and the consistency of that difference across sources and platforms.
            </p>
            <p className="text-text-primary">
              Inner-directed expressions communicate a higher degree of what psychologists term
              self-concordance &mdash; an alignment between a person&apos;s inner needs and the
              position they publicly take. When someone speaks from personal experience and direct
              conviction, the expressed commitment is anchored in something the person has processed
              individually. This is not more virtuous &mdash; it is more structurally stable.
            </p>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Section: Why It Matters */}
      <section
        className="px-6 py-20"
        data-analytics-section="elections_implications"
        data-analytics-label="Why Inner-Directed Gap Matters"
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4">Analysis</p>
          <h2
            className={`${cormorant.className} text-3xl md:text-4xl font-light text-white mb-8 leading-tight`}
          >
            Why the Inner-Directed Gap Matters
          </h2>
          <div className="space-y-5 text-base font-light leading-relaxed text-text-secondary">
            <p>
              In qualitative consumer and communication research, inner-directed expression is
              understood to be contagious. When a person articulates a position through personal
              experience &mdash; &ldquo;this is what happened to me, this is why I changed my
              mind&rdquo; &mdash; the language carries an authenticity signal that activates personal
              recognition in others. The listener does not need to share the speaker&apos;s group
              identity. They need only recognise their own situation in the speaker&apos;s words.
            </p>
          </div>

          <PullQuote
            quote="If Fidesz wins, I'll be doing everything I can so we can get the hell out of here as soon as possible. Because if this kind of politics continues, we'll crash out of the EU, and then there will be starvation and ruin, and I don't want to be here with the family."
            translation="Ha a fidesz nyer azon leszek h minél hamarabb elhúzhassunk innen. Mert ha ez a politika folytatodik kiesünk az eu-ból akkor pedig éhezés és pusztulás lesz én pedig nem szeretnék itt lenni a családdal"
            attribution="Tisza supporter — YouTube — inner-directed"
          />

          <div className="space-y-5 text-base font-light leading-relaxed text-text-secondary">
            <p>
              This is the mechanism through which brands grow organically and through which political
              movements recruit beyond their base.{" "}
              <span className="text-white">Inner-directed expression is recruitment language. It converts.</span>
            </p>
            <p>
              Outer-directed expressions work differently. They reinforce belonging among those who
              already identify with the group &mdash; &ldquo;we all know,&rdquo; &ldquo;any real
              Hungarian,&rdquo; &ldquo;everyone saw what happened.&rdquo; This is retention language.
              It holds the coalition together through social proof and conformity cues. But it does not
              create new supporters, because it requires prior group membership to resonate.
            </p>
          </div>

          <PullQuote
            quote="We are definitely going to win.... Go Fidesz, go Hungarians!!! I am a PROUD Hungarian Patriot!!!!!"
            translation="Egyértelműen fogunk nyerni.... Hajrá Fidesz, hajrá Magyarok!!! BÜSZKE Magyar Hazafi vagyok!!!!!"
            attribution="Fidesz supporter — YouTube — outer-directed"
          />
        </div>
      </section>

      {/* Section: Electoral Implications */}
      <section
        className="px-6 py-16 bg-dark-grey/70"
        data-analytics-section="elections_electoral"
        data-analytics-label="Electoral Implications"
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4">Implications</p>
          <h2
            className={`${cormorant.className} text-3xl md:text-4xl font-light text-white mb-8 leading-tight`}
          >
            This Asymmetry has Direct Electoral Implications
          </h2>
          <div className="space-y-5 text-base font-light leading-relaxed text-text-secondary">
            <p>
              The fact that Tisza supporters are{" "}
              <span className="text-white font-medium">2.8× more likely</span> to post inner-directed
              content means public discourse contains a larger pool of expressions that can resonate
              with voters outside the existing Tisza base &mdash; including privately dissatisfied
              Fidesz voters who have not yet found a personal reason to switch. When such a voter
              encounters a Tisza supporter describing a concrete experience &mdash; a family argument, a
              lost opportunity, a moment of personal clarity &mdash; it can activate recognition: that
              is my situation too.
            </p>
            <p>
              Fidesz&apos;s predominantly outer-directed discourse, meanwhile, holds its base through
              collective identity and shared narrative &mdash; but this same mechanism makes its
              supporters structurally vulnerable. Outer-directed loyalty is loyalty to the perceived
              winning team, to the dominant narrative, to the sense that &ldquo;everyone around me
              thinks this way.&rdquo; When that perception begins to shift &mdash; through polling
              leads, through visible roadshow attendance, through the sheer volume of inner-directed
              Tisza expression appearing in their feeds &mdash; the outer-directed frame offers no
              personal anchor to resist the pull.
            </p>
            <p className="text-text-primary text-lg font-light">
              We therefore interpret the inner/outer gap not as a static description but as a predictive
              indicator that Tisza&apos;s discourse is structured to grow &mdash; and we expect this
              tendency to manifest in widening Tisza&apos;s lead in survey-based polling.
            </p>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Section: Limitations */}
      <section
        className="px-6 py-16"
        data-analytics-section="elections_limitations"
        data-analytics-label="Limitations"
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4">Transparency</p>
          <h2
            className={`${cormorant.className} text-3xl font-light text-white mb-8 leading-tight`}
          >
            A Note on Interpretation and Limitations
          </h2>
          <div className="space-y-5 text-base font-light leading-relaxed text-text-secondary">
            <p>
              This is a qualitative analysis validated at scale through automated classification. Our
              findings are not representative in the traditional polling sense &mdash; we make no claim
              to statistical sampling of the Hungarian electorate. What we offer is a semantically
              grounded reading of organic social media expression, developed through deep human analysis
              and confirmed through an AI-assisted methodology.
            </p>
            <p>
              The value of this approach lies not in counting heads, but in reading the motivational
              texture of public discourse &mdash; something traditional polling does not capture. Polls
              measure stated intention under prompting. We measure the structure of what people say
              voluntarily, to their peers, without a researcher asking the question. Both are valid;
              they answer different questions.
            </p>
          </div>
          <ul className="mt-8 space-y-4">
            {[
              {
                title: "Platform composition",
                body: "Social media users are not demographically identical to the electorate. Engagement patterns vary across Facebook, YouTube, TikTok, X, and media comment sections. We sampled broadly but do not claim proportional representation.",
              },
              {
                title: "Source effects",
                body: "Comments under pro-government YouTube channels and comments on opposition Facebook pages carry different baseline characteristics. We have analysed across sources but readers should be aware of this structure.",
              },
              {
                title: "Temporal scope",
                body: "This analysis reflects a snapshot of discourse in the weeks prior to publication. Social media discourse is dynamic and may shift as the election approaches.",
              },
              {
                title: "Classification boundaries",
                body: "Inner/outer directedness operates on a spectrum. Some expressions contain elements of both. Our classification captures the dominant signal; borderline cases are unavoidable.",
              },
            ].map((item) => (
              <li
                key={item.title}
                className="border-l border-white/10 pl-5 text-sm leading-relaxed text-text-secondary"
              >
                <span className="text-text-primary font-medium">{item.title}: </span>
                {item.body}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Section: Methodology */}
      <section
        className="px-6 py-16 bg-dark-grey/70"
        data-analytics-section="elections_methodology"
        data-analytics-label="Methodology"
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4">Methodology</p>
          <h2
            className={`${cormorant.className} text-3xl font-light text-white mb-8 leading-tight`}
          >
            How the Research Was Conducted
          </h2>
          <div className="space-y-5 text-base font-light leading-relaxed text-text-secondary">
            <p>
              Our analysis is grounded in semantic content analysis &mdash; a qualitative research
              tradition concerned with identifying the motivational and psychological signals encoded in
              natural language.
            </p>
          </div>
          <div className="mt-8 space-y-6">
            {[
              {
                stage: "Stage 1",
                title: "Human Analysis",
                body: "Bakamo's senior analysts conducted an in-depth qualitative analysis of a substantial sample of organic social media posts. Working within the inner/outer directedness framework — rooted in the theoretical traditions of Riesman (1950) and Rotter (1966) — analysts read, interpreted, and classified posts to establish the core finding. Data sources included API-enabled and opaque social media channels including TikTok, Instagram, Facebook, YouTube and X.",
              },
              {
                stage: "Stage 2",
                title: "AI-Assisted Validation at Scale",
                body: "To test whether the pattern identified by human analysts held across a larger corpus, we collected over 15,000 comments and posts via the Brandwatch social listening platform. This data was processed by a custom AI platform utilising Google's Gemini LLM technology through a three-stage automated pipeline: (1) relevance filtering, (2) political alignment classification, and (3) inner/outer directedness scoring.",
              },
            ].map((item) => (
              <div
                key={item.stage}
                className="rounded-[1.5rem] border border-white/10 bg-black/20 p-6"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-accent mb-1">{item.stage}</p>
                <h3 className="text-white font-medium mb-3">{item.title}</h3>
                <p className="text-sm leading-relaxed text-text-secondary">{item.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm leading-relaxed text-text-muted">
            Bakamo complies with GDPR and the ESOMAR ethics codex. Quotes in this report have been
            slightly modified to retain meaning and tonality while protecting social media users&apos;
            privacy. Data Sources: Brandwatch, Mar 11–19, 2026.
          </p>
        </div>
      </section>

      <div className="section-divider" />

      {/* Section: Previous Research */}
      <section
        className="px-6 py-16"
        data-analytics-section="elections_prior_research"
        data-analytics-label="Prior Research"
      >
        <div className="max-w-4xl mx-auto">
          <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4">Earlier Work</p>
          <h2
            className={`${cormorant.className} text-3xl font-light text-white mb-8 leading-tight`}
          >
            Bakamo&apos;s Election Research Has Been Cited by International Media
          </h2>

          <div
            className="rounded-[2rem] border border-white/10 overflow-hidden"
            style={{
              background:
                "linear-gradient(150deg, rgba(26,53,80,0.22), rgba(10,10,10,0.98))",
            }}
          >
            <div className="grid md:grid-cols-2 gap-0">

              {/* Visual panel — drop your image at public/media/french-election-media-relay.png */}
              <div
                className="relative overflow-hidden md:border-r border-white/10"
                style={{ minHeight: "300px" }}
              >
                <Image
                  src="/media/FrenchElectionPic.png"
                  alt="Key visual from Bakamo's 2017 French Presidential Election report — the media relay arc"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Text panel */}
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <p className="text-xs uppercase tracking-[0.16em] text-accent mb-3">Previous Work</p>
                <h3
                  className={`${cormorant.className} text-2xl md:text-3xl font-light text-white leading-tight mb-5`}
                >
                  The 2017 French Presidential Election
                </h3>
                <p className="text-sm font-light leading-relaxed text-text-secondary mb-6">
                  Bakamo&apos;s first public election study analysed the psychographic texture of social
                  media discourse during the 2017 Macron&ndash;Le Pen runoff, mapping how organic expressions
                  flowed through the media relay before reshaping mainstream narratives. The methodology and
                  findings were picked up and cited internationally.
                </p>

                {/* Outlet badges */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {[
                    "Bloomberg", "Reuters", "The Economist", "FT",
                    "The Independent", "Axios",
                  ].map((outlet) => (
                    <span
                      key={outlet}
                      className="text-[10px] uppercase tracking-[0.14em] border border-white/15 text-text-muted rounded-full px-3 py-1"
                    >
                      {outlet}
                    </span>
                  ))}
                </div>

                <a
                  href="/frenchelection"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-accent hover:underline underline-offset-4"
                  data-analytics-event="cta_click"
                  data-analytics-label="Download French Election Report"
                  data-analytics-location="elections_prior_research"
                >
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
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Read the 2017 French Election Report (PDF)
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="px-6 py-24"
        data-analytics-section="elections_cta"
        data-analytics-label="Elections CTA"
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
              <p className="text-sm uppercase tracking-[0.2em] text-accent mb-4">About Bakamo</p>
              <h2
                className={`${cormorant.className} text-3xl md:text-4xl font-light text-white leading-tight`}
              >
                Reality-first intelligence, at scale.
              </h2>
              <p className="mt-6 text-base font-light leading-relaxed text-text-secondary">
                Bakamo is a global social intelligence agency that listens to the open web to reveal
                truths that conventional research cannot reach. Our methodology combines technology,
                human analysis, and academic rigour to surface the motivational and cultural drivers
                buried beneath surface-level opinion.
              </p>
              <p className="mt-4 text-sm font-light leading-relaxed text-text-muted">
                It is this foundation in reality &mdash; in what people actually say, not what they
                say when asked &mdash; that gives Bakamo&apos;s psychographic analysis its distinctive
                credibility.
              </p>
            </div>
            <div className="space-y-4">
              <Link
                href="/contact"
                className="cta-button text-sm w-full text-center block"
                data-analytics-event="cta_click"
                data-analytics-label="Contact Bakamo"
                data-analytics-location="elections_cta"
                data-analytics-destination="/contact"
              >
                Discuss This Research
              </Link>
              <Link
                href="/our-method"
                className="inline-flex items-center justify-center w-full rounded-full border border-white/15 px-6 py-3 text-sm uppercase tracking-[0.16em] text-white transition-colors hover:border-accent hover:text-accent"
                data-analytics-event="cta_click"
                data-analytics-label="See Our Method"
                data-analytics-location="elections_cta"
                data-analytics-destination="/our-method"
              >
                See Our Method
              </Link>
              <div className="pt-4 border-t border-white/10">
                <p className="text-xs text-text-muted">Contact</p>
                <p className="text-sm text-text-secondary mt-1">
                  Daniel Fazekas &mdash;{" "}
                  <a
                    href="mailto:daniel.fazekas@bakamosocial.com"
                    className="text-accent hover:underline"
                  >
                    daniel.fazekas@bakamosocial.com
                  </a>
                </p>
                <p className="text-sm text-text-secondary">
                  <a href="tel:+441553432939" className="hover:text-white transition-colors">
                    +44 1553 432939
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
