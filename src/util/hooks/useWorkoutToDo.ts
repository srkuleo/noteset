import debounce from "lodash.debounce";
import { useState } from "react";
import { generateRandomId } from "../utils";

import type {
  CreateWorkoutType,
  WorkoutToDoType,
  ExerciseToDoType,
  SetWithoutId,
  SetType,
  ExerciseType,
} from "../types";

/* 
Contains:

- currWorkout and placeholderExercises state which are needed to properly render input field
- bunch of handlers which are used to apply logic (adding and remove sets, adding new exercise, 
editing note, handling sets inputs, toggle done state on exercise etc.)

*/

export const useWorkoutToDo = (initWorkout: CreateWorkoutType) => {
  const [placeholderExercises, setPlaceholderExercises] = useState(
    initWorkout.exercises,
  );
  const [currWorkout, setCurrWorkout] = useState<WorkoutToDoType>({
    title: initWorkout.title,
    description: initWorkout.description,
    exercises: initWorkout.exercises.map((exercise): ExerciseToDoType => {
      return {
        ...exercise,
        sets: exercise.sets.map((set) => ({
          id: set.id,
          warmup: set.warmup,
          reps: "",
          weight: "",
        })),
        done: false,
      };
    }),
  });

  function toggleExerciseDoneState(exerciseId: string) {
    const modifiedCurrExercises = currWorkout.exercises.map((exercise) =>
      exercise.id === exerciseId
        ? {
            ...exercise,
            done: !exercise.done,
          }
        : exercise,
    );

    setCurrWorkout((prev) => {
      return {
        ...prev,
        exercises: modifiedCurrExercises,
      };
    });
  }

  function handleNoteInput(
    event: React.ChangeEvent<HTMLTextAreaElement>,
    exerciseId: string,
  ) {
    const modifiedCurrExercises = currWorkout.exercises.map((exercise) =>
      exercise.id === exerciseId
        ? {
            ...exercise,
            note: event.target.value,
          }
        : exercise,
    );

    setCurrWorkout((prev) => {
      return { ...prev, exercises: modifiedCurrExercises };
    });
  }

  function resetNoteInput(exerciseId: string) {
    const modifiedCurrExercises = currWorkout.exercises.map((exercise) =>
      exercise.id === exerciseId
        ? {
            ...exercise,
            note: "",
          }
        : exercise,
    );

    setCurrWorkout((prev) => {
      return { ...prev, exercises: modifiedCurrExercises };
    });
  }

  const handleSetsInput = debounce(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      exerciseId: string,
      setId: string,
    ) => {
      const modifiedExercises = currWorkout.exercises.map((exercise) =>
        exercise.id === exerciseId
          ? {
              ...exercise,
              sets: exercise.sets.map((set) =>
                set.id === setId
                  ? {
                      ...set,
                      [e.target.name]: e.target.value,
                    }
                  : set,
              ),
            }
          : exercise,
      );

      setCurrWorkout((prev) => {
        return { ...prev, exercises: modifiedExercises };
      });
    },
    200,
  );

  function addNewSet(
    exerciseId: string,
    setData: SetWithoutId,
    setIndex: number,
  ) {
    const newSet: SetType = {
      id: generateRandomId(10),
      reps: setData.reps,
      weight: setData.weight,
      warmup: setData.warmup,
    };

    const newSetWithoutValues = { ...newSet, reps: "", weight: "" };

    const exerciseToModify = currWorkout.exercises.find(
      (exercise) => exercise.id === exerciseId,
    );

    const placeholderExerciseToModify = placeholderExercises.find(
      (exercise) => exercise.id === exerciseId,
    );

    if (!exerciseToModify || !placeholderExerciseToModify) return;

    const warmupSets = exerciseToModify.sets.filter((set) => set.warmup);
    const workingSets = exerciseToModify.sets.filter((set) => !set.warmup);

    const placeholderWarmupSets = placeholderExerciseToModify.sets.filter(
      (set) => set.warmup,
    );
    const placeholderWorkingSets = placeholderExerciseToModify.sets.filter(
      (set) => !set.warmup,
    );

    let modifiedWarmupSets = warmupSets;
    let modifiedWorkingSets = workingSets;

    let modifiedPlaceholderWarmupSets = placeholderWarmupSets;
    let modifiedPlaceholderWorkingSets = placeholderWorkingSets;

    if (newSet.warmup) {
      modifiedWarmupSets = [
        ...warmupSets.slice(0, setIndex),
        newSetWithoutValues,
        ...warmupSets.slice(setIndex),
      ];

      modifiedPlaceholderWarmupSets = [
        ...placeholderWarmupSets.slice(0, setIndex),
        newSet,
        ...placeholderWarmupSets.slice(setIndex),
      ];
    } else {
      modifiedWorkingSets = [
        ...workingSets.slice(0, setIndex),
        newSetWithoutValues,
        ...workingSets.slice(setIndex),
      ];

      modifiedPlaceholderWorkingSets = [
        ...placeholderWorkingSets.slice(0, setIndex),
        newSet,
        ...placeholderWorkingSets.slice(setIndex),
      ];
    }

    const updatedSets = [...modifiedWarmupSets, ...modifiedWorkingSets];
    const updatedPlaceholderSets = [
      ...modifiedPlaceholderWarmupSets,
      ...modifiedPlaceholderWorkingSets,
    ];

    const modifiedCurrExercises = currWorkout.exercises.map((exercise) =>
      exercise.id === exerciseId
        ? {
            ...exercise,
            sets: updatedSets,
          }
        : exercise,
    );

    const modifiedPlaceholderExercises = placeholderExercises.map((exercise) =>
      exercise.id === exerciseId
        ? {
            ...exercise,
            sets: updatedPlaceholderSets,
          }
        : exercise,
    );

    setCurrWorkout((prev) => {
      return { ...prev, exercises: modifiedCurrExercises };
    });

    setPlaceholderExercises(modifiedPlaceholderExercises);
  }

  function removeSet(exerciseId: string, setId: string) {
    const modifiedCurrExercises = currWorkout.exercises.map((exercise) =>
      exercise.id === exerciseId
        ? {
            ...exercise,
            sets: exercise.sets.filter((set) => set.id !== setId),
          }
        : exercise,
    );

    const modifiedPlaceholderExercises = placeholderExercises.map((exercise) =>
      exercise.id === exerciseId
        ? {
            ...exercise,

            sets: exercise.sets.filter((set) => set.id !== setId),
          }
        : exercise,
    );

    setCurrWorkout((prev) => {
      return {
        ...prev,
        exercises: modifiedCurrExercises,
      };
    });

    setPlaceholderExercises(modifiedPlaceholderExercises);
  }

  function updateExercises(newExercise: ExerciseType) {
    const newExerciseForCurrWorkout: ExerciseType = {
      ...newExercise,
      sets: newExercise.sets.map((set) => {
        return { id: set.id, warmup: set.warmup, reps: "", weight: "" };
      }),
    };

    setCurrWorkout((prev) => {
      return {
        ...prev,
        exercises: [...prev.exercises, newExerciseForCurrWorkout],
      };
    });

    setPlaceholderExercises((prev) => {
      return [...prev, newExercise];
    });
  }

  return {
    currWorkout,
    placeholderExercises,
    toggleExerciseDoneState,
    handleNoteInput,
    resetNoteInput,
    handleSetsInput,
    addNewSet,
    removeSet,
    updateExercises,
  };
};
