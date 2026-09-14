import type { Metadata } from "next";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import { SocialTheory } from "@/components/social-theory/SocialTheory";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Our Method",
  description: "How Bakamo makes Social Truth through discovery first and measurement second.",
  alternates: {
    canonical: "/our-method",
  },
  openGraph: {
    title: "Our Method | Bakamo",
    description: "How Bakamo makes Social Truth through discovery first and measurement second.",
  },
};

const ENGAGEMENTS = [
  {
    title: "The Full Social Truth Study.",
    body: "End-to-end engagement, Discovery through Measurement, led by the Bakamo team.",
  },
  {
    title: "Better Surveys for Your Team.",
    body: "Discovery phase only, delivered as an instrument-design input for your in-house or agency quant work.",
  },
];

export default function OurMethodPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-near-black text-text-primary">
      <div className="grain-overlay" />

      <section className="px-6 pb-24 pt-32 md:pb-32 md:pt-44">
        <div className="mx-auto max-w-6xl">
          <h1
            className={`${cormorant.className} max-w-5xl text-[clamp(4rem,8vw,7.5rem)] leading-[0.86] tracking-tight text-white`}
          >
            How Social Truth Is Made.
          </h1>
          <p className="mt-10 max-w-3xl text-xl font-light leading-relaxed text-text-secondary">
            Every Bakamo engagement runs in two phases. The first phase reads reality. The second
            phase measures it. Below: how the work is done.
          </p>
        </div>
      </section>

      <section className="border-t border-border-grey px-6 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-4xl font-light leading-tight text-white md:text-6xl">
            Discovery first. Measurement second.
          </h2>
          <div className="mt-12 max-w-4xl space-y-7 text-xl font-light leading-relaxed text-text-secondary">
            <p>
              Most quantitative studies are preceded by qualitative work - focus groups, depth
              interviews, ethnographies. The intent is right: understand before you measure. The
              execution carries the same blind spot the survey will inherit. Whoever wrote the
              discussion guide, recruited the participants, and moderated the room was operating
              inside the brief. The participants knew they were in a study. Someone was paying them
              to talk. A researcher was in the room.
            </p>
            <p>
              The result is qualitative material shaped by the same assumptions the survey is about
              to encode. The constructs to explore were chosen in advance. The recruit was built
              around hypotheses the team already held. The conversation happened on the
              industry&apos;s terms, not the consumer&apos;s. Useful, often. Sufficient, rarely.
            </p>
            <p>
              We reverse the order differently. Before any question is written and before any
              participant is recruited, we read what the category is already saying - in places
              where no brand is present, no question has been asked, and no consumer is performing
              for a researcher. The discovery phase tells us what the survey should measure. The
              survey then measures it.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-dark-grey px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl font-light leading-tight text-white md:text-6xl">
            The two phases.
          </h2>
          <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:divide-x lg:divide-border-grey">
            <article>
              <p className="text-xs uppercase tracking-[0.2em] text-accent">Phase One</p>
              <h3 className="mt-4 text-3xl font-light text-white">Discovery</h3>
              <div className="mt-8 space-y-6 text-base leading-relaxed text-text-secondary">
                <p>
                  We identify the platforms, communities, and conversations where the category
                  actually lives. Reddit threads, patient forums, TikTok comment sections, YouTube
                  discussions, niche Discord servers, professional communities. We collect
                  unprompted discourse to the point of qualitative saturation - when new sources
                  stop producing new patterns.
                </p>
                <p>
                  Human analysts read the material. AI assists with pattern recognition, language
                  clustering, and surfacing volume. Interpretation stays with the researcher. We map
                  the constructs consumers actually use, the tensions they carry, the decision
                  drivers that organize their behavior, the language they reach for, and the things
                  the conversation has already stopped debating.
                </p>
                <p>
                  The output of Phase One is an architecture: the variables, constructs, segments,
                  and vocabulary that the survey should be built around. We compare this
                  architecture against the original brief and assumptions. The gap between them is
                  where the most important findings already are.
                </p>
              </div>
            </article>

            <article className="lg:pl-14">
              <p className="text-xs uppercase tracking-[0.2em] text-accent">Phase Two</p>
              <h3 className="mt-4 text-3xl font-light text-white">Measurement</h3>
              <div className="mt-8 space-y-6 text-base leading-relaxed text-text-secondary">
                <p>
                  The survey instrument is built from the Phase One architecture. Constructs reflect
                  how consumers actually organize the category. Question wording mirrors consumer
                  language. Variables include the ones discovery surfaced and exclude the ones
                  discovery showed were absent from the conversation.
                </p>
                <p>
                  The survey is fielded against the appropriate consumer audience. Analysis is
                  conducted with the discovery architecture in mind - so the quantitative findings
                  are interpreted against the qualitative reality that produced the instrument.
                </p>
                <p>
                  The output of Phase Two is a complete quantitative study: validated, statistically
                  robust, and grounded in what consumers actually live - not what the industry
                  assumed they live.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-4xl font-light leading-tight text-white md:text-6xl">
            The deliverables.
          </h2>
          <p className="mt-10 max-w-4xl text-xl font-light leading-relaxed text-text-secondary">
            A complete written report. A presentation to your team. The discovery architecture
            document, which functions as a strategic asset in its own right. The full quantitative
            dataset with cuts you can return to. Sandra is available for follow-up sessions as
            findings are interpreted into action.
          </p>

          <h3 className="mt-20 text-3xl font-light text-white">Two ways to engage.</h3>
          <div className="mt-10 grid gap-10 md:grid-cols-2 md:divide-x md:divide-border-grey">
            {ENGAGEMENTS.map((engagement, index) => (
              <article key={engagement.title} className={index === 1 ? "md:pl-10" : ""}>
                <h4 className="text-2xl font-light text-white">{engagement.title}</h4>
                <p className="mt-5 text-base leading-relaxed text-text-secondary">
                  {engagement.body}
                </p>
              </article>
            ))}
          </div>
          <Link
            href="/#atlas"
            className="mt-14 inline-flex text-sm uppercase tracking-[0.16em] text-accent transition-colors hover:text-white"
            data-analytics-event="cta_click"
            data-analytics-label="See the Atlas of Social Truths"
            data-analytics-location="method_deliverables"
            data-analytics-destination="/#atlas"
          >
            See the Atlas of Social Truths &rarr;
          </Link>
        </div>
      </section>

      <SocialTheory headingClassName={cormorant.className} />

      <section className="border-t border-border-grey px-6 py-28 text-center md:py-36">
        <div className="mx-auto max-w-4xl">
          <h2 className={`${cormorant.className} text-5xl leading-none text-white md:text-7xl`}>
            Build your next study on reality.
          </h2>
          <Link
            href="/contact"
            className="cta-button mt-10 text-sm"
            data-analytics-event="cta_click"
            data-analytics-label="Start the conversation"
            data-analytics-location="method_cta"
            data-analytics-destination="/contact"
          >
            Start the conversation
          </Link>
        </div>
      </section>
    </main>
  );
}
