import Image from "next/image";

export function SidebarLogo() {
  return (
    <a
      href="/"
      className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-neutral-800 transition-colors mb-2"
      aria-label="Home"
    >
      <Image
        src="/icon.svg"
        alt="Quran App Logo"
        width={32}
        height={32}
        className="h-8 w-8"
      />
    </a>
  );
}
