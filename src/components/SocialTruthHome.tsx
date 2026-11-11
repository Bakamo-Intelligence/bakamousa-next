import Image from "next/image";
import Link from "next/link";
import { BOOKING_HREF } from "@/lib/booking";
import { Cormorant_Garamond } from "next/font/google";
import AtlasGlobe from "@/components/AtlasGlobe";
import ClientMarquee from "@/components/ClientMarquee";
import HeroVideo from "@/components/HeroVideo";
import { HOME_FAQ, HOME_GLOSSARY } from "@/lib/home-faq";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

/**
 * One clip plays per visit. Each entry has a .webp poster, a .webm and an .mp4
 * next to it in /public/media/hero (960px wide, about 1 MB each).
 */
export const HERO_VIDEOS = [
  "/media/hero/india",
  "/media/hero/protests",
  "/media/hero/ukstreet",
  "/media/hero/shopping",
];

const STATS = [
  { value: "550+", label: "projects" },
  { value: "45", label: "countries" },
  { value: "65", label: "languages, read by native analysts" },
];

const CASE_CARDS = [
  {
    title: "Hospitals",
    expected: "Patients judge a hospital by credentials, waiting times and technology.",
    found: "In their own accounts, patients talk about food, rooms and how staff spoke to them.",
    question: "Which signs of everyday care do patients treat as signs of clinical care?",
  },
  {
    title: "Non-alcoholic drinks",
    expected: "The buyer is young and choosing to drink less.",
    found: "The people for whom these drinks matter most have decided to stop drinking alcohol.",
    question:
      "How much of the category depends on people who have stopped drinking, and what do they need from a drink?",
  },
  {
    title: "Mobile games",
    expected: "A puzzle game fills spare minutes.",
    found: "Some players describe a fixed daily session between leaving work and arriving home.",
    question: "How many players use the game this way, and what does the game do to that moment?",
  },
  {
    title: "Pet food",
    expected: "Owners choose by ingredients and nutrition.",
    found: "Owners describe feeding as a way of showing what kind of carer they are.",
    question: "Which ideas of care do buyers hold, and does the pack speak to any of them?",
  },
];

const YOU_GET = [
  "What is present in the conversation that your research did not cover",
  "What your category means to the people in it, in their words",
  "The questions this raises for your interviews and your survey",
];

const YOU_DO_NOT_GET = [
  "How many people hold a view in the population",
  "What people buy, switch to or pay",
  "A verdict on a concept that does not exist yet",
];

