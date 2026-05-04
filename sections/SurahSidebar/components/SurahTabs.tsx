"use client";

export type SidebarTab = "Surah" | "Juz" | "Page";
const TABS: SidebarTab[] = ["Surah", "Juz", "Page"];

interface SurahTabsProps {
  active: SidebarTab;
  onChange: (tab: SidebarTab) => void;
}

export function SurahTabs({ active, onChange }: SurahTabsProps) {
  return (
    <div className="flex border-b border-neutral-800 px-3 pt-3">
      {TABS.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`flex-1 pb-2.5 text-sm font-medium transition-colors ${
            active === tab
              ? "border-b-2 border-emerald-500 text-emerald-400"
              : "text-neutral-400 hover:text-neutral-200"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
