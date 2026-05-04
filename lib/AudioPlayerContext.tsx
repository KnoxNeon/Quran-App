"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface AudioPlayerContext {
  surahNumber: number;
  surahName: string;
  totalAyahs: number;
  currentAyah: number;  // 1-based, relative to surah
  isPlaying: boolean;
  isActive: boolean;
  currentTime: number;
  duration: number;
  playAyah: (params: PlayAyahParams) => void;
  pause: () => void;
  resume: () => void;
  nextAyah: () => void;
  prevAyah: () => void;
  seek: (time: number) => void;
  close: () => void;
}

export interface PlayAyahParams {
  surahNumber: number;
  surahName: string;
  /** Full ordered list of global ayah numbers for this surah (e.g. [1,2,3,4,5,6,7] for Al-Fatihah) */
  globalAyahNumbers: number[];
  ayahNumberInSurah: number; // 1-based index into globalAyahNumbers
}

// ─── Context ───────────────────────────────────────────────────────────────────

const Ctx = createContext<AudioPlayerContext | null>(null);

export function useAudioPlayerContext(): AudioPlayerContext {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAudioPlayerContext must be used inside AudioPlayerProvider");
  return ctx;
}

// ─── Provider ──────────────────────────────────────────────────────────────────

export function AudioPlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Stable refs — never stale inside event listeners
  const globalAyahNumbersRef = useRef<number[]>([]);  // all global ayah numbers for current surah
  const currentAyahRef = useRef(0);                   // current 1-based surah-relative index
  const totalAyahsRef = useRef(0);

  const [surahNumber, setSurahNumber] = useState(0);
  const [surahName, setSurahName] = useState("");
  const [totalAyahs, setTotalAyahs] = useState(0);
  const [currentAyah, setCurrentAyah] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const getAudio = useCallback((): HTMLAudioElement => {
    if (!audioRef.current) audioRef.current = new Audio();
    return audioRef.current;
  }, []);

  /** Load and play a specific global ayah number from the CDN */
  const loadAndPlay = useCallback(
    (globalAyahNumber: number) => {
      const audio = getAudio();
      audio.src = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${globalAyahNumber}.mp3`;
      audio.load();
      audio.play().catch(() => setIsPlaying(false));
      setIsPlaying(true);
      setCurrentTime(0);
      setDuration(0);
    },
    [getAudio]
  );

  const playAyah = useCallback(
    (params: PlayAyahParams) => {
      const { surahNumber, surahName, globalAyahNumbers, ayahNumberInSurah } = params;

      // Store the full map for this surah
      globalAyahNumbersRef.current = globalAyahNumbers;
      totalAyahsRef.current = globalAyahNumbers.length;
      currentAyahRef.current = ayahNumberInSurah;

      setSurahNumber(surahNumber);
      setSurahName(surahName);
      setTotalAyahs(globalAyahNumbers.length);
      setCurrentAyah(ayahNumberInSurah);
      setIsActive(true);

      // Index is 0-based: ayahNumberInSurah 1 → index 0
      const globalNumber = globalAyahNumbers[ayahNumberInSurah - 1];
      loadAndPlay(globalNumber);
    },
    [loadAndPlay]
  );

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const resume = useCallback(() => {
    audioRef.current?.play().catch(() => setIsPlaying(false));
    setIsPlaying(true);
  }, []);

  const goToAyah = useCallback(
    (ayahInSurah: number) => {
      const numbers = globalAyahNumbersRef.current;
      if (ayahInSurah < 1 || ayahInSurah > numbers.length) return;
      currentAyahRef.current = ayahInSurah;
      setCurrentAyah(ayahInSurah);
      loadAndPlay(numbers[ayahInSurah - 1]);
    },
    [loadAndPlay]
  );

  const nextAyah = useCallback(() => {
    goToAyah(currentAyahRef.current + 1);
  }, [goToAyah]);

  const prevAyah = useCallback(() => {
    goToAyah(currentAyahRef.current - 1);
  }, [goToAyah]);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const close = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.src = "";
    }
    globalAyahNumbersRef.current = [];
    currentAyahRef.current = 0;
    totalAyahsRef.current = 0;
    setIsActive(false);
    setIsPlaying(false);
    setSurahNumber(0);
    setCurrentAyah(0);
    setCurrentTime(0);
    setDuration(0);
  }, []);

  // Wire audio events once
  useEffect(() => {
    const audio = getAudio();

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onDurationChange = () =>
      setDuration(isNaN(audio.duration) ? 0 : audio.duration);

    const onEnded = () => {
      const next = currentAyahRef.current + 1;
      if (next > totalAyahsRef.current) {
        // End of surah — stop, don't advance to another surah
        setIsPlaying(false);
        return;
      }
      currentAyahRef.current = next;
      setCurrentAyah(next);
      const globalNumber = globalAyahNumbersRef.current[next - 1];
      if (globalNumber) {
        audio.src = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${globalNumber}.mp3`;
        audio.load();
        audio.play().catch(() => setIsPlaying(false));
        setCurrentTime(0);
        setDuration(0);
      }
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("ended", onEnded);
    };
  }, [getAudio]);

  return (
    <Ctx.Provider
      value={{
        surahNumber,
        surahName,
        totalAyahs,
        currentAyah,
        isPlaying,
        isActive,
        currentTime,
        duration,
        playAyah,
        pause,
        resume,
        nextAyah,
        prevAyah,
        seek,
        close,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}
