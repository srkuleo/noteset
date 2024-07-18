"use client";

import { flushSync } from "react-dom";
import { twMerge } from "tailwind-merge";
import { useWorkouts } from "@/util/hooks";
import { editWorkout } from "@/util/actions/workout";
import { showToast } from "../Toasts";
import { WorkoutFormHeader } from "./WorkoutFormHeader";
import { InputFieldError } from "./InputFieldError";
import { ExercisesCarousel } from "./ExercisesCarousel";

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
    flushSync(() => {
      setActionRes({ ...actionRes, status: "pending" });
    });

    const res = await editWorkout(
      fetchedWorkout.title,
      workout,
      fetchedWorkout.userId,
      fetchedWorkout.id,
    );

    setActionRes({ ...res });

    if (res.status === "success-redirect") {
      showToast(res.message, res.status, "/workouts", "View workouts");
    } else if (res.status === "success" || res.status === "error") {
      showToast(res.message, res.status);
    }
  }

  return (
    <>
      <WorkoutFormHeader
        pending={actionRes.status === "pending"}
        heading="Edit workout"
        formId="edit-form"
        updateExercises={updateExercises}
      />

      <main className="overflow-y-auto overscroll-contain scroll-smooth px-8 pb-4 pt-6">
        <form action={clientAction} id="edit-form" className="space-y-4">
          <div className="flex flex-col gap-2 px-4">
            <label
              htmlFor="title"
              className="pl-1 text-sm font-semibold uppercase text-slate-600 dark:text-slate-200"
            >
              Title
            </label>
            <input
              id="title"
              name="workoutTitle"
              type="text"
              defaultValue={workout.title}
              onChange={(e) =>
                setWorkout({ ...workout, title: e.target.value })
              }
              className={twMerge(
                "input-field",
                actionRes.errors?.title && "ring-red-500 dark:ring-red-500",
              )}
            />
            <InputFieldError
              errorArr={actionRes.errors?.title}
              className="pl-1"
            />
          </div>

          <div className="flex flex-col gap-2 px-4">
            <label
              htmlFor="description"
              className="flex gap-1 pl-1 text-sm font-semibold uppercase text-slate-600 dark:text-slate-200"
            >
              Description
              <span className="text-xs lowercase italic text-slate-400/80 dark:text-slate-500">
                (optional)
              </span>
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
            isErroring={actionRes.errors?.exercises ? true : false}
            workout={workout}
            setWorkout={setWorkout}
            editExercises={editExercises}
            removeExercise={removeExercise}
          />
          <InputFieldError
            errorArr={actionRes.errors?.exercises}
            className="justify-center py-4"
          />
        </form>
      </main>
    </>
  );
};
