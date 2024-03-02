"use client";

import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { removeWorkout } from "@/util/actions";
import { DangerIcon } from "../icons/user/warning";
import { EditWorkoutIcon, RemoveWorkoutIcon } from "../icons/user/modify";
import { showToast } from "./Toasts";

import type { Workout } from "@/db/schema";

export const EditSection = ({ workout }: { workout: Workout }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <Link
        href={`/workouts/edit?id=${workout.id}`}
        className="select-none rounded-full p-1.5 text-green-500 shadow-md ring-1 ring-inset ring-slate-300 transition focus:outline-none active:scale-95 dark:shadow-slate-900 dark:ring-slate-600"
      >
        {EditWorkoutIcon}
      </Link>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger className="select-none rounded-full p-1.5 text-red-500 shadow-md ring-1 ring-inset ring-slate-300 transition focus:outline-none active:scale-95 dark:text-red-400 dark:shadow-slate-900 dark:ring-slate-600">
          {RemoveWorkoutIcon}
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm data-[state=closed]:animate-overlay-hide data-[state=open]:animate-overlay-show dark:bg-slate-950/70" />

          <Dialog.Content className="fixed inset-x-0 bottom-0 select-none space-y-4 px-4 pb-12 data-[state=closed]:animate-content-hide data-[state=open]:animate-content-show">
            <div className="flex flex-col items-center gap-3 rounded-modal bg-slate-50/90 pt-5 dark:bg-slate-700/80">
              <div className="rounded-full bg-red-400 p-2 text-white shadow-sm dark:bg-red-200 dark:text-red-500">
                {DangerIcon}
              </div>
              <div className="px-1 pt-2">
                <p className="text-center text-base font-semibold leading-snug text-slate-600 dark:text-slate-400">
                  This action is irreversible. Proceeding further will result in
                  permanent data loss. Continue?
                </p>
              </div>
              <button
                onClick={async () => {
                  const res = await removeWorkout(workout.id, workout.title);
                  setOpen(false);

                  if (res.status === "success") {
                    showToast(res.message, "success");
                  } else {
                    showToast(res.message, "error");
                  }
                }}
                className="w-full rounded-b-modal border-t border-slate-400/40 p-3 font-manrope text-lg font-semibold text-red-500 focus:outline-none active:bg-slate-200 dark:border-slate-600 active:dark:bg-slate-600/90"
              >
                Remove {workout.title}
              </button>
            </div>
            <Dialog.Close className="w-full rounded-modal bg-white p-3 text-xl font-bold text-violet-500 focus:outline-none active:bg-slate-200 dark:bg-slate-700 dark:text-violet-400 active:dark:bg-slate-600/90">
              Cancel
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};
