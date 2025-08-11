import { useState } from "react";
import { SWIPE_AND_DRAWER_TIMEOUT, timeout } from "../utils";

import type { WorkoutType } from "@/db/schema";

const initTargetedWorkout: WorkoutType = {
  id: 0,
  title: "",
  description: "",
  exercises: [],
  status: "done",
  doneAt: null,
  duration: null,
};

export const useWorkoutsOnLogsPage = () => {
  const [doneWorkoutsList, setDoneWorkoutsList] = useState<WorkoutType[]>([]);
  const [isOpenRemoveModal, setIsOpenRemoveModal] = useState(false);
  const [isOpenPreviewDrawer, setIsOpenPreviewDrawer] = useState(false);
  const [targetedWorkout, setTargetedWorkout] = useState(initTargetedWorkout);

  function removeWorkoutOnClient(workoutId: number) {
    timeout(SWIPE_AND_DRAWER_TIMEOUT);

    const modifiedWorkouts = doneWorkoutsList.filter(
      (workout) => workout.id !== workoutId,
    );

    setDoneWorkoutsList(modifiedWorkouts);
  }

  function setAsTargetedWorkout(doneWorkout: WorkoutType) {
    setTargetedWorkout(doneWorkout);
  }

  function toggleModal() {
    setIsOpenRemoveModal(!isOpenRemoveModal);
  }

  function toggleDrawer() {
    setIsOpenPreviewDrawer(!isOpenPreviewDrawer);
  }

  return {
    doneWorkoutsList,
    targetedWorkout,
    isOpenRemoveModal,
    isOpenPreviewDrawer,
    setDoneWorkoutsList,
    removeWorkoutOnClient,
    setAsTargetedWorkout,
    toggleModal,
    toggleDrawer,
  };
};
