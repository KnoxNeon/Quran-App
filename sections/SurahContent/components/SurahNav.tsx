import Link from "next/link";

export function SurahNav({ current, total }: { current: number; total: number }) {
  const hasPrev = current > 1;
  const hasNext = current < total;

  const activeBtn = "flex items-center gap-1.5 rounded-lg border border-theme px-4 py-2 text-sm text-theme-secondary hover:bg-theme-elevated hover:text-theme-primary transition-colors";
  const disabledBtn = "flex items-center gap-1.5 rounded-lg border border-theme px-4 py-2 text-sm text-theme-muted cursor-not-allowed";

  return (
    <div className="flex items-center justify-center gap-3 border-t border-theme py-6">
      {hasPrev
        ? <Link href={`/${current - 1}`} className={activeBtn}>
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
            Previous
          </Link>
        : <span className={disabledBtn}>
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
            Previous
          </span>
      }
      {hasNext
        ? <Link href={`/${current + 1}`} className={activeBtn}>
            Next
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          </Link>
        : <span className={disabledBtn}>
            Next
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          </span>
      }
    </div>
  );
}
