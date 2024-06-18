import { useState } from "react";
import { Drawer } from "vaul";
import { HideIcon, ShowIcon } from "../icons/user/preview";

import type { Workout } from "@/db/schema";

export const PreviewWorkoutButton = ({ workout }: { workout: Workout }) => {
  const [open, setOpen] = useState(false);

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger className="rounded-lg px-2 py-1 shadow-md ring-1 ring-inset ring-slate-300 transition focus:outline-none active:scale-95 dark:shadow-slate-900 dark:ring-slate-600">
        {ShowIcon}
        <p className="sr-only">Preview workout</p>
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm dark:bg-slate-950/70" />

        <Drawer.Content className="fixed inset-x-0 bottom-0 select-none px-2 focus:outline-none">
          <div className="rounded-t-modal bg-white pb-safe-bottom ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700/70">
            <div className="rounded-t-modal border-b border-b-slate-300/50 bg-slate-200/55 py-3 dark:border-b-slate-700/70 dark:bg-slate-800">
              <Drawer.Handle className="bg-slate-300 dark:bg-slate-600" />
              <Drawer.Title className="flex justify-between px-4 pt-4 font-manrope font-bold text-slate-800 dark:text-white">
                <p>Workout:</p>
                <p className="uppercase">{workout.title}</p>
              </Drawer.Title>
            </div>

            <div className="flex flex-col px-4 py-8">
              <div className="grid-cols-preview grid gap-4 overflow-x-scroll pb-8 no-scrollbar md:justify-center">
                <div className="flex flex-col gap-4 rounded-xl bg-slate-50/70 px-4 pt-4 shadow-sm dark:bg-slate-800/45">
                  {workout.exercises.map((exercise) => (
                    <p key={exercise.name} className="pb-4 font-bold">
                      {exercise.name}
                    </p>
                  ))}
                </div>

                <div className="w-0.5 bg-slate-100 dark:bg-slate-800" />

                <div className="flex flex-col gap-4 px-4 pt-4">
                  {workout.exercises.map((exercise) => (
                    <div key={exercise.name} className="flex pb-4">
                      {exercise.reps.map((rep, i) => (
                        <div key={i} className="flex gap-1">
                          <p className="font-bold">{rep}</p>
                          <p>({exercise.weights[i]}kg)</p>
                          {i < exercise.reps.length - 1 && (
                            <div className="mx-2 w-0.5 bg-slate-100 dark:bg-slate-800" />
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>

                <div className="w-0.5 bg-slate-100 dark:bg-slate-800" />

                <div className="flex flex-col gap-4 px-4 pt-4 ">
                  {workout.exercises.map((exercise, i) =>
                    exercise.comment ? (
                      <p key={i} className="pb-4 font-semibold">
                        {exercise.comment}
                      </p>
                    ) : (
                      <div key={i} className="h-10" />
                    ),
                  )}
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
                {HideIcon}
              </button>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
