/**
 * Homepage FAQ and glossary. The same text is rendered on the page and
 * emitted as FAQPage structured data, so the two never drift apart.
 */
export type QA = { question: string; answer: string };
export type Term = { term: string; definition: string };

export const HOME_FAQ: QA[] = [
  {
    question: "What is social intelligence?",
    answer:
      "Social intelligence is research that reads what people say to each other in public, unprompted, to understand how they think about a category, an issue or a brand. It studies whole conversations rather than mentions. Bakamo uses it to find what a brief, a questionnaire or a discussion guide did not ask about.",
  },
  {
    question: "What is the difference between social intelligence and social listening?",
    answer:
      "Social listening monitors mentions of the terms you give it and reports volume and sentiment. Social intelligence reads the wider conversation, most of which never mentions a brand, and explains how people make sense of the topic. Listening tells you how much you were talked about. Intelligence tells you why, and what to do about it.",
  },
  {
    question: "How is social intelligence different from a survey or a focus group?",
    answer:
      "Interviews and surveys go deep on the questions you bring. Discovery finds the ones you did not bring. It runs first, before the discussion guide and the questionnaire are written.",
  },
  {
    question: "Is social intelligence the same as consumer insights?",
    answer:
      "Social intelligence is a way of producing consumer insights. It is the method; consumer insight is the result. It also produces citizen, patient and public-opinion insight, which is why we work with governments and health organisations as well as brands.",
  },
  {
    question: "Does Bakamo use AI to analyse conversations?",
    answer:
      "We use our own Reading Machine to read conversations at a scale no human team could manage, and to surface patterns across them. Our analysts decide what those patterns mean. The Reading Machine gives us scale. Humans give it meaning.",
  },
  {
    question: "Can social intelligence be measured?",
    answer:
      "Every count in our reports is a count of posts. It describes the conversation. Turning a finding into a market figure is the job of the survey that follows, which your team, your agency or Bakamo can field.",
  },
  {
    question: "How long does a social intelligence project take?",
    answer:
      "First learnings arrive in one to two weeks depending on the scope. Book a meeting to talk it through.",
  },
  {
    question: "Which markets and languages does Bakamo cover?",
    answer:
      "We have worked in 45 countries and 65 languages, across commercial, health and public-sector questions.",
  },
  {
    question: "Is the conversation representative?",
    answer: "No. It shows what exists. A sample shows how much.",
  },
  {
    question: "Does it predict what people will do?",
    answer: "It shows a change in meaning early. It does not show who will switch or pay.",
  },
  {
    question: "What if you find nothing unexpected?",
    answer: "Then your frame has been checked from outside it, which your own research cannot do.",
  },
  {
    question: "How does this fit with our agency?",
    answer: "It runs first and feeds their recruitment, guides and questionnaire.",
  },
];

export const HOME_GLOSSARY: Term[] = [
  {
    term: "Social intelligence",
    definition:
      "Research that reads unprompted public conversation to understand how people make sense of a category, issue or brand. Produces consumer, citizen and patient insight. Bakamo's discipline.",
  },
  {
    term: "Social listening",
    definition:
      "Software that monitors mentions of specified brands or keywords and reports volume, reach and sentiment over time. Useful for communications and customer care. Finds only what you already knew to look for.",
  },
  {
    term: "Consumer insights",
    definition:
      "Understanding of why people choose, reject, trust or ignore products, brands and categories. Social intelligence produces consumer insights from conversation rather than from questions.",
  },
  {
    term: "Unprompted conversation",
    definition:
      "What people say to each other when no researcher is asking. The raw material of social intelligence. Contrast with prompted data: surveys, interviews and focus groups.",
  },
  {
    term: "Sentiment analysis",
    definition:
      "Automated scoring of text as positive, negative or neutral. A feature of social listening tools. It cannot tell irony from praise, or a complaint from a joke, and it says nothing about meaning.",
  },
  {
    term: "Netnography",
    definition:
      "The academic name for ethnographic research conducted in online communities. Social intelligence is netnography at scale, with the reading done by the Reading Machine and the interpretation done by analysts.",
  },
  {
    term: "The Reading Machine",
    definition:
      "Bakamo's system for reading millions of conversations and surfacing patterns, connections and emerging meanings across them. It provides scale. Analysts provide meaning.",
  },
  {
    term: "Discovery before validation",
    definition:
      "Bakamo's working rule. Read the conversation to find the questions, then let interviews and a survey answer them.",
  },
];

export const HOME_FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: HOME_FAQ.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};
