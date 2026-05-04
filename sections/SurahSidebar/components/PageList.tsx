"use client";

import Link from "next/link";
import { useState } from "react";
import { PAGE_LIST } from "@/lib/quranDivisions";
import { SurahSearch } from "./SurahSearch";

interface PageListProps {
  activeSurahNumber?: number;
  onSelect?: () => void;
}

export function PageList({ activeSurahNumber, onSelect }: PageListProps) {
  const [query, setQuery] = useState("");

  const filtered = PAGE_LIST.filter((p) =>
    query === "" || p.page.toString().includes(query) || p.startSurah.toString().includes(query)
  );

  return (
    <>
      <SurahSearch value={query} onChange={setQuery} placeholder="Search page…" />
      <ul className="flex-1 overflow-auto">
        {filtered.map((p) => {
          const isActive = activeSurahNumber === p.startSurah;
          return (
            <li key={p.page}>
              <Link
                href={`/${p.startSurah}`}
                onClick={onSelect}
                className={`flex items-center gap-3 px-3 py-2.5 transition-colors hover:bg-theme-elevated ${isActive ? "bg-theme-elevated" : ""}`}
              >
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-semibold ${isActive ? "bg-emerald-600 text-white" : "bg-theme-elevated text-theme-secondary"}`}>
                  {p.page}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-theme-primary">Page {p.page}</p>
                  <p className="text-xs text-theme-muted">Surah {p.startSurah} · Ayah {p.startAyah}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
