// Copy for the sector and specialty pages. Each page is deliberately short: who it is
// for, the questions they bring, the cases from the Atlas, and how to start.
export type Sector = {
  /** Matches AtlasCase.sector. */
  id: "brands" | "health" | "public" | "disinformation";
  path: string;
  label: string;
  metaTitle: string;
  description: string;
  heading: string;
  standfirst: string;
  intro: string[];
  questions: string[];
  clients?: string[];
  /** Public studies worth reading alongside the Atlas cases. */
  studies?: Array<{ title: string; href: string }>;
};

export const SECTORS: Sector[] = [
  {
    id: "brands",
    path: "/brands",
    label: "Brands",
    metaTitle: "Social Intelligence for Brands and Consumer Research",
    description:
      "Bakamo reads what consumers say to each other about a category, then builds surveys, segmentations and trackers on the constructs and language they actually use.",
    heading: "Social intelligence for brands",
    standfirst: "What consumers tell each other about your category, before you ask them anything.",
    intro: [
      "A tracker tells you how the category scores on the attributes you chose. It cannot tell you whether those are the attributes people use.",
      "We read the conversation consumers are already having, in forums, comment sections and communities where no brand is present. We map the constructs, tensions and language that organise their decisions. Then we build the survey around that map.",
    ],
    questions: [
      "Why does a proposition that tests well not travel?",
      "Where does the category begin and end for the people who buy it?",
      "Which need is forming before it shows in sales data or a tracker?",
      "Does our segmentation describe people, or the brief that commissioned it?",
      "We are entering a market and a language we do not know. What are we missing?",
    ],
    clients: ["Adidas", "Nivea", "Philips", "Unilever", "Nestlé", "L’Oréal", "Reckitt", "De Beers", "Tesco", "Macy’s"],
  },
  {
    id: "health",
    path: "/health",
    label: "Health",
    metaTitle: "Social Intelligence for Health and Pharma",
    description:
      "Bakamo reads what patients and clinicians say to each other in public conversation, then builds patient research and surveys on how they actually describe a condition.",
    heading: "Social intelligence for health and pharma",
    standfirst: "What patients and clinicians say to each other when no one is asking.",
    intro: [
      "People living with a condition talk to each other every day: about symptoms they have not mentioned to their doctor, treatments they stopped and why, what they fear and whom they trust. Nobody recruited them and nobody is moderating.",
      "We read that public conversation, and the professional one alongside it, and map how patients and clinicians organise the decision. The survey, the tracker or the patient-journey work is then built on that map.",
    ],
    questions: [
      "What happens between diagnosis and treatment that never reaches the clinic?",
      "Why do patients stop, switch or never start?",
      "What words do patients use for this condition, and how far are they from ours?",
      "Where does trust sit: with the physician, the community or somewhere else?",
      "How is a public health issue being argued, and what language loses the middle?",
    ],
    clients: ["Teva", "Merck", "Boehringer Ingelheim"],
  },
  {
    id: "public",
    path: "/public-sector",
    label: "Public Sector",
    metaTitle: "Social Intelligence for Government and Not-for-Profit",
    description:
      "Bakamo reads public conversation around elections, policy and contested issues, and maps the narratives and divides that organise it. See our public studies.",
    heading: "Social intelligence for government and not-for-profit",
    standfirst: "How a contested issue is being argued, by the people arguing it.",
    intro: [
      "A poll tells you how many people agree with a statement. It does not tell you which statement they would have made themselves.",
      "We read the public conversation around an election, a policy or a contested issue, and map the narratives, frames and divides that organise it. Our public studies of the French election, migration narratives across the EU and the Hungarian election were made this way.",
    ],
    questions: [
      "Which narratives are carrying this debate, and where do they come from?",
      "Who is in the middle, and what language loses them?",
      "How does the same issue read from one country and language to the next?",
      "Is disinformation moving, and through which sources?",
      "What should the survey ask, before it is fielded?",
    ],
    clients: [
      "Open Society Foundations",
      "Friedrich Ebert Stiftung",
      "Ofcom",
      "Pew Research Center",
      "Parliament of Victoria",
      "McCain Institute / Arizona State University",
      "Greenpeace",
    ],
    studies: [
      { title: "French Election Social Media Landscape Report 2017", href: "/research/french-election-2017" },
      { title: "Migration Narratives in Europe", href: "/migration" },
      { title: "Hungarian Election 2026: A Psychographic Divide", href: "/elections" },
    ],
  },
  {
    id: "disinformation",
    path: "/disinformation",
    label: "Disinformation",
    metaTitle: "Disinformation Research and Narrative Analysis",
    description:
      "Bakamo maps where a false story comes from, how it travels between sources and communities, and why people pass it on. See our 2017 French election study.",
    heading: "Disinformation research",
    standfirst: "Where a false story comes from, how it travels, and why people pass it on.",
    intro: [
      "Refuting false stories one at a time leaves the narrative that produced them untouched. In our study of the 2017 French presidential election, people passed on stories they understood to be false, because the stories answered an emotional need.",
      "We map the sources a conversation draws on, the narratives that move between them and the way people share them. That shows which communities a story reaches, which tactics carry it, and what it does for the people who repeat it.",
    ],
    questions: [
      "Which sources does this narrative come from, and who amplifies it?",
      "Is there foreign influence in those sources, and how far does it reach?",
      "Which tactics are in use: borrowed credibility, recycled news, fake polls, cloned sites?",
      "Why does debunking not work on this audience?",
      "Which communities never see each other’s version of events?",
    ],
    studies: [
      { title: "French Election Social Media Landscape Report 2017", href: "/research/french-election-2017" },
      { title: "Migration Narratives in Europe", href: "/migration" },
      { title: "Hungarian Election 2026: A Psychographic Divide", href: "/elections" },
    ],
  },
];

export function getSector(id: Sector["id"]): Sector {
  const sector = SECTORS.find((s) => s.id === id);
  if (!sector) throw new Error(`Unknown sector: ${id}`);
  return sector;
}
