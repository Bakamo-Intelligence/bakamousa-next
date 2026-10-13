/**
 * The text of the Luhmann page, chapter by chapter.
 *
 * Each chapter is a heading, an optional drawing (file name under
 * public/media/luhmann, alt text and a caption), and paragraphs. A paragraph
 * is a string, or a list / table when the chapter needs one. The page renders
 * a drawing only when its file exists, so the text can ship before the art.
 */

export type Drawing = { file: string; alt: string; caption: string; portrait?: boolean };

export type Block =
  | { kind: "p"; text: string }
  | { kind: "ol"; items: Array<{ lead: string; text: string }> }
  | { kind: "table"; columns: [string, string, string]; rows: Array<[string, string, string]> }
  | { kind: "objection"; lead: string; text: string };

export type Chapter = {
  id: string;
  heading: string;
  drawing?: Drawing;
  blocks: Block[];
};

export const LEAD =
  "You cannot find out why people do things by asking them, so the only honest research reads what they say to each other and follows it over time. Niklas Luhmann is the thinker who proved that claim, and Bakamo's method is built on it.";

export const CHAPTERS: Chapter[] = [
  {
    id: "you-cannot-ask-a-mind-why",
    heading: "You cannot ask a mind why",
    drawing: {
      file: "1-interview.jpg",
      alt: "Manga page: a woman across a table from a researcher with a clipboard; her thought balloon is crammed with images, her speech balloon says only 'I like the taste', and the clipboard records 'taste: 7/10'.",
      caption: "The answer is not the reason.",
      portrait: true,
    },
    blocks: [
      {
        kind: "p",
        text: "Every questionnaire, focus group and depth interview rests on one assumption: that a person can tell you why they did something. Niklas Luhmann, the German sociologist who spent forty years building a theory of how society works, showed that this assumption is false, and not because people lie.",
      },
      {
        kind: "p",
        text: "A mind is closed. Nobody, not even its owner, can see its workings from outside. When you ask someone why they chose a bank, a party or a brand, what you get is a story composed on the spot, for you, in the shape a respectable answer is expected to take. The psychologist Frederic Bartlett saw this in the 1930s: people retelling an unfamiliar tale quietly dropped whatever did not fit and added causes that were never there, until the story looked like one they already knew. Erving Goffman saw it in every waiting room: people perform a front for whoever is watching, and a researcher is someone watching.",
      },
      {
        kind: "p",
        text: "So the answer to a research question is not the person's reason. It is the person's performance of a reason. Research built on asking measures the performance and calls it the person.",
      },
      {
        kind: "p",
        text: "This is not a complaint about bad surveys. It is a statement about what can and cannot be observed, and it is where Bakamo's method begins.",
      },
    ],
  },
  {
    id: "only-the-conversation-can-be-observed",
    heading: "Only the conversation can be observed",
    drawing: {
      file: "2-friends.jpg",
      alt: "Manga page: two friends on a park bench, each drawn as a sealed box with a small dark window; three speech balloons float between them; a woman with a notebook watches the balloons.",
      caption: "Two closed minds. Nothing inside either can be seen. The words between them can.",
    },
    blocks: [
      {
        kind: "p",
        text: "If minds are closed, what is left? Luhmann's answer is blunt: communication. People cannot communicate, he wrote; only communication communicates. The thought inside a head is invisible. The sentence said to a friend, the complaint posted at midnight, the joke that gets repeated, the argument that will not die: these are out in the open, and they are the whole of what any observer can see.",
      },
      {
        kind: "p",
        text: "This is what second-order means. First-order research watches the consumer and asks what they think. Second-order research watches how people watch: the lines they draw, the things they treat as obvious, the things they have stopped arguing about. We do not observe the person. We observe their observing, as it shows in what they say to one another.",
      },
      {
        kind: "p",
        text: "Two things follow. Nobody has to be asked, so nobody performs. And the material already exists in enormous quantity: in 2003, when this argument was first written down, it meant sitting with nine senior marketers for an hour each. Today millions of people talk to each other in public every day, unprompted, and the method that only ever needed what people say is the one method built for that material.",
      },
      {
        kind: "p",
        text: "This is the ground under the phrase we use for what we find: Social Truth. It is not what people say when you ask them. It is what their conversations reveal when you listen.",
      },
    ],
  },
  {
    id: "meaning-is-a-difference",
    heading: "Meaning is a difference",
    drawing: {
      file: "3-wine.jpg",
      alt: "Manga page of four panels: the same man at a bar; the chalk line on the floor splits from 'alcohol or none' to 'beer or wine' to 'red or white' to a fine web of lines, and he holds one glass up to the light.",
      caption: "Each line drawn changes what you can see next.",
    },
    blocks: [
      {
        kind: "p",
        text: "What does a conversation actually show? Luhmann's answer, borrowed from the mathematician George Spencer-Brown and the anthropologist Gregory Bateson, is that it shows distinctions: the lines a person draws between one thing and another. Information, in Bateson's phrase, is a difference that makes a difference.",
      },
      {
        kind: "p",
        text: "Everyone sees the world through a small set of such lines. For someone who does not drink, the line runs between alcoholic and not. For someone who does, it runs between beer and wine, then red and white, then one valley's red and another's. Each line, once drawn, changes what the person can see next; Luhmann calls the set of things a person can currently see their horizon of possibilities. A brand, a policy or an institution exists for a person only once it sits on one of their lines. Off the lines, it is invisible, however much is spent on it.",
      },
      {
        kind: "p",
        text: "This gives research a different object. Not how much do people like you, which is a score, but which lines do people see you through, which is a map. A score tells you how you are doing. A line tells you what to do, because a line can be sharpened or shifted. One painkiller once announced that it did not hurt your stomach. Nobody had thought about their stomach before. A new line appeared, the older rival landed on the wrong side of it, and the whole category was reorganised without a single score changing first.",
      },
    ],
  },
  {
    id: "people-and-brands-are-stories-in-time",
    heading: "People and brands are stories in time",
    drawing: {
      file: "4-sandbank.jpg",
      alt: "Manga page of three stacked panels: a wave drawn as a speech balloon arrives on a beach, recedes leaving a line of words, and many tides later a sand bank has built, with a small figure reading on top of it.",
      caption: "What each wave leaves behind.",
      portrait: true,
    },
    blocks: [
      {
        kind: "p",
        text: "A line, once drawn, does not vanish. Luhmann says it is re-entered: folded back into the person's own structure, where it shapes the next observation. Over years this produces a trajectory that looks, in hindsight, like a story. The philosopher Paul Ricoeur made the point directly: a person becomes the reader and writer of their own life, and the self is a cloth woven of stories told.",
      },
      {
        kind: "p",
        text: "The same is true of anything a person has a relationship with. A brand is not a logo or a list of attributes. It is a biography the public has written for it: “he was popular for a while, then he faded, now he is making a comeback”, as one research director put it in 2003. When a company acts without explaining how the act fits its story, people fill the gap themselves, and they fill it uncharitably. Every message is a wave that hits the shore and recedes, and what matters is the little bit of meaning it leaves behind, grain by grain, until there is a sand bank. Meaning accumulates, and it can only be seen over time.",
      },
      {
        kind: "p",
        text: "This is why a photograph of opinion is never enough. A tracker takes a photograph a quarter; a photo album cannot tell you how the pictures relate. Reading communication as it unfolds is the only method that sees the movement rather than the pose.",
      },
      {
        kind: "p",
        text: "And it applies far beyond consumer goods. A ministry, an alliance, a regulator, a charity: each exists in public as a story people tell about it, each is re-read with every act, and each lives or dies by whether its story can still be folded into the stories people tell about their own lives. Public institutions rarely like to hear it, but all they have, in the public's mind, is a brand.",
      },
    ],
  },
  {
    id: "what-this-changes-in-research",
    heading: "What this changes in research",
    drawing: {
      file: "5-score-map.jpg",
      alt: "Manga page split in two: on the left a researcher measures a stiff crowd with a ruler under the number 72%; on the right the same researcher sits unnoticed on fountain steps sketching a map of the knots of people talking.",
      caption: "A score, or a map.",
    },
    blocks: [
      {
        kind: "p",
        text: "The question “why do people buy this” is replaced by “which distinctions do people see this through”. We scout for distinctions, not for perceptions. The goal is not to extract a reason from a head that cannot give one; it is to map the frame of reference inside which a brand or an institution is meaningful, and to watch that frame move.",
      },
      { kind: "p", text: "In practice this means four things." },
      {
        kind: "ol",
        items: [
          {
            lead: "We never ask.",
            text: "We read what people say to each other where no researcher is present and no question has been put. People perform for researchers; they tell each other the truth.",
          },
          {
            lead: "What they say is how they see.",
            text: "The lines a person draws show in their language whether they intend it or not: in what they compare, what they treat as obvious, what they joke about, what they have stopped debating. Reading the content carefully is reading the frame.",
          },
          {
            lead: "We read, we do not count.",
            text: "A count of mentions or a sentiment score measures volume of a thing nobody has yet defined. A reading finds the lines first, then counts along them. Discovery first, measurement second.",
          },
          {
            lead: "We follow it over time.",
            text: "Meaning is what is left behind after each wave recedes. A single read is a photograph; a standing reading is the film.",
          },
        ],
      },
      {
        kind: "p",
        text: "The output is a map of distinctions, the stories they organise, and the direction of travel. A client can act on a map: sharpen a line that favours them, introduce a line that reorganises the category, or discover that the line they are fighting on is one the public stopped caring about years ago.",
      },
    ],
  },
  {
    id: "luhmann-plainly",
    heading: "Luhmann, plainly",
    drawing: {
      file: "6-card-index.jpg",
      alt: "Manga page: an older man in a cardigan at a wall of thousands of small wooden drawers holds one index card up to the window light; faint pencil threads run from the card to other drawers.",
      caption: "He wrote his books out of this box, and called it his conversation partner.",
    },
    blocks: [
      {
        kind: "p",
        text: "Niklas Luhmann was born in Lüneburg in 1927, trained as a lawyer, worked as a civil servant, and spent the second half of his life as a professor of sociology at Bielefeld, where he died in 1998. He wrote his books out of a wooden card index he kept for forty years, each card a thought linked by number to other thoughts, and he described the box as his conversation partner. His 1984 book Soziale Systeme (Social Systems) is the one to start with, and the one this page leans on.",
      },
      {
        kind: "p",
        text: "His vocabulary is the obstacle. The ideas are not. Here is each of his terms in his word, in ours, and in the example of two friends talking on a bench that runs through this page.",
      },
      {
        kind: "table",
        columns: ["His word", "In plain words", "The two friends"],
        rows: [
          [
            "System and environment",
            "Anything that keeps itself going by drawing a line between inside and outside. A person is one; so is a conversation, a company, a brand.",
            "Each friend is a system. The other friend, the bench, the city: environment.",
          ],
          [
            "Operationally closed, structurally open",
            "What happens inside cannot be reached from outside, but outside events can jolt it. The world does not determine a mind; it only knocks on it.",
            "Neither friend can put a thought into the other's head. Each can only say something and see what comes back.",
          ],
          [
            "Only communication communicates",
            "A thought stays inside. What crosses between people is the sentence, and the sentence has a life of its own.",
            "The words on the bench exist for both of them and for anyone passing. The thoughts behind them exist for nobody else.",
          ],
          [
            "Observation is drawing a distinction",
            "To see anything is to mark it off from what it is not. There is no seeing without a line.",
            "“This coffee is good” draws a line between good and not. The friend who says it has just told you which line he uses.",
          ],
          [
            "Second-order observation",
            "Watching how someone watches: not what they see, but the lines they draw to see it.",
            "A reader on the next bench cannot know what the friends think. She can hear which lines they draw, and that is the more useful thing.",
          ],
          [
            "Meaning",
            "The one thing in view, surrounded by everything it could have been instead. Meaning is the link between the actual and the possible.",
            "“My mother swore by it” means something because it stands against all the brands the mother did not swear by.",
          ],
          [
            "Horizon of possibilities",
            "The set of things a person can currently see, imagine or want. It is shaped by every line they have drawn before.",
            "The friend who has never tasted wine does not have “red or white” on his horizon. After tonight he might.",
          ],
          [
            "Re-entry",
            "A line, once drawn, is folded back into the mind that drew it and shapes the next thing it sees.",
            "After this conversation, both friends will hear the word “price” slightly differently. The line has re-entered.",
          ],
          [
            "Contingency",
            "Every choice could have gone another way, and the system knows it. Selecting is risk.",
            "Talking about the price instead of the weather was a choice. Both friends know the evening could have gone elsewhere.",
          ],
          [
            "Structural coupling",
            "Two systems that have grown around each other so that each can reliably jolt the other. Friendship. Language. A loyal customer and a brand.",
            "Years of these benches have taught each friend which sentences land. That is what their friendship is made of.",
          ],
          [
            "System time",
            "Each system runs on its own clock. A bureaucracy, a brand and a teenager do not experience a year as the same length.",
            "One friend feels the conversation was long. The other, that it had barely started. Both are right.",
          ],
        ],
      },
      {
        kind: "p",
        text: "None of this needs the German. It needs only the willingness to give up one comfortable belief: that if you ask people the right question, they will tell you what is inside. Luhmann's whole work is the patient demonstration that they cannot, and that what they say to each other is worth more anyway.",
      },
    ],
  },
  {
    id: "the-honest-objections",
    heading: "The honest objections",
    drawing: {
      file: "7-argument.jpg",
      alt: "Manga page: two elderly professors at a café table, one beside a towering stack of books listening calmly, the other holding a single sheet and gesturing at the stack.",
      caption: "Habermas and Luhmann argued for twenty years. Both are drawn with respect.",
    },
    blocks: [
      {
        kind: "p",
        text: "Luhmann is not universally loved, and a page that pretended otherwise would deserve the suspicion it got. Three objections are serious.",
      },
      {
        kind: "objection",
        lead: "He is hard to read.",
        text: "True. His prose is abstract and his books are long. The ideas, stripped of the vocabulary, are simple: minds are closed, communication is what shows, meaning is a difference, differences accumulate into stories. Everything on this page can be said without his terms, and we usually say it that way.",
      },
      {
        kind: "objection",
        lead: "He leaves no room for right and wrong.",
        text: "This was Jürgen Habermas's charge: a theory that only describes how systems observe cannot tell anyone what they ought to do. We accept the charge and decline the consequence. A method that refuses to decide for people what they should want is exactly the method you want reading them. Judgement belongs to the client and the analyst, after the reading, not baked into the instrument before it.",
      },
      {
        kind: "objection",
        lead: "He forgets the individual.",
        text: "The opposite is true. A theory that says every mind is closed and unobservable is a theory that takes individuality more seriously than any segmentation ever has. It is the survey, which assumes a question means the same thing to everyone, that forgets the individual.",
      },
    ],
  },
  {
    id: "bakamos-answer-is-yes",
    heading: "Bakamo's answer is yes",
    blocks: [
      {
        kind: "p",
        text: "We do not hold Luhmann at arm's length. We are not borrowing a few of his terms to decorate a listening tool. We think he was right, and we think the rest of the research industry is still working as if he had never written.",
      },
      {
        kind: "p",
        text: "He was right that a mind cannot be seen into, which means every method built on asking is measuring a performance and calling it a person. He was right that communication is the only thing that can be observed, which means the material of research is what people say to each other, not what they say to us. He was right that meaning is a difference, which means the object of research is the line a person draws, not the score we give them. And he was right that differences accumulate in time, which means a single photograph of opinion is not evidence of anything but the day it was taken.",
      },
      {
        kind: "p",
        text: "Every one of those sentences is a thing the survey, the focus group and the tracker get wrong, not occasionally but by design. We have run more than five hundred studies in sixty-five languages on the assumption that Luhmann was right, and we have not yet found the conversation that proved him wrong.",
      },
      {
        kind: "p",
        text: "So this is not a page about a thinker we admire. It is a page about the only description of how people make meaning that survives contact with what people actually say. Everything Bakamo does follows from accepting it. We think everyone who claims to understand the public should.",
      },
    ],
  },
  {
    id: "the-thesis-behind-this-page",
    heading: "The thesis behind this page",
    drawing: {
      file: "8-thesis.jpg",
      alt: "Manga page of two panels: a student in a snowy university library in 2003 typing the last page of a thesis; the same man twenty-three years later before a screen showing a map of thousands of dots in clusters, the old thesis open beside it.",
      caption: "Written down in 2003, built twenty-three years later.",
      portrait: true,
    },
    blocks: [
      {
        kind: "p",
        text: "This argument was first written down in 2003, as a master's thesis at the University of Calgary titled The Storied Brand, by Bakamo's founder. It asked whether Luhmann's theory could explain how brands come to mean anything to people, and tested the answer against nine senior figures in market research, brand management and advertising in Toronto, Budapest, Cambridge and Paris.",
      },
      {
        kind: "p",
        text: "The thesis concluded that brands and people are both stories, that a brand is adopted when its story can be written into a person's own, and that research should therefore stop asking why and start reading how people talk. Its last substantive page notes that a research method built on these fundamentals had not been operationalised. The Reading Machine, twenty-three years later, is that operationalisation.",
      },
      { kind: "p", text: "The full thesis is available on request." },
    ],
  },
];
