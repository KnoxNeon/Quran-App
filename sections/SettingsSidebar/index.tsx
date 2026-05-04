"use client";

import { useState } from "react";
import { useFontSettings, ARABIC_FONT_OPTIONS, type ArabicFont } from "@/lib/FontSettingsContext";

export function SettingsSidebar() {
  const { arabicFont, arabicSize, translationSize, setArabicFont, setArabicSize, setTranslationSize, reset } = useFontSettings();
  const [tab, setTab] = useState<"translation" | "reading">("translation");
  const [readingOpen, setReadingOpen] = useState(true);
  const [fontOpen, setFontOpen] = useState(true);

  return (
    <div className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-[280px] shrink-0 flex-col overflow-y-auto border-l border-theme bg-theme-surface xl:flex">

      <div className="flex border-b border-theme px-4 pt-3">
        {(["translation", "reading"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 pb-2.5 text-sm font-medium capitalize transition-colors ${
              tab === t ? "border-b-2 border-emerald-500 text-emerald-500" : "text-theme-secondary hover:text-theme-primary"
            }`}>
            {t}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2 p-4">

        <div className="rounded-xl border border-theme overflow-hidden">
          <button onClick={() => setReadingOpen((o) => !o)}
            className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-theme-primary hover:bg-theme-elevated transition-colors">
            <span className="flex items-center gap-2"><span>📖</span> Reading Settings</span>
            <ChevronIcon open={readingOpen} />
          </button>
        </div>

        <div className="rounded-xl border border-theme overflow-hidden">
          <button onClick={() => setFontOpen((o) => !o)}
            className="flex w-full items-center justify-between px-4 py-3 text-sm font-medium text-theme-primary hover:bg-theme-elevated transition-colors">
            <span className="flex items-center gap-2"><span>🔤</span> Font Settings</span>
            <ChevronIcon open={fontOpen} />
          </button>

          {fontOpen && (
            <div className="flex flex-col gap-5 border-t border-theme px-4 py-4">
              <div>
                <p className="mb-2 text-xs text-theme-secondary">Arabic Font Face</p>
                <select value={arabicFont} onChange={(e) => setArabicFont(e.target.value as ArabicFont)}
                  className="w-full rounded-lg border border-theme bg-theme-elevated px-3 py-2 text-sm text-theme-primary outline-none focus:ring-1 focus:ring-emerald-500 transition-colors">
                  {ARABIC_FONT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs text-theme-secondary">Arabic Font Size</span>
                  <span className="text-xs font-medium text-theme-primary">{arabicSize}px</span>
                </div>
                <input type="range" min={16} max={40} value={arabicSize}
                  onChange={(e) => setArabicSize(Number(e.target.value))}
                  className="w-full accent-emerald-500" aria-label="Arabic font size" />
                <div className="mt-1 flex justify-between text-[10px] text-theme-muted"><span>16</span><span>40</span></div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs text-theme-secondary">Translation Font Size</span>
                  <span className="text-xs font-medium text-theme-primary">{translationSize}px</span>
                </div>
                <input type="range" min={12} max={24} value={translationSize}
                  onChange={(e) => setTranslationSize(Number(e.target.value))}
                  className="w-full accent-emerald-500" aria-label="Translation font size" />
                <div className="mt-1 flex justify-between text-[10px] text-theme-muted"><span>12</span><span>24</span></div>
              </div>

              <button onClick={reset}
                className="w-full rounded-lg border border-theme py-1.5 text-xs text-theme-secondary hover:text-theme-primary transition-colors">
                Reset to defaults
              </button>
            </div>
          )}
        </div>

        <div className="mt-2 rounded-xl border border-theme bg-theme-elevated p-4">
          <p className="mb-1.5 text-sm font-semibold text-theme-primary">Help spread the knowledge of Islam</p>
          <p className="mb-4 text-xs leading-relaxed text-theme-secondary">
            Your support helps us reach more religious learners and spread the message of Islam.
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
    <svg className={`h-4 w-4 text-theme-secondary transition-transform ${open ? "rotate-180" : ""}`}
      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}
