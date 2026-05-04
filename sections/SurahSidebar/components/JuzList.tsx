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
    // Auto-open the Juz that contains the active surah
    if (!activeSurahNumber) return null;
    const juz = JUZ_LIST.find(
      (j) => activeSurahNumber >= j.startSurah && activeSurahNumber <= j.endSurah
    );
    return juz?.number ?? null;
  });

  return (
    <ul className="flex-1 overflow-auto">
      {JUZ_LIST.map((juz) => {
        const isExpanded = openJuz === juz.number;
        const surahsInJuz = getSurahsInJuz(juz, surahs);
        const containsActive = activeSurahNumber !== undefined &&
          activeSurahNumber >= juz.startSurah &&
          activeSurahNumber <= juz.endSurah;

        return (
          <li key={juz.number}>
            {/* ── Juz header row (accordion toggle) ── */}
            <button
              onClick={() => setOpenJuz(isExpanded ? null : juz.number)}
              className={`flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-neutral-800 ${
                containsActive && !isExpanded ? "bg-neutral-800/50" : ""
              }`}
            >
              {/* Number badge */}
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-semibold ${
                containsActive ? "bg-emerald-600 text-white" : "bg-neutral-800 text-neutral-400"
              }`}>
                {juz.number}
              </div>

              {/* Label */}
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium ${containsActive ? "text-white" : "text-neutral-200"}`}>
                  Juz {juz.number}
                </p>
                <p className="text-xs text-neutral-500">
                  {surahsInJuz.length} {surahsInJuz.length === 1 ? "surah" : "surahs"}
                </p>
              </div>

              {/* Arabic opening word */}
              <span
                className="shrink-0 text-sm text-neutral-400 mr-1"
                style={{ fontFamily: "'Amiri', serif", direction: "rtl" }}
                lang="ar"
              >
                {juz.arabicName}
              </span>

              {/* Chevron */}
              <svg
                className={`h-3.5 w-3.5 shrink-0 text-neutral-500 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* ── Expanded surah list ── */}
            {isExpanded && (
              <ul className="border-b border-neutral-800/50">
                {surahsInJuz.map((entry) => {
                  const isActive = entry.surahNumber === activeSurahNumber;
                  // Link to surah page, anchored to the ayah where this Juz begins
                  const href = `/${entry.surahNumber}#ayah-${entry.startAyah}`;

                  return (
                    <li key={entry.surahNumber}>
                      <Link
                        href={href}
                        onClick={onSelect}
                        className={`flex items-center gap-3 py-2.5 pl-7 pr-3 transition-colors hover:bg-neutral-800 ${
                          isActive ? "bg-neutral-800" : ""
                        }`}
                      >
                        {/* Surah number badge */}
                        <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-semibold ${
                          isActive ? "bg-emerald-600 text-white" : "bg-neutral-800 text-neutral-400"
                        }`}>
                          {entry.surahNumber}
                        </div>

                        {/* Names */}
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium truncate ${isActive ? "text-white" : "text-neutral-200"}`}>
                            {entry.englishName}
                          </p>
                          <p className="text-xs text-neutral-500 truncate">
                            {entry.englishNameTranslation}
                            {entry.startAyah > 1 && (
                              <span className="ml-1 text-emerald-600">· from ayah {entry.startAyah}</span>
                            )}
                          </p>
                        </div>

                        {/* Arabic name */}
                        <span
                          className="shrink-0 text-sm text-neutral-400"
                          style={{ fontFamily: "'Amiri', serif" }}
                          lang="ar"
                        >
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
