export const MEDITATION_THRESHOLD_SECS = 150;

export const MEDITATION_SOURCE = "Khushaamdeed";

export const meditationCategories = [
  "belonging",
  "breathing-and-visualization",
  "boundaries",
  "family",
  "health-and-illness",
  "nature-and-rest",
  "path-and-timing",
  "study-and-work",
  "unspecified",
] as const;

export type MeditationCategory = (typeof meditationCategories)[number];
export type MeditationStatus = "final" | "pilot" | "candidate" | "raw" | "draft";

export type Meditation = {
  id: string;
  title: string;
  category: MeditationCategory;
  status: MeditationStatus;
  durationSecs: number;
  asset: number;
  source: typeof MEDITATION_SOURCE;
  sourceRelativePath: string;
};

const IS_TEST = typeof process !== "undefined" && process.env.NODE_ENV === "test";

export const meditations = [
  {
    id: "khushaamdeed-monsoon-night-aimee-pilot",
    title: "Monsoon Night (Aimee Pilot)",
    category: "nature-and-rest",
    status: "pilot",
    durationSecs: 485.179615,
    asset: IS_TEST ? 1 : require("../../assets/audio/meditations/monsoon-night-aimee-pilot-8min.mp3"),
    source: MEDITATION_SOURCE,
    sourceRelativePath: "monsoon-night-aimee-pilot-8min.mp3",
  },
  {
    id: "khushaamdeed-your-life-loving-boundaries",
    title: "Your Life, Loving Boundaries",
    category: "boundaries",
    status: "final",
    durationSecs: 482.73059,
    asset: IS_TEST ? 1 : require("../../assets/audio/meditations/01-your-life-loving-boundaries.mp3"),
    source: MEDITATION_SOURCE,
    sourceRelativePath: "01-your-life-loving-boundaries.mp3",
  },
  {
    id: "khushaamdeed-your-path-is-not-late",
    title: "Your Path Is Not Late",
    category: "path-and-timing",
    status: "final",
    durationSecs: 482.092063,
    asset: IS_TEST ? 1 : require("../../assets/audio/meditations/02-your-path-is-not-late.mp3"),
    source: MEDITATION_SOURCE,
    sourceRelativePath: "02-your-path-is-not-late.mp3",
  },
  {
    id: "khushaamdeed-calm-before-study-or-exam",
    title: "Calm Before Study or Exam",
    category: "study-and-work",
    status: "final",
    durationSecs: 489.257619,
    asset: IS_TEST ? 1 : require("../../assets/audio/meditations/03-calm-before-study-or-exam.mp3"),
    source: MEDITATION_SOURCE,
    sourceRelativePath: "03-calm-before-study-or-exam.mp3",
  },
  {
    id: "khushaamdeed-homesickness-and-belonging",
    title: "Homesickness and Belonging",
    category: "belonging",
    status: "final",
    durationSecs: 484.717029,
    asset: IS_TEST ? 1 : require("../../assets/audio/meditations/04-homesickness-and-belonging.mp3"),
    source: MEDITATION_SOURCE,
    sourceRelativePath: "04-homesickness-and-belonging.mp3",
  },
  {
    id: "khushaamdeed-your-life-loving-boundaries-raw",
    title: "Your Life, Loving Boundaries",
    category: "boundaries",
    status: "raw",
    durationSecs: 347.58525,
    asset: IS_TEST ? 1 : require("../../assets/audio/meditations/01-your-life-loving-boundaries-raw.mp3"),
    source: MEDITATION_SOURCE,
    sourceRelativePath: "01-your-life-loving-boundaries-raw.mp3",
  },
  {
    id: "khushaamdeed-your-path-is-not-late-raw",
    title: "Your Path Is Not Late",
    category: "path-and-timing",
    status: "raw",
    durationSecs: 342.308563,
    asset: IS_TEST ? 1 : require("../../assets/audio/meditations/02-your-path-is-not-late-raw.mp3"),
    source: MEDITATION_SOURCE,
    sourceRelativePath: "02-your-path-is-not-late-raw.mp3",
  },
  {
    id: "khushaamdeed-calm-before-study-or-exam-raw",
    title: "Calm Before Study or Exam",
    category: "study-and-work",
    status: "raw",
    durationSecs: 352.287313,
    asset: IS_TEST ? 1 : require("../../assets/audio/meditations/03-calm-before-study-or-exam-raw.mp3"),
    source: MEDITATION_SOURCE,
    sourceRelativePath: "03-calm-before-study-or-exam-raw.mp3",
  },
  {
    id: "khushaamdeed-homesickness-and-belonging-raw",
    title: "Homesickness and Belonging",
    category: "belonging",
    status: "raw",
    durationSecs: 344.16325,
    asset: IS_TEST ? 1 : require("../../assets/audio/meditations/04-homesickness-and-belonging-raw.mp3"),
    source: MEDITATION_SOURCE,
    sourceRelativePath: "04-homesickness-and-belonging-raw.mp3",
  },
  {
    id: "khushaamdeed-ill-health-and-viruses-sadia",
    title: "Ill-health and Viruses",
    category: "health-and-illness",
    status: "draft",
    durationSecs: 334.058667,
    asset: IS_TEST ? 1 : require(
      "../../assets/audio/meditations/Audio Recordings (draft - first submission)/For Sadia/Copy of Ill-health and Viruses.mp4",
    ),
    source: MEDITATION_SOURCE,
    sourceRelativePath:
      "Audio Recordings (draft - first submission)/For Sadia/Copy of Ill-health and Viruses.mp4",
  },
  {
    id: "khushaamdeed-whatsapp-audio-2021-07-17-200404",
    title: "WhatsApp Audio 2021-07-17 at 20.04.04",
    category: "unspecified",
    status: "draft",
    durationSecs: 206.541497,
    asset: IS_TEST ? 1 : require(
      "../../assets/audio/meditations/Audio Recordings (draft - first submission)/Hajra/WhatsApp Audio 2021-07-17 at 20.04.04.mp4",
    ),
    source: MEDITATION_SOURCE,
    sourceRelativePath:
      "Audio Recordings (draft - first submission)/Hajra/WhatsApp Audio 2021-07-17 at 20.04.04.mp4",
  },
  {
    id: "khushaamdeed-fear-and-ill-health-and-viruses",
    title: "Fear and Ill-health and Viruses",
    category: "health-and-illness",
    status: "draft",
    durationSecs: 321.152,
    asset: IS_TEST ? 1 : require(
      "../../assets/audio/meditations/Audio Recordings (draft - first submission)/Nameera/fear and Ill-health and Viruses.mp4",
    ),
    source: MEDITATION_SOURCE,
    sourceRelativePath:
      "Audio Recordings (draft - first submission)/Nameera/fear and Ill-health and Viruses.mp4",
  },
  {
    id: "khushaamdeed-staying-positive-in-ill-health-and-viruses-times",
    title: "Staying Positive in Ill-health and Viruses Times",
    category: "health-and-illness",
    status: "draft",
    durationSecs: 334.058667,
    asset: IS_TEST ? 1 : require(
      "../../assets/audio/meditations/Audio Recordings (draft - first submission)/Nameera/staying positive in Ill-health and Viruses times.mp4",
    ),
    source: MEDITATION_SOURCE,
    sourceRelativePath:
      "Audio Recordings (draft - first submission)/Nameera/staying positive in Ill-health and Viruses times.mp4",
  },
  {
    id: "khushaamdeed-breathing-and-visualization-1",
    title: "Breathing and Visualization Meditation #1",
    category: "breathing-and-visualization",
    status: "candidate",
    durationSecs: 451.235896,
    asset: IS_TEST ? 1 : require("../../assets/audio/meditations/Breathing and Visualization Meditation #1.m4a"),
    source: MEDITATION_SOURCE,
    sourceRelativePath: "Breathing and Visualization Meditation #1.m4a",
  },
  {
    id: "khushaamdeed-breathing-and-visualization-2",
    title: "Breathing and Visualization #2",
    category: "breathing-and-visualization",
    status: "candidate",
    durationSecs: 372.346396,
    asset: IS_TEST ? 1 : require("../../assets/audio/meditations/Breathing and Visualization#2.m4a"),
    source: MEDITATION_SOURCE,
    sourceRelativePath: "Breathing and Visualization#2.m4a",
  },
  {
    id: "khushaamdeed-joint-family-delilah",
    title: "Joint Family",
    category: "family",
    status: "candidate",
    durationSecs: 279.248938,
    asset: IS_TEST ? 1 : require("../../assets/audio/meditations/Joint family - Delilah - slightly slower.mp3"),
    source: MEDITATION_SOURCE,
    sourceRelativePath: "Joint family - Delilah - slightly slower.mp3",
  },
  {
    id: "khushaamdeed-setting-boundaries-delilah",
    title: "Setting Boundaries",
    category: "boundaries",
    status: "candidate",
    durationSecs: 264.59425,
    asset: IS_TEST ? 1 : require("../../assets/audio/meditations/Setting boundaries - Delilah - slightly slower.mp3"),
    source: MEDITATION_SOURCE,
    sourceRelativePath: "Setting boundaries - Delilah - slightly slower.mp3",
  },
  {
    id: "khushaamdeed-study-and-work-stress-delilah",
    title: "Study and Work Stress",
    category: "study-and-work",
    status: "candidate",
    durationSecs: 247.95425,
    asset: IS_TEST ? 1 : require("../../assets/audio/meditations/Study and work stress - Delilah - slightly slower.mp3"),
    source: MEDITATION_SOURCE,
    sourceRelativePath: "Study and work stress - Delilah - slightly slower.mp3",
  },
] satisfies readonly Meditation[];

export const meditationsById = new Map(meditations.map((meditation) => [meditation.id, meditation]));
