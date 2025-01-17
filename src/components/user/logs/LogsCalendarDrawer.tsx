import { useState } from "react";
import { Drawer } from "vaul";
import { timeout, BUTTON_TIMEOUT } from "@/util/utils";

export const LogsCalendarDrawer = () => {
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
          await timeout(BUTTON_TIMEOUT);
          setOpen(true);
        }}
        className="rounded-2xl bg-white p-2.5 shadow-md ring-1 ring-slate-300 active:scale-95 active:bg-slate-200 dark:bg-slate-800 dark:ring-slate-700 dark:active:bg-slate-700"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
          />
        </svg>

        <p className="sr-only">Search logs on calendar</p>
      </button>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[9999] bg-slate-900/40 backdrop-blur-sm dark:bg-slate-950/70" />

        <Drawer.Content
          aria-describedby={undefined}
          className="fixed inset-x-0 bottom-0 z-[9999] select-none px-1 focus:outline-none"
        >
          <div className="rounded-t-modal bg-white pb-safe-bottom ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700/70">
            <div className="flex flex-col px-8 pb-4 pt-2">
              <Drawer.Handle className="bg-slate-300 dark:bg-slate-500" />

              <div className="py-20 text-center font-manrope text-lg italic">
                Coming soon...
              </div>

              <button
                onClick={async () => {
                  await timeout(BUTTON_TIMEOUT);

                  setOpen(false);
                }}
                className="rounded-lg bg-slate-800 py-2 font-bold text-white active:bg-slate-600 dark:bg-white dark:font-extrabold dark:text-slate-800 active:dark:bg-slate-300"
              >
                Close
              </button>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
