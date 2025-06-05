import { useState } from "react";
import { SWIPE_AND_DRAWER_TIMEOUT, timeout } from "../utils";

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
    timeout(SWIPE_AND_DRAWER_TIMEOUT);

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
