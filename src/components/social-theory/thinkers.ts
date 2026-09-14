/**
 * The thinkers Bakamo's methodology is grounded in — the lineage shown at the
 * bottom of /our-method. Adapted from the TensionScope Field Guide
 * (frontend/src/features/settings/console/philosophers.ts), rewritten for a
 * public audience: the "take" is what the methodology draws from each thinker,
 * which holds for all of Bakamo's work, not only the Reading Machine.
 *
 * Portraits are parametric line sketches (see ThinkerPortrait.tsx), not
 * likenesses. Set `portrait` to an image path to swap in a real drawing.
 */

export type PortraitHair =
  | "receding"
  | "full"
  | "swept"
  | "short"
  | "balding"
  | "bald"
  | "tousled";

export type GlyphId =
  | "systems"
  | "mark"
  | "difference"
  | "fore"
  | "horizons"
  | "between"
  | "narrative"
  | "frame"
  | "layers"
  | "web"
  | "ladder"
  | "twostep"
  | "twosystems"
  | "needs"
  | "models"
  | "mirror";

export interface PortraitVariant {
  hair: PortraitHair;
  glasses: "rect" | "round" | "none";
  beard: "none" | "mustache" | "full" | "short" | "long";
  old?: boolean;
  bushyBrows?: boolean;
  hairPart?: "center" | "side";
}

export interface ThinkerDeep {
  /** The idea at full strength. */
  saw: string;
  /** What the methodology takes from it. */
  take: string;
  /** Why the thinker makes us more confident the method is right. */
  sure: string;
  /** The key work, with year. */
  work: string;
}

export interface Thinker {
  id: string;
  name: string;
  dates: string;
  /** one-liner under the name, split on " / " */
  line: string;
  blurb: string;
  deep: ThinkerDeep;
  variant: PortraitVariant;
  glyph: GlyphId;
  portrait?: string;
}

