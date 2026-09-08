import type { ReadingSession, UserPreferences } from "@/domain/types";
import { DEFAULT_PREFERENCES, type Storage } from "./types";

const DB_NAME = "contemplative";
const DB_VERSION = 1;
const SESSIONS = "sessions";
const PREFS = "prefs";

let dbPromise: Promise<IDBDatabase> | null = null;

function openDb(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      const d = req.result;
      if (!d.objectStoreNames.contains(SESSIONS)) d.createObjectStore(SESSIONS, { keyPath: "id" });
      if (!d.objectStoreNames.contains(PREFS)) d.createObjectStore(PREFS, { keyPath: "key" });
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error ?? new Error("IndexedDB open failed"));
  });
  return dbPromise;
}

function request<T>(req: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error ?? new Error("IndexedDB request failed"));
  });
}

type SessionRow = { id: string; json: string };
type PrefRow = { key: string; json: string };

export const storage: Storage = {
  async listSessions(): Promise<ReadingSession[]> {
    const db = await openDb();
    const rows = await request(db.transaction(SESSIONS, "readonly").objectStore(SESSIONS).getAll() as IDBRequest<SessionRow[]>);
    return rows.map((r) => JSON.parse(r.json) as ReadingSession);
  },
  async getSession(id: string): Promise<ReadingSession | null> {
    const db = await openDb();
    const row = await request(db.transaction(SESSIONS, "readonly").objectStore(SESSIONS).get(id) as IDBRequest<SessionRow | undefined>);
    return row ? (JSON.parse(row.json) as ReadingSession) : null;
  },
  async saveSession(session: ReadingSession): Promise<void> {
    const db = await openDb();
    await request(db.transaction(SESSIONS, "readwrite").objectStore(SESSIONS).put({ id: session.id, json: JSON.stringify(session) }));
  },
  async deleteSession(id: string): Promise<void> {
    const db = await openDb();
    await request(db.transaction(SESSIONS, "readwrite").objectStore(SESSIONS).delete(id));
  },
  async loadPreferences(): Promise<UserPreferences> {
    const db = await openDb();
    const row = await request(db.transaction(PREFS, "readonly").objectStore(PREFS).get("prefs") as IDBRequest<PrefRow | undefined>);
    return row ? { ...DEFAULT_PREFERENCES, ...(JSON.parse(row.json) as Partial<UserPreferences>) } : DEFAULT_PREFERENCES;
  },
  async savePreferences(prefs: UserPreferences): Promise<void> {
    const db = await openDb();
    await request(db.transaction(PREFS, "readwrite").objectStore(PREFS).put({ key: "prefs", json: JSON.stringify(prefs) }));
  },
};
