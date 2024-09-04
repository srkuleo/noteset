"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { InformationIcon } from "./icons/user/information";

export const HomePageTooltip = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <button
        type="button"
        onClick={async () => {
          await new Promise((resolve) => setTimeout(resolve, 100));
          setOpen(true);
        }}
        className={`ml-auto mr-1.5 rounded-full p-1.5 text-slate-400 active:bg-slate-200 dark:text-slate-500 dark:active:bg-slate-700 ${open && "z-20 scale-125 text-white transition-all dark:text-white"}`}
      >
        <InformationIcon className="size-7" />
      </button>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-10 bg-slate-700/45 backdrop-blur-sm data-[state=closed]:animate-overlay-hide data-[state=open]:animate-overlay-show dark:bg-slate-950/45" />

        <Dialog.Content className="absolute right-[82px] top-32 z-10 max-w-[75%] pt-safe-top data-[state=closed]:animate-dropdown-menu-scale-down data-[state=open]:animate-dropdown-menu-scale-up sm:max-w-sm">
          <div className="flex flex-col gap-4 rounded-modal bg-white/75 p-6 ring-1 ring-slate-400/80 dark:bg-slate-800/85 dark:ring-slate-700">
            <Dialog.Title className="text-lg text-slate-800 dark:text-white sm:text-xl">
              Good to Know
            </Dialog.Title>

            <Dialog.Description asChild>
              <div className="flex-1 space-y-2 overflow-scroll overscroll-contain pb-2">
                <p className="text-sm font-semibold italic text-slate-700 dark:text-slate-200 sm:text-base">
                  Each status has its own meaning and knowing them will improve
                  the way you use the app.
                </p>

                <ul className="space-y-2 text-pretty pl-2 text-sm dark:text-slate-300 sm:text-base">
                  <li>
                    <span className="font-bold uppercase text-blue-400 dark:text-blue-500">
                      current -
                    </span>{" "}
                    a workout that you&apos;re actively doing or regularly
                    repeating.
                  </li>

                  <li>
                    <span className="font-bold uppercase text-green-500 dark:text-green-600">
                      done -
                    </span>{" "}
                    a workout that has been completed and saved as a log for
                    future reference.
                  </li>

                  <li>
                    <span className="font-bold uppercase text-slate-500 dark:text-slate-600">
                      archived -
                    </span>{" "}
                    a workout that doesn&apos;t appear on your Home page but
                    isn&apos;t permanently removed. It can be returned to{" "}
                    <span className="font-bold uppercase text-blue-400 dark:text-blue-500">
                      current
                    </span>{" "}
                    status at any time.
                  </li>
                </ul>
              </div>
            </Dialog.Description>

            <button
              type="button"
              onClick={async () => {
                await new Promise((resolve) => setTimeout(resolve, 100));
                setOpen(false);
              }}
              className="rounded-lg bg-slate-800 py-2 font-bold text-white outline-none active:bg-slate-600 dark:bg-white dark:font-extrabold dark:text-slate-800 active:dark:bg-slate-300"
            >
              Got it!
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export const AddOrEditWorkoutTooltip = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <button
        type="button"
        onClick={async () => {
          await new Promise((resolve) => setTimeout(resolve, 100));
          setOpen(true);
        }}
        className={`ml-auto mr-1.5 rounded-full p-1.5 text-slate-400 active:bg-slate-200 dark:text-slate-500 dark:active:bg-slate-700 ${open && "z-20 scale-125 text-white transition-all dark:text-white"}`}
      >
        <InformationIcon className="size-7" />
      </button>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-10 bg-slate-700/45 backdrop-blur-sm data-[state=closed]:animate-overlay-hide data-[state=open]:animate-overlay-show dark:bg-slate-950/45" />

        <Dialog.Content className="absolute right-8 top-32 z-10 max-w-[75%] pt-safe-top data-[state=closed]:animate-dropdown-menu-scale-down data-[state=open]:animate-dropdown-menu-scale-up sm:max-w-sm">
          <div className="flex flex-col gap-4 rounded-modal bg-white/75 p-6 ring-1 ring-slate-400/80 dark:bg-slate-800/85 dark:text-slate-400 dark:ring-slate-700">
            <Dialog.Title className="text-lg text-slate-800 dark:text-white sm:text-xl">
              Good to Know
            </Dialog.Title>

            <Dialog.Description asChild>
              <ul className="list-disc space-y-2 text-pretty pl-4 text-sm sm:text-base">
                <li>
                  Fields with &quot;e.g.&quot; or &quot;Rep 1, Weight 1&quot;
                  don&apos;t carry any value.{" "}
                  <span className="font-bold text-slate-800 dark:text-white">
                    Those must be provided with data.
                  </span>
                </li>

                <li>
                  You need to add{" "}
                  <span className="font-bold uppercase text-slate-800 dark:text-white">
                    at least one exercise
                  </span>{" "}
                  before submitting the form otherwise it will result in error.
                </li>

                <li>
                  Tap{" "}
                  <span className="font-bold uppercase text-violet-400 dark:text-violet-400">
                    plus
                  </span>{" "}
                  button to add a new exercise.
                </li>

                <li>
                  When done with creating / editing your workout, tap{" "}
                  <span className="font-bold uppercase text-green-500 dark:text-green-600">
                    create / save
                  </span>{" "}
                  button to submit the form.
                </li>
              </ul>
            </Dialog.Description>

            <button
              type="button"
              onClick={async () => {
                await new Promise((resolve) => setTimeout(resolve, 100));
                setOpen(false);
              }}
              className="rounded-lg bg-slate-800 py-2 font-bold text-white outline-none active:bg-slate-600 dark:bg-white dark:font-extrabold dark:text-slate-800 active:dark:bg-slate-300"
            >
              Got it!
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export const WorkoutToDoTooltip = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <button
        type="button"
        onClick={async () => {
          await new Promise((resolve) => setTimeout(resolve, 100));
          setOpen(true);
        }}
        className={`rounded-full p-1.5 text-white ${open && "z-20 scale-125 text-white transition-all"}`}
      >
        <InformationIcon className="size-7" />
      </button>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-10 bg-slate-700/45 backdrop-blur-sm data-[state=closed]:animate-overlay-hide data-[state=open]:animate-overlay-show dark:bg-slate-950/45" />

        <Dialog.Content className="absolute right-7 top-[52px] z-10 max-w-[75%] pt-safe-top data-[state=closed]:animate-dropdown-menu-scale-down data-[state=open]:animate-dropdown-menu-scale-up sm:max-w-sm">
          <div className="flex h-[500px] flex-col gap-4 rounded-modal bg-white/75 p-6 ring-1 ring-slate-400/80 dark:bg-slate-800/85 dark:text-slate-400 dark:ring-slate-700">
            <Dialog.Title className="text-lg text-slate-800 dark:text-white sm:text-xl">
              Good to Know
            </Dialog.Title>

            <Dialog.Description asChild>
              <div className="flex-1 space-y-2 overflow-scroll overscroll-contain pb-2">
                <ul className="list-disc space-y-2 text-wrap pl-4 text-sm sm:text-base">
                  <li>
                    <span className="font-bold text-slate-800 dark:text-white">
                      You don&apos;t have to populate all the exercise fields
                    </span>
                    , only those that you have done.
                  </li>

                  <li>
                    <span className="font-bold uppercase text-slate-800 dark:text-white">
                      Add set
                    </span>{" "}
                    button allows you to add additional set for the selected
                    exercise.
                  </li>

                  <li>
                    <span className="font-bold uppercase text-slate-800 dark:text-white">
                      Add note
                    </span>{" "}
                    button lets you leave a note regarding selected exercise.
                    Use it to leave useful tips for the next workout - e.g. 5-7
                    24kg next workout.
                  </li>

                  <li>
                    Workout duration is being{" "}
                    <span className="font-bold text-slate-800 dark:text-white">
                      tracked in the background.
                    </span>{" "}
                    You will be able to see the exact duration on the
                    post-workout page.
                  </li>

                  <li>
                    Tap{" "}
                    <span className="font-bold uppercase text-green-500 dark:text-green-600">
                      plus
                    </span>{" "}
                    button to add a new exercise.
                  </li>

                  <li>
                    Tap{" "}
                    <span className="font-bold uppercase text-red-500">
                      trash bin
                    </span>{" "}
                    button to enter remove mode. In this mode you can remove any
                    set from any exercise.
                    <br />
                    <span className="text-base font-bold text-green-500 dark:text-green-600">
                      Save
                    </span>{" "}
                    button - applies all the changes. <br />
                    <span className="text-base text-slate-500 dark:text-slate-300">
                      Close
                    </span>{" "}
                    button - exit remove mode without making any changes.
                  </li>

                  <li>
                    When done with working out, tap{" "}
                    <span className="font-bold uppercase text-green-500 dark:text-green-600">
                      Done
                    </span>{" "}
                    button to submit the form.
                  </li>
                </ul>
              </div>
            </Dialog.Description>

            <button
              type="button"
              onClick={async () => {
                await new Promise((resolve) => setTimeout(resolve, 100));
                setOpen(false);
              }}
              className="rounded-lg bg-slate-800 py-2 font-bold text-white outline-none active:bg-slate-600 dark:bg-white dark:font-extrabold dark:text-slate-800 active:dark:bg-slate-300"
            >
              Got it!
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export const PostWorkoutTooltip = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <button
        type="button"
        onClick={async () => {
          await new Promise((resolve) => setTimeout(resolve, 100));
          setOpen(true);
        }}
        className={`ml-auto mr-1.5 rounded-full p-1.5 text-slate-400 active:bg-slate-200 dark:text-slate-500 dark:active:bg-slate-700 ${open && "z-20 scale-125 text-white transition-all dark:text-white"}`}
      >
        <InformationIcon className="size-7" />
      </button>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-10 bg-slate-700/45 backdrop-blur-sm data-[state=closed]:animate-overlay-hide data-[state=open]:animate-overlay-show dark:bg-slate-950/45" />

        <Dialog.Content className="absolute right-[82px] top-32 z-10 max-w-[75%] pt-safe-top data-[state=closed]:animate-dropdown-menu-scale-down data-[state=open]:animate-dropdown-menu-scale-up sm:max-w-sm">
          <div className="flex h-[500px] flex-col gap-4 rounded-modal bg-white/75 p-6 ring-1 ring-slate-400/80 dark:bg-slate-800/85 dark:text-slate-400 dark:ring-slate-700">
            <Dialog.Title className="text-lg text-slate-800 dark:text-white sm:text-xl">
              Good to Know
            </Dialog.Title>

            <Dialog.Description asChild>
              <div className="flex-1 space-y-2 overflow-scroll overscroll-contain pb-2">
                <ul className="list-disc space-y-2 text-pretty pl-4 text-sm sm:text-base">
                  <li>
                    Tap{" "}
                    <span className="font-bold uppercase text-slate-800 dark:text-white">
                      home
                    </span>{" "}
                    button to go to the Home page without making any changes to
                    you current workout. The workout you&apos;ve completed will
                    be saved and viewable in logs.
                  </li>

                  <li>
                    <span className="font-bold uppercase text-slate-800 dark:text-white">
                      Yes, edit
                    </span>{" "}
                    button allows you to enter edit mode. This mode shows your
                    next session of current workout and in here you can edit
                    that workout after comparing it to the workout you
                    submitted.
                  </li>

                  <li>
                    Tap{" "}
                    <span className="font-bold uppercase text-slate-800 dark:text-white">
                      View logs
                    </span>{" "}
                    button to see all your previously done workouts together
                    with the latest one you&apos;ve just submitted. Behaves the
                    same way Home button does.
                  </li>

                  <li>
                    Tap{" "}
                    <span className="font-bold uppercase text-slate-800 dark:text-white">
                      eye
                    </span>{" "}
                    button to show a preview of the latest completed workout.
                    Here you can see notes you left behind which should serve as
                    guidelines to editing your next session.
                  </li>
                </ul>

                <p className="font-manrope text-lg font-bold text-slate-800 dark:text-white sm:text-xl">
                  In edit mode
                </p>

                <ul className="list-disc space-y-2 text-pretty pl-4 text-sm sm:text-base">
                  <li>
                    Tap{" "}
                    <span className="font-bold uppercase text-violet-400 dark:text-violet-400">
                      plus
                    </span>{" "}
                    button to add a new exercise to your next session.
                  </li>

                  <li>
                    When done with editing your next session, tap{" "}
                    <span className="font-bold uppercase text-green-500 dark:text-green-600">
                      save
                    </span>{" "}
                    button to save the changes.
                  </li>
                </ul>
              </div>
            </Dialog.Description>

            <button
              type="button"
              onClick={async () => {
                await new Promise((resolve) => setTimeout(resolve, 100));
                setOpen(false);
              }}
              className="rounded-lg bg-slate-800 py-2 font-bold text-white outline-none active:bg-slate-600 dark:bg-white dark:font-extrabold dark:text-slate-800 active:dark:bg-slate-300"
            >
              Got it!
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
