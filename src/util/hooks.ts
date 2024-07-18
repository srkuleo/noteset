import { useState } from "react";

import type {
  ExerciseType,
  WorkoutWithoutIds,
  ExerciseActionResponse,
  WorkoutActionResponse,
} from "./types";

const initErrors: ExerciseActionResponse = {
  errors: {},
  message: "",
};

export const useExerciseForm = (initExercise: ExerciseType) => {
  const [tempExercise, setTempExercise] = useState(initExercise);
  const [exerciseFormErrors, setExerciseFormErrors] = useState(initErrors);

  function handleNameInput(input: string) {
    setTempExercise((prev) => {
      return {
        ...prev,
        name: input,
      };
    });
  }

  function handleSetsInput(input: string | number) {
    const sets = Number(input);
    const reps = Array.from({ length: sets }, () => "");
    const weights = Array.from({ length: sets }, () => "");

    setTempExercise((prev) => {
      return {
        ...prev,
        sets: sets,
        reps: reps,
        weights: weights,
      };
    });

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

  function handleRepsInput(eventValue: string, index: number) {
    const modifiedReps = tempExercise.reps.toSpliced(index, 1, eventValue);

    setTempExercise((prev) => {
      return {
        ...prev,
        reps: modifiedReps,
      };
    });
  }

  function handleWeightInput(eventValue: string, index: number) {
    const modifiedWeights = tempExercise.weights.toSpliced(
      index,
      1,
      eventValue,
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
    handleSetsInput,
    handleRepsInput,
    handleWeightInput,
  };
};

export const emptyWorkout: WorkoutWithoutIds = {
  title: "",
  description: "",
  exercises: [],
};

const emptyRes: WorkoutActionResponse = {
  status: "unset",
  message: "",
  errors: {},
};

/* 
Contains:

- workout state (data passed to server action)
- actionRes state (preserve the server action response needed for rendering errors)
- resetForm function (resets form fields if res.status is successful on workout creation)
- three handler functions for creating, editing or removing existing exercise inside a workout 

*/

export const useWorkouts = (initWorkout: WorkoutWithoutIds) => {
  const [workout, setWorkout] = useState(initWorkout);
  const [actionRes, setActionRes] = useState(emptyRes);

  function updateExercises(newExercise: ExerciseType) {
    setWorkout((prev) => {
      return {
        ...prev,
        exercises: [...prev.exercises, newExercise],
      };
    });

    if (actionRes.errors?.exercises && actionRes.errors.exercises.length > 0) {
      setActionRes((prev) => {
        return {
          ...prev,
          errors: { ...prev.errors, exercises: undefined },
        };
      });
    }
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
    actionRes,
    setWorkout,
    setActionRes,
    updateExercises,
    editExercises,
    removeExercise,
    resetWorkoutForm,
  };
};
