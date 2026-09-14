import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import AtlasGlobe from "@/components/AtlasGlobe";
import ClientMarquee from "@/components/ClientMarquee";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

/** Web-compressed copies of the originals in /public/media. One plays per visit. */
export const HERO_VIDEOS = [
  "/media/hero/india.mp4",
  "/media/hero/protests.mp4",
  "/media/hero/ukstreet.mp4",
  "/media/hero/shopping.mp4",
];

const STATS = [
  { value: "45", label: "countries" },
  { value: "65", label: "languages" },
  { value: "550+", label: "projects" },
];

const EXAMPLES = [
  "The tension nobody put in the discussion guide.",
  "The assumption everyone in a category has quietly accepted.",
  "The thing people have stopped arguing about.",
  "The language consumers use when they don't know they're being researched.",
  "The reason a perfectly good proposition doesn't travel.",
];

const SECTORS = [
  {
    title: "Commercial",
    body: "Consumers, categories, brands, culture, communications and emerging needs.",
  },
  {
    title: "Health & Pharma",
    body: "Patients, healthcare professionals, health equity, public discourse and the social forces shaping health.",
  },
  {
    title: "Government & Not-for-Profit",
    body: "Citizens, public opinion, policy, advocacy, social movements and contested issues.",
  },
];

function Lines({ lines, className }: { lines: string[]; className?: string }) {
  return (
    <div className={className}>
      {lines.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </div>
  );
}

const H2 = "max-w-4xl text-4xl font-light leading-tight text-white md:text-6xl";
const BODY = "max-w-3xl space-y-7 text-xl font-light leading-relaxed text-text-secondary";
const RULED = "max-w-3xl space-y-2 border-l border-accent pl-7 text-2xl font-light leading-snug text-white";

export function pickHeroVideo() {
  return HERO_VIDEOS[Math.floor(Math.random() * HERO_VIDEOS.length)];
}

export default function SocialTruthHome({ heroVideo }: { heroVideo: string }) {
  return (
    <div className="relative text-text-primary">
      <div className="grain-overlay" />

      {/* Hero */}
      <section
        className="relative isolate flex min-h-[88vh] items-center overflow-hidden border-b border-border-grey bg-near-black px-6 pb-20 pt-32 md:pt-40"
        data-analytics-section="home_hero"
      >
        <video
          key={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full select-none object-cover opacity-30 motion-reduce:hidden"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/45 to-near-black" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(201,169,110,0.16),transparent_34%)]" />

        <div className="mx-auto w-full max-w-6xl">
          <p className="text-xs uppercase tracking-[0.28em] text-accent">Social Truth</p>
          <h1
            className={`${cormorant.className} mt-8 max-w-5xl text-[clamp(3rem,6.5vw,6.25rem)] leading-[0.92] tracking-tight text-white`}
          >
            Before you ask people what they think, listen to what they say when nobody is asking.
          </h1>
          <div className="mt-10 h-px w-16 bg-accent" />
          <div className="mt-10 max-w-3xl space-y-5 text-lg font-light leading-relaxed text-white/75 md:text-xl">
            <p>People are constantly telling each other what matters to them.</p>
            <p>
              In conversations, arguments, jokes, complaints, recommendations, stories and silences.
            </p>
            <p className="text-white">This is where Bakamo looks.</p>
            <p>
              We read natural conversation to uncover the meanings, tensions and assumptions shaping
              how people see the world &mdash; and turn them into insight that helps organisations
              make better decisions.
            </p>
          </div>
          <p className={`${cormorant.className} mt-10 text-3xl italic text-accent md:text-4xl`}>
            We call this Social Truth.
          </p>
        </div>
      </section>

      {/* The problem */}
      <section className="bg-dark-grey px-6 py-24 md:py-32" data-analytics-section="home_problem">
        <div className="mx-auto max-w-5xl">
          <h2 className={H2}>Research has become very good at measuring the wrong things.</h2>
          <div className={`mt-12 ${BODY}`}>
            <p>
              We have perfected the questionnaire, the focus group, the tracker, the segment and the
              dashboard.
            </p>
            <p>
              But people don&apos;t experience their lives in questionnaires, segments or dashboards.
            </p>
            <p className="text-white">They live in culture. In conversation. In contradiction.</p>
            <p>And when you ask people what they think, you inevitably shape what they tell you.</p>
          </div>
          <Lines
            lines={[
              "The brief defines the question.",
              "The question defines the instrument.",
              "The instrument defines what can be found.",
            ]}
            className={`mt-10 ${RULED}`}
          />
          <p className="mt-12 max-w-4xl text-2xl font-light leading-snug text-white md:text-3xl">
            So we start somewhere else.
          </p>
          <p className="mt-4 max-w-3xl text-xl font-light leading-relaxed text-text-secondary">
            We listen to what people say to each other when nobody is asking.
          </p>
        </div>
      </section>

      {/* What is Social Truth */}
      <section className="border-t border-border-grey px-6 py-24 md:py-32" data-analytics-section="home_definition">
        <div className="mx-auto max-w-5xl">
          <h2 className={H2}>What is Social Truth?</h2>
          <div className={`mt-12 ${BODY}`}>
            <p className="text-white">Social Truth lives between people.</p>
            <p>
              It is the shared meaning, tension, assumption or belief that emerges through
              conversation &mdash; often without anyone explicitly stating it.
            </p>
            <p>
              <strong className="font-medium text-white">It is not opinion.</strong> Opinion lives
              inside a person.{" "}
              <strong className="font-medium text-white">It is not sentiment.</strong> Sentiment is
              a score applied after the fact.
            </p>
          </div>
          <p className="mt-14 text-xs uppercase tracking-[0.2em] text-accent">It can be</p>
          <ul className="mt-6 divide-y divide-border-grey border-y border-border-grey">
            {EXAMPLES.map((example) => (
              <li
                key={example}
                className={`${cormorant.className} py-6 text-3xl leading-snug text-white md:text-4xl`}
              >
                {example}
              </li>
            ))}
          </ul>
          <div className="mt-14 space-y-2 text-2xl font-light leading-snug">
            <p className="text-text-secondary">
              Social Truth is not what people say when you ask them.
            </p>
            <p className="text-white">It is what their conversations reveal when you listen.</p>
          </div>
        </div>
      </section>

      {/* Reality first + technology */}
      <section className="bg-dark-grey px-6 py-24 md:py-32" data-analytics-section="home_method">
        <div className="mx-auto max-w-5xl">
          <h2 className={H2}>Reality first. Measurement second.</h2>
          <div className={`mt-12 ${BODY}`}>
            <p>Most research starts with a question.</p>
            <p className="text-white">We start with reality.</p>
            <p>
              We explore the conversations that already exist, discover what is actually meaningful,
              and only then decide what is worth measuring.
            </p>
          </div>
          <p className={`${cormorant.className} mt-14 text-5xl leading-none text-white md:text-7xl`}>
            Listen. Map. Measure.
          </p>
          <div className="mt-8 space-y-1 text-xl font-light">
            <p className="text-text-secondary">The conversation moves first.</p>
            <p className="text-white">Research usually arrives later.</p>
          </div>
          <Link
            href="/our-method"
            className="mt-8 inline-flex text-sm uppercase tracking-[0.16em] text-accent transition-colors hover:text-white"
            data-analytics-event="cta_click"
            data-analytics-label="See how Social Truth is made"
            data-analytics-location="home_method"
            data-analytics-destination="/our-method"
          >
            See how Social Truth is made &rarr;
          </Link>

          <div className="mt-20 border-t border-border-grey pt-16">
            <h3 className="max-w-3xl text-3xl font-light leading-tight text-white md:text-4xl">
              We read differently.
            </h3>
            <div className={`mt-10 ${BODY}`}>
              <p>
                Millions of conversations contain an enormous amount of information. But information
                isn&apos;t insight.
              </p>
              <p>
                Our Reading Machine helps us navigate this complexity &mdash; finding patterns,
                connections and emerging meanings across conversations at a scale no human team
                could manage alone.
              </p>
              <p>
                But technology doesn&apos;t tell us what matters. Our analysts do. They bring
                context, judgement, cultural understanding and curiosity to the things machines
                find &mdash; because finding a pattern is not the same as understanding it.
              </p>
            </div>
            <p className="mt-12 max-w-4xl border-l border-accent pl-7 text-2xl font-light leading-snug text-white md:text-3xl">
              AI gives us scale. Humans give it meaning.
            </p>
            <Link
              href="/technology"
              className="mt-10 inline-flex text-sm uppercase tracking-[0.16em] text-accent transition-colors hover:text-white"
              data-analytics-event="cta_click"
              data-analytics-label="Meet The Reading Machine"
              data-analytics-location="home_technology"
              data-analytics-destination="/technology"
            >
              Meet The Reading Machine &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* The Atlas */}
      <section id="atlas" className="px-6 py-24 md:py-32" data-analytics-section="home_atlas">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className={`${cormorant.className} text-5xl leading-none text-white md:text-7xl`}>
            We go where the conversation is.
          </h2>
          <div className="mx-auto mt-10 max-w-3xl space-y-5 text-lg font-light leading-relaxed text-text-secondary">
            <p className="text-2xl text-white">Reality doesn&apos;t stop at borders.</p>
            <p>
              People talk differently in different places, cultures and languages. But everywhere,
              they are negotiating identity, belonging, status, security, trust, change and meaning.
            </p>
            <p>We&apos;ve spent ten years learning how to read those conversations.</p>
          </div>
          <div className="mx-auto mt-14 grid max-w-3xl grid-cols-3 gap-6">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p
                  className={`${cormorant.className} text-[clamp(3rem,7vw,5.5rem)] leading-none text-white`}
                >
                  {stat.value}
                </p>
                <p className="mt-3 text-xs uppercase tracking-[0.16em] text-text-secondary">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
        <AtlasGlobe />
        <div className="mx-auto mt-16 max-w-3xl space-y-5 text-center text-lg font-light leading-relaxed text-text-secondary">
          <p>
            Our Atlas shows where we&apos;ve listened &mdash; across markets, cultures, categories
            and some of the most contested issues facing organisations today. Click a dot.
          </p>
          <p>But the point isn&apos;t how much data we&apos;ve collected.</p>
          <p className="text-2xl text-white">It&apos;s how much reality we&apos;ve learned to recognise.</p>
        </div>
        <div className="mx-auto max-w-6xl">
          <ClientMarquee />
        </div>
      </section>

      {/* Boxes */}
      <section className="border-t border-border-grey px-6 py-24 md:py-32" data-analytics-section="home_boxes">
        <div className="mx-auto max-w-5xl">
          <h2 className={H2}>We don&apos;t believe people fit neatly into boxes.</h2>
          <p className="mt-12 max-w-3xl text-2xl font-light leading-snug text-white">
            People are contradictory. Contextual. Social.
          </p>
          <div className={`mt-8 ${BODY}`}>
            <p>
              They don&apos;t live inside the segments, personas and categories researchers build
              for them. So we start by listening to the world they actually inhabit.
            </p>
          </div>
          <p className={`${cormorant.className} mt-12 text-4xl italic text-accent md:text-5xl`}>
            Then we work out what the boxes should have been.
          </p>
        </div>
      </section>

      {/* What we uncover */}
      <section className="bg-dark-grey px-6 py-24 md:py-32" data-analytics-section="home_sectors">
        <div className="mx-auto max-w-6xl">
          <h2 className={H2}>What we uncover changes what happens next.</h2>
          <p className="mt-10 max-w-3xl text-xl font-light leading-relaxed text-text-secondary">
            Our work has helped organisations understand markets, challenge assumptions, identify
            emerging needs and make decisions with a clearer view of the people affected by them. We
            work across three broad areas:
          </p>
          <div className="mt-16 grid gap-10 md:grid-cols-3 md:divide-x md:divide-border-grey">
            {SECTORS.map((sector, index) => (
              <article key={sector.title} className={index > 0 ? "md:pl-10" : ""}>
                <h3 className="text-2xl font-light text-white">{sector.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-text-secondary">{sector.body}</p>
              </article>
            ))}
          </div>
          <div className="mt-16 space-y-1 text-2xl font-light">
            <p className="text-text-secondary">Different questions. Different audiences.</p>
            <p className="text-white">The same starting point: reality.</p>
          </div>
        </div>
      </section>

      {/* The insight you didn't ask for */}
      <section className="border-t border-border-grey px-6 py-24 md:py-32" data-analytics-section="home_uncomfortable">
        <div className="mx-auto max-w-5xl">
          <h2 className={H2}>Sometimes the most valuable insight is the one you didn&apos;t ask for.</h2>
          <div className={`mt-12 ${BODY}`}>
            <p>A brief is a useful starting point. It isn&apos;t necessarily the right question.</p>
          </div>
          <Lines
            lines={[
              "We challenge assumptions when the evidence demands it.",
              "We expose tensions that don't fit the hypothesis.",
              "We bring back things that are inconvenient, uncomfortable or simply unexpected.",
            ]}
            className={`mt-10 ${RULED}`}
          />
          <p className="mt-12 max-w-3xl text-xl font-light leading-relaxed text-text-secondary">
            Because our job isn&apos;t to make the research look good.
          </p>
          <p className="mt-4 max-w-4xl text-2xl font-light leading-snug text-white md:text-3xl">
            Our job is to make reality impossible to ignore.
          </p>
        </div>
      </section>

      {/* Close */}
      <section className="bg-dark-grey px-6 py-28 text-center md:py-40" data-analytics-section="home_close">
        <div className="mx-auto max-w-5xl">
          <h2 className={`${cormorant.className} text-5xl leading-none text-white md:text-8xl`}>
            Build on reality.
          </h2>
          <div className="mx-auto mt-10 max-w-3xl space-y-5 text-lg font-light leading-relaxed text-text-secondary md:text-xl">
            <p>You don&apos;t always need another study.</p>
            <p>
              Sometimes you need to know whether you&apos;re asking the right question in the first
              place.
            </p>
            <p className="text-white">Bring us the decision you&apos;re trying to make.</p>
          </div>
          <p className="mx-auto mt-6 max-w-3xl text-2xl font-light leading-snug text-white">
            We&apos;ll help you understand what you need to know first.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Link
              href="/our-method"
              className="cta-button text-sm"
              data-analytics-event="cta_click"
              data-analytics-label="Discover Social Truth"
              data-analytics-location="home_close"
              data-analytics-destination="/our-method"
            >
              Discover Social Truth
            </Link>
            <Link
              href="#atlas"
              className="inline-flex text-sm uppercase tracking-[0.16em] text-accent transition-colors hover:text-white"
              data-analytics-event="cta_click"
              data-analytics-label="Explore our work"
              data-analytics-location="home_close"
              data-analytics-destination="#atlas"
            >
              Explore our work &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
