export type AtlasCase = {
  id: string;
  name: string;
  sectorRegion: string;
  sector: string;
  lat: number;
  lng: number;
  essence: string;
  /** Where the case can be read: its study page, or its anchor on /research. */
  href?: string;
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
    sector: "",
    lat: 43.0389,
    lng: -87.9065,
    essence:
      "What people call premium pet food is not a category in their minds. It is a stage on which owners perform their love — as trainers, as nurturers, as healers. The product is the script.",
  },
  {
    id: "hungary-election-2026",
    href: "/elections",
    name: "The Hungarian Election, 2026 — Public sphere, Europe",
    sectorRegion: "",
    sector: "",
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
    sector: "",
    lat: 38.9072,
    lng: -77.0369,
    essence:
      "The middle of a contested public conversation is not undecided. It accepts the problem exists and rejects the language used to name it. The door is opened by class, not race.",
  },
  {
    id: "non-alcoholic-spirits",
    href: "/research#non-alcoholic-spirits",
    name: "Non-alcoholic spirits, North America",
    sectorRegion: "",
    sector: "",
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
    sector: "",
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
    sector: "",
    lat: 52.3676,
    lng: 4.9041,
    essence:
      "On May 1, Amsterdam introduced an ad ban on meat and fossil-fuel products. We explored the reactions of social media users across various channels. The language was English.\n\nWhat we found is that the discourse predominantly focuses on the meat part of the ban, and to a significantly lesser extent on the fossil-fuel part. The fossil-fuel half is largely waved through as common sense. The meat half is where the conversation concentrates.\n\nBy and large, opinions fall into two opposing sides — and which side people land on tends to track whether they're an omnivore or follow a meat-free lifestyle. In this discourse, diet predicts stance more reliably than politics.\n\nSupporters celebrate the policy. They expect that reducing the visibility of meat will normalise vegetarian and vegan options over time, underpinned by a belief that less advertising means meat stops being the default. Other supportive arguments include retribution for the environmental damage attributed to the meat industry, and a smaller group who back the ban because they think fewer ads would have a calming, aesthetic effect on the quality of city life. The stance is anchored in a self-identity as environmentally conscious and forward-looking.\n\nOpponents read the ban as an attack on a normal, everyday way of life — elitist, performative, and a step toward broader censorship. A recurring move is whataboutism: gambling ads are permitted, but meat is where the line is drawn? The register here is largely ridicule and sarcasm rather than evidence, while the supportive side tends toward research, precedent, and moral framing. As a result, the two camps rarely engage directly.\n\nBeneath the meat divide sit two deeper questions that also separate the camps: whether advertising actually changes behaviour, and whether a collective authority should decide what may be promoted. The fossil-fuel half of the ban functions as a useful point of comparison — the same policy, the same city, and the same censorship objection available, yet only meat generates sustained debate. In this discourse, the stronger driver of reaction is dietary identity rather than free-speech principle.",
  },
];

export const INERT_ATLAS_POINTS: AtlasPoint[] = [
  { id: "placeholder-canada", status: "inert", lat: 45.4215, lng: -75.6972 },
  { id: "placeholder-mexico", status: "inert", lat: 19.4326, lng: -99.1332 },
  { id: "placeholder-brazil", status: "inert", lat: -23.5505, lng: -46.6333 },
  { id: "placeholder-argentina", status: "inert", lat: -34.6037, lng: -58.3816 },
  { id: "placeholder-uk", status: "inert", lat: 51.5072, lng: -0.1276 },
  { id: "placeholder-france", status: "inert", lat: 48.8566, lng: 2.3522 },
  { id: "placeholder-germany", status: "inert", lat: 52.52, lng: 13.405 },
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

export const ATLAS_POINTS: AtlasPoint[] = [
  ...ACTIVE_ATLAS_CASES.map((atlasCase) => ({ ...atlasCase, status: "active" as const })),
  ...INERT_ATLAS_POINTS,
];
