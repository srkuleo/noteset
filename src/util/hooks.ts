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
    setTempExercise({
      ...tempExercise,
      name: input,
    });
  }

  function handleSetsInput(input: string | number) {
    const sets = Number(input);
    const reps = Array.from({ length: sets }, () => "");
    const weights = Array.from({ length: sets }, () => "");

    setTempExercise({
      ...tempExercise,
      sets: sets,
      reps: [...reps],
      weights: [...weights],
    });

    if (
      exerciseFormErrors.errors?.sets &&
      exerciseFormErrors.errors.sets.length > 0
    ) {
      setExerciseFormErrors({
        ...exerciseFormErrors,
        errors: {
          ...exerciseFormErrors.errors,
          sets: undefined,
        },
      });
    }
  }

  function handleRepsInput(eventValue: string, index: number) {
    const modifiedReps = tempExercise.reps.toSpliced(index, 1, eventValue);

    setTempExercise({ ...tempExercise, reps: [...modifiedReps] });
  }

  function handleWeightInput(eventValue: string, index: number) {
    const modifiedWeights = tempExercise.weights.toSpliced(
      index,
      1,
      eventValue,
    );

    setTempExercise({ ...tempExercise, weights: [...modifiedWeights] });
  }

  function generateExerciseId() {
    const randomComponent = Math.random().toString(36).substring(2, 10);
    return "id" + String(Date.now()) + randomComponent;
  }

  return {
    tempExercise,
    exerciseFormErrors,
    setExerciseFormErrors,
    handleNameInput,
    handleSetsInput,
    handleRepsInput,
    handleWeightInput,
    generateExerciseId,
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
    setWorkout({
      title: workout.title,
      description: workout.description,
      exercises: [...workout.exercises, newExercise],
    });

    if (actionRes.errors?.exercises && actionRes.errors.exercises.length > 0) {
      setActionRes({
        ...actionRes,
        errors: {
          ...actionRes.errors,
          exercises: undefined,
        },
      });
    }
  }

  function editExercises(editedExercise: ExerciseType) {
    const modifiedExercises = workout.exercises.map((exercise) =>
      exercise.id === editedExercise.id ? editedExercise : exercise,
    );

    setWorkout({
      title: workout.title,
      description: workout.description,
      exercises: [...modifiedExercises],
    });
  }

  function removeExercise(id: string) {
    const modifiedExercises = workout.exercises.filter(
      (exercise) => exercise.id !== id,
    );

    setWorkout({
      title: workout.title,
      description: workout.description,
      exercises: modifiedExercises,
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
