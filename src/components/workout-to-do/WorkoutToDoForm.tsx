"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import { useWorkoutToDo } from "@/util/hooks/useWorkoutToDo";
import { useWorkoutDuration } from "@/util/hooks/useWorkoutDuration";
import { submitDoneWorkout } from "@/util/actions/workout";
import {
  BUTTON_TIMEOUT,
  SWIPE_AND_DRAWER_TIMEOUT,
  timeout,
} from "@/util/utils";
import { showToast } from "../Toasts";
import { NoteInputField } from "./NoteInputField";
import { AddNewSetButton } from "./AddNewSetButton";
import { AddExerciseDrawer } from "../user/AddExerciseDrawer";
import { SubmitDoneWorkoutButton } from "../SubmitButtons";

import type { CreateWorkoutType } from "@/util/types";
import { SwipeAction } from "../swipe/SwipeAction";
import { TrashBinIcon } from "../icons/user/modify";

export const WorkoutToDoForm = ({
  workoutToDo,
}: {
  workoutToDo: CreateWorkoutType;
}) => {
  const router = useRouter();
  const [openDoneModal, setOpenDoneModal] = useState(false);
  const {
    currWorkout,
    placeholderExercises,
    toggleExerciseDoneState,
    handleNoteInput,
    resetNoteInput,
    handleSetsInput,
    addNewSet,
    removeSet,
    updateExercises,
  } = useWorkoutToDo(workoutToDo);
  const { endWorkout, calcWorkoutDuration } = useWorkoutDuration();
  const { mutate: clientAction, isPending } = useMutation({
    mutationFn: async () => {
      const workoutDuration = calcWorkoutDuration();

      const res = await submitDoneWorkout(currWorkout, workoutDuration);

      return res;
    },
    onSuccess: (res) => {
      if (res.status === "success-redirect") {
        router.push(`/post-workout?workoutTitle=${currWorkout.title}`);
      }

      if (res.status === "error") {
        showToast(res.message);
      }

      setOpenDoneModal(false);
    },
  });

  return (
    <>
      <main className="mt-safe-top flex flex-col px-6 pb-[73px] pt-14">
        <form
          id="submit-done-workout"
          action={() => clientAction()}
          className="divide-y divide-slate-300 dark:divide-slate-800"
        >
          {currWorkout.exercises.map((exercise, exerciseIndex) => (
            <div key={exercise.id} className="flex flex-col py-6">
              <div className="flex items-center justify-between gap-2">
                <p className="pb-1 text-2xl font-bold">{exercise.name}</p>

                <button
                  type="button"
                  onClick={async () => {
                    await timeout(BUTTON_TIMEOUT);

                    toggleExerciseDoneState(exercise.id);
                  }}
                  className={`text-xs font-bold italic active:scale-95 ${exercise.done ? "text-blue-400 active:text-blue-600" : "text-violet-400 active:text-violet-600"}`}
                >
                  {exercise.done ? "Unmark" : "Mark as Done"}
                </button>
              </div>

              <NoteInputField
                exercise={exercise}
                handleNoteInput={handleNoteInput}
                resetNoteInput={resetNoteInput}
              />

              <div className="space-y-6 py-8">
                {exercise.sets.some((set) => set.warmup) && (
                  <div>
                    <p className="pb-3 text-center font-manrope text-xs font-semibold uppercase text-slate-500/90 dark:text-slate-300">
                      Warmup sets
                    </p>

                    <AnimatePresence initial={false}>
                      {exercise.sets
                        .filter((set) => set.warmup)
                        .map((warmupSet, warmupSetIndex, warmupSets) => (
                          <motion.div
                            key={warmupSet.id}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{
                              opacity: 1,
                              height: "auto",
                            }}
                            exit={{
                              opacity: 0,
                              height: 0,
                              x: "-100%",
                            }}
                            transition={{
                              opacity: {
                                duration: 0.3,
                                ease: [0.36, 0.66, 0.04, 1],
                              },
                              height: {
                                duration: 0.5,
                                ease: [0.36, 0.66, 0.04, 1],
                              },
                            }}
                          >
                            <div
                              className={`flex justify-center ${warmupSetIndex !== warmupSets.length - 1 ? "pb-3" : "pb-0"}`}
                            >
                              <SwipeAction.Root
                                direction={exercise.done ? "none" : "x"}
                                className="w-4/5"
                              >
                                <SwipeAction.Trigger className="flex justify-between">
                                  <input
                                    type="text"
                                    name="reps"
                                    disabled={exercise.done}
                                    inputMode="tel"
                                    placeholder={
                                      placeholderExercises[
                                        exerciseIndex
                                      ]?.sets.filter(
                                        (set) => set.id === warmupSet.id,
                                      )[0]?.reps
                                    }
                                    onChange={(e) => {
                                      handleSetsInput(
                                        e,
                                        exercise.id,
                                        warmupSet.id,
                                      );
                                    }}
                                    className={twMerge(
                                      "input-field autofill:shadow-autofill-light dark:autofill:shadow-autofill-dark autofill:text-fill-slate-500 dark:autofill:text-fill-white disabled:shadow-exercise-field-light dark:disabled:shadow-exercise-field-dark w-[43%] py-1.5 text-center caret-violet-500 focus:ring-violet-500 disabled:italic disabled:opacity-100 dark:caret-violet-500 dark:focus:ring-violet-500",
                                      !/^\d+(?:[-+]\d+)?$/.test(
                                        warmupSet.reps,
                                      ) &&
                                        warmupSet.reps !== "" &&
                                        "ring-red-500 focus:ring-red-500 dark:ring-red-500 dark:focus:ring-red-500",
                                    )}
                                  />

                                  <input
                                    type="text"
                                    name="weight"
                                    disabled={exercise.done}
                                    inputMode="decimal"
                                    placeholder={
                                      placeholderExercises[
                                        exerciseIndex
                                      ]?.sets.filter(
                                        (set) => set.id === warmupSet.id,
                                      )[0]?.weight + "kg"
                                    }
                                    onChange={(e) => {
                                      handleSetsInput(
                                        e,
                                        exercise.id,
                                        warmupSet.id,
                                      );
                                    }}
                                    className={twMerge(
                                      "input-field autofill:shadow-autofill-light dark:autofill:shadow-autofill-dark autofill:text-fill-slate-500 dark:autofill:text-fill-white disabled:shadow-exercise-field-light dark:disabled:shadow-exercise-field-dark w-[43%] py-1.5 text-center caret-violet-500 focus:ring-violet-500 disabled:italic disabled:opacity-100 dark:caret-violet-500 dark:focus:ring-violet-500",
                                      !/^\d+(,\d+|\.\d+)?$/.test(
                                        warmupSet.weight,
                                      ) &&
                                        warmupSet.weight !== "" &&
                                        "ring-red-500 focus:ring-red-500 dark:ring-red-500 dark:focus:ring-red-500",
                                    )}
                                  />
                                </SwipeAction.Trigger>

                                <SwipeAction.Actions
                                  secondaryWrapperClassName="bg-red-500 w-1/3 rounded-xl flex justify-end"
                                  className="w-1/2"
                                >
                                  <SwipeAction.Action
                                    type="button"
                                    onClick={async () => {
                                      await timeout(SWIPE_AND_DRAWER_TIMEOUT);

                                      removeSet(exercise.id, warmupSet.id);
                                    }}
                                    className="flex w-full items-center justify-center"
                                  >
                                    <TrashBinIcon
                                      strokeWidth={1.5}
                                      className="size-5 text-white"
                                    />
                                  </SwipeAction.Action>
                                </SwipeAction.Actions>
                              </SwipeAction.Root>
                            </div>
                          </motion.div>
                        ))}
                    </AnimatePresence>
                  </div>
                )}

                {exercise.sets.some((set) => !set.warmup) && (
                  <div>
                    <p className="pb-3 text-center font-manrope text-xs font-semibold uppercase text-slate-500/90 dark:text-slate-300">
                      Working sets
                    </p>

                    <AnimatePresence initial={false}>
                      {exercise.sets
                        .filter((set) => !set.warmup)
                        .map((workingSet, workingSetIndex, workingSets) => (
                          <motion.div
                            key={workingSet.id}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{
                              opacity: 1,
                              height: "auto",
                            }}
                            exit={{
                              opacity: 0,
                              height: 0,
                              x: "-100%",
                            }}
                            transition={{
                              opacity: {
                                duration: 0.3,
                                ease: [0.36, 0.66, 0.04, 1],
                              },
                              height: {
                                duration: 0.5,
                                ease: [0.36, 0.66, 0.04, 1],
                              },
                              x: {
                                duration: 0.3,
                                ease: [0.36, 0.66, 0.04, 1],
                              },
                            }}
                          >
                            <div
                              className={`flex justify-center ${workingSetIndex !== workingSets.length - 1 ? "pb-3" : "pb-0"}`}
                            >
                              <SwipeAction.Root
                                direction={exercise.done ? "none" : "x"}
                                className="w-4/5"
                              >
                                <SwipeAction.Trigger className="flex justify-between">
                                  <input
                                    type="text"
                                    name="reps"
                                    disabled={exercise.done}
                                    inputMode="tel"
                                    placeholder={
                                      placeholderExercises[
                                        exerciseIndex
                                      ]?.sets.filter(
                                        (set) => set.id === workingSet.id,
                                      )[0]?.reps
                                    }
                                    onChange={(e) => {
                                      handleSetsInput(
                                        e,
                                        exercise.id,
                                        workingSet.id,
                                      );
                                    }}
                                    className={twMerge(
                                      "input-field autofill:shadow-autofill-light dark:autofill:shadow-autofill-dark autofill:text-fill-slate-500 dark:autofill:text-fill-white disabled:shadow-exercise-field-light dark:disabled:shadow-exercise-field-dark w-[43%] py-1.5 text-center caret-violet-500 focus:ring-violet-500 disabled:italic disabled:opacity-100 dark:caret-violet-500 dark:focus:ring-violet-500",
                                      !/^\d+(?:[-+]\d+)?$/.test(
                                        workingSet.reps,
                                      ) &&
                                        workingSet.reps !== "" &&
                                        "ring-red-500 focus:ring-red-500 dark:ring-red-500 dark:focus:ring-red-500",
                                    )}
                                  />

                                  <input
                                    type="text"
                                    name="weight"
                                    disabled={exercise.done}
                                    inputMode="decimal"
                                    placeholder={
                                      placeholderExercises[
                                        exerciseIndex
                                      ]?.sets.filter(
                                        (set) => set.id === workingSet.id,
                                      )[0]?.weight + "kg"
                                    }
                                    onChange={(e) => {
                                      handleSetsInput(
                                        e,
                                        exercise.id,
                                        workingSet.id,
                                      );
                                    }}
                                    className={twMerge(
                                      "input-field autofill:shadow-autofill-light dark:autofill:shadow-autofill-dark autofill:text-fill-slate-500 dark:autofill:text-fill-white disabled:shadow-exercise-field-light dark:disabled:shadow-exercise-field-dark w-[43%] py-1.5 text-center caret-violet-500 focus:ring-violet-500 disabled:italic disabled:opacity-100 dark:caret-violet-500 dark:focus:ring-violet-500",
                                      !/^\d+(,\d+|\.\d+)?$/.test(
                                        workingSet.weight,
                                      ) &&
                                        workingSet.weight !== "" &&
                                        "ring-red-500 focus:ring-red-500 dark:ring-red-500 dark:focus:ring-red-500",
                                    )}
                                  />
                                </SwipeAction.Trigger>

                                <SwipeAction.Actions
                                  secondaryWrapperClassName="bg-red-500 w-1/3 rounded-xl flex justify-end"
                                  className="w-1/2"
                                >
                                  <SwipeAction.Action
                                    type="button"
                                    onClick={async () => {
                                      await timeout(SWIPE_AND_DRAWER_TIMEOUT);

                                      removeSet(exercise.id, workingSet.id);
                                    }}
                                    className="flex w-full items-center justify-center"
                                  >
                                    <TrashBinIcon
                                      strokeWidth={1.5}
                                      className="size-5 text-white"
                                    />
                                  </SwipeAction.Action>
                                </SwipeAction.Actions>
                              </SwipeAction.Root>
                            </div>
                          </motion.div>
                        ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              <AddNewSetButton exercise={exercise} addNewSet={addNewSet} />
            </div>
          ))}
        </form>
      </main>

      <footer className="fixed inset-x-0 bottom-0 z-[9990] border-t border-slate-300/80 bg-white px-6 pb-6 pt-2 text-end dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
          <AddExerciseDrawer
            updateExercises={updateExercises}
            className="rounded-full p-1.5 text-violet-500 active:scale-95 active:bg-slate-200 dark:text-violet-400 dark:active:bg-slate-700"
          />

          <div className="flex items-center gap-4">
            <div className="flex gap-1 text-sm font-bold text-slate-400 dark:text-slate-300">
              <p>
                {
                  currWorkout.exercises.filter((exercise) => exercise.done)
                    .length
                }
              </p>
              <p>/</p>
              <p>{currWorkout.exercises.length}</p>
            </div>

            <SubmitDoneWorkoutButton
              formId="submit-done-workout"
              pending={isPending}
              open={openDoneModal}
              setOpen={setOpenDoneModal}
              endWorkout={endWorkout}
            />
          </div>
        </div>
      </footer>
    </>
  );
};
