import type { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";
import Image from "next/image";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Technology",
  description:
    "Technology is how Bakamo scales Social Truth. It is not what produces it. The Reading Machine makes meaning readable.",
  alternates: {
    canonical: "/technology",
  },
  openGraph: pageOpenGraph(
    "/technology",
    "Technology | Bakamo",
    "Technology is how Bakamo scales Social Truth. It is not what produces it. The Reading Machine makes meaning readable.",
  ),
};

const PRINCIPLES = [
  {
    title: "It removes cherry-picking.",
    paragraphs: [
      "The analyst does not decide which fragments are worth seeing. The machine exposes the terrain first. Mainstream and outlier, expected and unexpected, are held in the same semantic environment. Where the evidence is thin, the reading can show that too — rather than filling the gap with confidence.",
    ],
  },
  {
    title: "It makes qualitative interpretation auditable.",
    paragraphs: [
      "Language is given a position in semantic space. Things that mean similar things sit closer together; things that mean different things move apart. The machine does not decide what those relationships mean. It gives the analyst a visible terrain on which to interpret them.",
    ],
  },
  {
    title: "It frees qualitative research to interpret.",
    paragraphs: [
      "Much of qualitative work has always gone into staking out the field: deciding where to look, what to collect, which fragments stand for the whole. That groundwork no longer has to be done by hand. The terrain is mapped before the reading begins, so the analyst's attention goes where it matters most — to interpretation.",
    ],
  },
];

export default function TechnologyPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-near-black text-text-primary">
      <div className="grain-overlay" />

      <section className="px-6 pb-24 pt-32 md:pb-32 md:pt-44" data-analytics-section="technology_hero">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">Technology</p>
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
            Qualitative insight is hard work. Understanding what people say, think and do without
            asking them is harder. Interpreting real conversation — language people chose for each
            other, not for a researcher — is harder still.
          </p>
          <p>
            Our job is to uncover the implicit. To find what is being said without being explicitly
            said. To recover the meanings people actually give to things from the fragments we
            captured.
          </p>
          <p>
            No technology, until further notice, can emulate that human complexity. At the heart of
            our work are still smart human beings reading, thinking and making sense of what they
            see.
          </p>
          <p className="border-l border-accent pl-7 text-3xl leading-snug text-white">
            That is why we built The Reading Machine.
          </p>
          <p>
            It is technology designed around what our analysts are good at: reading and thinking. It
            does not replace the analyst. It gives them something they have never had before: the
            ability to work with the whole conversation.
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
          <h2 className="max-w-4xl text-4xl font-light leading-tight text-white md:text-6xl">
            We made the qualitative universe measurable
          </h2>
          <p
            className={`${cormorant.className} mt-10 max-w-4xl text-4xl italic leading-tight text-accent md:text-5xl`}
          >
            Other tools count patterns. The Reading Machine makes meaning readable.
          </p>
          <p className="mt-10 max-w-2xl text-xl font-light leading-relaxed text-white/80">
            Vector technology means the entire corpus can be mapped into a semantic space rather
            than reduced to a sample. Nothing needs to be pre-selected because it looks interesting.
            The analyst can work across the whole conversation and move from its centre to its
            edges, from dominant meanings to the outliers.
          </p>
          <p className="mt-8 max-w-2xl text-2xl font-light leading-snug text-white">
            That changes the epistemology of qualitative research.
          </p>

          <div className="mt-16">
            {PRINCIPLES.map((principle) => (
              <article
                key={principle.title}
                className="relative border-t border-border-grey py-9"
              >
                <div className="absolute bottom-0 left-0 top-9 hidden w-px bg-border-grey md:block" />
                <div className="md:pl-10">
                  <h3 className="text-3xl font-light text-white">{principle.title}</h3>
                  {principle.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      className="mt-5 max-w-3xl text-base leading-relaxed text-text-secondary"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:py-32" data-analytics-section="technology_whole_room">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-4xl font-light leading-tight text-white md:text-6xl">
            We see the whole room.
          </h2>
          <p className="mt-6 text-2xl font-light leading-snug text-accent">
            Not a sample of the category. The conversation itself.
          </p>
          <div className="mt-10 max-w-4xl space-y-8 text-xl font-light leading-relaxed text-text-secondary">
            <p>
              Every voice can be understood in relation to every other: from the centre of the
              discourse to its margins; from the people setting the norm to those resisting it; from
              emerging meanings to established ones.
            </p>
            <p>
              That is where the interesting things happen. Who is moving towards whom? Who is
              policing a boundary? Who is quietly establishing the standard everyone else is
              responding to?
            </p>
            <p className="text-white">
              The interpretation remains human. It just no longer has to carry the entire burden of
              coverage.
            </p>
          </div>
          <p className="mt-14 max-w-3xl border-l border-accent pl-7 text-base leading-relaxed text-text-secondary">
            For the epistemologists: The Reading Machine is not an AI. It is a hermeneutic engine.
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
