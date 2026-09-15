import type { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";
import ContactPage from "@/components/ContactPage";

export const metadata: Metadata = {
  title: { absolute: "Contact Bakamo | Social Intelligence Research" },
  description:
    "Book a 30-minute demo with Bakamo, or email info@bakamosocial.com. Offices in New Jersey, London, Dortmund, Budapest and Kuala Lumpur.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: pageOpenGraph(
    "/contact",
    "Contact Bakamo | Social Intelligence Research",
    "Book a 30-minute demo with Bakamo, or email info@bakamosocial.com. Offices in New Jersey, London, Dortmund, Budapest and Kuala Lumpur.",
  ),
};

export default function Contact() {
  return (
    <main className="relative w-full min-h-screen bg-near-black overflow-x-hidden">
      <ContactPage />
    </main>
  );
}
