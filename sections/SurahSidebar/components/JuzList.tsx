"use client";

import Link from "next/link";
import { useState } from "react";
import { JUZ_LIST, getSurahsInJuz } from "@/lib/quranDivisions";
import type { Surah } from "@/types/quran";

interface JuzListProps {
  surahs: Surah[];
  activeSurahNumber?: number;
  onSelect?: () => void;
}

export function JuzList({ surahs, activeSurahNumber, onSelect }: JuzListProps) {
  const [openJuz, setOpenJuz] = useState<number | null>(() => {
    if (!activeSurahNumber) return null;
    const juz = JUZ_LIST.find((j) => activeSurahNumber >= j.startSurah && activeSurahNumber <= j.endSurah);
    return juz?.number ?? null;
  });

  return (
    <ul className="flex-1 overflow-auto">
      {JUZ_LIST.map((juz) => {
        const isExpanded = openJuz === juz.number;
        const surahsInJuz = getSurahsInJuz(juz, surahs);
        const containsActive = activeSurahNumber !== undefined &&
          activeSurahNumber >= juz.startSurah && activeSurahNumber <= juz.endSurah;

        return (
          <li key={juz.number}>
            <button
              onClick={() => setOpenJuz(isExpanded ? null : juz.number)}
              className={`flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-theme-elevated ${containsActive && !isExpanded ? "bg-theme-elevated" : ""}`}
            >
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-semibold ${containsActive ? "bg-emerald-600 text-white" : "bg-theme-elevated text-theme-secondary"}`}>
                {juz.number}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-theme-primary">Juz {juz.number}</p>
                <p className="text-xs text-theme-muted">{surahsInJuz.length} {surahsInJuz.length === 1 ? "surah" : "surahs"}</p>
              </div>
              <span className="shrink-0 text-sm text-theme-secondary mr-1" style={{ fontFamily: "'Amiri', serif", direction: "rtl" }} lang="ar">
                {juz.arabicName}
              </span>
              <svg className={`h-3.5 w-3.5 shrink-0 text-theme-muted transition-transform ${isExpanded ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isExpanded && (
              <ul className="border-b border-theme">
                {surahsInJuz.map((entry) => {
                  const isActive = entry.surahNumber === activeSurahNumber;
                  return (
                    <li key={entry.surahNumber}>
                      <Link
                        href={`/${entry.surahNumber}#ayah-${entry.startAyah}`}
                        onClick={onSelect}
                        className={`flex items-center gap-3 py-2.5 pl-7 pr-3 transition-colors hover:bg-theme-elevated ${isActive ? "bg-theme-elevated" : ""}`}
                      >
                        <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-semibold ${isActive ? "bg-emerald-600 text-white" : "bg-theme-elevated text-theme-secondary"}`}>
                          {entry.surahNumber}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate text-theme-primary">{entry.englishName}</p>
                          <p className="text-xs text-theme-muted truncate">
                            {entry.englishNameTranslation}
                            {entry.startAyah > 1 && <span className="ml-1 text-emerald-500">· from ayah {entry.startAyah}</span>}
                          </p>
                        </div>
                        <span className="shrink-0 text-sm text-theme-secondary" style={{ fontFamily: "'Amiri', serif" }} lang="ar">
                          {entry.arabicName}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        );
      })}
    </ul>
  );
}
