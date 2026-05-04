"use client";

import Link from "next/link";
import { House, LayoutGrid, Navigation, Bookmark, Grid2x2Plus } from "lucide-react";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  mobile?: boolean;
}

function NavItem({ href, icon, label, mobile }: NavItemProps) {
  if (mobile) {
    return (
      <Link
        href={href}
        aria-label={label}
        className="flex flex-col items-center gap-0.5 px-3 py-1 text-theme-secondary hover:text-theme-primary transition-colors"
      >
        <span className="text-xl leading-none">{icon}</span>
        <span className="text-[10px]">{label}</span>
      </Link>
    );
  }

  return (
    <div className="relative group w-full flex justify-center">
      <Link
        href={href}
        className="flex h-10 w-10 items-center justify-center rounded-xl text-theme-secondary transition-all hover:bg-theme-elevated hover:text-theme-primary active:bg-theme-active"
        aria-label={label}
      >
        {icon}
      </Link>
      {/* Tooltip */}
      <div className="pointer-events-none absolute left-full top-1/2 ml-3 -translate-y-1/2 whitespace-nowrap rounded-lg bg-theme-elevated px-2.5 py-1.5 text-xs font-medium text-theme-primary opacity-0 shadow-lg transition-opacity group-hover:opacity-100 z-50">
        {label}
        <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-theme" />
      </div>
    </div>
  );
}

const NAV_ITEMS = [
  { href: "/",          icon: <House size={20} />,       label: "Home"       },
  { href: "/quran",     icon: <LayoutGrid size={20} />,  label: "Read Quran" },
  { href: "/prayer",    icon: <Navigation size={20} />,  label: "Go to Ayah" },
  { href: "/bookmarks", icon: <Bookmark size={20} />,    label: "Bookmarks"  },
  { href: "/profile",   icon: <Grid2x2Plus size={20} />, label: "Others"     },
];

export function SidebarNavMenu({ mobile }: { mobile?: boolean }) {
  return (
    <div className={
      mobile
        ? "flex w-full items-center justify-around"
        : "flex flex-col items-center justify-center flex-1 w-full gap-1 px-2"
    }>
      {NAV_ITEMS.map((item) => (
        <NavItem key={item.href} {...item} mobile={mobile} />
      ))}
    </div>
  );
}
