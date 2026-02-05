"use client"

import Link from "next/link"
import { useState } from "react"
import { Drawer } from "vaul"
import { BUTTON_TIMEOUT, timeout } from "@/util/utils"
import { ArrowLeftIcon } from "./icons/arrows"

export const BackButtonModal = ({ className }: { className: string }) => {
  const [open, setOpen] = useState(false)

  return (
    <Drawer.Root open={open} onOpenChange={setOpen} noBodyStyles disablePreventScroll>
      <button
        type="button"
        onClick={async () => {
          await timeout(BUTTON_TIMEOUT)
          setOpen(true)
        }}
        className={className}
      >
        {ArrowLeftIcon}

        <p className="sr-only">Logout button</p>
      </button>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[9999] bg-slate-900/40 backdrop-blur-sm dark:bg-slate-950/70" />

        <Drawer.Content
          aria-describedby={undefined}
          data-vaul-no-drag
          className="fixed inset-x-0 bottom-0 z-[9999] select-none space-y-4 px-4 pb-12 focus:outline-none"
        >
          <div className="flex flex-col gap-3 rounded-lg+ bg-white/90 text-center dark:bg-slate-700/70">
            <Drawer.Title className="px-2 pt-5 pb-2 font-semibold text-sm">
              Are you sure you want to leave?
            </Drawer.Title>

            <Link
              href="/current"
              className="w-full rounded-b-lg+ border-slate-400/40 border-t p-3 font-manrope font-semibold text-green-500 text-lg focus:outline-none active:bg-slate-200 disabled:bg-slate-300/55 disabled:text-green-500/75 dark:border-slate-600 disabled:dark:bg-slate-900/75 disabled:dark:text-green-800 active:dark:bg-slate-600/90"
            >
              Back to workouts
            </Link>
          </div>

          <button
            type="button"
            onClick={async () => {
              await timeout(BUTTON_TIMEOUT)
              setOpen(false)
            }}
            className="w-full rounded-lg+ bg-white p-3 font-bold text-violet-500 text-xl focus:outline-none active:bg-slate-200 dark:bg-slate-700 dark:text-violet-400 active:dark:bg-slate-600/90"
          >
            Cancel
          </button>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
