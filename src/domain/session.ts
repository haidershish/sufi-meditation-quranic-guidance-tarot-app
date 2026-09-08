import type { ReadingSession, SessionStatus, SpreadId } from "./types";

export function newId(): string {
  // uuid-like id without external deps; crypto-backed where available
  const rnd =
    typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function"
      ? (crypto.getRandomValues(new Uint32Array(4)) as unknown as number[])
      : [Math.random() * 0xffffffff, Math.random() * 0xffffffff, Math.random() * 0xffffffff, Math.random() * 0xffffffff];
  return (
    rnd[0].toString(16).padStart(8, "0") +
    rnd[1].toString(16).padStart(8, "0") +
    rnd[2].toString(16).padStart(8, "0") +
    rnd[3].toString(16).padStart(8, "0")
  );
}

export function createSession(
  spreadId: SpreadId,
  deckVersion: string,
  cards: ReadingSession["cards"],
  intention?: string,
  questions?: string[],
): ReadingSession {
  return {
    id: newId(),
    createdAt: new Date().toISOString(),
    spreadId,
    questions,
    intention,
    deckVersion,
    cards,
    status: "draft",
  };
}

const ORDER: SessionStatus[] = ["draft", "revealed", "reflected", "saved"];

export function advanceStatus(current: SessionStatus, to: SessionStatus): SessionStatus {
  if (ORDER.indexOf(to) < ORDER.indexOf(current)) return current;
  return to;
}

export function completeSession(
  session: ReadingSession,
  journalText?: string,
): ReadingSession {
  return {
    ...session,
    journalText,
    status: "saved",
    completedAt: new Date().toISOString(),
  };
}
