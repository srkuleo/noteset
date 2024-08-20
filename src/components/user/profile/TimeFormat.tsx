import { useState } from "react";
import { Drawer } from "vaul";
import { twMerge } from "tailwind-merge";
import { updateUserTimeFormatPreference } from "@/util/actions/profile";
import { TimeIcon } from "@/components/icons/user/profile/time";

import { timeFormatValues, type TimeFormatType } from "@/util/types";
import { showToast } from "@/components/Toasts";

export const TimeFormat = ({
  selected,
  closeProfileDropDownMenu,
}: {
  selected: TimeFormatType;
  closeProfileDropDownMenu: () => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer.Root open={open} onOpenChange={setOpen} noBodyStyles>
      <button
        type="button"
        onClick={async () => {
          await new Promise((resolve) => setTimeout(resolve, 100));
          setOpen(true);
        }}
        className="flex w-full items-center justify-between rounded-t-modal px-4 py-2 focus:outline-none active:bg-slate-200 dark:active:bg-slate-700"
      >
        <p>Time format</p>

        {TimeIcon}

        <p className="sr-only">Time format button</p>
      </button>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[9999] bg-slate-900/40 backdrop-blur-sm dark:bg-slate-950/70" />

        <Drawer.Content
          aria-describedby={undefined}
          data-vaul-no-drag
          className="fixed inset-x-0 bottom-0 z-[9999] select-none space-y-4 px-4 pb-12 focus:outline-none"
        >
          <div className="flex flex-col divide-y divide-slate-400/40 rounded-modal bg-white/90 text-center dark:divide-slate-600 dark:bg-slate-700/70">
            {timeFormatValues.map((value, i) => (
              <button
                key={value}
                onClick={async () => {
                  await new Promise((resolve) => setTimeout(resolve, 100));
                  const res = await updateUserTimeFormatPreference(value);

                  if (res.status === "success" && res.message) {
                    showToast(res.message, "success");
                  }

                  closeProfileDropDownMenu();
                  setOpen(false);
                }}
                className={twMerge(
                  "p-3 font-manrope text-lg font-semibold text-blue-500 active:bg-slate-200 dark:border-slate-600 dark:text-blue-500 active:dark:bg-slate-600/90",
                  value === selected &&
                    "bg-white text-green-500 dark:bg-slate-900/50 dark:text-green-500",
                  i === 0 && "rounded-t-modal",
                  i === 2 && "rounded-b-modal",
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
