import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { RemoveExerciseIcon } from "../icons/user/modify";
import { DangerIcon } from "../icons/user/warning";

export const RemoveExerciseModal = ({
  exerciseName,
  removeExercise,
}: {
  exerciseName: string;
  removeExercise: () => void;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger className="select-none rounded-full bg-red-500 p-1.5 text-white">
        {RemoveExerciseIcon}
        <span className="sr-only">Remove exercise</span>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm data-[state=closed]:animate-overlay-hide data-[state=open]:animate-overlay-show dark:bg-slate-950/70" />

        <Dialog.Content className="fixed inset-x-0 bottom-0 select-none space-y-4 px-4 pb-12 data-[state=closed]:animate-modal-slide-down data-[state=open]:animate-modal-slide-up">
          <div className="flex flex-col items-center gap-3 rounded-modal bg-slate-50/90 pt-5 dark:bg-slate-700/80">
            <div className="rounded-full bg-red-400 p-2 text-white shadow-sm dark:bg-red-200 dark:text-red-500">
              {DangerIcon}
            </div>
            <div className="px-1 pt-2">
              <p className="text-center font-semibold leading-snug text-slate-600 dark:text-slate-400">
                Are you sure you want to remove{" "}
                <span className="font-bold text-slate-700 dark:text-slate-200">{exerciseName}</span>{" "}
                exercise from the current list? This action is irreversible.
              </p>
            </div>
            <button
              onClick={() => {
                removeExercise();
                setOpen(false);
              }}
              className="w-full rounded-b-modal border-t border-slate-400/40 p-3 font-manrope text-lg font-semibold text-red-500 focus:outline-none active:bg-slate-200 dark:border-slate-600 active:dark:bg-slate-600/90"
            >
              Remove {exerciseName}
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
