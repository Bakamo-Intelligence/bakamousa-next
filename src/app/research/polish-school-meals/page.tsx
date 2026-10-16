import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import Link from "next/link";
import { BOOKING_HREF } from "@/lib/booking";
import { ORGANIZATION_REF, pageOpenGraph } from "@/lib/seo";
import { SITE_URL } from "@/lib/site-url";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

// Sources: Bakamo's reading of the online conversation about Poland's plant-based
// school meal rules (summer 2026) and Inquiry's omnibus survey of 1,017 adults
// (September 2026). Every percentage below is from the survey tables. Do not add
// figures that are not in those two sources.

const TITLE = "Listening First, Then Asking: Poland's School Meal Reform";
const PAGE_PATH = "/research/polish-school-meals";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;
const DESCRIPTION =
  "Case study with Inquiry: Bakamo read the online argument about Poland's plant-based school meals, found five objections and one thing nobody says, and Inquiry turned them into a survey of 1,017 Poles.";

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
};

const STATS: Array<{ value: string; label: string }> = [
  { value: "10,000+", label: "posts and comments read" },
  { value: "1,017", label: "Poles asked" },
  { value: "52%", label: "support the change, 18% oppose" },
  { value: "14%", label: "will say the food is poor" },
];

const OBJECTIONS: Array<{ name: string; heard: string; asked: string; agree: string }> = [
  {
    name: "Waste",
    heard: "“The kids won’t eat it.”",
    asked: "Many children will not want to eat new or unfamiliar dishes",
    agree: "51%",
  },
  {
    name: "Cost",
    heard: "“Why pay for food that ends up in the bin.”",
    asked: "Some parents will stop buying school lunches if their children refuse them",
    agree: "61%",
  },
  {
    name: "The shop next door",
    heard: "“They’ll go to Żabka instead.”",
    asked: "Children will buy unhealthy food in shops more often",
    agree: "49%",
  },
  {
    name: "Competence",
    heard: "“Can schools even cook this?”",
    asked: "School kitchens lack the resources and skills to prepare appealing plant-based meals",
    agree: "39%",
  },
  {
    name: "Trust",
    heard: "“Let the politicians eat it first.”",
    asked: "I trust schools and public institutions to implement these changes well",
    agree: "42%",
  },
  {
    name: "Taste",
    heard: "“It’s not about meat. The food is just bad.”",
    asked: "Success depends on taste and quality, not on whether meals contain meat",
    agree: "57%",
  },
];

// Verbatim public posts from the reading, anonymised. Polish originals kept where we hold them.
const VOICES: Array<{ text: string; original?: string; source: string }> = [
  {
    text: "The food is already hopeless, and from September it gets worse.",
    original: "i tak jest beznadziejne jedzenie teraz, to od września będzie jeszcze gorzej",
    source: "TikTok, a parent",
  },
  {
    text: "I asked fifteen school-age children whether they like school lunches. All fifteen said no. Why? Because they’re not good.",
    source: "Instagram",
  },
  {
    text: "I wonder whether the planetary diet will reach the Sejm canteen too.",
    original: "Ciekawe czy dieta planetarna trafi również do stołówki sejmowej.",
    source: "X, 17 August",
  },
];

const CONDITIONS: Array<{ label: string; value: number }> = [
  { label: "Meals should above all be tasty and appealing to children", value: 35 },
  { label: "Meals should meet clear nutritional standards, supervised by dietitians", value: 31 },
  { label: "Parents and children should be able to choose between meals", value: 24 },
  { label: "The change should not raise the price of school meals", value: 22 },
  { label: "Evidence that children actually eat the meals and that waste does not rise", value: 21 },
];

const IMPLICATIONS: Array<{ number: string; sub: string; title: string; body: string }> = [
  {
    number: "52%",
    sub: "support · 18% oppose",
    title: "The argument is won.",
    body: "The case for healthier food does not need making again. The policy will be judged on what is served in the first weeks, not on the principle.",
  },
  {
    number: "61%",
    sub: "expect parents to cancel",
    title: "The risk is quiet exit.",
    body: "Six in ten expect parents to stop buying lunches if children refuse the food, and half expect children to buy food in shops instead. Schools need meals children accept from the start, and a choice between meals, which parents named as their first condition.",
  },
  {
    number: "42%",
    sub: "trust institutions to deliver",
    title: "Trust is lowest where delivery happens.",
    body: "Four in ten trust institutions to carry this out, and 27% of 18 to 24 year olds. Funding, recipes and training for school kitchens are where credibility is built.",
  },
];

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-10">
      <p className="text-xs uppercase tracking-[0.22em] text-accent">{eyebrow}</p>
      <h2 className={`${cormorant.className} mt-3 text-[clamp(2rem,4vw,3.2rem)] leading-tight text-white`}>{title}</h2>
    </div>
  );
}

