import type { ReadingSession, UserPreferences } from "@/domain/types";

// Storage contract — mutable user data only (sessions, preferences). Never the
// immutable deck bundle. Native and web each implement this same surface.

export const DEFAULT_PREFERENCES: UserPreferences = {
  reduceMotion: false,
  haptics: true,
  textScale: "default",
  theme: "system",
};

export interface Storage {
  listSessions(): Promise<ReadingSession[]>;
  getSession(id: string): Promise<ReadingSession | null>;
  saveSession(session: ReadingSession): Promise<void>;
  deleteSession(id: string): Promise<void>;
  loadPreferences(): Promise<UserPreferences>;
  savePreferences(prefs: UserPreferences): Promise<void>;
}
