"use client";

import Link from "next/link";
import { redirect } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { useWorkouts } from "@/util/hooks";
import { editWorkout } from "@/util/actions";
import { showToast } from "./Toasts";
import { InputFieldError } from "./InputFieldError";
import { ExercisesCarousel } from "./ExercisesCarousel";
import { SubmitFormButton } from "./SubmitFormButton";

import type { FetchedWorkout } from "@/db/schema";

export const EditWorkoutForm = ({
  fetchedWorkout,
}: {
  fetchedWorkout: FetchedWorkout;
}) => {
  const {
    workout,
    actionRes,
    setWorkout,
    setActionRes,
    updateExercises,
    editExercises,
    removeExercise,
  } = useWorkouts(fetchedWorkout);

  async function clientAction() {
    const res = await editWorkout(
      fetchedWorkout.title,
      workout,
      fetchedWorkout.userId,
      fetchedWorkout.id,
    );

    if (res.status === "success") {
      redirect(`/workouts?message=${res.message}`);
    }

    setActionRes({ ...res });
    showToast(res.message, "error");
  }

  return (
    <form
      action={clientAction}
      className="space-y-4 rounded-lg bg-white p-6 shadow-md ring-1 ring-slate-300/50 dark:bg-slate-800 dark:ring-slate-700/70"
    >
      <div className="flex flex-col gap-2">
        <label
          htmlFor="title"
          className="pl-1 text-sm font-semibold uppercase dark:text-slate-300"
        >
          Title
        </label>
        <input
          id="title"
          name="workoutTitle"
          type="text"
          defaultValue={workout.title}
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
          className="pl-1 text-sm font-semibold uppercase dark:text-slate-300"
        >
          Description
        </label>
        <input
          id="description"
          name="workoutDescription"
          type="text"
          defaultValue={workout.description}
          onChange={(e) =>
            setWorkout({ ...workout, description: e.target.value })
          }
          className="input-field"
        />
      </div>

      <ExercisesCarousel
        editForm
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
        <SubmitFormButton label="Save" loading="Saving" />
      </div>
    </form>
  );
};
