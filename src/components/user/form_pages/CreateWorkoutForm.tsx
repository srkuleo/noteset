"use client"

import { useMutation } from "@tanstack/react-query"
import { FormSubmitFooterButton } from "@/components/CustomButtons"
import { FormPendingSpinner } from "@/components/Loading"
import { showToast } from "@/components/Toasts"
import { createWorkout } from "@/util/actions/workout"
import { INIT_WORKOUT, useWorkoutInForm } from "@/util/hooks/useWorkoutInForm"
import { ExercisesList } from "./ExercisesList"
import { FormPagesFooterWrapper } from "./FormPagesFooterWrapper"
import { DescriptionInput, TitleInput } from "./WorkoutInputs"

export const CreateWorkoutForm = () => {
  const {
    workout,
    handleTitleInput,
    resetTitleInput,
    handleDescriptionInput,
    resetDescriptionInput,
    updateExercises,
    resetWorkoutForm,
  } = useWorkoutInForm(INIT_WORKOUT)

  const {
    data: actionRes,
    mutate: serverAction,
    isPending,
  } = useMutation({
    mutationFn: createWorkout,
    onSuccess: (res) => {
      if (res.status === "success-redirect") {
        resetWorkoutForm()
        showToast(res.message, "/current", "View workouts")
      } else {
        showToast(res.message)
      }
    },
  })

  return (
    <>
      <main className="mt-safe-top pt-[142px] pb-[73px]">
        <form
          id="create-workout-form"
          onSubmit={(e) => {
            e.preventDefault()
            serverAction(workout)
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
          form="create-workout-form"
          pending={isPending}
          label="Create"
          loading="Creating..."
        />
      </FormPagesFooterWrapper>
    </>
  )
}
