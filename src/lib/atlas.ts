export type AtlasCase = {
  id: string;
  name: string;
  sectorRegion: string;
  /** Which sector page shows the case: "brands", "health" or "public". */
  sector: string;
  lat: number;
  lng: number;
  essence: string;
  /** Where the case can be read: its study page, or its anchor on /research. */
  href?: string;
  /** Link text for a case that has its own page. Defaults to "See the study". */
  linkLabel?: string;
  image?: { src: string; alt: string; width: number; height: number; framed?: boolean };
  /** Two or three headline numbers. */
  stats?: Array<{ value: string; label: string }>;
  /**
   * A case that spans several places. Each location is lit on the globe and
   * opens the case with its own tab selected. The first is the case's home.
   */
  locations?: AtlasLocation[];
  /** Heading above each location's list of places. */
  locationsListTitle?: string;
  ranking?: { title: string; items: string[] };
  /** Set on globe points: the case shown first, and the place it stands for. */
  caseId?: string;
  locationId?: string;
  /** Every case that can be read at this globe point. */
  here?: Array<{ caseId: string; locationId?: string }>;
};

export type AtlasLocation = {
  id: string;
  label: string;
  lat: number;
  lng: number;
  /** A line about this place. Locations with one are shown as tabs. */
  character?: string;
  places?: string[];
};

// Capitals, used for studies that cover whole countries. Cases that share a
// capital share one globe point.
const PLACES: Record<string, { label: string; lat: number; lng: number }> = {
  AF: { label: "Afghanistan", lat: 34.5553, lng: 69.2075 },
  AL: { label: "Albania", lat: 41.3275, lng: 19.8187 },
  AR: { label: "Argentina", lat: -34.6037, lng: -58.3816 },
  AT: { label: "Austria", lat: 48.2082, lng: 16.3738 },
  BE: { label: "Belgium", lat: 50.8503, lng: 4.3517 },
  BG: { label: "Bulgaria", lat: 42.6977, lng: 23.3219 },
  BR: { label: "Brazil", lat: -15.7939, lng: -47.8828 },
  CA: { label: "Canada", lat: 45.4215, lng: -75.6972 },
  CY: { label: "Cyprus", lat: 35.1856, lng: 33.3823 },
  CZ: { label: "Czech Republic", lat: 50.0755, lng: 14.4378 },
  DE: { label: "Germany", lat: 52.52, lng: 13.405 },
  DK: { label: "Denmark", lat: 55.6761, lng: 12.5683 },
  EE: { label: "Estonia", lat: 59.437, lng: 24.7536 },
  ES: { label: "Spain", lat: 40.4168, lng: -3.7038 },
  FI: { label: "Finland", lat: 60.1699, lng: 24.9384 },
  FR: { label: "France", lat: 48.8566, lng: 2.3522 },
  GB: { label: "United Kingdom", lat: 51.5072, lng: -0.1276 },
  GR: { label: "Greece", lat: 37.9838, lng: 23.7275 },
  HR: { label: "Croatia", lat: 45.815, lng: 15.9819 },
  HU: { label: "Hungary", lat: 47.4979, lng: 19.0402 },
  ID: { label: "Indonesia", lat: -6.2088, lng: 106.8456 },
  IE: { label: "Ireland", lat: 53.3498, lng: -6.2603 },
  IN: { label: "India", lat: 28.6139, lng: 77.209 },
  IQ: { label: "Iraq", lat: 33.3152, lng: 44.3661 },
  IS: { label: "Iceland", lat: 64.1466, lng: -21.9426 },
  IT: { label: "Italy", lat: 41.9028, lng: 12.4964 },
  LT: { label: "Lithuania", lat: 54.6872, lng: 25.2797 },
  LU: { label: "Luxembourg", lat: 49.6116, lng: 6.1319 },
  LV: { label: "Latvia", lat: 56.9496, lng: 24.1052 },
  ME: { label: "Montenegro", lat: 42.4304, lng: 19.2594 },
  MK: { label: "North Macedonia", lat: 41.9981, lng: 21.4254 },
  MT: { label: "Malta", lat: 35.8989, lng: 14.5146 },
  NG: { label: "Nigeria", lat: 9.0765, lng: 7.3986 },
  NL: { label: "Netherlands", lat: 52.3676, lng: 4.9041 },
  NO: { label: "Norway", lat: 59.9139, lng: 10.7522 },
  PL: { label: "Poland", lat: 52.2297, lng: 21.0122 },
  PT: { label: "Portugal", lat: 38.7223, lng: -9.1393 },
  RO: { label: "Romania", lat: 44.4268, lng: 26.1025 },
  RU: { label: "Russia", lat: 55.7558, lng: 37.6173 },
  SE: { label: "Sweden", lat: 59.3293, lng: 18.0686 },
  SI: { label: "Slovenia", lat: 46.0569, lng: 14.5058 },
  SK: { label: "Slovakia", lat: 48.1486, lng: 17.1077 },
  SO: { label: "Somalia", lat: 2.0469, lng: 45.3182 },
  SY: { label: "Syria", lat: 33.5138, lng: 36.2765 },
  TH: { label: "Thailand", lat: 13.7563, lng: 100.5018 },
  TN: { label: "Tunisia", lat: 36.8065, lng: 10.1815 },
  TR: { label: "Turkey", lat: 39.9334, lng: 32.8597 },
  US: { label: "United States", lat: 38.9072, lng: -77.0369 },
  ZA: { label: "South Africa", lat: -26.2041, lng: 28.0473 },
};

