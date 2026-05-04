/**
 * MainContent — primary reading area.
 * No data yet; shows structural skeleton only.
 */
export default function MainContent() {
  return (
    <main className="flex-1 bg-gray-950 overflow-y-auto flex flex-col min-w-0">
      {/* Top bar */}
      <header className="sticky top-0 z-10 bg-gray-950 border-b border-gray-800 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Surah title placeholder */}
          <div className="h-5 bg-gray-800 rounded w-36" />
          <div className="h-4 bg-gray-800 rounded w-20" />
        </div>

        {/* Controls placeholder */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gray-800" />
          <div className="w-8 h-8 rounded-lg bg-gray-800" />
          <div className="w-8 h-8 rounded-lg bg-gray-800" />
        </div>
      </header>

      {/* Bismillah placeholder */}
      <div className="flex justify-center pt-10 pb-6 px-8">
        <div className="h-8 bg-gray-800 rounded-lg w-64" />
      </div>

      {/* Ayah skeleton rows */}
      <div className="flex-1 px-8 pb-16 space-y-6 max-w-3xl mx-auto w-full">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="border border-gray-800 rounded-xl p-5 space-y-4">
            {/* Ayah number + actions */}
            <div className="flex items-center justify-between">
              <div className="w-8 h-8 rounded-full bg-gray-800" />
              <div className="flex gap-2">
                <div className="w-7 h-7 rounded-lg bg-gray-800" />
                <div className="w-7 h-7 rounded-lg bg-gray-800" />
              </div>
            </div>

            {/* Arabic text placeholder */}
            <div className="space-y-2 text-right">
              <div className="h-6 bg-gray-800 rounded w-full" />
              <div className="h-6 bg-gray-800 rounded w-4/5 ml-auto" />
            </div>

            {/* Transliteration placeholder */}
            <div className="space-y-1.5">
              <div className="h-3 bg-gray-800 rounded w-full" />
              <div className="h-3 bg-gray-800 rounded w-3/4" />
            </div>

            {/* Translation placeholder */}
            <div className="space-y-1.5 pt-1 border-t border-gray-800">
              <div className="h-3 bg-gray-800 rounded w-full" />
              <div className="h-3 bg-gray-800 rounded w-5/6" />
              <div className="h-3 bg-gray-800 rounded w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
