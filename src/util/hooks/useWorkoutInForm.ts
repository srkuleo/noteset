import { useState } from "react";
import type { CreateWorkoutType, ExerciseType } from "../types";

/* 
Contains:

- workout state (data passed to server action)
- resetForm function (resets form fields if res.status is successful on workout creation)
- five handler functions for creating, editing or removing existing exercise inside a workout and 
handling title and description input

*/

export const emptyWorkout: CreateWorkoutType = {
  title: "",
  description: "",
  exercises: [],
};

export const useWorkoutInForm = (initWorkout: CreateWorkoutType) => {
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
    const modifiedExercises = workout.exercises.map((exercise) => {
      if (exercise.id === editedExercise.id) {
        return editedExercise;
      } else {
        return exercise;
      }
    });

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