export const THINKERS: Thinker[] = [
  {
    id: "luhmann",
    name: "Niklas Luhmann",
    dates: "1927–1998",
    line: "Read the discourse / as a system.",
    blurb:
      "Society is made of communication, not people — and you understand a system by the distinctions it draws. We treat a category's conversation the same way: a body of communication to be observed whole.",
    deep: {
      saw: "Luhmann made one scandalous move: he removed human beings from the definition of society. Society, he argued, consists of communications — utterances that connect to other utterances — and people are the environment of that system, not its parts. A social system persists by drawing distinctions (system/environment, relevant/irrelevant) and observing through them; you learn what a system is by watching which differences it treats as information. Second-order observation — watching how others watch — is for him the modern condition itself.",
      take: "We read a category as a communication system, not a pile of individuals. The question is never only what people think, but what the discourse treats as relevant, what it leaves out, and how it keeps itself going. Our work for clients is second-order observation: showing a brand how its category observes the world.",
      sure: "Systems theory says the unit of social analysis is the communication, not the person behind it — which is exactly what unprompted conversation is. We are not compensating for missing demographics; we are reading the native unit.",
      work: "Social Systems (1984); The Reality of the Mass Media (1996)",
    },
    variant: { hair: "receding", glasses: "rect", beard: "none" },
    glyph: "systems",
  },
  {
    id: "spencer-brown",
    name: "George Spencer-Brown",
    dates: "1923–2016",
    line: "Every reading / begins with a mark.",
    blurb:
      "Laws of Form opens with a single instruction: draw a distinction. Every category an analyst names is that act — and everything left unmarked is still there, waiting for a mark. Luhmann's formal spine, and ours.",
    deep: {
      saw: "Laws of Form builds a calculus — and, from it, logic — out of one primitive act: 'draw a distinction', severing a space into a marked and an unmarked state. Everything observable follows from where the mark falls, and the observer always stands on one side of their own cut. Every observation therefore carries a blind spot: the distinction itself cannot be seen while it is being used.",
      take: "Our analysts make their cuts explicit. Every theme is a distinction someone drew, signed and open to revision — and the material that does not fit is kept in view as the unmarked space, not thrown away. A coherent pattern in what nobody has named yet is often the most important finding.",
      sure: "If observing is drawing distinctions, a rigorous method has to show where it drew them. The formalism tells us that discipline is not pedantry; it is what observing carefully means.",
      work: "Laws of Form (1969)",
    },
    variant: { hair: "full", glasses: "none", beard: "none", hairPart: "center" },
    glyph: "mark",
  },
  {
    id: "bateson",
    name: "Gregory Bateson",
    dates: "1904–1980",
    line: "A difference that / makes a difference.",
    blurb:
      "Meaning is relational, not atomic — information is a difference that changes something downstream. That is why we read relations between voices, not voices alone, and why a finding has to make a difference.",
    deep: {
      saw: "Bateson defined information as 'a difference that makes a difference' — nothing carries meaning alone; meaning is a relation between a signal and the system it perturbs. He saw mind not as a thing in heads but as a pattern of differences circulating through loops of person, tool and environment. And he introduced the frame — the meta-message ('this is play') that tells you how to read what follows — decades before it became a staple of sociology.",
      take: "A pattern earns a place in our reading only if it changes how the category should be understood. Carrying Korzybski's warning that the map is not the territory, we keep checking every model of a conversation against the conversation itself — by going back and reading what people actually said.",
      sure: "His test disposes of vanity metrics: a number that changes nothing downstream is not information. It is the standard every Bakamo finding has to meet.",
      work: "Steps to an Ecology of Mind (1972)",
    },
    variant: { hair: "swept", glasses: "none", beard: "none", bushyBrows: true, old: true },
    glyph: "difference",
  },
  {
    id: "heidegger",
    name: "Martin Heidegger",
    dates: "1889–1976",
    line: "To understand is to / see something as something.",
    blurb:
      "Before any analysis we already see things framed — as this, not that. That fore-structure is what a narrative names. Gadamer's teacher, and the ground the whole hermeneutic side of our work stands on.",
    deep: {
      saw: "Heidegger's hermeneutic turn: understanding is not a procedure we sometimes apply — it is how humans exist. We always already see something as something, out of a fore-structure of assumptions we did not choose and mostly cannot see. Interpretation does not add meaning to neutral data; it makes explicit a meaning that was operative all along. The hermeneutic circle — understanding parts through the whole and the whole through its parts — is not a flaw to escape but the shape of understanding itself.",
      take: "The narratives we map are fore-structures made visible: horizons that decide how the same event reads before any argument starts. And our process is the hermeneutic circle worked on purpose — the material and the interpretive framework re-reading each other, round after round, with no pretence of a final, neutral pass.",
      sure: "If pre-understanding is unavoidable, a method that declares its frames beats one that pretends to have none. Our openness about interpretation is not softness; it is the rigour.",
      work: "Being and Time (1927)",
    },
    variant: { hair: "short", glasses: "none", beard: "mustache" },
    glyph: "fore",
  },
  {
    id: "gadamer",
    name: "Hans-Georg Gadamer",
    dates: "1900–2002",
    line: "Meaning lives / inside a horizon.",
    blurb:
      "We never understand from nowhere — we understand from within a horizon, and meaning appears when horizons fuse. A narrative is exactly that: a horizon inside which the same fact reads differently.",
    deep: {
      saw: "Gadamer rehabilitated prejudice — literally pre-judgement — as the condition of understanding, not its enemy. Every reader stands in a horizon formed by history and language; understanding a text is not erasing your horizon but fusing it with the text's, so that both are changed. Method alone cannot produce truth in the human sciences, because the interpreter's situation is part of the phenomenon; what saves us is dialogue — putting our own horizon at risk in the encounter.",
      take: "Reading a category means letting its horizon challenge ours — and the client's. The analyst brings a horizon, the conversation brings another, and the understanding that results belongs to neither alone. That is why our findings so often land as a reframing of the brief rather than an answer to it.",
      sure: "He shows why the analyst cannot be automated away without losing the phenomenon itself: the human horizon is not bias to remove but half of the meaning. Technology can propose; a person has to understand.",
      work: "Truth and Method (1960)",
    },
    variant: { hair: "balding", glasses: "none", beard: "none", old: true },
    glyph: "horizons",
  },
  {
    id: "buber",
    name: "Martin Buber",
    dates: "1878–1965",
    line: "Meet it as a Thou, / not an It.",
    blurb:
      "He split how we relate to the world: I–It treats it as an object to use and measure; I–Thou meets it as a presence to address. Behind every number is a voice to be met, not only a point to be counted.",
    deep: {
      saw: "Buber's philosophy fits in a pair of words: I–It and I–Thou. The same world can be handled as objects — measured, used, filed — or met as presences — addressed, answered. Neither is dispensable: a life of pure It is hollow, a life of pure Thou impossible. But a culture decides its character by which relation leads. 'All real living is meeting.'",
      take: "Our reports lead with people speaking in their own words; the counts follow, in their honest supporting role. The aim is that a client comes away feeling they understand people — not that they have read a dashboard about them.",
      sure: "He names why dashboards fail: they turn voices into objects until nothing obliges anyone to act. Work that stages a real encounter with the people behind the data changes minds.",
      work: "I and Thou (1923)",
    },
    variant: { hair: "balding", glasses: "none", beard: "long", old: true, bushyBrows: true },
    glyph: "between",
  },
  {
    id: "ricoeur",
    name: "Paul Ricoeur",
    dates: "1913–2005",
    line: "A narrative / re-describes the world.",
    blurb:
      "Stories don't just report events; they configure them into a meaning. The narratives we identify are configurations that make the same facts mean something new.",
    deep: {
      saw: "Ricoeur showed that narrative is how humans make time habitable: emplotment takes scattered events and configures them into a whole in which each part means something because of its place. Identity itself is narrative — a self is the story it can tell of itself, permanently open to re-telling. And interpretation moves between two poles he refused to collapse: the hermeneutics of suspicion (what is this story hiding?) and of retrieval (what truth is it carrying?).",
      take: "We do not accept a narrative until we can show it at work: the same concrete event, configured by that story into a different meaning. And we read the identities people voice — the story a group tells about itself — as narrative identities, not demographic facts.",
      sure: "He gives a soft concept a hard test: if a claimed narrative cannot reframe a real event, it is not a narrative. We hold every narrative we name to that test.",
      work: "Time and Narrative (1983–85); Oneself as Another (1990)",
    },
    variant: { hair: "full", glasses: "rect", beard: "none", old: true },
    glyph: "narrative",
  },
  {
    id: "goffman",
    name: "Erving Goffman",
    dates: "1922–1982",
    line: "Behind every account / is a frame.",
    blurb:
      "He asked 'what is it that's going on here?' and answered: a frame. And he showed how people present a self. We read speaking positions and performances, not census boxes.",
    deep: {
      saw: "Goffman spent a career on two questions. Frame Analysis asks how we know what is going on — through frameworks that organise experience, which can be keyed, layered and broken, so that the same strip of activity is a rehearsal, a joke or a crime depending on the frame. The Presentation of Self shows that social life is performed: people manage impressions for an audience, with front and back regions — and the performance is not fake; it is the social self.",
      take: "A voice in a conversation is a presented self, so we read the performance — the need it expresses, the position it takes, the audience it plays to — rather than guessing at the performer's demographics. Engagement that is really distancing, mockery that is really longing: those are frame shifts, and we read them as such.",
      sure: "Public conversation is front-stage talk. A method built on performance theory reads it natively, where survey logic — which assumes candid inner report — misreads it by design.",
      work: "The Presentation of Self in Everyday Life (1956); Frame Analysis (1974)",
    },
    variant: { hair: "balding", glasses: "rect", beard: "full" },
    glyph: "frame",
  },
  {
    id: "barthes",
    name: "Roland Barthes",
    dates: "1915–1980",
    line: "Denotation, / then connotation.",
    blurb:
      "A sign carries a plain meaning and, layered on top, a cultural one. We keep those two floors apart — and, with 'the death of the author', we read what the text does, not what someone may have meant.",
    deep: {
      saw: "Barthes read culture as a two-floor building: denotation, what the sign plainly shows, and connotation, the myth riding on it — what it means culturally, and for whom. Mythologies unmasked how the second floor passes itself off as common sense. And 'The Death of the Author' moved meaning from the writer's intention to the workings of the text in the reader's hands.",
      take: "Our work separates what is being talked about from what it means. The topic map is the first floor; the stakes, narratives and positions are the second — and we never let one stand in for the other. We read what talk does in the discourse, not what we imagine the speaker privately intended.",
      sure: "Brand meaning is mostly connotation. A method with an explicit second floor measures the layer clients actually care about, where sentiment scores flatten both floors into one number and lose the myth.",
      work: "Mythologies (1957); Elements of Semiology (1964)",
    },
    variant: { hair: "full", glasses: "none", beard: "none", hairPart: "side" },
    glyph: "layers",
  },
  {
    id: "geertz",
    name: "Clifford Geertz",
    dates: "1926–2006",
    line: "Read culture / thickly.",
    blurb:
      "Interpretation is thick description: not 'a wink' but everything the wink means inside its web of significance. We read a category's conversation as a text to be described thickly — which is the whole point.",
    deep: {
      saw: "Geertz turned anthropology interpretive with one image: man is 'an animal suspended in webs of significance he himself has spun', so culture is those webs, and its study 'not an experimental science in search of law but an interpretive one in search of meaning'. Thick description is the craft — borrowing Gilbert Ryle's example, the difference between a twitch and a wink is not in the eyelid but in the web of meaning around it — and culture is public, because meaning is: it lives in symbols exchanged, not in private heads.",
      take: "'Culture is public' is why reading unprompted conversation works at all: the webs are lying in the open, at population scale. Our standard follows from it — every claim grounded in material we can quote, and honesty about what was actually read.",
      sure: "He gives interpretation its quality bar: a reading is validated by the density of its grounding in the material. Verbatim-first reporting is that bar, applied.",
      work: "The Interpretation of Cultures (1973)",
    },
    variant: { hair: "balding", glasses: "rect", beard: "mustache" },
    glyph: "web",
  },
  {
    id: "shore",
    name: "Bradd Shore",
    dates: "b. 1945",
    line: "Culture lives / in models, in minds.",
    blurb:
      "Culture is not a fog of meaning — it is a stock of models: shared schemas, scripts and story-shapes that live twice, in the world's institutions and in individual minds. The narratives we find are cultural models caught mid-circulation.",
    deep: {
      saw: "Shore took on a question Geertz left open: if culture is public, how does it also organise individual thought? Culture in Mind answers: through models — learnable structures (a wedding script, a 'natural athlete' image, a redemption story) that exist twice over, as instituted models in the world and as mental models each person internalises, never quite identically. Meaning-making is the traffic between the two, and a person carries many models at once, deployed by context.",
      take: "The narratives we map are instituted models read from their public traces. People hold several at once and switch between them by situation — so we look for the mix, and for the moment a group's dominant story changes.",
      sure: "He confirms that frames are not analyst poetry: cultural models are a load-bearing concept in cognitive anthropology, with a twin location in world and mind. When we count a narrative's carriers, we are counting something real.",
      work: "Culture in Mind: Cognition, Culture, and the Problem of Meaning (1996)",
    },
    variant: { hair: "short", glasses: "rect", beard: "short" },
    glyph: "models",
  },
  {
    id: "wittgenstein",
    name: "Ludwig Wittgenstein",
    dates: "1889–1951",
    line: "Meaning is use, / not a picture.",
    blurb:
      "Words mean by how they are used in a form of life, and groups share a family resemblance, not an essence. That is why our categories are named in the conversation's own words — and judged by a reader.",
    deep: {
      saw: "The later Wittgenstein demolished his own earlier picture theory: meaning is not a mental image or a definition but use inside a language-game, embedded in a form of life. Categories cohere by family resemblance — overlapping threads with no single common essence — and there is no private language: meaning is public practice or it is nothing. 'Don't think, but look!' is his standing instruction against theorising past the cases.",
      take: "Themes have no essence for a formula to capture, so they have to be judged in language, by a language user. We name them in the discourse's own words rather than the industry's, and we keep going back to the cases instead of theorising past them.",
      sure: "Whenever neat definitions lose to how people actually use words, his point scores again: patterns can be proposed, but only use — read by a reader — settles what a word is doing.",
      work: "Philosophical Investigations (1953)",
    },
    variant: { hair: "tousled", glasses: "none", beard: "none" },
    glyph: "ladder",
  },
  {
    id: "rorty",
    name: "Richard Rorty",
    dates: "1931–2007",
    line: "A vocabulary is a tool, / not a mirror.",
    blurb:
      "Language doesn't mirror the world; it handles it. A taxonomy is a vocabulary — made, contingent, judged by what it lets you do — which is why our frameworks are signed and revisable, never 'discovered'.",
    deep: {
      saw: "Rorty's heresy: knowledge is not a mirror held up to nature. Vocabularies — the working sets of terms a community thinks in — are tools with histories, and none is nature's own. Progress comes less from argument inside a vocabulary than from redescription: someone talks differently, and the new talk proves more useful. Justification to a community, always revisable, does the work that capital-T Truth was supposed to do. The mature stance is irony: full commitment to your best current vocabulary, held together with the knowledge of its contingency.",
      take: "The structure we deliver is a vocabulary the analyst stands behind, not a hidden order the data reveals. Two good readings of the same conversation can differ without either being wrong, and each new study is a redescription bidding to be more useful than the last.",
      sure: "He dissolves the objection that haunts every interpretive method — 'but is the taxonomy real?' The better questions are whether it is useful, whether it is grounded, and whether a rival vocabulary would describe the conversation better. Those we can test.",
      work: "Philosophy and the Mirror of Nature (1979); Contingency, Irony, and Solidarity (1989)",
    },
    variant: { hair: "swept", glasses: "rect", beard: "none", old: true },
    glyph: "mirror",
  },
  {
    id: "lazarsfeld",
    name: "Paul Lazarsfeld",
    dates: "1901–1976",
    line: "Influence travels / in two steps.",
    blurb:
      "A founder of empirical social research and of the two-step flow: influence rarely lands directly — it travels through people. Counting rigour and critical reading, in one practice.",
    deep: {
      saw: "Lazarsfeld built modern empirical social research several times over: Marienthal, where unemployment was measured through walking speeds and library loans; the Bureau of Applied Social Research, home of the panel study and, with Robert Merton, the focused interview; and the two-step flow, proposed in The People's Choice and developed with Elihu Katz in Personal Influence. Media influence rarely lands directly; it travels through opinion leaders — specific, findable people who filter the message for their circles. He also named the field's standing tension, sharpened by his work with Adorno: administrative research versus critical research.",
      take: "We look for who carries a story, and to whom — the speaking positions that shape how a category's meanings spread. And we hold ourselves to both of his standards at once: enough counting to be rigorous, enough reading to be right.",
      sure: "Bakamo's founding bet — quantitative scale with qualitative reading — is the Lazarsfeld–Adorno quarrel resolved in practice: counting that serves reading, neither pretending to be the other.",
      work: "The People's Choice (1944); Personal Influence (1955, with Elihu Katz); Marienthal (1933)",
    },
    variant: { hair: "balding", glasses: "round", beard: "none" },
    glyph: "twostep",
  },
  {
    id: "max-neef",
    name: "Manfred Max-Neef",
    dates: "1932–2019",
    line: "Needs are universal; / satisfiers are the culture.",
    blurb:
      "Nine fundamental human needs, the same everywhere and always — what differs is how people satisfy them. A category is a battlefield of satisfiers, and the needs underneath explain why.",
    deep: {
      saw: "The Chilean 'barefoot economist' laid Maslow's pyramid flat: fundamental human needs — subsistence, protection, affection, understanding, participation, idleness, creation, identity, freedom — are few, finite, universal across cultures and eras, and not hierarchical. What varies are the satisfiers a culture invents for them, and satisfiers can deceive: pseudo-satisfiers soothe without satisfying, violators destroy the need they claim to serve (his example: the arms race, sold as protection), while synergic satisfiers feed several needs at once.",
      take: "We read which needs a conversation runs on, and which needs a brand or product is being recruited to satisfy. His taxonomy is one of the sharpest lenses we own: 'this product is a pseudo-satisfier for affection' is a finding that can reorganise a strategy.",
      sure: "Universality is what lets a needs framework travel across categories unchanged; only the satisfiers are local. That division — fixed needs, culturally specific ways of meeting them — is exactly what a category study has to uncover.",
      work: "Human Scale Development (1986; English edition 1991)",
    },
    variant: { hair: "full", glasses: "none", beard: "full", old: true },
    glyph: "needs",
  },
  {
    id: "kahneman",
    name: "Daniel Kahneman",
    dates: "1934–2024",
    line: "Two systems: / fast map, slow reading.",
    blurb:
      "Thinking splits into a fast, automatic System 1 and a slow, deliberate System 2. Our work borrows the cut: a fast map of what is being said, then a slow, signed reading of what it means. (Cognitive science, not philosophy — but he names the spine.)",
    deep: {
      saw: "Kahneman and Tversky mapped the mind's two speeds. System 1 is fast, automatic and associative, always on, jumping to coherent stories from thin evidence — 'what you see is all there is'. System 2 is slow, effortful and deliberate, and mostly economises by endorsing System 1's drafts. The catalogue of biases — anchoring, availability, substitution — falls out of that division of labour, and so does the deeper lesson: intuition is neither noise nor oracle, but pattern recognition whose reliability depends on the environment it learned in.",
      take: "We separate the fast map — what is being talked about, and how much — from the slow reading of what it means, and every fast proposal has to survive a deliberate, human judgement before a client sees it.",
      sure: "His science predicts the failure mode our method is built against: fluent, coherent, wrong stories produced at speed. Insisting on the slow reading is not caution; it is the correct response to the evidence.",
      work: "Thinking, Fast and Slow (2011)",
    },
    variant: { hair: "bald", glasses: "rect", beard: "short" },
    glyph: "twosystems",
  },
];

