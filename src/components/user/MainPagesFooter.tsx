"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { HomeIcon, LogsIcon } from "@/components/icons/user/navbar";
import { AddIcon } from "../icons/user/modify";

export const MainPagesFooter = () => {
  const path = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 flex items-center justify-center gap-4 border-t border-slate-300/80 bg-white pb-7 pt-1 dark:border-slate-800 dark:bg-slate-900">
      <Link
        href="/home"
        className={twMerge(
          "flex flex-col items-center rounded-full px-3 py-1.5 active:bg-slate-200 dark:active:bg-slate-700",
          path === "/home" || path === "/archived-workouts"
            ? "text-green-500 dark:text-green-500"
            : "text-slate-400 dark:text-slate-500",
        )}
      >
        <HomeIcon
          fill={
            path === "/home" || path === "/archived-workouts"
              ? "currentColor"
              : "transparent"
          }
          stroke={
            path === "/home" || path === "/archived-workouts"
              ? "transparent"
              : "currentColor"
          }
          strokeWidth={
            path === "/home" || path === "/archived-workouts" ? 0 : 1.2
          }
          className="size-6"
        />

        <p
          className={twMerge(
            "text-center font-manrope text-[10px] uppercase",
            path === "/home" || path === "/archived-workouts"
              ? "font-extrabold text-green-500"
              : "font-bold text-slate-400 dark:text-slate-500",
          )}
        >
          Home
        </p>

        <p className="sr-only">Home button</p>
      </Link>

      <Link
        href="/create-workout"
        className="flex items-center rounded-full bg-white p-2.5 shadow-md ring-1 ring-slate-300 transition active:scale-95 active:bg-slate-200 dark:bg-slate-800 dark:ring-slate-600 dark:active:bg-slate-600"
      >
        <AddIcon strokeWidth={2} className="size-7" />

        <p className="sr-only">Add a new workout</p>
      </Link>

      <Link
        href="/logs"
        className={twMerge(
          "flex flex-col items-center rounded-full px-3 py-1.5 active:bg-slate-200 dark:active:bg-slate-700",
          path === "/logs"
            ? "text-green-500 dark:text-green-500"
            : "text-slate-400 dark:text-slate-500",
        )}
      >
        <LogsIcon
          fill={path === "/logs" ? "currentColor" : "transparent"}
          stroke={path === "/logs" ? "transparent" : "currentColor"}
          strokeWidth={path === "/logs" ? 0 : 1.2}
          className="size-6"
        />

        <p
          className={twMerge(
            "text-center font-manrope text-[10px] uppercase",
            path === "/logs" ? "font-extrabold" : "font-bold",
          )}
        >
          Logs
        </p>

        <p className="sr-only">Logs button</p>
      </Link>
    </nav>
  );
};
