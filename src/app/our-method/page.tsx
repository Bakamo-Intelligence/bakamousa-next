import type { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";
import Link from "next/link";
import { BOOKING_HREF } from "@/lib/booking";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const TITLE = "Our Method: Discovery First, Measurement Second";
const DESCRIPTION =
  "Interviews and surveys go deep on the questions you bring. Discovery finds the ones you did not bring. It runs first, before the discussion guide and the questionnaire are written.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/our-method",
  },
  openGraph: pageOpenGraph("/our-method", `${TITLE} | Bakamo`, DESCRIPTION),
};

const PHASES = [
  {
    label: "Phase one",
    name: "Discovery",
    owner: "Ours.",
    rows: [
      {
        label: "What we do",
        text: "We collect what people say to each other about your category, over months or years, in forums, communities, reviews and comment threads. We keep reading until new sources stop adding anything new.",
      },
      {
        label: "What we look for",
        text: "Where the conversation differs from the assumptions in your brief. A group you had not counted. A meaning the category does not use. A word people use that your questionnaire does not.",
      },
      {
        label: "What you receive",
        text: "The Question Set. It holds what we found, the vocabulary people use, and the questions it raises for your qualitative and quantitative work.",
      },
    ],
  },
  {
    label: "Phase two",
    name: "Measurement",
    owner: "Yours, your agency's or ours.",
    rows: [
      { label: "What happens", text: "The questions go into interviews, a survey or a tracker." },
      {
        label: "What it adds",
        text: "Size, proportion and behaviour, which reading conversation cannot give.",
      },
      {
        label: "Who does it",
        text: "Your insight team, your research agency, or Bakamo's own quantitative team.",
      },
    ],
  },
];

const KINDS = ["Discovery (Bakamo)", "Interviews and groups", "Survey"];

const COMPARISON = [
  {
    label: "Starts from",
    cells: ["What people already say to each other", "Your discussion guide", "Your questionnaire"],
  },
  {
    label: "Best at",
    cells: ["Finding what nobody asked about", "Depth on a question you bring", "Size and proportion"],
  },
  {
    label: "Cannot",
    cells: [
      "Size it, or test what does not exist yet",
      "Return a topic the guide did not open",
      "Return an answer you did not list",
    ],
  },
  { label: "You leave with", cells: ["Questions", "Explanations", "Numbers"] },
];

const SOURCES = [
  {
    name: "Charles S. Peirce",
    idea: "abduction",
    text: "You meet a surprising fact and reason to the explanation that would make it unsurprising. Peirce held that this is the step that brings in a new idea.",
  },
  {
    name: "John Tukey",
    idea: "exploratory analysis",
    text: "Look at the material before you hold a hypothesis, to see what is there.",
  },
  {
    name: "Glaser and Strauss",
    idea: "grounded theory",
    text: "Categories come out of the material. They are not set in advance.",
  },
  {
    name: "Kenneth Pike",
    idea: "emic and etic",
    text: "The categories people use themselves differ from the researcher's. We report the first kind.",
  },
  {
    name: "Hans-Georg Gadamer",
    idea: "hermeneutics",
    text: "Reading is interpretation, and interpretation needs a trained reader.",
  },
  {
    name: "Niklas Luhmann",
    idea: "systems theory",
    text: "Meaning forms in communication between people, so that is where we read.",
  },
];

const OPTIONS = [
  {
    label: "Option A",
    name: "Discovery for your study",
    text: "We deliver the Question Set. Your team or your agency runs the interviews and the survey.",
  },
  {
    label: "Option B",
    name: "Discovery and survey",
    text: "We deliver the Question Set, then build and field the survey and report the results.",
  },
];

const H2 = "text-4xl font-light leading-tight text-white md:text-6xl";
const EYEBROW = "text-xs uppercase tracking-[0.2em] text-accent";

