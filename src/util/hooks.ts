import debounce from "lodash.debounce";
import { useState } from "react";
import { generateIdFromEntropySize } from "lucia";

import type {
  ExerciseType,
  CreateWorkoutType,
  ExerciseActionResponse,
  SetType,
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

  function createSets(input: string | number) {
    const newSetCount = Number(input);
    const currSets = tempExercise.sets;

    if (newSetCount > currSets.length) {
      const modifiedSets = [
        ...currSets,
        ...Array(newSetCount - currSets.length)
          .fill(null)
          .map(
            (): SetType => ({
              id: generateIdFromEntropySize(10),
              reps: "",
              weight: "",
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
    modifySets,
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
- five handler functions for creating, editing or removing existing exercise inside a workout and 
handling title and description input

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
    const modifiedExercises = workout.exercises.map((exercise) => {
      console.log("Iterating: ", exercise.id, editedExercise.id);
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

/* 
Contains:

- currWorkout and placeholderExercises state which are needed to properly render input field
- temporary placeholders (placeholderExercisesBeforeRemoveMode and exercisesBeforeRemoveMode) which are used to easily revert changes
- removeMode state which enables and disables removeMode, in which user is able to remove certain sets from the exercise
- bunch of handlers which are used to apply logic (adding and remove sets, adding new exercise, 
editing note, handling sets inputs, etc.)

*/

export const useWorkoutToDo = (initWorkout: CreateWorkoutType) => {
  const [placeholderExercises, setPlaceholderExercises] = useState(
    initWorkout.exercises,
  );
  const [
    placeholderExercisesBeforeRemoveMode,
    setPlaceholderExercisesBeforeRemoveMode,
  ] = useState([...placeholderExercises]);
  const [currWorkout, setCurrWorkout] = useState<CreateWorkoutType>({
    title: initWorkout.title,
    description: initWorkout.description,
    exercises: initWorkout.exercises.map((exercise): ExerciseType => {
      return {
        ...exercise,
        sets: exercise.sets.map((set) => ({
          id: set.id,
          reps: "",
          weight: "",
        })),
      };
    }),
  });
  const [exercisesBeforeRemoveMode, setExercisesBeforeRemoveMode] = useState([
    ...currWorkout.exercises,
  ]);

  const [removeMode, setRemoveMode] = useState(false);

  function handleNoteInput(
    event: React.ChangeEvent<HTMLInputElement>,
    exerciseId: string,
  ) {
    const modifiedExercises = currWorkout.exercises.map((exercise) =>
      exercise.id === exerciseId
        ? {
            ...exercise,
            note: event.target.value,
          }
        : exercise,
    );

    setCurrWorkout((prev) => {
      return { ...prev, exercises: modifiedExercises };
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

  function addNewSet(exerciseId: string) {
    const newSet: SetType = {
      id: generateIdFromEntropySize(10),
      reps: "",
      weight: "",
    };

    const modifiedCurrExercises = currWorkout.exercises.map((exercise) =>
      exercise.id === exerciseId
        ? {
            ...exercise,
            sets: [...exercise.sets, newSet],
          }
        : exercise,
    );

    const modifiedPlaceholderExercises = placeholderExercises.map((exercise) =>
      exercise.id === exerciseId
        ? {
            ...exercise,
            sets: [...exercise.sets, newSet],
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
        return { id: set.id, reps: "", weight: "" };
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
  async function enterRemoveMode() {
    await new Promise((resolve) => setTimeout(resolve, 100));

    setExercisesBeforeRemoveMode([...currWorkout.exercises]);
    setPlaceholderExercisesBeforeRemoveMode([...placeholderExercises]);

    setRemoveMode(true);
  }

  async function resetChangesInRemoveMode() {
    await new Promise((resolve) => setTimeout(resolve, 100));

    setCurrWorkout((prev) => {
      return {
        ...prev,
        exercises: [...exercisesBeforeRemoveMode],
      };
    });
    setPlaceholderExercises([...placeholderExercisesBeforeRemoveMode]);

    setRemoveMode(false);
  }

  async function saveChangesInRemoveMode() {
    await new Promise((resolve) => setTimeout(resolve, 100));

    setRemoveMode(false);
  }

  return {
    currWorkout,
    placeholderExercises,
    removeMode,
    handleNoteInput,
    handleSetsInput,
    addNewSet,
    removeSet,
    updateExercises,
    enterRemoveMode,
    resetChangesInRemoveMode,
    saveChangesInRemoveMode,
  };
};

type TimeType = { start: Date | null; end: Date | null };

export const useWorkoutDuration = () => {
  const [workoutTime, setWorkoutTime] = useState<TimeType>({
    start: new Date(),
    end: null,
  });

  function endWorkout() {
    setWorkoutTime((prev) => {
      return {
        ...prev,
        end: new Date(),
      };
    });
  }

  function calcWorkoutDuration() {
    if (workoutTime.start && workoutTime.end) {
      const durationInMili =
        workoutTime.end.getTime() - workoutTime.start.getTime();
      const minutes = Math.floor(durationInMili / (1000 * 60));

      return minutes;
    }

    return 0;
  }

  return { endWorkout, calcWorkoutDuration };
};
