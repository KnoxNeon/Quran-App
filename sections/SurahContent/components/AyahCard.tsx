"use client";

import type { Ayah } from "@/types/quran";
import { useAudioPlayerContext } from "@/lib/AudioPlayerContext";
import { useFontSettings, ARABIC_FONT_FAMILY } from "@/lib/FontSettingsContext";

interface AyahCardProps {
  ayah: Ayah;
  surahNumber: number;
  surahName: string;
  globalAyahNumbers: number[];
}

export function AyahCard({ ayah, surahNumber, surahName, globalAyahNumbers }: AyahCardProps) {
  const { playAyah, pause, isPlaying, currentAyah, surahNumber: activeSurah } = useAudioPlayerContext();
  const { arabicFont, arabicSize, translationSize } = useFontSettings();

  const isThisAyahPlaying = isPlaying && activeSurah === surahNumber && currentAyah === ayah.numberInSurah;

  function handlePlay() {
    if (isThisAyahPlaying) pause();
    else playAyah({ surahNumber, surahName, globalAyahNumbers, ayahNumberInSurah: ayah.numberInSurah });
  }

  return (
    <div
      id={`ayah-${ayah.numberInSurah}`}
      className={`border-b border-theme py-6 transition-colors ${isThisAyahPlaying ? "bg-theme-elevated" : ""}`}
    >
      <div className="flex gap-4">
        {/* Ayah number + actions */}
        <div className="flex shrink-0 flex-col items-center gap-3 pt-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-theme text-xs font-semibold text-emerald-500">
            {surahNumber}:{ayah.numberInSurah}
          </div>

          <button onClick={handlePlay} aria-label={isThisAyahPlaying ? "Pause" : "Play ayah"}
            className={`transition-colors ${isThisAyahPlaying ? "text-emerald-500" : "text-theme-muted hover:text-theme-primary"}`}>
            {isThisAyahPlaying ? (
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7 0a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z" />
              </svg>
            )}
          </button>

          <button aria-label="Repeat" className="text-theme-muted hover:text-theme-primary transition-colors">
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </button>

          <button aria-label="Bookmark" className="text-theme-muted hover:text-theme-primary transition-colors">
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>
          </button>

          <button aria-label="More" className="text-theme-muted hover:text-theme-primary transition-colors">
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="mb-4 text-right leading-loose text-theme-primary"
            style={{ fontFamily: ARABIC_FONT_FAMILY[arabicFont], fontSize: `${arabicSize}px`, direction: "rtl" }}
            lang="ar">
            {ayah.text}
          </p>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-theme-muted">
            Saheeh International
          </p>
          <p className="leading-relaxed text-theme-secondary" style={{ fontSize: `${translationSize}px` }}>
            {ayah.translation}
          </p>
        </div>
      </div>
    </div>
  );
}
