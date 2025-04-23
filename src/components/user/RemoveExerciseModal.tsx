import { Drawer } from "vaul";
import { timeout, BUTTON_TIMEOUT } from "@/util/utils";
import { ErrorTriangleIcon } from "../icons/user/warning";

export const RemoveExerciseModal = ({
  isOpen,
  exerciseName,
  setIsOpen,
  removeExercise,
  isEditWorkoutPage = false,
  openEditDrawer,
}: {
  isOpen: boolean;
  exerciseName: string;
  setIsOpen: (isOpen: boolean) => void;
  removeExercise: () => void;
  isEditWorkoutPage?: boolean;
  openEditDrawer?: () => void;
}) => {
  return (
    <Drawer.Root
      open={isOpen}
      onOpenChange={setIsOpen}
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
              Are you sure you want to remove this exercise from the current
              list? This action is irreversible.
            </Drawer.Title>

            <div className="flex flex-col">
              {isEditWorkoutPage && typeof openEditDrawer === "function" && (
                <button
                  onClick={() => {
                    openEditDrawer();
                    setIsOpen(false);
                  }}
                  className="border-t border-slate-400/40 p-3 font-manrope text-lg font-semibold text-blue-500 focus:outline-none active:bg-slate-200 dark:border-slate-600 active:dark:bg-slate-600/90"
                >
                  Modify {exerciseName}
                </button>
              )}

              <button
                onClick={() => {
                  removeExercise();
                  setIsOpen(false);
                }}
                className="rounded-b-modal border-t border-slate-400/40 p-3 font-manrope text-lg font-semibold text-red-500 focus:outline-none active:bg-slate-200 dark:border-slate-600 active:dark:bg-slate-600/90"
              >
                Remove {exerciseName}
              </button>
            </div>
          </div>

          <button
            onClick={async () => {
              await timeout(BUTTON_TIMEOUT);

              setIsOpen(false);
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
