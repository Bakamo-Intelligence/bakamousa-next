"use client";

import { useMemo, useState } from "react";
import {
  COUNTRIES,
  NARRATIVES,
  REPORTS,
  countryByCode,
  fearShare,
  formatPct,
  formatPosts,
  type Country,
} from "@/data/migration-narratives";
import { DETAIL_ID, useSelection } from "./SelectionContext";

type SortKey = "fear" | "hum" | "vol" | "az";

const SORTS: Array<{ key: SortKey; label: string }> = [
  { key: "fear", label: "Fear share" },
  { key: "hum", label: "Humanitarian share" },
  { key: "vol", label: "Volume" },
  { key: "az", label: "A to Z" },
];

function sortCountries(key: SortKey): Country[] {
  const a = [...COUNTRIES];
  if (key === "fear") a.sort((x, y) => fearShare(y) - fearShare(x));
  else if (key === "hum")
    a.sort((x, y) => (y.narratives_pct.humanitarianism || 0) - (x.narratives_pct.humanitarianism || 0));
  else if (key === "vol") a.sort((x, y) => y.total_posts - x.total_posts);
  else a.sort((x, y) => x.country.localeCompare(y.country));
  return a;
}

function Bar({ c, height }: { c: Country; height: string }) {
  return (
    <div className={`flex min-w-0 gap-0.5 ${height}`}>
      {NARRATIVES.map((n) => (
        <i
          key={n.key}
          className="block h-full min-w-0 rounded-sm transition-[flex-basis] duration-200 motion-reduce:transition-none"
          style={{ flex: `0 0 ${c.narratives_pct[n.key] || 0}%`, background: n.color }}
          title={`${c.country} · ${n.label}: ${formatPct(c.narratives_pct[n.key])} of ${formatPosts(c.total_posts)} posts`}
        />
      ))}
    </div>
  );
}

export function NarrativeLegend() {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[0.8rem] text-text-secondary">
      {NARRATIVES.map((n) => (
        <span key={n.key} className="inline-flex items-center gap-1.5">
          <i className="inline-block h-2.5 w-2.5 rounded-sm" style={{ background: n.color }} />
          {n.label}
        </span>
      ))}
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-accent">{children}</p>;
}

