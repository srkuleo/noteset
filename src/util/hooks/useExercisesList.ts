import { useState } from "react";

import type { ExerciseType } from "../types";

export const useExercisesList = () => {
  const [openEditDrawer, setOpenEditDrawer] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [exerciseInFocus, setExerciseInFocus] = useState<ExerciseType>({
    id: "",
    name: "",
    sets: [],
    note: "",
    lastUpdated: null,
  });

  function toggleEditDrawer() {
    setOpenEditDrawer(!openEditDrawer);
  }

  function toggleRemoveModal() {
    setOpenRemoveModal(!openRemoveModal);
  }

  function keepTrackOfTheCurrExercise(targetedExercise: ExerciseType) {
    setExerciseInFocus(targetedExercise);
  }

  return {
    openEditDrawer,
    openRemoveModal,
    exerciseInFocus,
    toggleEditDrawer,
    toggleRemoveModal,
    keepTrackOfTheCurrExercise,
  };
};
