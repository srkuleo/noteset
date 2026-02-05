import { useState } from "react"
import z from "zod"
import type {
  CreateExerciseFormType,
  ExerciseActionResponse,
  ExerciseError,
  ExerciseType,
  LimbInvolvement,
  SetType,
  UpdateSetsAction,
  UseExerciseFormReturn,
} from "../types"
import { generateRandomId, insertSet } from "../utils"

const INIT_EXERCISE: CreateExerciseFormType = {
  limbInvolvement: undefined,
  name: "",
  note: "",
  sets: [],
}

const INIT_EXERCISE_ERRORS: ExerciseActionResponse = {
  errors: {},
}

export function useExerciseForm(): UseExerciseFormReturn<CreateExerciseFormType>
export function useExerciseForm(initExercise?: ExerciseType): UseExerciseFormReturn<ExerciseType>

export function useExerciseForm(initExercise?: ExerciseType) {
  const [tempExercise, setTempExercise] = useState<ExerciseType | CreateExerciseFormType>(
    initExercise ?? INIT_EXERCISE
  )
  const [exerciseFormErrors, setExerciseFormErrors] = useState(INIT_EXERCISE_ERRORS)

  function handleNameInput(event: React.ChangeEvent<HTMLInputElement>) {
    setTempExercise((prev) => ({
      ...prev,
      name: event.target.value,
    }))
  }

  function resetNameInput() {
    setTempExercise((prev) => ({
      ...prev,
      name: INIT_EXERCISE.name,
    }))
  }

  function handleNoteInput(event: React.ChangeEvent<HTMLInputElement>) {
    setTempExercise((prev) => ({
      ...prev,
      note: event.target.value,
    }))
  }

  function resetNoteInput() {
    setTempExercise((prev) => ({
      ...prev,
      note: INIT_EXERCISE.note,
    }))
  }

  function handleLimbInvolvementInput(value: LimbInvolvement) {
    setTempExercise((prev) => ({
      ...prev,
      limbInvolvement: value,
    }))
  }

  function updateSets(action: UpdateSetsAction) {
    switch (action.type) {
      case "create": {
        const { index, purpose, reps, weight } = action.set

        const newSet: SetType = {
          id: generateRandomId(10),
          purpose,
          reps,
          weight,
        }

        setTempExercise((prev) => ({
          ...prev,
          sets: insertSet(prev.sets, newSet, index),
        }))

        const setsError = exerciseFormErrors.errors?.sets

        if (setsError?.length) {
          resetSetsError()
        }

        return
      }

      case "edit": {
        setTempExercise((prev) => ({
          ...prev,
          sets: prev.sets.map((set) =>
            set.id === action.setId
              ? {
                  ...set,
                  [action.event.target.name]: action.event.target.value,
                }
              : set
          ),
        }))

        return
      }

      case "remove": {
        setTempExercise((prev) => ({
          ...prev,
          sets: prev.sets.filter((set) => set.id !== action.setId),
        }))

        return
      }
    }
  }

  function handleExerciseErrors(error: ExerciseError) {
    const { properties: fields } = z.treeifyError(error)

    let repsError: string | undefined, weightError: string | undefined

    const setItems = fields?.sets?.items

    if (setItems?.length) {
      repsError = setItems.find((item) => item?.properties?.reps?.errors?.[0])?.properties?.reps
        ?.errors?.[0]

      weightError = setItems.find((item) => item?.properties?.weight?.errors?.[0])?.properties
        ?.weight?.errors?.[0]
    }

    setExerciseFormErrors({
      errors: {
        name: fields?.name?.errors,
        sets: fields?.sets?.errors,
        reps: repsError ? [repsError] : undefined,
        weight: weightError ? [weightError] : undefined,
      },
    })
  }

  function resetExerciseErrors() {
    setExerciseFormErrors(INIT_EXERCISE_ERRORS)
  }

  function resetSetsError() {
    setExerciseFormErrors((prev) => ({
      ...prev,
      errors: {
        ...prev.errors,
        sets: undefined,
      },
    }))
  }

  return {
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
  }
}
