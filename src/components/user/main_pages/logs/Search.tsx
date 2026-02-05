"use client"

import { twMerge } from "tailwind-merge"
import { Spinner } from "@/components/Loading"
import { useSearch } from "@/util/hooks/useSearch"
import type { LogsOrderType, LogsPageSearchParams } from "@/util/types"
import { FilterLogsModal } from "./FilterLogsModal"
import { LogsCalendarDrawer } from "./LogsCalendarDrawer"

export const Search = ({
  searchQuery,
  logsOrderPreference,
}: {
  searchQuery: LogsPageSearchParams["searchQuery"]
  logsOrderPreference: LogsOrderType
}) => {
  const {
    router,
    path,
    isPending,
    searchValue,
    isFocused,
    inputRef,
    startTransition,
    handleSearchValue,
    clearSearchValue,
    toggleFocus,
  } = useSearch(searchQuery)

  return (
    <div className="flex items-center gap-2">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          startTransition(() => {
            router.push(`${path}?searchQuery=${encodeURIComponent(searchValue)}`)
          })
        }}
        className={twMerge(
          "flex grow gap-1 rounded-full bg-white py-1 pr-1.5 pl-3.5 shadow-md ring-1 ring-slate-300 dark:bg-slate-800 dark:ring-slate-700",
          isFocused && "ring-green-500 dark:ring-green-600"
        )}
      >
        <input
          required
          ref={inputRef}
          type="text"
          value={searchValue}
          placeholder="Search by title..."
          aria-label="Search logs by title..."
          onFocus={toggleFocus}
          onBlur={toggleFocus}
          onChange={handleSearchValue}
          className="w-[calc(100%-104px)] bg-transparent caret-green-500 placeholder:text-slate-400 placeholder:italic focus:outline-none focus:placeholder:text-slate-300 dark:text-white dark:caret-green-600 dark:placeholder:text-slate-500 dark:focus:placeholder:text-slate-600"
        />

        <div className="flex items-center">
          <button
            type="button"
            disabled={!searchValue}
            onClick={clearSearchValue}
            className={twMerge(
              "rounded-full p-1.5 active:bg-slate-200 disabled:opacity-0 dark:active:bg-slate-900",
              isPending && "pointer-events-none"
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="size-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>

          <button
            type="submit"
            disabled={isPending}
            className="group relative flex items-center justify-center rounded-full bg-slate-500 px-6 py-2 text-white disabled:pointer-events-none disabled:opacity-70 dark:bg-slate-950 dark:disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5 group-disabled:opacity-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>

            <Spinner className="absolute size-5 animate-spin group-enabled:opacity-0" />
          </button>
        </div>
      </form>

      <LogsCalendarDrawer />

      <FilterLogsModal selected={logsOrderPreference} />
    </div>
  )
}
