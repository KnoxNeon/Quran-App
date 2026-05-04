"use client";

import { useAudioPlayerContext } from "@/lib/AudioPlayerContext";

function formatTime(seconds: number): string {
  if (!seconds || isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function PlayBar() {
  const {
    surahName,
    surahNumber,
    currentAyah,
    totalAyahs,
    isPlaying,
    isActive,
    currentTime,
    duration,
    pause,
    resume,
    nextAyah,
    prevAyah,
    seek,
    close,
  } = useAudioPlayerContext();

  if (!isActive) return null;

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-theme bg-theme-nav md:left-[60px]">
      {/* Progress bar */}
      <div className="relative h-1 w-full bg-theme-elevated">
        <div
          className="absolute left-0 top-0 h-full bg-emerald-500"
          style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
        />
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={currentTime}
          onChange={(e) => seek(Number(e.target.value))}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          aria-label="Seek"
        />
      </div>

      {/* Controls row */}
      <div className="flex items-center justify-between px-4 py-3 md:px-6">

        {/* Left — Surah info */}
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-sm font-semibold text-theme-primary">
            Surah {surahName}
          </span>
          <span className="text-xs text-theme-secondary">
            Ayah {currentAyah} of {totalAyahs} · #{surahNumber}
          </span>
        </div>

        {/* Center — Playback controls */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Previous ayah */}
          <button
            type="button"
            onClick={prevAyah}
            disabled={currentAyah <= 1}
            aria-label="Previous ayah"
            className="flex h-9 w-9 items-center justify-center rounded-full text-theme-secondary hover:bg-theme-elevated hover:text-theme-primary disabled:cursor-not-allowed disabled:opacity-30"
          >
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-3.99a1.125 1.125 0 010-1.953l7.108-3.99A1.125 1.125 0 0121 8.689v8.122zM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-3.99a1.125 1.125 0 010-1.953l7.108-3.99a1.125 1.125 0 011.683.977v8.122z" />
            </svg>
          </button>

          {/* Play / Pause */}
          <button
            type="button"
            onClick={isPlaying ? pause : resume}
            aria-label={isPlaying ? "Pause" : "Play"}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-600 text-white shadow-lg hover:bg-emerald-500 active:scale-95"
          >
            {isPlaying ? (
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7 0a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75V5.25z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="h-5 w-5 translate-x-0.5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          {/* Next ayah */}
          <button
            type="button"
            onClick={nextAyah}
            disabled={currentAyah >= totalAyahs}
            aria-label="Next ayah"
            className="flex h-9 w-9 items-center justify-center rounded-full text-theme-secondary hover:bg-theme-elevated hover:text-theme-primary disabled:cursor-not-allowed disabled:opacity-30"
          >
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 3.99a1.125 1.125 0 010 1.953L4.683 17.643C3.933 18.072 3 17.53 3 16.666V8.69zM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 3.99a1.125 1.125 0 010 1.953l-7.108 3.99c-.75.43-1.683-.112-1.683-.977V8.69z" />
            </svg>
          </button>
        </div>

        {/* Right — Time + close */}
        <div className="flex flex-1 items-center justify-end gap-3">
          <span className="text-xs tabular-nums text-theme-secondary">
            {formatTime(currentTime)}
            <span className="mx-1 text-theme-muted">/</span>
            {formatTime(duration)}
          </span>

          <button
            type="button"
            onClick={close}
            aria-label="Close player"
            className="flex h-8 w-8 items-center justify-center rounded-full text-theme-muted hover:bg-theme-elevated hover:text-theme-primary"
          >
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
