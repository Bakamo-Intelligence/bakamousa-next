export type Product = {
  id: string;
  name: string;
  question: string;
  /** What they receive. */
  summary: string;
  /** When the first learnings reach the client. */
  firstFindings: string;
  /** When the report lands. */
  timing: string;
};

/** One line on every product card. */
export const READING_MACHINE_LINE = "Reads the whole conversation, not a sample. Every finding carries its posts.";

// Four depths of the same reading, and ongoing tracking. No prices here: those sit in the proposal.
export const PRODUCTS: Product[] = [
  {
    id: "agenda",
    name: "Agenda",
    question: "What are people talking about right now?",
    summary: "The topics in the conversation, sized by share of conversation, and a 30-minute call.",
    firstFindings: "48 hours",
    timing: "48 hours",
  },
  {
    id: "frames",
    name: "Frames",
    question: "Which stories do people tell about it, and where do they disagree?",
    summary:
      "The narratives in the conversation and the tensions between them, each with a dated hypothesis.",
    firstFindings: "1 week",
    timing: "3 weeks",
  },
  {
    id: "publics",
    name: "Publics",
    question: "Who are these people, and where do we stand with them?",
    summary:
      "Five to seven persona cards and a comparison of your brand with up to three competitors.",
    firstFindings: "2 weeks",
    timing: "5 weeks",
  },
  {
    id: "common-sense",
    name: "Common Sense",
    question: "What do people take for granted about this category?",
    summary:
      "Frames and Publics for each market, a one-day workshop and a survey questionnaire ready to field.",
    firstFindings: "2 weeks",
    timing: "7 weeks per market",
  },
  {
    id: "public-mood",
    name: "Public Mood",
    question: "What changed since last month?",
    summary:
      "A monthly report on what has shifted, what is new and what has faded, a monthly call and a deeper analysis each quarter.",
    firstFindings: "Every month",
    timing: "Monthly, six-month minimum",
  },
];