export default function OurMethodPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-near-black text-text-primary">
      <div className="grain-overlay" />

      <section className="px-6 pb-24 pt-32 md:pb-32 md:pt-44" data-analytics-section="method_hero">
        <div className="mx-auto max-w-6xl">
          <p className={EYEBROW}>Discovery first. Measurement second.</p>
          <h1
            className={`${cormorant.className} mt-6 max-w-5xl text-[clamp(3.2rem,7vw,6.5rem)] leading-[0.9] tracking-tight text-white`}
          >
            A study is only as good as the questions it starts from.
          </h1>
          <div className="mt-10 h-px w-16 bg-accent" />
          <p className="mt-10 max-w-3xl text-xl font-light leading-relaxed text-text-secondary">
            Interviews and surveys go deep on the questions you bring. Discovery finds the ones you
            did not bring. It runs first, before the discussion guide and the questionnaire are
            written.
          </p>
        </div>
      </section>

      {/* Two phases */}
      <section className="bg-dark-grey px-6 py-24 md:py-32" data-analytics-section="method_phases">
        <div className="mx-auto max-w-6xl">
          <h2 className={H2}>Two phases.</h2>
          <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-0 lg:divide-x lg:divide-border-grey">
            {PHASES.map((phase, index) => (
              <article key={phase.name} className={index === 0 ? "lg:pr-14" : "lg:pl-14"}>
                <p className={EYEBROW}>{phase.label}</p>
                <h3 className={`${cormorant.className} mt-4 text-5xl leading-none text-white`}>
                  {phase.name}
                </h3>
                <p className="mt-3 text-lg font-light text-text-secondary">{phase.owner}</p>
                <dl className="mt-8 border-t border-accent/60">
                  {phase.rows.map((row) => (
                    <div key={row.label} className="border-b border-border-grey py-6">
                      <dt className="text-[11px] uppercase tracking-[0.18em] text-accent">{row.label}</dt>
                      <dd className="mt-3 text-lg font-light leading-relaxed text-white">{row.text}</dd>
                    </div>
                  ))}
                </dl>
              </article>
            ))}
          </div>
          <p className="mt-14 max-w-4xl border-l border-accent pl-7 text-xl font-light leading-relaxed text-text-secondary">
            Researchers call this an exploratory sequential design: qualitative discovery builds
            the instrument, and quantitative work measures. What we change is the material for the
            first phase.
          </p>
        </div>
      </section>

      {/* What each kind of research is for */}
      <section className="border-t border-border-grey px-6 py-24 md:py-32" data-analytics-section="method_comparison">
        <div className="mx-auto max-w-6xl">
          <h2 className={H2}>What each kind of research is for.</h2>
          <div className="mt-14 overflow-x-auto">
            <table className="w-full min-w-[44rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-accent/60">
                  <th className="w-40 py-5" />
                  {KINDS.map((kind, index) => (
                    <th
                      key={kind}
                      scope="col"
                      className={`${cormorant.className} py-5 pr-6 text-2xl font-normal leading-tight md:text-3xl ${
                        index === 0 ? "text-accent" : "text-white"
                      }`}
                    >
                      {kind}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.label} className="border-b border-border-grey align-top">
                    <th
                      scope="row"
                      className="py-6 pr-6 text-[11px] font-normal uppercase tracking-[0.18em] text-accent"
                    >
                      {row.label}
                    </th>
                    {row.cells.map((cell, index) => (
                      <td
                        key={cell}
                        className={`py-6 pr-6 text-lg font-light leading-snug ${
                          index === 0 ? "text-white" : "text-text-secondary"
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Where the method comes from */}
      <section className="bg-dark-grey px-6 py-24 md:py-32" data-analytics-section="method_sources">
        <div className="mx-auto max-w-5xl">
          <h2 className={H2}>Where the method comes from.</h2>
          <p className="mt-10 max-w-3xl text-xl font-light leading-relaxed text-text-secondary">
            Finding and testing are different jobs, and research has long treated them separately.
            Our method belongs to the finding side.
          </p>
          <dl className="mt-14 divide-y divide-border-grey border-y border-border-grey">
            {SOURCES.map((source) => (
              <div key={source.name} className="grid gap-3 py-7 md:grid-cols-[18rem_1fr] md:gap-10">
                <dt>
                  <span className={`${cormorant.className} block text-2xl leading-tight text-white`}>
                    {source.name}
                  </span>
                  <span className="mt-1 block text-[11px] uppercase tracking-[0.18em] text-accent">
                    {source.idea}
                  </span>
                </dt>
                <dd className="text-lg font-light leading-relaxed text-text-secondary">{source.text}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-14 max-w-4xl border-l border-accent pl-7 text-xl font-light leading-relaxed text-white">
            Medicine works the same way. A clinical trial measures the effects its designers chose
            in advance. Effects nobody anticipated are found later, in reports from doctors and
            patients, and then go back into a study.
          </p>
        </div>
      </section>

      {/* Two ways to work with us */}
      <section className="border-t border-border-grey px-6 py-24 md:py-32" data-analytics-section="method_cta">
        <div className="mx-auto max-w-6xl">
          <h2 className={H2}>Two ways to work with us.</h2>
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {OPTIONS.map((option) => (
              <article key={option.name} className="rounded-[2rem] border border-white/10 bg-dark-grey p-8 md:p-10">
                <p className={EYEBROW}>{option.label}</p>
                <h3 className={`${cormorant.className} mt-4 text-4xl leading-tight text-white`}>
                  {option.name}
                </h3>
                <p className="mt-6 text-lg font-light leading-relaxed text-text-secondary">{option.text}</p>
              </article>
            ))}
          </div>
          <Link
            href={BOOKING_HREF}
            className="cta-button mt-14 text-sm"
            data-analytics-event="book_demo_click"
            data-analytics-label="Start with the study you are planning"
            data-analytics-location="method_cta"
            data-analytics-destination={BOOKING_HREF}
          >
            Start with the study you are planning
          </Link>
        </div>
      </section>
    </main>
  );
}
