"use client";

import { useMutation } from "@tanstack/react-query";
import { createWorkout } from "@/util/actions/workout";
import { useWorkoutInForm, emptyWorkout } from "@/util/hooks/useWorkoutInForm";
import { timeout, FORM_TIMEOUT } from "@/util/utils";
import { showToast } from "../Toasts";
import { TitleInput, DescriptionInput } from "./WorkoutInputs";
import { ExercisesList } from "./ExercisesList";
import { ErrorComponent } from "../ErrorComponent";
import { FormPagesFooterWrapper } from "./FormPagesFooterWrapper";
import { AddExerciseDrawer } from "./AddExerciseDrawer";

import type { CreateWorkoutType } from "@/util/types";

export const CreateWorkoutForm = () => {
  const {
    data: actionRes,
    mutate: clientAction,
    isPending,
  } = useMutation({
    mutationFn: async (workoutToCreate: CreateWorkoutType) => {
      await timeout(FORM_TIMEOUT);

      const res = await createWorkout(workoutToCreate);

      return res;
    },
    onSuccess: (res) => {
      if (res.status === "success-redirect") {
        resetWorkoutForm();
        showToast(res.message, "/home?q=current", "View workouts");
      } else {
        showToast(res.message);
      }
    },
  });
  const {
    workout,
    setWorkout,
    handleTitleInput,
    handleDescriptionInput,
    updateExercises,
    editExercises,
    removeExercise,
    resetWorkoutForm,
  } = useWorkoutInForm(emptyWorkout);

  return (
    <>
      <main className="mt-safe-top px-8 pb-[89px] pt-[158px]">
        <form id="create-workout-form" action={() => clientAction(workout)}>
          <fieldset disabled={isPending} className="group space-y-4">
            <TitleInput
              title={workout.title}
              titleError={actionRes && actionRes.errors?.title}
              handleTitleInput={handleTitleInput}
            />

            <DescriptionInput
              description={workout.description}
              handleDescriptionInput={handleDescriptionInput}
            />

            <ExercisesList
              workout={workout}
              exercisesError={actionRes && actionRes.errors?.exercises}
              setWorkout={setWorkout}
              editExercises={editExercises}
              removeExercise={removeExercise}
            />

            {actionRes && actionRes.status === "error" && (
              <ErrorComponent
                message={actionRes.message}
                className="justify-center group-disabled:opacity-30"
              />
            )}
          </fieldset>
        </form>
      </main>

      <FormPagesFooterWrapper disabled={isPending}>
        <AddExerciseDrawer
          updateExercises={updateExercises}
          className="rounded-full p-1.5 text-violet-500 active:scale-95 active:bg-slate-200 dark:text-violet-400 dark:active:bg-slate-700"
        />

        <button
          type="submit"
          form="create-workout-form"
          className="px-3 py-1.5 text-xl font-extrabold text-green-500 active:scale-95 active:text-green-400 dark:text-green-600 dark:active:text-green-800"
        >
          {isPending ? "Creating..." : "Create"}
        </button>
      </FormPagesFooterWrapper>
    </>
  );
};
