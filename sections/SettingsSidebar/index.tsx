"use client";

import { useState } from "react";
import {
  useFontSettings,
  ARABIC_FONT_OPTIONS,
  type ArabicFont,
} from "@/lib/FontSettingsContext";

export function SettingsSidebar() {
  const {
    arabicFont,
    arabicSize,
    translationSize,
    setArabicFont,
    setArabicSize,
    setTranslationSize,
    reset,
  } = useFontSettings();

  const [tab, setTab] = useState<"translation" | "reading">("translation");
  const [readingOpen, setReadingOpen] = useState(true);
  const [fontOpen, setFontOpen] = useState(true);

  return (
    <div className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-[220px] shrink-0 flex-col overflow-y-auto border-l border-neutral-800 bg-neutral-950 lg:flex">

      {/* Translation / Reading tabs */}
      <div className="flex border-b border-neutral-800 px-4 pt-3">
        {(["translation", "reading"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 pb-2.5 text-sm font-medium capitalize transition-colors ${
              tab === t
                ? "border-b-2 border-emerald-500 text-emerald-400"
                : "text-neutral-400 hover:text-neutral-200"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2 p-4">

        {/* Reading Settings accordion */}
        <div className="rounded-xl border border-neutral-800 overflow-hidden">
          <button
            onClick={() => setReadingOpen((o) => !o)}
            className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-neutral-200 hover:bg-neutral-800 transition-colors"
          >
            <span className="flex items-center gap-2">
              <span>📖</span> Reading Settings
            </span>
            <ChevronIcon open={readingOpen} />
          </button>
        </div>

        {/* Font Settings accordion */}
        <div className="rounded-xl border border-neutral-800 overflow-hidden">
          <button
            onClick={() => setFontOpen((o) => !o)}
            className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-neutral-200 hover:bg-neutral-800 transition-colors"
          >
            <span className="flex items-center gap-2">
              <span>🔤</span> Font Settings
            </span>
            <ChevronIcon open={fontOpen} />
          </button>

          {fontOpen && (
            <div className="flex flex-col gap-5 border-t border-neutral-800 px-4 py-4">

              {/* Arabic Font Face */}
              <div>
                <p className="mb-2 text-xs text-neutral-400">Arabic Font Face</p>
                <select
                  value={arabicFont}
                  onChange={(e) => setArabicFont(e.target.value as ArabicFont)}
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-neutral-200 outline-none focus:ring-1 focus:ring-emerald-600 transition-colors"
                >
                  {ARABIC_FONT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Arabic Font Size */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs text-neutral-400">Arabic Font Size</span>
                  <span className="text-xs font-medium text-neutral-200">{arabicSize}px</span>
                </div>
                <input
                  type="range"
                  min={16}
                  max={40}
                  value={arabicSize}
                  onChange={(e) => setArabicSize(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                  aria-label="Arabic font size"
                />
                <div className="mt-1 flex justify-between text-[10px] text-neutral-600">
                  <span>16</span><span>40</span>
                </div>
              </div>

              {/* Translation Font Size */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs text-neutral-400">Translation Font Size</span>
                  <span className="text-xs font-medium text-neutral-200">{translationSize}px</span>
                </div>
                <input
                  type="range"
                  min={12}
                  max={24}
                  value={translationSize}
                  onChange={(e) => setTranslationSize(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                  aria-label="Translation font size"
                />
                <div className="mt-1 flex justify-between text-[10px] text-neutral-600">
                  <span>12</span><span>24</span>
                </div>
              </div>

              {/* Reset */}
              <button
                onClick={reset}
                className="w-full rounded-lg border border-neutral-700 py-1.5 text-xs text-neutral-400 hover:border-neutral-500 hover:text-neutral-200 transition-colors"
              >
                Reset to defaults
              </button>
            </div>
          )}
        </div>

        {/* Support Us card */}
        <div className="mt-2 rounded-xl border border-neutral-800 bg-neutral-900 p-4">
          <p className="mb-1.5 text-sm font-semibold text-white">
            Help spread the knowledge of Islam
          </p>
          <p className="mb-4 text-xs leading-relaxed text-neutral-400">
            Your support helps us reach more religious learners and spread the message of Islam. Join our mission and be part of the big change.
          </p>
          <button className="w-full rounded-lg bg-emerald-600 py-2 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors">
            Support Us
          </button>
        </div>
      </div>
    </div>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`h-4 w-4 text-neutral-400 transition-transform ${open ? "rotate-180" : ""}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}
