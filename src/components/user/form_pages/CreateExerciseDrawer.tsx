import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { Drawer } from "vaul"
import { useExerciseForm } from "@/util/hooks/useExerciseForm"
import {
  CreateExerciseFormSchema,
  type CreateExerciseFormType,
  type ExerciseError,
  type ExercisesListProps,
} from "@/util/types"
import { BUTTON_TIMEOUT, FORM_TIMEOUT, timeout } from "@/util/utils"
import { DrawerPlusButton, FormSubmitDrawerButton } from "../../CustomButtons"
import { showToast } from "../../Toasts"
import { ExerciseFormTooltip } from "../../Tooltips"
import { NameInput, NoteInput, SelectLimbInvolvement, SetsSection } from "./ExerciseInputs"

export const CreateExerciseDrawer = ({
  updateExercises,
}: Pick<ExercisesListProps, "updateExercises">) => {
  const [open, setOpen] = useState(false)

  return (
    <Drawer.Root
      direction="top"
      open={open}
      onOpenChange={setOpen}
      noBodyStyles
      disablePreventScroll
    >
      <DrawerPlusButton
        openDrawer={() => setOpen(true)}
        buttonDescriptionSrOnly="Create a new exercise"
        className="dark:shadow-slate-900/80"
      />

      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-sm dark:bg-slate-950/80" />

        <Drawer.Content
          aria-describedby={undefined}
          className="fixed inset-x-0 top-0 z-[9999] px-0.5 focus:outline-none"
        >
          <div className="rounded-b-4xl bg-white pb-4 dark:bg-slate-900">
            <div className="border-b border-b-slate-200 bg-slate-200/55 pt-safe-top dark:border-b-slate-700 dark:bg-slate-800">
              <Drawer.Title className="px-8 py-4 font-manrope text-slate-800 text-xl leading-5">
                Creating a new exercise
              </Drawer.Title>
            </div>

            <CreateExerciseForm
              updateExercises={updateExercises}
              closeDrawer={() => setOpen(false)}
            />

            <Drawer.Handle preventCycle className="bg-slate-300 dark:bg-slate-600" />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

type CreateExerciseFormProps = Pick<ExercisesListProps, "updateExercises"> & {
  closeDrawer: () => void
}

const CreateExerciseForm = ({ updateExercises, closeDrawer }: CreateExerciseFormProps) => {
  const {
    tempExercise,
    exerciseFormErrors,
    handleNameInput,
    resetNameInput,
    handleNoteInput,
    resetNoteInput,
    handleLimbInvolvementInput,
    updateSets,
    handleExerciseErrors,
    resetExerciseErrors,
  } = useExerciseForm()

  const { mutate: createExercise, isPending } = useMutation({
    mutationFn: async (exercise: CreateExerciseFormType) => {
      await timeout(FORM_TIMEOUT)

      const isValidExercise = CreateExerciseFormSchema.safeParse(exercise)

      if (!isValidExercise.success) {
        throw isValidExercise.error
      }

      updateExercises({ type: "create", exercise: isValidExercise.data })
    },
    onMutate: resetExerciseErrors,
    onError: (error) => {
      handleExerciseErrors(error as ExerciseError)
    },
    onSuccess: () => {
      closeDrawer()
      showToast("Exercise created!")
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
        createExercise(tempExercise)
      }}
    >
      <fieldset disabled={isPending} className="group space-y-4 p-8">
        <SelectLimbInvolvement
          selected={tempExercise.limbInvolvement}
          handleLimbInvolvementInput={handleLimbInvolvementInput}
        />

        <NameInput
          name={tempExercise.name}
          nameError={exerciseFormErrors.errors?.name}
          handleNameInput={handleNameInput}
          resetNameInput={resetNameInput}
        />

        <NoteInput
          withLabel
          note={tempExercise.note}
          onChange={handleNoteInput}
          resetNoteInput={() => resetNoteInput()}
          className="rounded-xl bg-white px-4 py-3 font-manrope text-sm shadow-md ring-1 ring-slate-300 ring-inset dark:bg-slate-800 dark:shadow-slate-950/75 dark:ring-slate-600"
          focusedWrapperClassName="ring-2 ring-green-500 dark:ring-green-600"
          focusedInputClassName="w-[calc(100%-36px)]"
        />

        <SetsSection
          sets={tempExercise.sets}
          limbInvolvement={tempExercise.limbInvolvement}
          setsError={exerciseFormErrors.errors?.sets}
          repsError={exerciseFormErrors.errors?.reps}
          weightError={exerciseFormErrors.errors?.weight}
          updateSets={updateSets}
        />

        <div className="flex gap-1 group-disabled:pointer-events-none group-disabled:opacity-50">
          <ExerciseFormTooltip />

          <button
            type="button"
            onClick={async () => {
              await timeout(BUTTON_TIMEOUT)
              closeDrawer()
            }}
            className="mr-1.5 rounded-xl bg-slate-50 px-4 font-semibold text-sm shadow-sm ring-1 ring-slate-300/80 ring-inset active:bg-slate-200 dark:bg-white dark:text-slate-600 dark:active:bg-slate-300"
          >
            Close
          </button>

          <FormSubmitDrawerButton pending={isPending} label="Create" loading="Creating..." />
        </div>
      </fieldset>
    </form>
  )
}