const H2 = "max-w-4xl text-4xl font-light leading-tight text-white md:text-6xl";
const BODY = "max-w-3xl space-y-7 text-xl font-light leading-relaxed text-text-secondary";
const EYEBROW = "text-xs uppercase tracking-[0.2em] text-accent";
const TEXT_LINK =
  "inline-flex text-sm uppercase tracking-[0.16em] text-accent transition-colors hover:text-white";

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
        <HeroVideo
          clip={heroVideo}
          className="pointer-events-none absolute inset-0 -z-10 h-full w-full select-none object-cover opacity-30 motion-reduce:hidden"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/45 to-near-black" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(201,169,110,0.16),transparent_34%)]" />

        <div className="mx-auto w-full max-w-6xl">
          <p className="text-balance text-xs uppercase tracking-[0.28em] text-accent">
            Discovery before measurement
          </p>
          <h1
            className={`${cormorant.className} mt-8 max-w-5xl text-[clamp(2.75rem,6vw,5.75rem)] leading-[0.95] tracking-tight text-white`}
          >
            Most research starts with what you know. Bakamo finds what you don&apos;t.
          </h1>
          <div className="mt-10 h-px w-16 bg-accent" />
          <p className="mt-10 max-w-3xl text-lg font-light leading-relaxed text-white/75 md:text-xl">
            Every questionnaire starts with assumptions about what matters. We start with people:
            what they talk about, what they care about and what they take for granted. By listening
            before asking, we uncover the meanings, motivations and language that research
            questions often miss. The result is a better understanding of what to ask next.
          </p>
          <div className="mt-12 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <Link
              href="#cases"
              className="cta-button text-sm"
              data-analytics-event="cta_click"
              data-analytics-label="See what we found"
              data-analytics-location="home_hero"
              data-analytics-destination="#cases"
            >
              See what we found
            </Link>
            <Link
              href="/our-method"
              className={TEXT_LINK}
              data-analytics-event="cta_click"
              data-analytics-label="How we work"
              data-analytics-location="home_hero"
              data-analytics-destination="/our-method"
            >
              How we work &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* How a question goes missing */}
      <section className="bg-dark-grey px-6 py-24 md:py-32" data-analytics-section="home_missing_question">
        <div className="mx-auto max-w-6xl">
          <h2 className={H2}>You cannot ask about what you have not thought of.</h2>
          <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-0 md:divide-x md:divide-border-grey">
            <div className="md:pr-12">
              <p className={EYEBROW}>What you ask</p>
              <p className="mt-6 text-xl font-light leading-relaxed text-text-secondary">
                A hospital group measures what it believes patients judge: clinical expertise,
                waiting times, equipment. The survey returns clear scores on each. Every score
                answers a question the hospital chose.
              </p>
            </div>
            <div className="md:pl-12">
              <p className={EYEBROW}>What comes up unasked</p>
              <p className="mt-6 text-xl font-light leading-relaxed text-white">
                When patients and families describe a hospital stay to each other, they write about
                the food, the state of the room and how staff spoke to them. Few of them discuss
                clinical skill, which they say they cannot judge.
              </p>
            </div>
          </div>
          <p
            className={`${cormorant.className} mt-16 max-w-4xl border-l border-accent pl-7 text-3xl leading-snug text-white md:text-4xl`}
          >
            The question this raises: do patients read everyday care as a sign of clinical care? No
            scorecard had asked it.
          </p>
        </div>
      </section>

      {/* Cases preview */}
      <section
        id="cases"
        className="scroll-mt-20 border-t border-border-grey px-6 py-24 md:py-32"
        data-analytics-section="home_cases"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className={H2}>What came up when nobody was asking.</h2>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {CASE_CARDS.map((card) => (
              <article
                key={card.title}
                className="flex flex-col rounded-[2rem] border border-white/10 bg-dark-grey p-8 md:p-10"
              >
                <h3 className={`${cormorant.className} text-3xl leading-tight text-white md:text-4xl`}>
                  {card.title}
                </h3>
                <dl className="mt-8 space-y-6">
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.18em] text-text-muted">Expected</dt>
                    <dd className="mt-2 text-base font-light leading-relaxed text-text-secondary">
                      {card.expected}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-[0.18em] text-accent">Found</dt>
                    <dd className="mt-2 text-lg leading-snug text-white">{card.found}</dd>
                  </div>
                  <div className="border-t border-accent/50 pt-6">
                    <dt className="text-[11px] uppercase tracking-[0.18em] text-accent">The question</dt>
                    <dd className={`${cormorant.className} mt-2 text-2xl italic leading-snug text-white`}>
                      {card.question}
                    </dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
          <Link
            href="/research"
            className={`mt-12 ${TEXT_LINK}`}
            data-analytics-event="cta_click"
            data-analytics-label="All cases in the Atlas"
            data-analytics-location="home_cases"
            data-analytics-destination="/research"
          >
            All cases in the Atlas &rarr;
          </Link>
        </div>
      </section>

      {/* The Reading Machine */}
      <section
        className="relative overflow-hidden bg-dark-grey px-6 py-24 md:py-32"
        data-analytics-section="home_technology"
      >
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[62%] md:block">
          <Image
            src="/media/reading-machine-semantic-map.png"
            alt=""
            fill
            sizes="62vw"
            className="object-cover object-[70%_center] opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-grey via-dark-grey/60 to-dark-grey/10" />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-grey/60 via-transparent to-dark-grey/60" />
        </div>
        <div className="relative mx-auto max-w-6xl">
          <p className={EYEBROW}>The Reading Machine</p>
          <h2 className={`mt-6 ${H2}`}>
            We read the whole conversation, because the unexpected sits at its edge.
          </h2>
          <div className={`mt-12 ${BODY}`}>
            <p>
              A sample drops the unusual post. A summary averages it away. The Reading Machine maps
              every post in a conversation, so our analysts can see the small group that does not
              fit and read it closely. The machine handles the volume. The analyst decides what it
              means.
            </p>
          </div>
          <Link
            href="/technology"
            className={`mt-10 ${TEXT_LINK}`}
            data-analytics-event="cta_click"
            data-analytics-label="How the Reading Machine works"
            data-analytics-location="home_technology"
            data-analytics-destination="/technology"
          >
            How the Reading Machine works &rarr;
          </Link>
        </div>
      </section>

      {/* What you get, and what you do not */}
      <section className="border-t border-border-grey px-6 py-24 md:py-32" data-analytics-section="home_limits">
        <div className="mx-auto max-w-6xl">
          <h2 className={H2}>We find the question. Measurement answers it.</h2>
          <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-0 md:divide-x md:divide-border-grey">
            <div className="md:pr-12">
              <p className={EYEBROW}>What you get</p>
              <ul className="mt-6 divide-y divide-border-grey border-y border-border-grey">
                {YOU_GET.map((item) => (
                  <li key={item} className="py-5 text-xl font-light leading-snug text-white">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:pl-12">
              <p className="text-xs uppercase tracking-[0.2em] text-text-muted">What you do not get</p>
              <ul className="mt-6 divide-y divide-border-grey border-y border-border-grey">
                {YOU_DO_NOT_GET.map((item) => (
                  <li key={item} className="py-5 text-xl font-light leading-snug text-text-secondary">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-12 max-w-3xl text-xl font-light leading-relaxed text-text-secondary">
            For those, the questions go to a survey, to sales data or to interviews. We work with
            your agency or your team, or we field the survey ourselves.
          </p>
        </div>
      </section>

      {/* Credentials */}
      <section id="atlas" className="bg-dark-grey px-6 py-24 md:py-32" data-analytics-section="home_atlas">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className={`${cormorant.className} text-5xl leading-none text-white md:text-7xl`}>
            Ten years of finding what the brief left out.
          </h2>
          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-3 gap-6">
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
        <div className="mx-auto max-w-6xl">
          <ClientMarquee />
        </div>
      </section>

      {/* Close */}
      <section className="border-t border-border-grey px-6 py-28 text-center md:py-40" data-analytics-section="home_close">
        <div className="mx-auto max-w-5xl">
          <h2 className={`${cormorant.className} text-5xl leading-none text-white md:text-7xl`}>
            Before you write the questionnaire, find out what it is missing.
          </h2>
          <p className="mx-auto mt-10 max-w-3xl text-lg font-light leading-relaxed text-text-secondary md:text-xl">
            Bring us the study you are about to run, the tracker you are about to renew or the brief
            you are about to send. We will show you what people are already saying that it does not
            ask about.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-6 sm:flex-row">
            <Link
              href={BOOKING_HREF}
              className="cta-button text-sm"
              data-analytics-event="book_demo_click"
              data-analytics-label="Bring us your next study"
              data-analytics-location="home_close"
              data-analytics-destination={BOOKING_HREF}
            >
              Bring us your next study
            </Link>
            <Link
              href="/about"
              className={TEXT_LINK}
              data-analytics-event="cta_click"
              data-analytics-label="Why we are named after a fool"
              data-analytics-location="home_close"
              data-analytics-destination="/about"
            >
              Why we are named after a fool &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border-grey bg-dark-grey px-6 py-24 md:py-32" data-analytics-section="home_faq">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">Questions</p>
          <h2 className={`mt-6 ${H2}`}>Social intelligence, answered plainly.</h2>
          <div className="mt-12 divide-y divide-border-grey border-y border-border-grey">
            {HOME_FAQ.map(({ question, answer }) => (
              <details key={question} className="group py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-xl font-light leading-snug text-white md:text-2xl [&::-webkit-details-marker]:hidden">
                  <span>{question}</span>
                  <span
                    aria-hidden="true"
                    className="mt-1 shrink-0 text-accent transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-3xl text-lg font-light leading-relaxed text-text-secondary">
                  {answer}
                </p>
              </details>
            ))}
          </div>

          <p className="mt-20 text-xs uppercase tracking-[0.2em] text-accent">Glossary</p>
          <dl className="mt-8 grid gap-x-12 gap-y-8 md:grid-cols-2">
            {HOME_GLOSSARY.map(({ term, definition }) => (
              <div key={term}>
                <dt className="text-xl font-light text-white">{term}</dt>
                <dd className="mt-2 text-base font-light leading-relaxed text-text-secondary">
                  {definition}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}
