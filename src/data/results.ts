// 📝 EDIT THIS FILE TO UPDATE RESULTS AFTER EACH COMPETITION
// Just change winners, add events, or update the lastUpdated timestamp.

export const eventInfo = {
  // TODO: Update dates/contact details as needed.
  title: "Ragolsavam 2026",
  tagline: "",
  subtitle: "Official Results & Information Portal",
  organizer: "JCI India Zone 22",
  contact: {
    email: "info@jciz22.in",
    phone: "+91 98000 00000",
  },
  lastUpdated: "2026-01-15T10:30:00",
};

export type Winner = { position: number; name: string; chapter?: string };
export type EventResult = {
  id: string;
  name: string;
  winners: Winner[];
  isNew?: boolean;
};
export type CategoryGroup = "Infants & Kiddies" | "Students" | "JC Members";
export type Category = {
  id: string; // 1..9
  label: string;
  group: CategoryGroup;
  icon: string;
  events: EventResult[];
};

// Helpers to keep event updates small and consistent.
const toWinners = (names: string[]): Winner[] =>
  names.map((name, index) => ({ position: index + 1, name }));

// Fill winners here using only names; keep arrays empty for "Results awaited".
const winnersByEventId: Record<string, string[]> = {
  "c1-fancy-dress": ["rahul- jci ktm","rohan - jci tvla, rose- jci ktm","ann- jci pta"],
  "c1-action-song": [],
  "c1-smiling": [],
  "c1-colouring": [],

  "c2-fancy-dress": [],
  "c2-action-song": [],
  "c2-cinematic-dance": [],
  "c2-colouring": [],

  "c3-elocution-eng": [],
  "c3-solo-song": [],
  "c3-jci-creed": [],
  "c3-cinematic-dance": [],
  "c3-fashion-show": [],
  "c3-painting": [],
  "c3-pencil-drawing": [],

  "c4-elocution-eng": [],
  "c4-cinematic-dance": [],
  "c4-jci-creed": [],
  "c4-solo-song": [],
  "c4-monoact": [],
  "c4-fashion-show": [],
  "c4-recitation-eng": [],
  "c4-recitation-mal": [],
  "c4-painting": [],
  "c4-pencil-drawing": [],
  "c4-poetry": [],

  "c5-extempore-eng": [],
  "c5-extempore-mal": [],
  "c5-cinematic-dance": [],
  "c5-jci-creed": [],
  "c5-solo-song": [],
  "c5-monoact": [],
  "c5-recitation-mal": [],
  "c5-recitation-eng": [],
  "c5-fashion-show": [],
  "c5-painting": [],
  "c5-pencil-drawing": [],

  "c6-extempore-mal": [],
  "c6-extempore-eng": [],
  "c6-cinematic-dance": [],
  "c6-recitation-eng": [],
  "c6-recitation-mal": [],
  "c6-solo-song": [],

  "c7-fashion-show": [],
  "c7-thiruvathira": [],
  "c7-treasure-hunt": [],
  "c7-group-dance": [],
  "c7-nadan-pattu": [],
  "c7-skit": [],
  "c7-couple-dance": [],
  "c7-mobile-photography": [],
  "c7-rubiks-cube": [],

  "c8-solo-song": [],
  "c8-saree-draping": [],
  "c8-extempore-mal": [],
  "c8-tie-a-tie": [],
  "c8-mimicry": [],

  "c9-group-dance": [],
  "c9-mime": [],
};

const event = (
  id: string,
  name: string,
  winners: string[] | undefined = undefined,
  options: Pick<EventResult, "isNew"> = {},
): EventResult => ({
  id,
  name,
  winners: toWinners(winners ?? winnersByEventId[id] ?? []),
  ...options,
});

// Helper for events that don't have results published yet.
const pending = (id: string, name: string): EventResult => event(id, name);

