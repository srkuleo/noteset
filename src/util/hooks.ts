import { useEffect, useRef, useState } from "react";
import { showToast } from "@/components/user/Toasts";

import type {
  ExerciseType,
  WorkoutWithoutId,
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
    const weights = Array.from({ length: sets }, () => 0);

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

    console.log(modifiedReps);

    setTempExercise({ ...tempExercise, reps: [...modifiedReps] });
  }

  function handleWeightInput(eventValue: string, index: number) {
    const weight = Number(eventValue);

    const modifiedWeights = tempExercise.weights.toSpliced(index, 1, weight);

    console.log(modifiedWeights);

    setTempExercise({ ...tempExercise, weights: [...modifiedWeights] });
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

export const useToastNotification = (
  createWorkoutRes: WorkoutActionResponse,
) => {
  const prevTimestamp = useRef(createWorkoutRes.timestamp);

  //renders a new toast notif for every form validation process
  useEffect(() => {
    if (
      createWorkoutRes.message &&
      createWorkoutRes.timestamp !== prevTimestamp.current
    ) {
      if (createWorkoutRes.status === "error") {
        showToast(createWorkoutRes.message, "error");
      } else {
        showToast(createWorkoutRes.message, "success");
      }
    }
  }, [
    createWorkoutRes.status,
    createWorkoutRes.message,
    createWorkoutRes.timestamp,
  ]);
};

const initWorkout: WorkoutWithoutId = {
  title: "",
  description: "",
  exercises: [],
};

const emptyRes: WorkoutActionResponse = {
  status: "unset",
  message: "",
  errors: {},
  timestamp: Date.now(),
};

/* 
Contains:

- workout state (data passed to server action)
- exercise to remove state (tracks which exercise is to be removed when modal opens)
- createWorkoutRes (a state that preserve the server action feedback, needed for
toast notif, errors and reseting form)
- resetForm function that runs if createWorkoutRes.status is successful
- three handler functions for creating, editing or removing existing exercise inside a workout 

*/

export const useWorkouts = () => {
  const [workout, setWorkout] = useState(initWorkout);
  const [createWorkoutRes, setCreateWorkoutRes] = useState(emptyRes);
  const [exerciseToRemove, setExerciseToRemove] = useState({ name: "", id: 0 });

  function updateExercises(newExercise: ExerciseType) {
    setWorkout({
      title: workout.title,
      description: workout.description,
      exercises: [...workout.exercises, newExercise],
    });

    if (
      createWorkoutRes.errors?.exercises &&
      createWorkoutRes.errors.exercises.length > 0
    ) {
      setCreateWorkoutRes({
        ...createWorkoutRes,
        errors: {
          ...createWorkoutRes.errors,
          exercises: undefined,
        },
      });
    }
  }

  function editExercises(editedExercise: ExerciseType, index: number) {
    const modifiedExercises = workout.exercises.toSpliced(
      index,
      1,
      editedExercise,
    );

    setWorkout({
      title: workout.title,
      description: workout.description,
      exercises: [...modifiedExercises],
    });
  }

  function removeExercise() {
    const modifiedExercises = workout.exercises.filter(
      (_, i) => i !== exerciseToRemove.id,
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
    createWorkoutRes,
    exerciseToRemove,
    setWorkout,
    setCreateWorkoutRes,
    setExerciseToRemove,
    updateExercises,
    editExercises,
    removeExercise,
    resetWorkoutForm,
  };
};
