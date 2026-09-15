import type { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";
import ContactPage from "@/components/ContactPage";

export const metadata: Metadata = {
  title: { absolute: "Contact Bakamo | Social Intelligence Research" },
  description:
    "Talk to Bakamo about social intelligence research. Offices in New Jersey, London, Dortmund, Budapest and Kuala Lumpur. Email info@bakamosocial.com.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: pageOpenGraph(
    "/contact",
    "Contact Bakamo | Social Intelligence Research",
    "Talk to Bakamo about social intelligence research. Offices in New Jersey, London, Dortmund, Budapest and Kuala Lumpur. Email info@bakamosocial.com.",
  ),
};

export default function Contact() {
  return (
    <main className="relative w-full min-h-screen bg-near-black overflow-x-hidden">
      <ContactPage />
    </main>
  );
}
