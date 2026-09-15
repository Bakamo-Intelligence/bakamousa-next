"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Our Method", href: "/our-method" },
  { label: "Technology", href: "/technology" },
  { label: "Research", href: "/research" },
  { label: "Contact", href: "/contact" },
];

const LOGIN_URL = "https://tensionscope-frontend-47czdwwjxa-uc.a.run.app/login";

const MENU_ID = "site-navigation-menu";

// Tailwind's `md` breakpoint. The menu only exists below it: with six items the
// desktop row no longer fits between `sm` (640px) and `md` (768px).
const DESKTOP_QUERY = "(min-width: 48rem)";

function isCurrentPath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function SiteNavigation() {
  const pathname = usePathname() || "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPathname, setMenuPathname] = useState(pathname);
  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  // Close the menu on any route change, including back and forward.
  if (menuPathname !== pathname) {
    setMenuPathname(pathname);
    setMenuOpen(false);
  }

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 50);
      if (y > lastScrollY.current && y > 100) setIsHidden(true);
      else setIsHidden(false);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "expo.out", delay: 0.2 }
      );
    });
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const focusWasInMenu = menuPanelRef.current?.contains(document.activeElement);
      setMenuOpen(false);
      if (focusWasInMenu) menuButtonRef.current?.focus();
    };

    // Focus leaving the navigation (Tab past the last item) closes the menu,
    // so the panel never sits over the element that has focus.
    const handleFocusIn = (event: FocusEvent) => {
      if (event.target instanceof Node && !navRef.current?.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    const desktop = window.matchMedia(DESKTOP_QUERY);
    const handleBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) setMenuOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("focusin", handleFocusIn);
    desktop.addEventListener("change", handleBreakpoint);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("focusin", handleFocusIn);
      desktop.removeEventListener("change", handleBreakpoint);
    };
  }, [menuOpen]);

  const barBackground = menuOpen
    ? "bg-near-black border-b border-border-grey/50"
    : isScrolled
      ? "bg-near-black/80 backdrop-blur-md border-b border-border-grey/50"
      : "bg-transparent";

  return (
    <nav
      ref={navRef}
      aria-label="Main"
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${barBackground} ${
        isHidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            onClick={closeMenu}
            className="flex min-h-12 items-center text-sm font-light tracking-[0.25em] text-white transition-colors hover:text-accent md:block md:min-h-0"
            data-analytics-event="nav_click"
            data-analytics-label="Bakamo Home"
            data-analytics-location="top_nav"
            data-analytics-destination="/"
          >
            BAKAMO
          </Link>

          {/* Desktop: the full row of links. */}
          <div className="hidden items-center gap-6 md:flex lg:gap-8">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isCurrentPath(pathname, item.href) ? "page" : undefined}
                className={`text-xs uppercase tracking-[0.15em] transition-colors hover:text-white ${
                  item.href === "/contact" ? "text-accent" : "text-text-muted"
                }`}
                data-analytics-event="nav_click"
                data-analytics-label={item.label}
                data-analytics-location="top_nav"
                data-analytics-destination={item.href}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={LOGIN_URL}
              className="rounded-sm border border-accent/40 px-3 py-1.5 text-xs uppercase tracking-[0.15em] text-accent transition-colors hover:border-accent hover:bg-accent/10"
              data-analytics-event="nav_click"
              data-analytics-label="Log in"
              data-analytics-location="top_nav"
              data-analytics-destination="reading-machine-login"
            >
              Log in
            </a>
          </div>

          {/* Mobile: Contact stays one tap away; everything else is in the menu. */}
          <div className="-mr-2 flex items-center gap-1 md:hidden">
            <Link
              href="/contact"
              onClick={closeMenu}
              aria-current={isCurrentPath(pathname, "/contact") ? "page" : undefined}
              className="flex min-h-12 items-center px-2 text-xs uppercase tracking-[0.15em] text-accent transition-colors hover:text-white"
              data-analytics-event="nav_click"
              data-analytics-label="Contact"
              data-analytics-location="top_nav"
              data-analytics-destination="/contact"
            >
              Contact
            </Link>
            <button
              ref={menuButtonRef}
              type="button"
              aria-expanded={menuOpen}
              aria-controls={MENU_ID}
              onClick={() => setMenuOpen((open) => !open)}
              className="flex min-h-12 items-center gap-2.5 px-2 text-xs uppercase tracking-[0.15em] text-text-primary transition-colors hover:text-accent"
            >
              Menu
              <span aria-hidden="true" className="relative block h-[9px] w-4">
                <span
                  className={`absolute left-0 top-0 h-px w-full bg-current transition-transform duration-300 motion-reduce:transition-none ${
                    menuOpen ? "translate-y-1 rotate-45" : ""
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-300 motion-reduce:transition-none ${
                    menuOpen ? "-translate-y-1 -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu: dims the page and lists every destination at a readable size. */}
      <div
        aria-hidden="true"
        onClick={closeMenu}
        className={`absolute inset-x-0 top-full h-[100dvh] bg-black/60 transition-[opacity,visibility] duration-300 motion-reduce:transition-none md:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />
      <div
        id={MENU_ID}
        ref={menuPanelRef}
        className={`absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-y border-border-grey bg-near-black transition-[opacity,translate,visibility] duration-300 ease-out motion-reduce:transition-none md:hidden ${
          menuOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <ul className="px-4 pt-2 sm:px-6">
          {NAV_LINKS.map((item) => {
            const current = isCurrentPath(pathname, item.href);
            return (
              <li key={item.href} className="border-b border-border-grey">
                <Link
                  href={item.href}
                  onClick={closeMenu}
                  aria-current={current ? "page" : undefined}
                  className={`flex min-h-14 items-center text-base uppercase tracking-[0.12em] transition-colors hover:text-white ${
                    item.href === "/contact"
                      ? "text-accent"
                      : current
                        ? "text-white"
                        : "text-text-secondary"
                  }`}
                  data-analytics-event="nav_click"
                  data-analytics-label={item.label}
                  data-analytics-location="mobile_menu"
                  data-analytics-destination={item.href}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="px-4 pb-6 pt-5 sm:px-6">
          <a
            href={LOGIN_URL}
            onClick={closeMenu}
            className="flex min-h-12 items-center justify-center rounded-sm border border-accent/40 text-base uppercase tracking-[0.12em] text-accent transition-colors hover:border-accent hover:bg-accent/10"
            data-analytics-event="nav_click"
            data-analytics-label="Log in"
            data-analytics-location="mobile_menu"
            data-analytics-destination="reading-machine-login"
          >
            Log in
          </a>
        </div>
      </div>
    </nav>
  );
}
