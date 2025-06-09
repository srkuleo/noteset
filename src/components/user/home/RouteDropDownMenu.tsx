"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { UserPagesSubHeadingText } from "../UserPagesHeader";
import { RouteIndicator } from "./RouteIndicator";

export const RouteDropDownMenu = () => {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="focus:outline-none">
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-start">
            <UserPagesSubHeadingText
              label="Workouts"
              className="text-[22px] leading-none"
            />

            <RouteIndicator />
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[9999] bg-slate-900/40 backdrop-blur-sm dark:bg-slate-950/70" />

        <Dialog.Content
          aria-describedby={undefined}
          className="fixed left-6 top-32 z-[9999] pt-safe-top focus:outline-none data-[state=closed]:animate-dropdown-menu-scale-down data-[state=open]:animate-dropdown-menu-scale-up"
        >
          <VisuallyHidden>
            <Dialog.Title>Routes</Dialog.Title>
          </VisuallyHidden>

          <div className="flex flex-col rounded-lg bg-white p-4 ring-1 ring-slate-300 dark:bg-slate-800/70 dark:ring-slate-700/80">
            <Link
              href={path === "/home" ? "/archived-workouts" : "/home"}
              onClick={() => setOpen(false)}
              className={twMerge(
                "border-b border-slate-200 pb-2 font-manrope font-semibold italic dark:border-slate-700/80",
                path === "/home"
                  ? "dark:text-slate-400"
                  : "text-blue-500 dark:text-blue-400",
              )}
            >
              {path === "/home" ? "Archived" : "Current"}
            </Link>

            <button
              disabled
              className="pt-2 font-manrope italic text-slate-400 dark:text-slate-500"
            >
              Diet (coming soon)
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
