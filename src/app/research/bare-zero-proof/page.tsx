import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import Link from "next/link";
import { BOOKING_HREF } from "@/lib/booking";
import { ORGANIZATION_REF, pageOpenGraph } from "@/lib/seo";
import { SITE_URL } from "@/lib/site-url";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

// Sources: the 2022 study deck ("Co-Creating a New Sober World"), the QRCA 2023
// conference presentation (which carries Jim Kempland's quotes) and the 2024
// Reading Machine analysis presented at TMRE. Do not add figures that are not
// in those documents.

const TITLE = "BARE Zero Proof: Who Really Drinks Non-Alcoholic Spirits";
const PAGE_PATH = "/research/bare-zero-proof";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const BARE_URL = "https://enjoybare.com";
const DESCRIPTION =
  "Case study: 214,000 posts about non-alcoholic spirits showed BARE Zero Proof that its real audience was not the one the industry assumed. Five narratives, six personas.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: PAGE_PATH,
  },
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
  about: { "@type": "Organization", name: "BARE Zero Proof Spirits", url: BARE_URL },
};

const STATS: Array<{ value: string; label: string }> = [
  { value: "214K", label: "public posts" },
  { value: "130K", label: "people talking" },
  { value: "24", label: "months of conversation" },
  { value: "5,000+", label: "posts read by analysts" },
];

const NARRATIVES: Array<{ name: string; detail: string }> = [
  {
    name: "Emotional Crutch",
    detail: "Something to lean on while staying sober, and a way back into going out after years of being left out.",
  },
  {
    name: "Forget",
    detail: "The ritual without the alcohol. Made and drunk as if it were the real thing, so the real thing can be forgotten.",
  },
  { name: "Disguise", detail: "A drink that hides the fact that you are not drinking." },
  { name: "NA Pride", detail: "The answer to stigma: community, recipes, venues, and no more shame about ordering." },
  { name: "Rip Off", detail: "The anger of people for whom it did not work." },
];

type Glass = "coupe" | "rocks" | "highball" | "flute" | "tipped" | "martini";

const PERSONAS: Array<{ name: string; voice: string; detail: string; where: string; reach: string; glass: Glass }> = [
  {
    name: "The Re-Socializer",
    voice: "“Sober, not dead.”",
    detail:
      "Once at the centre of the party, then cut off from it by sobriety. Needs zero-proof on the menu and a bartender who knows what to do with it.",
    where: "Out, with others",
    reach: "Stand with them in the push for acceptance.",
    glass: "coupe",
  },
  {
    name: "The Alcohol Illusionist",
    voice: "“To up my mocktail game.”",
    detail:
      "Rebuilds an old favourite drink at home, in detail. Knows the brands, shares recipes, and notices at once when the burn is missing.",
    where: "At home, alone",
    reach: "Give them variety and recipes.",
    glass: "rocks",
  },
  {
    name: "The Mindful Moderator",
    voice: "“Mocktails are good af!”",
    detail:
      "Still drinks, and is looking for acceptable reasons to drink less: the third drink of the evening, Dry January, no hangover tomorrow.",
    where: "The third drink",
    reach: "Give them more occasions.",
    glass: "highball",
  },
  {
    name: "The Social Chameleon",
    voice: "“I was shy to ask at first.”",
    detail:
      "Not drinking, and would rather nobody noticed. Wants a drink that looks like everyone else’s, at a work event or a wedding.",
    where: "Work events, weddings",
    reach: "Do not address them directly.",
    glass: "flute",
  },
  {
    name: "The Dispirited",
    voice: "“I feel stupid for having tried it.”",
    detail: "Tried it and feels cheated. Too expensive, too little like the real thing, or too much like it.",
    where: "Tried once, at home",
    reach: "Listen. This is where the category fails.",
    glass: "tipped",
  },
  {
    name: "The Straight Thriver",
    voice: "“I love appropriating alcohol aesthetic.”",
    detail: "Never drank, and likes the look and ritual of a cocktail. Cares about purity and ethics. Rarely talks about the category.",
    where: "Rarely heard",
    reach: "Purity, ethics, aesthetics.",
    glass: "martini",
  },
];

