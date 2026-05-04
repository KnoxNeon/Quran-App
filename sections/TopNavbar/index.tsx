import { BrandSection } from "@/sections/TopNavbar/components/BrandSection";
import { TopNavBarActions } from "@/sections/TopNavbar/components/TopNavBarActions";

export function TopNavbar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-40 h-14 border-b border-neutral-800 bg-neutral-950 md:left-[60px]">
      <div className="flex h-full items-center justify-between px-4 md:px-6">
        <BrandSection />
        <TopNavBarActions />
      </div>
    </nav>
  );
}
