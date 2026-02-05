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
                  Release 0.9.6
                </p>

                <p className="font-semibold text-slate-800 leading-none sm:text-lg dark:text-slate-100">
                  UI and UX improvements
                </p>

                <ul className="list-disc space-y-3 text-pretty pl-4 text-sm sm:text-base dark:text-slate-300">
                  <li>
                    <span className="font-bold text-blue-500 italic dark:text-blue-400">
                      Major update
                    </span>{" "}
                    -{" "}
                    <span className="font-semibold text-slate-600 dark:text-white">
                      New form field: Movement Type.{" "}
                    </span>{" "}
                    Now you can choose between unilateral or bilateral to better calculate working
                    sets and manage fatigue for each exercise.
                  </li>

                  <li>
                    <span className="font-bold text-blue-500 italic dark:text-blue-400">
                      Major update
                    </span>{" "}
                    -{" "}
                    <span className="font-semibold text-slate-600 dark:text-white">
                      Preview Workout Drawer Rewamp.{" "}
                    </span>
                    Redesigned for a cleaner, easier-to-navigate experience. Includes a tooltip
                    (info icon) with workout planning tips and a color legend.
                  </li>

                  <li>
                    <span className="font-bold text-blue-500 italic dark:text-blue-400">
                      Major update
                    </span>{" "}
                    -{" "}
                    <span className="font-semibold text-slate-600 dark:text-white">
                      Patch Notes Drawer.{" "}
                    </span>
                    Quickly view all new features and fixes added to the Noteset app.
                  </li>

                  <li>
                    <span className="font-bold text-blue-500 italic dark:text-blue-400">
                      Major update
                    </span>{" "}
                    -{" "}
                    <span className="font-semibold text-slate-600 dark:text-white">
                      Updated Workout Switching.{" "}
                    </span>{" "}
                    Switched from a toggle to a dropdown menu for navigating between current and
                    archived workouts. Also introduces a new &quot;Diet&quot; page (work in
                    progress) and a route indicator for better page distinction.
                  </li>

                  <li>
                    <span className="font-bold text-blue-500 italic dark:text-blue-400">
                      Major update
                    </span>{" "}
                    -{" "}
                    <span className="font-semibold text-slate-600 dark:text-white">
                      Progression Bar{" "}
                    </span>{" "}
                    - Replaces the old exercise counter on the WorkoutToDo page with a new version
                    where tapping any rectangle takes you to its corresponding exercise.
                  </li>

                  <li>
                    <span className="font-semibold text-slate-600 dark:text-white">
                      Tooltip Drawers{" "}
                    </span>{" "}
                    - Now scale up to 80% of the screen and become scrollable for easier reading.
                  </li>

                  <li>
                    <span className="font-semibold text-slate-600 dark:text-white">
                      Improved Password Fields{" "}
                    </span>{" "}
                    - More consistent and polished look on both signup and login pages.
                  </li>
                  <li>
                    <span className="font-semibold text-slate-600 dark:text-white">
                      Quick Delete for Notes{" "}
                    </span>{" "}
                    - Instantly remove workout descriptions and exercise notes using an
                    &quot;x&quot; button in the create/edit forms.
                  </li>

                  <li>
                    <span className="font-semibold text-slate-600 dark:text-white">
                      Improved Error Messages{" "}
                    </span>{" "}
                    - Minor enhancements for clarity and consistency.
                  </li>

                  <li>
                    <span className="font-semibold text-slate-600 dark:text-white">
                      Overall Visual Clarity Improved{" "}
                    </span>{" "}
                    - Minor enhancements on forms, header buttons on home and post workout pages.
                  </li>
                </ul>

                <p className="font-semibold text-slate-800 leading-none sm:text-lg dark:text-slate-100">
                  Bug fixes
                </p>

                <ul className="list-disc space-y-3 text-pretty pl-4 text-sm sm:text-base dark:text-slate-300">
                  <li>
                    <span className="font-semibold text-slate-600 dark:text-white">
                      Unblocked UI After Actions{" "}
                    </span>{" "}
                    - Remove workout drawer buttons on home and archived workout pages no longer
                    freeze after deleting or archiving a workout.
                  </li>

                  <li>
                    <span className="font-semibold text-slate-600 dark:text-white">
                      Password Input Bug Fixes{" "}
                    </span>{" "}
                    - Minor fixes related to padding and borders.
                  </li>

                  <li>
                    <span className="font-semibold text-slate-600 dark:text-white">
                      Title and Description Input Field Bug Fix{" "}
                    </span>{" "}
                    - Now are properly being registered and updated after submitting a form on
                    post-workout page.
                  </li>

                  <li>
                    <span className="font-semibold text-slate-600 dark:text-white">
                      Workout To Do Form Bug Fix{" "}
                    </span>{" "}
                    - No longer resets all the data inside form fields if workout submission results
                    in error.
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
