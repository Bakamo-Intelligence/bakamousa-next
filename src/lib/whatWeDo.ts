/**
 * Copy for the What we do page: each product with the client questions it
 * answers. Approved by the team, October 2026. Product names come from
 * products.ts; the wording here is this page's own, so the other pages that
 * list the products are untouched.
 */

export type ProductBlock = {
  id: string;
  question: string;
  useWhen: string;
  /** The client questions, in the client's voice. */
  answers: string[];
  /** What is delivered, one item per line. */
  receive: string[];
  timing: string;
};

export const INTRO =
  "Every product reads the same thing: what people say to each other online, unprompted, in their own language. Each product includes everything in the one before it and answers a bigger question. Public Mood continues any of them.";

export const PRODUCT_BLOCKS: ProductBlock[] = [
  {
    id: "agenda",
    question: "What are people talking about right now?",
    useWhen: "Something has just happened and you have days, not weeks.",
    answers: ["What is this crisis really about?", "How did our launch or announcement land?"],
    receive: [
      "The topics in the conversation, sized by their share of it.",
      "The largest topics in people's own words.",
      "What we did not expect to find.",
      "A 30-minute call.",
    ],
    timing: "Report in 48 hours.",
  },
  {
    id: "frames",
    question: "Which stories do people tell about it, and where do they disagree?",
    useWhen: "You are about to write a survey, a brief or a position, or a launch is coming.",
    answers: [
      "What should our survey ask?",
      "Where can our category grow?",
      "Which narratives lead the public debate?",
    ],
    receive: [
      "A chapter on each narrative and who tells it.",
      "The tensions between them.",
      "Dated predictions on which narratives will grow and which will fade.",
      "The words people use, and hypotheses to test in a survey.",
      "A 60-minute readout.",
    ],
    timing: "First findings in one week. Report in three weeks.",
  },
  {
    id: "publics",
    question: "Who are these people, and where do we stand with them?",
    useWhen: "You need to know who holds each narrative and what they think of you.",
    answers: [
      "Where does our brand stand against competitors?",
      "Who are the people surveys miss?",
      "Where do people stall or drop out on the way to a purchase or a treatment?",
    ],
    receive: [
      "Everything in Frames.",
      "Five to seven persona cards: who they are, what they say, what drives them, what holds them back.",
      "Your brand against up to three competitors, with the posts behind each placement.",
      "A 90-minute readout.",
    ],
    timing: "First findings in two weeks. Report in five weeks.",
  },
  {
    id: "common-sense",
    question: "What do people believe without saying it?",
    useWhen:
      "A strategy, a policy or a campaign has to rest on what people already believe, in one market or several.",
    answers: ["What should our strategy, policy or positioning be built on?"],
    receive: [
      "Everything in Publics, for each market.",
      "Your own strategic questions answered from the conversation.",
      "A one-day workshop with your team.",
      "A survey questionnaire that measures what we found.",
      "Three further analyses on topics you choose.",
    ],
    timing: "First findings in two weeks. Report in seven weeks per market.",
  },
  {
    id: "public-mood",
    question: "What changed since last month, and what comes next?",
    useWhen:
      "A study is finished and you want to keep watching. Shifts show here months before they reach a tracker.",
    answers: ["What is shifting, and when should we act?"],
    receive: [
      "A monthly report on what moved, what is new and what faded.",
      "Your brand against competitors, month on month.",
      "A dated prediction each month, with the record of earlier ones.",
      "A 30-minute call each month.",
      "A deeper analysis each quarter.",
    ],
    timing: "Every month, after any study. Six-month minimum.",
  },
];

export const CLOSING =
  "Evidence for litigation and regulatory proceedings, and campaign evaluation, are scoped from Frames or Publics. Scope, markets and languages are set to the brief. Book a meeting and bring the question.";
