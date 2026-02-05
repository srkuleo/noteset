import Link from "next/link"

import type { LogsPageSearchParams } from "@/util/types"

export const SearchIndicator = ({
  searchQuery,
  strictMode,
}: {
  searchQuery: string
  strictMode: LogsPageSearchParams["strictMode"]
}) => {
  return (
    <div className="flex items-center justify-between text-center">
      <Link
        href="/logs"
        className="rounded-full bg-white p-1.5 ring-1 ring-slate-300 ring-inset active:scale-95 dark:bg-slate-800 dark:ring-slate-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className="size-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </Link>

      <div className="text-slate-400 text-sm italic dark:text-slate-400">
        Search results {strictMode === "on" && "strictly"} for:
        <p className="pl-2 text-slate-600 not-italic dark:text-white">{searchQuery}</p>
      </div>

      <Link
        href={`/logs?searchQuery=${encodeURIComponent(searchQuery)}&strictMode=on`}
        className="w-12 text-center font-bold font-manrope text-blue-500 text-xs"
      >
        Strict search
      </Link>
    </div>
  )
}
