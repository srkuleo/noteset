"use client";

import { Drawer } from "vaul";
import { DrawerWrapper } from "../user/DrawerWrapper";

export const TooltipDrawer = () => {
  return (
    <Drawer.Root>
      <Drawer.Trigger className="rounded-full px-6 py-2 font-manrope font-semibold text-slate-600 shadow-md ring-1 ring-slate-300 dark:text-white dark:ring-slate-400">
        Tooltip
      </Drawer.Trigger>

      <DrawerWrapper modalType="tooltip">
        <div className="flex flex-col pb-safe-bottom font-manrope">
          <p className="pt-8 text-xl font-bold text-slate-800 dark:text-white">
            For a better user experience
          </p>

          <div className="space-y-2 py-8 pl-4">
            <p className="text-sm font-bold">
              <span className="text-xs font-semibold uppercase text-slate-400">
                android:
              </span>{" "}
              install PWA
            </p>
            <p className="text-sm font-bold">
              <span className=" text-xs font-semibold uppercase text-slate-400">
                iphone:
              </span>{" "}
              add website to Home Screen
            </p>
          </div>
          <p className="pb-4">
            You don&apos;t have to login here. Do it in the PWA.
          </p>
          <p className="pb-16 ">
            Installing or adding to Home screen will save workouts page as
            startup page.
          </p>

          <Drawer.Close className="rounded-lg bg-slate-800 py-2 font-bold text-white dark:bg-white dark:font-extrabold dark:text-slate-800">
            Got it!
          </Drawer.Close>
        </div>
      </DrawerWrapper>
    </Drawer.Root>
  );
};
