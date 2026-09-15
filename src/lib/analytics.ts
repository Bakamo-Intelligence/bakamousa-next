type SearchParamLike = { toString(): string } | null | undefined;

export type AnalyticsValue = string | number | boolean;
export type AnalyticsPayload = Record<string, AnalyticsValue | undefined>;

const PAGE_TYPE_PATTERNS = [
  { pattern: /^\/$/, type: "home" },
  { pattern: /^\/about(?:\/|$)/, type: "about" },
  { pattern: /^\/blog(?:\/|$)/, type: "blog" },
  { pattern: /^\/contact(?:\/|$)/, type: "contact" },
  { pattern: /^\/elections(?:\/|$)/, type: "elections" },
  { pattern: /^\/migration(?:\/|$)/, type: "migration" },
  { pattern: /^\/our-method(?:\/|$)/, type: "our_method" },
  { pattern: /^\/privacy(?:\/|$)/, type: "privacy" },
  { pattern: /^\/technology(?:\/|$)/, type: "technology" },
];

export function buildPagePath(pathname: string, searchParams: SearchParamLike): string {
  const search = searchParams?.toString();
  return search ? `${pathname}?${search}` : pathname;
}

export function getPageType(pathname: string): string {
  const matchedPage = PAGE_TYPE_PATTERNS.find(({ pattern }) => pattern.test(pathname));
  return matchedPage?.type ?? "site_page";
}

/**
 * GA4 is loaded directly (no Tag Manager) and only after the visitor accepts
 * analytics cookies. Set NEXT_PUBLIC_GA_ID to override, or to "" to disable.
 * Development builds never load it.
 */
export const GA_MEASUREMENT_ID =
  process.env.NODE_ENV === "production" ? (process.env.NEXT_PUBLIC_GA_ID ?? "G-L84VKCB2WZ") : "";

type ConsentState = "unknown" | "granted" | "denied";
type QueuedEvent = [string, Record<string, AnalyticsValue>];
type GtagWindow = Window & Record<string, unknown>;

// Events that happen before the visitor has chosen are held in memory and only
// sent if they accept; declining discards them. Each keeps the page it happened
// on, because gtag.js would otherwise attribute it to the page where they accept.
const MAX_QUEUED_EVENTS = 50;
let consentState: ConsentState = "unknown";
let gtagInitialised = false;
const queuedEvents: QueuedEvent[] = [];

export function trackEvent(eventName: string, payload: AnalyticsPayload = {}): void {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID || consentState === "denied") {
    return;
  }

  const cleanPayload = Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined && value !== "")
  ) as Record<string, AnalyticsValue>;

  const analyticsWindow = window as unknown as GtagWindow;
  if (consentState === "granted" && analyticsWindow.gtag) {
    analyticsWindow.gtag("event", eventName, cleanPayload);
    return;
  }

  if (queuedEvents.length >= MAX_QUEUED_EVENTS) {
    queuedEvents.shift();
  }
  queuedEvents.push([
    eventName,
    { page_location: window.location.href, page_title: document.title, ...cleanPayload },
  ]);
}

export function enableAnalytics(): void {
  if (typeof window === "undefined" || !GA_MEASUREMENT_ID) {
    return;
  }

  const analyticsWindow = window as unknown as GtagWindow;
  analyticsWindow[`ga-disable-${GA_MEASUREMENT_ID}`] = false;
  consentState = "granted";

  if (!gtagInitialised) {
    analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
    analyticsWindow.gtag = function gtag() {
      // gtag.js expects the arguments object itself, not an array copy.
      // eslint-disable-next-line prefer-rest-params
      analyticsWindow.dataLayer!.push(arguments);
    };
    analyticsWindow.gtag("js", new Date());
    analyticsWindow.gtag("config", GA_MEASUREMENT_ID);

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
    document.head.appendChild(script);
    gtagInitialised = true;
  }

  queuedEvents.splice(0).forEach(([eventName, payload]) => {
    analyticsWindow.gtag?.("event", eventName, payload);
  });
}

export function disableAnalytics(): void {
  consentState = "denied";
  queuedEvents.length = 0;

  if (typeof window === "undefined" || !GA_MEASUREMENT_ID) {
    return;
  }

  (window as unknown as GtagWindow)[`ga-disable-${GA_MEASUREMENT_ID}`] = true;
  clearAnalyticsCookies();
}

function clearAnalyticsCookies(): void {
  const hostname = window.location.hostname;
  const labels = hostname.split(".");
  const domains = new Set(["", hostname, `.${hostname}`]);
  for (let i = labels.length - 2; i >= 0; i -= 1) {
    domains.add(`.${labels.slice(i).join(".")}`);
  }

  document.cookie.split(";").forEach((cookie) => {
    const name = cookie.split("=")[0]?.trim();
    if (!name || !(name === "_ga" || name.startsWith("_ga_") || name === "_gid")) {
      return;
    }
    domains.forEach((domain) => {
      const domainAttribute = domain ? `; domain=${domain}` : "";
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${domainAttribute}`;
    });
  });
}

export function throttle<T extends (...args: never[]) => void>(
  callback: T,
  waitMs: number
): T {
  let lastRunAt = 0;

  return ((...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastRunAt < waitMs) {
      return;
    }

    lastRunAt = now;
    callback(...args);
  }) as T;
}

export function getAnalyticsPayloadFromDataset(element: HTMLElement): Record<string, string> {
  return Object.entries(element.dataset).reduce<Record<string, string>>((payload, [key, value]) => {
    if (!value || !key.startsWith("analytics") || key === "analyticsEvent") {
      return payload;
    }

    const payloadKey = datasetKeyToPayloadKey(key);
    payload[payloadKey] = value;
    return payload;
  }, {});
}

function datasetKeyToPayloadKey(key: string): string {
  const strippedKey = key.replace(/^analytics/, "");
  const normalizedKey = strippedKey.charAt(0).toLowerCase() + strippedKey.slice(1);

  return normalizedKey.replace(/[A-Z]/g, (character) => `_${character.toLowerCase()}`);
}