/* ── The discourse constellation: who shaped whom ─────────────────────── */

export type EdgeKind = "taught" | "influenced" | "collab" | "contra" | "rhyme";

export type Band = "dialogue" | "hermeneutics" | "language" | "culture" | "systems" | "empirical";

export interface DiscourseNode {
  /** joins THINKERS.id when on-stage */
  id: string;
  name: string;
  /** viewBox coords, 1000 × 640 */
  x: number;
  y: number;
  /** supporting cast — no card, one-line note only */
  offstage?: boolean;
  note?: string;
  band: Band;
}

export interface DiscourseEdge {
  from: string;
  to: string;
  kind: EdgeKind;
  note: string;
}

export const DISCOURSE_NODES: DiscourseNode[] = [
  { id: "buber", name: "Buber", x: 250, y: 48, band: "dialogue" },
  {
    id: "husserl",
    name: "Husserl",
    x: 62,
    y: 132,
    offstage: true,
    note: "Phenomenology's founder — Heidegger's teacher, and his point of departure.",
    band: "hermeneutics",
  },
  { id: "heidegger", name: "Heidegger", x: 205, y: 125, band: "hermeneutics" },
  { id: "gadamer", name: "Gadamer", x: 375, y: 108, band: "hermeneutics" },
  { id: "ricoeur", name: "Ricoeur", x: 545, y: 128, band: "hermeneutics" },
  { id: "rorty", name: "Rorty", x: 720, y: 178, band: "hermeneutics" },
  {
    id: "saussure",
    name: "Saussure",
    x: 130,
    y: 268,
    offstage: true,
    note: "Signifier and signified — the semiology Barthes built on.",
    band: "language",
  },
  { id: "wittgenstein", name: "Wittgenstein", x: 330, y: 238, band: "language" },
  { id: "barthes", name: "Barthes", x: 520, y: 262, band: "language" },
  { id: "geertz", name: "Geertz", x: 620, y: 342, band: "culture" },
  { id: "shore", name: "Shore", x: 815, y: 352, band: "culture" },
  { id: "goffman", name: "Goffman", x: 452, y: 392, band: "culture" },
  {
    id: "korzybski",
    name: "Korzybski",
    x: 110,
    y: 472,
    offstage: true,
    note: "'The map is not the territory' — the warning Bateson carried into cybernetics.",
    band: "systems",
  },
  { id: "bateson", name: "Bateson", x: 292, y: 462, band: "systems" },
  { id: "spencer-brown", name: "Spencer-Brown", x: 452, y: 522, band: "systems" },
  { id: "luhmann", name: "Luhmann", x: 628, y: 478, band: "systems" },
  {
    id: "maslow",
    name: "Maslow",
    x: 762,
    y: 512,
    offstage: true,
    note: "The needs pyramid — the hierarchy Max-Neef laid flat.",
    band: "empirical",
  },
  { id: "max-neef", name: "Max-Neef", x: 888, y: 462, band: "empirical" },
  {
    id: "adorno",
    name: "Adorno",
    x: 168,
    y: 568,
    offstage: true,
    note: "Critical theory's voice in the argument over what research is for.",
    band: "empirical",
  },
  { id: "lazarsfeld", name: "Lazarsfeld", x: 322, y: 582, band: "empirical" },
  {
    id: "katz",
    name: "Katz",
    x: 468,
    y: 612,
    offstage: true,
    note: "Co-author of Personal Influence — the two-step flow's other half.",
    band: "empirical",
  },
  { id: "kahneman", name: "Kahneman", x: 728, y: 572, band: "empirical" },
  {
    id: "tversky",
    name: "Tversky",
    x: 862,
    y: 608,
    offstage: true,
    note: "The other mind behind the heuristics-and-biases programme.",
    band: "empirical",
  },
];

