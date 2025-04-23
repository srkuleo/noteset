import Link from "next/link";
import { twMerge } from "tailwind-merge";

import type { LogsPageSearchParams } from "@/util/types";

export const SearchResultIndicator = ({
  searchQuery,
  strictMode,
  clasName,
}: {
  searchQuery: string;
  strictMode: LogsPageSearchParams["strictMode"];
  clasName?: string;
}) => {
  return (
    <div
      className={twMerge(
        "flex items-center justify-between px-4 py-1 text-center",
        clasName,
      )}
    >
      <Link
        href="/logs"
        className="rounded-full bg-white p-1.5 ring-1 ring-inset ring-slate-300 active:scale-95 dark:bg-slate-800 dark:ring-slate-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.8}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </Link>

      <div className="text-sm italic text-slate-400 dark:text-slate-400">
        Search results {strictMode === "on" && "strictly"} for:
        <p className="pl-2 not-italic text-slate-600 dark:text-white">
          {searchQuery}
        </p>
      </div>

      <Link
        href={`/logs?searchQuery=${encodeURIComponent(searchQuery)}&strictMode=on`}
        className="w-12 text-center font-manrope text-xs font-bold text-blue-500"
      >
        Strict search
      </Link>
    </div>
  );
};
