import { useMutation } from "@tanstack/react-query";
import { twMerge } from "tailwind-merge";
import { Drawer } from "vaul";
import { archiveWorkout, removeWorkout } from "@/util/actions/workout";
import { timeout, BUTTON_TIMEOUT } from "@/util/utils";
import { showToast } from "../Toasts";
import { ErrorTriangleIcon } from "../icons/user/warning";

import type { PartialWorkoutType } from "@/db/schema";

type WorkoutAction = "archive" | "remove";

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
  const { variables: action, mutate: handleWorkoutAction } = useMutation({
    mutationFn: async (action: WorkoutAction) => {
      const res =
        action === "archive"
          ? await archiveWorkout(targetedWorkout.id, targetedWorkout.title)
          : await removeWorkout(targetedWorkout.id, targetedWorkout.title);

      toggleModal();
      removeWorkoutOnClient(targetedWorkout.id);

      if (res.status === "success-redirect") {
        showToast(res.message, "/home?q=archived", "See archive");
      } else {
        showToast(res.message);
      }
    },
  });

  const isPendingArchiving = action === "archive";
  const isPendingRemoving = action === "remove";

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
              <ErrorTriangleIcon strokeWidth={2} className="size-5" />
            </div>

            <Drawer.Title className="px-2 pt-2 text-center font-nunito text-sm font-semibold leading-snug dark:text-slate-400">
              This action is irreversible. Proceeding further will result in
              permanent data loss. Continue?
            </Drawer.Title>

            <div className="flex flex-col">
              {targetedWorkout.status === "current" && (
                <form action={() => handleWorkoutAction("archive")}>
                  <button
                    type="submit"
                    disabled={isPendingArchiving}
                    className={twMerge(
                      "w-full border-t border-slate-400/40 p-3 font-manrope text-lg font-semibold text-blue-500 focus:outline-none active:bg-slate-200 disabled:bg-slate-300/55 disabled:text-blue-500/75 dark:border-slate-600 dark:active:bg-slate-600/90 dark:disabled:bg-slate-900/75",
                      isPendingRemoving && "pointer-events-none",
                    )}
                  >
                    {isPendingArchiving
                      ? "Archiving..."
                      : `Archive ${targetedWorkout.title}`}
                  </button>
                </form>
              )}

              <form action={() => handleWorkoutAction("remove")}>
                <button
                  type="submit"
                  disabled={isPendingRemoving}
                  className={twMerge(
                    "w-full rounded-b-modal border-t border-slate-400/40 p-3 font-manrope text-lg font-semibold text-red-500 focus:outline-none active:bg-slate-200 disabled:bg-slate-300/55 disabled:text-red-500/75 dark:border-slate-600 dark:active:bg-slate-600/90 dark:disabled:bg-slate-900/75",
                    isPendingArchiving && "pointer-events-none",
                  )}
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
