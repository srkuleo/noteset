"use client"

import { AnimatePresence, motion } from "framer-motion"
import { TrashBinIcon } from "@/components/icons/user/modify"
import { EmptyIcon } from "@/components/icons/user/warning"
import { SwipeAction } from "@/components/swipe/SwipeAction"
import { FormatWorkoutDuration } from "@/components/user/Formatting"
import { WorkoutStatusIndicator } from "@/components/user/Indicators"
import type { DoneWorkoutType, WorkoutToRemoveType } from "@/db/schema"
import { useUserWorkouts } from "@/util/hooks/useUserWorkouts"
import type { LogsPageSearchParams, TimeFormatType } from "@/util/types"
import { SWIPE_AND_DRAWER_TIMEOUT, timeout } from "@/util/utils"
import { SeeWorkoutDrawer } from "../../SeeWorkoutDrawer"
import { RemoveWorkoutModal } from "../RemoveWorkoutModal"

export const LogsPageContent = ({
  doneWorkouts,
  timeFormatPreference,
  searchQuery,
}: {
  doneWorkouts: DoneWorkoutType[]
  timeFormatPreference: TimeFormatType
  searchQuery: LogsPageSearchParams["searchQuery"]
}) => {
  const {
    workouts: doneWorkoutsList,
    workoutToRemove,
    openModal,
    removeWorkoutOnClient,
    selectWorkoutToRemove,
    toggleModal,
  } = useUserWorkouts({ workoutsFromServer: doneWorkouts })

  return (
    <>
      <RemoveWorkoutModal
        open={openModal}
        toggleModal={toggleModal}
        workout={workoutToRemove}
        removeWorkoutOnClient={removeWorkoutOnClient}
      />

      {doneWorkoutsList.length > 0 ? (
        <main className="mt-safe-top space-y-4 px-6 pt-[217px] pb-[97px]">
          <AnimatePresence>
            {doneWorkoutsList.map((doneWorkout) => (
              <DoneWorkoutCard
                key={doneWorkout.id}
                timeFormatPreference={timeFormatPreference}
                doneWorkout={doneWorkout}
                selectWorkoutToRemove={selectWorkoutToRemove}
                toggleModal={toggleModal}
              />
            ))}
          </AnimatePresence>
        </main>
      ) : (
        <main className="mt-safe-top flex flex-col justify-center px-8 pt-[141px] pb-36">
          <EmptyPage searchQuery={searchQuery} />
        </main>
      )}
    </>
  )
}

const DoneWorkoutCard = ({
  doneWorkout,
  timeFormatPreference,
  selectWorkoutToRemove,
  toggleModal,
}: {
  doneWorkout: DoneWorkoutType
  timeFormatPreference: TimeFormatType
  selectWorkoutToRemove: (workout: WorkoutToRemoveType) => void
  toggleModal: () => void
}) => {
  return (
    <motion.div
      layout
      exit={{
        x: "100%",
        opacity: [1, 0],
        transition: {
          delay: 0.3,
          duration: 0.3,
          ease: [0.36, 0.66, 0.04, 1],
        },
      }}
    >
      <SwipeAction.Root direction="x">
        <SwipeAction.Trigger className="flex items-center gap-2 rounded-xl bg-white p-6 ring-1 ring-slate-300 ring-inset dark:bg-slate-800 dark:ring-slate-700">
          <div className="flex-1">
            <p className="text-pretty font-bold font-manrope uppercase dark:text-slate-300">
              {doneWorkout.title}
            </p>

            <div className="flex items-center gap-2 divide-x divide-slate-300 dark:divide-slate-600">
              <p className="font-manrope font-semibold text-[14px] text-slate-400/80 leading-[14px] dark:text-slate-400/60">
                {doneWorkout.doneAt?.toLocaleString("en", {
                  weekday: "long",
                })}
              </p>

              <FormatWorkoutDuration
                duration={doneWorkout.duration}
                selectedFormat={timeFormatPreference}
                className="pl-2 font-manrope font-semibold text-[14px] text-slate-400/80 leading-[14px] dark:text-slate-400/60"
              />
            </div>

            <p className="space-x-1 pt-3 font-bold text-[14px] italic leading-[14px] dark:text-slate-400">
              <span>{String(doneWorkout.doneAt?.getDate()).padStart(2, "0")}</span>
              <span>
                {doneWorkout.doneAt?.toLocaleString("en", {
                  month: "short",
                })}
              </span>
              <span>{doneWorkout.doneAt?.getFullYear()}</span>
            </p>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <WorkoutStatusIndicator
              status={doneWorkout.status}
              className="px-3 py-2 ring-slate-300/80 dark:bg-slate-900 dark:ring-slate-700"
            />

            <SeeWorkoutDrawer
              logMode
              workout={{
                title: doneWorkout.title,
                exercises: doneWorkout.exercises,
                status: doneWorkout.status,
              }}
            />
          </div>
        </SwipeAction.Trigger>

        <SwipeAction.Actions wrapperClassName="bg-slate-200 dark:bg-slate-800/80 rounded-xl">
          <SwipeAction.Action
            onClick={async () => {
              await timeout(SWIPE_AND_DRAWER_TIMEOUT)
              selectWorkoutToRemove({
                id: doneWorkout.id,
                title: doneWorkout.title,
                status: doneWorkout.status,
              })
              toggleModal()
            }}
            className="flex grow items-center justify-center px-4 text-red-500 active:bg-white dark:text-red-500 dark:active:bg-slate-700"
          >
            <TrashBinIcon strokeWidth={1.5} className="size-7" />
            <span className="sr-only">Remove workout</span>
          </SwipeAction.Action>
        </SwipeAction.Actions>
      </SwipeAction.Root>
    </motion.div>
  )
}

const EmptyPage = ({ searchQuery }: { searchQuery: LogsPageSearchParams["searchQuery"] }) => {
  return (
    <div className="space-y-4 text-center">
      <div className="flex justify-center text-slate-400/60 dark:text-slate-700/80">
        {EmptyIcon}
      </div>

      <h3>
        {searchQuery
          ? `No results for "${searchQuery}"`
          : `Seems like you don't have any completed workout yet`}
      </h3>
    </div>
  )
}
