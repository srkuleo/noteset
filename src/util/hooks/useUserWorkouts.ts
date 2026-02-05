import { useEffect, useState } from "react"
import type { WorkoutToRemoveType } from "@/db/schema"
import { SWIPE_AND_DRAWER_TIMEOUT, timeout } from "../utils"

const INIT_WORKOUT_TO_REMOVE: WorkoutToRemoveType = {
  id: 0,
  title: "",
  status: "current",
}

//Used by Logs and Workouts (current and archived) pages
export const useUserWorkouts = <T extends WorkoutToRemoveType>({
  workoutsFromServer,
}: {
  workoutsFromServer: T[]
}) => {
  const [workouts, setWorkouts] = useState(workoutsFromServer)
  const [workoutToRemove, setWorkoutToRemove] = useState(INIT_WORKOUT_TO_REMOVE)
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    console.log("Effect run!")
    setWorkouts(workoutsFromServer)
  }, [workoutsFromServer])

  function removeWorkoutOnClient(workoutId: number) {
    timeout(SWIPE_AND_DRAWER_TIMEOUT)

    setWorkouts((prev) => prev.filter((workout) => workout.id !== workoutId))
  }

  function selectWorkoutToRemove(workout: WorkoutToRemoveType) {
    setWorkoutToRemove(workout)
  }

  function toggleModal() {
    setOpenModal((open) => !open)
  }

  return {
    workouts,
    workoutToRemove,
    openModal,
    removeWorkoutOnClient,
    selectWorkoutToRemove,
    toggleModal,
  }
}
