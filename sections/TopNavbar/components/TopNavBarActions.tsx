export function TopNavBarActions() {
  return (
    <div className="flex items-center gap-2">
      {/* Search Button */}
      <button
        type="button"
        className="flex h-9 w-9 items-center justify-center rounded-xl text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
        aria-label="Search"
      >
        🔍
      </button>

      {/* Notifications */}
      <button
        type="button"
        className="flex h-9 w-9 items-center justify-center rounded-xl text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors relative"
        aria-label="Notifications"
      >
        🛎️
        <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500" />
      </button>

      {/* Settings */}
      <button
        type="button"
        className="flex h-9 w-9 items-center justify-center rounded-xl text-neutral-400 hover:bg-neutral-800 hover:text-white transition-colors"
        aria-label="Settings"
      >
        ⚙️
      </button>

      {/* User Profile */}
      <button
        type="button"
        className="flex items-center gap-2.5 rounded-2xl pl-2 pr-4 py-1.5 hover:bg-neutral-800 transition-colors"
      >
        <div className="h-8 w-8 rounded-xl bg-neutral-700 flex items-center justify-center text-lg">
          👤
        </div>
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-white">Iftekhar</p>
          <p className="text-xs text-neutral-500 -mt-0.5">Student</p>
        </div>
      </button>
    </div>
  );
}
