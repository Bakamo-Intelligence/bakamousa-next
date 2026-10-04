import { Cormorant_Garamond } from "next/font/google";
import Link from "next/link";
import AtlasPlates from "@/components/AtlasPlates";
import { BOOKING_HREF } from "@/lib/booking";
import { ACTIVE_ATLAS_CASES } from "@/lib/atlas";
import { SECTORS, type Sector } from "@/lib/sectors";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const ENGAGEMENTS: Array<{ name: string; detail: string }> = [
  {
    name: "The Full Social Truth Study",
    detail:
      "Discovery through measurement, led by the Bakamo team. A written report, a presentation to your team, the discovery architecture and the full quantitative dataset.",
  },
  {
    name: "Better Surveys for Your Team",
    detail:
      "The discovery phase only, delivered as an instrument-design input for your in-house or agency quant work.",
  },
];

export default function SectorPage({ sector }: { sector: Sector }) {
  const location = `sector_${sector.id}`;
  const otherSectors = SECTORS.filter((s) => s.id !== sector.id);
  const hasAtlasCases = ACTIVE_ATLAS_CASES.some((c) => c.sector === sector.id);

  return (
    <main className="relative w-full min-h-screen bg-near-black text-text-primary overflow-x-hidden pb-24">
      <div className="grain-overlay" />

      {/* Hero */}
      <section
        className="relative pt-32 md:pt-44 pb-16 px-6"
        data-analytics-section={`${location}_hero`}
        data-analytics-label={`${sector.label} Hero`}
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-accent uppercase tracking-[0.2em] text-sm mb-8">{sector.label}</p>
          <h1
            className={`${cormorant.className} text-[clamp(2.4rem,5.5vw,4.4rem)] leading-[1.02] tracking-tight text-white`}
          >
            {sector.heading}
          </h1>
          <p className={`${cormorant.className} mt-6 text-2xl italic leading-snug text-text-secondary md:text-3xl`}>
            {sector.standfirst}
          </p>
          <div className="w-16 h-px bg-accent mt-10 mb-10" />
          <div className="space-y-5 text-lg font-light leading-relaxed text-text-secondary">
            {sector.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Questions */}
      <section
        className="px-6 py-16"
        data-analytics-section={`${location}_questions`}
        data-analytics-label="Questions"
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4">Where we start</p>
          <h2 className={`${cormorant.className} text-3xl md:text-4xl font-light text-white mb-10 leading-tight`}>
            Questions we are brought
          </h2>
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {sector.questions.map((question) => (
              <li key={question} className={`${cormorant.className} py-5 text-xl leading-snug text-white md:text-2xl`}>
                {question}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-base font-light leading-relaxed text-text-secondary">
            Human analysts read the material. The Reading Machine holds the whole conversation at
            once, so nothing is left out because it did not look interesting. Interpretation stays
            with the researcher.{" "}
            <Link href="/our-method" className="text-accent hover:underline underline-offset-4">
              How the work is done
            </Link>
          </p>
        </div>
      </section>

      {/* Atlas */}
      <section
        className="px-6 py-16 bg-dark-grey/70"
        data-analytics-section={`${location}_atlas`}
        data-analytics-label="Atlas Cases"
      >
        <div className="max-w-6xl mx-auto">
          <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4">
            {hasAtlasCases ? "From the Atlas of Social Truths" : "Our research"}
          </p>
          <h2 className={`${cormorant.className} text-3xl md:text-4xl font-light text-white leading-tight`}>
            What we found when we listened
          </h2>
          {hasAtlasCases ? <AtlasPlates sector={sector.id} /> : null}
          {sector.studies ? (
            <div className={hasAtlasCases ? "mt-4 border-t border-border-grey pt-10" : "mt-10"}>
              <p className="text-xs uppercase tracking-[0.2em] text-accent">Public studies</p>
              <ul className="mt-5 space-y-3">
                {sector.studies.map((study) => (
                  <li key={study.href}>
                    <Link
                      href={study.href}
                      className={`${cormorant.className} text-xl text-white hover:text-accent transition-colors`}
                    >
                      {study.title} &rarr;
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </section>

      {/* Engagements */}
      <section
        className="px-6 py-16"
        data-analytics-section={`${location}_engagements`}
        data-analytics-label="Ways to Work"
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4">Two ways to work with us</p>
          <dl className="divide-y divide-white/10 border-y border-white/10">
            {ENGAGEMENTS.map((engagement) => (
              <div key={engagement.name} className="grid gap-2 py-6 md:grid-cols-[16rem_1fr] md:gap-8">
                <dt className={`${cormorant.className} text-2xl leading-tight text-white`}>{engagement.name}</dt>
                <dd className="text-base font-light leading-relaxed text-text-secondary">{engagement.detail}</dd>
              </div>
            ))}
          </dl>
          {sector.clients ? (
            <p className="mt-8 text-sm font-light leading-relaxed text-text-muted">
              Among those we have worked with: {sector.clients.join(", ")}.
            </p>
          ) : null}

          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href={BOOKING_HREF}
              className="cta-button text-sm"
              data-analytics-event="book_demo_click"
              data-analytics-label="Book a demo"
              data-analytics-location={`${location}_cta`}
              data-analytics-destination={BOOKING_HREF}
            >
              Book a demo
            </Link>
            {otherSectors.map((other) => (
              <Link
                key={other.id}
                href={other.path}
                className="text-sm uppercase tracking-[0.16em] text-text-muted transition-colors hover:text-white"
              >
                {other.label} &rarr;
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
