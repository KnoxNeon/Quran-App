import { SurahSidebar } from "@/sections/SurahSidebar";
import { SurahContent } from "@/sections/SurahContent";
import { SettingsSidebar } from "@/sections/SettingsSidebar";
import type { Surah, SurahDetail } from "@/types/quran";

interface MainContentProps {
  surahs: Surah[];
  surah: SurahDetail;
}

export function MainContent({ surahs, surah }: MainContentProps) {
  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Left Sidebar - Surah Navigation */}
      <SurahSidebar surahs={surahs} activeSurahNumber={surah.number} />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <SurahContent surah={surah} />
      </main>

      {/* Right Sidebar - Settings */}
      <SettingsSidebar />
    </div>
  );
}
