import { SurahTabs } from "@/sections/SurahSidebar/components/SurahTabs";
import { SurahList } from "@/sections/SurahSidebar/components/SurahList";
import type { Surah } from "@/types/quran";

interface SurahSidebarProps {
  surahs: Surah[];
  activeSurahNumber?: number;
}

export function SurahSidebar({ surahs, activeSurahNumber }: SurahSidebarProps) {
  return (
    <div className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-[160px] shrink-0 border-r border-neutral-800 bg-neutral-950 md:flex flex-col overflow-hidden">
      {/* Tabs */}
      <SurahTabs />

      {/* Surah List with integrated search */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <SurahList surahs={surahs} activeSurahNumber={activeSurahNumber} />
      </div>
    </div>
  );
}