/** Locations for a list of country codes. The first is the case's home. */
function countries(codes: string): AtlasLocation[] {
  return codes.split(" ").map((code) => ({ id: code.toLowerCase(), ...PLACES[code] }));
}

export type AtlasPoint =
  | (AtlasCase & { status: "active" })
  | {
      id: string;
      status: "inert";
      lat: number;
      lng: number;
    };

export const ACTIVE_ATLAS_CASES: AtlasCase[] = [
  {
    id: "premium-pet-food",
    href: "/research#premium-pet-food",
    name: "Premium pet food, North America",
    sectorRegion: "",
    sector: "brands",
    lat: 43.0389,
    lng: -87.9065,
    essence:
      "What people call premium pet food is not a category in their minds. It is a stage on which owners perform their love — as trainers, as nurturers, as healers. The product is the script.",
  },
  {
    id: "hungary-election-2026",
    href: "/elections",
    name: "The Hungarian Election, 2026",
    sectorRegion: "Public sphere, Europe",
    sector: "public",
    lat: 47.4979,
    lng: 19.0402,
    essence:
      "A polarised electorate is not divided by what people want. It is divided by two opposing psychological architectures — the Employee, who locates safety inside the system, and the Entrepreneur, who locates it in personal agency. Identity comes first. Politics follows.",
  },
  {
    id: "public-health",
    href: "/research#public-health",
    name: "Public health, North America",
    sectorRegion: "",
    sector: "health",
    lat: 38.9072,
    lng: -77.0369,
    essence:
      "The middle of a contested public conversation is not undecided. It accepts the problem exists and rejects the language used to name it. The door is opened by class, not race.",
  },
  {
    id: "non-alcoholic-spirits",
    href: "/research/bare-zero-proof",
    linkLabel: "Read the case study",
    image: {
      src: "/media/bare/bottle-lineup.png",
      alt: "The BARE Zero Proof range of non-alcoholic spirits.",
      width: 1254,
      height: 1033,
    },
    name: "BARE Zero Proof",
    sectorRegion: "Non-alcoholic spirits, North America",
    stats: [
      { value: "214K", label: "public posts" },
      { value: "130K", label: "people talking" },
      { value: "6", label: "personas" },
    ],
    sector: "brands",
    lat: 40.7128,
    lng: -74.006,
    essence:
      "A new beverage category cannot be sold on what it removes. People do not seek the absence of alcohol — they seek a different way to be present in the moments alcohol used to mark. Until the category offers that, it is a substitute. After, it is a choice.",
  },
  {
    id: "body-care-ssa",
    href: "/research#body-care-ssa",
    name: "Beauty and body care, Sub-Saharan Africa",
    sectorRegion: "Body care, four markets",
    sector: "brands",
    lat: -26.2041,
    lng: 28.0473,
    essence:
      "Beauty is not one idea. Every market assembles it differently, and the people who live there rarely spell it out. They show it in how they talk about their skin, what they do for it, and what they admire in others.\n\nFor a body care brand we read those conversations in South Africa, Nigeria, Ghana and Kenya, in the languages people use with each other. Local analysts did the reading. The picture of beauty in each market then went into the brand’s product development workshops.",
    stats: [
      { value: "4", label: "markets" },
      { value: "5", label: "languages" },
    ],
    locations: [
      {
        id: "south-africa",
        label: "South Africa",
        lat: -26.2041,
        lng: 28.0473,
        character: "Read in English, Zulu and Xhosa.",
      },
      { id: "nigeria", label: "Nigeria", lat: 6.5244, lng: 3.3792, character: "Read in English and Pidgin." },
      { id: "ghana", label: "Ghana", lat: 5.6037, lng: -0.187, character: "Read in English and Pidgin." },
      { id: "kenya", label: "Kenya", lat: -1.2921, lng: 36.8219, character: "Read in English and Swahili." },
    ],
  },
  {
    id: "amsterdam-ad-ban",
    href: "/research#amsterdam-ad-ban",
    name: "Amsterdam's Ad Ban: a meat debate in disguise",
    sectorRegion: "Public sphere, Europe",
    sector: "public",
    lat: 52.3676,
    lng: 4.9041,
    essence:
      "On May 1, Amsterdam introduced an ad ban on meat and fossil-fuel products. We explored the reactions of social media users across various channels. The language was English.\n\nWhat we found is that the discourse predominantly focuses on the meat part of the ban, and to a significantly lesser extent on the fossil-fuel part. The fossil-fuel half is largely waved through as common sense. The meat half is where the conversation concentrates.\n\nBy and large, opinions fall into two opposing sides — and which side people land on tends to track whether they're an omnivore or follow a meat-free lifestyle. In this discourse, diet predicts stance more reliably than politics.\n\nSupporters celebrate the policy. They expect that reducing the visibility of meat will normalise vegetarian and vegan options over time, underpinned by a belief that less advertising means meat stops being the default. Other supportive arguments include retribution for the environmental damage attributed to the meat industry, and a smaller group who back the ban because they think fewer ads would have a calming, aesthetic effect on the quality of city life. The stance is anchored in a self-identity as environmentally conscious and forward-looking.\n\nOpponents read the ban as an attack on a normal, everyday way of life — elitist, performative, and a step toward broader censorship. A recurring move is whataboutism: gambling ads are permitted, but meat is where the line is drawn? The register here is largely ridicule and sarcasm rather than evidence, while the supportive side tends toward research, precedent, and moral framing. As a result, the two camps rarely engage directly.\n\nBeneath the meat divide sit two deeper questions that also separate the camps: whether advertising actually changes behaviour, and whether a collective authority should decide what may be promoted. The fossil-fuel half of the ban functions as a useful point of comparison — the same policy, the same city, and the same censorship objection available, yet only meat generates sustained debate. In this discourse, the stronger driver of reaction is dietary identity rather than free-speech principle.",
  },
  {
    id: "tv-show-backdrop",
    name: "TV show locations, Latin America",
    sectorRegion: "TV production",
    sector: "brands",
    lat: -2.7975,
    lng: -40.5137,
    essence:
      "A production needed locations for a high-end show for young viewers in Brazil, Mexico, Argentina and Colombia. We read how young people in each country talk about the places they travel to, and profiled forty destinations by their character, by who goes there, and by the size of their social media audience.\n\nOne desire ran through all four countries: nature, and depth. The deeper a place lies, the more untouched, mystical or psychedelic the experience. Hard access and no signal are part of the appeal.",
    stats: [
      { value: "4", label: "countries" },
      { value: "40", label: "destinations profiled" },
      { value: "12", label: "months of conversation" },
    ],
    locationsListTitle: "Where young people go",
    locations: [
      {
        id: "brazil",
        label: "Brazil",
        lat: -2.7975,
        lng: -40.5137,
        character: "Tourism is a social media statement.",
        places: ["Foz do Iguaçu", "Jericoacoara", "Pipa"],
      },
      {
        id: "mexico",
        label: "Mexico",
        lat: 21.3853,
        lng: -98.9903,
        character: "Tourism is escaping urban reality.",
        places: ["San Miguel de Allende", "Riviera Maya", "Tepoztlán"],
      },
      {
        id: "argentina",
        label: "Argentina",
        lat: -32.9442,
        lng: -60.6505,
        character: "Tourism is diverse and compartmentalized.",
        places: ["Rosario", "Mendoza and the Uco Valley", "Bariloche"],
      },
      {
        id: "colombia",
        label: "Colombia",
        lat: 6.2442,
        lng: -75.5812,
        character: "Tourism is a bold statement of belonging.",
        places: ["Medellín", "Santa Marta", "Cali"],
      },
    ],
    ranking: {
      title: "Top five by character",
      items: ["Jericoacoara, Brazil", "Xilitla, Mexico", "Real de Catorce, Mexico", "Riviera Maya, Mexico", "Jalapão, Brazil"],
    },
  },
  {
    id: "sbnr-work",
    name: "Spiritual but not religious: attitudes to work",
    sectorRegion: "Academic research, worldwide",
    sector: "",
    lat: 32.0158,
    lng: 34.7874,
    essence:
      "“Spiritual but not religious” is a name people give themselves. For Dr. Ben Bulmash of the Holon Institute of Technology we started from that name and followed it through two years of public conversation in English, wherever in the world it was written.\n\nThe question was about work: the values, attitudes and work ethic of people who describe themselves this way, and how their spirituality shows up in everyday life. Nobody was recruited or asked. The study read what this group says to each other and clustered it into the themes they raise themselves.",
    stats: [
      { value: "24", label: "months of conversation" },
      { value: "3", label: "platforms" },
    ],
  },
  {
    id: "vaccination-twelve-countries",
    name: "Childhood vaccination, 12 countries",
    sectorRegion: "Health",
    sector: "health",
    lat: PLACES.BR.lat,
    lng: PLACES.BR.lng,
    locations: countries("BR PL IN DE AR ZA IT RU CZ ID SK TH"),
    essence:
      "In 2018 we read the public conversation about childhood vaccination in twelve countries, each in its own language and with local analysts. The work looked at how doubt about vaccines is argued: who raises it, what they draw on, and where misinformation enters.\n\nIt was run for a vaccine maker, country by country, so that each market could be understood on its own terms and then compared with the others.",
    stats: [
      { value: "12", label: "countries" },
      { value: "4", label: "continents" },
    ],
  },
  {
    id: "nato-youth-dashboard",
    href: "https://www.mccaininstitute.org/resources/blog/recommendations-to-the-nato-alliance-to-collectively-combat-misinformation/",
    linkLabel: "See it at the McCain Institute",
    name: "NATO perception dashboard",
    sectorRegion: "Public sphere, NATO member states",
    sector: "public",
    lat: PLACES.BE.lat,
    lng: PLACES.BE.lng,
    locations: countries(
      "BE AL BG CA HR CZ DK EE FR DE GR HU IS IT LV LT LU ME NL MK NO PL PT RO SK SI ES TR GB US",
    ),
    essence:
      "With the McCain Institute at Arizona State University we built and kept up to date an interactive dashboard of how NATO is perceived in public conversation, and how each of its member states is targeted by misinformation. The project was part-funded by the US Department of State.\n\nThe dashboard held country-by-country data, so that awareness of the alliance and of the threats aimed at it could be compared across all of its members.",
    stats: [
      { value: "30", label: "member states" },
      { value: "14", label: "months" },
    ],
  },
  {
    id: "migration-journeys",
    name: "Migrants in transit, Turkey and Tunisia",
    sectorRegion: "Public sector, client undisclosed",
    sector: "public",
    lat: PLACES.TR.lat,
    lng: PLACES.TR.lng,
    locations: countries("TR TN SY IQ AF NG SO"),
    essence:
      "We read the public social media conversation of people in transit towards Europe, and of the communities that host them, in their own languages and with native analysts. The study followed five groups from their countries of origin through two transit countries.\n\nThe reading came before the survey research, so that the questions could build on what people had already said without being asked.",
    stats: [
      { value: "2", label: "transit countries" },
      { value: "5", label: "countries of origin" },
      { value: "24", label: "months of conversation" },
    ],
  },
  {
    id: "airport-florida",
    name: "Airport travellers, Florida",
    sectorRegion: "Travel, major US airport",
    sector: "brands",
    lat: 27.8,
    lng: -81.6,
    essence:
      "For a major airport in Florida we read a year of what travellers say about passing through it. The work sorted travellers into types by what they need from the airport, and set out what makes the experience better or worse for each.",
    stats: [
      { value: "12", label: "months of conversation" },
      { value: "1,500", label: "posts read by analysts" },
    ],
  },
  {
    id: "university-texas",
    name: "University reputation, Texas",
    sectorRegion: "Higher education, major Texas university",
    sector: "brands",
    lat: 31.5,
    lng: -98.5,
    essence:
      "For a major Texas university we read a year of public conversation about it, among future, current and former students and among people with no tie to it. The question was what defines the university in the national conversation: why people choose it, what they think sets it apart, and what its former students add to its name.\n\nThe reading set the agenda for the interviews that followed.",
    stats: [
      { value: "12", label: "months of conversation" },
      { value: "1,500", label: "posts read by analysts" },
    ],
  },
  {
    id: "flooring-us",
    name: "Flooring, United States",
    sectorRegion: "Home, flooring manufacturer",
    sector: "brands",
    lat: 39.0997,
    lng: -94.5786,
    essence:
      "For a flooring manufacturer we read two years of how people talk about floors: when the subject comes up, what a floor means in a home, whom they trust, and how they choose. A second piece looked from the other side, at how brands, retailers, influencers and media present flooring to the people who buy it.",
    stats: [
      { value: "24", label: "months of conversation" },
      { value: "1,000", label: "posts read by analysts" },
    ],
  },
  {
    id: "retail-loyalty-us",
    name: "Loyalty programme, US retail",
    sectorRegion: "Retail, major US retailer",
    sector: "brands",
    lat: 39.9526,
    lng: -75.1652,
    essence:
      "For a major US retailer we read what members say to each other about its loyalty programme: what they like and dislike, how they use it, and which other programmes they hold it up against.",
  },
  {
    id: "toys-us",
    name: "Children’s toys and collectibles, United States",
    sectorRegion: "Toys, heritage brand",
    sector: "brands",
    lat: 39.7392,
    lng: -104.9903,
    essence:
      "For a toy brand we read two years of how parents talk about what their young daughters play with and collect, and what holds a child’s attention. A second strand read the wider world the brand’s toys belong to, online and off. The work came first, to show later research where to look.",
    stats: [
      { value: "24", label: "months of conversation" },
      { value: "1,500", label: "posts read by analysts" },
    ],
  },
  {
    id: "financial-advice-us",
    name: "Financial advice, United States",
    sectorRegion: "Financial services, national advisory firm",
    sector: "brands",
    lat: 35.2271,
    lng: -80.8431,
    essence:
      "For a national financial advisory firm we read how investors talk about moving their money from one firm to another. A separate study read how people talk about working in the industry.",
  },
  {
    id: "public-participation-azerbaijan",
    name: "Public participation, Azerbaijan",
    sectorRegion: "Public sphere, South Caucasus",
    sector: "public",
    lat: 40.4093,
    lng: 49.8671,
    essence:
      "For a USAID programme in Azerbaijan we read two years of public conversation in Azeri, Russian and English, with a team of local analysts. The reading covered ten social and economic issues, and looked at what helps or hinders people in taking part in public life, among them women, young people and people with disabilities.\n\nIt fed the analysis the programme was designed on. The report itself is not public.",
    stats: [
      { value: "24", label: "months of conversation" },
      { value: "3", label: "languages" },
      { value: "10", label: "issues" },
    ],
  },
  {
    id: "civil-society-kazakhstan",
    name: "Civil society, Kazakhstan",
    sectorRegion: "Public sphere, Central Asia",
    sector: "public",
    lat: 51.1694,
    lng: 71.4491,
    essence:
      "We read two years of public conversation in Kazakhstan, in Russian and Kazakh, about civil society: what people take the term to mean, and how they discuss the organisations that work under it.\n\nThe reading was made to be used together with survey research, in support of NGOs’ part in public debate.",
    stats: [
      { value: "24", label: "months of conversation" },
      { value: "2", label: "languages" },
    ],
  },
  {
    id: "french-election-2017",
    href: "/research/french-election-2017",
    name: "The French Election, 2017",
    sectorRegion: "Public sphere, Europe",
    image: {
      src: "/media/french-election/media-map.png",
      alt: "The Media Map from the report: 17 clusters of non-traditional media sources.",
      width: 1500,
      height: 895,
      framed: true,
    },
    stats: [
      { value: "8M", label: "shared links" },
      { value: "1,000+", label: "media sources" },
      { value: "17", label: "clusters" },
    ],
    sector: "public",
    lat: 48.8566,
    lng: 2.3522,
    essence:
      "Around the 2017 election, French social media had virtually no common ground. People shared links from one side of the media map or the other, and almost never both. Fake news travelled because it answered an emotional need, not because it was believed.",
  },
  {
    id: "migration-narratives-eu",
    href: "/migration",
    name: "Migration Narratives in Europe",
    sectorRegion: "Public sphere, 28 EU member states",
    stats: [
      { value: "28", label: "EU member states" },
      { value: "5", label: "narrative frames" },
    ],
    sector: "public",
    lat: PLACES.DE.lat,
    lng: PLACES.DE.lng,
    locations: countries(
      "DE AT BE BG HR CY CZ DK EE FI FR GR HU IE IT LV LT LU MT NL PL PT RO SK SI ES SE GB",
    ),
    essence:
      "Across 28 EU countries, migration is argued through the same few frames: security, identity, economy and demographics, humanitarianism, and distrust of the political establishment. What changes from country to country is their weight.",
  },
];

