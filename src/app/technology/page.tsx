import type { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { BOOKING_HREF } from "@/lib/booking";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const TITLE = "The Reading Machine: Reading the Whole Conversation";
const DESCRIPTION =
  "The Reading Machine is Bakamo's own analysis system. It places every post in a conversation on a map, so an analyst can see the small group that does not fit and read it.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/technology",
  },
  openGraph: pageOpenGraph("/technology", `${TITLE} | Bakamo`, DESCRIPTION),
};

const WHAT_IT_DOES = [
  {
    title: "It maps the whole conversation.",
    body: "Every post is placed by how similar its wording is to every other. Nothing is left out before the reading starts.",
  },
  {
    title: "It shows what is not yet explained.",
    body: "Posts that no narrative accounts for stay visible on the map. That remainder is where most new questions come from.",
  },
  {
    title: "It makes the reading checkable.",
    body: "Each finding shows how many posts support it and where they sit. You can open the posts behind any claim.",
  },
  {
    title: "It tells you when the evidence is thin.",
    body: "Where a conversation is too small to carry a conclusion, the reading shows that.",
  },
  {
    title: "It reads the same way every month.",
    body: "A study can be re-read in the same framework, which is what makes Public Mood possible.",
  },
  {
    title: "It leaves the judgment to people.",
    body: "The machine clusters and suggests. A senior analyst names what a group of posts means and signs it.",
  },
];

const STUDY_STATS = [
  { value: "214,000", label: "public posts on the map" },
  { value: "130,000", label: "people writing them" },
  { value: "24", label: "months of conversation" },
  { value: "5,000+", label: "posts read closely by analysts" },
];

const FOR_EACH_PRODUCT = [
  { name: "Agenda", body: "The topic map of the whole conversation, sized by share of conversation, in 48 hours." },
  {
    name: "Frames",
    body: "Every narrative counted across the full conversation, so you see how much of it each story takes up.",
  },
  { name: "Publics", body: "Your brand compared with competitors, including the posts that never name you." },
  { name: "Common Sense", body: "Your own strategic questions put to every post." },
  { name: "Public Mood", body: "The study re-read every month in the same framework." },
];

const H2 = "text-4xl font-light leading-tight text-white md:text-6xl";

