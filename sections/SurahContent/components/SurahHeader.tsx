import type { SurahDetail } from "@/types/quran";

interface SurahHeaderProps {
  surah: SurahDetail;
}

export function SurahHeader({ surah }: SurahHeaderProps) {
  return (
    <div className="flex flex-col items-center py-8 px-4">
      {/* Mosque illustration placeholder */}
      <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-800 text-3xl">
        🕌
      </div>

      <h1 className="text-2xl font-bold text-white">
        Surah {surah.englishName}
      </h1>
      <p className="mt-1 text-sm text-neutral-400">
        Ayah-{surah.numberOfAyahs},{" "}
        {surah.revelationType === "Meccan" ? "Makkah" : "Madinah"}
      </p>
    </div>
  );
}
