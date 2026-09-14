import type { Metadata } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond } from "next/font/google";
import AtlasGlobe from "@/components/AtlasGlobe";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "About",
  description:
    "Bakamo is a social intelligence company. We close the gap between decision-makers and people by reading unprompted conversation. Build on reality.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Bakamo",
    description:
      "Bakamo is a social intelligence company. We close the gap between decision-makers and people by reading unprompted conversation. Build on reality.",
  },
};

const APPROACH = [
  {
    title: "We read, we don't just count.",
    body: "Mention volumes and sentiment scores tell you what was said, but they cannot tell you what it means. We work in narratives and interpretations, not just datasets and statements.",
  },
  {
    title: "Human judgment + technology.",
    body: "Technology can scale reading, but it cannot replace judgment. Our proprietary technology — the Reading Machine — holds entire conversations at once so nothing is missed, but a named, accountable expert is always responsible for what it actually means.",
  },
  {
    title: "We embrace the messiness.",
    body: "The categories come from the data; we never impose them. We capture the shared, underlying assumptions people carry into every decision — the things that go without saying.",
  },
  {
    title: "We tell the truth, even if it's uncomfortable.",
    body: "Our job is not to confirm what you already think. It is to expose what you haven't seen. We interrogate the brief, challenge hypotheses, and are never afraid to bring you the bad news if it reflects reality.",
    note: "In fact, “Bakamo” is a nod to the Japanese word for “fool” — a reminder of the medieval jester, who was the only person in the court permitted to speak the unvarnished truth to those in power.",
  },
];

const SECTORS = [
  {
    title: "Commercial Research",
    body: "Brands, culture, communications, and emerging consumer needs.",
  },
  {
    title: "Health & Pharma",
    body: "Patients, health equity, public discourse, and the social forces shaping health.",
  },
  {
    title: "Not-for-Profit & Government",
    body: "Citizens, public opinion, policy, and social movements.",
  },
];

const STATS = [
  { value: "550+", label: "projects" },
  { value: "45", label: "countries" },
  { value: "65", label: "languages" },
];

const TEAM = [
  {
    name: "Daniel Fazekas",
    role: "Founder & CEO",
    initials: "DF",
    photo: "/media/dani.jpeg",
    linkedin: "https://www.linkedin.com/in/danielfazekas/",
  },
  {
    name: "Dan Foreman",
    role: "Executive Chair",
    initials: "DF",
    photo: "/media/Dan_foreman.jpeg",
    linkedin: "https://www.linkedin.com/in/dforeman/",
  },
  {
    name: "Miki Váradi",
    role: "Head of Research",
    initials: "MV",
    photo: "/media/miki_varadi.jpeg",
    linkedin: "https://www.linkedin.com/in/miki-varadi-3802542/",
  },
];

/** Photo badges show once the file exists in /public; until then, initials. */
function hasPhoto(photo: string) {
  return existsSync(path.join(process.cwd(), "public", photo));
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4 fill-current">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-xs uppercase tracking-[0.2em] text-accent">{children}</p>;
}

