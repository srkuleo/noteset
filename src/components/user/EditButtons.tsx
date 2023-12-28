import { EditWorkoutIcon, DeleteIcon } from "@/icons/user/modify";
import { removeWorkout } from "@/util/actions";
import { motion } from "framer-motion";
import Link from "next/link";
import { Drawer } from "vaul";
import type { Workout } from "./Workouts";

export const EditButtons = ({ workout }: { workout: Workout }) => {
  return (
    <motion.div
      className="flex flex-col gap-4"
      initial={{ opacity: 0, width: 0 }}
      animate={{
        opacity: 1,
        width: "auto",
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      exit={{
        opacity: 0,
        width: 0,
        transition: { duration: 0.15, ease: "easeIn" },
      }}
    >
      <Link
        href={`/workouts/edit/${workout.title?.toLowerCase()}`}
        className="overflow-hidden rounded-full bg-green-500 p-2 text-white transition active:scale-95 dark:bg-green-600"
      >
        {EditWorkoutIcon}
      </Link>
      <Drawer.Root>
        <Drawer.Trigger className="overflow-hidden rounded-full bg-red-500/90 p-2 px-2 text-white transition  active:scale-95 dark:bg-red-600">
          {DeleteIcon}
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-slate-900/80 dark:bg-slate-950/80" />
          <Drawer.Content className="fixed inset-x-0 bottom-0 flex flex-col items-center rounded-t-lg bg-white px-4 pb-safe-bottom pt-2 dark:bg-slate-800">
            <div className="h-1 w-12 rounded-full bg-slate-200 dark:bg-slate-500" />
            <div className="flex w-full items-center justify-between py-4">
              <h1 className="font-semibold">Remove {workout.title}</h1>
              <Drawer.Close className="text-sm text-slate-500 dark:text-slate-300">
                Cancel
              </Drawer.Close>
            </div>
            <div className="flex flex-col items-center gap-8 pt-6 pb-10">
              <div className="rounded-full bg-red-100 p-2 text-red-600 dark:bg-red-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                  />
                </svg>
              </div>
              <div className="space-y-2 px-2 text-center">
                <p className="text-lg font-semibold">
                  Do you want to continue?
                </p>
                <p className="text-sm text-slate-400">
                  This action is irreversible and will result in permanent data
                  loss.
                </p>
              </div>
              <Drawer.Close
                onClick={() => removeWorkout(workout.id)}
                className="rounded-lg bg-red-500 px-4 py-1.5 font-semibold text-white dark:bg-red-600"
              >
                Remove
              </Drawer.Close>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </motion.div>
  );
};
