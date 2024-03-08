import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import { createWorkout } from "./actions";
import { showToast } from "@/components/user/Toasts";

import type {
  ExerciseActionResponse,
  ExerciseType,
  WorkoutActionResponse,
} from "./types";

const initErrors: ExerciseActionResponse = {
  errors: {},
  message: "",
};

export const useExerciseForm = (initExercise: ExerciseType) => {
  const [tempExercise, setTempExercise] = useState(initExercise);
  const [needMoreSets, setNeedMoreSets] = useState(false);
  const [exerciseFormErrors, setExerciseFormErrors] = useState(initErrors);
  const chooseSets = [1, 2, 3, 4] as const;

  const handleSetsInput = (input: string | number) => {
    const sets = Number(input);
    const reps = Array.from({ length: sets }, () => "");
    const weights = Array.from({ length: sets }, () => 0);

    setTempExercise({
      ...tempExercise,
      sets: sets,
      reps: [...reps],
      weights: [...weights],
    });
  };

  const handleRepsInput = (eventValue: string, index: number) => {
    const modifiedReps = tempExercise.reps.toSpliced(index, 1, eventValue);

    console.log(modifiedReps);

    setTempExercise({ ...tempExercise, reps: [...modifiedReps] });
  };

  const handleWeightInput = (eventValue: string, index: number) => {
    const weight = Number(eventValue);

    const modifiedWeights = tempExercise.weights.toSpliced(index, 1, weight);

    console.log(modifiedWeights);

    setTempExercise({ ...tempExercise, weights: [...modifiedWeights] });
  };

  return {
    chooseSets,
    tempExercise,
    needMoreSets,
    exerciseFormErrors,
    setTempExercise,
    setNeedMoreSets,
    setExerciseFormErrors,
    handleSetsInput,
    handleRepsInput,
    handleWeightInput,
  };
};

export const useToastNotification = (formState: WorkoutActionResponse) => {
  const prevTimestamp = useRef(formState.timestamp);

  //renders a new toast notif for every form validation process
  useEffect(() => {
    if (formState.message && formState.timestamp !== prevTimestamp.current) {
      if (formState.status === "error") {
        showToast(formState.message, "error");
      } else {
        showToast(formState.message, "success");
      }
    }
  }, [formState.status, formState.message, formState.timestamp]);
};

const initExercises: ExerciseType[] = [];

const emptyFormState: WorkoutActionResponse = {
  status: "unset",
  message: "",
  errors: {},
  timestamp: Date.now(),
};

/* contains exercises state, setter, ref for the workout form reset, 
formState and formAction for handling validation on the server 
and saving error messages to be rendered in toast notif and below inputs */
export const useWorkouts = (userId: string) => {
  const [exercises, setExercises] = useState(initExercises);
  const [formState, formAction] = useFormState(
    createWorkout.bind(null, userId, exercises),
    emptyFormState,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const prevTimestamp = useRef(formState.timestamp);

  //resets form if workout is created and empties exercises state
  useEffect(() => {
    if (!formRef.current) return;

    if (
      formState.status === "success" &&
      formState.timestamp !== prevTimestamp.current
    ) {
      formRef.current.reset();

      setExercises(initExercises);

      prevTimestamp.current = formState.timestamp;
    }
  }, [formState.status, formState.timestamp]);

  function updateExercises(newExercise: ExerciseType) {
    setExercises([...exercises, { ...newExercise }]);
  }

  function editExercises(editedExercise: ExerciseType, index: number) {
    const modifiedExercises = exercises.toSpliced(index, 1, editedExercise);
    setExercises([...modifiedExercises]);
  }

  return {
    formRef,
    exercises,
    updateExercises,
    editExercises,
    formState,
    formAction,
  };
};
