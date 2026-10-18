// The EVE Effect micro site: one long page at /eve-effect, with its own
// section navigation. Every fact here comes from two files Daniel approved on
// 18 October 2026: the research inventory of Bakamo's Google Drive and the
// public Talkwalker case study "Play to win". Do not add numbers, quotes or
// dates that are not in those two sources.
//
// Off limits, by agreement with CCP Games: the "Meaning of Space" study, and
// the findings of the Stigma Study and the Negative Impact Study.
//
// The page is listed on /research and on the Atlas, and is in the sitemap.
// It is not in the main navigation or the footer.

export const PAGE_PATH = "/eve-effect";

export const TITLE = "The EVE Effect: Playing EVE Online Gets People Better Jobs";
export const DESCRIPTION =
  "Bakamo's research for CCP Games on what EVE Online gives its players outside the game: friends, skills and better jobs. The method, the findings and what CCP did with them.";

export const CLIENT = "CCP Games (now Fenris Creations)";

/** The micro site's own navigation. Each id is a section on the page. */
export const SECTIONS: Array<{ id: string; label: string }> = [
  { id: "front", label: "Start" },
  { id: "question", label: "CCP's question" },
  { id: "how-we-read", label: "Method" },
  { id: "journey", label: "A player's path" },
  { id: "skills", label: "Skills" },
  { id: "in-their-words", label: "Player quotes" },
  { id: "what-ccp-did", label: "What CCP did" },
  { id: "beyond", label: "For recruiters" },
];

// ─── Front ───

export const CLAIM = "Playing EVE Online gets people better jobs.";

export const FRONT_LEAD = [
  "EVE Online is a science fiction game played by hundreds of thousands of people. It is hard to learn, and many new players leave.",
  "CCP Games (now Fenris Creations) asked Bakamo what the game gives the players who stay. We read what players say to each other about the game and about their lives. Players make friends, learn skills, and some get better jobs.",
];

export const SURVEY_STATS: Array<{ value: string; label: string }> = [
  { value: "73%", label: "made new friends through the game" },
  { value: "56%", label: "have used a skill learned in EVE outside the game" },
  { value: "72%", label: "think EVE skills have helped people get better jobs" },
];

export const SURVEY_NOTE = "759 EVE players, November 2019. Survey run by CCP Games, analysed by Bakamo.";

export const HILMAR_QUOTE = {
  text: "The EVE effect is the notion that a game like EVE can build your friends network and your skillset to make you the best version of yourself.",
  name: "Hilmar Pétursson",
  role: "CEO of CCP Games, in the Talkwalker case study",
};

// ─── The question ───

export const QUESTION = {
  heading: "What CCP asked us",
  body: [
    "CCP Games makes EVE Online. Its stated mission is to create virtual worlds more meaningful than life.",
    "The company tracks how many new players stay. EVE is a complex game. For established players the difficulty is the appeal. For new players it is the reason to leave.",
    "CCP wanted to know whether the game improves players' lives outside it, and whether that could bring in new players. Bakamo had first read EVE Online conversation for CCP in 2016. This study ran from April 2019 to early 2020.",
  ],
};

// ─── How we read ───

export const METHOD = {
  heading: "How we did the research",
  lead: "We did not run a survey or interviews for this part. We read what players had already written to each other.",
  where: {
    heading: "Where EVE players talk about their lives",
    body: "Players write about their lives outside the game in three places.",
    sources: [
      { name: "Gaming subreddits", note: "Where EVE players meet players of other games." },
      { name: "EVE message boards and blogs", note: "Where the game itself is discussed." },
      { name: "The \"out of pod\" threads", note: "Threads on the official forums for life outside the game." },
    ],
  },
  failed: {
    heading: "Keyword search did not work",
    body: [
      "Talkwalker found where the conversations happen. Keyword search could not find the conversations we needed. Self-improvement has no fixed vocabulary. A player who learned to lead a fleet does not write that they learned leadership.",
      "Analysts collected the quotes by hand: every comment in organic EVE talk that refers to life outside the game, stated or implied. Each quote was then placed on a hierarchy of needs drawn for EVE.",
    ],
  },
  steps: {
    heading: "The four steps in the May 2019 report",
    items: [
      "Social media monitoring finds the communities and where they talk.",
      "Analysts collect comments by hand: quotes from organic EVE talk that refer to real life, stated or implied.",
      "Each quote is read and placed on the EVE hierarchy of needs.",
      "The patterns of self-expression are read for what is left unsaid.",
    ],
  },
};

