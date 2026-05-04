import type { SearchResultAyah } from "@/types/quran";
import quranData from "@/src/data/quran.json";
import type { SurahDetail } from "@/types/quran";

const surahs = (quranData as { surahs: SurahDetail[] }).surahs;

/**
 * Search ayahs by Arabic text or English translation — fully offline.
 * Detects Arabic input by checking for Arabic Unicode range.
 */
export function searchAyahs(query: string): SearchResultAyah[] {
  if (!query.trim()) return [];

  const q = query.trim().toLowerCase();
  const isArabic = /[\u0600-\u06FF]/.test(query);
  const results: SearchResultAyah[] = [];

  for (const surah of surahs) {
    for (const ayah of surah.ayahs) {
      const matches = isArabic
        ? ayah.text.includes(query.trim())
        : ayah.translation.toLowerCase().includes(q);

      if (matches) {
        results.push({
          number: ayah.number,
          numberInSurah: ayah.numberInSurah,
          text: ayah.text,
          translation: ayah.translation,
          surahNumber: surah.number,
          surahName: surah.name,
          surahEnglishName: surah.englishName,
        });
      }

      // Cap at 100 results for performance
      if (results.length >= 100) return results;
    }
  }

  return results;
}
