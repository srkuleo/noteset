import type { Workout } from "./Workouts";
import { PreviewIcon } from "@/icons/user/preview";
import * as Dialog from "@radix-ui/react-dialog";

export const PreviewWorkoutButton = ({ workout }: { workout: Workout }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-lg px-2 py-1 shadow-md ring-1 ring-inset ring-slate-300 transition focus:outline-none active:scale-95 dark:shadow-slate-900 dark:ring-slate-600">
        {PreviewIcon}
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="backdrop-blur-xs data-[state=closed]:animate-overlay-hide data-[state=open]:animate-overlay-show fixed inset-0 bg-slate-900/40 dark:bg-slate-950/70" />

        <Dialog.Content className="data-[state=closed]:animate-content-hide data-[state=open]:animate-content-show rounded-t-modal fixed inset-0 mt-20 bg-white p-4 dark:bg-slate-800">
          <div className="flex items-center justify-between">
            <p className="text-lg font-bold">
              Current workout: {workout.title}
            </p>
            <Dialog.Close className="font-bold text-violet-500 focus:outline-none dark:text-violet-400">
              Done
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