export default function AboutPage() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-near-black text-text-primary">
      <div className="grain-overlay" />

      <section className="px-6 pb-24 pt-32 md:pb-32 md:pt-44" data-analytics-section="about_hero">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>About Bakamo</Eyebrow>
          <h1
            className={`${cormorant.className} mt-6 max-w-5xl text-[clamp(4rem,8vw,7.5rem)] leading-[0.86] tracking-tight text-white`}
          >
            Build on reality.
          </h1>
          <div className="mt-10 h-px w-16 bg-accent" />
        </div>
      </section>

      {/* The WHY */}
      <section className="border-t border-border-grey px-6 py-24 md:py-32" data-analytics-section="about_why">
        <div className="mx-auto max-w-5xl">
          <Eyebrow>The why — our purpose &amp; beliefs</Eyebrow>
          <h2 className="mt-6 max-w-4xl text-4xl font-light leading-tight text-white md:text-6xl">
            We believe in closing the gap between decision-makers and people.
          </h2>
          <div className="mt-12 max-w-3xl space-y-7 text-xl font-light leading-relaxed text-text-secondary">
            <p>
              For too long, the research industry has flattened the world it was supposed to
              understand. People are squeezed into segments, complex motivations are reduced to
              percentages, and messy human realities are simplified just to fit a brief.
            </p>
            <p>
              When you ask people a question, they instinctively try to fit themselves into the
              boxes they are given. What they actually think stays unsaid. We come from different
              backgrounds, but we share the same deep frustration: traditional research forces
              people to conform to the researcher&apos;s assumptions, producing a photograph of
              somebody else&apos;s question rather than the truth.
            </p>
            <p className="border-l border-accent pl-7 text-3xl leading-snug text-white">
              Bakamo exists because we stopped accepting that.
            </p>
            <p>
              We naively, yet fiercely, believe that if decision-makers could see people more
              clearly — as citizens, patients, audiences, and peers — they would make wiser
              decisions, not just more informed ones. Wiser decisions come from understanding why
              things matter to the people living them.
            </p>
            <p className="text-white">
              Our ambition is simple: we advocate for the people on the other side of the research
              by making their reality impossible to ignore.
            </p>
          </div>
        </div>
      </section>

      {/* The HOW */}
      <section className="bg-dark-grey px-6 py-24 md:py-32" data-analytics-section="about_how">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>The how — our approach</Eyebrow>
          <h2 className="mt-6 max-w-4xl text-4xl font-light leading-tight text-white md:text-6xl">
            We stop asking questions and start listening to natural conversations.
          </h2>
          <p className="mt-10 max-w-3xl text-xl font-light leading-relaxed text-text-secondary">
            People are most interesting — and most honest — when nobody is asking them a question.
            Instead of prompting responses, we find meaning in the things people are already saying
            to each other.
          </p>
          <p className="mt-16 text-2xl font-light text-white">
            Here is how we uncover the Social Truth:
          </p>
          <div className="mt-10">
            {APPROACH.map((item) => (
              <article key={item.title} className="relative border-t border-border-grey py-9">
                <div className="absolute bottom-0 left-0 top-9 hidden w-px bg-border-grey md:block" />
                <div className="md:pl-10">
                  <h3 className="text-3xl font-light text-white">{item.title}</h3>
                  <p className="mt-5 max-w-3xl text-base leading-relaxed text-text-secondary">
                    {item.body}
                  </p>
                  {item.note && (
                    <p className="mt-5 max-w-3xl text-sm italic leading-relaxed text-accent">
                      {item.note}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* The WHAT */}
      <section className="px-6 py-24 md:py-32" data-analytics-section="about_what">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>The what — what we do &amp; our proof</Eyebrow>
          <h2 className="mt-6 max-w-4xl text-4xl font-light leading-tight text-white md:text-6xl">
            We are a social intelligence company.
          </h2>
          <p className="mt-10 max-w-3xl text-xl font-light leading-relaxed text-text-secondary">
            We uncover what people really think by reading unprompted conversations across the
            globe, translating that meaning into strategic, actionable insights for our clients. We
            work wherever understanding people matters:
          </p>
          <div className="mt-14 grid gap-10 md:grid-cols-3 md:divide-x md:divide-border-grey">
            {SECTORS.map((sector, index) => (
              <article key={sector.title} className={index > 0 ? "md:pl-10" : ""}>
                <h3 className="text-2xl font-light text-white">{sector.title}</h3>
                <p className="mt-4 text-base leading-relaxed text-text-secondary">{sector.body}</p>
              </article>
            ))}
          </div>

          <div className="mt-24 border-t border-border-grey pt-16">
            <h3 className="text-xs uppercase tracking-[0.2em] text-accent">The proof</h3>
            <div className="mt-10 grid grid-cols-3 gap-6">
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <p
                    className={`${cormorant.className} text-[clamp(3rem,7vw,6rem)] leading-none text-white`}
                  >
                    {stat.value}
                  </p>
                  <p className="mt-3 text-xs uppercase tracking-[0.16em] text-text-secondary">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-14 max-w-3xl text-xl font-light leading-relaxed text-text-secondary">
              From Fortune 100 companies and global brands to the European Commission, NATO, and
              Amnesty International, our work drives tangible impact. We have helped brands execute
              commercial turnarounds, informed public policy (including citations in the US Senate),
              and advanced academic science.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-24 max-w-6xl text-center">
          <h3 className={`${cormorant.className} text-5xl leading-none text-white md:text-7xl`}>
            The Atlas of Social Truths.
          </h3>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-light leading-relaxed text-text-secondary">
            A selection of our work, wherever the conversation lives. Click a dot.
          </p>
        </div>
        <AtlasGlobe />
      </section>

      {/* The PEOPLE */}
      <section className="bg-dark-grey px-6 py-24 md:py-32" data-analytics-section="about_people">
        <div className="mx-auto max-w-6xl">
          <Eyebrow>The people</Eyebrow>
          <h2 className="mt-6 max-w-4xl text-4xl font-light leading-tight text-white md:text-6xl">
            The people who win the work stay close to the work.
          </h2>
          <p className="mt-10 max-w-3xl text-xl font-light leading-relaxed text-text-secondary">
            When you work with us, there is no senior pitch team that disappears after kick-off. We
            are proud to work with a global network of 250+ analysts and helpers, bringing the
            linguistic and analytical skills to read conversations in their own languages.
          </p>
          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member) => {
              const badge = (
                <span className="relative block h-28 w-28 shrink-0 overflow-hidden rounded-full border border-accent/60 bg-near-black ring-4 ring-accent/10 transition-colors group-hover:border-accent">
                  {hasPhoto(member.photo) ? (
                    <Image
                      src={member.photo}
                      alt={`${member.name}, ${member.role}`}
                      fill
                      sizes="112px"
                      className="object-cover grayscale transition duration-500 group-hover:grayscale-0"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-2xl font-light tracking-[0.14em] text-accent">
                      {member.initials}
                    </span>
                  )}
                </span>
              );
              const heading = (
                <>
                  <span className="mt-6 flex items-center gap-2 text-2xl font-light text-white">
                    {member.name}
                    {member.linkedin && (
                      <span className="text-text-secondary transition-colors group-hover:text-accent">
                        <LinkedInIcon />
                      </span>
                    )}
                  </span>
                  <span className="mt-2 block text-xs uppercase tracking-[0.16em] text-accent">
                    {member.role}
                  </span>
                </>
              );
              return (
                <article key={member.name} className="border-t border-border-grey pt-8">
                  {member.linkedin ? (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block w-fit"
                      aria-label={`${member.name} on LinkedIn`}
                      data-analytics-event="outbound_click"
                      data-analytics-label={`LinkedIn: ${member.name}`}
                      data-analytics-location="about_people"
                      data-analytics-destination={member.linkedin}
                    >
                      {badge}
                      {heading}
                    </a>
                  ) : (
                    <div className="group w-fit">
                      {badge}
                      {heading}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
          <p className="mt-16 max-w-3xl text-xl font-light leading-relaxed text-white">
            We work directly, collaboratively, and alongside your team to give you findings you can
            act on, rather than a document you have to translate.
          </p>
        </div>
      </section>

      <section className="border-t border-border-grey px-6 py-28 text-center md:py-36" data-analytics-section="about_cta">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">Try it out</p>
          <h2 className={`${cormorant.className} mt-6 text-5xl leading-none text-white md:text-7xl`}>
            Bakamo. Build on reality.
          </h2>
          <Link
            href="/contact"
            className="cta-button mt-10 text-sm"
            data-analytics-event="cta_click"
            data-analytics-label="Book a demo"
            data-analytics-location="about_cta"
            data-analytics-destination="/contact"
          >
            Book a demo
          </Link>
        </div>
      </section>
    </main>
  );
}
