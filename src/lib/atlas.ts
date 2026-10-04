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
  ranking?: { title: string; items: string[] };
  /** Set on the extra globe points of a multi-location case. */
  caseId?: string;
  locationId?: string;
};

export type AtlasLocation = {
  id: string;
  label: string;
  lat: number;
  lng: number;
  character: string;
  places: string[];
};

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
    name: "Body care across Sub-Saharan Africa",
    sectorRegion: "",
    sector: "brands",
    lat: -26.2041,
    lng: 28.0473,
    essence:
      'Skin is a social currency before it is a body. In markets where lightness still carries advantage, "celebrate who you are" rings hollow against a culture organised around changing who you are.',
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
    name: "Finding the backdrop for a TV show",
    sectorRegion: "TV production, Latin America",
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
    lat: 52.52,
    lng: 13.405,
    essence:
      "Across 28 EU countries, migration is argued through the same few frames: security, identity, economy and demographics, humanitarianism, and distrust of the political establishment. What changes from country to country is their weight.",
  },
];

export const INERT_ATLAS_POINTS: AtlasPoint[] = [
  { id: "placeholder-canada", status: "inert", lat: 45.4215, lng: -75.6972 },
  { id: "placeholder-uk", status: "inert", lat: 51.5072, lng: -0.1276 },
  { id: "placeholder-spain", status: "inert", lat: 40.4168, lng: -3.7038 },
  { id: "placeholder-italy", status: "inert", lat: 41.9028, lng: 12.4964 },
  { id: "placeholder-kenya", status: "inert", lat: -1.2921, lng: 36.8219 },
  { id: "placeholder-india", status: "inert", lat: 28.6139, lng: 77.209 },
  { id: "placeholder-malaysia", status: "inert", lat: 3.139, lng: 101.6869 },
  { id: "placeholder-japan", status: "inert", lat: 35.6762, lng: 139.6503 },
  { id: "placeholder-australia", status: "inert", lat: -33.8688, lng: 151.2093 },
  { id: "placeholder-indonesia", status: "inert", lat: -6.2088, lng: 106.8456 },
  { id: "placeholder-uae", status: "inert", lat: 25.2048, lng: 55.2708 },
  { id: "placeholder-sweden", status: "inert", lat: 59.3293, lng: 18.0686 },
];

// One globe point per case, plus one for every further location of a case
// that spans several places.
const CASE_POINTS: AtlasPoint[] = ACTIVE_ATLAS_CASES.flatMap((atlasCase) => {
  const [home, ...others] = atlasCase.locations ?? [];
  return [
    { ...atlasCase, status: "active" as const, locationId: home?.id },
    ...others.map((location) => ({
      ...atlasCase,
      status: "active" as const,
      id: `${atlasCase.id}--${location.id}`,
      caseId: atlasCase.id,
      locationId: location.id,
      lat: location.lat,
      lng: location.lng,
    })),
  ];
});

export const ATLAS_POINTS: AtlasPoint[] = [...CASE_POINTS, ...INERT_ATLAS_POINTS];
