import { getSurahs, getSurah, getAllSurahNumbers } from "@/services/quranService";
import AppLayout from "@/components/layout/AppLayout";
import Link from "next/link";

interface PageProps {
  params: Promise<{ surahNumber: string }>;
}

export async function generateStaticParams() {
  const numbers = await getAllSurahNumbers();
  return numbers.map((n: number) => ({ surahNumber: String(n) }));
}

export default async function SurahPage({ params }: PageProps) {
  const { surahNumber } = await params;
  const number = Number(surahNumber);

  if (isNaN(number) || number < 1 || number > 114) {
    return (
      <div className="flex h-screen items-center justify-center bg-theme-base">
        <div className="text-center">
          <p className="text-theme-primary font-semibold mb-2">Invalid surah number.</p>
          <Link href="/1" className="text-emerald-500 hover:underline text-sm">Go to Al-Fatihah</Link>
        </div>
      </div>
    );
  }

  const [surahs, surah] = await Promise.all([
    getSurahs(),
    getSurah(number),
  ]);

  if (!surah) {
    return (
      <div className="flex h-screen items-center justify-center bg-theme-base">
        <div className="text-center space-y-3">
          <p className="text-theme-primary font-semibold">Failed to load Surah {number}</p>
          <p className="text-theme-secondary text-sm">The Quran API may be temporarily unavailable.</p>
          <div className="flex items-center justify-center gap-3 pt-2">
            <Link
              href={`/${number}`}
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 transition-colors"
            >
              Try again
            </Link>
            <Link
              href="/1"
              className="rounded-lg border border-theme px-4 py-2 text-sm font-medium text-theme-secondary hover:bg-theme-elevated transition-colors"
            >
              Go to Al-Fatihah
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <AppLayout surahs={surahs} surah={surah} />;
}
