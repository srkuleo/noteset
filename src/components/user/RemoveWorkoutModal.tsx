import { useMutation } from "@tanstack/react-query";
import { twMerge } from "tailwind-merge";
import { Drawer } from "vaul";
import { archiveWorkout, removeWorkout } from "@/util/actions/workout";
import { timeout, BUTTON_TIMEOUT } from "@/util/utils";
import { showToast } from "../Toasts";
import { DangerIcon } from "../icons/user/warning";

import type { PartialWorkoutType } from "@/db/schema";

export const RemoveWorkoutModal = ({
  open,
  toggleModal,
  targetedWorkout,
  removeWorkoutOnClient,
}: {
  open: boolean;
  toggleModal: () => void;
  targetedWorkout: PartialWorkoutType;
  removeWorkoutOnClient: (workoutId: number) => void;
}) => {
  const { mutate: removeWorkoutAction, isPending: isPendingRemoving } =
    useMutation({
      mutationFn: async (workout: PartialWorkoutType) => {
        const res = await removeWorkout(workout.id, workout.title);

        toggleModal();

        if (res.status === "success") {
          removeWorkoutOnClient(workout.id);
        }
        showToast(res.message);
      },
    });

  const { mutate: archiveWorkoutAction, isPending: isPendingArchiving } =
    useMutation({
      mutationFn: async (workout: PartialWorkoutType) => {
        const res = await archiveWorkout(workout.id, workout.title);

        toggleModal();
        if (res.status === "success") {
          removeWorkoutOnClient(workout.id);
        }
        showToast(res.message);
      },
    });

  return (
    <Drawer.Root
      open={open}
      onOpenChange={toggleModal}
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
              {targetedWorkout.status === "current" && (
                <form action={() => archiveWorkoutAction(targetedWorkout)}>
                  <button
                    type="submit"
                    disabled={isPendingArchiving}
                    className={twMerge(
                      "w-full border-t border-slate-400/40 p-3 font-manrope text-lg font-semibold text-blue-500 focus:outline-none active:bg-slate-200 disabled:bg-slate-200 disabled:text-opacity-50 dark:border-slate-600 dark:active:bg-slate-600/90 dark:disabled:bg-slate-600/90 dark:disabled:text-opacity-80",
                      isPendingRemoving && "pointer-events-none",
                    )}
                  >
                    {isPendingArchiving
                      ? "Archiving..."
                      : `Archive ${targetedWorkout.title}`}
                  </button>
                </form>
              )}

              <form action={() => removeWorkoutAction(targetedWorkout)}>
                <button
                  type="submit"
                  disabled={isPendingRemoving}
                  className="w-full rounded-b-modal border-t border-slate-400/40 p-3 font-manrope text-lg font-semibold text-red-500 focus:outline-none active:bg-slate-200 disabled:bg-slate-200 disabled:text-opacity-50 dark:border-slate-600 dark:active:bg-slate-600/90 dark:disabled:bg-slate-600/90 dark:disabled:text-opacity-80"
                >
                  {isPendingRemoving
                    ? "Removing..."
                    : `Remove ${targetedWorkout.title}`}
                </button>
              </form>
            </div>
          </div>

          <button
            onClick={async () => {
              await timeout(BUTTON_TIMEOUT);

              toggleModal();
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