// ─── The journey ───
//
// The scroll section. Seven steps, read from the bottom of the pyramid to the
// top. The first two sit on the lower layers (friendship). The middle four are
// the Real Butterfly Effect, the step between. The last sits on the upper
// layers (skills). The pyramid beside the text lights up one band per step.

export type JourneyStep = {
  id: string;
  /** Short label on the pyramid band. */
  band: string;
  title: string;
  body: string[];
  stat?: { value: string; label: string };
  quote?: { text: string; source: string };
  marker?: string;
};

export const JOURNEY = {
  heading: "What we found: friends first, then skills",
  lead: "We placed what players wrote on Maslow's hierarchy of needs. Friendship sits on the lower layers and skills on the upper ones. In between, players start to notice what the game has taught them. Below are the seven steps, in the order players go through them.",
};

export const JOURNEY_GROUPS: Array<{ name: string; needs: string; from: number; to: number }> = [
  { name: "Friendship", needs: "Safety. Love and belonging.", from: 0, to: 1 },
  { name: "Self-awareness", needs: "The Real Butterfly Effect", from: 2, to: 5 },
  { name: "Skills", needs: "Esteem. Self-actualisation.", from: 6, to: 6 },
];

export const PLAYER_SOURCE = "EVE player, public forum post, 2019";

export const JOURNEY_STEPS: JourneyStep[] = [
  {
    id: "join",
    band: "Friends",
    title: "The player joins a corporation.",
    body: [
      "EVE is built for groups. Most players join a corporation early and fly with the same people most nights.",
      "The first benefit is friendship. Players feel it long before they notice they are learning anything.",
    ],
    stat: { value: "73%", label: "of surveyed players made new friends through the game" },
    quote: { text: "My corpmate is my best man.", source: PLAYER_SOURCE },
  },
  {
    id: "loss",
    band: "Loses a ship",
    title: "The player loses a first ship.",
    marker: "The moment that decides who stays",
    body: [
      "CCP identified one moment that decides whether a player stays. The first serious loss, usually a ship. In EVE a destroyed ship is not returned.",
      "Many new players leave at this point. Players who stay develop their first skills here. They ask for help, work out what went wrong, and go back out.",
    ],
  },
  {
    id: "challenge",
    band: "Stays",
    title: "Rising to the challenge.",
    body: ["The player decides to stay and learn the game. The May 2019 report names this the first stage of the Real Butterfly Effect."],
  },
  {
    id: "learning",
    band: "Learns by playing",
    title: "Learning through play.",
    body: [
      "Doing well in EVE takes planning, arithmetic, leadership and trust. Players build spreadsheets to run a market and lead fleets of people they have never met. Nobody calls it learning at the time.",
    ],
  },
  {
    id: "good",
    band: "Gets good",
    title: "\"I'm getting good at this.\"",
    body: ["The player notices they can do things they could not do before, and begins to name them."],
    quote: {
      text: "Learning how to play this game since 2005 made regular spreadsheet tasks outside of the game a breeze.",
      source: PLAYER_SOURCE,
    },
  },
  {
    id: "real",
    band: "Uses it at work",
    title: "\"EVE is real.\"",
    body: ["The player uses the skill at work, in a job interview or in a spreadsheet that has nothing to do with the game."],
    stat: { value: "56%", label: "of surveyed players have used a skill learned in EVE outside the game" },
  },
  {
    id: "job",
    band: "Puts it on the CV",
    title: "The player puts it on a CV.",
    body: ["On the upper layers the player can describe what the game taught them. Some write it on their CV."],
    stat: { value: "72%", label: "of surveyed players think EVE skills have helped people get better jobs" },
    quote: { text: "Put EVE on my CV, got a job.", source: PLAYER_SOURCE },
  },
];

