"use client";

import { useEffect, useRef } from "react";
import { Cormorant_Garamond } from "next/font/google";
import { gsap } from "gsap";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const OFFICES = [
  { city: "New Jersey", country: "USA", role: "North America" },
  { city: "London", country: "UK", role: "Western Europe" },
  { city: "Dortmund", country: "Germany", role: "DACH" },
  { city: "Budapest", country: "Hungary", role: "Central Europe" },
  { city: "Kuala Lumpur", country: "Malaysia", role: "APAC" },
];

const STARTING_POINTS = [
  {
    title: "Tracker refresh",
    body: "You suspect the current instrument still measures yesterday's reality.",
  },
  {
    title: "Segmentation or innovation brief",
    body: "You want the next large study to begin from live market language rather than internal vocabulary.",
  },
  {
    title: "Independent outside read",
    body: "Leadership needs a ground-truth check before strategic momentum hardens into certainty.",
  },
];

const WHAT_HAPPENS = [
  {
    number: "01",
    title: "Send the context",
    body: "Tell us what decision is coming up and where your team feels uncertainty, drift, or risk.",
  },
  {
    number: "02",
    title: "We scope the right entry point",
    body: "If the job is diagnosis, mapping, or calibration, we will tell you that directly instead of forcing the wrong product shape.",
  },
  {
    number: "03",
    title: "Begin the work",
    body: "The first engagement is designed to sharpen the brief, reveal fault lines, and show what the business should investigate next.",
  },
];

