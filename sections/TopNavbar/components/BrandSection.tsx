export function BrandSection() {
  return (
    <div className="flex items-center gap-3">
      <a href="/" className="flex items-center gap-3">
        {/* Logo */}
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white text-2xl">
          🕌
        </div>

        {/* Text Content */}
        <div className="flex flex-col">
          <p className="text-lg font-bold leading-none text-white">Quran Mazid</p>
          <p className="mt-1 text-xs text-neutral-400 hidden md:block">
            Read, Study, and Learn The Quran
          </p>
        </div>
      </a>
    </div>
  );
}
