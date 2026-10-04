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

const KEY_FACTS: Array<{ term: string; detail: string }> = [
  { term: "Client", detail: "BARE Zero Proof Spirits, maker of zero-proof gin, whiskey and tequila." },
  {
    term: "Question",
    detail: "Who is the consumer of non-alcoholic spirits, how do they use the category, and what do they need from a brand?",
  },
  {
    term: "Material",
    detail:
      "214,000 public posts by 130,000 people over 24 months, in English. Analysts read and interpreted more than 5,000 of them.",
  },
  { term: "Output", detail: "Five narratives and six need-based personas, with a way to reach each." },
  { term: "Follow-up", detail: "In 2024 the brand, its competitors and the category were read again with the Reading Machine." },
];

const NARRATIVES: Array<{ name: string; detail: string }> = [
  {
    name: "Emotional Crutch",
    detail: "Something to lean on while staying sober, and a way back into going out after years of being left out.",
  },
  {
    name: "Forget",
    detail: "The ritual without the alcohol. The drink is made and drunk as if it were the real thing, so that the real thing can be forgotten.",
  },
  { name: "Disguise", detail: "A drink that hides the fact that you are not drinking." },
  {
    name: "NA Pride",
    detail: "The answer to stigma: community, recipes, venues, and no more shame about ordering.",
  },
  { name: "Rip Off", detail: "The anger of people for whom it did not work." },
];

const PERSONAS: Array<{ name: string; voice: string; detail: string }> = [
  {
    name: "The Re-Socializer",
    voice: "“Sober, not dead.”",
    detail:
      "Once at the centre of the party, then cut off from it by sobriety. Drinks out, with others. Needs zero-proof on the menu and a bartender who knows what to do with it.",
  },
  {
    name: "The Alcohol Illusionist",
    voice: "“To up my mocktail game.”",
    detail:
      "Rebuilds an old favourite drink at home, in detail. Knows the brands, shares recipes, and notices at once when the burn is missing.",
  },
  {
    name: "The Mindful Moderator",
    voice: "“Mocktails are good af!”",
    detail:
      "Still drinks, and is looking for acceptable reasons to drink less: the third drink of the evening, Dry January, no hangover tomorrow.",
  },
  {
    name: "The Social Chameleon",
    voice: "“I was shy to ask at first.”",
    detail:
      "Not drinking, and would rather nobody noticed. Wants a drink that looks like everyone else’s, at a work event or a wedding.",
  },
  {
    name: "The Dispirited",
    voice: "“I feel stupid for having tried it.”",
    detail: "Tried it and feels cheated. Too expensive, too little like the real thing, or too much like it.",
  },
  {
    name: "The Straight Thriver",
    voice: "“I love appropriating alcohol aesthetic.”",
    detail: "Never drank, and likes the look and ritual of a cocktail. Cares about purity and ethics. Rarely talks about the category.",
  },
];

