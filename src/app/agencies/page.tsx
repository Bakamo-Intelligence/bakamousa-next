import type { Metadata } from "next";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import { BOOKING_HREF } from "@/lib/booking";
import { pageOpenGraph } from "@/lib/seo";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const TITLE = "For Research Agencies: We Find the Questions, You Run the Study";
const DESCRIPTION =
  "Bakamo works as the discovery phase in front of an agency's qualitative and quantitative work. We read what people already say and hand you what to ask about.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/agencies",
  },
  openGraph: pageOpenGraph("/agencies", `${TITLE} | Bakamo`, DESCRIPTION),
};

const WHERE_WE_SIT = [
  {
    title: "Before recruitment.",
    body: "We show who is in the conversation, so you can decide who to recruit.",
  },
  {
    title: "Before the discussion guide.",
    body: "We show which topics people raise unasked, so the guide can open them.",
  },
  {
    title: "Before the questionnaire.",
    body: "We give you the words people use and the answer options your list is missing.",
  },
];

const YOU_RECEIVE = [
  "What we found that the client's brief did not anticipate",
  "The positions in the conversation, described as personas you can recruit against",
  "The vocabulary people use for the category",
  "The questions it raises, sorted into those for interviews and those for the survey",
];

const H2 = "text-4xl font-light leading-tight text-white md:text-6xl";

export default function AgenciesPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-near-black text-text-primary">
      <div className="grain-overlay" />

      <section className="px-6 pb-24 pt-32 md:pb-32 md:pt-44" data-analytics-section="agencies_hero">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">For research agencies</p>
          <h1
            className={`${cormorant.className} mt-6 max-w-5xl text-[clamp(3.6rem,7.5vw,7rem)] leading-[0.88] tracking-tight text-white`}
          >
            We find the questions. You run the study.
          </h1>
          <div className="mt-10 h-px w-16 bg-accent" />
          <p className="mt-10 max-w-3xl text-xl font-light leading-relaxed text-text-secondary">
            Bakamo works as the discovery phase in front of your qualitative and quantitative work.
            We do not interview, moderate or recruit. We read what people already say and hand you
            what to ask about.
          </p>
        </div>
      </section>

      <section className="bg-dark-grey px-6 py-24 md:py-32" data-analytics-section="agencies_where">
        <div className="mx-auto max-w-6xl">
          <h2 className={H2}>Where we sit in your project.</h2>
          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-border-grey">
            {WHERE_WE_SIT.map((item, index) => (
              <article key={item.title} className={index > 0 ? "md:pl-10" : "md:pr-10"}>
                <h3 className={`${cormorant.className} text-3xl leading-tight text-white md:text-4xl`}>
                  {item.title}
                </h3>
                <p className="mt-5 text-lg font-light leading-relaxed text-text-secondary">{item.body}</p>
              </article>
            ))}
          </div>
          <p className="mt-14 max-w-4xl border-l border-accent pl-7 text-xl font-light leading-relaxed text-white">
            A first reading arrives within two weeks of commissioning, in time for recruitment and
            the guide. The full Question Set follows.
          </p>
        </div>
      </section>

      <section className="border-t border-border-grey px-6 py-24 md:py-32" data-analytics-section="agencies_receive">
        <div className="mx-auto max-w-5xl">
          <h2 className={H2}>What you receive.</h2>
          <ul className="mt-12 divide-y divide-border-grey border-y border-border-grey">
            {YOU_RECEIVE.map((item) => (
              <li key={item} className="py-6 text-xl font-light leading-snug text-white md:text-2xl">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-dark-grey px-6 py-24 md:py-32" data-analytics-section="agencies_cta">
        <div className="mx-auto max-w-5xl">
          <h2 className={H2}>What stays with you.</h2>
          <p className="mt-10 max-w-3xl text-xl font-light leading-relaxed text-text-secondary">
            The interviews, the sample, the numbers and the client relationship. We appear in your
            proposal as a named partner for the discovery phase.
          </p>
          <Link
            href={BOOKING_HREF}
            className="cta-button mt-12 text-sm"
            data-analytics-event="book_demo_click"
            data-analytics-label="Send us the brief you are working on"
            data-analytics-location="agencies_cta"
            data-analytics-destination={BOOKING_HREF}
          >
            Send us the brief you are working on
          </Link>
        </div>
      </section>
    </main>
  );
}
