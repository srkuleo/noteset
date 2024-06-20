"use client";

import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { emptyWorkout, useWorkouts } from "@/util/hooks";
import { createWorkout } from "@/util/actions";
import { showToast } from "./Toasts";
import { InputFieldError } from "./InputFieldError";
import { SubmitFormButton } from "./SubmitFormButton";
import { ExercisesCarousel } from "./ExercisesCarousel";

export const CreateWorkoutForm = ({ userId }: { userId: string }) => {
  const {
    workout,
    actionRes,
    setWorkout,
    setActionRes,
    updateExercises,
    editExercises,
    removeExercise,
    resetWorkoutForm,
  } = useWorkouts(emptyWorkout);

  async function clientAction() {
    const res = await createWorkout(userId, workout);

    setActionRes({ ...res });

    if (res.status === "success") {
      resetWorkoutForm();
      showToast(res.message, "success");
    } else {
      showToast(res.message, "error");
    }
  }

  return (
    <form
      action={clientAction}
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
          value={workout.title}
          type="text"
          placeholder="e.g. Upper 1"
          onChange={(e) => setWorkout({ ...workout, title: e.target.value })}
          className={twMerge(
            "input-field",
            actionRes.errors?.title && "ring-red-500 dark:ring-red-500",
          )}
        />
        <InputFieldError errorArr={actionRes.errors?.title} className="pl-1" />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="description"
          className="flex gap-1 pl-1 text-sm font-semibold uppercase dark:text-slate-200"
        >
          Description
          <span className="text-xs lowercase italic text-slate-400/65 dark:text-slate-500">
            (optional)
          </span>
        </label>
        <input
          id="description"
          value={workout.description}
          type="text"
          placeholder="e.g. Workout for the upper body"
          onChange={(e) =>
            setWorkout({ ...workout, description: e.target.value })
          }
          className="input-field"
        />
      </div>

      <ExercisesCarousel
        exercises={workout.exercises}
        updateExercises={updateExercises}
        editExercises={editExercises}
        removeExercise={removeExercise}
      />
      <InputFieldError
        errorArr={actionRes.errors?.exercises}
        className="justify-center py-4"
      />

      <div
        className={twMerge(
          "flex justify-end gap-2",
          workout.exercises.length === 0 &&
            !actionRes.errors?.exercises &&
            "pt-4",
        )}
      >
        <Link
          href="/workouts"
          className="rounded-lg px-3 py-2 text-sm font-semibold active:scale-95 active:bg-slate-100 dark:text-slate-200 active:dark:bg-slate-900/60"
        >
          Cancel
        </Link>
        <SubmitFormButton label="Create" loading="Creating..." />
      </div>
    </form>
  );
};
