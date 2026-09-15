"use client";

import { Cormorant_Garamond } from "next/font/google";
import { useCallback, useEffect, useRef, useState } from "react";
import { getPageType, trackEvent } from "@/lib/analytics";
import { BOOKING_ANCHOR, BOOKING_HREF, BOOKING_LOBBY_URL, BOOKING_MINUTES } from "@/lib/booking";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

const EMBED_SCRIPT_URL = "https://ro.am/lobbylinks/embed.js";
const DEFAULT_FRAME_HEIGHT = 680;
// Roam's embed waits for its iframe to connect and has no timeout of its own.
const CONNECT_TIMEOUT_MS = 20000;

type RoamLobbyEmbedOptions = {
  url: string;
  parentElement: HTMLElement;
  theme?: "dark" | "light";
  accentColor?: string;
  lobbyConfiguration?: "default" | "booking_only" | "drop_in_button";
  onDateTimeSelected?: (lobbyId: string, payload: unknown) => void;
  onEventScheduled?: (lobbyId: string, payload: unknown) => void;
  onSizeChange?: (width: number, height: number) => void;
};

declare global {
  interface Window {
    Roam?: { initLobbyEmbed: (options: RoamLobbyEmbedOptions) => Promise<void> };
  }
}

let embedScript: Promise<void> | null = null;

function loadEmbedScript(): Promise<void> {
  if (window.Roam) return Promise.resolve();
  if (!embedScript) {
    embedScript = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = EMBED_SCRIPT_URL;
      script.async = true;
      script.onload = () => (window.Roam ? resolve() : reject(new Error("Roam embed unavailable")));
      script.onerror = () => {
        embedScript = null;
        reject(new Error("Roam embed failed to load"));
      };
      document.head.appendChild(script);
    });
  }
  return embedScript;
}

// Any link to #book-a-demo (e.g. /contact#book-a-demo) or element marked with
// data-booking-trigger opens the modal instead of navigating. Without
// JavaScript the link still lands on the booking section of /contact.
const TRIGGER_SELECTOR = `[data-booking-trigger], a[href$="#${BOOKING_ANCHOR}"]`;

type EmbedStatus = "idle" | "loading" | "ready" | "booked" | "failed";

/**
 * Site-wide "Book a demo" layer. Roam's calendar is loaded the first time the
 * visitor opens it, never on a plain page view. Roam's callbacks also pass the
 * booker's name, email and note; none of that reaches analytics.
 */
