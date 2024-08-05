"use client";

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
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { title, id, userId } = fetchedWorkout;

    const res = await editWorkout(workout, id, title, userId);

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
        heading="Edit workout"
        isPending={actionRes.status === "pending"}
        formId="edit-form"
        updateExercises={updateExercises}
      />

      <main className="overflow-y-auto overscroll-contain scroll-smooth px-8 pb-4 pt-6">
        <form
          onSubmit={() => setActionRes({ ...actionRes, status: "pending" })}
          action={clientAction}
          id="edit-form"
          className="space-y-4"
        >
          <div className="flex flex-col gap-2 px-4">
            <label
              htmlFor="title"
              className={twMerge(
                "pl-1 text-sm font-semibold uppercase text-slate-600 dark:text-slate-200",
                actionRes.status === "pending" && "opacity-40",
              )}
            >
              Title
            </label>
            <input
              disabled={actionRes.status === "pending"}
              id="title"
              name="workoutTitle"
              type="text"
              defaultValue={workout.title}
              onChange={(e) =>
                setWorkout({ ...workout, title: e.target.value })
              }
              className={twMerge(
                "input-field disabled:opacity-50",
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
              className={twMerge(
                "flex gap-1 pl-1 text-sm font-semibold uppercase text-slate-600 dark:text-slate-200",
                actionRes.status === "pending" && "opacity-40",
              )}
            >
              Description
              <span className="text-xs lowercase italic text-slate-400/80 dark:text-slate-500">
                (optional)
              </span>
            </label>
            <input
              disabled={actionRes.status === "pending"}
              id="description"
              name="workoutDescription"
              type="text"
              defaultValue={workout.description}
              onChange={(e) =>
                setWorkout({ ...workout, description: e.target.value })
              }
              className="input-field disabled:opacity-50"
            />
          </div>

          <ExercisesCarousel
            editForm
            isErroring={!!actionRes.errors?.exercises}
            isPending={actionRes.status === "pending"}
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
