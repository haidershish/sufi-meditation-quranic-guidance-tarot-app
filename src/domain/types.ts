// Domain types — pure, no Expo/react imports. This is the single source of
// truth for card, spread, and session shapes shared across screens and storage.

export type ArtworkStatus = "approved" | "placeholder" | "missing";

export type CardGuide = {
  theme: string;
  descriptionOfImage: string;
  invitation: string;
  outOfBalance: string;
  contemplate: string;
  practice: string;
  intention: string;
  visualMeditation: string;
};

export type DeckCard = {
  id: string;
  index: number;
  arcana: string;
  suit: string | null;
  rank: string;
  title: string;
  transliteration: string;
  guide: CardGuide;
  artwork: {
    status: ArtworkStatus;
    assetKey: string | null;
    sourceChecksum: string | null;
  };
};

export type FrontMatterSection = { title: string; body: string };

export type FrontMatter = {
  title: string;
  subtitle: string;
  sections: FrontMatterSection[];
  closingNote: string | null;
  footer: string;
};

export type DeckBundle = {
  deckVersion: string;
  generatedAt: string;
  provenance: Record<string, string>;
  frontMatter: FrontMatter;
  cards: DeckCard[];
};

export type SpreadId = "single" | "three-card";

export type SpreadPosition = { key: string; label: string; prompt: string };

export type SpreadDefinition = {
  id: SpreadId;
  name: string;
  description: string;
  positions: SpreadPosition[];
};

export type DrawnCard = { cardId: string; position: string; order: number };

export type SessionStatus = "draft" | "revealed" | "reflected" | "saved";

export type ReadingSession = {
  id: string;
  createdAt: string;
  completedAt?: string;
  spreadId: SpreadId;
  questions?: string[];
  intention?: string;
  deckVersion: string;
  cards: DrawnCard[];
  journalText?: string;
  status: SessionStatus;
};

export type UserPreferences = {
  reduceMotion: boolean;
  haptics: boolean;
  textScale: "default" | "large";
  theme: "system" | "light" | "dark";
};
