import Link from "next/link";
import CookieSettingsButton from "@/components/CookieSettingsButton";
import CurrentYear from "@/components/CurrentYear";

const FOOTER_LINKS = [
  { label: "About", href: "/about" },
  { label: "Our Method", href: "/our-method" },
  { label: "Technology", href: "/technology" },
  { label: "Election Research", href: "/elections" },
  { label: "Migration Research", href: "/migration" },
  { label: "Insights", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Privacy", href: "/privacy" },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-border-grey px-6 py-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-white">Bakamo</p>
          <p className="mt-2 text-sm text-text-muted">Build on reality.</p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-3 text-xs uppercase tracking-[0.14em] text-text-muted">
          {FOOTER_LINKS.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-white">
              {item.label}
            </Link>
          ))}
          <CookieSettingsButton className="uppercase tracking-[0.14em] transition-colors hover:text-white" />
        </nav>

        <p className="text-xs text-text-muted">
          &copy; <CurrentYear /> Bakamo. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
