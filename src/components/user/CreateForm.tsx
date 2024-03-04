"use client";

import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import { useFormState } from "react-dom";
import { createWorkout } from "@/util/actions";
import { ExerciseForm } from "./ExerciseForm";
import { SubmitFormButton } from "./SubmitFormButton";

import { type ActionResponse, type Exercise } from "@/util/types";
import { twMerge } from "tailwind-merge";

const emptyFormState: ActionResponse = {
  status: "unset",
  message: "",
  errors: {},
  timestamp: Date.now(),
};

export const CreateForm = ({ userId }: { userId: string }) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [state, formAction] = useFormState(
    createWorkout.bind(null, userId, exercises),
    emptyFormState,
  );

  const updateExercises = (newExercise: Exercise) => {
    setExercises([...exercises, { ...newExercise }]);
  };

  const addWorkout = async (formData: FormData) => {
    formAction(formData);

    if (state.status === "success") {
      toast.success(state.message);
    } else if (state.status === "error") {
      toast.error(state.message);
    }
  };

  return (
    <form
      action={addWorkout}
      className="space-y-4 rounded-lg bg-white p-6 shadow-md ring-1 ring-slate-300/50 dark:bg-slate-800 dark:ring-slate-700/70"
    >
      <div className="flex flex-col gap-2">
        <label
          htmlFor="title"
          className="pl-1 text-sm font-semibold uppercase dark:text-slate-200"
        >
          Title
        </label>
        <input
          id="title"
          name="workoutTitle"
          type="text"
          placeholder="e.g. Upper 1"
          className={twMerge(
            "input-field",
            state.errors?.title && "ring-red-500 dark:ring-red-500",
          )}
        />
        {state.errors?.title &&
          state.errors.title.map((error) => (
            <p key={error} className="pl-1 text-sm font-semibold text-red-500">
              {error}
            </p>
          ))}
      </div>
      <div className="flex flex-col gap-2">
        <label
          htmlFor="description"
          className="pl-1 text-sm font-semibold uppercase dark:text-slate-200"
        >
          Description
        </label>
        <input
          id="description"
          name="workoutDescription"
          type="text"
          placeholder="e.g. Workout for the upper body"
          className="input-field"
        />
      </div>

      {exercises.length > 0 && (
        <div
          className={twMerge(
            "flex snap-x snap-proximity items-start gap-4 overflow-x-scroll px-2 py-4 no-scrollbar",
            exercises.length === 1 && "justify-center",
          )}
        >
          {exercises.map((exercise) => (
            <div
              key={exercise.name}
              className="min-w-[95%] snap-center rounded-lg bg-slate-50 p-4 shadow-md ring-1 ring-slate-200 dark:bg-slate-900/50 dark:ring-slate-700"
            >
              <div className="grid grid-cols-exercise gap-2 text-xs">
                <p className="font-bold italic">Name</p>
                <p className="text-center font-bold italic">Sets</p>
                <p className="text-center font-bold italic">Reps</p>
                <p className="text-center font-bold italic">Weights - kg</p>

                <div className="col-span-4 h-[1px] bg-slate-200 dark:bg-slate-700" />

                <p className="my-auto dark:text-slate-200">{exercise.name}</p>
                <p className="my-auto text-center dark:text-slate-200">
                  {exercise.sets}
                </p>
                <div className="flex grow flex-col items-center gap-2 dark:text-slate-200">
                  {exercise.reps.map((rep, i) => (
                    <p key={`Rep: ${i + 1}`}>{rep}</p>
                  ))}
                </div>
                <div className="flex grow flex-col items-center gap-2 dark:text-slate-200">
                  {exercise.weights.map((weight, i) => (
                    <p key={`Weight: ${i + 1}`}>{weight}</p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {state.errors?.exercises &&
        state.errors.exercises.map((error) => (
          <p
            key={error}
            className="py-4 text-center text-sm font-semibold text-red-500"
          >
            {error}
          </p>
        ))}

      <div
        className={twMerge(
          "flex items-center justify-between",
          exercises.length === 0 && "pt-4",
        )}
      >
        <ExerciseForm updateExercises={updateExercises} />

        <div className="flex justify-end gap-2">
          <Link
            href="/workouts"
            className="rounded-lg px-3 py-2 text-sm font-semibold active:scale-95 active:bg-slate-100 dark:text-slate-200 active:dark:bg-slate-900/60 "
          >
            Cancel
          </Link>
          <SubmitFormButton label="Create" loading="Creating..." />
        </div>
      </div>
    </form>
  );
};
