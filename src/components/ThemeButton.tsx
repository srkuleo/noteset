"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { twMerge } from "tailwind-merge";
import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ThemeIcon, SystemIcon, MoonIcon, SunIcon } from "./icons/theme";
import { CheckmarkIcon } from "./icons/user/submit-button";

type ThemeOptions = "system" | "dark" | "light";

export const ThemeButton = () => {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  function chooseTheme(option: ThemeOptions) {
    setTheme(option);
    setOpen(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="focus:outline-none dark:text-slate-400">
        {ThemeIcon}
        <p className="sr-only">Toggle theme</p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay
          onClick={() => setOpen(false)}
          className="data-[state=open]:animate-overlay-show data-[state=closed]:animate-overlay-hide fixed inset-0 z-10 bg-slate-700/15 backdrop-blur-sm dark:bg-slate-950/15"
        />

        <Dialog.Content
          aria-describedby={undefined}
          onOpenAutoFocus={(e) => {
            e.preventDefault();
          }}
          className="data-[state=open]:animate-dropdown-menu-scale-up data-[state=closed]:animate-dropdown-menu-scale-down absolute right-20 top-16 z-10 pt-safe-top"
        >
          <VisuallyHidden asChild>
            <Dialog.Title>Choose a colour theme</Dialog.Title>
          </VisuallyHidden>

          <div className="flex w-48 flex-col rounded-modal bg-white/60 ring-1 ring-slate-400/70 dark:bg-slate-800/75 dark:text-slate-400 dark:ring-slate-700">
            <button
              onClick={() => chooseTheme("system")}
              className={twMerge(
                "flex items-center gap-2 rounded-t-modal p-2 active:bg-slate-200 active:dark:bg-slate-800 [&>*:nth-child(2)]:mr-auto",
                theme === "system" && "bg-white dark:bg-slate-900",
              )}
            >
              {SystemIcon}
              <p className="text-sm font-semibold uppercase">System</p>

              {theme === "system" && (
                <CheckmarkIcon className="size-5 text-green-500" />
              )}
              <p className="sr-only">System theme</p>
            </button>

            <button
              onClick={() => chooseTheme("dark")}
              className={twMerge(
                "flex items-center gap-2 border-y border-slate-300/50 p-2 active:bg-slate-200 dark:border-slate-700/80 active:dark:bg-slate-800 [&>*:nth-child(2)]:mr-auto",
                theme === "dark" && "dark:bg-slate-900",
              )}
            >
              {MoonIcon}
              <p className="text-sm font-semibold uppercase">Dark</p>

              {theme === "dark" && (
                <CheckmarkIcon className="size-5 text-green-500" />
              )}
              <p className="sr-only">Dark theme</p>
            </button>

            <button
              onClick={() => chooseTheme("light")}
              className={twMerge(
                "flex items-center gap-2 rounded-b-modal p-2 active:bg-slate-200 active:dark:bg-slate-800 [&>*:nth-child(2)]:mr-auto",
                theme === "light" && "bg-white",
              )}
            >
              {SunIcon}
              <p className="text-sm font-semibold uppercase">Light</p>

              {theme === "light" && (
                <CheckmarkIcon className="size-5 text-green-500" />
              )}
              <p className="sr-only">Light theme</p>
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