export const DISCOURSE_EDGES: DiscourseEdge[] = [
  { from: "husserl", to: "heidegger", kind: "taught", note: "phenomenology's teacher" },
  { from: "heidegger", to: "gadamer", kind: "taught", note: "his most influential student" },

  { from: "heidegger", to: "ricoeur", kind: "influenced", note: "the hermeneutic inheritance" },
  { from: "gadamer", to: "ricoeur", kind: "influenced", note: "horizon becomes narrative" },
  { from: "buber", to: "gadamer", kind: "influenced", note: "dialogue as understanding" },
  { from: "heidegger", to: "rorty", kind: "influenced", note: "read as edifying, not systematic" },
  { from: "wittgenstein", to: "rorty", kind: "influenced", note: "language-games become vocabularies" },
  { from: "wittgenstein", to: "geertz", kind: "influenced", note: "meaning is public" },
  { from: "saussure", to: "barthes", kind: "influenced", note: "semiology's foundation" },
  { from: "korzybski", to: "bateson", kind: "influenced", note: "the map/territory warning" },
  { from: "bateson", to: "goffman", kind: "influenced", note: "the frame idea" },
  { from: "bateson", to: "luhmann", kind: "influenced", note: "difference as information" },
  { from: "spencer-brown", to: "luhmann", kind: "influenced", note: "the calculus of distinction" },

  { from: "shore", to: "geertz", kind: "contra", note: "culture is public — and in minds" },
  { from: "max-neef", to: "maslow", kind: "contra", note: "against the pyramid" },
  { from: "lazarsfeld", to: "adorno", kind: "contra", note: "administrative vs critical research" },

  { from: "lazarsfeld", to: "katz", kind: "collab", note: "Personal Influence, together" },
  { from: "kahneman", to: "tversky", kind: "collab", note: "the long collaboration" },

  { from: "barthes", to: "kahneman", kind: "rhyme", note: "two floors, two systems" },
  { from: "ricoeur", to: "shore", kind: "rhyme", note: "story-shapes as cultural models" },
  { from: "goffman", to: "lazarsfeld", kind: "rhyme", note: "performed selves carry influence" },
];
