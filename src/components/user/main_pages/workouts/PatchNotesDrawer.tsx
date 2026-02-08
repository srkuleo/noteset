"use client"

import { useState } from "react"
import { Drawer } from "vaul"
import { PatchNotesIcon } from "@/components/icons/user/patchnote"

import { BUTTON_TIMEOUT, timeout } from "@/util/utils"

export const PatchNotesDrawer = () => {
  const [open, setOpen] = useState(false)

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <button
        type="button"
        onClick={async () => {
          await timeout(BUTTON_TIMEOUT)

          setOpen(true)
        }}
        className="rounded-full p-1.5 active:bg-slate-200 dark:text-slate-400 dark:active:bg-slate-700"
      >
        <PatchNotesIcon strokeWidth={1.5} className="size-7" />
      </button>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-sm dark:bg-slate-950/80" />

        <Drawer.Content
          aria-describedby={undefined}
          className="fixed inset-x-0 bottom-0 z-[9999] mx-0.5 flex max-h-[80%] flex-col rounded-t-4xl bg-white pb-6 focus:outline-none dark:bg-slate-900"
        >
          <div className="rounded-t-4xl border-b border-b-slate-200 bg-slate-200/55 py-3 dark:border-b-slate-700 dark:bg-slate-800">
            <Drawer.Handle className="bg-slate-300 dark:bg-slate-600" />

            <div className="flex items-center justify-between px-6 pt-3">
              <Drawer.Title className="font-bold text-slate-900 text-xl dark:text-white">
                Patch notes
              </Drawer.Title>

              <a
                href="https://github.com/srkuleo/noteset/releases"
                target="_blank"
                rel="noreferrer"
                className="text-green-500 text-xs italic"
              >
                Previous releases
              </a>
            </div>
          </div>

          <div className="flex flex-1 flex-col overflow-y-auto overscroll-y-contain px-6 pt-6 font-manrope">
            <Drawer.Description asChild>
              <div className="space-y-6">
                <p className="font-bold text-lg text-slate-900 leading-none sm:text-xl dark:text-white">
                  Release 0.9.7
                </p>

                <p className="font-semibold text-slate-800 leading-none sm:text-lg dark:text-slate-100">
                  UI and UX improvements
                </p>

                <ul className="list-disc space-y-3 text-pretty pl-4 text-sm sm:text-base dark:text-slate-300">
                  <li>
                    <span className="font-bold text-blue-500 italic dark:text-blue-400">
                      Modernized new look for creating/editing exercise
                    </span>
                  </li>

                  <li>
                    <span className="font-bold text-blue-500 italic dark:text-blue-400">
                      Option to remove workout from the logs
                    </span>{" "}
                    - On the Logs page, you can swipe any workout to remove it, allowing users to
                    get rid of accidentally pushed workouts or old/irrelevant workouts. Later will
                    add option to bulk delete more workouts via select option.
                  </li>

                  <li>
                    <span className="font-bold text-blue-500 italic dark:text-blue-400">
                      Easier to add sets inside exercise forms
                    </span>{" "}
                    - Now you can choose where to put each set without having to delete previous
                    ones. Also added option to remove each set manually.
                  </li>

                  <li>
                    <span className="font-bold text-blue-500 italic dark:text-blue-400">
                      Exercise and Set indicators
                    </span>{" "}
                    - New visual feature showing total number of exercises and sets per
                    workout/exercise.
                  </li>

                  <li>
                    <span className="font-bold text-blue-500 italic dark:text-blue-400">
                      Tab system for Current/Archived workouts
                    </span>{" "}
                    - Now separated into two different pages, acting as tabs. Diet page (coming
                    soon) moved to the footer with other icons.
                  </li>

                  <li>
                    <span className="font-semibold text-slate-600 dark:text-white">
                      Quick Delete for all form fields
                    </span>{" "}
                    - Instantly remove any input from form fields using an &quot;x&quot; button in
                    the workout/exercise forms.
                  </li>

                  <li>
                    <span className="font-semibold text-slate-600 dark:text-white">
                      Overall visual clarity improved
                    </span>{" "}
                    - Shadows, borders consistency, workout card size and swipe visuals across all
                    pages and many more.
                  </li>
                </ul>

                <p className="font-semibold text-slate-800 leading-none sm:text-lg dark:text-slate-100">
                  Bug fixes
                </p>

                <ul className="list-disc space-y-3 text-pretty pl-4 text-sm sm:text-base dark:text-slate-300">
                  <li>
                    <span className="font-semibold text-slate-600 dark:text-white">
                      Splash screen images loading properly
                    </span>{" "}
                    - Now all the major apple devices are supported and splash screen loads.{" "}
                    <span className="font-semibold text-slate-600 dark:text-white">
                      Recommended to delete Safari cache and reinstall app on the Home Screen.
                    </span>
                  </li>

                  <li>
                    <span className="font-semibold text-slate-600 dark:text-white">
                      User theme preference resolving properly
                    </span>{" "}
                    - Now resolves "system" theme as either "dark" or "light" for consistent styling
                    of footer buttons.
                  </li>

                  <li>
                    <span className="font-semibold text-slate-600 dark:text-white">
                      Animation inconsistency{" "}
                    </span>{" "}
                    - Now properly renders footer on the post-workout page alongside edit form.
                  </li>

                  <li>
                    <span className="font-semibold text-slate-600 dark:text-white">
                      All exercises without sets properly shown as skipped{" "}
                    </span>{" "}
                    - No longer throws error on the older workouts where if there was no sets in an
                    exercise, sets property would default to null breaking .length check on each
                    exercise.
                  </li>
                </ul>
              </div>
            </Drawer.Description>
          </div>

          <button
            type="button"
            onClick={async () => {
              await timeout(BUTTON_TIMEOUT)

              setOpen(false)
            }}
            className="m-6 gap-1 rounded-lg bg-slate-800 py-2 text-center font-bold text-white focus:outline-none active:bg-slate-600 dark:bg-white dark:font-extrabold dark:text-slate-800 active:dark:bg-slate-300"
          >
            Got it!
          </button>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
