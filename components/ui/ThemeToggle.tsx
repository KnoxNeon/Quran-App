"use client";

import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  const label = isDark ? "Toggle Light" : "Toggle Dark";

  return (
    <div className="relative group">
      <button
        type="button"
        onClick={toggle}
        aria-label={label}
        className="flex h-9 w-9 items-center justify-center rounded-xl text-theme-secondary hover:bg-theme-elevated hover:text-theme-primary transition-colors"
      >
        {isDark ? (
          /* Sun — click to go light */
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
          </svg>
        ) : (
          /* Moon — click to go dark */
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
          </svg>
        )}
      </button>

      {/* Tooltip */}
      <div className="pointer-events-none absolute top-full left-1/2 mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-theme-elevated border border-theme px-2.5 py-1.5 text-xs font-medium text-theme-primary opacity-0 shadow-lg transition-opacity group-hover:opacity-100 z-50">
        {label}
      </div>
    </div>
  );
}
