import { getSurahs, getSurah, getAllSurahNumbers } from "@/services/quranService";
import AppLayout from "@/components/layout/AppLayout";
import Link from "next/link";

interface PageProps {
  params: Promise<{ surahNumber: string }>;
}

export function generateStaticParams() {
  const numbers = getAllSurahNumbers();
  return numbers.map((n) => ({ surahNumber: String(n) }));
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

  const surahs = getSurahs();
  const surah = getSurah(number);

  if (!surah) {
    return (
      <div className="flex h-screen items-center justify-center bg-theme-base">
        <div className="text-center space-y-3">
          <p className="text-theme-primary font-semibold">Surah {number} not found</p>
          <Link href="/1" className="text-emerald-500 hover:underline text-sm">Go to Al-Fatihah</Link>
        </div>
      </div>
    );
  }

  return <AppLayout surahs={surahs} surah={surah} />;
}
