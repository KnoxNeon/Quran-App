import { SidebarLogo } from "@/sections/SideNavbar/components/SidebarLogo";
import { SidebarNavMenu } from "@/sections/SideNavbar/components/SidebarNavMenu";

export function SideNavbar() {
  return (
    <nav className="fixed left-0 top-0 z-50 h-[60px] w-full bg-neutral-900 md:h-screen md:w-[60px] md:border-r md:border-neutral-800">
      <div className="flex h-full w-full flex-row items-center justify-around md:flex-col md:justify-start md:items-center md:pt-4 md:gap-0">
        <SidebarLogo />
        <SidebarNavMenu />
      </div>
    </nav>
  );
}
