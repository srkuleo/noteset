import { useMutation } from "@tanstack/react-query"
import { twMerge } from "tailwind-merge"
import { Drawer } from "vaul"
import type { WorkoutToRemoveType } from "@/db/schema"
import { updateWorkouts } from "@/util/actions/workout"
import { BUTTON_TIMEOUT, timeout } from "@/util/utils"
import { ErrorTriangleIcon } from "../../icons/user/warning"
import { showToast } from "../../Toasts"

export const RemoveWorkoutModal = ({
  open,
  toggleModal,
  workout,
  removeWorkoutOnClient,
}: {
  open: boolean
  toggleModal: () => void
  workout: WorkoutToRemoveType
  removeWorkoutOnClient: (workoutId: number) => void
}) => {
  const { mutate: handleArchiving, isPending: isArchiving } = useMutation({
    mutationFn: updateWorkouts,
    onSuccess: (res, { id }) => {
      toggleModal()

      if (res.status === "success-redirect") {
        removeWorkoutOnClient(id)
        showToast(res.message, "/archived", "See archive")
      } else {
        showToast(res.message)
      }
    },
  })
  const { mutate: handleRemoving, isPending: isRemoving } = useMutation({
    mutationFn: updateWorkouts,
    onSuccess: (res, { id }) => {
      toggleModal()

      if (res.status === "success") {
        removeWorkoutOnClient(id)
      }

      showToast(res.message)
    },
  })

  return (
    <Drawer.Root open={open} onOpenChange={toggleModal} noBodyStyles disablePreventScroll>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[9999] bg-slate-900/40 backdrop-blur-sm dark:bg-slate-950/70" />

        <Drawer.Content
          aria-describedby={undefined}
          data-vaul-no-drag
          className="fixed inset-x-0 bottom-0 z-[9999] select-none space-y-4 px-4 pb-12 focus:outline-none"
        >
          <div className="flex flex-col gap-3 rounded-lg+ bg-white/90 pt-5 dark:bg-slate-700/70">
            <div className="mx-auto w-fit rounded-full bg-red-400 p-2 text-white shadow-sm dark:bg-red-200 dark:text-red-500">
              <ErrorTriangleIcon strokeWidth={2} className="size-5" />
            </div>

            <Drawer.Title className="px-2 pt-2 text-center font-nunito font-semibold text-sm leading-snug dark:text-slate-400">
              This action is irreversible. Proceeding further will result in permanent data loss.
              Continue?
            </Drawer.Title>

            <div className="flex flex-col">
              {workout.status === "current" && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleArchiving({
                      id: workout.id,
                      title: workout.title,
                      action: "archive",
                    })
                  }}
                >
                  <button
                    type="submit"
                    disabled={isArchiving}
                    className={twMerge(
                      "w-full border-slate-400/40 border-t p-3 font-manrope font-semibold text-blue-500 text-lg focus:outline-none active:bg-slate-200 disabled:bg-slate-300/55 disabled:text-blue-500/75 dark:border-slate-600 dark:disabled:bg-slate-900/75 dark:active:bg-slate-600/90",
                      isRemoving && "pointer-events-none"
                    )}
                  >
                    {isArchiving ? "Archiving..." : `Archive ${workout.title}`}
                  </button>
                </form>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleRemoving({
                    id: workout.id,
                    title: workout.title,
                    action: "remove",
                  })
                }}
              >
                <button
                  type="submit"
                  disabled={isRemoving}
                  className={twMerge(
                    "w-full rounded-b-lg+ border-slate-400/40 border-t p-3 font-manrope font-semibold text-lg text-red-500 focus:outline-none active:bg-slate-200 disabled:bg-slate-300/55 disabled:text-red-500/75 dark:border-slate-600 dark:disabled:bg-slate-900/75 dark:active:bg-slate-600/90",
                    isArchiving && "pointer-events-none"
                  )}
                >
                  {isRemoving ? "Removing..." : `Remove ${workout.title}`}
                </button>
              </form>
            </div>
          </div>

          <button
            type="button"
            onClick={async () => {
              await timeout(BUTTON_TIMEOUT)
              toggleModal()
            }}
            className="w-full rounded-lg+ bg-white p-3 font-bold text-violet-500 text-xl focus:outline-none active:bg-slate-200 dark:bg-slate-700 dark:text-violet-400 active:dark:bg-slate-600/90"
          >
            Cancel
          </button>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
