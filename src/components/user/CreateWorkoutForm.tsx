"use client";

import { twMerge } from "tailwind-merge";
import { emptyWorkout, useWorkouts } from "@/util/hooks";
import { createWorkout } from "@/util/actions/workout";
import { showToast } from "../Toasts";
import { WorkoutFormHeader } from "./WorkoutFormHeader";
import { FormToolTip } from "./FormTooltip";
import { InputFieldError } from "./InputFieldError";
import { ExercisesList } from "./ExercisesList";

export const CreateWorkoutForm = () => {
  const {
    workout,
    setWorkout,
    actionRes,
    setActionRes,
    handleTitleInput,
    handleDescriptionInput,
    updateExercises,
    editExercises,
    removeExercise,
    resetWorkoutForm,
  } = useWorkouts(emptyWorkout);

  async function clientAction() {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const res = await createWorkout(workout);

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
      <fieldset disabled={actionRes.status === "pending"} className="group">
        <WorkoutFormHeader
          heading="Create workout"
          formId="create"
          updateExercises={updateExercises}
        />
      </fieldset>

      <main className="relative overflow-y-auto overscroll-contain scroll-smooth px-8 py-4">
        <form
          id="create"
          action={clientAction}
          onSubmit={() => setActionRes({ ...actionRes, status: "pending" })}
        >
          <fieldset
            disabled={actionRes.status === "pending"}
            className="group space-y-4"
          >
            <FormToolTip />

            <div className="flex flex-col gap-2 px-4 group-disabled:opacity-50">
              <label
                htmlFor="title"
                className="pl-1 text-sm font-semibold uppercase text-slate-600 dark:text-slate-200"
              >
                Title
              </label>
              <input
                required
                id="title"
                type="text"
                placeholder="e.g. Upper 1"
                onChange={(e) => handleTitleInput(e)}
                className={twMerge(
                  "input-field",
                  actionRes.errors?.title && "ring-red-500 dark:ring-red-500",
                )}
              />
              <InputFieldError
                errorArr={actionRes.errors?.title}
                className="pl-1 group-disabled:opacity-50"
              />
            </div>

            <div className="flex flex-col gap-2 px-4 group-disabled:opacity-50">
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
                type="text"
                placeholder="e.g. Workout for the upper body"
                onChange={(e) => handleDescriptionInput(e)}
                className="input-field"
              />
            </div>

            <ExercisesList
              workout={workout}
              isErroring={!!actionRes.errors?.exercises}
              setWorkout={setWorkout}
              editExercises={editExercises}
              removeExercise={removeExercise}
            />
            <InputFieldError
              errorArr={actionRes.errors?.exercises}
              className="justify-center py-4 group-disabled:opacity-50"
            />
          </fieldset>
        </form>
      </main>
    </>
  );
};
