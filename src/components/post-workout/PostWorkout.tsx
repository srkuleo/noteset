"use client";

import Link from "next/link";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useWorkouts } from "@/util/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { updateCurrentWorkout } from "@/util/actions/workout";
import { showToast } from "../Toasts";
import { FormatDate, FormatWorkoutDuration } from "../Formatting";
import { ArrowRightIcon } from "../icons/arrows";
import { ExercisesList } from "../user/ExercisesList";
import { PreviewWorkoutButtonDrawer } from "../user/PreviewWorkoutButtonDrawer";
import { AddExerciseDrawer } from "../user/AddExerciseDrawer";

import type { QueriedByIdWorkoutType, WorkoutType } from "@/db/schema";
import type { TimeFormatType } from "@/util/types";

export const PostWorkout = ({
  submittedWorkout,
  currentWorkout,
  timeFormatPreference,
}: {
  submittedWorkout: WorkoutType;
  currentWorkout: QueriedByIdWorkoutType;
  timeFormatPreference: TimeFormatType;
}) => {
  const {
    data: res,
    mutate: clientAction,
    isPending,
  } = useMutation({
    mutationFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const res = await updateCurrentWorkout(workout, currentWorkout.id);

      return res;
    },
    onSuccess: (res) => {
      if (res.status === "success-redirect" && res.message) {
        showToast(res.message, "/home", "View workouts");
        setEditMode(false);
      }

      if (res.status === "error") {
        showToast(res.message);
      }
    },
  });
  const {
    workout,
    setWorkout,
    updateExercises,
    editExercises,
    removeExercise,
  } = useWorkouts(currentWorkout);
  const [editMode, setEditMode] = useState(false);

  return (
    <>
      <main className="overflow-y-auto overscroll-contain scroll-smooth px-6 py-4">
        <form id="post-workout-form" action={() => clientAction()}>
          <fieldset disabled={isPending} className="group space-y-4">
            <div className="space-y-1 pt-4 text-center group-disabled:opacity-50">
              <p className="text-2xl font-bold">{workout.title}</p>
              <p className="font-manrope text-lg font-semibold text-green-500">
                - successfully completed -
              </p>
            </div>

            <div className="space-y-1 py-2 group-disabled:opacity-50">
              <FormatWorkoutDuration
                timeFormat={timeFormatPreference}
                duration={submittedWorkout.duration}
              />
              <FormatDate
                date={submittedWorkout.doneAt}
                className="text-lg font-bold"
              />
            </div>

            <p className="pb-4 text-center font-semibold text-slate-400 group-disabled:opacity-50 dark:text-slate-400">
              Would you like to make changes to your current {workout.title}{" "}
              workout?
            </p>

            <div className="flex justify-center gap-4 group-disabled:pointer-events-none group-disabled:opacity-50">
              <button
                type="button"
                onClick={() => setEditMode(!editMode)}
                className="rounded-full px-6 py-2 font-manrope font-semibold text-slate-600 shadow-md ring-1 ring-slate-400/40 transition-all active:scale-95 active:bg-white dark:text-white dark:ring-slate-400 dark:active:bg-slate-800"
              >
                {editMode ? "Close edit mode" : "Yes, edit"}
              </button>

              <div className="w-[1px] bg-slate-300/60 dark:bg-slate-800" />

              <Link
                href="/logs"
                className="flex items-center gap-1 rounded-full border-l border-slate-300/70 px-4 py-2 font-manrope font-semibold text-slate-600 active:scale-95 active:bg-white dark:border-slate-800 dark:text-slate-300 active:dark:bg-slate-800"
              >
                View logs {ArrowRightIcon}
              </Link>
            </div>

            <AnimatePresence>
              {editMode && (
                <motion.div
                  initial={{ opacity: 0, y: -16 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.4,
                      ease: [0.36, 0.66, 0.04, 1],
                    },
                  }}
                  exit={{
                    opacity: 0,
                    y: -16,
                    transition: {
                      delay: 0.05,
                      duration: 0.2,
                      ease: [0.36, 0.66, 0.04, 1],
                    },
                  }}
                >
                  <ExercisesList
                    workout={workout}
                    setWorkout={setWorkout}
                    editExercises={editExercises}
                    removeExercise={removeExercise}
                    exercisesError={res && res.errors?.exercises}
                    editForm
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </fieldset>
        </form>
      </main>

      <fieldset disabled={isPending} className="group">
        <footer className="flex justify-between border-t border-slate-300/80 px-6 pb-[26px] pt-2 group-disabled:pointer-events-none group-disabled:opacity-50 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <PreviewWorkoutButtonDrawer
              workout={submittedWorkout}
              className="px-2.5 py-2"
              size={6}
            />
            <AnimatePresence>
              {editMode && (
                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 0.4,
                      ease: [0.36, 0.66, 0.04, 1],
                    },
                  }}
                  exit={{
                    opacity: 0,
                    x: 16,
                    transition: {
                      delay: 0.05,
                      duration: 0.2,
                      ease: [0.36, 0.66, 0.04, 1],
                    },
                  }}
                >
                  <AddExerciseDrawer
                    className="rounded-full p-1.5 text-violet-400 active:bg-slate-200 dark:text-violet-400 dark:active:bg-slate-700"
                    updateExercises={updateExercises}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AnimatePresence>
            {editMode && (
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.4,
                    ease: [0.36, 0.66, 0.04, 1],
                  },
                }}
                exit={{
                  opacity: 0,
                  x: 16,
                  transition: {
                    delay: 0.05,
                    duration: 0.2,
                    ease: [0.36, 0.66, 0.04, 1],
                  },
                }}
              >
                <button
                  type="submit"
                  form="post-workout-form"
                  className="rounded-lg px-3 py-1.5 text-xl font-extrabold text-green-500 active:scale-95 active:bg-slate-200 dark:active:bg-slate-700"
                >
                  {isPending ? "Saving..." : "Save"}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </footer>
      </fieldset>
    </>
  );
};
