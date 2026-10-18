// Data for /research/migration-narratives-eu.
// Source: Bakamo Public for the Friedrich-Ebert-Stiftung, Migration Narratives in
// Europe, 2019: the final report and the 28 country reports. Shares are as printed
// in each country report. Where a report printed counts only, the share was
// computed from them. Do not add figures that are not in the reports.

export type NarrativeKey = "security" | "identity" | "economy" | "humanitarianism" | "demography";

export type Country = {
  code: string;
  country: string;
  total_posts: number;
  narratives_pct: Record<NarrativeKey, number>;
  dominant_narrative: NarrativeKey;
  asylum_seekers_pct_population_2017: number | null;
  conversation_rank_per_capita: number | null;
  local_issues: string[];
  political_events: string[];
  politics_focus: string;
  dominant_channel: string;
  tone: string;
  existential_anxiety: string;
  quote_anti: string | null;
  quote_pro: string | null;
  one_line: string;
};

export type Narrative = {
  key: NarrativeKey;
  label: string;
  color: string;
  quote: string;
  description: string;
};

// Stacking order. Adjacent colours pass the colour-blindness check.
export const NARRATIVES: Narrative[] = [
  {
    key: "security",
    label: "Security",
    color: "#e66767",
    quote: "These people will rape my daughter",
    description:
      "Migration as a way to import crime and terror, and the borders, police and fences that answer it.",
  },
  {
    key: "identity",
    label: "Identity",
    color: "#9085e9",
    quote: "Soon enough we'll all be living under Sharia law",
    description: "Fear of losing national customs, language and faith; whether a mixed society can hold.",
  },
  {
    key: "economy",
    label: "Economy",
    color: "#199e70",
    quote: "We just can't afford these people anymore",
    description: "A zero-sum game for benefits, housing and jobs; who deserves support and who is cheating.",
  },
  {
    key: "humanitarianism",
    label: "Humanitarian",
    color: "#3987e5",
    quote: "Refugees deserve help, especially if they stay in their own country",
    description:
      "The journey, the rescue ships, the camps; and the counter-claim that most are not real refugees.",
  },
  {
    key: "demography",
    label: "Demography",
    color: "#c98500",
    quote: "Can migration soothe the demographic crisis?",
    description:
      "Ageing, pensions and labour shortages; whether migrants will work, and whether locals want them to.",
  },
];

export const NARRATIVE_BY_KEY: Record<NarrativeKey, Narrative> = Object.fromEntries(
  NARRATIVES.map((n) => [n.key, n]),
) as Record<NarrativeKey, Narrative>;

export type TimelineEntry = {
  year: string;
  where: string;
  client: string;
  text: string;
  scale: string;
  here?: boolean;
};

export const TIMELINE: TimelineEntry[] = [
  {
    year: "2015",
    where: "Hungary",
    client: "Open Society Foundations",
    text: "How Hungarians discussed the refugee crisis, and how government communication entered that conversation.",
    scale: "Presented at ESOMAR 2016",
  },
  {
    year: "2017 to 18",
    where: "EU 28",
    client: "Friedrich-Ebert-Stiftung",
    text: "One year of conversation in every member state. The five narratives and their weight in each country. This page.",
    scale: "45M posts, 28 reports",
    here: true,
  },
  {
    year: "2020 to 21",
    where: "Germany",
    client: "International Centre for Policy Advocacy",
    text: "Islam, migration and integration in the German conversation, read again five years after 2015.",
    scale: "2.2M posts on migration",
  },
  {
    year: "2021",
    where: "Turkey",
    client: "Bakamo study",
    text: "The Turkish conversation on Afghan arrivals in the month after Kabul fell.",
    scale: "1.3M mentions in August",
  },
  {
    year: "2023",
    where: "Turkey and Tunisia",
    client: "Gallup International",
    text: "People in transit from five countries, and the communities hosting them.",
    scale: "1.8M conversations, 24 months",
  },
];

// Tile positions as [column, row] in a 9 by 8 grid.
export const TILES: Record<string, [number, number]> = {
  SE: [5, 0], FI: [6, 0],
  DK: [4, 1], EE: [7, 1],
  IE: [0, 2], UK: [1, 2], NL: [3, 2], DE: [4, 2], PL: [5, 2], LV: [7, 2],
  BE: [3, 3], CZ: [4, 3], SK: [5, 3], LT: [7, 3],
  FR: [2, 4], LU: [3, 4], AT: [4, 4], HU: [5, 4], RO: [6, 4],
  PT: [0, 5], ES: [1, 5], SI: [4, 5], HR: [5, 5], BG: [6, 5],
  IT: [4, 6], GR: [6, 6],
  MT: [4, 7], CY: [7, 7],
};

export const TILE_COLUMNS = 9;
export const TILE_ROWS = 8;

