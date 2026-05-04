"use client";

import { useState } from "react";
import { SearchModal } from "@/components/ui/SearchModal";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { HeartPlus } from "lucide-react";

function Tooltip({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="relative group">
      {children}
      <div className="pointer-events-none absolute top-full left-1/2 mt-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-theme-elevated border border-theme px-2.5 py-1.5 text-xs font-medium text-theme-primary opacity-0 shadow-lg transition-opacity group-hover:opacity-100 z-50">
        {label}
      </div>
    </div>
  );
}

export function TopNavBarActions() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <>
      <div className="flex items-center gap-2">
        {/* Search */}
        <Tooltip label="Search">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-theme-secondary hover:bg-theme-elevated hover:text-theme-primary transition-colors"
            aria-label="Search"
          >
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z" />
            </svg>
          </button>
        </Tooltip>

        {/* Theme toggle — tooltip handled inside ThemeToggle */}
        <ThemeToggle />

        {/* Support Us */}
        <button
          type="button"
          className="hidden items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors md:flex"
        >
          Support Us <HeartPlus size={16} />
        </button>
      </div>

      {searchOpen && <SearchModal onClose={() => setSearchOpen(false)} />}
    </>
  );
}
