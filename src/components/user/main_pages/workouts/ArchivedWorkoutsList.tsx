"use client"

import { useMutation } from "@tanstack/react-query"
import { AnimatePresence, motion } from "framer-motion"
import { TrashBinIcon, UnarchiveIcon } from "@/components/icons/user/modify"
import { Spinner } from "@/components/Loading"
import { SwipeAction } from "@/components/swipe/SwipeAction"
import { showToast } from "@/components/Toasts"
import { WorkoutStatusIndicator } from "@/components/user/Indicators"
import type { CurrentWorkoutType, WorkoutToRemoveType } from "@/db/schema"
import { updateWorkouts } from "@/util/actions/workout"
import { useUserWorkouts } from "@/util/hooks/useUserWorkouts"
import { SWIPE_AND_DRAWER_TIMEOUT, timeout } from "@/util/utils"
import { SeeWorkoutDrawer } from "../../SeeWorkoutDrawer"
import { RemoveWorkoutModal } from "../RemoveWorkoutModal"
import { WorkoutsListShell } from "./WorkoutsListShell"

export const ArchivedWorkoutsList = ({
  archivedWorkouts,
}: {
  archivedWorkouts: CurrentWorkoutType[]
}) => {
  const {
    workouts: archivedWorkoutsList,
    workoutToRemove,
    openModal,
    removeWorkoutOnClient,
    selectWorkoutToRemove,
    toggleModal,
  } = useUserWorkouts({ workoutsFromServer: archivedWorkouts })

  return (
    <>
      <RemoveWorkoutModal
        open={openModal}
        toggleModal={toggleModal}
        workout={workoutToRemove}
        removeWorkoutOnClient={removeWorkoutOnClient}
      />

      {archivedWorkoutsList.length > 0 ? (
        <main className="mt-safe-top space-y-4 px-6 pt-[158px] pb-[97px]">
          <AnimatePresence>
            {archivedWorkoutsList.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
                removeWorkoutOnClient={removeWorkoutOnClient}
                selectWorkoutToRemove={selectWorkoutToRemove}
                toggleModal={toggleModal}
              />
            ))}
          </AnimatePresence>
        </main>
      ) : (
        <main className="mt-safe-top flex flex-col justify-center px-6 pt-[158px] pb-[97px]">
          <WorkoutsListShell status="archived" />
        </main>
      )}
    </>
  )
}

const WorkoutCard = ({
  workout,
  removeWorkoutOnClient,
  selectWorkoutToRemove,
  toggleModal,
}: {
  workout: CurrentWorkoutType
  removeWorkoutOnClient: (workoutId: number) => void
  selectWorkoutToRemove: (workout: WorkoutToRemoveType) => void
  toggleModal: () => void
}) => {
  const { mutate: handleUnarchiving, isPending } = useMutation({
    mutationFn: updateWorkouts,
    onSuccess: (res, { id }) => {
      if (res.status === "success-redirect") {
        removeWorkoutOnClient(id)

        showToast(res.message, "/current", "See current")
      } else {
        showToast(res.message)
      }
    },
  })

  return (
    <motion.div
      layout
      exit={{
        x: "-100%",
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
            <div className="w-[calc(100%-90px)] space-y-1">
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

            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleUnarchiving({ id: workout.id, title: workout.title, action: "unarchive" })
              }}
              className="flex-1"
            >
              <button
                type="submit"
                disabled={isPending}
                className="group flex w-full items-center justify-center gap-1 rounded-br-xl py-3 text-blue-400 active:text-blue-600 disabled:pointer-events-none disabled:opacity-50 dark:text-blue-500 dark:active:text-blue-300"
              >
                <Spinner className="absolute size-6 animate-spin group-enabled:opacity-0" />

                <p className="font-extrabold font-manrope text-xs italic group-disabled:opacity-0">
                  Unarchive
                </p>
                <UnarchiveIcon strokeWidth={2} className="size-5 group-disabled:opacity-0" />
              </button>
            </form>
          </div>
        </SwipeAction.Trigger>

        <SwipeAction.Actions wrapperClassName="bg-slate-200 dark:bg-slate-800/80 rounded-xl">
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
