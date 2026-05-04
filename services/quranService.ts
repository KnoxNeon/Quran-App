import type { Surah, SurahDetail } from "@/types/quran";
import quranData from "@/src/data/quran.json";

// Type the imported JSON
type QuranData = {
  surahs: SurahDetail[];
};

const data = quranData as QuranData;

// ─── Surah List ───────────────────────────────────────────────────────────────

export function getSurahs(): Surah[] {
  return data.surahs.map(({ number, name, englishName, englishNameTranslation, numberOfAyahs, revelationType }) => ({
    number,
    name,
    englishName,
    englishNameTranslation,
    numberOfAyahs,
    revelationType,
  }));
}

// ─── Single Surah with all ayahs ─────────────────────────────────────────────

export function getSurah(surahNumber: number): SurahDetail | null {
  const surah = data.surahs.find((s) => s.number === surahNumber);
  return surah ?? null;
}

// ─── SSG helper ───────────────────────────────────────────────────────────────

export function getAllSurahNumbers(): number[] {
  return data.surahs.map((s) => s.number);
}
