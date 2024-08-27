import { useState } from "react";
import { Drawer } from "vaul";
import { HideIcon, ShowIcon } from "../icons/user/preview";

import type { PartialWorkoutType } from "@/db/schema";
import { twMerge } from "tailwind-merge";

export const PreviewWorkoutButtonDrawer = ({
  workout,
  className,
  size,
}: {
  workout: PartialWorkoutType;
  className?: string;
  size: number | string;
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
        className={twMerge(
          "rounded-lg shadow-md ring-1 ring-inset ring-slate-300 active:scale-95 active:bg-slate-200 dark:shadow-slate-900 dark:ring-slate-600 dark:active:bg-slate-700",
          className,
        )}
      >
        <ShowIcon className={`size-${size}`} />
        <p className="sr-only">Preview workout</p>
      </button>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[9999] bg-slate-900/40 backdrop-blur-sm dark:bg-slate-950/70" />

        <Drawer.Content
          aria-describedby={undefined}
          className="fixed inset-x-0 bottom-0 z-[9999] select-none px-2 focus:outline-none"
        >
          <div className="rounded-t-modal bg-white pb-safe-bottom ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700/70">
            <div className="rounded-t-modal border-b border-b-slate-300/50 bg-slate-200/55 py-3 dark:border-b-slate-700/70 dark:bg-slate-800">
              <Drawer.Handle className="bg-slate-300 dark:bg-slate-600" />

              <Drawer.Title className="px-4 pt-4 text-lg uppercase text-slate-800">
                {workout.title}
              </Drawer.Title>
            </div>

            <div className="flex flex-col px-6 py-8">
              <div className="grid grid-cols-preview gap-3 divide-x-2 divide-slate-100 overflow-x-scroll pb-8 text-sm dark:divide-slate-800 md:justify-center">
                <div className="flex flex-col gap-4">
                  {workout.exercises.map((exercise) => (
                    <p key={exercise.name} className="pb-4 font-bold">
                      {exercise.name}
                    </p>
                  ))}
                </div>

                <div className="flex flex-col gap-4 pl-3">
                  {workout.exercises.map((exercise) => (
                    <div
                      key={exercise.name}
                      className="flex divide-x-2 divide-slate-100 pb-4 dark:divide-slate-700"
                    >
                      {exercise.reps.map((rep, i) => (
                        <div
                          key={i}
                          className="flex min-w-24 justify-center gap-1 px-3"
                        >
                          <p className="font-bold">{rep}</p>
                          {exercise.weights[i] && (
                            <p>({exercise.weights[i]}kg)</p>
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-4 pl-3">
                  {workout.exercises.map((exercise, i) => (
                    <p key={i} className="pb-4 font-semibold">
                      {exercise.note ? exercise.note : "/"}
                    </p>
                  ))}
                </div>
              </div>

              <button
                onClick={async () => {
                  await new Promise((resolve) => setTimeout(resolve, 100));
                  setOpen(false);
                }}
                className="flex items-center justify-center gap-1 rounded-lg bg-slate-800 py-2 font-bold text-white outline-none active:bg-slate-600 dark:bg-white dark:font-extrabold dark:text-slate-800 active:dark:bg-slate-300"
              >
                Hide
                <HideIcon className="size-[22px]" />
              </button>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
