import Link from "next/link";

interface NavItemProps {
  href: string;
  icon: string;
  label: string;
}

function NavItem({ href, icon, label }: NavItemProps) {
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
        {/* Arrow */}
        <span className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-neutral-800" />
      </div>
    </div>
  );
}

export function SidebarNavMenu() {
  return (
    <div className="flex flex-row gap-1 md:flex-col md:flex-1 md:px-2 md:py-4 md:gap-1">
      <NavItem href="/"          icon="🏠" label="Home"      />
      <NavItem href="/quran"     icon="📖" label="Quran"     />
      <NavItem href="/prayer"    icon="🙏" label="Prayer"    />
      <NavItem href="/bookmarks" icon="🔖" label="Bookmarks" />
      <NavItem href="/profile"   icon="👤" label="Profile"   />
      <NavItem href="/settings"  icon="⚙️" label="Settings"  />
    </div>
  );
}
