"use client";

import Link from "next/link";
import { useState } from "react";
import { PAGE_LIST } from "@/lib/quranDivisions";

interface PageListProps {
  activeSurahNumber?: number;
  onSelect?: () => void;
}

export function PageList({ activeSurahNumber, onSelect }: PageListProps) {
  const [query, setQuery] = useState("");

  const filtered = PAGE_LIST.filter((p) =>
    query === "" ||
    p.page.toString().includes(query) ||
    p.startSurah.toString().includes(query)
  );

  return (
    <>
      {/* Search */}
      <div className="px-3 py-2.5">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z" />
          </svg>
          <input
            type="search"
            placeholder="Search page…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg bg-neutral-800 py-2 pl-8 pr-3 text-sm text-neutral-200 placeholder-neutral-500 outline-none focus:ring-1 focus:ring-emerald-600 transition"
          />
        </div>
      </div>

      <ul className="flex-1 overflow-auto">
        {filtered.map((p) => {
          const isActive = activeSurahNumber === p.startSurah;
          return (
            <li key={p.page}>
              <Link
                href={`/${p.startSurah}`}
                onClick={onSelect}
                className={`flex items-center gap-3 px-3 py-2.5 transition-colors hover:bg-neutral-800 ${
                  isActive ? "bg-neutral-800" : ""
                }`}
              >
                {/* Page number badge */}
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-semibold ${
                  isActive ? "bg-emerald-600 text-white" : "bg-neutral-800 text-neutral-400"
                }`}>
                  {p.page}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${isActive ? "text-white" : "text-neutral-200"}`}>
                    Page {p.page}
                  </p>
                  <p className="text-xs text-neutral-500">
                    Surah {p.startSurah} · Ayah {p.startAyah}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
