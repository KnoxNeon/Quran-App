"use client";

interface SurahSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function SurahSearch({ value, onChange }: SurahSearchProps) {
  return (
    <div className="px-3 py-2.5">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0015.803 15.803z" />
        </svg>
        <input
          type="search"
          placeholder="Search Surah"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg bg-neutral-800 py-2 pl-8 pr-3 text-sm text-neutral-200 placeholder-neutral-500 outline-none ring-0 focus:ring-1 focus:ring-emerald-600 transition"
        />
      </div>
    </div>
  );
}