export const INERT_ATLAS_POINTS: AtlasPoint[] = [
  { id: "placeholder-canada", status: "inert", lat: 45.4215, lng: -75.6972 },
  { id: "placeholder-uk", status: "inert", lat: 51.5072, lng: -0.1276 },
  { id: "placeholder-spain", status: "inert", lat: 40.4168, lng: -3.7038 },
  { id: "placeholder-italy", status: "inert", lat: 41.9028, lng: 12.4964 },
  { id: "placeholder-india", status: "inert", lat: 28.6139, lng: 77.209 },
  { id: "placeholder-malaysia", status: "inert", lat: 3.139, lng: 101.6869 },
  { id: "placeholder-japan", status: "inert", lat: 35.6762, lng: 139.6503 },
  { id: "placeholder-australia", status: "inert", lat: -33.8688, lng: 151.2093 },
  { id: "placeholder-indonesia", status: "inert", lat: -6.2088, lng: 106.8456 },
  { id: "placeholder-uae", status: "inert", lat: 25.2048, lng: 55.2708 },
  { id: "placeholder-sweden", status: "inert", lat: 59.3293, lng: 18.0686 },
];

// One globe point per place. A case with locations stands at each of them;
// cases that meet at the same place share the point, and the one whose home
// it is comes first.
type Stop = { atlasCase: AtlasCase; locationId?: string; lat: number; lng: number; home: boolean };

