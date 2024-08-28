import { useState } from "react";

import type {
  ExerciseType,
  CreateWorkoutType,
  ExerciseActionResponse,
} from "./types";

const initErrors: ExerciseActionResponse = {
  errors: {},
  message: "",
};

export const useExerciseForm = (initExercise: ExerciseType) => {
  const [tempExercise, setTempExercise] = useState(initExercise);
  const [exerciseFormErrors, setExerciseFormErrors] = useState(initErrors);

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

  function handleSetsInput(input: string | number) {
    const newSets = Number(input);
    const currSets = tempExercise.sets;

    if (newSets > currSets) {
      const reps = [
        ...tempExercise.reps,
        ...Array(newSets - currSets).fill(""),
      ];
      const weights = [
        ...tempExercise.weights,
        ...Array(newSets - currSets).fill(""),
      ];

      setTempExercise((prev) => {
        return {
          ...prev,
          sets: newSets,
          reps: reps,
          weights: weights,
        };
      });
    } else if (newSets < currSets) {
      const reps = tempExercise.reps.slice(0, newSets);
      const weights = tempExercise.weights.slice(0, newSets);

      setTempExercise((prev) => {
        return {
          ...prev,
          sets: newSets,
          reps: reps,
          weights: weights,
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

  function handleRepsInput(
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) {
    const modifiedReps = tempExercise.reps.toSpliced(
      index,
      1,
      event.target.value,
    );

    setTempExercise((prev) => {
      return {
        ...prev,
        reps: modifiedReps,
      };
    });
  }

  function handleWeightInput(
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) {
    const modifiedWeights = tempExercise.weights.toSpliced(
      index,
      1,
      event.target.value,
    );

    setTempExercise((prev) => {
      return {
        ...prev,
        weights: modifiedWeights,
      };
    });
  }

  return {
    tempExercise,
    exerciseFormErrors,
    setExerciseFormErrors,
    handleNameInput,
    handleNoteInput,
    handleSetsInput,
    handleRepsInput,
    handleWeightInput,
  };
};

export const emptyWorkout: CreateWorkoutType = {
  title: "",
  description: "",
  exercises: [],
};

/* 
Contains:

- workout state (data passed to server action)
- resetForm function (resets form fields if res.status is successful on workout creation)
- three handler functions for creating, editing or removing existing exercise inside a workout 

*/

export const useWorkouts = (initWorkout: CreateWorkoutType) => {
  const [workout, setWorkout] = useState(initWorkout);

  function handleTitleInput(event: React.ChangeEvent<HTMLInputElement>) {
    setWorkout((prev) => {
      return {
        ...prev,
        title: event.target.value,
      };
    });
  }

  function handleDescriptionInput(event: React.ChangeEvent<HTMLInputElement>) {
    setWorkout((prev) => {
      return {
        ...prev,
        description: event.target.value,
      };
    });
  }

  function updateExercises(newExercise: ExerciseType) {
    setWorkout((prev) => {
      return {
        ...prev,
        exercises: [...prev.exercises, newExercise],
      };
    });
  }

  function editExercises(editedExercise: ExerciseType) {
    const modifiedExercises = workout.exercises.map((exercise) =>
      exercise.id === editedExercise.id ? editedExercise : exercise,
    );

    setWorkout((prev) => {
      return {
        ...prev,
        exercises: modifiedExercises,
      };
    });
  }

  function removeExercise(id: string) {
    const modifiedExercises = workout.exercises.filter(
      (exercise) => exercise.id !== id,
    );

    setWorkout((prev) => {
      return {
        ...prev,
        exercises: modifiedExercises,
      };
    });
  }

  function resetWorkoutForm() {
    setWorkout(initWorkout);
  }

  return {
    workout,
    setWorkout,
    handleTitleInput,
    handleDescriptionInput,
    updateExercises,
    editExercises,
    removeExercise,
    resetWorkoutForm,
  };
};
