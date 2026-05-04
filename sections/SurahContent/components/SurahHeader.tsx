import type { SurahDetail } from "@/types/quran";

interface SurahHeaderProps {
  surah: SurahDetail;
}

export function SurahHeader({ surah }: SurahHeaderProps) {
  return (
    <div className="flex flex-col items-center py-8 px-4">
      <h1 className="text-3xl font-bold text-white">
        Surah {surah.englishName}
      </h1>
      <p className="mt-2 text-sm text-neutral-400">
        Ayah-{surah.numberOfAyahs},{" "}
        {surah.revelationType === "Meccan" ? "Makkah" : "Madinah"}
      </p>
    </div>
  );
}
