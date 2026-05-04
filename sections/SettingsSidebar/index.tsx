"use client";

import { useState } from "react";

const FONTS = ["KFGQ", "Uthmanic", "Naskh", "Nastaliq"];

export function SettingsSidebar() {
  const [arabicSize, setArabicSize] = useState(26);
  const [translationSize, setTranslationSize] = useState(17);
  const [font, setFont] = useState("KFGQ");
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
              <span className="text-base">📖</span> Reading Settings
            </span>
            <svg
              className={`h-4 w-4 text-neutral-400 transition-transform ${readingOpen ? "rotate-180" : ""}`}
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Font Settings accordion */}
        <div className="rounded-xl border border-neutral-800 overflow-hidden">
          <button
            onClick={() => setFontOpen((o) => !o)}
            className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-neutral-200 hover:bg-neutral-800 transition-colors"
          >
            <span className="flex items-center gap-2">
              <span className="text-base">🔤</span> Font Settings
            </span>
            <svg
              className={`h-4 w-4 text-neutral-400 transition-transform ${fontOpen ? "rotate-180" : ""}`}
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {fontOpen && (
            <div className="flex flex-col gap-5 border-t border-neutral-800 px-4 py-4">
              {/* Arabic Font Size */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs text-neutral-400">Arabic Font Size</span>
                  <span className="text-xs font-medium text-neutral-200">{arabicSize}</span>
                </div>
                <input
                  type="range" min={16} max={40} value={arabicSize}
                  onChange={(e) => setArabicSize(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              {/* Translation Font Size */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs text-neutral-400">Translation Font Size</span>
                  <span className="text-xs font-medium text-neutral-200">{translationSize}</span>
                </div>
                <input
                  type="range" min={12} max={28} value={translationSize}
                  onChange={(e) => setTranslationSize(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              {/* Arabic Font Face */}
              <div>
                <p className="mb-2 text-xs text-neutral-400">Arabic Font Face</p>
                <select
                  value={font}
                  onChange={(e) => setFont(e.target.value)}
                  className="w-full rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-2 text-sm text-neutral-200 outline-none focus:ring-1 focus:ring-emerald-600"
                >
                  {FONTS.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>
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
