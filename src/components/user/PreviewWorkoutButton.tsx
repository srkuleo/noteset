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
        <Dialog.Overlay className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs data-[state=closed]:animate-overlay-hide data-[state=open]:animate-overlay-show dark:bg-slate-950/70" />

        <Dialog.Content className="fixed inset-0 mt-36 rounded-t-modal bg-white pt-safe-top  data-[state=closed]:animate-content-hide data-[state=open]:animate-content-show dark:bg-slate-800">
          <div className="flex items-center justify-between p-4">
            <p className="text-lg font-bold">
              Current workout: {workout.title}
            </p>
            <Dialog.Close className="font-extrabold text-violet-500 focus:outline-none active:text-violet-300 dark:text-violet-400 active:dark:text-violet-600">
              Done
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
