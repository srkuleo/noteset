"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun, SunAndMoon, System } from "../icons/landing/theme";

type ThemeOptions = "system" | "dark" | "light";

export const ThemeButton = () => {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  function chooseTheme(option: ThemeOptions) {
    setTheme(option);
  }

  return (
    <>
      <button onClick={() => setOpen(!open)}>{SunAndMoon}</button>
      <AnimatePresence>
        {open && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 68 }}
              animate={{
                opacity: 1,
                y: 84,
                transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] },
              }}
              exit={{
                opacity: 0,
                y: 68,
                transition: {
                  delay: 0.2,
                  duration: 0.1,
                  ease: [0.36, 0.66, 0.04, 1],
                },
              }}
              className="absolute right-6 z-10 flex flex-col rounded-lg bg-white p-1 ring-1 ring-slate-300 dark:bg-slate-900 dark:ring-slate-800"
            >
              <button
                onClick={() => {
                  chooseTheme("system");
                  setOpen(false);
                }}
                className={`${theme === "system" ? "text-green-500" : ""} flex items-center gap-2 rounded-md py-1 pl-2 pr-12 text-xs font-semibold uppercase active:bg-slate-200 active:dark:bg-slate-800
            `}
              >
                {System}
                System
              </button>
              <button
                onClick={() => {
                  chooseTheme("dark");
                  setOpen(false);
                }}
                className={`${theme === "dark" ? "text-green-500" : ""} flex items-center gap-2 rounded-md py-1 pl-2 pr-12 text-left text-xs font-semibold uppercase active:bg-slate-200 active:dark:bg-slate-800
            `}
              >
                {Moon}
                Dark
              </button>
              <button
                onClick={() => {
                  chooseTheme("light");
                  setOpen(false);
                }}
                className={`${theme === "light" ? "text-green-500" : ""} flex items-center gap-2 rounded-md py-1 pl-2 pr-12 text-left text-xs font-semibold uppercase active:bg-slate-200 active:dark:bg-slate-800
            `}
              >
                {Sun}
                Light
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
