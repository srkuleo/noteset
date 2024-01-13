import type { Workout } from "./Workouts";
import { Drawer } from "vaul";
import { PreviewIcon } from "@/icons/user/preview";

export const PreviewWorkoutButton = ({ workout }: { workout: Workout }) => {
  return (
    <Drawer.Root>
      <Drawer.Trigger className="select-none rounded-lg px-2 py-1 shadow-md ring-1 ring-inset ring-slate-300 transition focus:outline-none active:scale-95 dark:shadow-slate-900 dark:ring-slate-600">
        {PreviewIcon}
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/70" />

        <Drawer.Content className="fixed inset-0 mt-32 select-none rounded-t-modal bg-white dark:bg-slate-800">
          <div className="w-12 h-1.5 bg-slate-300 mx-auto mt-1.5 rounded-full dark:bg-slate-600" />
          <div className="flex items-center justify-center px-2 pb-4 pt-6 bg-slate-100/65 dark:bg-slate-700/20 border-b border-slate-300 dark:border-slate-600 rounded-t-modal">
            <p className="font-bold">Preview: {workout.title}</p>
            <Drawer.Close className="absolute right-4 text-lg font-extrabold text-violet-500 focus:outline-none active:text-violet-300 dark:text-violet-400 active:dark:text-violet-600">
              Done
            </Drawer.Close>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
