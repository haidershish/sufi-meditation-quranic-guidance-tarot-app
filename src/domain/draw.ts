import type { DrawnCard, SpreadDefinition } from "./types";
import { randomInt, type Rng } from "../platform/random";

// Draw `count` distinct card ids, preserving selection order. Non-repeating
// within a single draw. The chosen ids/order are returned immediately so the
// caller can persist them before any reveal — navigation/restart must never
// silently change a reading.
export function drawCards(
  allCardIds: readonly string[],
  spread: SpreadDefinition,
  rng: Rng,
): DrawnCard[] {
  const count = spread.positions.length;
  if (allCardIds.length < count) {
    throw new Error(`not enough cards: have ${allCardIds.length}, need ${count}`);
  }
  const pool = [...allCardIds];
  const result: DrawnCard[] = [];
  for (let order = 0; order < count; order++) {
    const idx = randomInt(pool.length, rng);
    const [cardId] = pool.splice(idx, 1);
    result.push({
      cardId,
      position: spread.positions[order].key,
      order,
    });
  }
  return result;
}
