import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { dark, light, type Palette } from "@/design/palette";
import type { UserPreferences } from "@/domain/types";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { storage } from "@/storage/storage";
import { DEFAULT_PREFERENCES } from "@/storage/types";

type AppState = {
  prefs: UserPreferences;
  setPrefs: (patch: Partial<UserPreferences>) => void;
  palette: Palette;
  isDark: boolean;
  textScale: number;
};

const Ctx = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const system = useColorScheme();
  const [prefs, setPrefsState] = useState<UserPreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    let cancelled = false;
    storage.loadPreferences().then((p) => {
      if (!cancelled && p) setPrefsState((prev) => ({ ...prev, ...p }));
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const setPrefs = (patch: Partial<UserPreferences>) => {
    setPrefsState((prev) => {
      const next = { ...prev, ...patch };
      storage.savePreferences(next);
      return next;
    });
  };

  const isDark = prefs.theme === "system" ? system === "dark" : prefs.theme === "dark";
  const palette = isDark ? dark : light;
  const textScale = prefs.textScale === "large" ? 1.15 : 1;

  const value = useMemo<AppState>(
    () => ({ prefs, setPrefs, palette, isDark, textScale }),
    [prefs, palette, isDark, textScale],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useApp(): AppState {
  const v = useContext(Ctx);
  if (!v) throw new Error("useApp must be used within AppProvider");
  return v;
}
