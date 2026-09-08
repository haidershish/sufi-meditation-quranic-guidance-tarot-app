import type { ReadingSession } from "@/domain/types";

// In-memory holder for the active (not-yet-saved) reading. Cards and order are
// captured at draw time; the draw/session screen reads from here so navigation
// never silently changes a reading. Cleared once the session is saved.
let draft: ReadingSession | null = null;

export function setDraft(session: ReadingSession): void {
  draft = session;
}

export function getDraft(): ReadingSession | null {
  return draft;
}

export function clearDraft(): void {
  draft = null;
}