export default function PolishSchoolMealsPage() {
  return (
    <main className="relative w-full min-h-screen bg-near-black text-text-primary overflow-x-hidden pb-24">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ARTICLE_SCHEMA) }} />
      <div className="grain-overlay" />

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
          data-analytics-section="psm_hero"
          data-analytics-label="Polish School Meals Hero"
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
                With Inquiry &middot; Poland &middot; 2026
              </span>
            </div>

            <h1 className={`${cormorant.className} text-[clamp(2.8rem,6vw,5.2rem)] leading-[0.98] tracking-tight text-white`}>
              Listening first, <em className="text-accent">then</em> asking
            </h1>
            <p className={`${cormorant.className} mt-8 max-w-3xl text-2xl italic leading-snug text-text-secondary md:text-3xl`}>
              Poland put plant-based meals in every school. Bakamo read the argument about it, Inquiry turned the
              objections into a survey, and the country answered.
            </p>

            <figure className="mt-12">
              <video
                controls
                playsInline
                preload="metadata"
                poster="/media/school-meals/poster.jpg"
                src="/media/school-meals/listening-first.mp4"
                className="w-full aspect-video rounded-[1.5rem] border border-white/10 bg-black"
                data-analytics-event="video_play"
                data-analytics-label="Listening first, then asking"
                data-analytics-location="psm_hero"
              />
              <figcaption className="mt-4 flex flex-wrap justify-between gap-2 text-xs uppercase tracking-[0.16em] text-text-muted">
                <span>The film: 2 min 02</span>
                <span>Inquiry &middot; Bakamo</span>
              </figcaption>
            </figure>

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
        <section className="px-6 pb-16" data-analytics-section="psm_brief" data-analytics-label="The Brief">
          <div className="max-w-3xl mx-auto space-y-5 text-lg font-light leading-relaxed text-text-secondary">
            <p>
              From 1 September 2026, every Polish school canteen serves a fully plant-based meal at least once a
              week, with meat limited to two days. The rules were adopted a year earlier, and the argument about
              them grew all summer: in the regional press in July, and on social media in August, when Kraków
              announced two meat-free days a week.
            </p>
            <p>
              Inquiry and Bakamo used the case to test a way of working. Listen to what people say to each other
              first, including what they will not say when asked. Then ask the country, in the words people used.
            </p>
          </div>
        </section>

        {/* Listening */}
        <section className="px-6 py-20 bg-dark-grey/70" data-analytics-section="psm_listening" data-analytics-label="Listening">
          <div className="max-w-5xl mx-auto">
            <SectionHeading eyebrow="Listening first" title="Five objections, and one thing nobody states as a position" />
            <div className="grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-5 text-lg font-light leading-relaxed text-text-secondary">
                <p>
                  Bakamo collected more than 10,000 posts and comments from TikTok, YouTube, Onet and X, and read
                  them for meaning rather than counting them for sentiment. At first reading the opposition looked
                  like one block, and it outnumbered the supporters. Read closely, it was five separate objections:
                  that the policy is an imported ideology, that children will refuse the food and it will be thrown
                  away, that parents will pay for meals that end up in the bin, that school kitchens cannot cook
                  it, and that politicians would never eat what they prescribe for children.
                </p>
                <p>
                  Under every objection sat the same thing, which nobody states as a position: a shared shame about
                  the food we give our children at school. People argue about ideology or waste. They do not say
                  the food is bad, because that reflects on them.
                </p>
              </div>
              <ul className="space-y-4">
                {VOICES.map((voice) => (
                  <li key={voice.text} className="rounded-[1.25rem] border border-white/10 bg-near-black/60 p-6">
                    <p className={`${cormorant.className} text-2xl leading-snug text-white`}>“{voice.text}”</p>
                    {voice.original ? (
                      <p className="mt-3 text-sm italic font-light text-text-muted">{voice.original}</p>
                    ) : null}
                    <p className="mt-3 text-xs uppercase tracking-[0.16em] text-accent">{voice.source}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Asking */}
        <section className="px-6 py-20" data-analytics-section="psm_asking" data-analytics-label="Asking">
          <div className="max-w-5xl mx-auto">
            <SectionHeading eyebrow="Asking, once you know" title="What the street said, and how many agree" />
            <p className="max-w-3xl text-lg font-light leading-relaxed text-text-secondary">
              Inquiry turned the objections into survey questions, in the language people had used online, and
              asked 1,017 adults in its September omnibus. Three in four had heard of the change. 52% support it
              and 18% oppose it. The objections are held by the majority, not the fringe.
            </p>
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="text-xs uppercase tracking-[0.16em] text-text-muted">
                    <th className="pb-4 pr-6 font-normal">Heard online, summer 2026</th>
                    <th className="pb-4 pr-6 font-normal">Asked in September</th>
                    <th className="pb-4 text-right font-normal">Agree</th>
                  </tr>
                </thead>
                <tbody>
                  {OBJECTIONS.map((row) => (
                    <tr key={row.name} className="border-t border-white/10 align-top">
                      <td className="py-4 pr-6">
                        <p className="text-xs uppercase tracking-[0.16em] text-accent">{row.name}</p>
                        <p className={`${cormorant.className} mt-1 text-xl text-white`}>{row.heard}</p>
                      </td>
                      <td className="py-4 pr-6 font-light text-text-secondary">{row.asked}</td>
                      <td className={`${cormorant.className} py-4 text-right text-3xl leading-none text-white`}>{row.agree}</td>
                    </tr>
                  ))}
                  <tr className="border-t border-white/10 align-top">
                    <td className="py-4 pr-6">
                      <p className="text-xs uppercase tracking-[0.16em] text-accent">The unsaid, asked directly</p>
                      <p className={`${cormorant.className} mt-1 text-xl text-white`}>“School food is hopeless.”</p>
                    </td>
                    <td className="py-4 pr-6 font-light text-text-secondary">Current school meals are poor</td>
                    <td className={`${cormorant.className} py-4 text-right text-3xl leading-none text-accent`}>14%</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-8 max-w-3xl text-lg font-light leading-relaxed text-text-secondary">
              Asked outright whether school meals are poor today, only 14% say yes. The feeling stays unsaid, as
              the reading predicted. But the concerns that grow from it are shared by most of the country, and now
              they are measured.
            </p>
          </div>
        </section>

        {/* Conditions */}
        <section className="px-6 py-20 bg-dark-grey/70" data-analytics-section="psm_conditions" data-analytics-label="Conditions">
          <div className="max-w-3xl mx-auto">
            <SectionHeading eyebrow="The conditions respondents set" title="What would make the change acceptable" />
            <ul className="space-y-5">
              {CONDITIONS.map((cond) => (
                <li key={cond.label}>
                  <div className="flex items-baseline justify-between gap-6">
                    <span className="font-light text-text-secondary">{cond.label}</span>
                    <span className={`${cormorant.className} text-2xl text-accent`}>{cond.value}%</span>
                  </div>
                  <div className="mt-2 h-1 w-full rounded-full bg-white/10">
                    <div className="h-1 rounded-full bg-accent" style={{ width: `${cond.value}%` }} />
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm font-light text-text-muted">
              Respondents chose up to three conditions. Percentages are of all 1,017 respondents.
            </p>
          </div>
        </section>

        {/* Implications */}
        <section className="px-6 py-20" data-analytics-section="psm_implications" data-analytics-label="What It Delivers">
          <div className="max-w-5xl mx-auto">
            <SectionHeading eyebrow="What it delivers" title="Because the questions came from the conversation, the answers point to action" />
            <ul className="grid gap-6 md:grid-cols-3">
              {IMPLICATIONS.map((item) => (
                <li key={item.title} className="rounded-[1.5rem] border border-white/10 p-8">
                  <p className={`${cormorant.className} text-5xl leading-none text-accent`}>{item.number}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.16em] text-text-muted">{item.sub}</p>
                  <p className={`${cormorant.className} mt-6 text-2xl leading-tight text-white`}>{item.title}</p>
                  <p className="mt-3 text-sm font-light leading-relaxed text-text-secondary">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Method and partnership */}
        <section className="px-6 py-20 bg-dark-grey/70" data-analytics-section="psm_method" data-analytics-label="How It Was Done">
          <div className="max-w-3xl mx-auto">
            <SectionHeading eyebrow="How this was done" title="Discovery first. Measurement second." />
            <div className="space-y-5 text-lg font-light leading-relaxed text-text-secondary">
              <p>
                Bakamo collected the public conversation about the new rules from TikTok, YouTube, Onet and X
                across the year before they took effect and read it with the Reading Machine, which places every
                post by what it means so that the objections, and what sits under them, rise on their own. Our
                researchers read every group and signed every finding.
              </p>
              <p>
                Inquiry, a Warsaw research company, ran the questions on its omnibus survey in September 2026:
                1,017 adults, representative of Poland. Percentages are of all respondents. “Agree” combines
                “strongly” and “somewhat”. Full tables are available on request.
              </p>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link
                href={BOOKING_HREF}
                className="cta-button text-sm"
                data-analytics-event="book_demo_click"
                data-analytics-label="Book a demo"
                data-analytics-location="psm_cta"
                data-analytics-destination={BOOKING_HREF}
              >
                Book a demo
              </Link>
              <Link
                href="/public-sector"
                className="text-sm uppercase tracking-[0.16em] text-text-muted transition-colors hover:text-white"
              >
                Social intelligence for the public sector &rarr;
              </Link>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
