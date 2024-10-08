"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

export const WorkoutQuerySwitchButton = () => {
  const path = usePathname();
  const searchParams = useSearchParams();

  return (
    <div className="ml-1.5 flex items-center rounded-full shadow-md ring-1 ring-slate-300 dark:ring-slate-700">
      <Link
        href={path + "?q=current"}
        className={twMerge(
          "rounded-l-full px-3 py-1 active:bg-slate-200 dark:active:bg-slate-800",
          searchParams.get("q") === "current" &&
            "bg-blue-400 py-0.5 dark:bg-blue-500",
        )}
      >
        <p
          className={twMerge(
            "font-manrope text-sm text-slate-400 dark:text-slate-500",
            searchParams.get("q") === "current" &&
              "text-base font-extrabold text-white dark:text-white",
          )}
        >
          C
        </p>
      </Link>

      <Link
        href={path + "?q=archived"}
        className={twMerge(
          "rounded-r-full px-3 py-1 active:bg-slate-200 dark:active:bg-slate-800",
          searchParams.get("q") === "archived" &&
            "bg-slate-500 py-0.5 dark:bg-slate-600",
        )}
      >
        <p
          className={twMerge(
            "font-manrope text-sm text-slate-400 dark:text-slate-500",
            searchParams.get("q") === "archived" &&
              "text-base font-extrabold text-white dark:text-white",
          )}
        >
          A
        </p>
      </Link>
    </div>
  );
};
