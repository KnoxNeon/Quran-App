import type { SurahDetail } from "@/types/quran";
import { AyahCard } from "./components/AyahCard";
import { SurahHeader } from "./components/SurahHeader";
import { SurahNav } from "./components/SurahNav";

interface SurahContentProps {
  surah: SurahDetail;
}

export function SurahContent({ surah }: SurahContentProps) {
  return (
    <div className="flex flex-1 flex-col min-h-screen">
      {/* Surah Header */}
      <SurahHeader surah={surah} />

      {/* Ayah list */}
      <div className="flex-1 px-4 md:px-8 pb-8">
        {surah.ayahs.map((ayah) => (
          <AyahCard key={ayah.numberInSurah} ayah={ayah} surahNumber={surah.number} />
        ))}
      </div>

      {/* Prev / Next navigation */}
      <SurahNav current={surah.number} total={114} />
    </div>
  );
}
