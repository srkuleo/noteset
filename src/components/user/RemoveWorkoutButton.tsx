import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Workout } from "./Workouts";
import { removeWorkout } from "@/util/actions";
import { manrope } from "@/styles/fonts";
import { RemoveWorkoutIcon } from "@/icons/user/modify";
import { DangerIcon } from "@/icons/user/warning";
import * as Dialog from "@radix-ui/react-dialog";

export const RemoveWorkoutButton = ({
  editMode,
  workout,
}: {
  editMode: boolean;
  workout: Workout;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <AnimatePresence>
        {editMode && (
          <Dialog.Trigger className="focus:outline-none">
            <motion.div
              initial={{ opacity: 0, y: "100%" }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] },
              }}
              exit={{
                opacity: 0,
                y: "100%",
                transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] },
              }}
              className="select-none"
            >
              {RemoveWorkoutIcon}
            </motion.div>
          </Dialog.Trigger>
        )}
      </AnimatePresence>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm data-[state=closed]:animate-overlay-hide data-[state=open]:animate-overlay-show dark:bg-slate-950/70" />

        <Dialog.Content className="select-none fixed inset-x-0 bottom-4 space-y-4 px-4 py-4 data-[state=closed]:animate-content-hide data-[state=open]:animate-content-show">
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
              onClick={() => {
                removeWorkout(workout.id);
                setOpen(false);
              }}
              className={`w-full rounded-b-modal border-t border-slate-400/40 p-3 text-lg font-semibold text-red-500 focus:outline-none active:bg-slate-200 dark:border-slate-600 active:dark:bg-slate-600/90 ${manrope.className}`}
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
  );
};