const email = "info@bakamosocial.com";

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-kicker",
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "expo.out", delay: 0.2 }
      );
      gsap.fromTo(
        ".contact-title",
        { y: 56, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.05, ease: "expo.out", delay: 0.3 }
      );
      gsap.fromTo(
        ".contact-body",
        { y: 34, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.95, ease: "expo.out", delay: 0.65 }
      );
      gsap.fromTo(
        ".contact-panel",
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "expo.out", delay: 0.75 }
      );
      gsap.fromTo(
        ".contact-card",
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: "expo.out", delay: 0.9 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const emailHref = `mailto:${email}`;
  const conversationHref = `mailto:${email}?subject=Start%20the%20conversation`;

  return (
    <div ref={containerRef} className="relative pb-24 text-text-primary">
      <div className="grain-overlay" />

      <section
        className="relative border-b border-border-grey px-6 pb-20 pt-32 md:pb-24 md:pt-44"
        data-analytics-section="contact_hero"
        data-analytics-label="Contact Hero"
      >
        <div className="relative z-10 mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(320px,0.98fr)] lg:items-end">
            <div>
              <p className="contact-kicker text-sm uppercase tracking-[0.22em] text-accent">
                Contact
              </p>
              <h1
                className={`${cormorant.className} contact-title mt-6 max-w-4xl text-[clamp(3.2rem,7vw,6.4rem)] leading-[0.88] tracking-tight text-white`}
              >
                Start the conversation.
              </h1>
              <div className="mt-10 h-px w-16 bg-accent" />
              <p className="contact-body mt-8 max-w-2xl text-lg font-light leading-relaxed text-text-secondary">
                If you have a tracker to refresh, a segmentation to build, an
                innovation program to shape, or a strategy that needs an outside
                read, start here. We will help determine the right entry point
                before the brief gets fixed in the wrong form.
              </p>
              <div className="contact-body mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <a
                  href={conversationHref}
                  className="cta-button text-sm"
                  data-analytics-event="generate_lead"
                  data-analytics-label="Start the conversation"
                  data-analytics-location="contact_hero"
                  data-analytics-contact-method="email"
                  data-analytics-lead-source="contact_page"
                >
                  Start the conversation
                </a>
                <a
                  href={emailHref}
                  className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm uppercase tracking-[0.16em] text-white transition-colors hover:border-accent hover:text-accent"
                  data-analytics-event="contact_click"
                  data-analytics-label="Email Us Directly"
                  data-analytics-location="contact_hero"
                  data-analytics-contact-method="email"
                >
                  Email Us Directly
                </a>
              </div>
            </div>

            <aside
              className="contact-panel overflow-hidden rounded-[2rem] border border-white/10 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
              style={{
                background:
                  "linear-gradient(160deg, rgba(201,169,110,0.16), rgba(20,20,20,0.92) 38%, rgba(10,10,10,0.98))",
              }}
            >
              <p className="text-xs uppercase tracking-[0.24em] text-accent/80">
                Contact details
              </p>
              <div className="mt-8 space-y-6">
                <div className="border-t border-white/10 pt-6 first:border-t-0 first:pt-0">
                  <p className="text-xs uppercase tracking-[0.16em] text-text-muted">
                    Email
                  </p>
                  <a
                    href={emailHref}
                    className="mt-2 block text-lg font-light text-white transition-colors hover:text-accent"
                    data-analytics-event="contact_click"
                    data-analytics-label="Contact Email"
                    data-analytics-location="contact_details"
                    data-analytics-contact-method="email"
                  >
                    {email}
                  </a>
                </div>
                <div className="border-t border-white/10 pt-6">
                  <p className="text-xs uppercase tracking-[0.16em] text-text-muted">
                    Phone
                  </p>
                  <a
                    href="tel:+441553432939"
                    className="mt-2 block text-lg font-light text-white transition-colors hover:text-accent"
                    data-analytics-event="contact_click"
                    data-analytics-label="Contact Phone"
                    data-analytics-location="contact_details"
                    data-analytics-contact-method="phone"
                  >
                    +44 1553 432939
                  </a>
                </div>
                <div className="border-t border-white/10 pt-6">
                  <p className="text-xs uppercase tracking-[0.16em] text-text-muted">
                    Global footprint
                  </p>
                  <p className="mt-2 text-lg font-light text-white">
                    5 offices across North America, Europe, and APAC
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section
        className="px-6 py-24 md:py-28"
        data-analytics-section="contact_reasons"
        data-analytics-label="Contact Reasons"
      >
        <div className="mx-auto max-w-6xl grid gap-12 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:items-start">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-accent">
              Good reasons to start a conversation
            </p>
            <h2 className="mt-6 text-3xl font-extralight leading-tight text-white md:text-5xl">
              Most teams arrive when something feels off, stale, or too expensive to guess.
            </h2>
            <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-text-secondary">
              You do not need a perfectly formed brief. In many cases the first
              useful move is clarifying what kind of question the business is
              actually facing.
            </p>
          </div>

          <div className="grid gap-4">
            {STARTING_POINTS.map((item) => (
              <article
                key={item.title}
                className="contact-card rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-6"
              >
                <h3 className="text-lg font-medium text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-dark-grey/70 px-6 py-24 md:py-28">
        <div className="mx-auto max-w-6xl grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,1fr)] lg:items-start">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-accent">
              Global presence
            </p>
            <h2 className="mt-6 text-3xl font-extralight leading-tight text-white md:text-5xl">
              A distributed team with local visibility.
            </h2>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {OFFICES.map((office) => (
                <div
                  key={office.city}
                  className="contact-card rounded-[1.5rem] border border-white/10 bg-black/20 p-6"
                >
                  <p className="text-xs uppercase tracking-[0.16em] text-accent">
                    {office.role}
                  </p>
                  <h3 className="mt-4 text-xl font-light text-white">
                    {office.city}
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary">{office.country}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-[1.75rem] border border-accent/20 p-6 md:p-8"
            style={{
              background:
                "linear-gradient(145deg, rgba(201,169,110,0.12), rgba(20,20,20,0.94) 34%, rgba(10,10,10,0.98))",
            }}
          >
            <p className="text-xs uppercase tracking-[0.18em] text-accent">
              What happens next
            </p>
            <div className="mt-6 space-y-6">
              {WHAT_HAPPENS.map((step) => (
                <div key={step.number} className="contact-card flex gap-4 border-t border-white/10 pt-6 first:border-t-0 first:pt-0">
                  <span className="font-mono text-sm text-accent">{step.number}</span>
                  <div>
                    <h3 className="text-lg font-medium text-white">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                      {step.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="px-6 py-24"
        data-analytics-section="contact_final_cta"
        data-analytics-label="Contact Final CTA"
      >
        <div
          className="mx-auto max-w-5xl rounded-[2rem] border border-accent/20 p-8 text-center md:p-12"
          style={{
            background:
              "linear-gradient(145deg, rgba(201,169,110,0.14), rgba(20,20,20,0.94) 36%, rgba(10,10,10,1))",
          }}
        >
          <p className="text-sm uppercase tracking-[0.2em] text-accent">
            Ready when you are
          </p>
          <h2
            className={`${cormorant.className} mt-6 text-4xl leading-[0.96] text-white md:text-5xl`}
          >
            Ready to build on reality?
          </h2>
          <p className="mx-auto mt-8 max-w-2xl text-lg font-light leading-relaxed text-text-secondary">
            Send the context, the problem, or the upcoming decision. We will
            help work out the most useful way to start.
          </p>
          <a
            href={conversationHref}
            className="cta-button mt-10 text-sm"
            data-analytics-event="generate_lead"
            data-analytics-label="Start the conversation"
            data-analytics-location="contact_final_cta"
            data-analytics-contact-method="email"
            data-analytics-lead-source="contact_page"
          >
            Start the conversation
          </a>
        </div>
      </section>
    </div>
  );
}
