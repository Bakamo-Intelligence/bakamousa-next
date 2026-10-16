/**
 * Copy for the What we do page: each product with the client questions it
 * answers. Proposed October 2026, pending the team's sign-off. Product names
 * and questions come from products.ts; everything else lives here so the
 * other pages that list the products are untouched until this is approved.
 */

export type ProductBlock = {
  id: string;
  /** When to use it, in one or two plain sentences. */
  purpose: string;
  /** The client questions this product answers. */
  answers: string[];
  /** What is delivered, one item per line. */
  receive: string[];
  /** The big figure and its unit. */
  figure: string;
  unit: string;
  /** The line under the figure. */
  report?: string;
};

export const PRODUCT_BLOCKS: ProductBlock[] = [
  {
    id: "agenda",
    purpose:
      "A first map of the conversation when you have days, not weeks. A crisis, an announcement, a launch that has just happened.",
    answers: ["Issue and crisis response", "How a launch or announcement landed"],
    receive: [
      "The topics people are discussing, sized by how much of the conversation each takes.",
      "The largest topics in people's own words.",
      "What we did not expect to find.",
      "A 30-minute call to go through it.",
    ],
    figure: "48",
    unit: "hours to the report",
  },
  {
    id: "frames",
    purpose:
      "Before you write a survey, a brief or a position. You learn which stories people tell about the subject, where they disagree, and which stories are growing.",
    answers: [
      "Discovery before survey design",
      "Category landscape and innovation territories",
      "Narrative landscape and public debate",
      "What a launch or announcement will land in, read before the date",
    ],
    receive: [
      "A chapter on each narrative.",
      "The tensions between them.",
      "An outlook with dated predictions.",
      "The words people use and the hypotheses to test in a survey.",
      "A 60-minute readout.",
    ],
    figure: "1",
    unit: "week to first learnings",
    report: "Report in three weeks",
  },
  {
    id: "publics",
    purpose:
      "When you need to know who holds each narrative and how your brand sits among them. Who to speak to, what people hold for you and against you, and the posts that show it.",
    answers: [
      "Brand positioning and the competitive landscape",
      "Personas and hard-to-reach audiences",
      "Consumer and patient journeys",
    ],
    receive: [
      "Everything in Frames.",
      "A card for each persona: who they are, what they say, what drives them.",
      "Your brand's footprint against up to three competitors, with the posts behind each placement.",
      "A 90-minute readout.",
    ],
    figure: "2",
    unit: "weeks to first learnings",
    report: "Report in five weeks",
  },
  {
    id: "common-sense",
    purpose:
      "When a strategy, a policy or a campaign has to rest on what people already believe. The beliefs nobody states because everyone shares them, read market by market, with your own questions put to the whole conversation.",
    answers: [
      "The foundations of a strategy, a policy or a positioning",
      "Discovery before survey design, when you need the full questionnaire",
    ],
    receive: [
      "Everything in Publics, for each market.",
      "Your strategic questions answered from the conversation.",
      "A one-day workshop with your team.",
      "A hand-off pack with the survey questions that measure what we found.",
      "Three deep dives on topics you choose.",
    ],
    figure: "2",
    unit: "weeks to first learnings",
    report: "Report in seven weeks per market",
  },
  {
    id: "public-mood",
    purpose:
      "After any study, when you want to keep watching. The same narratives, tensions and personas are read again every month, so a shift shows months before a tracker explains it.",
    answers: ["Tracking and monitoring"],
    receive: [
      "A monthly report in the framework of your study.",
      "Your brand against competitors, month on month.",
      "A dated prediction each month, with the record of the earlier ones.",
      "A 30-minute call.",
      "A quarterly deep dive.",
    ],
    figure: "1",
    unit: "reading every month",
    report: "Six-month minimum",
  },
];

export const ALSO_COMMISSIONED =
  "Evidence for litigation and regulatory proceedings, and campaign evaluation, are scoped from Frames or Publics.";
