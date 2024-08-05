"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeIcon, SystemIcon, MoonIcon, SunIcon } from "./icons/theme";
import { CheckmarkIcon } from "./icons/user/submit-button";
import { twMerge } from "tailwind-merge";

type ThemeOptions = "system" | "dark" | "light";

export const ThemeButton = () => {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  function chooseTheme(option: ThemeOptions) {
    setTheme(option);
    setOpen(false);
  }

  return (
    <>
      <button onClick={() => setOpen(!open)} className="dark:text-slate-400">
        {ThemeIcon}
        <p className="sr-only">Toggle theme</p>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] },
            }}
            exit={{
              opacity: 0,
              transition: {
                delay: 0.1,
                duration: 0.15,
                ease: [0.36, 0.66, 0.04, 1],
              },
            }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-10 bg-slate-700/15 backdrop-blur-sm dark:bg-slate-950/15"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            key="dropdown-menu"
            initial={{ opacity: 0, scale: 0, originX: 1, originY: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              originX: 1,
              originY: 0,
              transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] },
            }}
            exit={{
              opacity: 0,
              scale: 0,
              originX: 1,
              originY: 0,
              transition: {
                delay: 0.1,
                duration: 0.15,
                ease: [0.36, 0.66, 0.04, 1],
              },
            }}
            className="translate absolute right-16 top-14 z-10 flex w-48 origin-top-right flex-col rounded-modal bg-white ring-1 ring-slate-300 dark:bg-slate-800 dark:text-slate-400 dark:ring-slate-700"
          >
            <button
              onClick={() => chooseTheme("system")}
              className={twMerge(
                "flex items-center justify-between rounded-t-modal p-2 active:bg-slate-200 active:dark:bg-slate-800",
                theme === "system" && "bg-slate-100/80 dark:bg-slate-900/70",
              )}
            >
              <div className="flex items-center gap-2">
                {SystemIcon}
                <p className="text-sm font-semibold uppercase">System</p>
              </div>
              {theme === "system" && (
                <CheckmarkIcon className="size-5 text-green-500" />
              )}
              <p className="sr-only">System theme</p>
            </button>

            <button
              onClick={() => chooseTheme("dark")}
              className={twMerge(
                "flex items-center justify-between border-y border-slate-300/50 p-2 active:bg-slate-200 dark:border-slate-700/80 active:dark:bg-slate-800",
                theme === "dark" && "bg-slate-100/80 dark:bg-slate-900/70",
              )}
            >
              <div className="flex items-center gap-2">
                {MoonIcon}
                <p className="text-sm font-semibold uppercase">Dark</p>
              </div>
              {theme === "dark" && (
                <CheckmarkIcon className="size-5 text-green-500" />
              )}
              <p className="sr-only">Dark theme</p>
            </button>

            <button
              onClick={() => chooseTheme("light")}
              className={twMerge(
                "flex items-center justify-between rounded-b-modal p-2 active:bg-slate-200 active:dark:bg-slate-800",
                theme === "light" && "bg-slate-100/80 dark:bg-slate-900/70",
              )}
            >
              <div className="flex items-center gap-2">
                {SunIcon}
                <p className="text-sm font-semibold uppercase">Light</p>
              </div>
              {theme === "light" && (
                <CheckmarkIcon className="size-5 text-green-500" />
              )}
              <p className="sr-only">Light theme</p>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
