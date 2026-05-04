import type { Ayah } from "@/types/quran";

interface AyahCardProps {
  ayah: Ayah;
  surahNumber: number;
}

export function AyahCard({ ayah, surahNumber }: AyahCardProps) {
  return (
    <div className="border-b border-neutral-800 py-6">
      <div className="flex gap-4">
        {/* Ayah number */}
        <div className="flex shrink-0 flex-col items-center gap-3 pt-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-700 text-xs font-semibold text-emerald-400">
            {surahNumber}:{ayah.numberInSurah}
          </div>

          {/* Action icons */}
          <button aria-label="Play" className="text-neutral-500 hover:text-neutral-200 transition-colors">
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z" />
            </svg>
          </button>
          <button aria-label="Repeat" className="text-neutral-500 hover:text-neutral-200 transition-colors">
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </button>
          <button aria-label="Bookmark" className="text-neutral-500 hover:text-neutral-200 transition-colors">
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>
          </button>
          <button aria-label="More" className="text-neutral-500 hover:text-neutral-200 transition-colors">
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Arabic text */}
          <p
            className="mb-4 text-right font-arabic leading-loose text-white"
            style={{ fontSize: "1.6rem", direction: "rtl" }}
            lang="ar"
          >
            {ayah.text}
          </p>

          {/* Translator label */}
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-neutral-500">
            Saheeh International
          </p>

          {/* Translation */}
          <p className="text-sm leading-relaxed text-neutral-300">
            {ayah.translation}
          </p>
        </div>
      </div>
    </div>
  );
}
