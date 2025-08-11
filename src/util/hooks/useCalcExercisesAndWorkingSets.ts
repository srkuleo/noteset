import { useState, useEffect } from "react";

import type { ExerciseType } from "../types";

export const useCalcExercisesAndWorkingSets = (
  exercises: ExerciseType[],
  logMode?: boolean,
) => {
  const [totalExerciseNumber, setTotalExerciseNumber] = useState("");
  const [totalWorkingSets, setTotalWorkingSets] = useState("");

  useEffect(() => {
    const exerciseCount = logMode
      ? exercises.filter((exercise) => exercise.sets.length > 0).length
      : exercises.length;

    const workingSetsCount = exercises.reduce(
      (total, { sets, movementType }) => {
        const workingSets = sets.filter(
          (set) => set.purpose === "working",
        ).length;

        return (
          total +
          (movementType === "unilateral" ? workingSets * 2 : workingSets)
        );
      },
      0,
    );

    setTotalExerciseNumber(
      `${exerciseCount} exercise${exerciseCount > 1 ? "s" : ""}`,
    );
    setTotalWorkingSets(
      `${workingSetsCount} working set${workingSetsCount > 1 ? "s" : ""}`,
    );
  }, [logMode, exercises]);

  return {
    totalExerciseNumber,
    totalWorkingSets,
  };
};
