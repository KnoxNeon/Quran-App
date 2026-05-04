"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export interface AudioPlayerState {
  surahNumber: number;
  surahName: string;
  totalAyahs: number;
  currentAyah: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  play: (surahNumber: number, surahName: string, totalAyahs: number, ayahNumber: number) => void;
  pause: () => void;
  resume: () => void;
  nextAyah: () => void;
  prevAyah: () => void;
  seek: (time: number) => void;
  close: () => void;
}

export function useAudioPlayer(): AudioPlayerState {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [surahNumber, setSurahNumber] = useState(0);
  const [surahName, setSurahName] = useState("");
  const [totalAyahs, setTotalAyahs] = useState(0);
  const [currentAyah, setCurrentAyah] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Absolute ayah number for the audio CDN
  // The CDN uses the global ayah number (1-6236), not the surah-relative one.
  // We store it separately so we can increment across surahs if needed.
  const globalAyahRef = useRef(0);

  const loadAndPlay = useCallback((globalAyah: number) => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }
    const audio = audioRef.current;
    audio.src = `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${globalAyah}.mp3`;
    audio.load();
    audio.play().catch(() => setIsPlaying(false));
    setIsPlaying(true);
    setCurrentTime(0);
    setDuration(0);
    globalAyahRef.current = globalAyah;
  }, []);

  const play = useCallback(
    (
      newSurahNumber: number,
      newSurahName: string,
      newTotalAyahs: number,
      ayahNumberInSurah: number,
      globalAyah: number
    ) => {
      setSurahNumber(newSurahNumber);
      setSurahName(newSurahName);
      setTotalAyahs(newTotalAyahs);
      setCurrentAyah(ayahNumberInSurah);
      loadAndPlay(globalAyah);
    },
    [loadAndPlay]
  ) as AudioPlayerState["play"];

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsPlaying(false);
  }, []);

  const resume = useCallback(() => {
    audioRef.current?.play().catch(() => setIsPlaying(false));
    setIsPlaying(true);
  }, []);

  const nextAyah = useCallback(() => {
    setCurrentAyah((prev) => {
      const next = prev + 1;
      if (next > totalAyahs) return prev;
      loadAndPlay(globalAyahRef.current + 1);
      return next;
    });
  }, [totalAyahs, loadAndPlay]);

  const prevAyah = useCallback(() => {
    setCurrentAyah((prev) => {
      const p = prev - 1;
      if (p < 1) return prev;
      loadAndPlay(globalAyahRef.current - 1);
      return p;
    });
  }, [loadAndPlay]);

  const seek = useCallback((time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  }, []);

  const close = useCallback(() => {
    audioRef.current?.pause();
    audioRef.current = null;
    setIsPlaying(false);
    setSurahNumber(0);
    setCurrentAyah(0);
    setCurrentTime(0);
    setDuration(0);
  }, []);

  // Wire up audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onDurationChange = () => setDuration(audio.duration || 0);
    const onEnded = () => nextAyah();

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("ended", onEnded);
    };
  }, [nextAyah]);

  return {
    surahNumber,
    surahName,
    totalAyahs,
    currentAyah,
    isPlaying,
    currentTime,
    duration,
    play,
    pause,
    resume,
    nextAyah,
    prevAyah,
    seek,
    close,
  };
}
