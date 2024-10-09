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
import { ExercisesList } from "./ExercisesList";
import { FormPagesFooterWrapper } from "./FormPagesFooterWrapper";
import { PreviewWorkoutButtonDrawer } from "./PreviewWorkoutButtonDrawer";
import { AddExerciseDrawer } from "./AddExerciseDrawer";

import type { QueriedByIdWorkoutType, WorkoutType } from "@/db/schema";
import type { TimeFormatType } from "@/util/types";

type PageStatus = "initial" | "editing-workout" | "workout-updated";

export const PostWorkoutPageContent = ({
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
        showToast(res.message, "/home?q=current", "View workouts");
        setPageStatus("workout-updated");
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
  const [pageStatus, setPageStatus] = useState<PageStatus>("initial");

  return (
    <>
      <main className="mt-safe-top px-6 pb-[89px] pt-[158px]">
        <AnimatePresence mode="wait" initial={false}>
          {pageStatus === "initial" ? (
            <motion.div
              key="post-workout-results"
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
                y: 16,
                transition: {
                  delay: 0.05,
                  duration: 0.2,
                  ease: [0.36, 0.66, 0.04, 1],
                },
              }}
            >
              <div className="space-y-1 pt-4 text-center">
                <p className="text-2xl font-bold">{workout.title}</p>
                <p className="font-manrope text-lg font-semibold text-green-500">
                  - successfully completed -
                </p>
              </div>

              <div className="space-y-1 py-8">
                <div className="flex justify-between">
                  <p className="font-manrope text-lg font-semibold">
                    Duration:
                  </p>
                  <FormatWorkoutDuration
                    timeFormat={timeFormatPreference}
                    duration={submittedWorkout.duration}
                  />
                </div>

                <div className="flex justify-between">
                  <p className="font-manrope text-lg font-semibold">Date:</p>

                  <FormatDate
                    date={submittedWorkout.doneAt}
                    withDayOfTheWeek
                    className="text-lg font-bold"
                  />
                </div>
              </div>

              <p className="px-4 pb-6 text-center text-lg font-semibold text-slate-500/90 dark:text-slate-300">
                Would you like to edit your next {workout.title} workout?
              </p>

              <div className="flex justify-center gap-4">
                <button
                  type="button"
                  onClick={() => setPageStatus("editing-workout")}
                  className="rounded-full px-6 py-2 font-manrope font-semibold text-slate-600 shadow-md ring-1 ring-slate-400/40 transition-all active:scale-95 active:bg-white dark:text-white dark:ring-slate-400 dark:active:bg-slate-800"
                >
                  Yes, edit
                </button>

                <div className="w-[1px] bg-slate-300/60 dark:bg-slate-800" />

                <Link
                  href="/logs"
                  className="flex items-center gap-1 rounded-full border-l border-slate-300/70 px-4 py-2 font-manrope font-semibold text-slate-600 active:scale-95 active:bg-white dark:border-slate-800 dark:text-slate-300 active:dark:bg-slate-800"
                >
                  View logs {ArrowRightIcon}
                </Link>
              </div>
            </motion.div>
          ) : pageStatus === "editing-workout" ? (
            <motion.div
              key="edit-mode-form"
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
                y: 16,
                transition: {
                  delay: 0.05,
                  duration: 0.2,
                  ease: [0.36, 0.66, 0.04, 1],
                },
              }}
            >
              <form
                id="post-workout-form"
                action={() => clientAction()}
                className="pb-2 pt-4"
              >
                <fieldset disabled={isPending} className="group">
                  <div className="flex items-center justify-between px-2 group-disabled:pointer-events-none group-disabled:opacity-50">
                    <h3 className="dark:text-slate-100">Edit mode</h3>

                    <button
                      type="button"
                      onClick={() => setPageStatus("initial")}
                      className="rounded-full px-6 py-2 font-manrope text-sm font-semibold text-slate-600 shadow-md ring-1 ring-slate-400/40 transition-all active:scale-95 active:bg-white dark:text-white dark:ring-slate-400 dark:active:bg-slate-800"
                    >
                      Close
                    </button>
                  </div>

                  <ExercisesList
                    workout={workout}
                    setWorkout={setWorkout}
                    editExercises={editExercises}
                    removeExercise={removeExercise}
                    exercisesError={res && res.errors?.exercises}
                    editForm
                  />
                </fieldset>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="workout-updated"
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
                y: 16,
                transition: {
                  delay: 0.05,
                  duration: 0.2,
                  ease: [0.36, 0.66, 0.04, 1],
                },
              }}
            >
              <div className="space-y-1 pt-4 text-center">
                <p className="text-2xl font-bold">{workout.title}</p>
                <p className="font-manrope text-lg font-semibold text-green-500">
                  - successfully updated -
                </p>
              </div>

              <div className="space-y-1 py-8">
                <p className="text-lg font-semibold italic text-slate-400 dark:text-slate-300">
                  You can now leave this page
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {pageStatus === "editing-workout" && (
          <motion.div
            key="edit-mode-footer"
            initial={{
              opacity: 0,
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.4,
                delay: 0.1,
                ease: [0.36, 0.66, 0.04, 1],
              },
            }}
            exit={{
              opacity: 0,
              transition: {
                delay: 0.05,
                duration: 0.2,
                ease: [0.36, 0.66, 0.04, 1],
              },
            }}
          >
            <FormPagesFooterWrapper disabled={isPending}>
              <div className="flex items-center gap-3">
                <PreviewWorkoutButtonDrawer
                  workout={submittedWorkout}
                  className="px-2 py-1.5 dark:bg-slate-950"
                  size={6}
                />

                <AddExerciseDrawer
                  className="rounded-full p-1.5 text-violet-400 active:bg-slate-200 dark:text-violet-400 dark:active:bg-slate-700"
                  updateExercises={updateExercises}
                />
              </div>

              <button
                type="submit"
                form="post-workout-form"
                className="rounded-lg px-3 py-1.5 text-xl font-extrabold text-green-500 active:scale-95 active:bg-slate-200 dark:active:bg-slate-700"
              >
                {isPending ? "Saving..." : "Save"}
              </button>
            </FormPagesFooterWrapper>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
