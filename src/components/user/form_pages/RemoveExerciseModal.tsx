import { useMutation } from "@tanstack/react-query"
import { Drawer } from "vaul"
import { ErrorTriangleIcon } from "@/components/icons/user/warning"
import { showToast } from "@/components/Toasts"
import type { ExercisesListProps, ExerciseToRemoveType } from "@/util/types"
import { BUTTON_TIMEOUT, FORM_TIMEOUT, timeout } from "@/util/utils"

export const RemoveExerciseModal = ({
  open,
  toggleModal,
  exercise,
  updateExercises,
}: {
  open: boolean
  toggleModal: () => void
  exercise: ExerciseToRemoveType
  updateExercises: ExercisesListProps["updateExercises"]
}) => {
  const { mutate: removeExercise, isPending } = useMutation({
    mutationFn: async (id: string) => {
      await timeout(FORM_TIMEOUT)

      updateExercises({ type: "remove", exerciseId: id })
    },
    onSuccess: () => {
      toggleModal()
      showToast("Exercise removed.")
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
              Are you sure you want to remove this exercise from the current list? This action is
              irreversible.
            </Drawer.Title>

            <button
              type="button"
              disabled={isPending}
              onClick={() => removeExercise(exercise.id)}
              className="w-full rounded-b-lg+ border-slate-400/40 border-t p-3 font-manrope font-semibold text-lg text-red-500 focus:outline-none active:bg-slate-200 disabled:bg-slate-300/55 disabled:text-red-500/75 dark:border-slate-600 dark:disabled:bg-slate-900/75 dark:active:bg-slate-600/90"
            >
              {isPending ? "Removing..." : `Remove ${exercise.name}`}
            </button>
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
