import { SidebarLogo } from "@/sections/SideNavbar/components/SidebarLogo";
import { SidebarNavMenu } from "@/sections/SideNavbar/components/SidebarNavMenu";

export function SideNavbar() {
  return (
    <>
      {/* ── Desktop: fixed left rail (md+) ─────────────────────────── */}
      <nav className="fixed left-0 top-0 z-50 hidden h-screen w-[60px] flex-col items-center border-r border-theme bg-theme-nav md:flex">
        <div className="flex h-full w-full flex-col items-center pt-4">
          <SidebarLogo />
          <SidebarNavMenu />
        </div>
      </nav>

      {/* ── Mobile: fixed bottom bar ────────────────────────────────── */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-14 items-center justify-around border-t border-theme bg-theme-nav md:hidden">
        <SidebarNavMenu mobile />
      </nav>
    </>
  );
}
