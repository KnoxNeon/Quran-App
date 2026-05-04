import type { Surah, SurahDetail, Ayah } from "@/types/quran";

const BASE_URL = "https://api.alquran.cloud/v1";

// ─── Fetch with retry ─────────────────────────────────────────────────────────

async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        next: { revalidate: 86400 }, // cache for 24h on Vercel
      });
      if (res.ok) return res;
      console.warn(`Attempt ${i + 1} failed for ${url}: ${res.status}`);
    } catch (err) {
      console.warn(`Attempt ${i + 1} error for ${url}:`, err);
    }
    // Wait before retry (exponential backoff)
    if (i < retries - 1) await new Promise((r) => setTimeout(r, 500 * (i + 1)));
  }
  throw new Error(`Failed to fetch ${url} after ${retries} attempts`);
}

// ─── Surah List ───────────────────────────────────────────────────────────────

export async function getSurahs(): Promise<Surah[]> {
  try {
    const res = await fetchWithRetry(`${BASE_URL}/surah`);
    const json = await res.json();
    return json.data as Surah[];
  } catch (error) {
    console.error("Failed to fetch surah list:", error);
    return [];
  }
}

// ─── Single Surah with Arabic + English translation ───────────────────────────

export async function getSurah(surahNumber: number): Promise<SurahDetail | null> {
  try {
    const [arabicRes, translationRes] = await Promise.all([
      fetchWithRetry(`${BASE_URL}/surah/${surahNumber}`),
      fetchWithRetry(`${BASE_URL}/surah/${surahNumber}/en.sahih`),
    ]);

    const [arabicJson, translationJson] = await Promise.all([
      arabicRes.json(),
      translationRes.json(),
    ]);

    const arabicData = arabicJson.data;
    const translationData = translationJson.data;

    if (!arabicData?.ayahs) {
      console.error(`Invalid data for surah ${surahNumber}`);
      return null;
    }

    const ayahs: Ayah[] = arabicData.ayahs.map(
      (ayah: { number: number; numberInSurah: number; text: string }, i: number) => ({
        number: ayah.number,
        numberInSurah: ayah.numberInSurah,
        text: ayah.text,
        translation: translationData.ayahs?.[i]?.text ?? "",
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
    console.error(`Error fetching surah ${surahNumber}:`, error);
    return null;
  }
}

// ─── SSG helper ───────────────────────────────────────────────────────────────

export async function getAllSurahNumbers(): Promise<number[]> {
  const surahs = await getSurahs();
  if (surahs.length === 0) {
    // Fallback: return all 114 surah numbers statically
    return Array.from({ length: 114 }, (_, i) => i + 1);
  }
  return surahs.map((s) => s.number);
}