// The 28 country reports as Google Slides decks.
export const REPORTS: Record<string, string> = {
  AT: "https://docs.google.com/presentation/d/1YuGafcP_mLSzKjYbyKtVG8wxhpLD333nHTr-27-ap7s/edit",
  BE: "https://docs.google.com/presentation/d/1RpyyBXr4IjKzvC72KceD6A2jHADnjYcOVzb3bC23Lu4/edit",
  BG: "https://docs.google.com/presentation/d/15MuT4O7Ywd9k5DkSgLTBUMR9x4R67uct3m_Bdcm4Gz0/edit",
  CY: "https://docs.google.com/presentation/d/1-SxQeLIjmhcT54Eb9UapZKuzoFBBVcM1AzR5FCTEYXY/edit",
  CZ: "https://docs.google.com/presentation/d/14KDLNHkW9dpppTyXOtVU-1dbKjwk62cZ0U0-lIuTjBs/edit",
  DE: "https://docs.google.com/presentation/d/1k_Gasbm8f9jRbC3S034NwNslzQCb4r00pzDSBrlc94g/edit",
  DK: "https://docs.google.com/presentation/d/17-OZPMLOC_3miM0wmfH6ZpYb_2u97pWziOg-W5l3bj0/edit",
  EE: "https://docs.google.com/presentation/d/17xqc-UZGZOijDkM4SiVKXAI_C1Zu6pJ6d1AkM3Nh7p8/edit",
  ES: "https://docs.google.com/presentation/d/1HNIvqMDCESfnB_k7uf1jxmOLBLn5D2RcV3kcMmEMTyA/edit",
  FI: "https://docs.google.com/presentation/d/1PHN6liy4n1UeFuGTr1FGvPA3WWcYiBivbyXbpAV5ixY/edit",
  FR: "https://docs.google.com/presentation/d/1ZwXRIPdIIu6KsgNUt8wV0_T0z2mousxzSEyXQbqlvlI/edit",
  GR: "https://docs.google.com/presentation/d/1MckY6OvwUqrY4GTENjhwP1eMzBAIr14_2Kgq1Y5WQ6k/edit",
  HR: "https://docs.google.com/presentation/d/152hN0eCw7nMHgG7pbFYw2xX_vniVWInUqqn4cq0AdPs/edit",
  HU: "https://docs.google.com/presentation/d/1KBHRLv_pGfN1Uz70EqfKs_uj2rpgwg3NFMDNpIgIEsk/edit",
  IE: "https://docs.google.com/presentation/d/1hmPfsjv2l0I-_AS6LQaPE5LxkkaMl3mLCBRpST9W2nE/edit",
  IT: "https://docs.google.com/presentation/d/1PhVG4e-cyMgj71b-110t0XbvQ_WfpgQg6N2ggBL8aSc/edit",
  LT: "https://docs.google.com/presentation/d/1qIl0jmkBPO-9NJLcEjpR2YfclK52KYZmhaTtBJvgUuc/edit",
  LU: "https://docs.google.com/presentation/d/1eSHjzJrikIbYSunK1Ss_VJS1jLgG62yOGoalMv2oIDQ/edit",
  LV: "https://docs.google.com/presentation/d/1QaIVDvnVyW5LZmUuujDy_ssTm58KYmmWIptqD2F0xoo/edit",
  MT: "https://docs.google.com/presentation/d/1T1jDXIezUVljq9HuUhWpzD4U936p-OEj4WnFuNWgu1I/edit",
  NL: "https://docs.google.com/presentation/d/1YAa4x5mMSJXhodwGKsQDV90t9O_yOjYm1HEvCB2NyZY/edit",
  PL: "https://docs.google.com/presentation/d/1GxoEoXzbRCzP8Sb_fbotypfHb8gksTskEZhBlUIEEtw/edit",
  PT: "https://docs.google.com/presentation/d/1JbU2M7v4_bOuq2DlueCoekPSVFQX6xV32cVVpexyXw4/edit",
  RO: "https://docs.google.com/presentation/d/1SkbMBtNh72wHB0KCtCqlzK76c8WKMbjKk6kpNVeC3LQ/edit",
  SE: "https://docs.google.com/presentation/d/1oHdK0dNyzG8Bdx4TbKca7kSzHPgnPTxEnV4ovwWOAX8/edit",
  SI: "https://docs.google.com/presentation/d/1VF9GFpSpMd_opD8HP-vLpjlr-noQKOO7GQQ4Fj3SNOE/edit",
  SK: "https://docs.google.com/presentation/d/1DX9ONveBcOFMIKgMljtu3UJCJIzO8i8uC2RwOKkB-_U/edit",
  UK: "https://docs.google.com/presentation/d/1_TNyhWrybJ-blioS8dBvp59k1Qt6PTwISAYgw9k47dY/edit",
};

export type Anxiety = {
  title: string;
  pattern: RegExp;
  description: string;
  color: string;
};

// The three anxieties named in the country reports. A country can match more than one.
export const ANXIETIES: Anxiety[] = [
  {
    title: "Personal safety",
    pattern: /safety/i,
    description: "Crime, terror and border control. Strongest where the security narrative leads.",
    color: "#e66767",
  },
  {
    title: "Economic stability",
    pattern: /econom|welfare|housing|exodus|emigration/i,
    description: "Welfare, housing, wages and emigration. Often the real subject under a migration thread.",
    color: "#199e70",
  },
  {
    title: "Cultural identity",
    pattern: /identity|cultur|sovereign/i,
    description: "Customs, language, faith and sovereignty. Strongest in the Netherlands, Belgium and Germany.",
    color: "#9085e9",
  },
];

export function formatPosts(n: number): string {
  if (n >= 1e6) return (n / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1e3) return Math.round(n / 1e3) + "k";
  return String(n);
}

export function formatPct(v: number | null | undefined): string {
  if (v == null) return "–";
  return (Math.round(v * 10) / 10).toFixed(1) + "%";
}

// Security and identity added together.
export function fearShare(c: Country): number {
  return (c.narratives_pct.security || 0) + (c.narratives_pct.identity || 0);
}

export function leadingNarrative(c: Country): Narrative {
  return NARRATIVES.reduce(
    (best, n) => ((c.narratives_pct[n.key] || 0) > (c.narratives_pct[best.key] || 0) ? n : best),
    NARRATIVES[0],
  );
}

export function countryByCode(code: string): Country | undefined {
  return COUNTRIES.find((c) => c.code === code);
}

