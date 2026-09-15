import type { Metadata } from "next";
import { pageOpenGraph } from "@/lib/seo";
import ContactPage from "@/components/ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start the conversation with Bakamo. Offices in New Jersey, London, Dortmund, Budapest, and Kuala Lumpur.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: pageOpenGraph(
    "/contact",
    "Contact | Bakamo",
    "Start the conversation with Bakamo. Offices in New Jersey, London, Dortmund, Budapest, and Kuala Lumpur.",
  ),
};

export default function Contact() {
  return (
    <main className="relative w-full min-h-screen bg-near-black overflow-x-hidden">
      <ContactPage />
    </main>
  );
}
