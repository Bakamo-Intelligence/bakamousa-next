import type { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Reading Machine: Semantic Maps of Conversation",
  description:
    "The Reading Machine is Bakamo's technology for reading whole conversations. It maps language into semantic space; our analysts interpret what it shows.",
  alternates: {
    canonical: "/technology",
  },
  openGraph: pageOpenGraph(
    "/technology",
    "The Reading Machine: Semantic Maps of Conversation | Bakamo",
    "The Reading Machine is Bakamo's technology for reading whole conversations. It maps language into semantic space; our analysts interpret what it shows.",
  ),
};

const FOR_YOUR_PROJECT = [
  {
    title: "The whole conversation, not a sample.",
    body: "Every post we collect on your subject is read and placed against every other. Mainstream and outlier, the expected and the unexpected, sit in the same picture. Nothing is pre-selected because it looked interesting.",
  },
  {
    title: "No cherry-picking.",
    body: "The analyst does not decide which fragments stand for the whole. The machine lays out the terrain first; the analyst interprets it. Where the evidence is thin, the reading shows that too, rather than filling the gap with confidence. We tell you when a conversation is too small to carry a conclusion.",
  },
  {
    title: "Every finding carries its posts.",
    body: "Each narrative, tension and persona comes with its share of the conversation and the verbatims behind it. Any claim in the report can be traced back to what people actually said.",
  },
  {
    title: "The same reading, every month.",
    body: "Because the whole conversation is read the same way each time, a study can be re-read month after month in the same framework. That is what makes The Clearing possible: you see what changed, what is new and what faded, before it reaches a tracker.",
  },
  {
    title: "Speed without a smaller sample.",
    body: "A Pulse maps a whole conversation in 48 hours. A Radar delivers first learnings in a week. The depth is the analyst's; the coverage is the machine's.",
  },
];

const FOR_EACH_PRODUCT = [
  { name: "Pulse", body: "The topic map of the whole conversation, sized by share, in 48 hours." },
  { name: "Radar", body: "Every narrative counted across the full conversation, so you know how large each story is and which is growing." },
  { name: "Cast", body: "Your brand's footprint measured against competitors, including the posts that never name you." },
  { name: "Bedrock", body: "Your own strategic questions put to every post, not to a sample." },
  { name: "The Clearing", body: "The study re-read every month in the same framework, so change is visible at a glance." },
];

