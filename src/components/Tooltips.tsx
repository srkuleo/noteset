"use client";

import { useState } from "react";
import { Drawer } from "vaul";
import { InformationIcon } from "./icons/user/information";

export const LandingPageTooltip = () => {
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
          await new Promise((resolve) => setTimeout(resolve, 100));
          setOpen(true);
        }}
        className="rounded-full px-6 py-2 font-manrope font-semibold text-slate-600 shadow-md ring-1 ring-slate-400/40 active:scale-95 active:bg-slate-50 dark:text-white dark:ring-slate-400 dark:active:bg-slate-800"
      >
        Tooltip
      </button>

      <TooltipDrawer closeDrawer={() => setOpen(false)}>
        <div className="space-y-6">
          <p className="text-lg text-slate-500 dark:text-slate-300">
            For better user experience
          </p>

          <div className="space-y-2 pl-4">
            <p className="font-bold text-slate-800 dark:text-white">
              <span className="text-xs font-semibold uppercase text-slate-400">
                android:
              </span>{" "}
              install PWA
            </p>

            <p className="font-bold text-slate-800 dark:text-white">
              <span className="text-xs font-semibold uppercase text-slate-400">
                iphone:
              </span>{" "}
              add website to Home Screen
            </p>
          </div>

          <div className="space-y-2 pb-8">
            <p className="text-slate-500 dark:text-slate-300">
              You don&apos;t have to login here. Do it in the PWA.
            </p>

            <p className="text-slate-500 dark:text-slate-300">
              Installing or adding to Home screen will save workouts page as
              startup page.
            </p>
          </div>
        </div>
      </TooltipDrawer>
    </Drawer.Root>
  );
};

export const HomePageTooltip = () => {
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
          await new Promise((resolve) => setTimeout(resolve, 100));
          setOpen(true);
        }}
        className="ml-auto mr-1.5 rounded-full p-1.5 text-slate-400 active:bg-slate-200 dark:text-slate-500 dark:active:bg-slate-700"
      >
        <InformationIcon className="size-7" />
      </button>

      <TooltipDrawer closeDrawer={() => setOpen(false)}>
        <div className="space-y-4">
          <p className="font-manrope text-lg font-bold text-slate-800 dark:text-white sm:text-xl">
            Workout statuses
          </p>

          <ul className="list-disc space-y-4 text-pretty pb-8 pl-4 text-sm dark:text-slate-300 sm:text-base">
            <li>
              <span className="font-bold uppercase text-blue-400 dark:text-blue-500">
                current -
              </span>{" "}
              a workout that you&apos;re actively doing or regularly repeating.
            </li>

            <li>
              <span className="font-bold uppercase text-green-500 dark:text-green-600">
                done -
              </span>{" "}
              a workout that has been completed and saved as a log for future
              reference.
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
      </TooltipDrawer>
    </Drawer.Root>
  );
};

export const AddOrEditWorkoutTooltip = () => {
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
          await new Promise((resolve) => setTimeout(resolve, 100));
          setOpen(true);
        }}
        className="ml-auto mr-1.5 rounded-full p-1.5 text-slate-400 active:bg-slate-200 dark:text-slate-500 dark:active:bg-slate-700"
      >
        <InformationIcon className="size-7" />
      </button>

      <TooltipDrawer closeDrawer={() => setOpen(false)}>
        <div className="space-y-4">
          <p className="font-manrope text-lg font-bold text-slate-800 dark:text-white sm:text-xl">
            Add / Edit form
          </p>

          <ul className="list-disc space-y-4 text-pretty pb-8 pl-4 text-sm dark:text-slate-300 sm:text-base">
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
        </div>
      </TooltipDrawer>
    </Drawer.Root>
  );
};

export const WorkoutToDoTooltip = () => {
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
          await new Promise((resolve) => setTimeout(resolve, 100));
          setOpen(true);
        }}
        className="rounded-full p-1.5 text-white"
      >
        <InformationIcon className="size-7" />
      </button>

      <TooltipDrawer closeDrawer={() => setOpen(false)}>
        <div className="space-y-4">
          <p className="font-manrope text-lg font-bold text-slate-800 dark:text-white sm:text-xl">
            Workout to do form
          </p>

          <ul className="list-disc space-y-4 text-pretty pb-8 pl-4 text-sm dark:text-slate-300 sm:text-base">
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
              button allows you to add additional set for the selected exercise.
            </li>

            <li>
              <span className="font-bold uppercase text-slate-800 dark:text-white">
                Add note
              </span>{" "}
              button lets you leave a note regarding selected exercise. Use it
              to leave useful tips for the next workout - e.g. 5-7 24kg next
              workout.
            </li>

            <li>
              Workout duration is being{" "}
              <span className="font-bold text-slate-800 dark:text-white">
                tracked in the background.
              </span>{" "}
              You will be able to see the exact duration on the post-workout
              page.
            </li>

            <li>
              Tap <span className="font-bold uppercase">plus</span> button to
              add a new exercise.
            </li>

            <li>
              Tap{" "}
              <span className="font-bold uppercase text-red-500">
                trash bin
              </span>{" "}
              button to enter remove mode, where you can delete any set from any
              exercise.
              <br />
              <span className="text-base font-bold text-green-500 dark:text-green-600">
                Save
              </span>{" "}
              - applies all changes. <br />
              <span className="text-base text-slate-500 dark:text-slate-300">
                Close
              </span>{" "}
              - exits remove mode without saving changes.
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
      </TooltipDrawer>
    </Drawer.Root>
  );
};