export default function TechnologyPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-near-black text-text-primary">
      <div className="grain-overlay" />

      <section className="px-6 pb-24 pt-32 md:pb-32 md:pt-44" data-analytics-section="technology_hero">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">The Reading Machine</p>
          <h1
            className={`${cormorant.className} mt-6 max-w-5xl text-[clamp(3.2rem,7vw,6.5rem)] leading-[0.9] tracking-tight text-white`}
          >
            The unexpected is at the edge of a conversation. So we read all of it.
          </h1>
          <div className="mt-10 h-px w-16 bg-accent" />
          <p className="mt-10 max-w-3xl text-xl font-light leading-relaxed text-text-secondary">
            A keyword count shows the centre. A sample drops the unusual post. The Reading Machine
            places every post on a map, so an analyst can see the small group that does not fit and
            read it.
          </p>
        </div>
      </section>

      <section className="border-t border-border-grey px-6 py-24 md:py-32" data-analytics-section="technology_why">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-4xl space-y-8 text-xl font-light leading-relaxed text-text-secondary">
            <p>
              Qualitative research has always had to choose. Read deeply, and you read a sample:
              the fragments someone decided were worth seeing. Read everything, and you count
              instead of read.
            </p>
            <p className="border-l border-accent pl-7 text-3xl leading-snug text-white">
              We built the Reading Machine so our analysts no longer have to choose.
            </p>
          </div>

          <figure className="mt-16">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[2rem] border border-white/10 bg-dark-grey">
              <Image
                src="/media/reading-machine-semantic-map.png"
                alt="The Reading Machine's map of a whole conversation, with every post placed by its wording"
                fill
                sizes="(min-width: 1152px) 1152px, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="mt-6 max-w-3xl text-lg font-light leading-relaxed text-text-secondary">
              A whole conversation on one map. Posts with similar wording sit close together. The
              small groups at the edge are where we look first.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="bg-dark-grey px-6 py-24 md:py-32" data-analytics-section="technology_what_it_does">
        <div className="mx-auto max-w-6xl">
          <h2 className={`max-w-4xl ${H2}`}>What it does.</h2>
          <p className="mt-10 max-w-3xl text-xl font-light leading-relaxed text-text-secondary">
            The Reading Machine is our own analysis system. It extends a qualitative analyst&apos;s
            reading to a whole conversation, tens of thousands of posts at a time.
          </p>

          <div className="mt-16">
            {WHAT_IT_DOES.map((item) => (
              <article key={item.title} className="relative border-t border-border-grey py-9">
                <div className="absolute bottom-0 left-0 top-9 hidden w-px bg-border-grey md:block" />
                <div className="md:pl-10">
                  <h3 className="text-3xl font-light text-white">{item.title}</h3>
                  <p className="mt-5 max-w-3xl text-lg font-light leading-relaxed text-text-secondary">
                    {item.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border-grey px-6 py-24 md:py-32" data-analytics-section="technology_study">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">BARE Zero Proof</p>
          <h2 className={`mt-6 ${H2}`}>One study in numbers.</h2>
          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
            {STUDY_STATS.map((stat) => (
              <div key={stat.label}>
                <p className={`${cormorant.className} text-[clamp(2.6rem,5vw,4.5rem)] leading-none text-white`}>
                  {stat.value}
                </p>
                <p className="mt-3 text-xs uppercase tracking-[0.16em] text-text-secondary">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-14 max-w-3xl text-xl font-light leading-relaxed text-text-secondary">
            The people who had stopped drinking were one group on that map, away from the centre.
          </p>
          <Link
            href="/research/bare-zero-proof"
            className="mt-8 inline-flex text-sm uppercase tracking-[0.16em] text-accent transition-colors hover:text-white"
            data-analytics-event="cta_click"
            data-analytics-label="Read the case study"
            data-analytics-location="technology_study"
            data-analytics-destination="/research/bare-zero-proof"
          >
            Read the case study &rarr;
          </Link>
        </div>
      </section>

      <section className="bg-dark-grey px-6 py-24 md:py-32" data-analytics-section="technology_products">
        <div className="mx-auto max-w-6xl">
          <h2 className={H2}>What it does for each product.</h2>
          <dl className="mt-12 divide-y divide-border-grey border-y border-border-grey">
            {FOR_EACH_PRODUCT.map((item) => (
              <div key={item.name} className="grid gap-2 py-6 md:grid-cols-[14rem_1fr] md:gap-8">
                <dt className={`${cormorant.className} text-3xl leading-tight text-white`}>{item.name}</dt>
                <dd className="text-lg font-light leading-relaxed text-text-secondary">{item.body}</dd>
              </div>
            ))}
          </dl>
          <Link
            href="/what-we-do"
            className="mt-10 inline-flex text-sm uppercase tracking-[0.16em] text-accent transition-colors hover:text-white"
            data-analytics-event="cta_click"
            data-analytics-label="The products"
            data-analytics-location="technology_products"
            data-analytics-destination="/what-we-do"
          >
            The products &rarr;
          </Link>
        </div>
      </section>

      <section className="border-t border-border-grey px-6 py-24 md:py-32" data-analytics-section="technology_numbers">
        <div className="mx-auto max-w-6xl">
          <h2 className={H2}>What the numbers mean.</h2>
          <p className="mt-10 max-w-4xl text-xl font-light leading-relaxed text-text-secondary">
            Every count in our reports is a count of posts. It describes the conversation: how much
            of it a topic takes up, how close two meanings sit. It does not describe the market.
            Turning a finding into a market figure is the job of the survey that follows.
          </p>
        </div>
      </section>

      <section className="bg-dark-grey px-6 py-24 md:py-32" data-analytics-section="technology_summary">
        <div className="mx-auto max-w-6xl">
          <h2 className={H2}>Not a summary tool.</h2>
          <p className="mt-10 max-w-4xl text-xl font-light leading-relaxed text-text-secondary">
            An AI summary gives you the average of a conversation. The average is what you already
            knew. We built the Reading Machine to keep the exceptions in view, because the
            exception is usually the question nobody asked.
          </p>
          <p className={`${cormorant.className} mt-14 text-4xl italic leading-tight text-accent md:text-5xl`}>
            The machine reads at scale. People make sense of it.
          </p>
          <p className="mt-14 max-w-3xl border-l border-accent pl-7 text-base leading-relaxed text-text-secondary">
            For methodologists: the Reading Machine is not an AI. It is a hermeneutic engine.
            Language is given a position in semantic space, and things that mean similar things sit
            closer together. The machine does not decide what those relationships mean.
          </p>
          <Link
            href={BOOKING_HREF}
            className="cta-button mt-12 text-sm"
            data-analytics-event="book_demo_click"
            data-analytics-label="Book a demo of the Reading Machine"
            data-analytics-location="technology_summary"
            data-analytics-destination={BOOKING_HREF}
          >
            Book a demo of the Reading Machine
          </Link>
        </div>
      </section>
    </main>
  );
}
