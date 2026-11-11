import type { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { BOOKING_HREF } from "@/lib/booking";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

const TITLE = "About Bakamo: Why Courts Kept a Fool";
const DESCRIPTION =
  "Bakamo takes its name from a Japanese word for a foolish person. At court, the fool was the one person allowed to raise what nobody had asked.";

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: {
    canonical: "/about",
  },
  openGraph: pageOpenGraph("/about", TITLE, DESCRIPTION),
};

const HOW_WE_WORK = [
  "We read conversation people started themselves. We never ask and never interact.",
  "We read in the language of each market, with native analysts.",
  "We let categories come out of the material.",
  "We say what a finding does not show.",
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
    photo: "/media/dani.jpeg",
    linkedin: "https://www.linkedin.com/in/danielfazekas/",
  },
  {
    name: "Dan Foreman",
    role: "Executive Chair",
    photo: "/media/Dan_foreman.jpeg",
    linkedin: "https://www.linkedin.com/in/dforeman/",
  },
  {
    name: "Miki Váradi",
    role: "Head of Research",
    photo: "/media/miki_varadi.jpeg",
    linkedin: "https://www.linkedin.com/in/miki-varadi-3802542/",
  },
];

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
          <Eyebrow>The name</Eyebrow>
          <h1
            className={`${cormorant.className} mt-6 max-w-5xl text-[clamp(4rem,8vw,7.5rem)] leading-[0.86] tracking-tight text-white`}
          >
            Why courts kept a fool.
          </h1>
          <div className="mt-10 h-px w-16 bg-accent" />
          <p className="mt-10 max-w-3xl text-xl font-light leading-relaxed text-text-secondary">
            At court, everyone answered the questions the king asked. One person was allowed to
            raise what nobody had asked: the fool. Bakamo takes its name from a Japanese word for a
            foolish person.
          </p>
        </div>
      </section>

      {/* What we are for */}
      <section className="border-t border-border-grey px-6 py-24 md:py-32" data-analytics-section="about_why">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-4xl text-4xl font-light leading-tight text-white md:text-6xl">
            What we are for.
          </h2>
          <div className="mt-12 max-w-3xl space-y-7 text-xl font-light leading-relaxed text-text-secondary">
            <p>
              Organisations are good at answering their own questions. Briefs, trackers and
              questionnaires are written by people who know the category well, and that is also
              their limit. They contain what the organisation already has in mind.
            </p>
            <p>
              Our job is the other part. We read what people say to each other and bring back what
              the organisation had not thought to ask about. Sometimes it is uncomfortable.
              Sometimes it confirms the plan, from outside the plan. Either way the next piece of
              research starts from a better list of questions.
            </p>
          </div>
        </div>
      </section>

      {/* How we work */}
      <section className="bg-dark-grey px-6 py-24 md:py-32" data-analytics-section="about_how">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-4xl text-4xl font-light leading-tight text-white md:text-6xl">
            How we work.
          </h2>
          <ul className="mt-12 divide-y divide-border-grey border-y border-border-grey">
            {HOW_WE_WORK.map((line) => (
              <li
                key={line}
                className={`${cormorant.className} py-6 text-3xl leading-snug text-white md:text-4xl`}
              >
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* The PEOPLE */}
      <section className="border-t border-border-grey px-6 py-24 md:py-32" data-analytics-section="about_people">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-4xl text-4xl font-light leading-tight text-white md:text-6xl">
            The people.
          </h2>
          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((member) => {
              const badge = (
                <span className="relative block h-28 w-28 shrink-0 overflow-hidden rounded-full border border-accent/60 bg-near-black ring-4 ring-accent/10 transition-colors group-hover:border-accent">
                  <Image
                    src={member.photo}
                    alt={`${member.name}, ${member.role}`}
                    fill
                    sizes="112px"
                    className="object-cover grayscale transition duration-500 group-hover:grayscale-0"
                  />
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
            Behind them, a network of analysts reading in 65 languages.
          </p>
        </div>
      </section>

      {/* Track record */}
      <section className="bg-dark-grey px-6 py-24 md:py-32" data-analytics-section="about_what">
        <div className="mx-auto max-w-6xl">
          <h2 className="max-w-4xl text-4xl font-light leading-tight text-white md:text-6xl">
            Track record.
          </h2>
          <div className="mt-14 grid grid-cols-3 gap-6">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className={`${cormorant.className} text-[clamp(3rem,7vw,6rem)] leading-none text-white`}>
                  {stat.value}
                </p>
                <p className="mt-3 text-xs uppercase tracking-[0.16em] text-text-secondary">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-14 max-w-3xl text-xl font-light leading-relaxed text-text-secondary">
            For brands, health organisations, governments and NGOs.
          </p>
          <Link
            href={BOOKING_HREF}
            className="cta-button mt-12 text-sm"
            data-analytics-event="book_demo_click"
            data-analytics-label="Book a meeting"
            data-analytics-location="about_cta"
            data-analytics-destination={BOOKING_HREF}
          >
            Book a meeting
          </Link>
        </div>
      </section>
    </main>
  );
}
