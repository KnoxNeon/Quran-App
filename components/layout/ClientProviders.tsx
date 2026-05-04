"use client";

import { AudioPlayerProvider } from "@/lib/AudioPlayerContext";
import { SurahDrawerProvider } from "@/lib/SurahDrawerContext";
import { PlayBar } from "@/components/ui/PlayBar";
import type { ReactNode } from "react";

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <AudioPlayerProvider>
      <SurahDrawerProvider>
        {children}
        <PlayBar />
      </SurahDrawerProvider>
    </AudioPlayerProvider>
  );
}
