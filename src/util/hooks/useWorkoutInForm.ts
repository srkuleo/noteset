import { useState } from "react"
import type { CurrentWorkoutForFormsType } from "@/db/schema"
import type { ExerciseType, UpdateExercisesAction } from "../types"
import { generateRandomId } from "../utils"

export const INIT_WORKOUT: CurrentWorkoutForFormsType = {
  title: "",
  description: "",
  exercises: [],
}

export const useWorkoutInForm = (initWorkout?: CurrentWorkoutForFormsType) => {
  const [workout, setWorkout] = useState(initWorkout ?? INIT_WORKOUT)

  function handleTitleInput(event: React.ChangeEvent<HTMLInputElement>) {
    setWorkout((prev) => ({
      ...prev,
      title: event.target.value,
    }))
  }

  function resetTitleInput() {
    setWorkout((prev) => ({
      ...prev,
      title: INIT_WORKOUT.title,
    }))
  }

  function handleDescriptionInput(event: React.ChangeEvent<HTMLInputElement>) {
    setWorkout((prev) => ({
      ...prev,
      description: event.target.value,
    }))
  }

  function resetDescriptionInput() {
    setWorkout((prev) => ({
      ...prev,
      description: INIT_WORKOUT.description,
    }))
  }

  function updateExercises(action: UpdateExercisesAction) {
    setWorkout((prev) => {
      switch (action.type) {
        case "reorder":
          return {
            ...prev,
            exercises: [...action.exercises],
          }

        case "edit":
          return {
            ...prev,
            exercises: prev.exercises.map((exercise) =>
              exercise.id === action.exercise.id
                ? { ...action.exercise, lastUpdateTimestamp: Date.now() }
                : exercise
            ),
          }

        case "remove":
          return {
            ...prev,
            exercises: prev.exercises.filter((exercise) => exercise.id !== action.exerciseId),
          }

        case "create": {
          const completeExercise: ExerciseType = {
            ...action.exercise,
            id: generateRandomId(10),
            lastUpdateTimestamp: Date.now(),
          }

          return {
            ...prev,
            exercises: [...prev.exercises, completeExercise],
          }
        }
      }
    })
  }

  function resetWorkoutForm() {
    setWorkout(INIT_WORKOUT)
  }

  return {
    workout,
    handleTitleInput,
    resetTitleInput,
    handleDescriptionInput,
    resetDescriptionInput,
    updateExercises,
    resetWorkoutForm,
  }
}
