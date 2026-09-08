import * as SQLite from "expo-sqlite";
import type { ReadingSession, UserPreferences } from "@/domain/types";
import { DEFAULT_PREFERENCES, type Storage } from "./types";

let db: SQLite.SQLiteDatabase | null = null;

function getDb(): SQLite.SQLiteDatabase {
  if (!db) {
    db = SQLite.openDatabaseSync("contemplative.db");
    db.execSync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS sessions (id TEXT PRIMARY KEY NOT NULL, json TEXT NOT NULL);
      CREATE TABLE IF NOT EXISTS prefs (key TEXT PRIMARY KEY NOT NULL, json TEXT NOT NULL);
    `);
  }
  return db;
}

export const storage: Storage = {
  async listSessions(): Promise<ReadingSession[]> {
    const rows = getDb().getAllSync<{ json: string }>("SELECT json FROM sessions");
    return rows.map((r) => JSON.parse(r.json) as ReadingSession);
  },
  async getSession(id: string): Promise<ReadingSession | null> {
    const row = getDb().getFirstSync<{ json: string }>(
      "SELECT json FROM sessions WHERE id = ?",
      [id],
    );
    return row ? (JSON.parse(row.json) as ReadingSession) : null;
  },
  async saveSession(session: ReadingSession): Promise<void> {
    getDb().runSync("INSERT OR REPLACE INTO sessions (id, json) VALUES (?, ?)", [
      session.id,
      JSON.stringify(session),
    ]);
  },
  async deleteSession(id: string): Promise<void> {
    getDb().runSync("DELETE FROM sessions WHERE id = ?", [id]);
  },
  async loadPreferences(): Promise<UserPreferences> {
    const row = getDb().getFirstSync<{ json: string }>(
      "SELECT json FROM prefs WHERE key = 'prefs'",
    );
    return row ? { ...DEFAULT_PREFERENCES, ...(JSON.parse(row.json) as Partial<UserPreferences>) } : DEFAULT_PREFERENCES;
  },
  async savePreferences(prefs: UserPreferences): Promise<void> {
    getDb().runSync("INSERT OR REPLACE INTO prefs (key, json) VALUES ('prefs', ?)", [
      JSON.stringify(prefs),
    ]);
  },
};
