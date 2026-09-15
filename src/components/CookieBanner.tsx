"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { disableAnalytics, enableAnalytics } from "@/lib/analytics";

const CONSENT_KEY = "bakamo_consent";
const CONSENT_CHANGE_EVENT = "bakamo_consent_change";
export const CONSENT_OPEN_EVENT = "bakamo_consent_open";

type Consent = "accepted" | "declined" | "unset";

// Browsers that block storage (common on locked-down corporate machines) throw
// on localStorage access; fall back to remembering the choice for this page view.
let memoryConsent: Consent = "unset";

function readConsent(): Consent {
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    return stored === "accepted" || stored === "declined" ? stored : "unset";
  } catch {
    return memoryConsent;
  }
}

function writeConsent(value: Exclude<Consent, "unset">) {
  memoryConsent = value;
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Storage blocked: the in-memory value above still applies until reload.
  }
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

function subscribeToConsent(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(CONSENT_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CONSENT_CHANGE_EVENT, callback);
  };
}

function getServerConsentSnapshot() {
  return "loading";
}

export default function CookieBanner() {
  const consent = useSyncExternalStore(subscribeToConsent, readConsent, getServerConsentSnapshot);
  const [reopened, setReopened] = useState(false);
  const visible = consent === "unset" || reopened;

  useEffect(() => {
    if (consent === "accepted") {
      enableAnalytics();
    } else if (consent === "declined") {
      disableAnalytics();
    }
  }, [consent]);

  useEffect(() => {
    const open = () => setReopened(true);
    window.addEventListener(CONSENT_OPEN_EVENT, open);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, open);
  }, []);

  function accept() {
    writeConsent("accepted");
    enableAnalytics();
    setReopened(false);
  }

  function decline() {
    writeConsent("declined");
    disableAnalytics();
    setReopened(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-4 sm:px-6"
    >
      <div
        className="mx-auto max-w-5xl rounded-[1.25rem] border border-white/10 px-6 py-5 shadow-[0_-8px_40px_rgba(0,0,0,0.5)]"
        style={{
          background:
            "linear-gradient(135deg, rgba(20,20,20,0.97), rgba(10,10,10,0.99))",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-light leading-relaxed text-text-secondary max-w-2xl">
            We use analytics cookies to understand how visitors use our site —
            no advertising, no third-party sharing.{" "}
            <a
              href="/privacy"
              className="text-accent underline-offset-2 hover:underline"
            >
              Privacy policy
            </a>
            .
          </p>

          <div className="flex shrink-0 items-center gap-3">
            <button
              onClick={decline}
              className="rounded-full border border-white/15 px-5 py-2 text-xs uppercase tracking-[0.16em] text-text-secondary transition-colors hover:border-white/30 hover:text-white"
            >
              Decline
            </button>
            <button
              onClick={accept}
              className="cta-button text-xs"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
