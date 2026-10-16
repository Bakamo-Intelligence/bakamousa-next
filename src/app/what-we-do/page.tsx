import type { Metadata } from "next";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import { BOOKING_HREF } from "@/lib/booking";
import ProductLayers from "@/components/what-we-do/ProductLayers";
import { CLIENT_QUESTIONS } from "@/lib/products";
import { pageOpenGraph } from "@/lib/seo";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const DESCRIPTION =
  "The questions clients bring Bakamo, the research product that answers each, and what the answer is for. Agenda, Frames, Publics, Common Sense and Public Mood.";

export const metadata: Metadata = {
  title: "What We Do: Social Intelligence Products",
  description: DESCRIPTION,
  alternates: {
    canonical: "/what-we-do",
  },
  openGraph: pageOpenGraph("/what-we-do", "What We Do: Social Intelligence Products | Bakamo", DESCRIPTION),
};

// Big figure on each card: time to first learnings. The full delivery sits under it.
const FIRST_FINDINGS: Record<string, { figure: string; unit: string }> = {
  agenda: { figure: "48", unit: "hours to the report" },
  frames: { figure: "1", unit: "week to first learnings" },
  publics: { figure: "2", unit: "weeks to first learnings" },
  "common-sense": { figure: "2", unit: "weeks to first learnings" },
  "public-mood": { figure: "1", unit: "reading every month" },
};

export default function WhatWeDoPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-clip bg-near-black text-text-primary">
      <div className="grain-overlay" />

      {/* Hero */}
      <section
        className="relative isolate overflow-hidden border-b border-border-grey px-6 pb-24 pt-32 md:pb-32 md:pt-44"
        data-analytics-section="what_we_do_hero"
        data-analytics-label="What We Do Hero"
      >
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_10%,rgba(201,169,110,0.14),transparent_38%)]" />
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">What we do</p>
          <h1
            className={`${cormorant.className} mt-6 max-w-5xl text-[clamp(3.2rem,7vw,6.5rem)] leading-[0.9] tracking-tight text-white`}
          >
            We read the conversation. You get the question that matters.
          </h1>
          <div className="mt-10 h-px w-16 bg-accent" />
          <div className="mt-10 grid gap-10 md:grid-cols-[1.4fr_1fr]">
            <p className="max-w-3xl text-xl font-light leading-relaxed text-text-secondary">
              Bakamo reads what people say to each other online about a market, a brand or an
              issue, in the language of each market, and interprets it: the narratives, tensions
              and personas that govern it, and what they mean for your decision.
            </p>
            <p className={`${cormorant.className} text-2xl italic leading-snug text-white md:text-3xl`}>
              We never ask and never interact. People perform for researchers. They tell each other
              the truth.
            </p>
          </div>
        </div>
      </section>

      {/* Client questions */}
      <section
        className="px-6 py-24 md:py-32"
        data-analytics-section="what_we_do_questions"
        data-analytics-label="Client Questions"
      >
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-[1fr_1.4fr] md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-accent">Where we start</p>
              <h2 className="mt-4 text-4xl font-light leading-tight text-white md:text-5xl">
                What we are asked for.
              </h2>
            </div>
            <p className="text-lg font-light leading-relaxed text-text-secondary md:pb-2">
              Nine questions clients bring us. For each, what the answer is for, and which product
              answers it.
            </p>
          </div>

          <ol className="mt-16 border-t border-border-grey">
            {CLIENT_QUESTIONS.map((item, index) => (
              <li
                key={item.title}
                className="group grid gap-4 border-b border-border-grey py-9 transition-colors md:grid-cols-[4rem_1.2fr_1fr] md:gap-10 md:py-10"
              >
                <span
                  className={`${cormorant.className} text-3xl leading-none text-text-muted transition-colors group-hover:text-accent md:text-4xl`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className={`${cormorant.className} text-2xl leading-tight text-white md:text-[1.75rem]`}>
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-base font-light leading-relaxed text-text-secondary">{item.detail}</p>
                  <p className="mt-4 text-sm font-light text-text-muted">
                    Answered by <span className="text-accent">{item.products}</span>
                  </p>
                </div>
                <div className="border-l border-accent pl-5 md:mt-1 md:self-start">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-accent">So you can</p>
                  <p className="mt-2 text-base leading-relaxed text-white">{item.outcome}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-10 max-w-3xl text-base font-light leading-relaxed text-text-muted">
            Also commissioned: evidence for litigation and regulatory proceedings, and campaign
            evaluation. Both are scoped from Frames or Publics.
          </p>
        </div>
      </section>

      {/* Products */}
      <section
        className="border-t border-border-grey bg-dark-grey px-6 py-24 md:py-32"
        data-analytics-section="what_we_do_products"
        data-analytics-label="Products"
      >
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">The products</p>
          <h2 className="mt-4 max-w-4xl text-4xl font-light leading-tight text-white md:text-5xl">
            Five products. Each one goes further than the last.
          </h2>
          <p className="mt-6 max-w-3xl text-lg font-light leading-relaxed text-text-secondary">
            Each product answers a bigger question than the one before it and includes everything
            the one before delivers. Public Mood keeps watching after the study. First learnings
            arrive within the first weeks, not at the end.
          </p>

          <ProductLayers headingClassName={cormorant.className} firstFindings={FIRST_FINDINGS} />

          <div className="mt-14 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-start">
            <p className="max-w-3xl text-base font-light leading-relaxed text-text-secondary">
              Scope, depth and markets are set to the brief. Additional markets, languages and
              competitors are quoted separately. Book a meeting and bring the question: we will
              tell you which product answers it, and at what scope.
            </p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4 md:justify-self-end">
              <Link
                href={BOOKING_HREF}
                className="cta-button text-sm"
                data-analytics-event="book_demo_click"
                data-analytics-label="Book a meeting"
                data-analytics-location="what_we_do_products"
                data-analytics-destination={BOOKING_HREF}
              >
                Book a meeting
              </Link>
              <Link
                href="/our-method"
                className="inline-flex text-sm uppercase tracking-[0.16em] text-accent transition-colors hover:text-white"
                data-analytics-event="cta_click"
                data-analytics-label="How the work is done"
                data-analytics-location="what_we_do_products"
                data-analytics-destination="/our-method"
              >
                How the work is done &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="border-t border-border-grey px-6 py-28 text-center md:py-36"
        data-analytics-section="what_we_do_cta"
        data-analytics-label="CTA"
      >
        <div className="mx-auto max-w-4xl">
          <h2 className={`${cormorant.className} text-5xl leading-none text-white md:text-7xl`}>
            Bring us the question.
          </h2>
          <Link
            href={BOOKING_HREF}
            className="cta-button mt-10 text-sm"
            data-analytics-event="book_demo_click"
            data-analytics-label="Book a meeting"
            data-analytics-location="what_we_do_cta"
            data-analytics-destination={BOOKING_HREF}
          >
            Book a meeting
          </Link>
        </div>
      </section>
    </main>
  );
}
