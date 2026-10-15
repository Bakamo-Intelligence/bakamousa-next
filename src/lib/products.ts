export type Product = {
  id: string;
  name: string;
  question: string;
  /** What the client walks away able to do. */
  benefit: string;
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
    id: "pulse",
    name: "Pulse",
    question: "What is the conversation about right now?",
    benefit: "Decide what to say first, within two days, on a map of the whole conversation rather than a guess.",
    summary: "Topic map sized by share, the largest topics in people's own words, the unexpected findings, a 30-minute readout.",
    firstFindings: "48 hours",
    timing: "48 hours",
  },
  {
    id: "radar",
    name: "Radar",
    question: "Which narratives and tensions govern it?",
    benefit:
      "Write the survey, the brief or the position on the narratives people actually hold, and know which are growing before the tracker does.",
    summary:
      "A chapter per narrative, the tension sheet, an outlook with dated predictions, consumer vocabulary and hypotheses for survey design, a 60-minute readout.",
    firstFindings: "1 week",
    timing: "3 weeks",
  },
  {
    id: "cast",
    name: "Cast",
    question: "Who are these people, and where do we stand with them?",
    benefit:
      "Choose who to speak to and what to fix first, with the evidence to take to the agency and the counts to put beside the tracker.",
    summary:
      "Everything in Radar, persona cards, brand footprint against up to three competitors with the posts behind each placement, a 90-minute readout.",
    firstFindings: "2 weeks",
    timing: "5 weeks",
  },
  {
    id: "bedrock",
    name: "Bedrock",
    question: "What should our strategy be built on?",
    benefit:
      "Defend a strategy to a board or a minister on what the public already believes, and hand your research partner a questionnaire that measures it.",
    summary:
      "Everything in Cast per market, your questions as analytical lenses, a one-day workshop, the hand-off pack with survey questions, three deep dives.",
    firstFindings: "2 weeks",
    timing: "7 weeks per market",
  },
  {
    id: "clearing",
    name: "The Clearing",
    question: "What changed since last month, and what is coming?",
    benefit: "Move a budget or change a message months before the tracker shows why. Never be the one who didn't see it coming.",
    summary:
      "Monthly tracking report in the study's framework, your brand against competitors month on month, a dated prediction with its record, a 30-minute call, a quarterly deep dive.",
    firstFindings: "Every month",
    timing: "Monthly, six-month minimum",
  },
];

export type ClientQuestion = {
  title: string;
  detail: string;
  /** The benefit as the client hears it: the decision, the money or the argument. */
  outcome: string;
  products: string;
};

// The questions clients bring, the product that answers each, and what the answer lets them do.
export const CLIENT_QUESTIONS: ClientQuestion[] = [
  {
    title: "Discovery before survey design",
    detail:
      "The vocabulary, themes and hypotheses a questionnaire should be built on. Without it, the survey asks the wrong questions and produces confident but misleading numbers.",
    outcome:
      "Spend the survey budget measuring the right things. Walk into the questionnaire meeting knowing what people actually argue about.",
    products: "Radar, or Bedrock for the full questionnaire",
  },
  {
    title: "Category landscape and innovation territories",
    detail:
      "How a category lives in the conversation: the narratives, the tensions, the white spaces, and where it is heading.",
    outcome: "Choose where to launch on demand that already exists, with the evidence your board asks for.",
    products: "Radar, or Cast to add the people in each territory",
  },
  {
    title: "Brand positioning and competitive landscape",
    detail:
      "How people see your brand against competitors in their own terms, with the posts behind each placement. Counts included, so it sits beside your tracker.",
    outcome:
      "Know why a competitor wins people you thought were yours, and take the message to the agency with the posts to prove it.",
    products: "Cast",
  },
  {
    title: "Personas and hard-to-reach audiences",
    detail:
      "Patients, caregivers, teenagers, migrants, the disengaged. Who they are and what drives them, in their own words, read from the places where they talk.",
    outcome: "Reach the people your survey never did, in words they use themselves.",
    products: "Cast",
  },
  {
    title: "Narrative landscape and public debate",
    detail:
      "The dominant, emerging and residual narratives on an issue, who carries them, and which have taken root among ordinary people.",
    outcome:
      "Put communication behind the narratives people hold, and stop funding answers to the ones nobody believes.",
    products: "Radar, with The Clearing to keep watching",
  },
  {
    title: "Consumer and patient journey",
    detail:
      "The points in a decision where people move forward, stall or drop out, and what drives or blocks them at each.",
    outcome: "Intervene where people actually drop out, instead of where the plan assumed.",
    products: "Cast, scoped to the journey",
  },
  {
    title: "Launch and announcement readiness",
    detail:
      "The narratives a launch, announcement or election will land in, read before the date. How it landed, read after.",
    outcome: "Hear what will be thrown back at you before the date, and go in with the answer.",
    products: "Radar before, Pulse after",
  },
  {
    title: "Issue and crisis response",
    detail:
      "What people believe happened, how far it has spread and whether it is changing behaviour, within 48 hours.",
    outcome: "Respond within 48 hours to the story people believe, not the one in the briefing.",
    products: "Pulse, then Radar",
  },
  {
    title: "Tracking and monitoring",
    detail:
      "The study's narratives, tensions and personas re-read every month. What changed, what is new, what faded.",
    outcome:
      "Change a message or move a budget months before the tracker shows why. Never be the one who didn't see it coming.",
    products: "The Clearing",
  },
];
