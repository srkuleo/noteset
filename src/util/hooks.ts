import { useEffect, useRef, useState } from "react";
import { showToast } from "@/components/user/Toasts";

import type { ExerciseType, WorkoutActionResponse } from "./types";
import { createWorkout } from "./actions";
import { useFormState } from "react-dom";

export const useToastNotification = (formState: WorkoutActionResponse) => {
  const prevTimestamp = useRef(formState.timestamp);

  const showToastNotification =
    formState.message && formState.timestamp !== prevTimestamp.current;

  console.log(formState.message, showToastNotification);

  //renders a new toast notif for every form validation process
  useEffect(() => {
    if (showToastNotification) {
      if (formState.status === "error") {
        showToast(formState.message, "error");
      } else {
        showToast(formState.message, "success");
      }
    }
  }, [showToastNotification, formState.status, formState.message]);
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

  function updateExercises(newExercise: ExerciseType) {
    setExercises([...exercises, { ...newExercise }]);
  }

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

  return { formRef, exercises, updateExercises, formState, formAction };
};
