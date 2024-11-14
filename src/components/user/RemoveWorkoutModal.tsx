import { Drawer } from "vaul";
import { timeout, BUTTON_TIMEOUT } from "@/util/utils";
import { archiveWorkout, removeWorkout } from "@/util/actions/workout";
import { showToast } from "../Toasts";
import { DangerIcon } from "../icons/user/warning";

import type { WorkoutStatusType } from "@/util/types";

export const RemoveWorkoutModal = ({
  open,
  setOpen,
  workoutToRemove,
}: {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  workoutToRemove: { title: string; id: number; status: WorkoutStatusType };
}) => {
  return (
    <Drawer.Root
      open={open}
      onOpenChange={setOpen}
      noBodyStyles
      disablePreventScroll
    >
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[9999] bg-slate-900/40 backdrop-blur-sm dark:bg-slate-950/70" />

        <Drawer.Content
          aria-describedby={undefined}
          data-vaul-no-drag
          className="fixed inset-x-0 bottom-0 z-[9999] select-none space-y-4 px-4 pb-12 focus:outline-none"
        >
          <div className="flex flex-col gap-3 rounded-modal bg-white/90 pt-5 dark:bg-slate-700/70">
            <div className="mx-auto w-fit rounded-full bg-red-400 p-2 text-white shadow-sm dark:bg-red-200 dark:text-red-500">
              {DangerIcon}
            </div>

            <Drawer.Title className="px-2 pt-2 text-center font-nunito text-sm font-semibold leading-snug dark:text-slate-400">
              This action is irreversible. Proceeding further will result in
              permanent data loss. Continue?
            </Drawer.Title>

            <div className="flex flex-col">
              {workoutToRemove.status === "current" && (
                <button
                  onClick={async () => {
                    const res = await archiveWorkout(
                      workoutToRemove.id,
                      workoutToRemove.title,
                    );

                    setOpen(false);
                    showToast(res.message);
                  }}
                  className="border-t border-slate-400/40 p-3 font-manrope text-lg font-semibold text-blue-500 focus:outline-none active:bg-slate-200 dark:border-slate-600 active:dark:bg-slate-600/90"
                >
                  Archive {workoutToRemove.title}
                </button>
              )}

              <button
                onClick={async () => {
                  const res = await removeWorkout(
                    workoutToRemove.id,
                    workoutToRemove.title,
                  );

                  setOpen(false);
                  showToast(res.message);
                }}
                className="rounded-b-modal border-t border-slate-400/40 p-3 font-manrope text-lg font-semibold text-red-500 focus:outline-none active:bg-slate-200 dark:border-slate-600 active:dark:bg-slate-600/90"
              >
                Remove {workoutToRemove.title}
              </button>
            </div>
          </div>

          <button
            onClick={async () => {
              await timeout(BUTTON_TIMEOUT);

              setOpen(false);
            }}
            className="w-full rounded-modal bg-white p-3 text-xl font-bold text-violet-500 focus:outline-none active:bg-slate-200 dark:bg-slate-700 dark:text-violet-400 active:dark:bg-slate-600/90"
          >
            Cancel
          </button>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
