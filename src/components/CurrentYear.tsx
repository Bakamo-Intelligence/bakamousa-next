"use client";

// Most pages are prerendered, so the year is filled in by the browser rather than
// frozen at build time.
export default function CurrentYear() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}
