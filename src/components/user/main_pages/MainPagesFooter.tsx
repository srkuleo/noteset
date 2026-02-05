"use client"

import type { Route } from "next"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import type React from "react"
import { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"
import { AddIcon } from "@/components/icons/user/modify"
import { DietIcon, DumbbellIcon, LogsIcon } from "@/components/icons/user/navbar"

export const MainPagesFooter = ({ children }: { children: React.ReactNode }) => {
  const [pageLoaded, setPageLoaded] = useState(false)
  const { theme } = useTheme()
  const path = usePathname() as Route

  useEffect(() => {
    setPageLoaded(true)
  }, [])

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 flex items-center justify-evenly border-slate-300/80 border-t bg-white pt-1 pb-7 dark:border-slate-800 dark:bg-slate-900">
      <Link
        href="/current"
        className={twMerge(
          "flex size-12 flex-col items-center justify-evenly rounded-full active:scale-95 active:bg-slate-200 dark:active:bg-slate-700",
          path === "/current" || path === "/archived"
            ? "text-green-500 dark:text-green-500"
            : "text-slate-400 dark:text-slate-500"
        )}
      >
        {!pageLoaded ? (
          <div className="mb-1 size-6 rounded-full bg-slate-200 dark:bg-slate-700" />
        ) : (
          <DumbbellIcon
            fill={path === "/current" || path === "/archived" ? "currentColor" : "transparent"}
            stroke={
              (path === "/current" || path === "/archived") && theme === "dark"
                ? "white"
                : (path === "/current" || path === "/archived") && theme === "light"
                  ? "currentColor"
                  : "currentColor"
            }
            strokeWidth={1}
            className="size-7"
          />
        )}

        <p
          className={twMerge(
            "text-center font-extrabold font-nunito text-[8px]",
            path === "/current" || path === "/archived" ? "uppercase" : "normal-case"
          )}
        >
          Workouts
        </p>

        <p className="sr-only">Workouts page button</p>
      </Link>

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled
          className="relative flex size-12 flex-col items-center justify-evenly rounded-full text-slate-400 active:scale-95 active:bg-slate-200 disabled:pointer-events-none dark:text-slate-500 dark:active:bg-slate-700"
          // path === "/diet"
          //   ? "text-green-500 dark:text-green-500"
          //   : "text-slate-400 dark:text-slate-500"
        >
          <DietIcon
            fill="transparent"
            // {path === "/diet" ? "currentColor" : "transparent"}
            stroke="currentColor"
            // {path === "/diet" ? "white" : "currentColor"}
            strokeWidth={1.2}
            className="size-7 active:scale-95"
          />

          <p
            className="text-center font-extrabold font-nunito text-[8px]"
            // path === "/diet" ? "uppercase" : "normal-case"
          >
            Diet
          </p>

          <div className="absolute top-2.5 -skew-y-12 rounded-lg bg-violet-500 px-1 font-bold text-[8px] text-white uppercase dark:bg-violet-500">
            Soon
          </div>

          <p className="sr-only">Diet page</p>
        </button>

        <Link
          href="/create-workout"
          className="rounded-full bg-white p-2.5 shadow-md ring-1 ring-slate-300 active:scale-95 active:bg-slate-200 dark:bg-slate-800 dark:ring-slate-600 dark:active:bg-slate-600"
        >
          <AddIcon strokeWidth={2} className="size-7" />

          <p className="sr-only">Add a new workout</p>
        </Link>

        <Link
          href="/logs"
          className={twMerge(
            "flex size-12 flex-col items-center justify-evenly rounded-full active:scale-95 active:bg-slate-200 dark:active:bg-slate-700",
            path === "/logs"
              ? "text-green-500 dark:text-green-500"
              : "text-slate-400 dark:text-slate-500"
          )}
        >
          <LogsIcon
            fill={path === "/logs" ? "currentColor" : "transparent"}
            stroke={path === "/logs" ? "white" : "currentColor"}
            strokeWidth={1}
            className="size-7"
          />

          <p
            className={twMerge(
              "text-center font-extrabold font-nunito text-[8px]",
              path === "/logs" ? "uppercase" : "normal-case"
            )}
          >
            Logs
          </p>

          <p className="sr-only">Logs button</p>
        </Link>
      </div>

      {children}
    </nav>
  )
}