export default function TechnologyPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-near-black text-text-primary">
      <div className="grain-overlay" />

      <section className="px-6 pb-24 pt-32 md:pb-32 md:pt-44" data-analytics-section="technology_hero">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">
            The Reading Machine — how we read whole conversations
          </p>
          <h1
            className={`${cormorant.className} mt-6 max-w-5xl text-[clamp(3.6rem,7.5vw,7rem)] leading-[0.88] tracking-tight text-white`}
          >
            Technology is how we scale Social Truth. It is not what produces it.
          </h1>
          <div className="mt-10 h-px w-16 bg-accent" />
          <p className="mt-10 max-w-3xl text-xl font-light leading-relaxed text-text-secondary">
            The world does not lack data. It lacks the kind of reading that makes data legible.
          </p>
        </div>
      </section>

      <section className="border-t border-border-grey px-6 py-24 md:py-32" data-analytics-section="technology_reading">
        <div className="mx-auto max-w-4xl space-y-8 text-xl font-light leading-relaxed text-text-secondary">
          <p>
            Qualitative research has always had to choose. Read deeply, and you read a sample: the
            fragments someone decided were worth seeing. Read everything, and you count instead of
            read.
          </p>
          <p className="border-l border-accent pl-7 text-3xl leading-snug text-white">
            That is why we built The Reading Machine.
          </p>
          <p>
            It is the in-house technology we built so our analysts no longer have to choose. It
            lets them read the whole conversation, not a sample, and still read it as qualitative
            researchers. It does not replace the analyst. It gives them something they have never
            had before: the ability to work with the whole conversation.
          </p>
        </div>
      </section>

      <section
        className="relative overflow-hidden bg-dark-grey px-6 py-24 md:py-32"
        data-analytics-section="technology_measurable"
      >
        {/* Reading Machine map as a faded backdrop behind the intro text */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[44rem] md:left-auto md:h-[48rem] md:w-[72%]">
          <Image
            src="/media/reading-machine-semantic-map.png"
            alt="The Reading Machine mapping a whole conversation into semantic space"
            fill
            sizes="(min-width: 768px) 72vw, 100vw"
            className="object-cover object-[70%_top] opacity-25 md:opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-grey via-dark-grey/70 to-dark-grey/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-grey via-dark-grey/20 to-dark-grey/40" />
          <p className="absolute bottom-24 right-6 hidden text-[0.65rem] uppercase tracking-[0.18em] text-text-secondary md:block">
            The Reading Machine — a whole conversation mapped into semantic space
          </p>
        </div>

        <div className="relative mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">What that means for your project</p>
          <h2 className="mt-6 max-w-4xl text-4xl font-light leading-tight text-white md:text-6xl">
            Not a sample of the category. The conversation itself.
          </h2>
          <p
            className={`${cormorant.className} mt-10 max-w-4xl text-4xl italic leading-tight text-accent md:text-5xl`}
          >
            Other tools count patterns. The Reading Machine makes meaning readable.
          </p>

          <div className="mt-16">
            {FOR_YOUR_PROJECT.map((item) => (
              <article key={item.title} className="relative border-t border-border-grey py-9">
                <div className="absolute bottom-0 left-0 top-9 hidden w-px bg-border-grey md:block" />
                <div className="md:pl-10">
                  <h3 className="text-3xl font-light text-white">{item.title}</h3>
                  <p className="mt-5 max-w-3xl text-base leading-relaxed text-text-secondary">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:py-32" data-analytics-section="technology_products">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-4xl font-light leading-tight text-white md:text-6xl">
            What it does for each product.
          </h2>
          <dl className="mt-12 divide-y divide-border-grey border-y border-border-grey">
            {FOR_EACH_PRODUCT.map((item) => (
              <div key={item.name} className="grid gap-2 py-6 md:grid-cols-[11rem_1fr] md:gap-8">
                <dt className={`${cormorant.className} text-2xl leading-tight text-white`}>{item.name}</dt>
                <dd className="text-base font-light leading-relaxed text-text-secondary">{item.body}</dd>
              </div>
            ))}
          </dl>
          <Link
            href="/what-we-do"
            className="mt-10 inline-flex text-sm uppercase tracking-[0.16em] text-accent transition-colors hover:text-white"
            data-analytics-event="cta_click"
            data-analytics-label="What we do"
            data-analytics-location="technology_products"
            data-analytics-destination="/what-we-do"
          >
            The products &rarr;
          </Link>
        </div>
      </section>

      <section className="border-t border-border-grey px-6 py-24 md:py-32" data-analytics-section="technology_ai">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">Where others use AI</p>
          <h2 className="mt-6 text-4xl font-light leading-tight text-white md:text-6xl">
            We use our own.
          </h2>
          <div className="mt-10 max-w-4xl space-y-8 text-xl font-light leading-relaxed text-text-secondary">
            <p>
              The Reading Machine is Bakamo&apos;s in-house technology. It reads, files and counts.
              It does not name a narrative, does not write a sentence of interpretation, and does
              not decide what matters. Our analysts do that, and they sign it.
            </p>
            <p className="text-white">The Reading Machine gives us scale. Humans give it meaning.</p>
          </div>
          <p className="mt-14 max-w-3xl border-l border-accent pl-7 text-base leading-relaxed text-text-secondary">
            For the epistemologists: The Reading Machine is not an AI. It is a hermeneutic engine.
            Language is given a position in semantic space; things that mean similar things sit
            closer together. The machine does not decide what those relationships mean. It gives
            the analyst a visible terrain on which to interpret them.
          </p>
        </div>
      </section>

      <section className="bg-dark-grey px-6 py-24 md:py-32" data-analytics-section="technology_point">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">Which is the point</p>
          <h2
            className={`${cormorant.className} mt-6 max-w-4xl text-[clamp(2.8rem,5.5vw,5rem)] leading-[0.95] tracking-tight text-white`}
          >
            The Reading Machine is our methodology at hyperdrive.
          </h2>
          <p className="mt-10 max-w-4xl text-xl font-light leading-relaxed text-text-secondary">
            It is not a product bolted onto our research. It is an extension of the methodology
            itself — another proof point for the argument we have been making for ten years:
          </p>
          <p className="mt-10 max-w-4xl border-l border-accent pl-7 text-3xl font-light leading-snug text-white">
            The evidence you need already exists, unprompted, in the way people talk to each other.
          </p>
          <div className="mt-14 space-y-2 text-2xl font-light leading-snug text-text-secondary">
            <p>Technology lets us read more of it.</p>
            <p>Humans make sense of it.</p>
          </div>
          <p className={`${cormorant.className} mt-10 text-5xl italic text-accent md:text-6xl`}>
            Build on reality.
          </p>
        </div>
      </section>
    </main>
  );
}
