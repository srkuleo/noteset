"use client";

import { useMutation } from "@tanstack/react-query";
import { useWorkouts } from "@/util/hooks";
import { editWorkout } from "@/util/actions/workout";
import { showToast } from "../Toasts";
import { TitleInput, DescriptionInput } from "./WorkoutInputs";
import { ExercisesList } from "./ExercisesList";
import { ErrorComponent } from "../ErrorComponent";
import { AddExerciseDrawer } from "./AddExerciseDrawer";

import type { QueriedByIdWorkoutType } from "@/db/schema";

export const EditWorkoutForm = ({
  workoutToEdit,
}: {
  workoutToEdit: QueriedByIdWorkoutType;
}) => {
  const {
    data: actionRes,
    mutate: clientAction,
    isPending,
  } = useMutation({
    mutationFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const { title: originalTitle, id: workoutId } = workoutToEdit;

      const res = await editWorkout(workout, workoutId, originalTitle);

      return res;
    },
    onSuccess: (res) => {
      if (res.status === "success-redirect") {
        showToast(res.message, "/home", "View workouts");
      }

      if (res.status === "error") {
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
  } = useWorkouts(workoutToEdit);

  return (
    <>
      <main className="relative overflow-y-auto overscroll-contain scroll-smooth px-8 py-4">
        <form id="edit-workout-form" action={() => clientAction()}>
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
              editForm
              workout={workout}
              setWorkout={setWorkout}
              exercisesError={actionRes && actionRes.errors?.exercises}
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

      <fieldset disabled={isPending} className="group">
        <footer className="flex items-center justify-between border-t border-slate-300/80 px-6 pb-6 pt-2 group-disabled:pointer-events-none group-disabled:opacity-50 dark:border-slate-800">
          <AddExerciseDrawer
            className="rounded-full p-1.5 text-violet-400 active:bg-slate-200 dark:text-violet-400 dark:active:bg-slate-700"
            updateExercises={updateExercises}
          />

          <button
            type="submit"
            form="edit-workout-form"
            className="rounded-lg px-3 py-1.5 text-xl font-extrabold text-green-500 active:scale-95 active:bg-slate-200 dark:active:bg-slate-700"
          >
            {isPending ? "Saving..." : "Save"}
          </button>
        </footer>
      </fieldset>
    </>
  );
};
