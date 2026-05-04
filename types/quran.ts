export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: "Meccan" | "Medinan";
}

export interface Ayah {
  number: number;
  numberInSurah: number;
  text: string;
  translation: string;
}

export interface SurahDetail extends Surah {
  ayahs: Ayah[];
}

export interface SearchResultAyah {
  number: number;          // global ayah number
  numberInSurah: number;
  text: string;            // Arabic
  translation: string;     // English
  surahNumber: number;
  surahName: string;
  surahEnglishName: string;
}
