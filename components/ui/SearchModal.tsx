"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { searchAyahs } from "@/services/searchService";
import type { SearchResultAyah } from "@/types/quran";

function highlight(text: string, query: string) {
  if (!query.trim() || !text) return <>{text}</>;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-emerald-500/30 text-emerald-400 rounded px-0.5 not-italic">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

interface SearchModalProps {
  onClose: () => void;
}

export function SearchModal({ onClose }: SearchModalProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultAyah[]>([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Search is now synchronous — no loading state needed
  const runSearch = useCallback((q: string) => {
    if (!q.trim()) { setResults([]); setSearched(false); return; }
    const data = searchAyahs(q);
    setResults(data);
    setSearched(true);
  }, []);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setQuery(val);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => runSearch(val), 300);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    runSearch(query);
  }

  function handleNavigate(surahNumber: number) {
    router.push(`/${surahNumber}`);
    onClose();
  }

  const isArabic = /[\u0600-\u06FF]/.test(query);

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />

      {/* Modal */}
      <div className="fixed inset-x-4 top-[5vh] z-[70] mx-auto max-w-2xl rounded-2xl border border-theme bg-theme-surface shadow-2xl md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full">

        {/* Input */}
        <form onSubmit={handleSubmit} className="flex items-center gap-3 border-b border-theme px-4 py-3">
          <svg className="h-5 w-5 shrink-0 text-theme-muted" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z" />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Search in Arabic or English…"
            className="flex-1 bg-transparent text-sm text-theme-primary placeholder:text-theme-muted outline-none"
            dir={isArabic ? "rtl" : "ltr"}
          />
          {query && (
            <button type="button" onClick={() => { setQuery(""); setResults([]); setSearched(false); inputRef.current?.focus(); }}
              className="text-theme-muted hover:text-theme-primary transition-colors" aria-label="Clear">
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <kbd className="hidden rounded border border-theme px-1.5 py-0.5 text-[10px] text-theme-muted md:block">ESC</kbd>
        </form>

        {/* Results */}
        <div className="max-h-[70vh] overflow-y-auto">

          {searched && (
            <div className="border-b border-theme px-5 py-3">
              <p className="text-sm font-semibold text-theme-primary">
                Search Results{" "}
                <span className="text-theme-secondary font-normal">
                  — {results.length} {results.length === 1 ? "ayah" : "ayahs"} found
                  {results.length === 100 && " (showing first 100)"}
                </span>
              </p>
            </div>
          )}

          {searched && results.length === 0 && (
            <div className="py-12 text-center text-sm text-theme-muted">
              No ayahs found for &ldquo;{query}&rdquo;
            </div>
          )}

          {results.map((ayah) => (
            <button key={ayah.number} onClick={() => handleNavigate(ayah.surahNumber)}
              className="w-full border-b border-theme px-5 py-4 text-left hover:bg-theme-elevated transition-colors last:border-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-md bg-emerald-600/20 px-2 py-0.5 text-xs font-semibold text-emerald-500">
                      {ayah.surahNumber}:{ayah.numberInSurah}
                    </span>
                    <span className="text-xs text-theme-muted">{ayah.surahEnglishName}</span>
                  </div>
                  {ayah.translation && (
                    <>
                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-widest text-theme-muted">Saheeh International</p>
                      <p className="text-sm leading-relaxed text-theme-secondary">{highlight(ayah.translation, query)}</p>
                    </>
                  )}
                  {ayah.text && !ayah.translation && (
                    <p className="text-right text-lg leading-loose text-theme-primary" style={{ fontFamily: "'Amiri', serif", direction: "rtl" }} lang="ar">
                      {highlight(ayah.text, query)}
                    </p>
                  )}
                </div>
                {ayah.text && ayah.translation && (
                  <p className="shrink-0 text-right text-lg leading-loose text-theme-primary" style={{ fontFamily: "'Amiri', serif", direction: "rtl", maxWidth: "40%" }} lang="ar">
                    {ayah.text}
                  </p>
                )}
                <svg className="mt-1 h-4 w-4 shrink-0 text-theme-muted" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </div>
            </button>
          ))}

          {!searched && (
            <div className="py-10 text-center text-sm text-theme-muted">
              Type to search across all 6,236 ayahs
            </div>
          )}
        </div>
      </div>
    </>
  );
}