export const categories: Category[] = [
  // TODO: Replace pending() with winners once results are announced.
  {
    id: "1",
    label: "Category 1 — Infants (Below 3 Years)",
    group: "Infants & Kiddies",
    icon: "👶",
    events: [
      pending("c1-fancy-dress", "Fancy Dress"),
      pending("c1-action-song", "Action Song"),
      pending("c1-smiling", "Smiling Competition"),
      pending("c1-colouring", "Crayon Colouring (Off Stage)"),
    ],
  },
  {
    id: "2",
    label: "Category 2 — Kiddies (LKG & UKG)",
    group: "Infants & Kiddies",
    icon: "🧒",
    events: [
      pending("c2-fancy-dress", "Fancy Dress"),
      pending("c2-action-song", "Action Song"),
      pending("c2-cinematic-dance", "Cinematic Dance (Single)"),
      pending("c2-colouring", "Crayon Colouring (Off Stage)"),
    ],
  },
  {
    id: "3",
    label: "Category 3 — Sub Junior (Class I to IV)",
    group: "Students",
    icon: "📘",
    events: [
      pending("c3-elocution-eng", "Elocution (English)"),
      pending("c3-solo-song", "Solo Song"),
      pending("c3-jci-creed", "JCI Creed"),
      pending("c3-cinematic-dance", "Cinematic Dance (Single)"),
      pending("c3-fashion-show", "Fashion Show (Single)"),
      pending("c3-painting", "Painting (Off Stage)"),
      pending("c3-pencil-drawing", "Pencil Drawing (Off Stage)"),
    ],
  },
  {
    id: "4",
    label: "Category 4 — Junior (Class V to VIII)",
    group: "Students",
    icon: "📗",
    events: [
      pending("c4-elocution-eng", "Elocution (English)"),
      pending("c4-cinematic-dance", "Cinematic Dance (Single)"),
      pending("c4-jci-creed", "JCI Creed"),
      pending("c4-solo-song", "Solo Song"),
      pending("c4-monoact", "Monoact"),
      pending("c4-fashion-show", "Fashion Show (Single)"),
      pending("c4-recitation-eng", "Recitation (English)"),
      pending("c4-recitation-mal", "Recitation (Malayalam)"),
      pending("c4-painting", "Water Colour Painting (Off Stage)"),
      pending("c4-pencil-drawing", "Pencil Drawing (Off Stage)"),
      pending("c4-poetry", "Poetry Writing (Off Stage)"),
    ],
  },
  {
    id: "5",
    label: "Category 5 — Senior (Class IX to XII)",
    group: "Students",
    icon: "📕",
    events: [
      pending("c5-extempore-eng", "Extempore (English)"),
      pending("c5-extempore-mal", "Extempore (Malayalam)"),
      pending("c5-cinematic-dance", "Cinematic Dance (Single)"),
      pending("c5-jci-creed", "JCI Creed"),
      pending("c5-solo-song", "Solo Song"),
      pending("c5-monoact", "Monoact"),
      pending("c5-recitation-mal", "Recitation (Malayalam)"),
      pending("c5-recitation-eng", "Recitation (English)"),
      pending("c5-fashion-show", "Fashion Show (Single)"),
      pending("c5-painting", "Water Colour Painting (Off Stage)"),
      pending("c5-pencil-drawing", "Pencil Drawing (Off Stage)"),
    ],
  },
  {
    id: "6",
    label: "Category 6 — Lady JC & Lady JAC",
    group: "JC Members",
    icon: "👩",
    events: [
      pending("c6-extempore-mal", "Extempore (Malayalam)"),
      pending("c6-extempore-eng", "Extempore (English)"),
      pending("c6-cinematic-dance", "Cinematic Dance (Single)"),
      pending("c6-recitation-eng", "Recitation (English)"),
      pending("c6-recitation-mal", "Recitation (Malayalam)"),
      pending("c6-solo-song", "Solo Song"),
    ],
  },
  {
    id: "7",
    label: "Category 7 — LO Events (JC, Lady JC, JJ & JAC)",
    group: "JC Members",
    icon: "🏛️",
    events: [
      pending("c7-fashion-show", "Fashion Show"),
      pending("c7-thiruvathira", "Thiruvathira"),
      pending("c7-treasure-hunt", "Treasure Hunt"),
      pending("c7-group-dance", "Group Dance"),
      pending("c7-nadan-pattu", "Nadan Pattu"),
      pending("c7-skit", "Skit"),
      pending("c7-couple-dance", "Couple Dance"),
      pending("c7-mobile-photography", "Mobile Photography"),
      pending("c7-rubiks-cube", "Rubik's Cube"),
    ],
  },
  {
    id: "8",
    label: "Category 8 — Gents (JC & JAC)",
    group: "JC Members",
    icon: "👨",
    events: [
      pending("c8-solo-song", "Solo Song"),
      pending("c8-saree-draping", "Spot Saree Draping"),
      pending("c8-extempore-mal", "Extempore (Malayalam)"),
      pending("c8-tie-a-tie", "Tie a Tie"),
      pending("c8-mimicry", "Mimicry"),
    ],
  },
  {
    id: "9",
    label: "Category 9 — Group Events for JJ",
    group: "JC Members",
    icon: "🎭",
    events: [
      pending("c9-group-dance", "Group Dance"),
      pending("c9-mime", "Mime"),
    ],
  },
];