export default function BookingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<EmbedStatus>("idle");
  const [frameHeight, setFrameHeight] = useState<number | null>(null);
  const embedRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const embedStarted = useRef(false);

  const startEmbed = useCallback(() => {
    if (embedStarted.current) return;
    embedStarted.current = true;
    setStatus("loading");

    loadEmbedScript()
      .then(() => {
        const parent = embedRef.current;
        if (!parent || !window.Roam) throw new Error("Booking container missing");

        const connected = window.Roam.initLobbyEmbed({
          url: BOOKING_LOBBY_URL,
          parentElement: parent,
          theme: "dark",
          accentColor: "#c9a96e",
          lobbyConfiguration: "booking_only",
          onDateTimeSelected: () => {
            trackEvent("booking_time_selected", {
              booking_tool: "roam",
              page_type: getPageType(window.location.pathname),
            });
          },
          onEventScheduled: () => {
            const pageType = getPageType(window.location.pathname);
            trackEvent("generate_lead", {
              contact_method: "booking",
              booking_tool: "roam",
              lead_source: pageType,
              page_type: pageType,
              location: "booking_modal",
            });
            setStatus("booked");
          },
          onSizeChange: (_width, height) => {
            if (height > 0) setFrameHeight(height);
          },
        });
        connected.catch(() => undefined);
        // The iframe is appended before Roam starts waiting for it to connect.
        parent.querySelector("iframe")?.setAttribute("title", "Book a demo with Bakamo");

        return Promise.race([
          connected,
          new Promise<never>((_, reject) =>
            window.setTimeout(() => reject(new Error("Roam embed timed out")), CONNECT_TIMEOUT_MS),
          ),
        ]);
      })
      .then(() => {
        setStatus((current) => (current === "booked" ? current : "ready"));
      })
      .catch(() => {
        embedRef.current?.replaceChildren();
        embedStarted.current = false;
        setStatus("failed");
      });
  }, []);

  const open = useCallback(
    (trigger?: HTMLElement | null) => {
      returnFocusRef.current = trigger ?? (document.activeElement as HTMLElement | null);
      setIsOpen(true);
      startEmbed();
    },
    [startEmbed],
  );

  const close = useCallback(() => {
    setIsOpen(false);
    if (window.location.hash === `#${BOOKING_ANCHOR}`) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }, []);

  // Open from any booking trigger or link, and from a #book-a-demo URL.
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const trigger = target.closest(TRIGGER_SELECTOR) as HTMLElement | null;
      if (!trigger) return;
      event.preventDefault();
      open(trigger);
    };

    const openFromHash = () => {
      if (window.location.hash === `#${BOOKING_ANCHOR}`) {
        trackEvent("book_demo_click", {
          location: "url_hash",
          destination: BOOKING_HREF,
          page_type: getPageType(window.location.pathname),
        });
        window.setTimeout(() => open(null), 0);
      }
    };

    document.addEventListener("click", handleClick, true);
    window.addEventListener("hashchange", openFromHash);
    openFromHash();
    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("hashchange", openFromHash);
    };
  }, [open]);

  // While open: make the page behind inert (keeps keyboard focus in the dialog),
  // lock scrolling, focus the close button, and close on Escape or browser Back.
  useEffect(() => {
    if (!isOpen) return;
    const background = Array.from(document.body.children).filter(
      (element) => element !== overlayRef.current && !element.hasAttribute("inert"),
    );
    background.forEach((element) => element.setAttribute("inert", ""));
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    const handlePopState = () => setIsOpen(false);
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("popstate", handlePopState);
    return () => {
      background.forEach((element) => element.removeAttribute("inert"));
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("popstate", handlePopState);
      if (returnFocusRef.current?.isConnected) returnFocusRef.current.focus();
    };
  }, [isOpen, close]);

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-[70] items-end justify-center bg-black/75 backdrop-blur-sm sm:items-center sm:p-6 ${
        isOpen ? "flex" : "hidden"
      }`}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        className="flex max-h-[100dvh] w-full flex-col overflow-hidden rounded-t-[1.5rem] border border-white/10 bg-near-black shadow-[0_32px_120px_rgba(0,0,0,0.6)] sm:max-h-[92dvh] sm:max-w-[820px] sm:rounded-[1.75rem]"
      >
        <div className="flex items-start justify-between gap-6 border-b border-white/10 px-6 py-5 sm:px-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-accent">Book a demo</p>
            <h2
              id="booking-modal-title"
              className={`${cormorant.className} mt-2 text-2xl leading-tight text-white sm:text-3xl`}
            >
              {BOOKING_MINUTES} minutes with Daniel Fazekas
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Close booking"
            className="-mr-2 flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-text-secondary transition-colors hover:bg-white/5 hover:text-white"
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          {status === "loading" ? (
            <p role="status" className="px-6 pt-6 text-sm text-text-secondary sm:px-8">
              Loading the booking calendar&hellip;
            </p>
          ) : null}
          {status === "booked" ? (
            <p role="status" className="px-6 pt-6 text-sm text-white sm:px-8">
              Your demo is booked. Check your inbox for the calendar invitation.
            </p>
          ) : null}
          {status === "failed" ? (
            <p role="alert" className="px-6 py-8 text-sm leading-relaxed text-text-secondary sm:px-8">
              The booking calendar did not load.{" "}
              <a
                href={BOOKING_LOBBY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline-offset-4 hover:underline"
                data-analytics-event="book_demo_click"
                data-analytics-label="Open booking on Roam"
                data-analytics-location="booking_modal_fallback"
                data-analytics-destination="roam_lobby"
              >
                Open it on Roam
              </a>{" "}
              or email{" "}
              <a
                href="mailto:info@bakamosocial.com"
                className="text-accent underline-offset-4 hover:underline"
                data-analytics-event="contact_click"
                data-analytics-label="Booking fallback email"
                data-analytics-location="booking_modal_fallback"
                data-analytics-contact-method="email"
              >
                info@bakamosocial.com
              </a>
              .
            </p>
          ) : null}
          <div
            ref={embedRef}
            className="w-full [&_iframe]:block [&_iframe]:h-full [&_iframe]:w-full [&_iframe]:border-0"
            style={status === "failed" ? { height: 0 } : { height: frameHeight ?? DEFAULT_FRAME_HEIGHT }}
          />
        </div>

        <p className="border-t border-white/10 px-6 py-3 text-xs leading-relaxed text-text-muted sm:px-8">
          Bookings are handled by Roam, which receives the details you enter.{" "}
          <a
            href="/privacy#bookings"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent underline-offset-4 hover:underline"
          >
            Privacy policy
          </a>
        </p>
      </div>
    </div>
  );
}
