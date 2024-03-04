"use client";

import * as Dialog from "@radix-ui/react-dialog";

export const TooltipDrawer = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-full px-6 py-2 font-manrope font-semibold text-slate-600 shadow-md ring-1 ring-slate-300 dark:text-white dark:ring-slate-400">
        Tooltip
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm data-[state=closed]:animate-overlay-hide data-[state=open]:animate-overlay-show dark:bg-slate-950/70" />

        <Dialog.Content className="data-[state=closed]:animate-modal-slide-down data-[state=open]:animate-modal-slide-up fixed inset-x-0 bottom-0 select-none px-4 pb-12">
          <div className="rounded-modal bg-white ring-1 ring-inset ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
            <Dialog.Title className="px-6 py-4 text-xl font-bold leading-snug text-slate-800 dark:text-white">
              For a better user experience
            </Dialog.Title>

            <div className="flex flex-col px-6 pb-4 font-manrope">
              <div className="space-y-2 py-2 pl-4">
                <p className="font-bold text-slate-500 dark:text-slate-100">
                  <span className="text-xs font-semibold uppercase text-slate-400">
                    android:
                  </span>{" "}
                  install PWA
                </p>
                <p className="font-bold text-slate-500 dark:text-slate-100">
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
              <Dialog.Close className="rounded-lg bg-slate-800 py-2 font-bold text-white dark:bg-white dark:font-extrabold dark:text-slate-800">
                Got it!
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
