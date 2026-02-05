import debounce from "lodash.debounce"
import { useRef, useState } from "react"
import type { CurrentWorkoutForFormsType } from "@/db/schema"
import type {
  ExerciseToDoClientType,
  ExerciseType,
  SetType,
  SetWithIndexProp,
  WorkoutToDoClientType,
} from "../types"
import { generateRandomId } from "../utils"

/* 
Contains:

- workout and placeholderExercises state which are needed to properly render input field
- bunch of handlers which are used to apply logic (adding and remove sets, adding new exercise, 
editing note, handling sets inputs, toggle done state on exercise etc.)

*/

export const useWorkoutToDo = (initWorkout: CurrentWorkoutForFormsType) => {
  const [placeholderExercises, setPlaceholderExercises] = useState(initWorkout.exercises)
  const [workout, setWorkout] = useState<WorkoutToDoClientType>({
    title: initWorkout.title,
    description: initWorkout.description,
    exercises: initWorkout.exercises.map((exercise): ExerciseToDoClientType => {
      return {
        ...exercise,
        sets: exercise.sets.map((set) => ({
          id: set.id,
          purpose: set.purpose,
          reps: "",
          weight: "",
        })),
        done: false,
      }
    }),
  })
  const exerciseRefs = useRef<(HTMLDivElement | undefined | null)[]>([])

  function toggleExerciseDoneState(exerciseId: string) {
    const modifiedCurrExercises = workout.exercises.map((exercise) =>
      exercise.id === exerciseId
        ? {
            ...exercise,
            done: !exercise.done,
          }
        : exercise
    )

    setWorkout((prev) => {
      return {
        ...prev,
        exercises: modifiedCurrExercises,
      }
    })
  }

  function handleNoteInput(event: React.ChangeEvent<HTMLInputElement>, exerciseId: string) {
    const modifiedCurrExercises = workout.exercises.map((exercise) =>
      exercise.id === exerciseId
        ? {
            ...exercise,
            note: event.target.value,
          }
        : exercise
    )

    setWorkout((prev) => {
      return { ...prev, exercises: modifiedCurrExercises }
    })
  }

  function resetNoteInput(exerciseId: string) {
    const modifiedCurrExercises = workout.exercises.map((exercise) =>
      exercise.id === exerciseId
        ? {
            ...exercise,
            note: "",
          }
        : exercise
    )

    setWorkout((prev) => {
      return { ...prev, exercises: modifiedCurrExercises }
    })
  }

  const handleSetsInput = debounce(
    (e: React.ChangeEvent<HTMLInputElement>, exerciseId: string, setId: string) => {
      const modifiedExercises = workout.exercises.map((exercise) =>
        exercise.id === exerciseId
          ? {
              ...exercise,
              sets: exercise.sets.map((set) =>
                set.id === setId
                  ? {
                      ...set,
                      [e.target.name]: e.target.value,
                    }
                  : set
              ),
            }
          : exercise
      )

      setWorkout((prev) => {
        return { ...prev, exercises: modifiedExercises }
      })
    },
    200
  )

  function addNewSet(exerciseId: string, { purpose, index, reps, weight }: SetWithIndexProp) {
    const newSet: SetType = {
      id: generateRandomId(10),
      purpose,
      reps,
      weight,
    }

    const newSetWithoutValues = { ...newSet, reps: "", weight: "" }

    const exerciseToModify = workout.exercises.find((exercise) => exercise.id === exerciseId)

    const placeholderExerciseToModify = placeholderExercises.find(
      (exercise) => exercise.id === exerciseId
    )

    if (!exerciseToModify || !placeholderExerciseToModify) return

    const warmupSets = exerciseToModify.sets.filter((set) => set.purpose === "warmup")
    const workingSets = exerciseToModify.sets.filter((set) => set.purpose === "working")

    const placeholderWarmupSets = placeholderExerciseToModify.sets.filter(
      (set) => set.purpose === "warmup"
    )
    const placeholderWorkingSets = placeholderExerciseToModify.sets.filter(
      (set) => set.purpose === "working"
    )

    let modifiedWarmupSets: SetType[], modifiedWorkingSets: SetType[]
    let modifiedPlaceholderWarmupSets: SetType[], modifiedPlaceholderWorkingSets: SetType[]
    let updatedSets: SetType[], updatedPlaceholderSets: SetType[]

    if (newSet.purpose === "warmup") {
      modifiedWarmupSets = [
        ...warmupSets.slice(0, index),
        newSetWithoutValues,
        ...warmupSets.slice(index),
      ]

      modifiedPlaceholderWarmupSets = [
        ...placeholderWarmupSets.slice(0, index),
        newSet,
        ...placeholderWarmupSets.slice(index),
      ]

      updatedSets = [...modifiedWarmupSets, ...workingSets]
      updatedPlaceholderSets = [...modifiedPlaceholderWarmupSets, ...placeholderWorkingSets]
    } else {
      modifiedWorkingSets = [
        ...workingSets.slice(0, index),
        newSetWithoutValues,
        ...workingSets.slice(index),
      ]

      modifiedPlaceholderWorkingSets = [
        ...placeholderWorkingSets.slice(0, index),
        newSet,
        ...placeholderWorkingSets.slice(index),
      ]

      updatedSets = [...warmupSets, ...modifiedWorkingSets]
      updatedPlaceholderSets = [...placeholderWarmupSets, ...modifiedPlaceholderWorkingSets]
    }

    const modifiedCurrExercises = workout.exercises.map((exercise) =>
      exercise.id === exerciseId
        ? {
            ...exercise,
            sets: updatedSets,
          }
        : exercise
    )

    const modifiedPlaceholderExercises = placeholderExercises.map((exercise) =>
      exercise.id === exerciseId
        ? {
            ...exercise,
            sets: updatedPlaceholderSets,
          }
        : exercise
    )

    setWorkout((prev) => {
      return { ...prev, exercises: modifiedCurrExercises }
    })

    setPlaceholderExercises(modifiedPlaceholderExercises)
  }

  function removeSet(exerciseId: string, setId: string) {
    const modifiedCurrExercises = workout.exercises.map((exercise) =>
      exercise.id === exerciseId
        ? {
            ...exercise,
            sets: exercise.sets.filter((set) => set.id !== setId),
          }
        : exercise
    )

    const modifiedPlaceholderExercises = placeholderExercises.map((exercise) =>
      exercise.id === exerciseId
        ? {
            ...exercise,
            sets: exercise.sets.filter((set) => set.id !== setId),
          }
        : exercise
    )

    setWorkout((prev) => {
      return {
        ...prev,
        exercises: modifiedCurrExercises,
      }
    })

    setPlaceholderExercises(modifiedPlaceholderExercises)
  }

  function updateExercises(newExercise: ExerciseType) {
    const newExerciseForCurrWorkout: ExerciseToDoClientType = {
      ...newExercise,
      done: false,
      sets: newExercise.sets.map((set) => {
        return { id: set.id, purpose: set.purpose, reps: "", weight: "" }
      }),
    }

    setWorkout((prev) => {
      return {
        ...prev,
        exercises: [...prev.exercises, newExerciseForCurrWorkout],
      }
    })

    setPlaceholderExercises((prev) => {
      return [...prev, newExercise]
    })
  }

  return {
    workout,
    placeholderExercises,
    exerciseRefs,
    toggleExerciseDoneState,
    handleNoteInput,
    resetNoteInput,
    handleSetsInput,
    addNewSet,
    removeSet,
    updateExercises,
  }
}
