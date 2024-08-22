"use client";

import Link from "next/link";
import { useState } from "react";
import { useWorkouts } from "@/util/hooks";
import { updateCurrentWorkout } from "@/util/actions/workout";
import { showToast } from "../Toasts";
import { ExercisesList } from "../ExercisesList";
import { PreviewWorkoutButtonDrawer } from "../PreviewWorkoutButtonDrawer";
import { AddExerciseDrawer } from "../user/AddExerciseDrawer";

import type { QueriedByIdWorkoutType, WorkoutType } from "@/db/schema";

export const PostWorkout = ({
  submittedWorkout,
  currentWorkout,
}: {
  submittedWorkout: WorkoutType;
  currentWorkout: QueriedByIdWorkoutType;
}) => {
  const [editMode, setEditMode] = useState(false);
  const {
    workout,
    setWorkout,
    actionRes,
    updateExercises,
    editExercises,
    removeExercise,
    setActionRes,
  } = useWorkouts(currentWorkout);

  return (
    <>
      <main className="space-y-4 overflow-y-auto overscroll-contain scroll-smooth px-6 py-4">
        <p>{workout.title} workout successfully completed</p>
        <p>
          Would you like to make changes to your current {workout.title}{" "}
          workout?
        </p>

        <div className="flex justify-between">
          <button onClick={() => setEditMode(true)}>Yes, edit</button>
          <Link href="/logs">No, view Logs</Link>
        </div>

        {editMode && (
          <ExercisesList
            workout={workout}
            setWorkout={setWorkout}
            editExercises={editExercises}
            removeExercise={removeExercise}
            exercisesError={actionRes.errors?.exercises}
            editForm
          />
        )}
      </main>

      <footer className="flex items-center justify-between border-t border-slate-300/80 px-6 pb-6 pt-2 text-end dark:border-slate-800">
        <PreviewWorkoutButtonDrawer workout={submittedWorkout} />

        {editMode && (
          <>
            <AddExerciseDrawer updateExercises={updateExercises} className="" />

            <button
              onClick={async () => {
                const res = await updateCurrentWorkout(
                  workout,
                  currentWorkout.id,
                );

                if (res.status === "success-redirect" && res.message) {
                  showToast(
                    res.message,
                    "success-redirect",
                    "/workouts",
                    "View workouts",
                  );
                }

                if (res.status === "error") {
                  showToast(res.message, "error");
                }

                setActionRes(res);
              }}
            >
              Submit changes
            </button>
          </>
        )}
      </footer>
    </>
  );
};
