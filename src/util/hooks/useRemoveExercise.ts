import { useState } from "react"
import type { ExerciseToRemoveType } from "../types"

const INIT_EXERCISE: ExerciseToRemoveType = {
  id: "",
  name: "",
}

export const useRemoveExercise = () => {
  const [openModal, setOpenModal] = useState(false)
  const [exerciseToRemove, setExerciseToRemove] = useState(INIT_EXERCISE)

  function toggleModal() {
    setOpenModal(!openModal)
  }

  function selectExerciseToRemove(exercise: ExerciseToRemoveType) {
    setExerciseToRemove(exercise)
  }

  return {
    openModal,
    exerciseToRemove,
    toggleModal,
    selectExerciseToRemove,
  }
}
