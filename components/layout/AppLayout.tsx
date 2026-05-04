import { SideNavbar } from "@/sections/SideNavbar";
import { TopNavbar } from "@/sections/TopNavbar";
import { MainContent } from "@/sections/MainContent";
import { AudioPlayerProvider } from "@/lib/AudioPlayerContext";
import { PlayBar } from "@/components/ui/PlayBar";
import type { Surah, SurahDetail } from "@/types/quran";

interface AppLayoutProps {
  surahs: Surah[];
  surah: SurahDetail;
}

export default function AppLayout({ surahs, surah }: AppLayoutProps) {
  return (
    <AudioPlayerProvider>
      <div className="flex h-screen w-full overflow-hidden bg-neutral-950">
        {/* Fixed left icon sidebar */}
        <SideNavbar />

        {/* Main area offset for sidebar */}
        <div className="flex flex-1 flex-col md:ml-[60px] overflow-hidden">
          <TopNavbar />
          {/* Offset for fixed top navbar */}
          <div className="flex flex-1 overflow-hidden pt-14">
            <MainContent surahs={surahs} surah={surah} />
          </div>
        </div>

        {/* Fixed playbar — only visible when audio is active */}
        <PlayBar />
      </div>
    </AudioPlayerProvider>
  );
}
