"use client";

import { useState } from "react";
import { Drawer } from "vaul";

export const TooltipDrawer = () => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger className="rounded-full px-6 py-2 font-manrope font-semibold text-slate-600 shadow-md ring-1 ring-slate-300 dark:text-white dark:ring-slate-400">
        Tooltip
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm dark:bg-slate-950/70" />

        <Drawer.Content className="fixed inset-x-0 bottom-0 select-none px-2 focus:outline-none">
          <div className="rounded-t-modal bg-white pb-8 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700/70">
            <div className="rounded-t-modal border-b border-b-slate-300/50 bg-slate-200/55 py-3 dark:border-b-slate-700/70 dark:bg-slate-800">
              <Drawer.Handle className="bg-slate-300 dark:bg-slate-500" />
              <Drawer.Title className="px-6 pt-3 text-xl font-bold text-slate-800 dark:text-white">
                UX Tooltips
              </Drawer.Title>
            </div>

            <div className="flex flex-col px-6 pt-6 font-manrope">
              <p className="text-lg text-slate-500 dark:text-slate-300">
                For better user experience
              </p>
              <div className="space-y-2 py-2 pl-4">
                <p className="font-bold text-slate-800 dark:text-white">
                  <span className="text-xs font-semibold uppercase text-slate-400">
                    android:
                  </span>{" "}
                  install PWA
                </p>
                <p className="font-bold text-slate-800 dark:text-white">
                  <span className="text-xs font-semibold uppercase text-slate-400">
                    iphone:
                  </span>{" "}
                  add website to Home Screen
                </p>
              </div>
              <p className="pb-2 pt-4 text-slate-500 dark:text-slate-300">
                You don&apos;t have to login here. Do it in the PWA.
              </p>
              <p className="pb-8 text-slate-500 dark:text-slate-300">
                Installing or adding to Home screen will save workouts page as
                startup page.
              </p>
              <button
                onClick={async () => {
                  await new Promise((resolve) => setTimeout(resolve, 200));
                  setOpen(false);
                }}
                className="rounded-lg bg-slate-800 py-2 font-bold text-white active:bg-slate-600 dark:bg-white dark:font-extrabold dark:text-slate-800 active:dark:bg-slate-300"
              >
                Got it!
              </button>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
