"use client";

import { useMutation } from "@tanstack/react-query";
import { createWorkout } from "@/util/actions/workout";
import { emptyWorkout, useWorkouts } from "@/util/hooks";
import { showToast } from "@/components/Toasts";
import {
  UserPagesSubHeadingWrapper,
  UserPagesSubHeadingText,
} from "@/components/user/UserPagesHeader";
import { BackButtonModal } from "@/components/BackButtonModal";
import { AddOrEditWorkoutTooltip } from "@/components/Tooltips";
import { TitleInput, DescriptionInput } from "@/components/user/WorkoutInputs";
import { ExercisesList } from "@/components/user/ExercisesList";
import { ErrorComponent } from "@/components/ErrorComponent";
import { FormPagesFooterWrapper } from "@/components/user/FormPagesFooterWrapper";
import { AddExerciseDrawer } from "@/components/user/AddExerciseDrawer";

import type { CreateWorkoutType } from "@/util/types";

export default function CreatePage() {
  const {
    data: actionRes,
    mutate: clientAction,
    isPending,
  } = useMutation({
    mutationFn: async (workoutToCreate: CreateWorkoutType) => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const res = await createWorkout(workoutToCreate);

      return res;
    },
    onSuccess: (res) => {
      if (res.status === "success-redirect") {
        resetWorkoutForm();
        showToast(res.message, "/home", "View workouts");
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
  } = useWorkouts(emptyWorkout);

  return (
    <>
      <UserPagesSubHeadingWrapper className="justify-start gap-3 px-4">
        <BackButtonModal className="rounded-full p-1.5 active:bg-slate-200 dark:active:bg-slate-700" />
        <UserPagesSubHeadingText label="Create workout" className="text-2xl" />

        <AddOrEditWorkoutTooltip />
      </UserPagesSubHeadingWrapper>

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
          className="rounded-full p-1.5 text-violet-400 active:bg-slate-200 dark:text-violet-400 dark:active:bg-slate-700"
          updateExercises={updateExercises}
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
}
