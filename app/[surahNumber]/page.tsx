import { getSurahs, getSurah, getAllSurahNumbers } from "@/services/quranService";
import AppLayout from "@/components/layout/AppLayout";

interface PageProps {
  params: Promise<{ surahNumber: string }>;
}

// SSG — pre-render all 114 surah pages at build time
export async function generateStaticParams() {
  const numbers = await getAllSurahNumbers();
  return numbers.map((n: number) => ({ surahNumber: String(n) }));
}

export default async function SurahPage({ params }: PageProps) {
  const { surahNumber } = await params;
  const number = Number(surahNumber);

  const [surahs, surah] = await Promise.all([
    getSurahs(),
    getSurah(number),
  ]);

  if (!surah) {
    return <div className="p-8 text-theme-secondary">Failed to load surah {number}.</div>;
  }

  return <AppLayout surahs={surahs} surah={surah} />;
}
