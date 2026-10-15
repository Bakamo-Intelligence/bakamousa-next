"use client";

import { useCallback, useEffect, useState } from "react";
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

function number(index: number) {
  return String(index + 1).padStart(2, "0");
}

/**
 * The Atlas as a numbered list of cases beside a locator globe. Each row opens
 * to the full case in place, one at a time, so the list stays short however
 * many cases it holds. Every case is server-rendered inside its row and keeps
 * its anchor: a link to #case-id opens that row. Pass `sector` to show only
 * that sector's cases.
 */
export default function AtlasPlates({ sector }: { sector?: string }) {
  const cases = sector ? ACTIVE_ATLAS_CASES.filter((c) => c.sector === sector) : ACTIVE_ATLAS_CASES;
  const [target, setTarget] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(null);

  // A link to #case-id opens that case, on load and when the hash changes.
  useEffect(() => {
    const openFromHash = () => {
      const id = window.location.hash.slice(1);
      if (id && cases.some((c) => c.id === id)) {
        setOpen(id);
        requestAnimationFrame(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [cases]);

  const goTo = useCallback((atlasCase: AtlasCase) => {
    const id = atlasCase.caseId ?? atlasCase.id;
    setOpen(id);
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  const toggle = useCallback((id: string) => {
    setOpen((current) => (current === id ? null : id));
  }, []);

  return (
    <div className="mt-14 grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:gap-14">
      <div className="md:sticky md:top-24 md:self-start">
        <AtlasGlobe mode="locator" target={target ?? open} onSelect={goTo} />
      </div>

      <div>
        <div className="flex items-baseline justify-between gap-4">
          <p className="text-xs uppercase tracking-[0.2em] text-accent">Cases</p>
          <p className="text-xs uppercase tracking-[0.16em] text-text-muted">{cases.length} entries</p>
        </div>
        <ol className="mt-6 border-b border-border-grey" onMouseLeave={() => setTarget(null)}>
          {cases.map((atlasCase, index) => {
            const isOpen = open === atlasCase.id;
            const active = (target ?? open) === atlasCase.id;
            return (
              <li
                key={atlasCase.id}
                id={atlasCase.id}
                className="scroll-mt-28 border-t border-border-grey"
                onMouseEnter={() => setTarget(atlasCase.id)}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`${atlasCase.id}-detail`}
                  onClick={() => toggle(atlasCase.id)}
                  onFocus={() => setTarget(atlasCase.id)}
                  onBlur={() => setTarget(null)}
                  className="group grid w-full grid-cols-[2.5rem_1fr_1.5rem] items-baseline gap-x-3 py-4 text-left outline-none"
                >
                  <span className={`${cormorant.className} text-xl ${active ? "text-accent" : "text-text-muted"}`}>
                    {number(index)}
                  </span>
                  <span>
                    <span
                      className={`${cormorant.className} block text-xl leading-tight transition-colors group-hover:text-accent group-focus-visible:text-accent ${
                        active ? "text-accent" : "text-white"
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
                  <span
                    aria-hidden="true"
                    className={`justify-self-end text-lg leading-none transition-transform ${
                      isOpen ? "rotate-45 text-accent" : "text-text-muted"
                    }`}
                  >
                    +
                  </span>
                </button>
                <div id={`${atlasCase.id}-detail`} hidden={!isOpen} className="pb-12 pt-2">
                  <AtlasCaseDetail atlasCase={atlasCase} variant="list" analyticsLocation="research_atlas" />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
