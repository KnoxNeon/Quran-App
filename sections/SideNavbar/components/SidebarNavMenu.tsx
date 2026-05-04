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
        className="flex flex-col items-center gap-0.5 px-3 py-1 text-neutral-400 hover:text-white transition-colors"
      >
        <span className="text-xl leading-none">{icon}</span>
        <span className="text-[10px]">{label}</span>
      </Link>
    );
  }

  return (
    <div className="relative group">
      <Link
        href={href}
        className="flex h-10 w-10 items-center justify-center rounded-xl text-xl text-neutral-400 transition-all hover:bg-neutral-800 hover:text-white active:bg-neutral-700"
        aria-label={label}
      >
        {icon}
      </Link>
      {/* Tooltip */}
      <div className="pointer-events-none absolute left-full top-1/2 ml-3 -translate-y-1/2 whitespace-nowrap rounded-lg bg-neutral-800 px-2.5 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
        {label}
        <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-neutral-800" />
      </div>
    </div>
  );
}

const NAV_ITEMS = [
  { href: "/",          icon: <House />, label: "Home"      },
  { href: "/quran",     icon: <LayoutGrid />, label: "Read Quran"     },
  { href: "/prayer",    icon: <Navigation />, label: "Go to Ayah"    },
  { href: "/bookmarks", icon: <Bookmark />, label: "Bookmark" },
  { href: "/profile",   icon: <Grid2x2Plus />, label: "Others"   },
];

export function SidebarNavMenu({ mobile }: { mobile?: boolean }) {
  return (
    <div className={mobile
      ? "flex w-full items-center justify-around"
      : "flex flex-col items-start justify-center flex-1 px-2 gap-4"
    }>
      {NAV_ITEMS.map((item) => (
        <NavItem key={item.href} {...item} mobile={mobile} />
      ))}
    </div>
  );
}