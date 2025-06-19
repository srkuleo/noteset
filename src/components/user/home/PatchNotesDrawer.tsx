"use client";

import { useState } from "react";
import { Drawer } from "vaul";
import { PatchNotesIcon } from "@/components/icons/user/patchnote";

import { timeout, BUTTON_TIMEOUT } from "@/util/utils";

export const PatchNotesDrawer = () => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <button
        type="button"
        onClick={async () => {
          await timeout(BUTTON_TIMEOUT);

          setOpen(true);
        }}
        className="rounded-full p-1.5 text-slate-400 active:bg-slate-200 dark:text-white dark:active:bg-slate-700"
      >
        <PatchNotesIcon strokeWidth={1.5} className="size-7" />
      </button>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[9999] bg-slate-900/40 backdrop-blur-sm dark:bg-slate-950/70" />

        <Drawer.Content
          aria-describedby={undefined}
          className="fixed inset-x-0 bottom-0 z-[9999] mx-2 flex max-h-[80%] flex-col rounded-t-modal bg-white pb-8 ring-1 ring-slate-200 focus:outline-none dark:bg-slate-900 dark:ring-slate-700/70"
        >
          <div className="mb-6 rounded-t-modal border-b border-b-slate-300/50 bg-slate-200/55 py-3 dark:border-b-slate-700/70 dark:bg-slate-800">
            <Drawer.Handle className="bg-slate-300 dark:bg-slate-600" />

            <div className="flex items-center justify-between px-6 pt-3">
              <Drawer.Title className="text-xl font-bold text-slate-900 dark:text-white">
                Patch notes
              </Drawer.Title>

              <a
                href="https://github.com/srkuleo/noteset/releases"
                target="_blank"
                rel="noreferrer"
                className="text-xs italic text-green-500"
              >
                Previous releases
              </a>
            </div>
          </div>

          <div className="flex flex-1 flex-col overflow-y-auto overscroll-y-contain px-6 font-manrope">
            <Drawer.Description asChild>
              <div className="space-y-6">
                <p className="font-manrope text-lg font-bold leading-none text-slate-900 dark:text-white sm:text-xl">
                  Release 0.9.6
                </p>

                <p className="font-manrope font-semibold leading-none text-slate-800 dark:text-slate-100 sm:text-lg">
                  UI and UX improvements
                </p>

                <ul className="list-disc space-y-3 text-pretty pl-4 text-sm dark:text-slate-300 sm:text-base">
                  <li>
                    <span className="font-bold italic text-blue-500 dark:text-blue-400">
                      Major update
                    </span>{" "}
                    -{" "}
                    <span className="font-semibold text-slate-600 dark:text-white">
                      New form field: Movement Type.{" "}
                    </span>{" "}
                    Now you can choose between unilateral or bilateral to better
                    calculate working sets and manage fatigue for each exercise.
                  </li>

                  <li>
                    <span className="font-bold italic text-blue-500 dark:text-blue-400">
                      Major update
                    </span>{" "}
                    -{" "}
                    <span className="font-semibold text-slate-600 dark:text-white">
                      Preview Workout Drawer Rewamp.{" "}
                    </span>
                    Redesigned for a cleaner, easier-to-navigate experience.
                    Includes a tooltip (info icon) with workout planning tips
                    and a color legend.
                  </li>

                  <li>
                    <span className="font-bold italic text-blue-500 dark:text-blue-400">
                      Major update
                    </span>{" "}
                    -{" "}
                    <span className="font-semibold text-slate-600 dark:text-white">
                      Patch Notes Drawer.{" "}
                    </span>
                    Quickly view all new features and fixes added to the Noteset
                    app.
                  </li>

                  <li>
                    <span className="font-bold italic text-blue-500 dark:text-blue-400">
                      Major update
                    </span>{" "}
                    -{" "}
                    <span className="font-semibold text-slate-600 dark:text-white">
                      Updated Workout Switching.{" "}
                    </span>{" "}
                    Switched from a toggle to a dropdown menu for navigating
                    between current and archived workouts. Also introduces a new
                    &quot;Diet&quot; page (work in progress) and a route
                    indicator for better page distinction.
                  </li>

                  <li>
                    <span className="font-bold italic text-blue-500 dark:text-blue-400">
                      Major update
                    </span>{" "}
                    -{" "}
                    <span className="font-semibold text-slate-600 dark:text-white">
                      Progression Bar{" "}
                    </span>{" "}
                    - Replaces the old exercise counter on the WorkoutToDo page
                    with a new version where tapping any rectangle takes you to
                    its corresponding exercise.
                  </li>

                  <li>
                    <span className="font-semibold text-slate-600 dark:text-white">
                      Tooltip Drawers{" "}
                    </span>{" "}
                    - Now scale up to 80% of the screen and become scrollable
                    for easier reading.
                  </li>

                  <li>
                    <span className="font-semibold text-slate-600 dark:text-white">
                      Improved Password Fields{" "}
                    </span>{" "}
                    - More consistent and polished look on both signup and login
                    pages.
                  </li>
                  <li>
                    <span className="font-semibold text-slate-600 dark:text-white">
                      Quick Delete for Notes{" "}
                    </span>{" "}
                    - Instantly remove workout descriptions and exercise notes
                    using an &quot;x&quot; button in the create/edit forms.
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
                    - Minor enhancements on forms, header buttons on home and
                    post workout pages.
                  </li>
                </ul>

                <p className="font-manrope font-semibold leading-none text-slate-800 dark:text-slate-100 sm:text-lg">
                  Bug fixes
                </p>

                <ul className="list-disc space-y-3 text-pretty pl-4 text-sm dark:text-slate-300 sm:text-base">
                  <li>
                    <span className="font-semibold text-slate-600 dark:text-white">
                      Unblocked UI After Actions{" "}
                    </span>{" "}
                    - Remove workout drawer buttons on home and archived workout
                    pages no longer freeze after deleting or archiving a
                    workout.
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
                    - Now are properly being registered and updated after
                    submitting a form on post-workout page.
                  </li>

                  <li>
                    <span className="font-semibold text-slate-600 dark:text-white">
                      Workout To Do Form Bug Fix{" "}
                    </span>{" "}
                    - No longer resets all the data inside form fields if
                    workout submission results in error.
                  </li>
                </ul>
              </div>
            </Drawer.Description>
          </div>

          <button
            onClick={async () => {
              await timeout(BUTTON_TIMEOUT);

              setOpen(false);
            }}
            className="m-6 gap-1 rounded-lg bg-slate-800 py-2 text-center font-bold text-white focus:outline-none active:bg-slate-600 dark:bg-white dark:font-extrabold dark:text-slate-800 active:dark:bg-slate-300"
          >
            Got it!
          </button>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
