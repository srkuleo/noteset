import { useState } from "react";
import { generateRandomId } from "../utils";

import type { ExerciseActionResponse, ExerciseType, SetType } from "../types";

const initExerciseErrors: ExerciseActionResponse = {
  status: "unset",
  errors: {},
  message: "",
};

export const useExerciseForm = (initExercise: ExerciseType) => {
  const [tempExercise, setTempExercise] = useState(initExercise);
  const [exerciseFormErrors, setExerciseFormErrors] =
    useState(initExerciseErrors);

  function handleNameInput(event: React.ChangeEvent<HTMLInputElement>) {
    setTempExercise((prev) => {
      return {
        ...prev,
        name: event.target.value,
      };
    });
  }

  function handleNoteInput(event: React.ChangeEvent<HTMLInputElement>) {
    setTempExercise((prev) => {
      return {
        ...prev,
        note: event.target.value,
      };
    });
  }

  function createSets(newSetCount: number) {
    const currSets = tempExercise.sets;

    if (newSetCount > currSets.length) {
      const modifiedSets = [
        ...currSets,
        ...Array(newSetCount - currSets.length)
          .fill(null)
          .map(
            (): SetType => ({
              id: generateRandomId(10),
              reps: "",
              weight: "",
              warmup: false,
            }),
          ),
      ];

      setTempExercise((prev) => {
        return {
          ...prev,
          sets: modifiedSets,
        };
      });
    } else if (newSetCount < currSets.length) {
      const modifiedSets = currSets.slice(0, newSetCount);

      setTempExercise((prev) => {
        return {
          ...prev,
          sets: modifiedSets,
        };
      });
    }

    if (
      exerciseFormErrors.errors?.sets &&
      exerciseFormErrors.errors.sets.length > 0
    ) {
      setExerciseFormErrors((prev) => {
        return {
          ...prev,
          errors: {
            ...prev.errors,
            sets: undefined,
          },
        };
      });
    }
  }

  function markSetAsWarmup(setId: string) {
    const modifiedSets = tempExercise.sets.map((set) =>
      set.id === setId ? { ...set, warmup: !set.warmup } : set,
    );

    setTempExercise((prev) => {
      return {
        ...prev,
        sets: modifiedSets,
      };
    });
  }

  function modifySets(e: React.ChangeEvent<HTMLInputElement>, setId: string) {
    const modifiedSets = tempExercise.sets.map((set) =>
      set.id === setId ? { ...set, [e.target.name]: e.target.value } : set,
    );

    setTempExercise((prev) => {
      return {
        ...prev,
        sets: modifiedSets,
      };
    });
  }

  return {
    tempExercise,
    exerciseFormErrors,
    setExerciseFormErrors,
    handleNameInput,
    handleNoteInput,
    createSets,
    markSetAsWarmup,
    modifySets,
  };
};
