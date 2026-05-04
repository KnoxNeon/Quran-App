import type { Surah, SurahDetail, Ayah } from "@/types/quran";

const BASE_URL = "https://api.alquran.cloud/v1";

// ─── Surah List ───────────────────────────────────────────────────────────────

export async function getSurahs(): Promise<Surah[]> {
  const res = await fetch(`${BASE_URL}/surah`, { cache: "force-cache" });
  if (!res.ok) throw new Error("Failed to fetch surah list");
  const json = await res.json();
  return json.data as Surah[];
}

// ─── Single Surah with Arabic + English translation ───────────────────────────

export async function getSurah(surahNumber: number): Promise<SurahDetail | null> {
  try {
    const [arabicRes, translationRes] = await Promise.all([
      fetch(`${BASE_URL}/surah/${surahNumber}`, { cache: "force-cache" }),
      fetch(`${BASE_URL}/surah/${surahNumber}/en.sahih`, { cache: "force-cache" }),
    ]);

    if (!arabicRes.ok || !translationRes.ok) {
      console.error(`Failed to fetch surah ${surahNumber}`);
      return null;
    }

    const [arabicJson, translationJson] = await Promise.all([
      arabicRes.json(),
      translationRes.json(),
    ]);

    const arabicData = arabicJson.data;
    const translationData = translationJson.data;

    const ayahs: Ayah[] = arabicData.ayahs.map(
      (ayah: { number: number; numberInSurah: number; text: string }, i: number) => ({
        number: ayah.number,
        numberInSurah: ayah.numberInSurah,
        text: ayah.text,
        translation: translationData.ayahs[i]?.text ?? "",
      })
    );

    return {
      number: arabicData.number,
      name: arabicData.name,
      englishName: arabicData.englishName,
      englishNameTranslation: arabicData.englishNameTranslation,
      numberOfAyahs: arabicData.numberOfAyahs,
      revelationType: arabicData.revelationType,
      ayahs,
    };
  } catch (error) {
    console.error(`Error fetching surah ${surahNumber}`, error);
    return null;
  }
}

// ─── SSG helper ───────────────────────────────────────────────────────────────

export async function getAllSurahNumbers(): Promise<number[]> {
  const surahs = await getSurahs();
  return surahs.map((s) => s.number);
}
