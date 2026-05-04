import { SideNavbar } from "@/sections/SideNavbar";
import { TopNavbar } from "@/sections/TopNavbar";
import { MainContent } from "@/sections/MainContent";
import { ClientProviders } from "@/components/layout/ClientProviders";
import type { Surah, SurahDetail } from "@/types/quran";

interface AppLayoutProps {
  surahs: Surah[];
  surah: SurahDetail;
}

export default function AppLayout({ surahs, surah }: AppLayoutProps) {
  return (
    <ClientProviders>
      <div className="flex h-screen w-full overflow-hidden bg-theme-base">
        {/* Left rail — desktop only (rendered inside SideNavbar) */}
        <SideNavbar />

        {/* Main column */}
        <div className="flex flex-1 flex-col overflow-hidden md:ml-[60px]">
          <TopNavbar />

          {/* Content area:
              - pt-14 to clear fixed TopNavbar
              - pb-14 on mobile to clear fixed bottom nav
              - pb-0 on md+ (no bottom nav) */}
          <div className="flex flex-1 overflow-hidden pt-14 pb-14 md:pb-0">
            <MainContent surahs={surahs} surah={surah} />
          </div>
        </div>
      </div>
    </ClientProviders>
  );
}
