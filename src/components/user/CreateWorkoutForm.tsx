"use client";

import { emptyWorkout, useWorkouts } from "@/util/hooks";
import { createWorkout } from "@/util/actions/workout";
import { showToast } from "../Toasts";
import { WorkoutFormHeader } from "./WorkoutFormHeader";
import { FormTooltip } from "./FormTooltip";
import { DescriptionInput, TitleInput } from "./WorkoutInputs";
import { ExercisesList } from "../ExercisesList";
import { ErrorComponent } from "../ErrorComponent";

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
          formId="create-workout-form"
          updateExercises={updateExercises}
        />
      </fieldset>

      <main className="relative overflow-y-auto overscroll-contain scroll-smooth px-8 py-4">
        <form
          id="create-workout-form"
          action={clientAction}
          onSubmit={() => {
            setActionRes({ ...actionRes, status: "pending" });
          }}
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
              workout={workout}
              exercisesError={actionRes.errors?.exercises}
              setWorkout={setWorkout}
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