// Verbatim public posts from the study corpus, anonymised.
const VOICES: Array<{ text: string; narrative: string }> = [
  {
    text: "I’m sober not dead. It’s ok to bring non alcoholic drinks with you to bbqs for you and to share",
    narrative: "Emotional Crutch",
  },
  { text: "Sober people deserve fanciness too!", narrative: "NA Pride" },
  {
    text: "I love the ritual of a drink at the end of a long day and this is a good replacement since I quit drinking.",
    narrative: "Forget",
  },
  {
    text: "I make Nothing and Tonics with Q tonic, lime juice, and a couple dashes of juniper berry extract. Tasty. Further, the act of making it with eyedroppers and such is a nice ritual.",
    narrative: "Forget",
  },
  {
    text: "Just get a mocktail. You’d prob be surprised how many of your friends either don’t care or want to do the same thing but also feel awkward about it.",
    narrative: "Disguise",
  },
  {
    text: "Have to say as a sober person trying to have a social life in this world… a bar with a solid and considered mocktail menu brings a god damn tear to my eye",
    narrative: "NA Pride",
  },
  { text: "It smelled too real. Tasted too real.", narrative: "Rip Off" },
];

const LEAD_QUOTE =
  "This approach is real world. We are allowed to voyeuristically listen to how our consumers communicate their thoughts and authentically describe the world as they see it.";

const CLIENT_QUOTES: string[] = [
  "Based on the personas identified, we crafted strategic social media and PR plans that more specifically targeted the exact consumer we needed to gain awareness and conversion – successfully. The insights informed us how to prioritize our target in a way no other research could have. Our consumer is new, young and elusive. This approach cut through the clutter to create clarity.",
  "As an emerging consumer group, those Americans on a sober journey, this social media intelligence research provided in-depth insights that enabled our fledgling brand to speak with confidence and clarity to our target audience. It gives us street cred. We may be new but we ‘get’ them.",
];

const FOLLOW_UP_STATS: Array<{ value: string; label: string }> = [
  { value: "14%", label: "of the discussion mentions sugar" },
  { value: "2%", label: "is about how much sugar a product contains" },
  { value: "48%", label: "of occasions described are at home" },
  { value: "0.0%", label: "alcohol: what people single out about BARE" },
];

const REPORT_URL = "https://enjoybare.com/blogs/news/the-state-of-sober-socializing-2023";
const AWARDS_URL = "https://www.prdaily.com/awards/events/pr-daily-awards-luncheon-2023/";

const TIMELINE: Array<{ when: string; what: string; detail: string }> = [
  {
    when: "June 2022",
    what: "The study",
    detail: "Five narratives and six personas, read from 214,000 posts.",
  },
  {
    when: "January 2023",
    what: "The State of Sober Socializing",
    detail: "BARE publishes its first annual study of the new dry culture.",
  },
  {
    when: "March 2023",
    what: "QRCA",
    detail: "Client, researcher and Bakamo present the work together.",
  },
  {
    when: "December 2023",
    what: "PR Daily Awards",
    detail: "Two honorable mentions for the campaign.",
  },
  {
    when: "2024",
    what: "Read again",
    detail: "The Reading Machine follow-up, presented at TMRE.",
  },
];

const TALKS: Array<{ event: string; title: string; detail: string }> = [
  {
    event: "QRCA Annual Conference, Charlotte, March 2023",
    title: "Insights Without Asking: Understanding Consumers through Social Media Intelligence",
    detail: "Daniel Fazekas with Sandra Bauman of Bauman Research & Consulting and Jim Kempland of BARE Zero Proof.",
  },
  {
    event: "TMRE, 2024",
    title: "Crafted Illusion or Unfiltered Reality?",
    detail: "Daniel Fazekas with Jim Kempland and Erik Larsen of OvationMR.",
  },
];

