/**
 * Stylised submarine fibre routes for the Atlas globe.
 *
 * These are our own drawings, not survey data. Each route runs between real
 * cable landing regions through hand-placed sea waypoints so it rounds
 * coastlines plausibly. The renderer joins waypoints with great-circle arcs,
 * adds a gentle lateral wobble, and fans each route into `strands` parallel
 * threads. Nothing here is accurate enough to navigate by, and it is not
 * meant to be: it is a picture of where the world's conversation travels.
 */

export type Lnglat = [number, number];

export type FibreRoute = {
  id: string;
  /** Sea path from landing to landing: [lng, lat] waypoints. */
  points: Lnglat[];
  /** Number of parallel threads drawn for this corridor. */
  strands: number;
};

// Landing regions (approximate, kept just offshore).
const L = {
  newYork: [-73.4, 40.5] as Lnglat,
  virginia: [-75.6, 36.8] as Lnglat,
  halifax: [-63.2, 44.4] as Lnglat,
  miami: [-80.0, 25.9] as Lnglat,
  cancun: [-86.6, 21.3] as Lnglat,
  panama: [-79.6, 9.3] as Lnglat,
  cartagena: [-75.4, 10.6] as Lnglat,
  fortaleza: [-38.3, -3.6] as Lnglat,
  rio: [-43.0, -23.1] as Lnglat,
  buenosAires: [-56.6, -35.2] as Lnglat,
  valparaiso: [-71.9, -33.0] as Lnglat,
  lima: [-77.4, -12.2] as Lnglat,
  losAngeles: [-118.7, 33.9] as Lnglat,
  oregon: [-124.3, 45.3] as Lnglat,
  seattle: [-124.9, 47.8] as Lnglat,
  hawaii: [-158.0, 21.4] as Lnglat,
  cornwall: [-5.4, 50.6] as Lnglat,
  dublin: [-6.6, 53.2] as Lnglat,
  brest: [-5.0, 48.3] as Lnglat,
  bilbao: [-3.0, 43.6] as Lnglat,
  lisbon: [-9.6, 38.6] as Lnglat,
  katwijk: [4.2, 52.3] as Lnglat,
  esbjerg: [8.1, 55.5] as Lnglat,
  marseille: [5.3, 43.1] as Lnglat,
  palermo: [13.2, 38.3] as Lnglat,
  crete: [24.6, 35.6] as Lnglat,
  alexandria: [29.8, 31.4] as Lnglat,
  suezRed: [33.4, 27.6] as Lnglat,
  jeddah: [38.9, 21.5] as Lnglat,
  portSudan: [37.4, 19.8] as Lnglat,
  djibouti: [43.3, 11.7] as Lnglat,
  casablanca: [-7.9, 33.6] as Lnglat,
  dakar: [-17.7, 14.6] as Lnglat,
  abidjan: [-4.1, 5.1] as Lnglat,
  lagos: [3.3, 6.2] as Lnglat,
  luanda: [13.0, -8.9] as Lnglat,
  capeTown: [18.2, -34.2] as Lnglat,
  durban: [31.2, -30.0] as Lnglat,
  mombasa: [39.9, -4.2] as Lnglat,
  muscat: [58.8, 23.5] as Lnglat,
  fujairah: [56.5, 25.0] as Lnglat,
  karachi: [66.8, 24.6] as Lnglat,
  mumbai: [72.6, 18.9] as Lnglat,
  chennai: [80.5, 13.0] as Lnglat,
  colombo: [79.7, 6.6] as Lnglat,
  penang: [100.1, 5.5] as Lnglat,
  singapore: [103.9, 1.1] as Lnglat,
  jakarta: [106.6, -6.3] as Lnglat,
  perth: [115.6, -32.2] as Lnglat,
  sydney: [151.4, -33.8] as Lnglat,
  auckland: [174.9, -36.7] as Lnglat,
  hongKong: [114.4, 22.1] as Lnglat,
  manila: [121.0, 14.4] as Lnglat,
  taiwan: [121.9, 24.8] as Lnglat,
  shanghai: [121.9, 31.0] as Lnglat,
  busan: [129.3, 35.0] as Lnglat,
  chikura: [140.2, 34.9] as Lnglat,
  guam: [144.9, 13.3] as Lnglat,
};

