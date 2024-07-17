"use client";

import { twMerge } from "tailwind-merge";
import { emptyWorkout, useWorkouts } from "@/util/hooks";
import { createWorkout } from "@/util/actions/workout";
import { showToast } from "../Toasts";
import { WorkoutFormHeader } from "./WorkoutFormHeader";
import { InputFieldError } from "./InputFieldError";
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
    <>
      <WorkoutFormHeader
        heading="Create workout"
        formId="create-form"
        updateExercises={updateExercises}
      />

      <main className="overflow-y-auto overscroll-contain scroll-smooth px-8 pb-4 pt-6">
        <form action={clientAction} id="create-form" className="space-y-4">
          <div className="flex flex-col gap-2 px-4">
            <label
              htmlFor="title"
              className="pl-1 text-sm font-semibold uppercase text-slate-600 dark:text-slate-200"
            >
              Title
            </label>
            <input
              id="title"
              value={workout.title}
              type="text"
              placeholder="e.g. Upper 1"
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
