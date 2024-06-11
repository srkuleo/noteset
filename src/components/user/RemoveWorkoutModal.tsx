import { removeWorkout } from "@/util/actions";
import { showToast } from "./Toasts";
import { Drawer } from "vaul";
import { DangerIcon } from "../icons/user/warning";

export const RemoveWorkoutModal = ({
  open,
  setOpen,
  workoutToRemove,
}: {
  open: boolean;
  setOpen: (isOpen: boolean) => void;
  workoutToRemove: { title: string; id: number };
}) => {
  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm dark:bg-slate-950/70" />

        <Drawer.Content
          data-vaul-no-drag
          className="fixed inset-x-0 bottom-0 select-none space-y-4 px-4 pb-12 focus:outline-none"
        >
          <div className="flex flex-col items-center gap-3 rounded-modal bg-slate-50/90 pt-5 dark:bg-slate-700/80">
            <div className="rounded-full bg-red-400 p-2 text-white shadow-sm dark:bg-red-200 dark:text-red-500">
              {DangerIcon}
            </div>
            <div className="px-1 pt-2">
              <p className="text-center text-base font-semibold leading-snug text-slate-600 dark:text-slate-400">
                This action is irreversible. Proceeding further will result in
                permanent data loss. Continue?
              </p>
            </div>
            <button
              onClick={async () => {
                const res = await removeWorkout(
                  workoutToRemove.id,
                  workoutToRemove.title,
                );

                setOpen(false);

                if (res.status === "success") {
                  showToast(res.message, "success");
                } else {
                  showToast(res.message, "error");
                }
              }}
              className="w-full rounded-b-modal border-t border-slate-400/40 p-3 font-manrope text-lg font-semibold text-red-500 focus:outline-none active:bg-slate-200 dark:border-slate-600 active:dark:bg-slate-600/90"
            >
              Remove {workoutToRemove.title}
            </button>
          </div>
          <button
            onClick={async () => {
              await new Promise((resolve) => setTimeout(resolve, 100));
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