const CLIENT_QUOTES: string[] = [
  "This approach is real world. We are allowed to voyeuristically listen to how our consumers communicate their thoughts and authentically describe the world as they see it. I can’t emphasize enough what a unique value this brings to our brand as we grow and deliver a superior experience to our consumers.",
  "Based on the personas identified, we crafted strategic social media and PR plans that more specifically targeted the exact consumer we needed to gain awareness and conversion – successfully. The insights informed us how to prioritize our target in a way no other research could have. Our consumer is new, young and elusive. This approach cut through the clutter to create clarity.",
  "As an emerging consumer group, those Americans on a sober journey, this social media intelligence research provided in-depth insights that enabled our fledgling brand to speak with confidence and clarity to our target audience. It gives us street cred. We may be new but we ‘get’ them.",
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

function Section({
  id,
  eyebrow,
  title,
  tinted = false,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  tinted?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-28 px-6 py-16 ${tinted ? "bg-dark-grey/70" : ""}`}
      data-analytics-section={`bare_${id.replace(/-/g, "_")}`}
      data-analytics-label={title}
    >
      <div className="max-w-3xl mx-auto">
        <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4">{eyebrow}</p>
        <h2 className={`${cormorant.className} text-3xl md:text-4xl font-light text-white mb-8 leading-tight`}>
          {title}
        </h2>
        <div className="space-y-5 text-base font-light leading-relaxed text-text-secondary">{children}</div>
      </div>
    </section>
  );
}

function ConsumerQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className={`${cormorant.className} border-l border-accent pl-6 text-xl italic leading-snug text-white`}>
      {children}
    </blockquote>
  );
}

export default function BareZeroProofPage() {
  return (
    <main className="relative w-full min-h-screen bg-near-black text-text-primary overflow-x-hidden pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <div className="grain-overlay" />

      <article>
        {/* Hero */}
        <section
          className="relative pt-32 md:pt-44 pb-16 px-6"
          data-analytics-section="bare_hero"
          data-analytics-label="BARE Zero Proof Hero"
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
                Case Study
              </span>
              <span className="text-xs uppercase tracking-[0.16em] text-text-muted">
                Non-alcoholic spirits &middot; North America
              </span>
            </div>

            <h1
              className={`${cormorant.className} text-[clamp(2.4rem,5.5vw,4.4rem)] leading-[1.02] tracking-tight text-white`}
            >
              Who really drinks non-alcoholic spirits
            </h1>
            <p className={`${cormorant.className} mt-6 text-2xl italic leading-snug text-text-secondary md:text-3xl`}>
              What 214,000 posts told BARE Zero Proof about its consumer, before anyone asked a question.
            </p>

            <div className="w-16 h-px bg-accent mt-10 mb-10" />

            <div className="space-y-5 text-lg font-light leading-relaxed text-text-secondary">
              <p>
                <a
                  href={BARE_URL}
                  target="_blank"
                  rel="noopener"
                  className="text-accent hover:underline underline-offset-4"
                  data-analytics-event="outbound_click"
                  data-analytics-label="BARE Zero Proof"
                  data-analytics-location="bare_hero"
                  data-analytics-destination={BARE_URL}
                >
                  BARE Zero Proof Spirits
                </a>{" "}
                makes zero-proof gin, whiskey and tequila. In 2022 the brand was young and the category
                in the United States was new and fragmented. BARE wanted to become its thought leader,
                and needed to know who it was talking to.
              </p>
              <p>
                We did not run a survey. We read what people were already saying to each other about not
                drinking.
              </p>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* Key facts */}
        <section className="px-6 py-16" data-analytics-section="bare_facts" data-analytics-label="Key Facts">
          <div className="max-w-3xl mx-auto">
            <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4">Key Facts</p>
            <dl className="divide-y divide-white/10 border-y border-white/10">
              {KEY_FACTS.map((fact) => (
                <div key={fact.term} className="grid gap-2 py-5 md:grid-cols-[10rem_1fr] md:gap-8">
                  <dt className="text-xs uppercase tracking-[0.18em] text-accent md:pt-1">{fact.term}</dt>
                  <dd className="text-base font-light leading-relaxed text-text-secondary">{fact.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <Section id="assumption" eyebrow="The assumption" title="Everyone knew who the consumer was">
          <p>
            Industry reports agreed on the target. Zero-proof drinkers were thought to fall into two
            groups: 21 to 34 year olds who do not drink at all, and people who now and then choose to
            drink less. The explanation was generational. Gen Z and Millennials were said to be choosing
            a sober life for their health, and out of fear of losing control in front of a camera.
          </p>
          <p>
            A survey written from that brief would have measured the wellness motives of young adults
            with great precision.
          </p>
        </Section>

        <Section id="finding" eyebrow="The finding" title="The conversation belonged to someone else" tinted>
          <p>
            The public conversation showed a different picture. The people most engaged with
            non-alcoholic spirits were not wellness-minded newcomers. They were people managing a
            relationship with alcohol: staying sober, cutting down, or hiding that they were not
            drinking.
          </p>
          <p>
            For them a zero-proof drink does two jobs. It protects their sobriety. And it gives back
            what sobriety had taken away: a place at the bar, a glass in the hand, the ritual at the end
            of a long day.
          </p>
          <ConsumerQuote>
            “I love the ritual of a drink at the end of a long day and this is a good replacement since
            I quit drinking.”
          </ConsumerQuote>
          <p>
            Growth in the category is driven by social occasions. And a non-alcoholic spirit is not a
            perfect stand-in, so the illusion has to be kept up. Drinkers go looking for new products,
            better recipes, rituals, and people who know more than they do. The search is part of the
            pleasure. It breaks when a bar has nothing to offer, or when a bad bottle ruins the effect.
          </p>
          <ConsumerQuote>“Sober people deserve fanciness too!”</ConsumerQuote>
        </Section>

        <Section id="narratives" eyebrow="The architecture" title="Five narratives">
          <p>The conversation organised itself into five stories people tell about drinking without alcohol.</p>
          <dl className="divide-y divide-white/10 border-y border-white/10">
            {NARRATIVES.map((narrative) => (
              <div key={narrative.name} className="grid gap-2 py-5 md:grid-cols-[12rem_1fr] md:gap-8">
                <dt className={`${cormorant.className} text-2xl leading-tight text-white`}>{narrative.name}</dt>
                <dd>{narrative.detail}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section id="personas" eyebrow="The segmentation" title="Six personas, built from need">
          <p>
            The personas come from how people describe themselves when nobody is profiling them. They
            are separated by what they need from the drink, how often they use it, and whether they
            drink it alone or in company.
          </p>
          <ul className="grid gap-px overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/10 sm:grid-cols-2">
            {PERSONAS.map((persona) => (
              <li key={persona.name} className="bg-near-black p-6">
                <h3 className={`${cormorant.className} text-2xl leading-tight text-white`}>{persona.name}</h3>
                <p className={`${cormorant.className} mt-2 text-lg italic text-accent`}>{persona.voice}</p>
                <p className="mt-4 text-sm leading-relaxed">{persona.detail}</p>
              </li>
            ))}
          </ul>
          <p>
            Each persona came with a way to reach it. Stand with the Re-Socializer in the push for
            acceptance. Give the Illusionist variety and recipes. Give the Moderator more occasions. Do
            not address the Chameleon directly at all.
          </p>
        </Section>

        <Section id="limits" eyebrow="What we could not see" title="The people who had nothing to argue about" tinted>
          <p>
            The audience the industry expected does exist. People who come to the category for health
            reasons, with no history to manage, were in the data. They were quiet. They have no tension
            to talk about, so they do not talk.
          </p>
          <p>
            We told BARE that, and recommended studying that group with traditional methods. Reading the
            conversation shows you where the energy is. It also shows you where a survey is the right
            tool.
          </p>
        </Section>

        <Section id="impact" eyebrow="What BARE did with it" title="In the client’s words">
          <p>
            Jim Kempland, Co-Founder and CEO of BARE Zero Proof Spirits, described the work on stage with
            us in 2023.
          </p>
          <div className="space-y-8 pt-2">
            {CLIENT_QUOTES.map((quote) => (
              <blockquote key={quote} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-6 md:p-8">
                <p className={`${cormorant.className} text-xl leading-snug text-white md:text-2xl`}>“{quote}”</p>
              </blockquote>
            ))}
          </div>
          <p className="text-sm text-text-muted">
            Jim Kempland, Co-Founder and CEO,{" "}
            <a
              href={BARE_URL}
              target="_blank"
              rel="noopener"
              className="text-accent hover:underline underline-offset-4"
              data-analytics-event="outbound_click"
              data-analytics-label="BARE Zero Proof"
              data-analytics-location="bare_impact"
              data-analytics-destination={BARE_URL}
            >
              BARE Zero Proof Spirits
            </a>
          </p>
        </Section>

        <Section id="reading-machine" eyebrow="2024" title="Two years on, read again" tinted>
          <p>
            In 2024, with OvationMR, we read the brand, its competitors and the category again, this time
            with{" "}
            <Link href="/technology" className="text-accent hover:underline underline-offset-4">
              the Reading Machine
            </Link>
            . The conversation had moved.
          </p>
          <ul className="list-disc space-y-3 pl-5 marker:text-accent">
            <li>
              The category was growing out of imitation. Drinkers had begun to say that the best
              non-alcoholic spirits are not trying to replicate anything.
            </li>
            <li>
              Sugar came up in 14 percent of the discussion, but only 2 percent was about how much sugar
              a product contains. Sugar was a reason people gave for rejecting the category, not a
              health concern they were weighing.
            </li>
            <li>
              Almost half of the occasions people described were at home (48 percent), ahead of going out
              (39 percent) and travel (13 percent).
            </li>
            <li>
              People who talked about BARE singled out two things: that it is 0.0 percent alcohol where
              many products are “less than 0.5”, and that it was made by bartenders.
            </li>
          </ul>
          <ConsumerQuote>
            “Bare was made by bartenders, and all their ‘spirits’ genuinely taste like what they are
            supposed to be.”
          </ConsumerQuote>
        </Section>

        <Section id="talks" eyebrow="On stage" title="Presented with the client">
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {TALKS.map((talk) => (
              <li key={talk.event} className="py-5">
                <p className="text-xs uppercase tracking-[0.18em] text-accent">{talk.event}</p>
                <p className={`${cormorant.className} mt-2 text-2xl leading-tight text-white`}>{talk.title}</p>
                <p className="mt-2 text-sm">{talk.detail}</p>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 pt-8">
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
        </Section>
      </article>
    </main>
  );
}
