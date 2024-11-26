import { useState } from "react";

import type { PartialWorkoutType } from "@/db/schema";

const initTargetedWorkout: PartialWorkoutType = {
  id: 0,
  title: "",
  description: "",
  exercises: [],
  status: "current",
};

export const useWorkoutsOnHomePage = (
  initialWorkouts: PartialWorkoutType[],
) => {
  const [workoutsList, setWorkoutsList] = useState(initialWorkouts);
  const [isOpenRemoveModal, setIsOpenRemoveModal] = useState(false);
  const [isOpenPreviewDrawer, setIsOpenPreviewDrawer] = useState(false);
  const [targetedWorkout, setTargetedWorkout] = useState(initTargetedWorkout);

  function removeWorkoutOnClient(workoutId: number) {
    const modifiedWorkouts = workoutsList.filter(
      (workout) => workout.id !== workoutId,
    );

    setWorkoutsList(modifiedWorkouts);
  }

  function setAsTargetedWorkout(workout: PartialWorkoutType) {
    setTargetedWorkout(workout);
  }

  function toggleModal() {
    setIsOpenRemoveModal(!isOpenRemoveModal);
  }

  function toggleDrawer() {
    setIsOpenPreviewDrawer(!isOpenPreviewDrawer);
  }

  return {
    workoutsList,
    targetedWorkout,
    isOpenRemoveModal,
    isOpenPreviewDrawer,
    removeWorkoutOnClient,
    setAsTargetedWorkout,
    toggleModal,
    toggleDrawer,
  };
};
