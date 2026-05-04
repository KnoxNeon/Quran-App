"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface SurahDrawerContext {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const Ctx = createContext<SurahDrawerContext | null>(null);

export function useSurahDrawer(): SurahDrawerContext {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSurahDrawer must be used inside SurahDrawerProvider");
  return ctx;
}

export function SurahDrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Ctx.Provider value={{
      isOpen,
      open:   () => setIsOpen(true),
      close:  () => setIsOpen(false),
      toggle: () => setIsOpen((o) => !o),
    }}>
      {children}
    </Ctx.Provider>
  );
}
