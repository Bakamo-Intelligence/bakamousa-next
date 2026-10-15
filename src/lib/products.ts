export type Product = {
  id: string;
  name: string;
  question: string;
  summary: string;
  /** When the first learnings reach the client. */
  firstFindings: string;
  /** When the report lands. */
  timing: string;
};

// Four depths of the same reading, and ongoing tracking. No prices here: those sit in the proposal.
export const PRODUCTS: Product[] = [
  {
    id: "pulse",
    firstFindings: "48 hours",
    name: "Pulse",
    question: "What is the conversation about right now?",
    summary: "A map of the whole conversation, sized by share, with the real posts behind every topic.",
    timing: "48 hours",
  },
  {
    id: "radar",
    firstFindings: "1 week",
    name: "Radar",
    question: "Which narratives and tensions govern it?",
    summary:
      "Pulse, plus why people talk about the subject the way they do: the narratives they use, the tensions underneath, and which are growing or fading.",
    timing: "3 weeks",
  },
  {
    id: "cast",
    firstFindings: "2 weeks",
    name: "Cast",
    question: "Who are these people, and where do we stand with them?",
    summary:
      "Radar, plus personas and brand footprint: which narratives and personas your brand lives among, against your competitors.",
    timing: "5 weeks",
  },
  {
    id: "bedrock",
    firstFindings: "2 weeks",
    name: "Bedrock",
    question: "What should our strategy be built on?",
    summary:
      "Cast, plus your own strategic questions read across every post, a workshop to choose territories, and a hand-off for survey design.",
    timing: "7 weeks per market",
  },
  {
    id: "clearing",
    firstFindings: "Every month",
    name: "The Clearing",
    question: "What changed since last month, and what is coming?",
    summary:
      "Any study from Radar up, re-read every month in the same framework, so changes show before they reach a tracker.",
    timing: "Monthly, in the same framework",
  },
];

export type ClientQuestion = {
  title: string;
  detail: string;
  outcome: string;
  products: string;
};

// The questions clients bring, the product that answers each, and what the answer is for.
export const CLIENT_QUESTIONS: ClientQuestion[] = [
  {
    title: "Discovery before survey design",
    detail:
      "The vocabulary, themes and hypotheses a questionnaire should be built on. Without it, the survey asks the wrong questions and produces confident but misleading numbers.",
    outcome: "A survey and a campaign built on what actually drives people.",
    products: "Radar, or Bedrock for the full questionnaire",
  },
  {
    title: "Category landscape and innovation territories",
    detail:
      "How a category lives in the conversation: the narratives, the tensions, the white spaces, and where it is heading.",
    outcome: "The territory to launch into, chosen on where demand already is.",
    products: "Radar, or Cast to add the people in each territory",
  },
  {
    title: "Brand positioning and competitive landscape",
    detail:
      "How people see your brand against competitors in their own terms, with the posts behind each placement. Counts included, so it sits beside your tracker.",
    outcome: "The position competitors cannot take, and the message that wins back those who drifted.",
    products: "Cast",
  },
  {
    title: "Personas and hard-to-reach audiences",
    detail:
      "Patients, caregivers, teenagers, migrants, the disengaged. Who they are and what drives them, in their own words, read from the places where they talk.",
    outcome: "A service, launch or campaign that reaches people surveys miss.",
    products: "Cast",
  },
  {
    title: "Narrative landscape and public debate",
    detail:
      "The dominant, emerging and residual narratives on an issue, who carries them, and which have taken root among ordinary people.",
    outcome: "Communication aimed at the narratives people actually hold.",
    products: "Radar, with The Clearing to keep watching",
  },
  {
    title: "Consumer and patient journey",
    detail:
      "The points in a decision where people move forward, stall or drop out, and what drives or blocks them at each.",
    outcome: "The point to intervene so fewer people stall or drop out.",
    products: "Cast, scoped to the journey",
  },
  {
    title: "Launch and announcement readiness",
    detail:
      "The narratives a launch, announcement or election will land in, read before the date. How it landed, read after.",
    outcome: "A launch that lands first time, with fewer corrections afterwards.",
    products: "Radar before, Pulse after",
  },
  {
    title: "Issue and crisis response",
    detail:
      "What people believe happened, how far it has spread and whether it is changing behaviour, within 48 hours.",
    outcome: "The right response, aimed at the story people actually believe.",
    products: "Pulse, then Radar",
  },
  {
    title: "Tracking and monitoring",
    detail:
      "The study's narratives, tensions and personas re-read every month. What changed, what is new, what faded.",
    outcome: "Budget moved and messages changed months before a tracker shows why.",
    products: "The Clearing",
  },
];
