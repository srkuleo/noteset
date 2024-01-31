"use client";

import type { Workout } from "@/db/schema";
import { Drawer } from "vaul";
import { PreviewIcon } from "@/icons/user/preview";
import { manrope } from "@/styles/fonts";

export const PreviewWorkoutButton = ({ workout }: { workout: Workout }) => {
  return (
    <Drawer.Root>
      <Drawer.Trigger className="select-none rounded-lg px-2 py-1 shadow-md ring-1 ring-inset ring-slate-300 transition focus:outline-none active:scale-95 dark:shadow-slate-900 dark:ring-slate-600">
        {PreviewIcon}
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/70" />

        <Drawer.Content className="fixed inset-0 mt-8 select-none rounded-t-modal pt-safe-top focus:outline-none">
          <div className="h-full bg-white dark:bg-slate-800">
            <div className="rounded-t-modal border-b border-slate-200 bg-slate-100/65 px-2 pb-4 pt-2 dark:border-slate-600 dark:bg-slate-700/20">
              <div className="mx-auto mb-6 h-1.5 w-12 rounded-full bg-slate-200 dark:bg-slate-600" />
              <div className="flex items-center justify-center">
                <p className={`font-bold ${manrope.className}`}>
                  Preview: {workout.title}
                </p>
                <Drawer.Close className="absolute right-4 text-lg font-extrabold text-violet-500 focus:outline-none active:text-violet-300 dark:text-violet-400 active:dark:text-violet-600">
                  Done
                </Drawer.Close>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
