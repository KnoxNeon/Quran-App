import { getSurahs, getSurah, getAllSurahNumbers } from "@/services/quranService";
import AppLayout from "@/components/layout/AppLayout";

interface PageProps {
  params: Promise<{ surahNumber: string }>;
}

// SSG — pre-render all 114 surah pages at build time
export async function generateStaticParams() {
  const numbers = await getAllSurahNumbers();
  return numbers.map((n) => ({ surahNumber: String(n) }));
}

export default async function SurahPage({ params }: PageProps) {
  const { surahNumber } = await params;
  const number = Number(surahNumber);

  const [surahs, surah] = await Promise.all([
    getSurahs(),
    getSurah(number),
  ]);

  return <AppLayout surahs={surahs} surah={surah} />;
}
