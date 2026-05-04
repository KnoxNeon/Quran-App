"use client";

import Link from "next/link";
import { useState } from "react";
import type { Surah } from "@/types/quran";
import { SurahSearch } from "./SurahSearch";

interface SurahListProps {
  surahs: Surah[];
  activeSurahNumber?: number;
  onSelect?: () => void;
}

export function SurahList({ surahs, activeSurahNumber, onSelect }: SurahListProps) {
  const [query, setQuery] = useState("");

  const filtered = surahs.filter(
    (s) => s.englishName.toLowerCase().includes(query.toLowerCase()) || s.number.toString().includes(query)
  );

  return (
    <>
      <SurahSearch value={query} onChange={setQuery} />
      <ul className="flex-1 overflow-auto">
        {filtered.map((surah) => {
          const isActive = surah.number === activeSurahNumber;
          return (
            <li key={surah.number}>
              <Link
                href={`/${surah.number}`}
                onClick={onSelect}
                className={`flex items-center gap-3 px-3 py-2.5 transition-colors hover:bg-theme-elevated ${isActive ? "bg-theme-elevated" : ""}`}
              >
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-semibold ${isActive ? "bg-emerald-600 text-white" : "bg-theme-elevated text-theme-secondary"}`}>
                  {surah.number}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate text-theme-primary">{surah.englishName}</p>
                  <p className="text-xs text-theme-muted truncate">{surah.englishNameTranslation}</p>
                </div>
                <span className="shrink-0 text-sm text-theme-secondary" style={{ fontFamily: "'Amiri', serif" }} lang="ar">
                  {surah.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
