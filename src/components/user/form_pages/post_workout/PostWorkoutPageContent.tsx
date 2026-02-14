"use client"

import { useMutation } from "@tanstack/react-query"
import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { type ReactNode, useState } from "react"
import { FormSubmitFooterButton, XButton } from "@/components/CustomButtons"
import type { CurrentWorkoutType, DoneWorkoutType } from "@/db/schema"
import { editWorkout } from "@/util/actions/workout"
import { useWorkoutInForm } from "@/util/hooks/useWorkoutInForm"
import type { TimeFormatType } from "@/util/types"
import { BUTTON_TIMEOUT, timeout } from "@/util/utils"
import { FormPendingSpinner } from "../../../Loading"
import { showToast } from "../../../Toasts"
import { FormatDate, FormatWorkoutDuration } from "../../Formatting"
import { type PageStatus, PostWorkoutPageStatusIndicator } from "../../Indicators"
import { SeeWorkoutDrawer } from "../../SeeWorkoutDrawer"
import { ExercisesList } from "../ExercisesList"
import { FormPagesFooterWrapper } from "../FormPagesFooterWrapper"
import { DescriptionInput, TitleInput } from "../WorkoutInputs"

export const PostWorkoutPageContent = ({
  doneWorkout,
  currentWorkout,
  timeFormatPreference,
}: {
  doneWorkout: Omit<DoneWorkoutType, "id">
  currentWorkout: Omit<CurrentWorkoutType, "status">
  timeFormatPreference: TimeFormatType
}) => {
  const [pageStatus, setPageStatus] = useState<PageStatus>("initial")
  const {
    workout,
    handleTitleInput,
    resetTitleInput,
    handleDescriptionInput,
    resetDescriptionInput,
    updateExercises,
  } = useWorkoutInForm({
    title: currentWorkout.title,
    description: currentWorkout.description,
    exercises: currentWorkout.exercises,
  })

  const {
    data: res,
    mutate: serverAction,
    isPending,
  } = useMutation({
    mutationFn: editWorkout,
    onSuccess: (res) => {
      if (res.status === "success-redirect") {
        showToast(res.message, "/current", "View workouts")
        setPageStatus("workout-updated")
      }

      if (res.status === "error") {
        showToast(res.message)
      }
    },
  })

  return (
    <>
      <main className="mt-safe-top px-8 pt-[142px] pb-[73px]">
        <AnimatePresence mode="wait" initial={false}>
          {pageStatus === "initial" ? (
            <AnimatedSection key="workout-results-section">
              <div className="flex flex-col items-center gap-2 py-8">
                <p className="font-bold text-2xl uppercase">{workout.title}</p>

                <PostWorkoutPageStatusIndicator pageStatus={pageStatus} />
              </div>

              <div className="space-y-1 rounded-xl bg-white p-8 shadow-md ring-1 ring-slate-200 ring-inset dark:bg-slate-800 dark:shadow-slate-800/70 dark:ring-slate-600">
                <div className="flex justify-between">
                  <p className="font-manrope font-semibold text-slate-400 italic dark:text-slate-400">
                    Duration
                  </p>

                  <FormatWorkoutDuration
                    duration={doneWorkout.duration}
                    selectedFormat={timeFormatPreference}
                    className="font-bold"
                  />
                </div>

                <div className="flex justify-between">
                  <p className="font-manrope font-semibold text-slate-400 italic dark:text-slate-400">
                    Date
                  </p>

                  <FormatDate withDayOfTheWeek date={doneWorkout.doneAt} className="font-bold" />
                </div>
              </div>

              <div className="space-y-6 pt-8">
                <p className="px-4 text-center font-bold text-lg text-slate-500/90 dark:text-slate-300">
                  Edit next {workout.title} workout?
                </p>

                <div className="flex justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => setPageStatus("editing-workout")}
                    className="rounded-full bg-white px-6 py-2 shadow-md ring-1 ring-slate-300 ring-inset active:scale-95 active:bg-slate-200 dark:bg-slate-800 dark:shadow-slate-800/70 dark:ring-slate-600 dark:active:bg-slate-700"
                  >
                    <p className="font-manrope font-semibold text-green-500 dark:text-green-500">
                      Yes, edit
                    </p>
                    <p className="sr-only">Enter edit mode</p>
                  </button>

                  <div className="w-[1px] bg-slate-300/60 dark:bg-slate-800" />

                  <Link
                    href="/logs"
                    className="rounded-full px-4 py-2 font-manrope font-semibold text-slate-600 active:scale-95 active:bg-white active:shadow-md dark:text-slate-400 dark:active:bg-slate-800 dark:active:shadow-slate-700"
                  >
                    View logs
                    <p className="sr-only">Go to logs page</p>
                  </Link>
                </div>
              </div>
            </AnimatedSection>
          ) : pageStatus === "editing-workout" ? (
            <AnimatedSection key="edit-mode-section">
              <form
                id="post-workout-form"
                onSubmit={(e) => {
                  e.preventDefault()
                  serverAction({ editedWorkout: workout, workoutToEditId: currentWorkout.id })
                }}
              >
                <fieldset disabled={isPending} className="group space-y-4 py-8">
                  <EditModeHeader
                    closeEditMode={async () => {
                      await timeout(BUTTON_TIMEOUT)
                      setPageStatus("initial")
                    }}
                  />

                  <TitleInput
                    title={workout.title}
                    titleError={res?.errors?.title}
                    handleTitleInput={handleTitleInput}
                    resetTitleInput={resetTitleInput}
                  />

                  <DescriptionInput
                    description={workout.description}
                    handleDescriptionInput={handleDescriptionInput}
                    resetDescriptionInput={resetDescriptionInput}
                  />

                  <ExercisesList
                    exercises={workout.exercises}
                    exercisesError={res?.errors?.exercises}
                    updateExercises={updateExercises}
                  />

                  <FormPendingSpinner />
                </fieldset>
              </form>
            </AnimatedSection>
          ) : (
            <AnimatedSection key="workout-updated-section">
              <div className="flex flex-col items-center gap-2 pt-8 pb-16">
                <p className="font-bold text-2xl uppercase">{workout.title}</p>

                <PostWorkoutPageStatusIndicator pageStatus={pageStatus} />
              </div>

              <div className="space-y-8 rounded-xl bg-white p-8 text-center shadow-md ring-1 ring-slate-200 ring-inset dark:bg-slate-800 dark:shadow-slate-800/70 dark:ring-slate-600">
                <p className="font-manrope font-semibold text-slate-500 dark:text-slate-200">
                  Your workout has been updated{" "}
                  <span className="block font-bold text-green-500 text-sm uppercase">
                    successfully
                  </span>
                </p>

                <p className="text-slate-400 text-sm italic dark:text-slate-300">
                  Feel free to leave this page
                </p>
              </div>
            </AnimatedSection>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {pageStatus === "editing-workout" && (
          <AnimatedFooter key="edit-mode-footer">
            <FormPagesFooterWrapper disabled={isPending} className="flex justify-between">
              <SeeWorkoutDrawer
                logMode
                strokeWidth={1.8}
                workout={{
                  title: doneWorkout.title,
                  exercises: doneWorkout.exercises,
                  status: doneWorkout.status,
                }}
                className="rounded-full p-2 active:scale-95 active:bg-slate-200 active:text-white dark:active:bg-slate-700 dark:active:text-slate-400"
                svgClassName="size-6"
              />

              <FormSubmitFooterButton
                form="post-workout-form"
                pending={isPending}
                label="Save"
                loading="Saving..."
              />
            </FormPagesFooterWrapper>
          </AnimatedFooter>
        )}
      </AnimatePresence>
    </>
  )
}

const EditModeHeader = ({ closeEditMode }: { closeEditMode: () => void }) => {
  return (
    <div className="flex items-center justify-between pb-4 group-disabled:pointer-events-none group-disabled:opacity-50">
      <h3 className="italic dark:text-slate-100">Edit mode</h3>

      <XButton
        srOnlyDescription="Close edit mode"
        strokeWidth={3}
        svgSize="size-4"
        onClick={closeEditMode}
        className="rounded-full bg-white p-2 shadow-md ring-1 ring-slate-300 ring-inset active:scale-95 active:bg-slate-200 dark:bg-slate-800 dark:shadow-slate-900/80 dark:ring-slate-600 dark:active:bg-slate-700"
      />
    </div>
  )
}

const AnimatedSection = ({ children }: { children: ReactNode }) => (
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
      y: 16,
      transition: {
        delay: 0.05,
        duration: 0.3,
        ease: [0.36, 0.66, 0.04, 1],
      },
    }}
  >
    {children}
  </motion.div>
)

const AnimatedFooter = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 16,
        position: "fixed",
        zIndex: 20,
        bottom: 0,
        left: 0,
        right: 0,
      }}
      animate={{
        opacity: 1,
        y: 0,
        zIndex: 20,
        transition: {
          duration: 0.4,
          delay: 0.4,
          ease: [0.36, 0.66, 0.04, 1],
        },
      }}
      exit={{
        opacity: 0,
        y: 16,
        transition: {
          delay: 0.05,
          duration: 0.3,
          ease: [0.36, 0.66, 0.04, 1],
        },
      }}
    >
      {children}
    </motion.div>
  )
}