const STOPS: Stop[] = ACTIVE_ATLAS_CASES.flatMap((atlasCase): Stop[] =>
  atlasCase.locations?.length
    ? atlasCase.locations.map((location, index) => ({
        atlasCase,
        locationId: location.id,
        lat: location.lat,
        lng: location.lng,
        home: index === 0,
      }))
    : [{ atlasCase, lat: atlasCase.lat, lng: atlasCase.lng, home: true }],
);

const STOPS_BY_PLACE = new Map<string, Stop[]>();
for (const stop of STOPS) {
  const key = `${stop.lat.toFixed(1)},${stop.lng.toFixed(1)}`;
  STOPS_BY_PLACE.set(key, [...(STOPS_BY_PLACE.get(key) ?? []), stop]);
}

const CASE_POINTS: AtlasPoint[] = Array.from(STOPS_BY_PLACE.values()).map((stops) => {
  const ordered = [...stops].sort((a, b) => Number(b.home) - Number(a.home));
  const first = ordered[0];
  return {
    ...first.atlasCase,
    status: "active" as const,
    id: first.home ? first.atlasCase.id : `${first.atlasCase.id}--${first.locationId}`,
    caseId: first.atlasCase.id,
    locationId: first.locationId,
    lat: first.lat,
    lng: first.lng,
    here: ordered.map((stop) => ({ caseId: stop.atlasCase.id, locationId: stop.locationId })),
  };
});

// Unlit points fill out the map; drop any that an Atlas case now stands on.
const FREE_INERT_POINTS = INERT_ATLAS_POINTS.filter(
  (inert) => !CASE_POINTS.some((p) => Math.abs(p.lat - inert.lat) < 1 && Math.abs(p.lng - inert.lng) < 1),
);

export const ATLAS_POINTS: AtlasPoint[] = [...CASE_POINTS, ...FREE_INERT_POINTS];
