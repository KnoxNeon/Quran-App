"use client";

import { useEffect } from "react";
import { SurahTabs } from "@/sections/SurahSidebar/components/SurahTabs";
import { SurahList } from "@/sections/SurahSidebar/components/SurahList";
import { useSurahDrawer } from "@/lib/SurahDrawerContext";
import type { Surah } from "@/types/quran";

interface SurahSidebarProps {
  surahs: Surah[];
  activeSurahNumber?: number;
}

export function SurahSidebar({ surahs, activeSurahNumber }: SurahSidebarProps) {
  const { isOpen, close } = useSurahDrawer();

  // Lock body scroll when drawer is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const inner = (
    <div className="flex h-full flex-col overflow-hidden">
      <SurahTabs />
      <div className="flex flex-1 flex-col overflow-hidden">
        <SurahList
          surahs={surahs}
          activeSurahNumber={activeSurahNumber}
          onSelect={close}
        />
      </div>
    </div>
  );

  return (
    <>
      {/* ── Desktop sidebar (md+) ───────────────────────────────────── */}
      <div className="sticky top-0 hidden h-[calc(100vh-3.5rem)] w-[260px] shrink-0 border-r border-neutral-800 bg-neutral-950 md:flex flex-col overflow-hidden">
        {inner}
      </div>

      {/* ── Mobile drawer ───────────────────────────────────────────── */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[45] bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={close}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        className={`fixed left-0 top-0 z-[46] h-full w-[300px] bg-neutral-950 border-r border-neutral-800 flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Surah list"
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-neutral-800 px-4 py-3">
          <span className="text-sm font-semibold text-white">Surahs</span>
          <button
            onClick={close}
            aria-label="Close surah list"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
          >
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {inner}
      </div>
    </>
  );
}
