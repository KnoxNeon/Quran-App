export function BrandSection() {
  return (
    <div className="flex items-center gap-3">
      <a href="/" className="flex items-center gap-3">
        <div className="flex flex-col">
          <p className="text-lg font-bold leading-none text-theme-primary">Quran Mazid</p>
          <p className="mt-1 text-xs text-theme-secondary hidden md:block">
            Read, Study, and Learn The Quran
          </p>
        </div>
      </a>
    </div>
  );
}