export type GuidelineSection = {
  title: string;
  subtitle?: string;
  groups: { heading: string; items: string[] }[];
};

export const guidelines: GuidelineSection[] = [
  // TODO: Update guidelines text if rules change.
  {
    title: "Category 1 & 2 — Infants & Kiddies",
    subtitle:
      "Category 1 (Infants, below 3 yrs) and Category 2 (Kiddies, LKG–UKG) can participate in 2 onstage and 1 offstage event.",
    groups: [
      {
        heading: "On Stage — Fancy Dress",
        items: [
          "The dialogue has no significance; only costume and stage presence will be judged.",
        ],
      },
      {
        heading: "On Stage — Action Song",
        items: ["Can be in English or Malayalam.", "Time limit: 3 minutes."],
      },
      {
        heading: "On Stage — Cinematic Dance (Single, Category 2 only)",
        items: ["Time limit: minimum 2 minutes – maximum 4 minutes."],
      },
      {
        heading: "Off Stage — Crayon Colouring",
        items: [
          "Only the paper with the image will be provided.",
          "Participants must use only crayons; other colouring materials are not allowed.",
          "Neatness, colour combination and creativity will be considered.",
          "Time limit: 1 hour.",
        ],
      },
    ],
  },
  {
    title: "Category 3, 4 & 5 — Sub-Junior, Junior & Senior",
    subtitle:
      "Sub-Junior (I–IV), Junior (V–VIII) and Senior (IX–XII) can participate in 2 onstage and 1 offstage event.",
    groups: [
      {
        heading: "Elocution (English) — 5 minutes",
        items: [
          "Topic: ‘How to keep our earth clean’ (Category 3).",
          "Topic: ‘Technology — good or bad’ (Category 4).",
        ],
      },
      {
        heading: "Extempore (English & Malayalam)",
        items: [
          "Topic will be given 5 minutes before the start.",
          "Time limit: 5 minutes.",
        ],
      },
      {
        heading: "Recitation (English & Malayalam)",
        items: ["Time limit: 5 minutes."],
      },
      {
        heading: "Cinematic Dance (Single)",
        items: ["Time limit: minimum 2 minutes – maximum 4 minutes."],
      },
      { heading: "Monoact", items: ["Time limit: 5 minutes."] },
      { heading: "Fashion Show — Single (Cat 3, 4 & 5)", items: ["Time limit: 2 minutes."] },
      {
        heading: "Solo Song",
        items: [
          "Can be in any language and any musical form.",
          "Karaoke is not allowed.",
          "Time limit: 3 minutes.",
        ],
      },
      { heading: "Fancy Dress", items: ["The dialogue has no significance."] },
      { heading: "JCI Creed", items: ["Time limit: 2 minutes (invocation)."] },
      {
        heading: "Off Stage — Water Colour Painting",
        items: [
          "Only paper will be provided.",
          "Participants must bring their own materials.",
          "Time: 1 hour.",
        ],
      },
      {
        heading: "Off Stage — Pencil Drawing",
        items: [
          "Only paper will be provided.",
          "Participants must bring their own materials.",
          "Time: 1 hour.",
        ],
      },
      {
        heading: "Off Stage — Poetry Writing",
        items: ["Maximum of 14 lines.", "Language: English only."],
      },
    ],
  },
  {
    title: "Category 6 — Lady JC & Lady JAC",
    subtitle: "One can participate in 2 on-stage events.",
    groups: [
      {
        heading: "Extempore (English & Malayalam)",
        items: [
          "Topic will be given 5 minutes before the start.",
          "Time limit: 5 minutes.",
        ],
      },
      { heading: "Recitation (English & Malayalam)", items: ["Time limit: 5 minutes."] },
      { heading: "Cinematic Dance", items: ["Time limit: minimum 2 minutes – maximum 4 minutes."] },
      {
        heading: "Solo Song",
        items: [
          "Can be in any language and any musical form.",
          "Karaoke is not allowed.",
          "Time limit: 3 minutes.",
        ],
      },
    ],
  },
  {
    title: "Category 7 — LO Events (JC, Lady JC, JJ & JAC)",
    subtitle: "An individual can participate in 3 events. A LO can have two teams.",
    groups: [
      {
        heading: "Fashion Show",
        items: [
          "Time limit: maximum 10 minutes.",
          "Theme: Indian Tradition.",
          "Judgement is based on theme and ramp walk.",
          "Participants: 6 – 15 persons.",
        ],
      },
      {
        heading: "Thiruvathira",
        items: [
          "Time limit: minimum 3 – maximum 10 minutes.",
          "Participants: 6 – 10 persons.",
          "Recorded song can be used.",
        ],
      },
      { heading: "Treasure Hunt", items: ["Participants: 3 – 5 persons."] },
      {
        heading: "Group Dance",
        items: [
          "Time: minimum 3 – maximum 5 minutes.",
          "Participants: 4 persons minimum.",
          "Any type of song can be used.",
        ],
      },
      {
        heading: "Nadan Pattu",
        items: [
          "Time: minimum 3 – maximum 7 minutes.",
          "Participants: 5 – 10 persons.",
        ],
      },
      {
        heading: "Skit",
        items: [
          "Pre-recorded as well as live audio is allowed.",
          "Time limit: minimum 3 – maximum 10 minutes.",
          "Participants: 6 – 15 persons.",
        ],
      },
      {
        heading: "Couple Dance",
        items: [
          "Must be cinematic dance.",
          "Participants must be a male & female; do not necessarily need to be married.",
          "Time limit: minimum 3 – maximum 5 minutes.",
        ],
      },
      {
        heading: "Mobile Photography",
        items: [
          "Photos must be taken strictly on campus, on a mobile phone, and must not be plagiarized.",
          "Photos found to be plagiarized or offensive (religion, culture, violence) will be disqualified.",
        ],
      },
      {
        heading: "Rubik's Cube",
        items: ["Cube will be provided.", "Judged based on speed and accuracy."],
      },
    ],
  },
  {
    title: "Category 8 — Gents (JC, JAC)",
    subtitle: "One person can participate in any 2 events.",
    groups: [
      {
        heading: "Extempore (Malayalam)",
        items: [
          "Topic will be given 5 minutes before the start.",
          "Time limit: 5 minutes.",
        ],
      },
      {
        heading: "Solo Song",
        items: [
          "Can be in any language and any musical form.",
          "Karaoke is not allowed.",
          "Time limit: 3 minutes.",
        ],
      },
      { heading: "Tie a Tie", items: ["Tie should be brought by the participant."] },
      {
        heading: "Spot Saree Draping",
        items: ["Saree will be provided.", "Judged based on speed and accuracy."],
      },
      { heading: "Mimicry", items: ["Time limit: 4 minutes."] },
    ],
  },
  {
    title: "Category 9 — Group Event for JJ",
    subtitle: "An individual can participate in 1 event.",
    groups: [
      {
        heading: "Group Dance",
        items: [
          "Time limit: minimum 3 – maximum 5 minutes.",
          "Participants: 3 persons minimum.",
        ],
      },
      {
        heading: "Mime",
        items: [
          "Time limit: minimum 4 – maximum 7 minutes.",
          "Participants: 5 persons minimum.",
        ],
      },
    ],
  },
];

