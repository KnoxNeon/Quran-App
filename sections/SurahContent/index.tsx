import type { SurahDetail } from "@/types/quran";
import { AyahCard } from "./components/AyahCard";
import { SurahHeader } from "./components/SurahHeader";
import { SurahNav } from "./components/SurahNav";

interface SurahContentProps {
  surah: SurahDetail;
}

export function SurahContent({ surah }: SurahContentProps) {
  // Build the ordered list of global ayah numbers for this surah once.
  // ayah.number is the global 1-6236 number from the API.
  const globalAyahNumbers = surah.ayahs.map((a) => a.number);

  return (
    <div className="flex flex-1 flex-col min-h-screen">
      <SurahHeader surah={surah} />

      <div className="flex-1 px-4 md:px-8 pb-24">
        {surah.ayahs.map((ayah) => (
          <AyahCard
            key={ayah.numberInSurah}
            ayah={ayah}
            surahNumber={surah.number}
            surahName={surah.englishName}
            globalAyahNumbers={globalAyahNumbers}
          />
        ))}
      </div>

      <SurahNav current={surah.number} total={114} />
    </div>
  );
}