function GlassIcon({ glass }: { glass: Glass }) {
  const paths: Record<Glass, React.ReactNode> = {
    coupe: (
      <>
        <path d="M8 10h32c0 9-7 15-16 15S8 19 8 10Z" />
        <path d="M24 25v15M16 40h16" />
      </>
    ),
    rocks: (
      <>
        <path d="M10 12h28l-3 28H13L10 12Z" />
        <rect x="18" y="22" width="10" height="10" rx="1.5" transform="rotate(-12 23 27)" />
      </>
    ),
    highball: (
      <>
        <path d="M14 8h20l-2 32H16L14 8Z" />
        <path d="M15 18h18M29 4l-5 30" />
      </>
    ),
    flute: (
      <>
        <path d="M18 6h12c0 12-2 20-6 22-4-2-6-10-6-22Z" />
        <path d="M24 28v12M18 40h12M21 12h.01M26 16h.01M23 20h.01" />
      </>
    ),
    tipped: (
      <>
        <path d="M9 20 34 9l6 16-22 12L9 20Z" />
        <path d="M6 42h36M30 38l6 2" />
      </>
    ),
    martini: (
      <>
        <path d="M7 9h34L24 26 7 9Z" />
        <path d="M24 26v14M16 40h16M30 6l-8 12" />
        <circle cx="21" cy="19" r="1.6" />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 48 48"
      width="44"
      height="44"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="text-accent"
    >
      {paths[glass]}
    </svg>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <>
      <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4">{eyebrow}</p>
      <h2 className={`${cormorant.className} text-3xl md:text-5xl font-light text-white mb-8 leading-[1.05]`}>
        {title}
      </h2>
    </>
  );
}

function BareLink({ location, children }: { location: string; children: React.ReactNode }) {
  return (
    <a
      href={BARE_URL}
      target="_blank"
      rel="noopener"
      className="text-accent hover:underline underline-offset-4"
      data-analytics-event="outbound_click"
      data-analytics-label="BARE Zero Proof"
      data-analytics-location={location}
      data-analytics-destination={BARE_URL}
    >
      {children}
    </a>
  );
}

export default function BareZeroProofPage() {
  return (
    <main className="relative w-full min-h-screen bg-near-black text-text-primary overflow-x-hidden pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <div className="grain-overlay" />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[700px] overflow-hidden">
        <div
          className="absolute right-[-8rem] top-10 h-[28rem] w-[28rem] rounded-full blur-3xl"
          style={{ background: "rgba(201,169,110,0.14)" }}
        />
        <div
          className="absolute left-[-6rem] top-64 h-72 w-72 rounded-full blur-3xl"
          style={{ background: "rgba(26,53,80,0.3)" }}
        />
      </div>

      <article>
        {/* Hero */}
        <section
          className="relative pt-32 md:pt-44 pb-14 px-6"
          data-analytics-section="bare_hero"
          data-analytics-label="BARE Zero Proof Hero"
        >
          <div className="max-w-5xl mx-auto">
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
                Case Study
              </span>
              <span className="text-xs uppercase tracking-[0.16em] text-text-muted">
                BARE Zero Proof Spirits &middot; North America
              </span>
            </div>

            <h1
              className={`${cormorant.className} max-w-4xl text-[clamp(2.8rem,7vw,6rem)] leading-[0.98] tracking-tight text-white`}
            >
              Who <em className="text-accent">really</em> drinks non-alcoholic spirits
            </h1>
            <p
              className={`${cormorant.className} mt-8 max-w-2xl text-2xl italic leading-snug text-text-secondary md:text-3xl`}
            >
              What 214,000 posts told BARE Zero Proof about its consumer, before anyone asked a question.
            </p>

            <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10 md:grid-cols-4">
              {STATS.map((stat) => (
                <div key={stat.label} className="bg-near-black/90 p-6 md:p-8">
                  <dd className={`${cormorant.className} text-5xl leading-none text-accent md:text-6xl`}>{stat.value}</dd>
                  <dt className="mt-3 text-xs uppercase tracking-[0.16em] text-text-muted">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Brief */}
        <section className="px-6 pb-16" data-analytics-section="bare_brief" data-analytics-label="The Brief">
          <div className="max-w-3xl mx-auto space-y-5 text-lg font-light leading-relaxed text-text-secondary">
            <p>
              <BareLink location="bare_brief">BARE Zero Proof Spirits</BareLink> makes zero-proof gin, whiskey and
              tequila. In 2022 the brand was young and the category in the United States was new and fragmented.
              BARE wanted to become its thought leader, and needed to know who it was talking to.
            </p>
            <p>
              We did not run a survey. We read what people were already saying to each other about not drinking.
            </p>
          </div>
        </section>

        {/* Lead quote */}
        <section className="px-6 py-20 bg-dark-grey/70" data-analytics-section="bare_lead_quote" data-analytics-label="Client Quote">
          <figure className="max-w-4xl mx-auto text-center">
            <span className={`${cormorant.className} block text-7xl leading-none text-accent`} aria-hidden="true">
              “
            </span>
            <blockquote>
              <p className={`${cormorant.className} text-3xl leading-[1.15] text-white md:text-5xl`}>{LEAD_QUOTE}</p>
            </blockquote>
            <figcaption className="mt-8 text-xs uppercase tracking-[0.18em] text-text-muted">
              Jim Kempland, Co-Founder and CEO, <BareLink location="bare_lead_quote">BARE Zero Proof Spirits</BareLink>
            </figcaption>
          </figure>
        </section>

        {/* Assumption vs finding */}
        <section className="px-6 py-20" data-analytics-section="bare_finding" data-analytics-label="Assumption and Finding">
          <div className="max-w-5xl mx-auto">
            <SectionHeading eyebrow="The turn" title="Everyone knew who the consumer was" />
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-[1.5rem] border border-white/10 p-8">
                <p className="text-xs uppercase tracking-[0.18em] text-text-muted">What the industry assumed</p>
                <p className={`${cormorant.className} mt-4 text-3xl leading-tight text-text-secondary line-through decoration-accent/60 decoration-1`}>
                  Wellness-minded 21 to 34 year olds
                </p>
                <p className="mt-5 text-base font-light leading-relaxed text-text-secondary">
                  Industry reports agreed. Gen Z and Millennials were choosing a sober life for their health, and
                  out of fear of losing control in front of a camera. A survey written from that brief would have
                  measured their wellness motives with great precision.
                </p>
              </div>
              <div className="rounded-[1.5rem] border border-accent/40 bg-accent/[0.06] p-8">
                <p className="text-xs uppercase tracking-[0.18em] text-accent">What the conversation showed</p>
                <p className={`${cormorant.className} mt-4 text-3xl leading-tight text-white`}>
                  People managing a relationship with alcohol
                </p>
                <p className="mt-5 text-base font-light leading-relaxed text-text-secondary">
                  Staying sober, cutting down, or hiding that they were not drinking. For them the drink does two
                  jobs. It protects their sobriety, and it gives back what sobriety took away: a place at the bar,
                  a glass in the hand, the ritual at the end of a long day.
                </p>
              </div>
            </div>
            <p className="mt-10 max-w-3xl text-base font-light leading-relaxed text-text-secondary">
              Growth in the category is driven by social occasions. And a non-alcoholic spirit is not a perfect
              stand-in, so the illusion has to be kept up. Drinkers go looking for new products, better recipes,
              rituals, and people who know more than they do. The search is part of the pleasure. It breaks when a
              bar has nothing to offer, or when a bad bottle ruins the effect.
            </p>
          </div>
        </section>

        {/* Voices */}
        <section className="px-6 pb-20" data-analytics-section="bare_voices" data-analytics-label="Voices">
          <div className="max-w-5xl mx-auto">
            <p className="text-accent uppercase tracking-[0.2em] text-sm mb-8">In their words</p>
            <ul className="gap-5 sm:columns-2 lg:columns-3 [&>li]:mb-5 [&>li]:break-inside-avoid">
              {VOICES.map((voice) => (
                <li key={voice.text} className="rounded-[1.25rem] border border-white/10 bg-black/30 p-6">
                  <p className={`${cormorant.className} text-xl italic leading-snug text-white`}>“{voice.text}”</p>
                  <p className="mt-4 text-[10px] uppercase tracking-[0.18em] text-accent">{voice.narrative}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Narratives */}
        <section className="px-6 py-20 bg-dark-grey/70" data-analytics-section="bare_narratives" data-analytics-label="Five Narratives">
          <div className="max-w-5xl mx-auto">
            <SectionHeading eyebrow="The architecture" title="Five narratives" />
            <p className="mb-10 max-w-3xl text-base font-light leading-relaxed text-text-secondary">
              The conversation organised itself into five stories people tell about drinking without alcohol.
            </p>
            <ol className="grid gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
              {NARRATIVES.map((narrative, index) => (
                <li key={narrative.name} className="bg-near-black p-6">
                  <span className={`${cormorant.className} text-4xl leading-none text-accent/70`}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className={`${cormorant.className} mt-4 text-2xl leading-tight text-white`}>{narrative.name}</h3>
                  <p className="mt-3 text-sm font-light leading-relaxed text-text-secondary">{narrative.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Personas */}
        <section className="px-6 py-20" data-analytics-section="bare_personas" data-analytics-label="Six Personas">
          <div className="max-w-5xl mx-auto">
            <SectionHeading eyebrow="The segmentation" title="Six personas, built from need" />
            <p className="mb-10 max-w-3xl text-base font-light leading-relaxed text-text-secondary">
              The personas come from how people describe themselves when nobody is profiling them. They are
              separated by what they need from the drink, how often they use it, and whether they drink it alone
              or in company. Each came with a way to reach it.
            </p>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {PERSONAS.map((persona) => (
                <li
                  key={persona.name}
                  className="flex flex-col rounded-[1.5rem] border border-white/10 bg-black/20 p-7 transition-colors hover:border-accent/40"
                >
                  <div className="flex items-start justify-between gap-4">
                    <GlassIcon glass={persona.glass} />
                    <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-text-muted">
                      {persona.where}
                    </span>
                  </div>
                  <h3 className={`${cormorant.className} mt-6 text-3xl leading-tight text-white`}>{persona.name}</h3>
                  <p className={`${cormorant.className} mt-2 text-xl italic text-accent`}>{persona.voice}</p>
                  <p className="mt-4 text-sm font-light leading-relaxed text-text-secondary">{persona.detail}</p>
                  <p className="mt-auto border-t border-white/10 pt-4 text-xs uppercase tracking-[0.12em] text-text-muted [margin-block-start:1.5rem]">
                    {persona.reach}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Limits */}
        <section className="px-6 py-20 bg-dark-grey/70" data-analytics-section="bare_limits" data-analytics-label="Limits">
          <div className="max-w-3xl mx-auto">
            <SectionHeading eyebrow="What we could not see" title="The people who had nothing to argue about" />
            <div className="space-y-5 text-base font-light leading-relaxed text-text-secondary">
              <p>
                The audience the industry expected does exist. People who come to the category for health reasons,
                with no history to manage, were in the data. They were quiet. They have no tension to talk about,
                so they do not talk.
              </p>
              <p>
                We told BARE that, and recommended studying that group with traditional methods. Reading the
                conversation shows you where the energy is. It also shows you where a survey is the right tool.
              </p>
            </div>
          </div>
        </section>

        {/* Impact */}
        <section className="px-6 py-20" data-analytics-section="bare_impact" data-analytics-label="Impact">
          <div className="max-w-5xl mx-auto">
            <SectionHeading eyebrow="What BARE did with it" title="In the client’s words" />
            <div className="grid gap-6 md:grid-cols-2">
              {CLIENT_QUOTES.map((quote) => (
                <blockquote key={quote} className="rounded-[1.5rem] border border-accent/30 bg-accent/[0.05] p-8">
                  <p className={`${cormorant.className} text-2xl leading-snug text-white`}>“{quote}”</p>
                </blockquote>
              ))}
            </div>
            <p className="mt-6 text-xs uppercase tracking-[0.18em] text-text-muted">
              Jim Kempland, Co-Founder and CEO, <BareLink location="bare_impact">BARE Zero Proof Spirits</BareLink>,
              on stage with us in 2023
            </p>
          </div>
        </section>

        {/* What happened next */}
        <section className="px-6 pb-20" data-analytics-section="bare_campaign" data-analytics-label="Campaign">
          <div className="max-w-5xl mx-auto">
            <div className="grid gap-10 rounded-[1.5rem] border border-white/10 bg-black/30 p-8 md:grid-cols-[1.1fr_1fr] md:p-12">
              <div>
                <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4">What happened next</p>
                <h3 className={`${cormorant.className} text-3xl leading-tight text-white md:text-4xl`}>
                  The State of Sober Socializing
                </h3>
                <div className="mt-6 space-y-4 text-base font-light leading-relaxed text-text-secondary">
                  <p>
                    In January 2023 BARE published{" "}
                    <a
                      href={REPORT_URL}
                      target="_blank"
                      rel="noopener"
                      className="text-accent hover:underline underline-offset-4"
                      data-analytics-event="outbound_click"
                      data-analytics-label="State of Sober Socializing 2023"
                      data-analytics-location="bare_campaign"
                      data-analytics-destination={REPORT_URL}
                    >
                      its first annual study
                    </a>{" "}
                    of the new dry culture, with a survey of American drinkers and non-drinkers.
                  </p>
                  <p>
                    Its themes are the ones the conversation had surfaced: acceptance, allies, bartenders who take
                    the order seriously, and a request to stop saying “mocktail”.
                  </p>
                  <p>
                    The campaign, run by the agency Sēd, received{" "}
                    <a
                      href={AWARDS_URL}
                      target="_blank"
                      rel="noopener"
                      className="text-accent hover:underline underline-offset-4"
                    >
                      honorable mentions in two categories
                    </a>{" "}
                    at the PR Daily Awards 2023: Media Relations Campaign and Thought Leadership Communications.
                  </p>
                </div>
              </div>
              <ol className="relative space-y-7 border-l border-accent/40 pl-7">
                {TIMELINE.map((step) => (
                  <li key={step.when} className="relative">
                    <span className="absolute -left-[2.05rem] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" aria-hidden="true" />
                    <p className="text-[10px] uppercase tracking-[0.18em] text-accent">{step.when}</p>
                    <p className={`${cormorant.className} mt-1 text-2xl leading-tight text-white`}>{step.what}</p>
                    <p className="mt-1 text-sm font-light text-text-secondary">{step.detail}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* 2024 */}
        <section className="px-6 py-20 bg-dark-grey/70" data-analytics-section="bare_reading_machine" data-analytics-label="2024 Follow-up">
          <div className="max-w-5xl mx-auto">
            <SectionHeading eyebrow="2024" title="Two years on, read again" />
            <p className="mb-10 max-w-3xl text-base font-light leading-relaxed text-text-secondary">
              In 2024, with OvationMR, we read the brand, its competitors and the category again, this time with{" "}
              <Link href="/technology" className="text-accent hover:underline underline-offset-4">
                the Reading Machine
              </Link>
              . The conversation had moved.
            </p>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10 md:grid-cols-4">
              {FOLLOW_UP_STATS.map((stat) => (
                <div key={stat.label} className="bg-near-black p-6 md:p-8">
                  <dd className={`${cormorant.className} text-5xl leading-none text-accent md:text-6xl`}>{stat.value}</dd>
                  <dt className="mt-3 text-sm font-light leading-snug text-text-secondary">{stat.label}</dt>
                </div>
              ))}
            </dl>
            <div className="mt-10 grid gap-10 md:grid-cols-2">
              <ul className="space-y-4 text-base font-light leading-relaxed text-text-secondary">
                <li>
                  <strong className="font-normal text-white">Out of imitation.</strong> Drinkers had begun to say
                  that the best non-alcoholic spirits are not trying to replicate anything.
                </li>
                <li>
                  <strong className="font-normal text-white">Sugar is an excuse.</strong> It was a reason people
                  gave for rejecting the category, not a health concern they were weighing.
                </li>
                <li>
                  <strong className="font-normal text-white">Home first.</strong> At home (48 percent) came ahead
                  of going out (39 percent) and travel (13 percent).
                </li>
                <li>
                  <strong className="font-normal text-white">What sets BARE apart.</strong> That it is 0.0 percent
                  alcohol where many products are “less than 0.5”, and that it was made by bartenders.
                </li>
              </ul>
              <blockquote className="self-start rounded-[1.25rem] border border-white/10 bg-black/30 p-6">
                <p className={`${cormorant.className} text-2xl italic leading-snug text-white`}>
                  “Bare was made by bartenders, and all their ‘spirits’ genuinely taste like what they are supposed
                  to be.”
                </p>
                <p className="mt-4 text-[10px] uppercase tracking-[0.18em] text-accent">Public post, 2024</p>
              </blockquote>
            </div>
          </div>
        </section>

        {/* Talks */}
        <section className="px-6 py-20" data-analytics-section="bare_talks" data-analytics-label="Talks">
          <div className="max-w-5xl mx-auto">
            <SectionHeading eyebrow="On stage" title="Presented with the client" />
            <ul className="grid gap-6 md:grid-cols-2">
              {TALKS.map((talk) => (
                <li key={talk.event} className="rounded-[1.5rem] border border-white/10 p-8">
                  <p className="text-xs uppercase tracking-[0.18em] text-accent">{talk.event}</p>
                  <p className={`${cormorant.className} mt-3 text-2xl leading-tight text-white`}>{talk.title}</p>
                  <p className="mt-3 text-sm font-light text-text-secondary">{talk.detail}</p>
                </li>
              ))}
            </ul>

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href={BOOKING_HREF}
                className="cta-button text-sm"
                data-analytics-event="book_demo_click"
                data-analytics-label="Book a demo"
                data-analytics-location="bare_cta"
                data-analytics-destination={BOOKING_HREF}
              >
                Book a demo
              </Link>
              <Link
                href="/brands"
                className="text-sm uppercase tracking-[0.16em] text-text-muted transition-colors hover:text-white"
              >
                Social intelligence for brands &rarr;
              </Link>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
