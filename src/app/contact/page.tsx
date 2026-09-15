import type { Metadata } from "next";
import { BOOKING_MINUTES } from "@/lib/booking";
import { pageOpenGraph } from "@/lib/seo";

const DESCRIPTION = `Book a ${BOOKING_MINUTES}-minute demo with Bakamo, or email info@bakamosocial.com. Offices in New Jersey, London, Dortmund, Budapest and Kuala Lumpur.`;
import ContactPage from "@/components/ContactPage";

export const metadata: Metadata = {
  title: { absolute: "Contact Bakamo | Social Intelligence Research" },
  description:
    DESCRIPTION,
  alternates: {
    canonical: "/contact",
  },
  openGraph: pageOpenGraph(
    "/contact",
    "Contact Bakamo | Social Intelligence Research",
    DESCRIPTION,
  ),
};

export default function Contact() {
  return (
    <main className="relative w-full min-h-screen bg-near-black overflow-x-hidden">
      <ContactPage />
    </main>
  );
}
