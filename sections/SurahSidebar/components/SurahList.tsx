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
    (s) =>
      s.englishName.toLowerCase().includes(query.toLowerCase()) ||
      s.number.toString().includes(query)
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
                className={`flex items-center gap-3 px-3 py-2.5 transition-colors hover:bg-neutral-800 ${
                  isActive ? "bg-neutral-800" : ""
                }`}
              >
                {/* Number badge */}
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-semibold ${
                    isActive
                      ? "bg-emerald-600 text-white"
                      : "bg-neutral-800 text-neutral-400"
                  }`}
                >
                  {surah.number}
                </div>

                {/* English name */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${isActive ? "text-white" : "text-neutral-200"}`}>
                    {surah.englishName}
                  </p>
                  <p className="text-xs text-neutral-500 truncate">
                    {surah.englishNameTranslation}
                  </p>
                </div>

                {/* Arabic name */}
                <span className="shrink-0 text-sm text-neutral-400 font-arabic">
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
