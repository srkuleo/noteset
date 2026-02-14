"use client"

import { AnimatePresence, motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowDoubleRightIcon } from "@/components/icons/arrows"
import { EditIcon, TrashBinIcon } from "@/components/icons/user/modify"
import { SwipeAction } from "@/components/swipe/SwipeAction"
import { WorkoutStatusIndicator } from "@/components/user/Indicators"
import type { CurrentWorkoutType, WorkoutToRemoveType } from "@/db/schema"
import { useUserWorkouts } from "@/util/hooks/useUserWorkouts"
import { SWIPE_AND_DRAWER_TIMEOUT, timeout } from "@/util/utils"
import { SeeWorkoutDrawer } from "../../SeeWorkoutDrawer"
import { RemoveWorkoutModal } from "../RemoveWorkoutModal"
import { WorkoutsListShell } from "./WorkoutsListShell"

export const CurrentWorkoutsList = ({ workouts }: { workouts: CurrentWorkoutType[] }) => {
  const {
    workouts: currentWorkoutsList,
    workoutToRemove,
    openModal,
    removeWorkoutOnClient,
    selectWorkoutToRemove,
    toggleModal,
  } = useUserWorkouts({ workoutsFromServer: workouts })

  return (
    <>
      <RemoveWorkoutModal
        open={openModal}
        toggleModal={toggleModal}
        workout={workoutToRemove}
        removeWorkoutOnClient={removeWorkoutOnClient}
      />

      {currentWorkoutsList.length > 0 ? (
        <main className="mt-safe-top space-y-4 px-6 pt-[158px] pb-[97px]">
          <AnimatePresence>
            {currentWorkoutsList.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
                selectWorkoutToRemove={selectWorkoutToRemove}
                toggleModal={toggleModal}
              />
            ))}
          </AnimatePresence>
        </main>
      ) : (
        <main className="mt-safe-top flex flex-col justify-center px-6 pt-[158px] pb-[97px]">
          <WorkoutsListShell status="current" />
        </main>
      )}
    </>
  )
}

const WorkoutCard = ({
  workout,
  toggleModal,
  selectWorkoutToRemove,
}: {
  workout: CurrentWorkoutType
  toggleModal: () => void
  selectWorkoutToRemove: (workout: WorkoutToRemoveType) => void
}) => {
  const router = useRouter()

  return (
    <motion.div
      key={workout.id}
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
        <SwipeAction.Trigger className="flex flex-col rounded-xl bg-white shadow-md ring-1 ring-slate-300 ring-inset dark:bg-slate-800 dark:ring-slate-700">
          <div className="flex items-center gap-2 p-6">
            <div className="w-[calc(100%-86px)] space-y-1">
              <p className="text-pretty font-bold font-manrope uppercase dark:text-slate-300">
                {workout.title}
              </p>

              <p className="text-pretty font-semibold text-slate-400/80 text-sm italic leading-none dark:text-slate-400/60">
                {workout.description || "Description not provided"}
              </p>
            </div>

            <WorkoutStatusIndicator
              status={workout.status}
              className="px-3.5 py-2 ring-slate-300/80 dark:bg-slate-900 dark:ring-slate-700"
            />
          </div>

          <div className="flex divide-x divide-slate-300 rounded-b-xl bg-slate-100 ring-1 ring-slate-300 ring-inset dark:divide-slate-700 dark:bg-slate-900 dark:ring-slate-700">
            <SeeWorkoutDrawer
              buttonWithText
              workout={{
                title: workout.title,
                exercises: workout.exercises,
                status: workout.status,
              }}
              className="flex flex-1 items-center justify-center gap-1 rounded-bl-xl py-3 active:text-slate-900 dark:active:text-slate-400"
              svgClassName="size-5"
            />

            <Link
              href={`/workout-to-do?id=${workout.id}`}
              scroll={false}
              className="flex flex-1 items-center justify-center gap-1 rounded-br-xl py-3 text-blue-400 active:text-blue-600 dark:text-blue-500 dark:active:text-blue-300"
            >
              <p className="font-extrabold font-manrope text-xs italic">Start workout</p>
              <ArrowDoubleRightIcon />
            </Link>
          </div>
        </SwipeAction.Trigger>

        <SwipeAction.Actions
          wrapperClassName="bg-slate-200 dark:bg-slate-800/80 rounded-xl"
          className="flex-col"
        >
          <SwipeAction.Action
            onClick={async () => {
              await timeout(SWIPE_AND_DRAWER_TIMEOUT)

              selectWorkoutToRemove({
                id: workout.id,
                title: workout.title,
                status: workout.status,
              })
              toggleModal()
            }}
            className="flex grow items-center justify-center border-slate-400/35 border-b px-4 text-red-500 active:bg-white dark:border-slate-700 dark:text-red-500 dark:active:bg-slate-700"
          >
            <TrashBinIcon strokeWidth={1.5} className="size-7" />
            <span className="sr-only">Remove workout</span>
          </SwipeAction.Action>

          <SwipeAction.Action
            onClick={async () => {
              await timeout(SWIPE_AND_DRAWER_TIMEOUT)

              router.push(`/edit-workout?id=${workout.id}`)
            }}
            className="flex grow items-center justify-center px-4 text-green-500 active:bg-white dark:text-green-500 dark:active:bg-slate-700"
          >
            <EditIcon strokeWidth={1.5} className="size-7" />
            <span className="sr-only">Edit workout</span>
          </SwipeAction.Action>
        </SwipeAction.Actions>
      </SwipeAction.Root>
    </motion.div>
  )
}
