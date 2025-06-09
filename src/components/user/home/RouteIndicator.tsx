"use client";

import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

export const RouteIndicator = () => {
  const path = usePathname();

  console.log(path);

  return (
    <p
      className={twMerge(
        "font-manrope text-xs italic",
        path === "/home"
          ? "text-blue-500 dark:text-blue-400"
          : "text-slate-600 dark:text-slate-500",
      )}
    >
      {path === "/home" ? "current" : "archived"}
    </p>
  );
};
