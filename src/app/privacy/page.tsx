import type { Metadata } from "next";
import Link from "next/link";
import { pageOpenGraph } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Bakamo collects, uses, and protects information on this website.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: pageOpenGraph(
    "/privacy",
    "Privacy Policy | Bakamo",
    "How Bakamo collects, uses, and protects information on this website.",
  ),
};

const LAST_UPDATED = "15 September 2026";

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="text-xl font-medium text-white mb-4">{title}</h2>
      <div className="space-y-4 text-sm font-light leading-relaxed text-text-secondary">
        {children}
      </div>
    </section>
  );
}

const TOC = [
  { id: "who-we-are",        label: "Who we are" },
  { id: "what-we-collect",   label: "What we collect" },
  { id: "how-we-use",        label: "How we use it" },
  { id: "cookies",           label: "Cookies" },
  { id: "third-parties",     label: "Third parties" },
  { id: "your-rights",       label: "Your rights" },
  { id: "retention",         label: "Data retention" },
  { id: "contact",           label: "Contact us" },
];

export default function PrivacyPage() {
  return (
    <main className="relative w-full min-h-screen bg-near-black text-text-primary overflow-x-hidden pb-24">
      <div className="grain-overlay" />

      {/* Hero */}
      <section className="pt-32 md:pt-44 pb-14 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="text-accent uppercase tracking-[0.2em] text-sm mb-6">Legal</p>
          <h1 className="text-[clamp(2.2rem,5vw,4rem)] font-extralight leading-[1.0] tracking-tight text-white">
            Privacy Policy
          </h1>
          <div className="w-16 h-px bg-accent mt-8" />
          <p className="mt-6 text-sm text-text-muted">Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <div className="px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-12 lg:gap-16">

          {/* Table of contents */}
          <aside className="hidden lg:block">
            <nav className="sticky top-28 space-y-1" aria-label="Page sections">
              {TOC.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block text-xs uppercase tracking-[0.14em] text-text-muted py-1.5 hover:text-accent transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </aside>

          {/* Body */}
          <div className="space-y-12">

            <Section id="who-we-are" title="1. Who we are">
              <p>
                This website (<strong className="text-text-primary">bakamosocial.com</strong>) is operated by{" "}
                <strong className="text-text-primary">Bakamo Inc.</strong>, a corporation registered in the
                State of Delaware, USA.
              </p>
              {/* ⚠️ Replace the placeholder below with the actual Delaware registered address */}
              <p>
                Registered address: 8 The Green, Ste A, Dover, DE 19901, USA
              </p>
              <p>
                Bakamo Inc. is a subsidiary of{" "}
                <strong className="text-text-primary">Bakamo Limited</strong>, a private limited company
                incorporated in England and Wales (Company No. 10499798), registered at 22–26 King Street,
                King&rsquo;s Lynn, Norfolk, PE30 1HJ, United Kingdom.
              </p>
              <p>
                For privacy-related enquiries, Bakamo Limited acts as the data controller for visitors
                based in the United Kingdom and European Economic Area. Bakamo Inc. acts as the data
                controller for all other visitors.
              </p>
            </Section>

            <Section id="what-we-collect" title="2. What we collect">
              <p>
                We collect only the minimum data necessary to understand how this website is used so we
                can improve it.
              </p>
              <p><strong className="text-text-primary">Analytics data</strong> (only with your consent):</p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>Pages visited and time spent on each page</li>
                <li>Approximate geographic location (country / city, not precise)</li>
                <li>Device type, browser, and operating system</li>
                <li>How you arrived at the site (referrer URL)</li>
                <li>Interactions such as button clicks and scroll depth</li>
              </ul>
              <p>
                <strong className="text-text-primary">Contact enquiries:</strong> If you email us directly,
                we receive your email address and the content of your message. This data is not stored in
                any database — it exists only in our email inbox.
              </p>
              <p>
                We do <strong className="text-text-primary">not</strong> collect names, postal addresses,
                payment information, or any other personal data through this website.
              </p>
            </Section>

            <Section id="how-we-use" title="3. How we use it">
              <p>Analytics data is used solely to:</p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>Understand which pages and content are most useful to visitors</li>
                <li>Identify technical issues (e.g. pages that load slowly or cause errors)</li>
                <li>Measure the reach of published research</li>
              </ul>
              <p>
                We do not use your data for advertising, profiling, or any form of automated
                decision-making. We do not sell or rent data to third parties.
              </p>
              <p>
                The legal basis for processing analytics data is your{" "}
                <strong className="text-text-primary">consent</strong>, given via the cookie banner shown
                on your first visit. You may withdraw consent at any time (see{" "}
                <a href="#your-rights" className="text-accent hover:underline">Your rights</a>).
              </p>
            </Section>

            <Section id="cookies" title="4. Cookies">
              <p>
                Cookies are small text files stored in your browser. This website uses cookies only for
                analytics, and only after you have given consent.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-2 pr-4 text-text-primary font-medium">Cookie</th>
                      <th className="text-left py-2 pr-4 text-text-primary font-medium">Provider</th>
                      <th className="text-left py-2 pr-4 text-text-primary font-medium">Purpose</th>
                      <th className="text-left py-2 text-text-primary font-medium">Expiry</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr>
                      <td className="py-2.5 pr-4 font-mono text-accent">_ga</td>
                      <td className="py-2.5 pr-4">Google Analytics</td>
                      <td className="py-2.5 pr-4">Distinguishes unique visitors</td>
                      <td className="py-2.5">2 years</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 font-mono text-accent">_ga_*</td>
                      <td className="py-2.5 pr-4">Google Analytics</td>
                      <td className="py-2.5 pr-4">Stores session state</td>
                      <td className="py-2.5">2 years</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 font-mono text-accent">bakamo_consent</td>
                      <td className="py-2.5 pr-4">This website</td>
                      <td className="py-2.5 pr-4">Remembers your cookie preference</td>
                      <td className="py-2.5">localStorage (no expiry)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>
                No cookies are set before you make a choice. If you decline, only the{" "}
                <span className="font-mono text-accent">bakamo_consent</span> preference is stored
                (in your browser&rsquo;s localStorage, not as a cookie), and no analytics cookies are
                ever written.
              </p>
            </Section>

            <Section id="third-parties" title="5. Third parties">
              <p>
                Analytics data is processed by{" "}
                <strong className="text-text-primary">Google LLC</strong> via Google Analytics 4
                (measurement ID <span className="font-mono text-accent">G-L84VKCB2WZ</span>), which is
                loaded only after you accept analytics cookies. Google may transfer this data to servers
                outside your country. Google acts
                as a data processor on our behalf and is bound by Google&rsquo;s data processing terms.
              </p>
              <p>
                For more information on how Google handles data:{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  policies.google.com/privacy
                </a>
                .
              </p>
              <p>
                No other third-party services receive data from this website.
              </p>
            </Section>

            <Section id="your-rights" title="6. Your rights">
              <p>
                Depending on your location, you may have the following rights under GDPR, UK GDPR, or
                applicable US state privacy law:
              </p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                <li>The right to <strong className="text-text-primary">access</strong> the personal data we hold about you</li>
                <li>The right to <strong className="text-text-primary">rectify</strong> inaccurate data</li>
                <li>The right to <strong className="text-text-primary">erasure</strong> (&ldquo;right to be forgotten&rdquo;)</li>
                <li>The right to <strong className="text-text-primary">restrict</strong> processing</li>
                <li>The right to <strong className="text-text-primary">data portability</strong></li>
                <li>The right to <strong className="text-text-primary">object</strong> to processing</li>
                <li>The right to <strong className="text-text-primary">withdraw consent</strong> at any time</li>
              </ul>
              <p>
                <strong className="text-text-primary">To withdraw consent</strong> and stop analytics
                tracking immediately, select &ldquo;Cookie settings&rdquo; at the bottom of any page and
                choose &ldquo;Decline&rdquo;. Analytics stops straight away and the Google Analytics
                cookies set on this website are deleted.
              </p>
              <p>
                To exercise any other rights, contact us at the address in{" "}
                <a href="#contact" className="text-accent hover:underline">Section 8</a>. We will
                respond within 30 days.
              </p>
            </Section>

            <Section id="retention" title="7. Data retention">
              <p>
                Analytics data is retained in Google Analytics for{" "}
                <strong className="text-text-primary">14 months</strong> from the date of collection,
                after which it is automatically deleted by Google.
              </p>
              <p>
                Email correspondence is retained for as long as it is operationally relevant and
                deleted thereafter. We do not archive enquiries systematically.
              </p>
            </Section>

            <Section id="contact" title="8. Contact us">
              <p>
                For any privacy-related questions, requests, or complaints, please contact:
              </p>
              <div className="rounded-[1rem] border border-white/10 bg-black/20 p-5 space-y-1">
                <p className="text-text-primary font-medium">Daniel Fazekas</p>
                <p>Bakamo Limited / Bakamo Inc.</p>
                <p>
                  <a href="mailto:daniel.fazekas@bakamosocial.com" className="text-accent hover:underline">
                    daniel.fazekas@bakamosocial.com
                  </a>
                </p>
                <p>
                  <a href="tel:+441553432939" className="hover:text-white transition-colors">
                    +44 1553 432939
                  </a>
                </p>
              </div>
              <p>
                If you are based in the UK or EEA and are not satisfied with our response, you have the
                right to lodge a complaint with the{" "}
                <a
                  href="https://ico.org.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  UK Information Commissioner&rsquo;s Office (ICO)
                </a>{" "}
                or your local supervisory authority.
              </p>
            </Section>

            <div className="border-t border-white/10 pt-8">
              <p className="text-xs text-text-muted">
                This policy may be updated from time to time. The &ldquo;Last updated&rdquo; date at the
                top of this page reflects the most recent revision. Continued use of the site after
                changes constitutes acceptance of the updated policy.
              </p>
              <Link
                href="/contact"
                className="inline-flex mt-6 items-center text-sm text-accent hover:underline underline-offset-4"
              >
                Questions? Get in touch &rarr;
              </Link>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
