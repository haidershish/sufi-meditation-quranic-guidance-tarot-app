import bundle from "./deck-bundle.json";
import type { DeckBundle, DeckCard } from "../domain/types";
import { VISUAL_GUIDE_OVERRIDES } from "./visual-overrides";

const raw = bundle as unknown as DeckBundle;

function fail(msg: string): never {
  throw new Error(`[deck] ${msg}`);
}

if (!Array.isArray(raw?.cards)) fail("missing cards array");
if (raw.cards.length !== 78) fail(`expected 78 cards, got ${raw.cards.length}`);

const ids = new Set<string>();
const GUIDE_KEYS = [
  "theme",
  "descriptionOfImage",
  "invitation",
  "outOfBalance",
  "contemplate",
  "practice",
  "intention",
  "visualMeditation",
] as const;

for (const c of raw.cards) {
  if (!c?.id || ids.has(c.id)) fail(`duplicate or missing id: ${c.id}`);
  ids.add(c.id);
  for (const k of GUIDE_KEYS) {
    const v = (c.guide as Record<string, string>)[k];
    if (typeof v !== "string" || !v.trim()) fail(`${c.id} missing guide.${k}`);
  }
}

const cards: DeckCard[] = raw.cards.map((card) => {
  const override = VISUAL_GUIDE_OVERRIDES[card.id];
  return override ? { ...card, guide: { ...card.guide, ...override } } : card;
});

export const deckBundle: DeckBundle = { ...raw, cards };
export const deckVersion: string = raw.deckVersion;
export const frontMatter = raw.frontMatter;
export const allCards: DeckCard[] = cards;

export const cardsById = new Map<string, DeckCard>(allCards.map((c) => [c.id, c]));

export function getCard(id: string): DeckCard {
  const c = cardsById.get(id);
  if (!c) fail(`unknown card id: ${id}`);
  return c;
}

export const coreCards = allCards.filter((c) => c.arcana === "Core Arcana");

export const SUITS = ["Qalam", "Noor", "Mizan", "Ard"] as const;
export type Suit = (typeof SUITS)[number];

export function cardsBySuit(suit: Suit): DeckCard[] {
  return allCards.filter((c) => c.suit === suit);
}
