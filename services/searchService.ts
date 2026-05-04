import type { SearchResultAyah } from "@/types/quran";

const BASE_URL = "https://api.alquran.cloud/v1";

interface RawAyah {
  number: number;
  numberInSurah: number;
  text: string;
  surah: {
    number: number;
    name: string;
    englishName: string;
  };
}

/**
 * Search ayahs by English translation or Arabic text.
 * Uses alquran.cloud /search endpoint — no auth required.
 */
export async function searchAyahs(query: string): Promise<SearchResultAyah[]> {
  if (!query.trim()) return [];

  // Detect Arabic input by checking for Arabic Unicode range
  const isArabic = /[\u0600-\u06FF]/.test(query);
  const edition = isArabic ? "quran-uthmani" : "en.sahih";

  const res = await fetch(
    `${BASE_URL}/search/${encodeURIComponent(query)}/all/${edition}`,
    { cache: "no-store" }
  );

  if (!res.ok) return [];

  const json = await res.json();
  const matches: RawAyah[] = json?.data?.matches ?? [];

  // If searching English, also fetch Arabic text for each result
  if (!isArabic) {
    return matches.map((m) => ({
      number: m.number,
      numberInSurah: m.numberInSurah,
      text: "",           // Arabic fetched lazily in UI if needed
      translation: m.text,
      surahNumber: m.surah.number,
      surahName: m.surah.name,
      surahEnglishName: m.surah.englishName,
    }));
  }

  return matches.map((m) => ({
    number: m.number,
    numberInSurah: m.numberInSurah,
    text: m.text,
    translation: "",
    surahNumber: m.surah.number,
    surahName: m.surah.name,
    surahEnglishName: m.surah.englishName,
  }));
}
