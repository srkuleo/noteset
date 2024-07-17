"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeIcon, SystemIcon, MoonIcon, SunIcon } from "./icons/theme";
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
          <>
            <motion.div
              className="fixed inset-0 z-10"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 72 }}
              animate={{
                opacity: 1,
                y: 92,
                transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] },
              }}
              exit={{
                opacity: 0,
                transition: {
                  delay: 0.1,
                  duration: 0.1,
                  ease: [0.36, 0.66, 0.04, 1],
                },
              }}
              className="absolute right-6 z-10 flex flex-col rounded-lg bg-white p-1 text-sm shadow-md ring-1 ring-slate-300 dark:bg-slate-800 dark:text-slate-400 dark:shadow-slate-950 dark:ring-slate-700"
            >
              <button
                onClick={() => chooseTheme("system")}
                className={twMerge(
                  "flex items-center gap-2 rounded-md py-1 pl-2 pr-12 font-semibold uppercase active:bg-slate-200 active:dark:bg-slate-800",
                  theme === "system" && "text-green-500",
                )}
              >
                {SystemIcon}
                System
                <p className="sr-only">System theme</p>
              </button>

              <button
                onClick={() => chooseTheme("dark")}
                className={twMerge(
                  "flex items-center gap-2 rounded-md py-1 pl-2 pr-12 font-semibold uppercase active:bg-slate-200 active:dark:bg-slate-800",
                  theme === "dark" && "text-green-500",
                )}
              >
                {MoonIcon}
                Dark
                <p className="sr-only">Dark theme</p>
              </button>

              <button
                onClick={() => chooseTheme("light")}
                className={twMerge(
                  "flex items-center gap-2 rounded-md py-1 pl-2 pr-12 font-semibold uppercase active:bg-slate-200 active:dark:bg-slate-800",
                  theme === "light" && "text-green-500",
                )}
              >
                {SunIcon}
                Light
                <p className="sr-only">Light theme</p>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
