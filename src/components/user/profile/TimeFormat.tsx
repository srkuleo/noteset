"use client";

import { useState } from "react";
import { Drawer } from "vaul";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { twMerge } from "tailwind-merge";
import { updateUserTimeFormatPreference } from "@/util/actions/profile";
import { TimeIcon } from "@/components/icons/user/profile/time";
import { showToast } from "@/components/Toasts";

import { timeFormatValues, type TimeFormatType } from "@/util/types";

export const TimeFormat = ({ selected }: { selected: TimeFormatType }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <p className="font-manrope text-xl font-bold">Time Format</p>
        {TimeIcon}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold italic text-slate-400 dark:text-slate-500">
          {selected}
        </p>

        <ChangeTimeFormat selected={selected} />
      </div>
    </div>
  );
};

const ChangeTimeFormat = ({ selected }: { selected: TimeFormatType }) => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer.Root
      open={open}
      onOpenChange={setOpen}
      noBodyStyles
      disablePreventScroll
    >
      <button
        type="button"
        onClick={async () => {
          await new Promise((resolve) => setTimeout(resolve, 150));

          setOpen(true);
        }}
        className="rounded-lg px-3 py-1.5 text-sm text-violet-500 active:scale-95 active:bg-slate-200 dark:active:bg-slate-700"
      >
        Change
        <p className="sr-only">Change time format</p>
      </button>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[9999] bg-slate-900/40 backdrop-blur-sm dark:bg-slate-950/70" />

        <Drawer.Content
          aria-describedby={undefined}
          data-vaul-no-drag
          className="fixed inset-x-0 bottom-0 z-[9999] select-none space-y-4 px-4 pb-12 focus:outline-none"
        >
          <VisuallyHidden asChild>
            <Drawer.Title>Choose a time format</Drawer.Title>
          </VisuallyHidden>

          <div className="flex flex-col divide-y divide-slate-400/40 rounded-modal bg-white/90 text-center dark:divide-slate-600 dark:bg-slate-700/70">
            {timeFormatValues.map((value) => (
              <button
                key={value}
                onClick={async () => {
                  await new Promise((resolve) => setTimeout(resolve, 100));

                  const res = await updateUserTimeFormatPreference(value);

                  setOpen(false);
                  showToast(res.message);
                }}
                className={twMerge(
                  "p-3 font-manrope text-lg font-semibold text-blue-500 first:rounded-t-modal last:rounded-b-modal active:bg-slate-200 dark:border-slate-600 dark:text-blue-500 active:dark:bg-slate-600/90",
                  value === selected &&
                    "bg-white text-green-500 dark:bg-slate-900/50 dark:text-green-500",
                )}
              >
                {value}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={async () => {
              await new Promise((resolve) => setTimeout(resolve, 100));
              setOpen(false);
            }}
            className="w-full rounded-modal bg-white p-3 text-xl font-bold text-violet-500 focus:outline-none active:bg-slate-200 dark:bg-slate-700 dark:text-violet-400 active:dark:bg-slate-600/90"
          >
            Cancel
          </button>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
