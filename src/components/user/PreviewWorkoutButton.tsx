"use client";

import { Drawer } from "vaul";
import { HideIcon, ShowIcon } from "../icons/user/preview";

import type { Workout } from "@/db/schema";

export const PreviewWorkoutButton = ({ workout }: { workout: Workout }) => {
  return (
    <Drawer.Root>
      <Drawer.Trigger className="rounded-lg px-2 py-1 shadow-md ring-1 ring-inset ring-slate-300 transition focus:outline-none active:scale-95 dark:shadow-slate-900 dark:ring-slate-600">
        {ShowIcon}
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm dark:bg-slate-950/70" />

        <Drawer.Content className="fixed inset-x-0 bottom-0 select-none px-4 pb-12">
          <div className="rounded-modal bg-white ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-700/80">
            <div className="rounded-t-modal border-b border-b-slate-300/65 bg-slate-200/70 p-2 dark:border-b-slate-700/80 dark:bg-slate-800">
              <Drawer.Handle className="dark:bg-slate-500 bg-slate-300" />
              <Drawer.Title className="pt-2 text-center font-manrope text-lg font-bold">
                Preview: {workout.title}
              </Drawer.Title>
            </div>

            <div className="flex flex-col p-4">
              <p className="pb-2">
                You are previewing {workout.title} workout.
              </p>
              <div className="pb-6">
                Exercises:{" "}
                {workout.exercises.map((ex) => (
                  <div key={ex.name} className="inline-block">
                    {ex.name}
                  </div>
                ))}
              </div>

              <Drawer.Close className="flex items-center justify-center gap-1 rounded-lg bg-slate-800 py-2 font-bold text-white outline-none active:bg-slate-600 dark:bg-white dark:font-extrabold dark:text-slate-600 active:dark:bg-slate-700 active:dark:text-white">
                Hide
                {HideIcon}
              </Drawer.Close>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
