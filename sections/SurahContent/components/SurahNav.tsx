import Link from "next/link";

interface SurahNavProps {
  current: number;
  total: number;
}

export function SurahNav({ current, total }: SurahNavProps) {
  const hasPrev = current > 1;
  const hasNext = current < total;

  return (
    <div className="flex items-center justify-center gap-3 border-t border-neutral-800 py-6">
      {hasPrev ? (
        <Link
          href={`/${current - 1}`}
          className="flex items-center gap-1.5 rounded-lg border border-neutral-700 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 transition-colors"
        >
          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Previous
        </Link>
      ) : (
        <span className="flex items-center gap-1.5 rounded-lg border border-neutral-800 px-4 py-2 text-sm text-neutral-600 cursor-not-allowed">
          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Previous
        </span>
      )}

      {hasNext ? (
        <Link
          href={`/${current + 1}`}
          className="flex items-center gap-1.5 rounded-lg border border-neutral-700 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-800 transition-colors"
        >
          Next
          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </Link>
      ) : (
        <span className="flex items-center gap-1.5 rounded-lg border border-neutral-800 px-4 py-2 text-sm text-neutral-600 cursor-not-allowed">
          Next
          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </span>
      )}
    </div>
  );
}