// ─── The skills ───

export const SKILLS = {
  heading: "The skills players say they got from EVE",
  lead: "Players named these skills in their posts. We grouped them.",
  groups: [
    {
      name: "People skills",
      items: [
        "People skills",
        "Charisma",
        "Leadership",
        "Management",
        "Networking",
        "Authority and responsibility",
        "Politics",
        "Trust",
        "Loyalty",
        "Persuasion, learned writing faction war propaganda",
      ],
    },
    {
      name: "Hard skills",
      items: ["Excel", "Raw data analysis", "Programming", "Supply chain management", "Language skills", "Reading into writing"],
    },
    {
      name: "Character traits",
      items: ["Dealing with consequences", "Getting back up", "Ownership", "Skepticism", "Openness", "Curiosity"],
    },
  ],
};

// ─── In their words ───

export const VOICES = {
  heading: "What players wrote",
  lead: "Public forum posts by EVE players, collected by hand in 2019. Players are not named.",
  items: [
    { text: "Put EVE on my CV, got a job.", source: PLAYER_SOURCE },
    {
      text: "Learning how to play this game since 2005 made regular spreadsheet tasks outside of the game a breeze.",
      source: PLAYER_SOURCE,
    },
    { text: "My corpmate is my best man.", source: PLAYER_SOURCE },
  ],
};

// ─── What CCP did ───

export const CCP_DID = {
  heading: "What CCP did with the research",
  body: [
    "CCP and Bakamo called the finding the EVE Effect.",
    "Hilmar Pétursson presented it at EVE Down Under in 2019 under the title of the Bakamo report, \"Beyond the Friendship Machine\". CCP presented it again at EVE Vegas in October 2019.",
    "In November 2019 CCP ran a player survey and Bakamo analysed it. The three figures at the top of this page come from that survey.",
    "CCP commissioned a white paper for recruiters, \"Demystifying gamers for HR\", by the HR consultant András Horváth. It was published on Medium in May 2020.",
  ],
  changes: {
    heading: "Changes CCP made to the game and its support",
    note: "From the Talkwalker case study.",
    items: [
      "Extra player support after a serious loss, so players who would have left stay.",
      "A recruitment programme for player groups built on the social skills gamers value.",
      "A fleet finder, so players can join people like them.",
      "More direct customer support for new players, to build on the friendship connection.",
    ],
  },
  links: [
    {
      label: "The Talkwalker case study",
      detail: "Play to win. Why Bakamo and EVE Online are revolutionizing the gaming and HR industries.",
      href: "https://www.talkwalker.com/resource/case-studies/bakamo-eve-revolutionizing-gaming-hr",
    },
    {
      label: "The HR white paper on Medium",
      detail: "Demystifying gamers for HR. Where and how to spot talent. András Horváth, 25 May 2020.",
      href: "https://medium.com/@andrshorvth/demystifying-gamers-for-hr-157050e47ce7",
    },
  ],
};

// ─── Beyond EVE ───

export const BEYOND = {
  heading: "What this means for recruiters",
  body: [
    "Many gamers do not mention the hobby to employers. They expect it to count against them. So the skills stay off the CV.",
    "The white paper lists the skills for recruiters, among them Excel, supply chain management and team leadership, and says where to find the people who have them.",
    "Learning through play works for adults. Recruiters looking for rare skills have a large pool to recruit from.",
  ],
  stat: { value: "100 million", label: "online role-playing gamers worldwide, by the case study's count" },
};

// ─── Close ───

export const CLOSE = {
  heading: "Have a question like this one?",
  body: "Bakamo reads unprompted conversation in 65 languages for brands, health and the public sector.",
  cta: "Book a meeting",
};
