"use client";

import { BrandSection } from "@/sections/TopNavbar/components/BrandSection";
import { TopNavBarActions } from "@/sections/TopNavbar/components/TopNavBarActions";
import { useSurahDrawer } from "@/lib/SurahDrawerContext";

export function TopNavbar() {
  const { toggle } = useSurahDrawer();

  return (
    <nav className="fixed left-0 right-0 top-0 z-40 h-14 border-b border-neutral-800 bg-neutral-950 md:left-[60px]">
      <div className="flex h-full items-center gap-3 px-4 md:px-6">

        {/* Hamburger — mobile only */}
        <button
          type="button"
          onClick={toggle}
          aria-label="Open surah list"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors md:hidden"
        >
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>

        <BrandSection />

        <div className="flex-1" />

        <TopNavBarActions />
      </div>
    </nav>
  );
}