export const COUNTRIES: Country[] = [
  {
    "code": "AT",
    "country": "Austria",
    "total_posts": 68400,
    "narratives_pct": {
      "security": 65.2,
      "identity": 1.6,
      "economy": 11,
      "humanitarianism": 22,
      "demography": 0.2
    },
    "dominant_narrative": "security",
    "asylum_seekers_pct_population_2017": 0.84,
    "conversation_rank_per_capita": 12,
    "local_issues": [
      "Chancellor Sebastian Kurz",
      "Germany as a controversial example"
    ],
    "political_events": [
      "EU summit on migration, July 2018",
      "Kurz meets CSU leader Markus Soder on immigration control",
      "Kurz elected chancellor in 2017",
      "Juncker State of the Union speech",
      "Eritrean refugee attacks ambulance in Germany"
    ],
    "politics_focus": "mixed",
    "dominant_channel": "Twitter (about 60%)",
    "tone": "reserved and conversational; security and humanitarianism trigger passion",
    "existential_anxiety": "personal safety",
    "quote_anti": "We will secure our borders with all means available to us and protect the Austrians!",
    "quote_pro": "I am not afraid of refugees. The worst thing that they are doing is showing us a mirror.",
    "one_line": "Austria talks about Kurz's border plan and watches Germany as a warning, so the fear of crime drowns out the people who want to help."
  },
  {
    "code": "BE",
    "country": "Belgium",
    "total_posts": 360300,
    "narratives_pct": {
      "security": 14.5,
      "identity": 22.0,
      "economy": 3.2,
      "humanitarianism": 59.4,
      "demography": 0.9
    },
    "dominant_narrative": "humanitarianism",
    "asylum_seekers_pct_population_2017": 0.37,
    "conversation_rank_per_capita": 16,
    "local_issues": [
      "Flemish independence and Theo Francken"
    ],
    "political_events": [
      "Aquarius rescue ship controversy and Francken's Bangladeshi claim",
      "Police raids on Maximilien Park in Brussels",
      "Deportation of Sudanese migrants",
      "Trump's migration policies",
      "Human Wave for solidarity march in Brussels"
    ],
    "politics_focus": "European",
    "dominant_channel": "Twitter (over 60% in both languages)",
    "tone": "reserved in French, intense in Dutch",
    "existential_anxiety": "cultural identity in Flanders, humanitarian concern in Wallonia",
    "quote_anti": "Opening the borders to the migrants will endanger local security",
    "quote_pro": "European migration policies lead to thousands of deaths in the Mediterranean and Belgium will hold children in detention centers.",
    "one_line": "Belgium holds two separate talks: Wallonia asks how to help migrants, Flanders asks how to keep its own identity, and Theo Francken splits them."
  },
  {
    "code": "BG",
    "country": "Bulgaria",
    "total_posts": 96000,
    "narratives_pct": {
      "security": 51.2,
      "identity": 5.6,
      "economy": 4.6,
      "humanitarianism": 20.4,
      "demography": 18.3
    },
    "dominant_narrative": "security",
    "asylum_seekers_pct_population_2017": 0.23,
    "conversation_rank_per_capita": 14,
    "local_issues": [
      "Turkey",
      "Press freedom situation"
    ],
    "political_events": [
      "Bulgarian EU presidency 2018",
      "EU migration summit June 2018",
      "Border fence damaged by weather and corruption scandal",
      "Law barring reporters from the border fence",
      "Viktor Orban wins Hungarian election",
      "Istanbul convention dispute",
      "Borisov re-elected 2017"
    ],
    "politics_focus": "European",
    "dominant_channel": "online news (about 75%)",
    "tone": "one-sided, echoes government line; no tone slide in deck",
    "existential_anxiety": "personal safety and economic stability",
    "quote_anti": "Everybody who trespassed the border should be expelled. That is not inhumane because that is how we save lives.",
    "quote_pro": "We believe that with this video we will change the perspectives toward the immigrants kids",
    "one_line": "Bulgaria's talk is a government echo: guard the Turkish border, get EU money for it, and worry about Bulgarians leaving, not migrants arriving."
  },
  {
    "code": "CY",
    "country": "Cyprus",
    "total_posts": 57600,
    "narratives_pct": {
      "security": 4.4,
      "identity": 20.4,
      "economy": 3,
      "humanitarianism": 71.3,
      "demography": 0.8
    },
    "dominant_narrative": "humanitarianism",
    "asylum_seekers_pct_population_2017": 0.83,
    "conversation_rank_per_capita": 11,
    "local_issues": [
      "The Cyprus problem"
    ],
    "political_events": [
      "Turkish presidential election June 2018",
      "EU migration summit",
      "Argonaut 2018 civil-military exercise",
      "Turkey arrests two Greek soldiers at the border",
      "Cypriot financial crisis 2012-2013"
    ],
    "politics_focus": "European",
    "dominant_channel": "online news",
    "tone": "no tone slide in deck; news-led",
    "existential_anxiety": "cultural identity",
    "quote_anti": "Today, refugees take the place of Turkish invaders to eradicate what remains of our national identity.",
    "quote_pro": "The Republic of Cyprus, as a modern European state, must offer the best possible support to asylum seekers",
    "one_line": "Cyprus sees every migrant through 1974: Greek Cypriots call themselves refugees, so they either feel for newcomers or fear Turkey is sending them."
  },
  {
    "code": "CZ",
    "country": "Czech Republic",
    "total_posts": 354000,
    "narratives_pct": {
      "security": 60,
      "identity": 21,
      "economy": 7,
      "humanitarianism": 7,
      "demography": 5
    },
    "dominant_narrative": "security",
    "asylum_seekers_pct_population_2017": 0.03,
    "conversation_rank_per_capita": 15,
    "local_issues": [
      "Politicization of migration"
    ],
    "political_events": [
      "2017 parliamentary election (Babis wins)",
      "2018 presidential election (Zeman beats Drahos)",
      "June 2018 EU migration summit",
      "Babis refuses 450 migrants rescued by Italy",
      "Dublin IV and EU quota dispute",
      "Criminal investigation of Babis"
    ],
    "politics_focus": "European",
    "dominant_channel": "online news (most engagement; content split with Twitter and blogs)",
    "tone": "conversational; anti-migrant claims presented as fact",
    "existential_anxiety": "personal safety and cultural identity",
    "quote_anti": "The risk of subsequent terrorism increases with every single Muslim migrant.",
    "quote_pro": "PM of the country that accepted 12 migrants wants to fight against illegal migration.",
    "one_line": "The Czech Republic has 12 accepted migrants but a huge security debate, because politicians used migration to win elections and fight Brussels."
  },
  {
    "code": "DE",
    "country": "Germany",
    "total_posts": 8393000,
    "narratives_pct": {
      "security": 50.2,
      "identity": 34.3,
      "economy": 3.9,
      "humanitarianism": 7.8,
      "demography": 3.8
    },
    "dominant_narrative": "security",
    "asylum_seekers_pct_population_2017": 0.39,
    "conversation_rank_per_capita": 8,
    "local_issues": [
      "Turkish immigrants and the Mesut Ozil row",
      "CDU-CSU fight over border transit centres",
      "BAMF asylum office scandal"
    ],
    "political_events": [
      "2017 federal election: AfD 12.6%, 94 seats",
      "EU Migration Summit",
      "CDU-CSU agreement on transit centres"
    ],
    "politics_focus": "domestic",
    "dominant_channel": "Twitter (over 65%)",
    "tone": "conversational, with factual statements used to carry radical arguments",
    "existential_anxiety": "personal safety",
    "quote_anti": "I can live well with 1 million refugees. But with 6 million AfD voters...?",
    "quote_pro": "It's NOT the #Migration - but #racism and #discrimination that are the root of all problems!",
    "one_line": "Half of all German talk is about security; the other big block is a fight over who is losing German identity, migrants or racists."
  },
  {
    "code": "DK",
    "country": "Denmark",
    "total_posts": 156000,
    "narratives_pct": {
      "security": 29.5,
      "identity": 14.7,
      "economy": 24.4,
      "humanitarianism": 28.2,
      "demography": 2.5
    },
    "dominant_narrative": "security",
    "asylum_seekers_pct_population_2017": 0.48,
    "conversation_rank_per_capita": 18,
    "local_issues": [
      "Local elections shaped by migration",
      "Ghetto laws and assimilation"
    ],
    "political_events": [
      "Local elections November 2017",
      "Ghetto laws passed",
      "EU28 migration summit",
      "EU bars Denmark from keeping Schengen border controls",
      "Tax law and Finance Act negotiations",
      "2019 general and EP elections ahead"
    ],
    "politics_focus": "mixed",
    "dominant_channel": "Twitter (almost half)",
    "tone": "highly passionate and polarized",
    "existential_anxiety": "economic stability and cultural identity",
    "quote_anti": "Immigration to Denmark is only a gain if immigrants come to work.",
    "quote_pro": "The asylum system is broken, yes, but our Social Democracy does not fix it.",
    "one_line": "Denmark argues whether its welfare state can survive open borders, and the answer in politics is ghetto laws and stricter rules."
  },
  {
    "code": "EE",
    "country": "Estonia",
    "total_posts": 11100,
    "narratives_pct": {
      "security": 68.2,
      "identity": 5.6,
      "economy": 2.1,
      "humanitarianism": 18.2,
      "demography": 5.9
    },
    "dominant_narrative": "security",
    "asylum_seekers_pct_population_2017": 0.03,
    "conversation_rank_per_capita": 28,
    "local_issues": [
      "Russia Looms in the Background"
    ],
    "political_events": [
      "EU28 migration summit, June 2018",
      "EKRE politician Jaak Madison proposes #ESTEXIT",
      "US immigration policy changes under Trump",
      "Aquarius refugee ship",
      "Estonian border construction with drones"
    ],
    "politics_focus": "European",
    "dominant_channel": "online news",
    "tone": "polarized, anti-migrant (no tone slide in deck)",
    "existential_anxiety": "personal safety",
    "quote_anti": "The V4 leaders have opposed the policy of mass influx of immigrants in Brussels, and the attitude was supported by voters.",
    "quote_pro": "The guiding principle of each migration policy should be the protection of children's interests.",
    "one_line": "Estonia has almost no migrants, so migration is a proxy for fear of Russia and a tool the nationalist right uses to attack the government and the EU."
  },
  {
    "code": "ES",
    "country": "Spain",
    "total_posts": 4400000,
    "narratives_pct": {
      "security": 1.3,
      "identity": 0.5,
      "economy": 1.3,
      "humanitarianism": 94.6,
      "demography": 2.3
    },
    "dominant_narrative": "humanitarianism",
    "asylum_seekers_pct_population_2017": 0.01,
    "conversation_rank_per_capita": 9,
    "local_issues": [
      "The Crisis Changes the Conversation (Aquarius, pateras, Vox, Ceuta, forums)"
    ],
    "political_events": [
      "Pedro Sanchez accepts the Aquarius refugee ship, June 2018",
      "Vox youth wing hangs 'Squatters and refugees welcome' banner at Podemos leader's villa",
      "Podemos leadership villa scandal",
      "Cristiano Ronaldo tax scandal and World Cup",
      "Hungary passes 'Stop Soros' law",
      "Senegalese migrant protests in Lavapies, Madrid"
    ],
    "politics_focus": "mixed",
    "dominant_channel": "Twitter (84-87%)",
    "tone": "conversational, polarized in economy and identity",
    "existential_anxiety": "economic stability and cultural identity",
    "quote_anti": "Permanent mass immigration is not sustainable.",
    "quote_pro": "The dignity of a person does not depend on whether he is a citizen, migrant or refugee.",
    "one_line": "Spain's conversation is a burst of pride in welcoming the Aquarius, with a small but growing far-right current that turns migration into a stick to beat left-wing politicians."
  },
  {
    "code": "FI",
    "country": "Finland",
    "total_posts": 12390,
    "narratives_pct": {
      "security": 19.1,
      "identity": 17.2,
      "economy": 12.7,
      "humanitarianism": 50.3,
      "demography": 0.7
    },
    "dominant_narrative": "humanitarianism",
    "asylum_seekers_pct_population_2017": 0.23,
    "conversation_rank_per_capita": 17,
    "local_issues": [
      "Welfare Nationalism"
    ],
    "political_events": [
      "Turku stabbing attack by Moroccan asylum seeker",
      "Finnish presidential elections 2018",
      "Interior Minister Mykkanen's commissioned report on the asylum process",
      "EU Court ruling on child family reunification",
      "European Council meeting on external border control",
      "Juha Sipila re-elected 2015"
    ],
    "politics_focus": "domestic",
    "dominant_channel": "Twitter (online news drives engagement)",
    "tone": "neutral",
    "existential_anxiety": "economic stability",
    "quote_anti": "If you read the article it becomes clear that migrants are a burden for the Finnish economy. They use social services more than they pay taxes.",
    "quote_pro": "The worst security threat for the country is not migrants but the marginalization and social exclusion of Finnish people.",
    "one_line": "Finland argues about migration as a question of who deserves the welfare state, with both sides fighting over a broken asylum process."
  },
  {
    "code": "FR",
    "country": "France",
    "total_posts": 7236000,
    "narratives_pct": {
      "security": 4.9,
      "identity": 7.3,
      "economy": 2.0,
      "humanitarianism": 85.6,
      "demography": 0.2
    },
    "dominant_narrative": "humanitarianism",
    "asylum_seekers_pct_population_2017": 0.41,
    "conversation_rank_per_capita": 7,
    "local_issues": [
      "Calais camp",
      "international financial conspiracy and Soros",
      "Aquarius rescue ship"
    ],
    "political_events": [
      "Macron asylum and immigration bill 2018",
      "Aquarius turned away, June 2018"
    ],
    "politics_focus": "European",
    "dominant_channel": "Twitter, plus blogs and news sites",
    "tone": "reserved and conversational; security is the heated part",
    "existential_anxiety": "moral standing of the state; cultural identity",
    "quote_anti": "We must stop believing that all these people are refugees, they are economic migrants.",
    "quote_pro": "It is the honor of France to welcome the refugees, the persecuted, those who flee the war.",
    "one_line": "France argues about whether the state is doing too much or too little for migrants; both sides attack Macron from the humanitarian angle."
  },
  {
    "code": "GR",
    "country": "Greece",
    "total_posts": 208700,
    "narratives_pct": {
      "security": 51.8,
      "identity": 10.5,
      "economy": 0.4,
      "humanitarianism": 27.8,
      "demography": 9.6
    },
    "dominant_narrative": "security",
    "asylum_seekers_pct_population_2017": 0.17,
    "conversation_rank_per_capita": 19,
    "local_issues": [
      "Tensions with Turkey"
    ],
    "political_events": [
      "EU migration summit, June 2018",
      "EU-Turkey migration deal",
      "Macedonia name dispute",
      "Greek border guards detained by Turkey",
      "Far-right parties meet in Prague",
      "Trump's migration policies",
      "Greece extends Turkish visa program by one year"
    ],
    "politics_focus": "mixed",
    "dominant_channel": "blogs and online news",
    "tone": "polarized, blogs more passionate than news (no tone slide in deck)",
    "existential_anxiety": "personal safety",
    "quote_anti": "We can not allow the \"tsunami\" of uncontrolled immigration",
    "quote_pro": "Migration is not a Greek privilege.",
    "one_line": "Greece talks about migration as a border and policing problem tied to Turkey, while a strong humanitarian streak calls out the hypocrisy of a country that is itself emigrating."
  },
  {
    "code": "HR",
    "country": "Croatia",
    "total_posts": 84000,
    "narratives_pct": {
      "security": 61.4,
      "identity": 2.4,
      "economy": 0.6,
      "humanitarianism": 34.8,
      "demography": 0.6
    },
    "dominant_narrative": "security",
    "asylum_seekers_pct_population_2017": 0.01,
    "conversation_rank_per_capita": 20,
    "local_issues": [
      "The Yugoslav War"
    ],
    "political_events": [
      "2016 parliamentary election won by HDZ with Orban's support",
      "EU migration summit, June 2018",
      "Football World Cup 2018, Croatia in the final",
      "Migrants shot at on the Serbian-Bosnian border",
      "Hungarian pre-election anti-migrant videos"
    ],
    "politics_focus": "European",
    "dominant_channel": "online news, Twitter and blogs",
    "tone": "polarized, security pushed by more unique authors (no tone slide in deck)",
    "existential_anxiety": "personal safety",
    "quote_anti": "Orban thinks migrants should not be given a single cent",
    "quote_pro": "If refugees come, we need to treat them the way we wanted to be treated when we were refugees. Nothing more and nothing less than that. Croatia, remember.",
    "one_line": "Croatia is split between remembering its own war refugees and a new security frame imported from Hungary that treats migrants at the border as a threat."
  },
  {
    "code": "HU",
    "country": "Hungary",
    "total_posts": 385100,
    "narratives_pct": {
      "security": 86.6,
      "identity": 1.8,
      "economy": 2.9,
      "humanitarianism": 8.3,
      "demography": 0.3
    },
    "dominant_narrative": "security",
    "asylum_seekers_pct_population_2017": 0.04,
    "conversation_rank_per_capita": 13,
    "local_issues": [
      "George Soros campaign",
      "Stop Soros bill against civil society",
      "Investment Immigration Program profits",
      "emigration of skilled Hungarians"
    ],
    "political_events": [
      "2018 parliamentary election built on migration fear",
      "Hungary loses EU quota lawsuit"
    ],
    "politics_focus": "domestic, government-driven",
    "dominant_channel": "online news sites and aggregators",
    "tone": "highly passionate",
    "existential_anxiety": "personal safety, manufactured by government",
    "quote_anti": "Migration is a mistake that you can make only once. You have no chance for correction.",
    "quote_pro": "Orban saves us from migrants. But who will save us from Orban?!",
    "one_line": "Almost nine in ten posts are about a security threat from migrants who are not there; the pushback is about corruption and emigration, not migrants."
  },
  {
    "code": "IE",
    "country": "Ireland",
    "total_posts": 525600,
    "narratives_pct": {
      "security": 20,
      "identity": 10,
      "economy": 6,
      "humanitarianism": 47,
      "demography": 17
    },
    "dominant_narrative": "humanitarianism",
    "asylum_seekers_pct_population_2017": 0.13,
    "conversation_rank_per_capita": 6,
    "local_issues": [
      "Irish Migration",
      "Brexit",
      "Abortion"
    ],
    "political_events": [
      "Brexit and the Irish border",
      "8th amendment abortion referendum 2018",
      "Project Ireland 2040",
      "Trump administration child separation policy",
      "World Refugee Day and Refugee Week 2018",
      "France wins the World Cup with an immigrant-heavy team"
    ],
    "politics_focus": "mixed",
    "dominant_channel": "Twitter (almost 90%)",
    "tone": "reserved, conversational; most passionate on economy",
    "existential_anxiety": "economic stability",
    "quote_anti": "Across our land we can house thousands of migrants yet we cannot look after our own #Homeless in Ireland.",
    "quote_pro": "Evidence suggests that immigrants contribute more to an economy than they take out.",
    "one_line": "Ireland is warm to migrants because of its own famine history, and the only real friction is housing and homelessness, not migrants themselves."
  },
  {
    "code": "IT",
    "country": "Italy",
    "total_posts": 7465000,
    "narratives_pct": {
      "security": 34.4,
      "identity": 0.5,
      "economy": 18.9,
      "humanitarianism": 45.2,
      "demography": 1.1
    },
    "dominant_narrative": "humanitarianism",
    "asylum_seekers_pct_population_2017": 0.19,
    "conversation_rank_per_capita": 4,
    "local_issues": [
      "The Italian Mafia"
    ],
    "political_events": [
      "General elections, March 2018",
      "Salvini refuses docking to the Aquarius rescue ship, June 2018",
      "Red shirt (#magliettarossa) campaign and the #bluetshirt counter-campaign",
      "Migrant protest in Rome after the Via Curtatone eviction"
    ],
    "politics_focus": "domestic",
    "dominant_channel": "Twitter",
    "tone": "reserved and conversational; passionate only on identity",
    "existential_anxiety": "economic stability and personal safety",
    "quote_anti": "It is easier to find a home for refugees than for an Italian family in difficulty",
    "quote_pro": "What I am afraid of is your inhumanity, not the people desperately flee their homes because they want to live.",
    "one_line": "Italy argues over whether to help the people landing on its shores, and the loudest answer is that Italians in need should come first."
  },
  {
    "code": "LT",
    "country": "Lithuania",
    "total_posts": 24700,
    "narratives_pct": {
      "security": 35,
      "identity": 4,
      "economy": 5.9,
      "humanitarianism": 36,
      "demography": 19
    },
    "dominant_narrative": "humanitarianism",
    "asylum_seekers_pct_population_2017": 0.04,
    "conversation_rank_per_capita": null,
    "local_issues": [
      "The Russian Question",
      "The Emigration Question"
    ],
    "political_events": [
      "EU migration summit, June 2018",
      "Scandal over Russian access to confidential material in the Migration Department of the Ministry of Interior",
      "Lithuania pledges aid to Crimean refugees",
      "Melania Trump's jacket at a migrant child detention centre",
      "Salvini's election victory in Italy",
      "Seehofer calls the EU summit weak on security",
      "Brexit"
    ],
    "politics_focus": "European",
    "dominant_channel": "online news portals",
    "tone": "not reported in the deck",
    "existential_anxiety": "personal safety (Russia) and economic stability (emigration)",
    "quote_anti": null,
    "quote_pro": null,
    "one_line": "Lithuania uses the migration topic to talk about two things it fears more: Russia and its own people leaving."
  },
  {
    "code": "LU",
    "country": "Luxembourg",
    "total_posts": 20000,
    "narratives_pct": {
      "security": 40.9,
      "identity": 12.6,
      "economy": 2.6,
      "humanitarianism": 44,
      "demography": 0.6
    },
    "dominant_narrative": "humanitarianism",
    "asylum_seekers_pct_population_2017": 0.23,
    "conversation_rank_per_capita": 14,
    "local_issues": [],
    "political_events": [
      "Merkel and Macron meet on a European migrant strategy",
      "Informal EU working meeting on migration in Brussels",
      "French National Assembly passes a tough new immigration law",
      "Luxembourg releases 400,000 euros for an EIB migration programme",
      "Ellwangen incident with migrants and police in Germany",
      "Spain announces plans to change border protection at Ceuta and Melilla"
    ],
    "politics_focus": "European",
    "dominant_channel": "Twitter (German), with online news and blogs shaping opinion",
    "tone": "conversational, reserved and factual; passionate on humanitarianism",
    "existential_anxiety": "cultural identity (German speakers) and housing pressure",
    "quote_anti": "We constantly say that a minority must be protected. But this minority will become the majority.",
    "quote_pro": "People from 175 countries live peacefully together in the Grand Duchy.",
    "one_line": "Luxembourg is open to migrants and proud of it, but its German-speaking residents import Germany's crime and Islam fears and its French speakers import France's."
  },
  {
    "code": "LV",
    "country": "Latvia",
    "total_posts": 45300,
    "narratives_pct": {
      "security": 35,
      "identity": 10,
      "economy": 4,
      "humanitarianism": 39,
      "demography": 12
    },
    "dominant_narrative": "humanitarianism",
    "asylum_seekers_pct_population_2017": 0.01,
    "conversation_rank_per_capita": 22,
    "local_issues": [
      "The Russian Threat",
      "The Latvian Exodus"
    ],
    "political_events": [
      "Russian annexation of Crimea and its refugees",
      "Government remigration pilot project",
      "EU 2018 budget agreement",
      "Orbán's call to stop the invasion with a strong border",
      "Polish believers' prayer at the border"
    ],
    "politics_focus": "mixed",
    "dominant_channel": "Twitter and online news sites equally",
    "tone": "news sites objective, Twitter polarizing",
    "existential_anxiety": "economic stability and cultural identity",
    "quote_anti": "Helping refugees may be a duty, but accepting migrants to live in our country is evil stupidity.",
    "quote_pro": "It would be brave to calm down and stop being agitated about the idea that refugees will ruin Latvia and dilute Latvian-ism.",
    "one_line": "Latvia's migration talk is an anxiety spiral about Latvians leaving, Russians staying, and a country that must first become liveable for its own people."
  },
  {
    "code": "MT",
    "country": "Malta",
    "total_posts": 68400,
    "narratives_pct": {
      "security": 22,
      "identity": 20,
      "economy": 5,
      "humanitarianism": 47,
      "demography": 6
    },
    "dominant_narrative": "humanitarianism",
    "asylum_seekers_pct_population_2017": null,
    "conversation_rank_per_capita": 3,
    "local_issues": [
      "Maltese Sovereignty"
    ],
    "political_events": [
      "Lifeline rescue ship standoff",
      "Aquarius standoff with Italy and Spain",
      "Malta closes its ports to NGO rescue vessels",
      "National Statistics Office population projections",
      "World Refugee Day"
    ],
    "politics_focus": "European",
    "dominant_channel": "Twitter (about 90%)",
    "tone": "conversational on sympathy; passionate on economy, security and identity",
    "existential_anxiety": "personal safety and cultural identity (sovereignty)",
    "quote_anti": "As a nation we are only obliged to take them in if they re in our 12 mile radius.",
    "quote_pro": "Saving the life of someone fleeing war and poverty is an act of humanity.",
    "one_line": "Malta debates who counts as a real refugee and insists the EU, not a tiny island, must carry the load."
  },
  {
    "code": "NL",
    "country": "Netherlands",
    "total_posts": 1438600,
    "narratives_pct": {
      "security": 32,
      "identity": 34,
      "economy": 4.7,
      "humanitarianism": 28,
      "demography": 0.6
    },
    "dominant_narrative": "identity",
    "asylum_seekers_pct_population_2017": 0.52,
    "conversation_rank_per_capita": 10,
    "local_issues": [
      "Islamization & Right-Wing Populism"
    ],
    "political_events": [
      "EU migration summit, June 2018",
      "Aquarius crisis",
      "EU gives 3 billion euros to Turkey",
      "Rutte dividend tax scandal",
      "Mali mission debate",
      "Supreme Court declares Afghanistan a safe country"
    ],
    "politics_focus": "mixed",
    "dominant_channel": "Twitter (70%)",
    "tone": "highly polarized and passionate in every narrative",
    "existential_anxiety": "cultural identity",
    "quote_anti": "Diversity and mass migration does NOT bring enrichment. There is only evidence to the contrary.",
    "quote_pro": "Can you explain why immigration is so much more important to you than your own prosperity?",
    "one_line": "The Netherlands, once proud of multiculturalism, now talks about migration mainly as a clash between Islam and European identity."
  },
  {
    "code": "PL",
    "country": "Poland",
    "total_posts": 68400,
    "narratives_pct": {
      "security": 86.5,
      "identity": 3.1,
      "economy": 0.8,
      "humanitarianism": 8.3,
      "demography": 1.3
    },
    "dominant_narrative": "security",
    "asylum_seekers_pct_population_2017": 0.04,
    "conversation_rank_per_capita": 28,
    "local_issues": [
      "Role of Catholic religion",
      "Ukrainian guest workers"
    ],
    "political_events": [
      "EU migration summit (June 2018)",
      "Visegrad Four joint opposition to EU relocation quota",
      "Dublin Regulations debate",
      "Government new migration policy (2.9 billion PLN) announced for September",
      "Morawiecki 10 million USD aid pledge for Syrian refugees in Lebanon",
      "Rimini rape case with Polish victims",
      "German New Year's Eve attacks"
    ],
    "politics_focus": "mixed",
    "dominant_channel": "Twitter (over 70%)",
    "tone": "largely reserved; security and economy trigger intense emotion; bot activity suspected",
    "existential_anxiety": "personal safety",
    "quote_anti": "I'm religious. But if I had listened to God and allow migrants in the country, then we would face a huge raise in crime rate.",
    "quote_pro": "Will all immigrants rape and blow themselves up? On the principle of \"every drunk is a thief\"? Maybe just start thinking instead of repeating stupid stereotypes!",
    "one_line": "A country with almost no refugees talks about them almost only as a crime threat, and argues that taking in Ukrainians already paid its humanitarian debt."
  },
  {
    "code": "PT",
    "country": "Portugal",
    "total_posts": 102700,
    "narratives_pct": {
      "security": 30.9,
      "identity": 9.6,
      "economy": 0.4,
      "humanitarianism": 57.7,
      "demography": 1.3
    },
    "dominant_narrative": "humanitarianism",
    "asylum_seekers_pct_population_2017": 0.01,
    "conversation_rank_per_capita": null,
    "local_issues": [
      "Portuguese emigration"
    ],
    "political_events": [
      "EU migration summit",
      "Aquarius rescue ship docking in Valencia",
      "Trump child detention centres in the US",
      "Eurovision 2018 in Lisbon",
      "Change of the foreigners law (residence permits with a work contract promise)",
      "Aung San Suu Kyi and Myanmar ethnic cleansing accusations"
    ],
    "politics_focus": "European",
    "dominant_channel": "Twitter (about half) and online news sites",
    "tone": "largely reserved; vigorous on cultural consequences",
    "existential_anxiety": "economic stability",
    "quote_anti": "If you are an IMMIGRANT, you have NO right to complain about how the country is administered OR try to change the country. You're a guest.",
    "quote_pro": "The dignity of a person does not depend on whether they are citizens, migrants or refugees. Saving the life of those who run away from war and misery is an act of humanity.",
    "one_line": "Portugal watches the migration crisis from afar with compassion, while its real worry is its own young people leaving and the jobs that stay empty."
  },
  {
    "code": "RO",
    "country": "Romania",
    "total_posts": 364600,
    "narratives_pct": {
      "security": 64.4,
      "identity": 5.3,
      "economy": 4.8,
      "humanitarianism": 19.9,
      "demography": 5.6
    },
    "dominant_narrative": "security",
    "asylum_seekers_pct_population_2017": 0.01,
    "conversation_rank_per_capita": 20,
    "local_issues": [
      "The Romanian exodus"
    ],
    "political_events": [
      "Hungary refusing EU quotas",
      "Macron visit and Schengen accession talks for Romania and Bulgaria",
      "Romania offers to relocate 1,942 refugees from Greece and Italy",
      "Romania pledges 5.3 million euros Syrian humanitarian aid on World Humanitarian Day",
      "Trump administration family separations",
      "Refugees found on a train in Timisoara",
      "Black Sea boat interceptions"
    ],
    "politics_focus": "European",
    "dominant_channel": "online news sites and blogs (Twitter under 10%)",
    "tone": "neutral, conversational, indifferent",
    "existential_anxiety": "economic stability",
    "quote_anti": "The integration of Muslim refugees or of those who come from other cultures is impossible.",
    "quote_pro": "The approximately 4,000 former prisoners who will burst through the streets without any preparation to this situation are infinitely more dangerous to society than some people, be they from a different culture, fleeing bombs, just wanting to survive.",
    "one_line": "Romanians read security news about migrants as a foreign story; the loss that scares them is the three million compatriots who left."
  },
  {
    "code": "SE",
    "country": "Sweden",
    "total_posts": 1921000,
    "narratives_pct": {
      "security": 25.9,
      "identity": 15.3,
      "economy": 8,
      "humanitarianism": 49.9,
      "demography": 1
    },
    "dominant_narrative": "humanitarianism",
    "asylum_seekers_pct_population_2017": 1.74,
    "conversation_rank_per_capita": 1,
    "local_issues": [
      "2018 Swedish general elections"
    ],
    "political_events": [
      "2018 Swedish general election (September)",
      "Sweden Democrats gain 12.9% and become third largest party",
      "Social Democrats' historic losses and shift to restrictive migration stance",
      "2015 intake of 163,000 migrants",
      "Jogging policemen initiative",
      "Retirement age raised by new political agreement",
      "Migration Office handling of unaccompanied minors' age assessments"
    ],
    "politics_focus": "domestic",
    "dominant_channel": "Twitter (content); newspapers (engagement)",
    "tone": "passionate, emotionally charged, especially before the election",
    "existential_anxiety": "cultural identity and personal safety",
    "quote_anti": "The Swedish people should not have to ward off their welfare and be taxed to support bankrupt migrants! Close the border & start deporting!",
    "quote_pro": "Everyday it hurts our hearts...Please stop sending back children and adolescents and adults to a country where people die every day.",
    "one_line": "Sweden argues with itself over whether its humanitarian self-image survived 2015, and the 2018 election turned that argument into a fight over failed integration."
  },
  {
    "code": "SI",
    "country": "Slovenia",
    "total_posts": 231300,
    "narratives_pct": {
      "security": 44.8,
      "identity": 18.5,
      "economy": 5.2,
      "humanitarianism": 22.3,
      "demography": 9.2
    },
    "dominant_narrative": "security",
    "asylum_seekers_pct_population_2017": 0.01,
    "conversation_rank_per_capita": 5,
    "local_issues": [
      "Parliamentary election 2018"
    ],
    "political_events": [
      "Parliamentary elections on 3 June 2018",
      "SDS (Janez Jansa) wins most votes but a five-party coalition under Marjan Sarec forms the government",
      "Deportation of Syrian refugee Ahmad Shamieh",
      "Aquarius denied docking in Italy and Malta",
      "Migrants leaving the Velika Kladusa camp in Bosnia towards Slovenia",
      "Border fence with Croatia built by the previous government",
      "SDS election billboard '1963 eur per migrant? Stop!'"
    ],
    "politics_focus": "mixed",
    "dominant_channel": "Twitter",
    "tone": "fear-driven and strongly political",
    "existential_anxiety": "personal safety",
    "quote_anti": "Some are shouting that we need migrants as a workforce. Those idiots don't get it that refugees didn't come here to work, but to spread Islam. With terror.",
    "quote_pro": "Perhaps Ahmed Shamiah's biggest problem is that he is completely opposite to the disguised stereotype of a dangerous migrant.",
    "one_line": "Right-wing politicians turned a near-absent refugee presence into the central fear of the 2018 election, and one deported barber became the counter-example."
  },
  {
    "code": "SK",
    "country": "Slovakia",
    "total_posts": 87000,
    "narratives_pct": {
      "security": 21.9,
      "identity": 5.4,
      "economy": 2.5,
      "humanitarianism": 66.9,
      "demography": 3.2
    },
    "dominant_narrative": "humanitarianism",
    "asylum_seekers_pct_population_2017": 0.02,
    "conversation_rank_per_capita": null,
    "local_issues": [
      "Relation with the European Union"
    ],
    "political_events": [
      "EU migration summit",
      "Slovak lawsuit against the EU quota system (2015)",
      "Robert Fico succeeded by Peter Pellegrini (March 2018)",
      "EU budget draft 2021-2027 and cohesion funds",
      "Potential EU legal suit against Hungary over the Stop Soros law",
      "Zvolen integration centre funding scandal",
      "Pellegrini meeting Macron",
      "Umbrella March in Bratislava on World Refugee Day"
    ],
    "politics_focus": "European",
    "dominant_channel": "online news sites",
    "tone": "exceptionally reserved, placid",
    "existential_anxiety": "economic stability",
    "quote_anti": "Orban won the election because he does what his voters want from him. He stops migrants with a fence, so they rewarded him.",
    "quote_pro": "Bible says: a widow, an orphan, a foreigner, a migrant – all of those that are most lonely and vulnerable.",
    "one_line": "Slovaks feel for refugees as Christians and want the EU to handle the problem at its outer borders, so long as it does not cost them their cohesion funds."
  },
  {
    "code": "UK",
    "country": "United Kingdom",
    "total_posts": 11664000,
    "narratives_pct": {
      "security": 46.5,
      "identity": 0.6,
      "economy": 3.4,
      "humanitarianism": 39.3,
      "demography": 10.2
    },
    "dominant_narrative": "security",
    "asylum_seekers_pct_population_2017": 0.05,
    "conversation_rank_per_capita": 2,
    "local_issues": [
      "Brexit"
    ],
    "political_events": [
      "Brexit referendum (23 June 2016) and exit date 29 March 2019",
      "Windrush scandal",
      "Hostile environment policy",
      "Leak of Home Office post-Brexit migration policy",
      "Parsons Green bombing arrests",
      "CDU-CSU row over Merkel's migration policy",
      "US border family separations",
      "Refugee Week 2018",
      "UK air strikes on Syria",
      "High Court challenge over NHS Digital data sharing with the Home Office"
    ],
    "politics_focus": "mixed",
    "dominant_channel": "Twitter (over 90%)",
    "tone": "passionate and conversational in equal measure; identity and demographics most emotional",
    "existential_anxiety": "cultural identity and economic stability",
    "quote_anti": "If they are in France, they can't be refugees. France is a safe country. UK shouldn't let ANY of them in",
    "quote_pro": "Without its small army of immigrant doctors & nurses - my amazing, dedicated colleagues - the NHS would collapse.",
    "one_line": "Britain's migration talk is a Brexit proxy war: who belongs, who the Home Office mistreats, and whether the economy can run without migrants."
  }
];
