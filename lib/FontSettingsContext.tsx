"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

// ─── Types ─────────────────────────────────────────────────────────────────────

export type ArabicFont = "Noto Naskh Arabic" | "Amiri" | "Scheherazade New";

export interface FontSettings {
  arabicFont: ArabicFont;
  arabicSize: number;       // px, 16–40
  translationSize: number;  // px, 12–28
}

export interface FontSettingsContext extends FontSettings {
  setArabicFont: (font: ArabicFont) => void;
  setArabicSize: (size: number) => void;
  setTranslationSize: (size: number) => void;
  reset: () => void;
}

// ─── Defaults ──────────────────────────────────────────────────────────────────

const DEFAULTS: FontSettings = {
  arabicFont: "Noto Naskh Arabic",
  arabicSize: 26,
  translationSize: 15,
};

const STORAGE_KEY = "quran-font-settings";

// ─── Context ───────────────────────────────────────────────────────────────────

const Ctx = createContext<FontSettingsContext | null>(null);

export function useFontSettings(): FontSettingsContext {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useFontSettings must be used inside FontSettingsProvider");
  return ctx;
}

// ─── Helpers ───────────────────────────────────────────────────────────────────

function loadFromStorage(): FontSettings {
  if (typeof window === "undefined") return DEFAULTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULTS;
    return { ...DEFAULTS, ...JSON.parse(raw) };
  } catch {
    return DEFAULTS;
  }
}

function saveToStorage(settings: FontSettings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // ignore
  }
}

// ─── CSS font-family map ────────────────────────────────────────────────────────

export const ARABIC_FONT_FAMILY: Record<ArabicFont, string> = {
  "Noto Naskh Arabic": "'Noto Naskh Arabic', serif",
  "Amiri":             "'Amiri', serif",
  "Scheherazade New":  "'Scheherazade New', serif",
};

export const ARABIC_FONT_OPTIONS: { value: ArabicFont; label: string }[] = [
  { value: "Noto Naskh Arabic", label: "Noto Naskh Arabic" },
  { value: "Amiri",             label: "Amiri" },
  { value: "Scheherazade New",  label: "Scheherazade New" },
];

// ─── Provider ──────────────────────────────────────────────────────────────────

export function FontSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<FontSettings>(DEFAULTS);

  // Hydrate from localStorage on mount (client only)
  useEffect(() => {
    setSettings(loadFromStorage());
  }, []);

  const update = useCallback((patch: Partial<FontSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      saveToStorage(next);
      return next;
    });
  }, []);

  return (
    <Ctx.Provider
      value={{
        ...settings,
        setArabicFont: (arabicFont) => update({ arabicFont }),
        setArabicSize: (arabicSize) => update({ arabicSize }),
        setTranslationSize: (translationSize) => update({ translationSize }),
        reset: () => {
          saveToStorage(DEFAULTS);
          setSettings(DEFAULTS);
        },
      }}
    >
      {children}
    </Ctx.Provider>
  );
}
