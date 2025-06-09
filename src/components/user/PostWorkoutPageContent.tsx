"use client";

import Link from "next/link";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useWorkoutInForm } from "@/util/hooks/useWorkoutInForm";
import { FORM_TIMEOUT, timeout } from "@/util/utils";
import { updateCurrentWorkout } from "@/util/actions/workout";
import { showToast } from "../Toasts";
import { FormatDate, FormatWorkoutDuration } from "../Formatting";
import { ArrowRightIcon } from "../icons/arrows";
import { TitleInput, DescriptionInput } from "./WorkoutInputs";
import { ExercisesList } from "./ExercisesList";
import { Spinner } from "../Loading";
import { FormPagesFooterWrapper } from "./FormPagesFooterWrapper";
import { PreviewWorkoutDrawerWithTrigger } from "./PreviewWorkoutDrawer";
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
      await timeout(FORM_TIMEOUT);

      const res = await updateCurrentWorkout(workout, currentWorkout.id);

      return res;
    },
    onSuccess: (res) => {
      if (res.status === "success-redirect" && res.message) {
        showToast(res.message, "/home", "View workouts");
        setPageStatus("workout-updated");
      }

      if (res.status === "error") {
        showToast(res.message);
      }
    },
  });
  const {
    workout,
    handleTitleInput,
    handleDescriptionInput,
    resetDescriptionInput,
    updateExercises,
    editExercises,
    removeExercise,
  } = useWorkoutInForm(currentWorkout);
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
              <div className="flex flex-col items-center gap-2 pt-4">
                <p className="text-2xl font-bold uppercase">{workout.title}</p>
                <p className="rounded-xl bg-white px-3.5 py-1 font-manrope font-semibold text-green-500 shadow-md ring-1 ring-slate-200 dark:bg-slate-800/80 dark:ring-slate-700/80">
                  completed
                </p>
              </div>

              <div className="space-y-1 border-b border-slate-300/60 py-8 dark:border-slate-800">
                <div className="flex justify-between">
                  <p className="font-manrope text-lg font-semibold italic text-slate-400 dark:text-slate-400">
                    Duration
                  </p>
                  {submittedWorkout.duration ? (
                    <FormatWorkoutDuration
                      duration={submittedWorkout.duration}
                      selectedFormat={timeFormatPreference}
                    />
                  ) : (
                    "..."
                  )}
                </div>

                <div className="flex justify-between">
                  <p className="font-manrope text-lg font-semibold italic text-slate-400 dark:text-slate-400">
                    Date
                  </p>

                  {submittedWorkout.doneAt ? (
                    <FormatDate
                      date={submittedWorkout.doneAt}
                      withDayOfTheWeek
                      className="text-lg font-bold"
                    />
                  ) : (
                    "..."
                  )}
                </div>
              </div>

              <p className="px-4 pb-6 pt-8 text-center text-lg font-semibold text-slate-500/90 dark:text-slate-300">
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
                <fieldset disabled={isPending} className="group space-y-4">
                  <div className="flex items-center justify-between border-b px-2 pb-4 group-disabled:pointer-events-none group-disabled:opacity-50 dark:border-slate-800/80">
                    <h3 className="dark:text-slate-100">Edit mode</h3>

                    <button
                      type="button"
                      onClick={() => setPageStatus("initial")}
                      className="rounded-full px-6 py-2 font-manrope text-sm font-semibold text-slate-600 shadow-md ring-1 ring-slate-400/40 transition-all active:scale-95 active:bg-white dark:text-white dark:ring-slate-400 dark:active:bg-slate-800"
                    >
                      Close
                    </button>
                  </div>

                  <TitleInput
                    title={workout.title}
                    titleError={res && res.errors?.title}
                    handleTitleInput={handleTitleInput}
                  />

                  <DescriptionInput
                    description={workout.description}
                    handleDescriptionInput={handleDescriptionInput}
                    resetDescriptionInput={resetDescriptionInput}
                  />

                  <ExercisesList
                    editForm
                    workout={workout}
                    exercisesError={res && res.errors?.exercises}
                    updateExercises={updateExercises}
                    editExercises={editExercises}
                    removeExercise={removeExercise}
                  />

                  <div className="fixed left-1/2 top-1/2 z-[9990] -translate-x-1/2 -translate-y-1/2 group-enabled:opacity-0">
                    <Spinner className="size-8 animate-spin text-slate-300 dark:text-slate-500" />
                  </div>
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
              <div className="flex flex-col items-center gap-2 pt-4">
                <p className="text-2xl font-bold uppercase">{workout.title}</p>
                <p className="rounded-xl bg-white px-3.5 py-1 font-manrope font-semibold text-green-500 shadow-md ring-1 ring-slate-200 dark:bg-slate-800/80 dark:ring-slate-700/80">
                  updated
                </p>
              </div>

              <div className="space-y-8 py-16">
                <p className="text-center text-lg font-semibold text-slate-500 dark:text-slate-200">
                  Your workout has been updated successfully
                </p>

                <p className="italic text-slate-400 dark:text-slate-300">
                  Feel free to leave this page
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
              zIndex: 20,
              bottom: 0,
              left: 0,
              right: 0,
            }}
            animate={{
              opacity: 1,
              zIndex: 20,
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
                <PreviewWorkoutDrawerWithTrigger
                  logMode
                  workout={submittedWorkout}
                  className="bg-white px-2 py-1.5 ring-slate-300 active:bg-slate-200 dark:bg-slate-800 dark:ring-slate-700 dark:active:bg-slate-900"
                />

                <AddExerciseDrawer
                  updateExercises={updateExercises}
                  className="rounded-full p-1.5 text-violet-500 active:scale-95 active:bg-slate-200 dark:text-violet-400 dark:active:bg-slate-700"
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
