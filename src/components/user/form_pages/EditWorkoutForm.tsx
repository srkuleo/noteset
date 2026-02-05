"use client"

import { useMutation } from "@tanstack/react-query"
import { FormSubmitFooterButton } from "@/components/CustomButtons"
import { FormPendingSpinner } from "@/components/Loading"
import { showToast } from "@/components/Toasts"
import type { CurrentWorkoutForFormsType } from "@/db/schema"
import { editWorkout } from "@/util/actions/workout"
import { useWorkoutInForm } from "@/util/hooks/useWorkoutInForm"
import { ExercisesList } from "./ExercisesList"
import { FormPagesFooterWrapper } from "./FormPagesFooterWrapper"
import { DescriptionInput, TitleInput } from "./WorkoutInputs"

export const EditWorkoutForm = ({
  workoutToEdit,
  workoutToEditId,
}: {
  workoutToEdit: CurrentWorkoutForFormsType
  workoutToEditId: number
}) => {
  const {
    workout,
    handleTitleInput,
    resetTitleInput,
    handleDescriptionInput,
    resetDescriptionInput,
    updateExercises,
  } = useWorkoutInForm(workoutToEdit)

  const {
    data: actionRes,
    mutate: serverAction,
    isPending,
  } = useMutation({
    mutationFn: editWorkout,
    onSuccess: (res) => {
      if (res.status === "success-redirect") {
        showToast(res.message, "/current", "View workouts")
      }

      if (res.status === "error") {
        showToast(res.message)
      }
    },
  })

  return (
    <>
      <main className="mt-safe-top pt-[142px] pb-[73px]">
        <form
          id="edit-workout-form"
          onSubmit={(e) => {
            e.preventDefault()
            serverAction({ editedWorkout: workout, workoutToEditId })
          }}
        >
          <fieldset disabled={isPending} className="group space-y-4 p-8">
            <TitleInput
              title={workout.title}
              titleError={actionRes?.errors?.title}
              handleTitleInput={handleTitleInput}
              resetTitleInput={resetTitleInput}
            />

            <DescriptionInput
              description={workout.description}
              handleDescriptionInput={handleDescriptionInput}
              resetDescriptionInput={resetDescriptionInput}
            />

            <ExercisesList
              exercises={workout.exercises}
              exercisesError={actionRes?.errors?.exercises}
              updateExercises={updateExercises}
            />

            <FormPendingSpinner />
          </fieldset>
        </form>
      </main>

      <FormPagesFooterWrapper disabled={isPending} className="flex justify-end">
        <FormSubmitFooterButton
          form="edit-workout-form"
          pending={isPending}
          label="Save"
          loading="Saving..."
        />
      </FormPagesFooterWrapper>
    </>
  )
}
