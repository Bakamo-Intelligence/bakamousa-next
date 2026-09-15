import type { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";
import { Cormorant_Garamond } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Migration Research: Narratives Across Europe",
  description:
    "A decade of Bakamo’s work reading how Europeans talk about migration: narrative studies and country deep dives for foundations and policy institutions.",
  alternates: {
    canonical: "/migration",
  },
  openGraph: pageOpenGraph(
    "/migration",
    "Migration Research: Narratives Across Europe | Bakamo",
    "A decade of Bakamo’s work reading how Europeans talk about migration: narrative studies and country deep dives for foundations and policy institutions.",
  ),
};

const FES_PDF = "/media/FES_Final%20Report_FINAL%20VERSION.pdf";
const OSF_PDF = "/media/Hungarian%20Refugee%20Perception.pdf";

function DownloadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

export default function MigrationPage() {
  return (
    <main className="relative w-full min-h-screen bg-near-black text-text-primary overflow-x-hidden pb-24">
      <div className="grain-overlay" />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] overflow-hidden">
        <div
          className="absolute left-[-4rem] top-24 h-64 w-64 rounded-full blur-3xl"
          style={{ background: "rgba(201,169,110,0.1)" }}
        />
        <div
          className="absolute right-[-6rem] top-16 h-80 w-80 rounded-full blur-3xl"
          style={{ background: "rgba(26,53,80,0.25)" }}
        />
      </div>

      {/* Hero */}
      <section
        className="relative pt-32 md:pt-44 pb-20 px-6"
        data-analytics-section="migration_hero"
        data-analytics-label="Migration Hero"
      >
        <div className="max-w-4xl mx-auto">
          <span className="text-xs uppercase tracking-[0.22em] text-accent border border-accent/30 rounded-full px-4 py-1 inline-block mb-8">
            The Research
          </span>

          <p className="text-accent uppercase tracking-[0.2em] text-sm mb-6">
            A Decade of Migration Research
          </p>

          <h1
            className={`${cormorant.className} text-[clamp(2.4rem,5.5vw,4.8rem)] leading-[1.02] tracking-tight text-white`}
          >
            Reading Europe&rsquo;s Mind on Migration
          </h1>

          <div className="w-16 h-px bg-accent mt-10 mb-10" />

          <p className="text-lg font-light leading-relaxed text-text-secondary max-w-3xl">
            Migration is the most-polled and least-understood issue in European politics. Surveys
            capture positions; they miss the stories underneath &mdash; what people tell each other
            when no pollster is listening. For nearly a decade, Bakamo has been reading those
            conversations at scale, for foundations and institutions that need to understand the
            debate before they try to shape it.
          </p>
        </div>
      </section>

      {/* Narrative-not-opinion section */}
      <section
        className="px-6 pb-20"
        data-analytics-section="migration_intro"
        data-analytics-label="Narrative Not Opinion"
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4">Our Approach</p>
          <h2
            className={`${cormorant.className} text-3xl md:text-4xl font-light text-white mb-8 leading-tight`}
          >
            Narrative, not opinion.
          </h2>
          <div className="space-y-5 text-base font-light leading-relaxed text-text-secondary">
            <p>
              Polling tells you <em>how many</em> agree. We tell you <em>why</em> &mdash; and what
              story moves people from one position to another. Our migration work maps the
              unprompted conversation across public social media in the languages people actually
              speak, then translates it into narratives decision-makers can act on.
            </p>
            <p className="text-text-primary">
              The studies below span pan-European narrative mapping, country-level crisis
              monitoring, and confidential work for governments and advocacy institutions.
            </p>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Studies */}
      <section
        className="px-6 py-20"
        data-analytics-section="migration_studies"
        data-analytics-label="Migration Studies"
      >
        <div className="max-w-5xl mx-auto">
          <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4">The Studies</p>
          <h2
            className={`${cormorant.className} text-3xl md:text-5xl font-light text-white mb-16 leading-tight max-w-3xl`}
          >
            Selected migration research.
          </h2>

          {/* Card 1 — OSF (Hungarian Refugee Perception) */}
          <article
            className="rounded-[2rem] border border-white/10 overflow-hidden mb-8"
            style={{
              background:
                "linear-gradient(160deg, rgba(26,53,80,0.22), rgba(20,20,20,0.94) 40%, rgba(10,10,10,0.98))",
            }}
            data-analytics-section="migration_study_osf"
            data-analytics-label="OSF Study"
          >
            <div className="p-8 md:p-12">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="text-[10px] uppercase tracking-[0.18em] bg-accent text-black px-3 py-1 rounded-full font-semibold">
                  Public Report
                </span>
                <span className="text-xs uppercase tracking-[0.14em] text-text-muted">
                  Open Society Foundation &middot; Hungary &middot; 2015
                </span>
              </div>

              <h3
                className={`${cormorant.className} text-2xl md:text-3xl font-light text-white leading-tight mb-6`}
              >
                Refugees in Hungarian Social Media
              </h3>

              <div className="space-y-4 text-base font-light leading-relaxed text-text-secondary max-w-3xl">
                <p>
                  At the height of the 2015 refugee crisis, the Open Society Foundation
                  commissioned Bakamo to analyze how the situation was being discussed by
                  Hungarians on social media &mdash; and, critically, how government communication
                  was reshaping that conversation in real time.
                </p>
                <p>
                  The study mapped the main topics and triggers of the Hungarian online debate,
                  tracked the penetration of official campaign messages through buzzword analysis,
                  and identified the associations citizens were actually forming around the
                  government&rsquo;s framing.
                </p>
              </div>

              {/* ESOMAR Congress 2016 reference */}
              <div
                className="mt-10 rounded-2xl border border-accent/20 p-6"
                style={{
                  background:
                    "linear-gradient(145deg, rgba(201,169,110,0.08), rgba(10,10,10,0.4))",
                }}
              >
                <p className="text-[10px] uppercase tracking-[0.2em] text-accent mb-3">
                  Presented at ESOMAR Congress 2016 &middot; New Orleans
                </p>
                <p
                  className={`${cormorant.className} italic text-xl text-white leading-snug mb-3`}
                >
                  &ldquo;Kicking Refugees Was Just the Beginning&rdquo;
                </p>
                <p className="text-sm font-light leading-relaxed text-text-secondary">
                  The findings were presented to the global research community at the ESOMAR
                  Congress 2016 in New Orleans in a joint session by{" "}
                  <span className="text-white">Daniel Fazekas</span> (Bakamo) and{" "}
                  <span className="text-white">Balazs Denes</span> (Open Society Foundation).
                </p>
              </div>

              <div className="mt-8">
                <a
                  href={OSF_PDF}
                  download
                  className="cta-button text-sm inline-flex items-center gap-3"
                  data-analytics-event="cta_click"
                  data-analytics-label="Download OSF Report"
                  data-analytics-location="migration_study_osf"
                >
                  <DownloadIcon />
                  Download Full Report (PDF)
                </a>
              </div>
            </div>
          </article>

          {/* Card 2 — FES */}
          <article
            className="rounded-[2rem] border border-white/10 overflow-hidden mb-8"
            style={{
              background:
                "linear-gradient(160deg, rgba(26,53,80,0.22), rgba(20,20,20,0.94) 40%, rgba(10,10,10,0.98))",
            }}
            data-analytics-section="migration_study_fes"
            data-analytics-label="FES Study"
          >
            <div className="p-8 md:p-12">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="text-[10px] uppercase tracking-[0.18em] bg-accent text-black px-3 py-1 rounded-full font-semibold">
                  Public Report
                </span>
                <span className="text-xs uppercase tracking-[0.14em] text-text-muted">
                  Friedrich&#8209;Ebert&#8209;Stiftung &middot; 28 EU Member States &middot; 2019
                </span>
              </div>

              <h3
                className={`${cormorant.className} text-2xl md:text-3xl font-light text-white leading-tight mb-6`}
              >
                Migration Narratives in Europe
              </h3>

              <div className="space-y-4 text-base font-light leading-relaxed text-text-secondary max-w-3xl">
                <p>
                  Commissioned by Friedrich-Ebert-Stiftung&rsquo;s &ldquo;Flight, Migration,
                  Integration in Europe&rdquo; programme, this is the largest pan-European
                  listening study of migration discourse ever produced. Bakamo Public analyzed the
                  unprompted conversation across 28 EU member states and identified the narrative
                  frames that cross every border &mdash; security, identity, economy and
                  demographics, humanitarianism, and the political-establishment frame &mdash; then
                  mapped how their relative weight shifts country by country.
                </p>
                <p>
                  Delivered as 28 national reports and a European synthesis.
                </p>
              </div>

              <div className="mt-8">
                <a
                  href={FES_PDF}
                  download
                  className="cta-button text-sm inline-flex items-center gap-3"
                  data-analytics-event="cta_click"
                  data-analytics-label="Download FES Report"
                  data-analytics-location="migration_study_fes"
                >
                  <DownloadIcon />
                  Download Full Report (PDF)
                </a>
              </div>
            </div>
          </article>

          {/* Card 3 — ICPA (confidential) */}
          <article
            className="rounded-[2rem] border border-white/10 overflow-hidden"
            style={{
              background:
                "linear-gradient(160deg, rgba(201,169,110,0.08), rgba(20,20,20,0.94) 40%, rgba(10,10,10,0.98))",
            }}
            data-analytics-section="migration_study_icpa"
            data-analytics-label="ICPA Study"
          >
            <div className="p-8 md:p-12">
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="text-[10px] uppercase tracking-[0.18em] bg-white/15 text-white border border-white/25 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                  <LockIcon />
                  Confidential
                </span>
                <span className="text-xs uppercase tracking-[0.14em] text-text-muted">
                  International Centre for Policy Advocacy &middot; Germany &middot; 2020&ndash;2021
                </span>
              </div>

              <h3
                className={`${cormorant.className} text-2xl md:text-3xl font-light text-white leading-tight mb-6`}
              >
                Islam &amp; Migration Integration in Germany
              </h3>

              <div className="space-y-4 text-base font-light leading-relaxed text-text-secondary max-w-3xl">
                <p>
                  A two-wave commissioned study for the International Centre for Policy Advocacy
                  examining how the public debate around Islam, migration, and integration was
                  unfolding in Germany &mdash; mapping the stakeholders, the main and sub-narratives,
                  and the values driving each camp&rsquo;s framing.
                </p>
                <p className="text-text-muted text-sm">
                  Findings delivered directly to the client under confidentiality.
                </p>
              </div>

              {/* ICPA logo */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-[10px] uppercase tracking-[0.18em] text-text-muted mb-4">
                  Commissioning Partner
                </p>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 inline-block">
                  <Image
                    src="/media/icpa_logo.png"
                    alt="International Centre for Policy Advocacy (ICPA) logo"
                    width={320}
                    height={61}
                    className="h-auto w-auto max-w-[320px]"
                  />
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      <div className="section-divider" />

      {/* Methodology */}
      <section
        className="px-6 py-20 bg-dark-grey/70"
        data-analytics-section="migration_methodology"
        data-analytics-label="Methodology"
      >
        <div className="max-w-3xl mx-auto">
          <p className="text-accent uppercase tracking-[0.2em] text-sm mb-4">Methodology</p>
          <h2
            className={`${cormorant.className} text-3xl md:text-4xl font-light text-white mb-8 leading-tight`}
          >
            How the research is built
          </h2>
          <div className="space-y-5 text-base font-light leading-relaxed text-text-secondary">
            <p>
              Every Bakamo migration study combines three layers: large-scale ingestion of public
              social conversation in-language, anthropological coding that separates genuine
              narrative from bots and campaign artifacts, and statistical calibration that keeps
              the output representative of the population, not the platform.
            </p>
            <p className="text-text-primary">
              It&rsquo;s what we call <em>Fixed Quant</em> &mdash; reality in, defensible data out.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="px-6 py-24"
        data-analytics-section="migration_cta"
        data-analytics-label="Migration CTA"
      >
        <div
          className="max-w-5xl mx-auto rounded-[2rem] border border-accent/20 p-8 md:p-14"
          style={{
            background:
              "linear-gradient(145deg, rgba(201,169,110,0.12), rgba(20,20,20,0.94) 36%, rgba(10,10,10,1))",
          }}
        >
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-accent mb-4">
                Working on a migration brief?
              </p>
              <h2
                className={`${cormorant.className} text-3xl md:text-4xl font-light text-white leading-tight`}
              >
                Let&rsquo;s talk about what the conversation is really saying.
              </h2>
              <p className="mt-6 text-base font-light leading-relaxed text-text-secondary">
                Bakamo has built dedicated methodologies for migration, integration, and refugee
                discourse across Europe. Whether you&rsquo;re producing policy, shaping
                communication, or funding research, we can help you understand the debate before
                you try to shape it.
              </p>
            </div>
            <div className="space-y-4">
              <Link
                href="/contact"
                className="cta-button text-sm w-full text-center block"
                data-analytics-event="cta_click"
                data-analytics-label="Contact Bakamo"
                data-analytics-location="migration_cta"
                data-analytics-destination="/contact"
              >
                Discuss a Migration Brief
              </Link>
              <Link
                href="/our-method"
                className="inline-flex items-center justify-center w-full rounded-full border border-white/15 px-6 py-3 text-sm uppercase tracking-[0.16em] text-white transition-colors hover:border-accent hover:text-accent"
                data-analytics-event="cta_click"
                data-analytics-label="See Our Method"
                data-analytics-location="migration_cta"
                data-analytics-destination="/our-method"
              >
                See Our Method
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
