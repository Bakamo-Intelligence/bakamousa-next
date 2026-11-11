/**
 * Copy for the What we do page, from the website copy deck v3 (November 2026).
 * Product names come from products.ts.
 */

export type ProductBlock = {
  id: string;
  question: string;
  useWhen: string;
  /** What is delivered, with the timing. */
  receive: string;
  /** The questions the product hands the client for their own research. */
  questions: string;
  /** The limit: what the product does not tell you. */
  doesNotTell: string;
};

export const INTRO = "Each product includes everything in the one before it. Public Mood continues any of them month by month.";

export const PRODUCT_BLOCKS: ProductBlock[] = [
  {
    id: "agenda",
    question: "What are people talking about right now?",
    useWhen: "Something has just happened and you have days, not weeks.",
    receive:
      "The topics in the conversation, sized by share of conversation. Report in 48 hours, with a 30-minute call.",
    questions:
      "Which topics your statement, your monitoring or your next survey does not cover, and what to ask about each.",
    doesNotTell: "How widely the public shares these concerns.",
  },
  {
    id: "frames",
    question: "Which stories do people tell about it, and where do they disagree?",
    useWhen: "You are about to write a survey, a brief or a position, or a launch is coming.",
    receive:
      "The narratives in the conversation and the tensions between them, each with a dated hypothesis: what we expect to see next and when to check. First findings in one week, report in three.",
    questions:
      "The questions each narrative raises for your survey or discussion guide, in the words people use.",
    doesNotTell: "How many people hold each narrative.",
  },
  {
    id: "publics",
    question: "Who are these people, and where do we stand with them?",
    useWhen: "You need to know who is in the conversation and how they see you.",
    receive:
      "Five to seven persona cards and a comparison of your brand with up to three competitors. Our personas are positions in a conversation, not segments of a population. First findings in two weeks, report in five.",
    questions: "Who to recruit, and what to ask each group that you would not have asked.",
    doesNotTell: "How large each persona is in the population.",
  },
  {
    id: "common-sense",
    question: "What do people take for granted about this category?",
    useWhen:
      "A strategy, a policy or a campaign has to rest on what people already assume, in one market or several.",
    receive:
      "Frames and Publics for each market, and a one-day workshop with your team. First findings in two weeks, report in seven weeks per market.",
    questions: "A complete survey questionnaire built from what we found, ready to field.",
    doesNotTell: "The answers. Those come from fielding the questionnaire.",
  },
  {
    id: "public-mood",
    question: "What changed since last month?",
    useWhen: "A study is finished and you want to keep reading the conversation.",
    receive:
      "A monthly report on what has shifted, what is new and what has faded, a monthly call and a deeper analysis each quarter. Six-month minimum.",
    questions: "Each month, the new questions the conversation raises for your tracker.",
    doesNotTell: "Whether behaviour has changed. Your tracker and your sales data show that.",
  },
];

export const CLOSING = "Scope, markets and languages are set to the brief.";
