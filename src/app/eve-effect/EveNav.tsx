"use client";

import { useEffect, useState } from "react";
import { SECTIONS } from "./content";

/**
 * The micro site's own navigation: a sticky row of section links under the
 * site header. The current section is tracked with an IntersectionObserver.
 */
export default function EveNav() {
  const [active, setActive] = useState(SECTIONS[0].id);

  // Sit under the main nav wherever it actually is. It hides on scroll down
  // and returns on scroll up, so its bottom edge is read on every scroll and
  // again when its transition ends.
  const [headerBottom, setHeaderBottom] = useState(64);
  useEffect(() => {
    const header = document.querySelector('nav[aria-label="Main"]');
    if (!header) return;
    let frame = 0;
    const read = () => {
      frame = 0;
      setHeaderBottom(Math.max(0, Math.round(header.getBoundingClientRect().bottom)));
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    header.addEventListener("transitionend", schedule);
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      header.removeEventListener("transitionend", schedule);
    };
  }, []);

  useEffect(() => {
    const elements = SECTIONS.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => !!el);
    if (elements.length === 0) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.boundingClientRect.top);
          else visible.delete(entry.target.id);
        }
        if (visible.size === 0) return;
        // The visible section closest to the top of the viewport is current.
        let bestId = active;
        let bestTop = Number.POSITIVE_INFINITY;
        for (const [id, top] of visible) {
          const distance = Math.abs(top);
          if (distance < bestTop) {
            bestTop = distance;
            bestId = id;
          }
        }
        setActive(bestId);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.1, 0.5, 1] },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav
      aria-label="EVE Effect sections"
      className="sticky z-40 border-b border-border-grey/60 bg-near-black/85 backdrop-blur-md"
      style={{ top: headerBottom }}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-6 overflow-x-auto px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <a
          href="#front"
          className="shrink-0 py-3 text-xs uppercase tracking-[0.22em] text-accent transition-colors hover:text-white"
          data-analytics-event="nav_click"
          data-analytics-label="EVE Effect"
          data-analytics-location="eve_subnav"
          data-analytics-destination="#front"
        >
          EVE Effect
        </a>
        <span aria-hidden="true" className="h-4 w-px shrink-0 bg-border-grey" />
        <ul className="flex items-center gap-5">
          {SECTIONS.filter((s) => s.id !== "front").map((section) => {
            const current = active === section.id;
            return (
              <li key={section.id} className="shrink-0">
                <a
                  href={`#${section.id}`}
                  aria-current={current ? "location" : undefined}
                  className={`block py-3 text-xs uppercase tracking-[0.16em] transition-colors hover:text-white ${
                    current ? "text-white" : "text-text-muted"
                  }`}
                  data-analytics-event="nav_click"
                  data-analytics-label={section.label}
                  data-analytics-location="eve_subnav"
                  data-analytics-destination={`#${section.id}`}
                >
                  {section.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
