import type { Metadata } from "next";
import { BOOKING_MINUTES } from "@/lib/booking";
import { pageOpenGraph } from "@/lib/seo";

const DESCRIPTION = `Tell us about the study, the tracker or the brief you are about to commit to. Book a ${BOOKING_MINUTES}-minute meeting with Bakamo, or email info@bakamosocial.com. Offices in New Jersey, London, Dortmund, Budapest and Kuala Lumpur.`;
import ContactPage from "@/components/ContactPage";

export const metadata: Metadata = {
  title: { absolute: "Contact Bakamo | What Is Your Research Not Asking?" },
  description:
    DESCRIPTION,
  alternates: {
    canonical: "/contact",
  },
  openGraph: pageOpenGraph(
    "/contact",
    "Contact Bakamo | What Is Your Research Not Asking?",
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
