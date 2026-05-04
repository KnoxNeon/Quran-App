import type { SurahDetail } from "@/types/quran";

export function SurahHeader({ surah }: { surah: SurahDetail }) {
  return (
    <div className="flex flex-col items-center py-8 px-4">
      <h1 className="text-3xl font-bold text-theme-primary">
        Surah {surah.englishName}
      </h1>
      <p className="mt-2 text-sm text-theme-secondary">
        Ayah-{surah.numberOfAyahs},{" "}
        {surah.revelationType === "Meccan" ? "Makkah" : "Madinah"}
      </p>
    </div>
  );
}