export const PostWorkoutTooltip = () => {
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
          await new Promise((resolve) => setTimeout(resolve, 100));
          setOpen(true);
        }}
        className="ml-auto mr-1.5 rounded-full p-1.5 text-slate-400 active:bg-slate-200 dark:text-slate-500 dark:active:bg-slate-700"
      >
        <InformationIcon className="size-7" />
      </button>

      <TooltipDrawer closeDrawer={() => setOpen(false)}>
        <div className="space-y-4">
          <p className="font-manrope text-lg font-bold text-slate-800 dark:text-white sm:text-xl">
            Post workout page
          </p>

          <ul className="list-disc space-y-4 overflow-scroll text-pretty pl-4 text-sm dark:text-slate-300 sm:text-base">
            <li>
              Tap{" "}
              <span className="font-bold uppercase text-slate-800 dark:text-white">
                home
              </span>{" "}
              button to go to the Home page without making any changes to you
              next workout. The workout you&apos;ve previously completed will be
              saved and viewable in logs.
            </li>

            <li>
              Tap{" "}
              <span className="font-bold uppercase text-slate-800 dark:text-white">
                Yes, edit
              </span>{" "}
              button to enter edit mode. In this mode, you can view your next
              workout session, compare it to the last one and make any necessary
              changes accordingly.
            </li>

            <li>
              Tap{" "}
              <span className="font-bold uppercase text-slate-800 dark:text-white">
                View logs
              </span>{" "}
              button to see all your previously done workouts including the
              latest one. Behaves the same way Home button does.
            </li>
          </ul>

          <p className="font-manrope text-lg font-bold text-slate-800 dark:text-white sm:text-xl">
            In edit mode
          </p>

          <ul className="list-disc space-y-4 text-pretty pb-8 pl-4 text-sm dark:text-slate-300 sm:text-base">
            <li>
              Tap{" "}
              <span className="font-bold uppercase text-slate-800 dark:text-white">
                eye
              </span>{" "}
              button to to preview your most recent completed workout. You can
              check the notes you left which should help you make changes to
              your next session.
            </li>

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
      </TooltipDrawer>
    </Drawer.Root>
  );
};

const TooltipDrawer = ({
  children,
  closeDrawer,
}: {
  children: React.ReactNode;
  closeDrawer: () => void;
}) => {
  return (
    <Drawer.Portal>
      <Drawer.Overlay className="fixed inset-0 z-20 bg-slate-900/40 backdrop-blur-sm dark:bg-slate-950/70" />

      <Drawer.Content
        aria-describedby={undefined}
        className="fixed inset-x-0 bottom-0 z-20 select-none px-1 focus:outline-none"
      >
        <div className="rounded-t-modal bg-white pb-safe-bottom ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700/70">
          <div className="rounded-t-modal border-b border-b-slate-300/50 bg-slate-200/55 py-3 dark:border-b-slate-700/70 dark:bg-slate-800">
            <Drawer.Handle className="bg-slate-300 dark:bg-slate-500" />
            <Drawer.Title className="px-6 pt-3 text-xl font-bold text-slate-800 dark:text-white">
              Good to Know
            </Drawer.Title>
          </div>

          <div className="flex flex-col px-6 py-8 font-manrope">
            <Drawer.Description asChild>{children}</Drawer.Description>

            <button
              onClick={async () => {
                await new Promise((resolve) => setTimeout(resolve, 100));
                closeDrawer();
              }}
              className="rounded-lg bg-slate-800 py-2 font-bold text-white active:bg-slate-600 dark:bg-white dark:font-extrabold dark:text-slate-800 active:dark:bg-slate-300"
            >
              Got it!
            </button>
          </div>
        </div>
      </Drawer.Content>
    </Drawer.Portal>
  );
};
