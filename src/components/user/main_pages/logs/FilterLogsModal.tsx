"use client"

import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { useState } from "react"
import { twMerge } from "tailwind-merge"
import { Drawer } from "vaul"
import { showToast } from "@/components/Toasts"
import { updateUserLogsOrderPreference } from "@/util/actions/preferences"
import { LOGS_ORDER_VALUES, type LogsOrderType } from "@/util/types"
import { BUTTON_TIMEOUT, timeout } from "@/util/utils"

export const FilterLogsModal = ({ selected }: { selected: LogsOrderType }) => {
  const [open, setOpen] = useState(false)

  return (
    <Drawer.Root open={open} onOpenChange={setOpen} noBodyStyles disablePreventScroll>
      <button
        type="button"
        onClick={async () => {
          await timeout(BUTTON_TIMEOUT)

          setOpen(true)
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
            d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
          />
        </svg>

        <p className="sr-only">Change logs order</p>
      </button>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[9999] bg-slate-900/40 backdrop-blur-sm dark:bg-slate-950/70" />

        <Drawer.Content
          aria-describedby={undefined}
          data-vaul-no-drag
          className="fixed inset-x-0 bottom-0 z-[9999] select-none space-y-4 px-4 pb-12 focus:outline-none"
        >
          <VisuallyHidden asChild>
            <Drawer.Title>Choose a logs order</Drawer.Title>
          </VisuallyHidden>

          <div className="flex flex-col divide-y divide-slate-400/40 rounded-lg+ bg-white/90 text-center dark:divide-slate-600 dark:bg-slate-700/70">
            {LOGS_ORDER_VALUES.map((value) => (
              <button
                key={value}
                type="button"
                onClick={async () => {
                  await timeout(BUTTON_TIMEOUT)

                  const res = await updateUserLogsOrderPreference(value, "")

                  setOpen(false)
                  showToast(res.message)
                }}
                className={twMerge(
                  "p-3 font-manrope font-semibold text-blue-500 text-lg first:rounded-t-lg+ last:rounded-b-lg+ active:bg-slate-200 dark:border-slate-600 dark:text-blue-400 active:dark:bg-slate-600/90",
                  value === selected &&
                    "bg-white text-green-500 dark:bg-slate-900/50 dark:text-green-500"
                )}
              >
                {value}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={async () => {
              await timeout(BUTTON_TIMEOUT)

              setOpen(false)
            }}
            className="w-full rounded-lg+ bg-white p-3 font-bold text-xl focus:outline-none active:bg-slate-200 dark:bg-slate-700 dark:active:bg-slate-600/90"
          >
            Cancel
          </button>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
