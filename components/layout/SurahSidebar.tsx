/**
 * SurahSidebar — scrollable list panel for Surah navigation.
 * No data yet; shows structural skeleton only.
 */
export default function SurahSidebar() {
  return (
    <aside className="w-72 bg-gray-900 border-r border-gray-800 flex flex-col shrink-0">
      {/* Header */}
      <div className="px-4 pt-5 pb-3 border-b border-gray-800">
        <h2 className="text-white font-semibold text-base mb-3">Surahs</h2>

        {/* Search input skeleton */}
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z" />
          </svg>
          <input
            type="search"
            placeholder="Search surah…"
            disabled
            className="w-full bg-gray-800 text-gray-300 placeholder-gray-500 text-sm rounded-lg pl-9 pr-3 py-2 outline-none border border-transparent focus:border-emerald-600 transition-colors"
          />
        </div>
      </div>

      {/* Surah list — placeholder rows */}
      <div className="flex-1 overflow-y-auto py-2">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-800 cursor-pointer transition-colors group"
          >
            {/* Surah number badge */}
            <div className="w-8 h-8 rounded-lg bg-gray-800 group-hover:bg-gray-700 flex items-center justify-center shrink-0">
              <span className="text-gray-500 text-xs font-medium">{i + 1}</span>
            </div>

            {/* Surah name lines */}
            <div className="flex-1 min-w-0">
              <div className="h-3 bg-gray-700 rounded w-3/4 mb-1.5" />
              <div className="h-2.5 bg-gray-800 rounded w-1/2" />
            </div>

            {/* Arabic name placeholder */}
            <div className="h-3 bg-gray-700 rounded w-10 shrink-0" />
          </div>
        ))}
      </div>
    </aside>
  );
}