// Sea waypoints used to steer around land.
const W = {
  midAtlanticN: [-40, 46] as Lnglat,
  midAtlanticS: [-25, 2] as Lnglat,
  capeSea: [16, -36.5] as Lnglat,
  gibraltar: [-6.2, 35.9] as Lnglat,
  sicilyChannel: [11.5, 37.2] as Lnglat,
  babElMandeb: [43.4, 12.6] as Lnglat,
  arabianSea: [60, 15] as Lnglat,
  bayOfBengal: [86, 9] as Lnglat,
  malacca: [100.5, 3.5] as Lnglat,
  southChina: [112, 12] as Lnglat,
  luzonStrait: [121.5, 20.5] as Lnglat,
  midPacific: [-165, 30] as Lnglat,
  coralSea: [155, -20] as Lnglat,
  tasman: [160, -36] as Lnglat,
  caribbean: [-72, 15] as Lnglat,
  drakeSea: [-62, -40] as Lnglat,
  biscay: [-9, 46.5] as Lnglat,
  canaries: [-16, 27] as Lnglat,
};

export const FIBRE_ROUTES: FibreRoute[] = [
  // North Atlantic corridor
  { id: "ny-cornwall", points: [L.newYork, W.midAtlanticN, L.cornwall], strands: 5 },
  { id: "ny-dublin", points: [L.newYork, [-45, 48], L.dublin], strands: 3 },
  { id: "virginia-bilbao", points: [L.virginia, [-38, 40], W.biscay, L.bilbao], strands: 3 },
  { id: "halifax-cornwall", points: [L.halifax, [-35, 50], L.cornwall], strands: 2 },
  { id: "ny-brest", points: [L.newYork, [-42, 44], L.brest], strands: 2 },
  { id: "virginia-lisbon", points: [L.virginia, [-35, 36], L.lisbon], strands: 2 },
  { id: "cornwall-katwijk", points: [L.cornwall, [1.5, 51.3], L.katwijk], strands: 3 },
  { id: "katwijk-esbjerg", points: [L.katwijk, [5.5, 54.5], L.esbjerg], strands: 2 },
  { id: "dublin-katwijk", points: [L.dublin, [-2, 58], [4, 56], L.katwijk], strands: 1 },

  // Atlantic to Africa and South America
  { id: "lisbon-casablanca", points: [L.lisbon, L.casablanca], strands: 2 },
  { id: "casablanca-dakar", points: [L.casablanca, W.canaries, L.dakar], strands: 3 },
  { id: "dakar-abidjan", points: [L.dakar, [-18, 8], L.abidjan], strands: 3 },
  { id: "abidjan-lagos", points: [L.abidjan, [1, 4.2], L.lagos], strands: 3 },
  { id: "lagos-luanda", points: [L.lagos, [6, -2], L.luanda], strands: 2 },
  { id: "luanda-capetown", points: [L.luanda, [11, -24], L.capeTown], strands: 2 },
  { id: "capetown-durban", points: [L.capeTown, W.capeSea, [26, -35], L.durban], strands: 2 },
  { id: "durban-mombasa", points: [L.durban, [38, -18], L.mombasa], strands: 2 },
  { id: "mombasa-djibouti", points: [L.mombasa, [48, 2], L.djibouti], strands: 2 },
  { id: "fortaleza-dakar", points: [L.fortaleza, W.midAtlanticS, L.dakar], strands: 1 },
  { id: "fortaleza-lisbon", points: [L.fortaleza, [-28, 18], L.lisbon], strands: 2 },
  { id: "fortaleza-rio", points: [L.fortaleza, [-36, -14], L.rio], strands: 3 },
  { id: "rio-buenosaires", points: [L.rio, [-50, -30], L.buenosAires], strands: 2 },
  { id: "fortaleza-virginia", points: [L.fortaleza, [-50, 12], W.caribbean, L.miami, L.virginia], strands: 3 },
  { id: "miami-cancun", points: [L.miami, [-84, 23], L.cancun], strands: 2 },
  { id: "miami-cartagena", points: [L.miami, [-77, 18], L.cartagena], strands: 2 },
  { id: "cartagena-panama", points: [L.cartagena, L.panama], strands: 2 },
  { id: "panama-lima", points: [[-80.2, 7.5], [-80, -2], L.lima], strands: 2 },
  { id: "lima-valparaiso", points: [L.lima, [-76, -24], L.valparaiso], strands: 2 },
  { id: "valparaiso-buenosaires", points: [L.valparaiso, [-76, -50], [-66, -56], W.drakeSea, L.buenosAires], strands: 1 },

  // Mediterranean, Red Sea, Indian Ocean
  { id: "lisbon-marseille", points: [L.lisbon, W.gibraltar, [1, 37.5], L.marseille], strands: 3 },
  { id: "marseille-palermo", points: [L.marseille, [8, 40], L.palermo], strands: 2 },
  { id: "palermo-alexandria", points: [L.palermo, W.sicilyChannel, [20, 34.5], L.crete, L.alexandria], strands: 4 },
  { id: "alexandria-jeddah", points: [L.alexandria, [32.5, 30.2], L.suezRed, L.portSudan, L.jeddah], strands: 4 },
  { id: "jeddah-djibouti", points: [L.jeddah, [41, 16], W.babElMandeb, L.djibouti], strands: 4 },
  { id: "djibouti-muscat", points: [L.djibouti, [51, 13], W.arabianSea, L.muscat], strands: 3 },
  { id: "muscat-fujairah", points: [L.muscat, L.fujairah], strands: 2 },
  { id: "muscat-mumbai", points: [L.muscat, [66, 20], L.mumbai], strands: 3 },
  { id: "muscat-karachi", points: [L.muscat, L.karachi], strands: 1 },
  { id: "mumbai-colombo", points: [L.mumbai, [72, 10], L.colombo], strands: 3 },
  { id: "colombo-chennai", points: [L.colombo, [82, 9], L.chennai], strands: 2 },
  { id: "colombo-penang", points: [L.colombo, W.bayOfBengal, [95, 6], L.penang], strands: 3 },
  { id: "penang-singapore", points: [L.penang, W.malacca, L.singapore], strands: 4 },
  { id: "djibouti-mombasa-direct", points: [L.djibouti, [52, 4], [43, -3], L.mombasa], strands: 1 },
  { id: "mombasa-mumbai", points: [L.mombasa, [55, 2], [68, 12], L.mumbai], strands: 1 },
  { id: "capetown-perth", points: [L.capeTown, [40, -38], [80, -36], L.perth], strands: 1 },

  // South-east Asia and Pacific
  { id: "singapore-jakarta", points: [L.singapore, [105.5, -3.5], L.jakarta], strands: 2 },
  { id: "singapore-hongkong", points: [L.singapore, [108, 6], W.southChina, L.hongKong], strands: 5 },
  { id: "singapore-perth", points: [L.singapore, [108, -5], [113, -20], L.perth], strands: 2 },
  { id: "jakarta-sydney", points: [L.jakarta, [116, -12], [128, -16], [145, -14], W.coralSea, L.sydney], strands: 1 },
  { id: "hongkong-manila", points: [L.hongKong, [117, 18], L.manila], strands: 2 },
  { id: "hongkong-taiwan", points: [L.hongKong, [118, 22], L.taiwan], strands: 3 },
  { id: "taiwan-shanghai", points: [L.taiwan, [123.5, 28], L.shanghai], strands: 2 },
  { id: "taiwan-busan", points: [L.taiwan, [126, 29], L.busan], strands: 2 },
  { id: "busan-chikura", points: [L.busan, [133, 33.5], L.chikura], strands: 2 },
  { id: "taiwan-chikura", points: [L.taiwan, [128, 27], [136, 32], L.chikura], strands: 3 },
  { id: "manila-guam", points: [L.manila, [130, 13], L.guam], strands: 3 },
  { id: "guam-chikura", points: [L.guam, [142, 25], L.chikura], strands: 3 },
  { id: "guam-sydney", points: [L.guam, [150, 0], [158, -12], W.coralSea, L.sydney], strands: 2 },
  { id: "sydney-auckland", points: [L.sydney, W.tasman, L.auckland], strands: 2 },
  { id: "chikura-oregon", points: [L.chikura, [160, 42], [-170, 45], [-140, 46], L.oregon], strands: 4 },
  { id: "chikura-losangeles", points: [L.chikura, [165, 38], W.midPacific, [-135, 34], L.losAngeles], strands: 3 },
  { id: "guam-hawaii", points: [L.guam, [165, 18], L.hawaii], strands: 2 },
  { id: "hawaii-losangeles", points: [L.hawaii, [-140, 28], L.losAngeles], strands: 4 },
  { id: "hawaii-oregon", points: [L.hawaii, [-145, 35], L.oregon], strands: 2 },
  { id: "hawaii-sydney", points: [L.hawaii, [-170, 0], [175, -20], [160, -30], L.sydney], strands: 3 },
  { id: "hawaii-auckland", points: [L.hawaii, [-165, -5], [-178, -25], L.auckland], strands: 1 },
  { id: "losangeles-panama", points: [L.losAngeles, [-112, 22], [-92, 12], [-80.5, 7.4]], strands: 2 },
  { id: "oregon-seattle", points: [L.oregon, L.seattle], strands: 1 },
  { id: "losangeles-oregon", points: [L.losAngeles, [-125, 40], L.oregon], strands: 1 },
  { id: "halifax-newyork", points: [L.halifax, [-69, 41.5], L.newYork], strands: 1 },
  { id: "newyork-miami", points: [L.newYork, [-73, 34], L.miami], strands: 2 },
];
