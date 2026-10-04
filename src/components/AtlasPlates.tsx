"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Cormorant_Garamond } from "next/font/google";
import AtlasCaseDetail from "@/components/AtlasCaseDetail";
import AtlasGlobe from "@/components/AtlasGlobe";
import { ACTIVE_ATLAS_CASES, type AtlasCase } from "@/lib/atlas";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  display: "swap",
});

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

function roman(index: number) {
  return ROMAN[index] ?? String(index + 1);
}

/**
 * The Atlas as a list of cases beside a locator globe. The list and the full
 * text of every case are server-rendered, so each case keeps its anchor and
 * reads without JavaScript; the globe follows whichever case the reader is
 * hovering or reading. Pass `sector` to show only that sector's cases.
 */
export default function AtlasPlates({ sector }: { sector?: string }) {
  const cases = sector ? ACTIVE_ATLAS_CASES.filter((c) => c.sector === sector) : ACTIVE_ATLAS_CASES;
  const [target, setTarget] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const articleRefs = useRef(new Map<string, HTMLElement>());

  // Follow the article nearest the middle of the viewport while scrolling.
  useEffect(() => {
    const elements = Array.from(articleRefs.current.values());
    if (elements.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        let best: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (!best || entry.intersectionRatio > best.intersectionRatio) best = entry;
        }
        if (best) setPinned(best.target.id);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const goTo = useCallback((atlasCase: AtlasCase) => {
    const el = articleRefs.current.get(atlasCase.caseId ?? atlasCase.id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
    setPinned(atlasCase.caseId ?? atlasCase.id);
  }, []);

  return (
    <div className="mt-14 grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-14">
      <div className="md:sticky md:top-24 md:self-start">
        <AtlasGlobe mode="locator" target={target ?? pinned} onSelect={goTo} />
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.2em] text-accent">Cases</p>
        <ol className="mt-6 border-b border-border-grey" onMouseLeave={() => setTarget(null)}>
          {cases.map((atlasCase, index) => (
            <li key={atlasCase.id} className="border-t border-border-grey">
              <a
                href={`#${atlasCase.id}`}
                className="group grid grid-cols-[3rem_1fr] gap-x-3 py-4 outline-none"
                onMouseEnter={() => setTarget(atlasCase.id)}
                onFocus={() => setTarget(atlasCase.id)}
                onBlur={() => setTarget(null)}
                onClick={(event) => {
                  event.preventDefault();
                  goTo(atlasCase);
                }}
              >
                <span className={`${cormorant.className} text-xl text-accent`}>{roman(index)}</span>
                <span>
                  <span
                    className={`${cormorant.className} block text-xl leading-tight text-white transition-colors group-hover:text-accent group-focus-visible:text-accent ${
                      (target ?? pinned) === atlasCase.id ? "text-accent" : ""
                    }`}
                  >
                    {atlasCase.name}
                  </span>
                  {atlasCase.sectorRegion ? (
                    <span className="mt-1 block text-[10px] uppercase tracking-[0.18em] text-text-muted">
                      {atlasCase.sectorRegion}
                    </span>
                  ) : null}
                </span>
              </a>
            </li>
          ))}
        </ol>

        <div className="mt-6">
          {cases.map((atlasCase, index) => {
            return (
              <article
                key={atlasCase.id}
                id={atlasCase.id}
                ref={(el) => {
                  if (el) articleRefs.current.set(atlasCase.id, el);
                  else articleRefs.current.delete(atlasCase.id);
                }}
                className="scroll-mt-28 border-t border-border-grey py-12"
                onMouseEnter={() => setTarget(atlasCase.id)}
                onMouseLeave={() => setTarget(null)}
              >
                <p className={`${cormorant.className} mb-4 text-xl text-accent`}>{roman(index)}</p>
                <AtlasCaseDetail atlasCase={atlasCase} variant="list" analyticsLocation="research_atlas" />
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
