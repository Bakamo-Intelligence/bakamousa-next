"use client";

import { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  buildPagePath,
  GA_MEASUREMENT_ID,
  getAnalyticsPayloadFromDataset,
  getPageType,
  throttle,
  trackEvent,
} from "@/lib/analytics";

const SCROLL_MILESTONES = [25, 50, 75, 90];

function AnalyticsRuntime() {
  const pathname = usePathname() || "/";
  const searchParams = useSearchParams();
  const pagePath = buildPagePath(pathname, searchParams);
  const pageType = getPageType(pathname);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const trackedElement = target.closest("[data-analytics-event]") as HTMLElement | null;
      if (!trackedElement) {
        return;
      }

      const eventName = trackedElement.dataset.analyticsEvent;
      if (!eventName) {
        return;
      }

      const payload = getAnalyticsPayloadFromDataset(trackedElement);
      const destination = payload.destination ?? trackedElement.getAttribute("href") ?? undefined;

      trackEvent(eventName, {
        destination,
        page_type: getPageType(window.location.pathname),
        ...payload,
      });
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  useEffect(() => {
    const loggedMilestones = new Set<number>();

    const handleScroll = throttle(() => {
      const totalScrollableDistance = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScrollableDistance <= 0) {
        return;
      }

      const currentDepth = Math.round((window.scrollY / totalScrollableDistance) * 100);

      SCROLL_MILESTONES.forEach((milestone) => {
        if (currentDepth < milestone || loggedMilestones.has(milestone)) {
          return;
        }

        loggedMilestones.add(milestone);
        trackEvent("scroll_depth", {
          depth_percentage: milestone,
          page_type: pageType,
        });
      });
    }, 200);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pagePath, pageType]);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    const seenSections = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const section = entry.target as HTMLElement;
          const sectionName = section.dataset.analyticsSection;
          if (!sectionName || seenSections.has(sectionName)) {
            return;
          }

          seenSections.add(sectionName);
          observer.unobserve(section);

          trackEvent("section_view", {
            page_type: pageType,
            ...getAnalyticsPayloadFromDataset(section),
          });
        });
      },
      {
        threshold: 0.35,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    const sections = document.querySelectorAll<HTMLElement>("[data-analytics-section]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [pagePath, pageType]);

  return null;
}

export default function AnalyticsInstrumentation() {
  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <AnalyticsRuntime />
    </Suspense>
  );
}