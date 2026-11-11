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
    title: "It leaves the judgment to people.",
    body: "The machine clusters and suggests. A senior analyst names what a group of posts means and signs it.",
  },
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

      <section
        className="relative overflow-hidden bg-dark-grey px-6 py-24 md:py-32"
        data-analytics-section="technology_what_it_does"
      >
        {/* Reading Machine map as a faded backdrop behind the intro text */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[44rem] md:left-auto md:h-[48rem] md:w-[72%]">
          <Image
            src="/media/reading-machine-semantic-map.png"
            alt="The Reading Machine placing every post of a conversation on a map"
            fill
            sizes="(min-width: 768px) 72vw, 100vw"
            className="object-cover object-[70%_top] opacity-25 md:opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-grey via-dark-grey/70 to-dark-grey/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-grey via-dark-grey/20 to-dark-grey/40" />
        </div>

        <div className="relative mx-auto max-w-6xl">
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

      <section className="border-t border-border-grey px-6 py-24 md:py-32" data-analytics-section="technology_numbers">
        <div className="mx-auto max-w-5xl">
          <h2 className={H2}>What the numbers mean.</h2>
          <p className="mt-10 max-w-4xl text-xl font-light leading-relaxed text-text-secondary">
            Every count in our reports is a count of posts. It describes the conversation: how much
            of it a topic takes up, how close two meanings sit. It does not describe the market.
            Turning a finding into a market figure is the job of the survey that follows.
          </p>
        </div>
      </section>

      <section className="bg-dark-grey px-6 py-24 md:py-32" data-analytics-section="technology_summary">
        <div className="mx-auto max-w-5xl">
          <h2 className={H2}>Not a summary tool.</h2>
          <p className="mt-10 max-w-4xl text-xl font-light leading-relaxed text-text-secondary">
            An AI summary gives you the average of a conversation. The average is what you already
            knew. We built the Reading Machine to keep the exceptions in view, because the
            exception is usually the question nobody asked.
          </p>
          <p className={`${cormorant.className} mt-14 text-4xl italic leading-tight text-accent md:text-5xl`}>
            The machine reads at scale. People make sense of it.
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