function Detail({ c, displayClass }: { c: Country; displayClass: string }) {
  const n = c.narratives_pct;
  const issues = c.local_issues.length ? c.local_issues : ["No local narrative reported"];
  const events = c.political_events.length ? c.political_events : ["None named"];
  const report = REPORTS[c.code];
  return (
    <aside
      id={DETAIL_ID}
      aria-live="polite"
      className="grid min-w-0 gap-4 border border-white/10 bg-dark-grey p-5 md:sticky md:top-24 md:p-6"
    >
      <div>
        <Eyebrow>{c.country}</Eyebrow>
        <h3 className={`${displayClass} mt-1 text-[1.4rem] font-normal leading-[1.25] text-white`}>
          {c.one_line}
        </h3>
      </div>
      <Bar c={c} height="h-2.5" />
      <div className="grid grid-cols-3 gap-1.5 text-[0.74rem] sm:grid-cols-5">
        {NARRATIVES.map((x) => (
          <div key={x.key} className="pt-1" style={{ borderTop: `2px solid ${x.color}` }}>
            <b className="block text-[0.95rem] font-medium tabular-nums text-white">
              {formatPct(n[x.key])}
            </b>
            <span className="text-text-muted">{x.label}</span>
          </div>
        ))}
      </div>
      <dl className="m-0 grid grid-cols-[max-content_1fr] gap-x-3.5 gap-y-1.5 text-[0.84rem]">
        <dt className="text-text-muted">Posts</dt>
        <dd className="m-0 min-w-0 text-text-secondary">
          {c.total_posts.toLocaleString("en-GB")} in the year
        </dd>
        <dt className="text-text-muted">Underlying fear</dt>
        <dd className="m-0 min-w-0 text-text-secondary">{c.existential_anxiety}</dd>
        <dt className="text-text-muted">Politics</dt>
        <dd className="m-0 min-w-0 text-text-secondary">{c.politics_focus}</dd>
        <dt className="text-text-muted">Where it happens</dt>
        <dd className="m-0 min-w-0 text-text-secondary">{c.dominant_channel}</dd>
        <dt className="text-text-muted">Tone</dt>
        <dd className="m-0 min-w-0 text-text-secondary">{c.tone}</dd>
      </dl>
      <div>
        <Eyebrow>Local issues</Eyebrow>
        <ul className="mt-1 list-disc pl-[18px] text-[0.86rem] text-text-secondary">
          {issues.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      </div>
      <div>
        <Eyebrow>Events in the year</Eyebrow>
        <ul className="mt-1 list-disc pl-[18px] text-[0.86rem] text-text-secondary">
          {events.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      </div>
      {c.quote_anti ? (
        <blockquote
          className={`${displayClass} m-0 border-l-2 border-accent/40 pl-3 text-[1.12rem] leading-[1.32] text-white`}
        >
          {c.quote_anti}
          <small className="mt-1.5 block font-sans text-[0.7rem] uppercase tracking-[0.1em] text-text-muted">
            anti-migrant voice
          </small>
        </blockquote>
      ) : null}
      {c.quote_pro ? (
        <blockquote
          className={`${displayClass} m-0 border-l-2 border-accent/40 pl-3 text-[1.12rem] leading-[1.32] text-white`}
        >
          {c.quote_pro}
          <small className="mt-1.5 block font-sans text-[0.7rem] uppercase tracking-[0.1em] text-text-muted">
            pro-migrant or critical voice
          </small>
        </blockquote>
      ) : null}
      {report ? (
        <p className="text-[0.78rem] text-text-muted">
          <a
            href={report}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline-offset-[3px] hover:underline"
            data-analytics-event="cta_click"
            data-analytics-label={`Open ${c.country} country report`}
            data-analytics-location="migration_narratives_detail"
            data-analytics-destination={report}
          >
            Open the {c.country} country report
          </a>
        </p>
      ) : null}
    </aside>
  );
}

/**
 * The 28 stacked bars with sort controls and the sticky country detail panel.
 * `displayClass` is the Cormorant class from next/font, passed in from the page.
 */
export default function CountryBars({ displayClass }: { displayClass: string }) {
  const { code: current, select } = useSelection();
  const [sortKey, setSortKey] = useState<SortKey>("fear");
  const rows = useMemo(() => sortCountries(sortKey), [sortKey]);
  const selected = countryByCode(current) ?? COUNTRIES[0];

  return (
    <div className="grid gap-5">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.82rem] text-text-muted">
        <span>Sort by</span>
        <div role="group" aria-label="Sort" className="inline-flex flex-wrap overflow-hidden rounded-[3px] border border-white/10">
          {SORTS.map((s) => (
            <button
              key={s.key}
              type="button"
              aria-pressed={sortKey === s.key}
              onClick={() => setSortKey(s.key)}
              className={`whitespace-nowrap px-3 py-1.5 text-[0.82rem] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-accent ${
                sortKey === s.key ? "bg-accent-dim text-white" : "text-text-secondary hover:text-white"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <NarrativeLegend />
      </div>

      <div className="grid items-start gap-6 md:grid-cols-[minmax(0,1.5fr)_minmax(280px,1fr)]">
        <div role="list" className="grid min-w-0 gap-[3px]">
          {rows.map((c) => {
            const active = c.code === current;
            return (
              <button
                key={c.code}
                type="button"
                role="listitem"
                aria-current={active ? "true" : undefined}
                onClick={() => select(c.code)}
                className={`grid grid-cols-[92px_1fr_44px] items-center gap-2 rounded-[3px] px-1 py-0.5 text-left transition-colors hover:bg-dark-grey focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent sm:grid-cols-[118px_1fr_52px] sm:gap-2.5 ${
                  active ? "bg-dark-grey" : ""
                }`}
              >
                <span
                  className={`truncate text-[0.82rem] ${active ? "text-white" : "text-text-secondary"}`}
                >
                  {c.country}
                </span>
                <Bar c={c} height="h-4" />
                <span className="text-right text-[0.72rem] tabular-nums text-text-muted">
                  {formatPosts(c.total_posts)}
                </span>
              </button>
            );
          })}
        </div>
        <Detail c={selected} displayClass={displayClass} />
      </div>
    </div>
  );
}
