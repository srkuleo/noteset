"use client"

import { useMutation } from "@tanstack/react-query"
import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { twMerge } from "tailwind-merge"
import type { CurrentWorkoutForFormsType } from "@/db/schema"
import { submitWorkout } from "@/util/actions/workout"
import { useWorkoutDuration } from "@/util/hooks/useWorkoutDuration"
import { useWorkoutToDo } from "@/util/hooks/useWorkoutToDo"
import { BUTTON_TIMEOUT, SWIPE_AND_DRAWER_TIMEOUT, timeout } from "@/util/utils"
import { SubmitDoneWorkoutButton } from "../CustomButtons"
import { TrashBinIcon } from "../icons/user/modify"
import { SwipeAction } from "../swipe/SwipeAction"
import { showToast } from "../Toasts"
import { NoteInput } from "../user/form_pages/ExerciseInputs"

export const WorkoutToDoForm = ({ workoutToDo }: { workoutToDo: CurrentWorkoutForFormsType }) => {
  const router = useRouter()
  const [openDoneModal, setOpenDoneModal] = useState(false)
  const {
    workout,
    placeholderExercises,
    exerciseRefs,
    toggleExerciseDoneState,
    handleNoteInput,
    resetNoteInput,
    handleSetsInput,
    // addNewSet,
    removeSet,
    // updateExercises,
  } = useWorkoutToDo(workoutToDo)
  const { calcWorkoutDuration } = useWorkoutDuration()
  const { mutate: serverAction, isPending } = useMutation({
    mutationFn: submitWorkout,
    onSuccess: (res) => {
      if (res.status === "success-redirect") {
        router.push(`/post-workout?workoutTitle=${workout.title}`)
      }

      if (res.status === "error") {
        showToast(res.message)
      }

      setOpenDoneModal(false)
    },
  })

  return (
    <>
      <main className="mt-safe-top flex flex-col px-6 pt-14 pb-[91px]">
        <form
          id="submit-done-workout"
          onSubmit={(e) => {
            e.preventDefault()
            serverAction({ doneWorkout: workout, duration: calcWorkoutDuration() })
          }}
          className="divide-y divide-slate-300 dark:divide-slate-800"
        >
          {workout.exercises.map((exercise, exerciseIndex) => (
            <div
              key={exercise.id}
              ref={(el) => {
                exerciseRefs.current[exerciseIndex] = el
              }}
              className="flex scroll-mt-[calc(56px+env(safe-area-inset-top))] flex-col py-6"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="pb-1 font-bold text-2xl">{exercise.name}</p>

                <button
                  type="button"
                  onClick={async () => {
                    await timeout(BUTTON_TIMEOUT)

                    toggleExerciseDoneState(exercise.id)
                  }}
                  className={`font-bold text-xs italic active:scale-95 ${exercise.done ? "text-blue-400 active:text-blue-600" : "text-violet-400 active:text-violet-600"}`}
                >
                  {exercise.done ? "Unmark" : "Mark as Done"}
                </button>
              </div>

              <NoteInput
                note={exercise.note}
                onChange={(e) => {
                  handleNoteInput(e, exercise.id)
                }}
                resetNoteInput={() => resetNoteInput(exercise.id)}
                className="border-b-2 border-b-slate-100 py-2 dark:border-slate-950"
                focusedWrapperClassName="border-b-green-500 dark:border-b-green-600"
                focusedInputClassName="w-[calc(100%-30px)]"
              />

              <div className="py-6">
                {exercise.sets.some((set) => set.purpose === "warmup") && (
                  <div className="space-y-3">
                    <p className="text-center font-bold font-manrope text-slate-500/90 text-xs uppercase dark:text-slate-300">
                      Warmup sets
                    </p>

                    <AnimatePresence initial={false}>
                      {exercise.sets
                        .filter((set) => set.purpose === "warmup")
                        .map((warmupSet, warmupSetIndex) => (
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
                            <div className="flex justify-center">
                              <SwipeAction.Root
                                direction={exercise.done ? "none" : "x"}
                                className="w-4/5"
                              >
                                <SwipeAction.Trigger className="flex justify-between">
                                  <input
                                    id={`${warmupSet.id}:rep${warmupSetIndex + 1}`}
                                    name="reps"
                                    type="text"
                                    disabled={exercise.done}
                                    inputMode="tel"
                                    placeholder={
                                      placeholderExercises[exerciseIndex]?.sets.find(
                                        (set) => set.id === warmupSet.id
                                      )?.reps
                                    }
                                    onChange={(e) => {
                                      handleSetsInput(e, exercise.id, warmupSet.id)
                                    }}
                                    className={twMerge(
                                      "input-field w-[43%] py-1.5 text-center caret-violet-500 autofill:text-fill-slate-500 autofill:shadow-autofill-light focus:ring-violet-500 disabled:italic disabled:opacity-100 disabled:shadow-exercise-field-light dark:caret-violet-500 dark:disabled:shadow-exercise-field-dark dark:focus:ring-violet-500 dark:autofill:text-fill-white dark:autofill:shadow-autofill-dark",
                                      !/^\d+(?:[-+]\d+)?$/.test(warmupSet.reps) &&
                                        warmupSet.reps !== "" &&
                                        "ring-red-500 focus:ring-red-500 dark:ring-red-500 dark:focus:ring-red-500"
                                    )}
                                  />

                                  <input
                                    id={`${warmupSet.id}:weight${warmupSetIndex + 1}`}
                                    name="weight"
                                    type="text"
                                    disabled={exercise.done}
                                    inputMode="decimal"
                                    placeholder={`${
                                      placeholderExercises[exerciseIndex]?.sets.find(
                                        (set) => set.id === warmupSet.id
                                      )?.weight
                                    }kg`}
                                    onChange={(e) => {
                                      handleSetsInput(e, exercise.id, warmupSet.id)
                                    }}
                                    className={twMerge(
                                      "input-field w-[43%] py-1.5 text-center caret-violet-500 autofill:text-fill-slate-500 autofill:shadow-autofill-light focus:ring-violet-500 disabled:italic disabled:opacity-100 disabled:shadow-exercise-field-light dark:caret-violet-500 dark:disabled:shadow-exercise-field-dark dark:focus:ring-violet-500 dark:autofill:text-fill-white dark:autofill:shadow-autofill-dark",
                                      !/^\d+(,\d+|\.\d+)?$/.test(warmupSet.weight) &&
                                        warmupSet.weight !== "" &&
                                        "ring-red-500 focus:ring-red-500 dark:ring-red-500 dark:focus:ring-red-500"
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
                                      await timeout(SWIPE_AND_DRAWER_TIMEOUT)

                                      removeSet(exercise.id, warmupSet.id)
                                    }}
                                    className="flex w-full items-center justify-center"
                                  >
                                    <TrashBinIcon strokeWidth={1.5} className="size-5 text-white" />
                                  </SwipeAction.Action>
                                </SwipeAction.Actions>
                              </SwipeAction.Root>
                            </div>
                          </motion.div>
                        ))}
                    </AnimatePresence>
                  </div>
                )}

                {exercise.sets.some((set) => set.purpose === "working") && (
                  <div className="space-y-3 pt-3">
                    <p className="text-center font-bold font-manrope text-slate-500/90 text-xs uppercase dark:text-slate-300">
                      Working sets
                    </p>

                    <AnimatePresence initial={false}>
                      {exercise.sets
                        .filter((set) => set.purpose === "working")
                        .map((workingSet, workingSetIndex) => (
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
                            <div className="flex justify-center">
                              <SwipeAction.Root
                                direction={exercise.done ? "none" : "x"}
                                className="w-4/5"
                              >
                                <SwipeAction.Trigger className="flex justify-between">
                                  <input
                                    id={`${workingSet.id}:rep${workingSetIndex + 1}`}
                                    name="reps"
                                    type="text"
                                    disabled={exercise.done}
                                    inputMode="tel"
                                    placeholder={
                                      placeholderExercises[exerciseIndex]?.sets.find(
                                        (set) => set.id === workingSet.id
                                      )?.reps
                                    }
                                    onChange={(e) => {
                                      handleSetsInput(e, exercise.id, workingSet.id)
                                    }}
                                    className={twMerge(
                                      "input-field w-[43%] py-1.5 text-center caret-violet-500 autofill:text-fill-slate-500 autofill:shadow-autofill-light focus:ring-violet-500 disabled:italic disabled:opacity-100 disabled:shadow-exercise-field-light dark:caret-violet-500 dark:disabled:shadow-exercise-field-dark dark:focus:ring-violet-500 dark:autofill:text-fill-white dark:autofill:shadow-autofill-dark",
                                      !/^\d+(?:[-+]\d+)?$/.test(workingSet.reps) &&
                                        workingSet.reps !== "" &&
                                        "ring-red-500 focus:ring-red-500 dark:ring-red-500 dark:focus:ring-red-500"
                                    )}
                                  />

                                  <input
                                    id={`${workingSet.id}:weight${workingSetIndex + 1}`}
                                    name="weight"
                                    type="text"
                                    disabled={exercise.done}
                                    inputMode="decimal"
                                    placeholder={`${
                                      placeholderExercises[exerciseIndex]?.sets.find(
                                        (set) => set.id === workingSet.id
                                      )?.weight
                                    }kg`}
                                    onChange={(e) => {
                                      handleSetsInput(e, exercise.id, workingSet.id)
                                    }}
                                    className={twMerge(
                                      "input-field w-[43%] py-1.5 text-center caret-violet-500 autofill:text-fill-slate-500 autofill:shadow-autofill-light focus:ring-violet-500 disabled:italic disabled:opacity-100 disabled:shadow-exercise-field-light dark:caret-violet-500 dark:disabled:shadow-exercise-field-dark dark:focus:ring-violet-500 dark:autofill:text-fill-white dark:autofill:shadow-autofill-dark",
                                      !/^\d+(,\d+|\.\d+)?$/.test(workingSet.weight) &&
                                        workingSet.weight !== "" &&
                                        "ring-red-500 focus:ring-red-500 dark:ring-red-500 dark:focus:ring-red-500"
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
                                      await timeout(SWIPE_AND_DRAWER_TIMEOUT)

                                      removeSet(exercise.id, workingSet.id)
                                    }}
                                    className="flex w-full items-center justify-center"
                                  >
                                    <TrashBinIcon strokeWidth={1.5} className="size-5 text-white" />
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

              {/* implement new way of adding extra set to the exercise */}
            </div>
          ))}
        </form>
      </main>

      <footer className="fixed inset-x-0 bottom-0 z-[9990] flex flex-col gap-2 border-slate-300/80 border-t bg-white px-6 pt-2 pb-6 text-end dark:border-slate-800 dark:bg-slate-900">
        <div className="flex gap-1.5">
          {workout.exercises.map((exercise, btnIndex) => (
            <button
              key={exercise.id}
              type="button"
              onClick={() =>
                exerciseRefs.current[btnIndex]?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                })
              }
              className={twMerge(
                "h-2.5 w-full rounded-lg",
                exercise.done
                  ? "bg-green-500 active:bg-green-600 dark:bg-green-600 dark:active:bg-green-700"
                  : "bg-slate-200 active:bg-slate-500 dark:bg-slate-700 dark:active:bg-slate-400"
              )}
            />
          ))}
        </div>

        <div className="flex justify-end">
          <SubmitDoneWorkoutButton
            formId="submit-done-workout"
            pending={isPending}
            open={openDoneModal}
            setOpen={setOpenDoneModal}
          />
        </div>
      </footer>
    </>
  )
}
