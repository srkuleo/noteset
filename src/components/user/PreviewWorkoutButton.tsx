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
              <p className="pb-2">
                You are previewing {workout.title} workout.
              </p>
              <div className="pb-8">
                Exercises:{" "}
                {workout.exercises.map((ex) => (
                  <div key={ex.name} className="inline-block">
                    {ex.name}
                  </div>
                ))}
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
