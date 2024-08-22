"use client";

import { useWorkouts } from "@/util/hooks";
import { editWorkout } from "@/util/actions/workout";
import { showToast } from "../Toasts";
import { WorkoutFormHeader } from "./WorkoutFormHeader";
import { FormTooltip } from "./FormTooltip";
import { TitleInput, DescriptionInput } from "./WorkoutInputs";
import { ExercisesList } from "../ExercisesList";
import { ErrorComponent } from "../ErrorComponent";

import type { QueriedByIdWorkoutType } from "@/db/schema";

export const EditWorkoutForm = ({
  workoutToEdit,
}: {
  workoutToEdit: QueriedByIdWorkoutType;
}) => {
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
  } = useWorkouts(workoutToEdit);

  async function clientAction() {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const { title: originalTitle, id: workoutId } = workoutToEdit;

    const res = await editWorkout(workout, workoutId, originalTitle);

    setActionRes({ ...res });

    if (res.status === "success-redirect") {
      showToast(res.message, res.status, "/workouts", "View workouts");
    } else if (res.status === "success" || res.status === "error") {
      showToast(res.message, res.status);
    }
  }

  return (
    <>
      <fieldset disabled={actionRes.status === "pending"} className="group">
        <WorkoutFormHeader
          heading="Edit workout"
          formId="edit-workout-form"
          updateExercises={updateExercises}
        />
      </fieldset>

      <main className="relative overflow-y-auto overscroll-contain scroll-smooth px-8 py-4">
        <form
          id="edit-workout-form"
          action={clientAction}
          onSubmit={() => setActionRes({ ...actionRes, status: "pending" })}
        >
          <fieldset
            disabled={actionRes.status === "pending"}
            className="group space-y-4"
          >
            <FormTooltip />

            <TitleInput
              title={workout.title}
              titleError={actionRes.errors?.title}
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
              exercisesError={actionRes.errors?.exercises}
              editExercises={editExercises}
              removeExercise={removeExercise}
            />

            {actionRes.status === "error" && (
              <ErrorComponent
                message={actionRes.message}
                className="justify-center"
              />
            )}
          </fieldset>
        </form>
      </main>
    </>
  );
};
