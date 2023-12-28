import { RemoveWorkoutIcon } from "@/icons/user/modify";
import type { Workout } from "./Workouts";
import { Drawer } from "vaul";
import { AnimatePresence, motion } from "framer-motion";
import { removeWorkout } from "@/util/actions";

export const RemoveWorkoutButton = ({
  isEditing,
  workout,
}: {
  isEditing: boolean;
  workout: Workout;
}) => {
  return (
    <Drawer.Root>
      <AnimatePresence>
        {isEditing && (
          <motion.div className="flex"
            initial={{ opacity: 0, y: -12 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.2, ease: "easeOut" },
            }}
            exit={{
              opacity: 0,
              y: -8,
              transition: { duration: 0.1, ease: "easeIn" },
            }}
          >
            <Drawer.Trigger className="text-red-500 transition  active:scale-95 dark:text-red-400">
              {RemoveWorkoutIcon}
            </Drawer.Trigger>
          </motion.div>
        )}
      </AnimatePresence>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-slate-950/70 dark:bg-slate-900/70" />
        <Drawer.Content className="fixed inset-x-0 bottom-0 flex flex-col items-center rounded-t-[10px] bg-gradient-to-t from-slate-300 via-slate-100 to-slate-300 pt-2 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
          <div className="h-1 w-12 rounded-full bg-slate-400/50 dark:bg-slate-700" />
          <div className="flex w-full items-center justify-between px-4 py-4">
            <h1 className="font-semibold">Remove {workout.title}</h1>
            <Drawer.Close className="text-sm text-slate-600 dark:text-slate-300">
              Cancel
            </Drawer.Close>
          </div>
          <div className="px-8 pb-16 pt-4">
            <div className="flex flex-col items-center rounded-[10px] px-4">
              <div className="rounded-full bg-red-50 p-2 text-red-600 shadow-md ring-1 ring-red-300 dark:bg-red-200">
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
              <div className="space-y-2 pb-8 pt-4 text-center">
                <p className="text-lg font-semibold">
                  Do you want to continue?
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  This action is irreversible and will result in permanent data
                  loss.
                </p>
              </div>
              <Drawer.Close
                onClick={() => removeWorkout(workout.id)}
                className="rounded-lg bg-red-500 px-4 py-1.5 font-semibold text-white shadow-md dark:bg-red-600"
              >
                Remove
              </Drawer.Close>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
