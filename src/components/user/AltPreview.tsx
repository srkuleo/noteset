import type { Workout } from "./Workouts";
import { Drawer } from "vaul";
import { PreviewIcon } from "@/icons/user/preview";

export const AltPreview = ({ workout }: { workout: Workout }) => {
  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger className="rounded-lg px-2 py-1 shadow-md ring-1 ring-inset ring-slate-300 transition focus:outline-none active:scale-95 dark:shadow-slate-900 dark:ring-slate-600">
        {PreviewIcon}
      </Drawer.Trigger>

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs dark:bg-slate-950/70" />

        <Drawer.Content className="fixed inset-0 mt-32 rounded-t-modal bg-white dark:bg-slate-800">
          <div className="flex items-center justify-between p-4">
            <p className="text-lg font-bold">
              Current workout: {workout.title}
            </p>
            <Drawer.Close className="font-extrabold text-violet-500 focus:outline-none active:text-violet-300 dark:text-violet-400 active:dark:text-violet-600">
              Done
            </Drawer.Close>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
