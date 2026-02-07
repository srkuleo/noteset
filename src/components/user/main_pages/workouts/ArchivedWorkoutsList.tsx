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
        <SwipeAction.Trigger className="flex items-center justify-between rounded-xl bg-white p-6 shadow-md ring-1 ring-slate-300 ring-inset dark:bg-slate-800 dark:ring-slate-700">
          <div className="w-3/5 space-y-1">
            <p className="text-pretty font-bold font-manrope text-lg uppercase dark:text-slate-300">
              {workout.title}
            </p>

            <p className="text-pretty font-semibold text-slate-400/80 text-sm italic leading-none dark:text-slate-400/60">
              {workout.description || "Description not provided"}
            </p>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <WorkoutStatusIndicator
              status={workout.status}
              className="px-3.5 py-2 ring-slate-300/80 dark:bg-slate-900 dark:ring-slate-700"
            />

            <div className="flex gap-1.5">
              <SeeWorkoutDrawer
                workout={{
                  title: workout.title,
                  exercises: workout.exercises,
                  status: workout.status,
                }}
              />

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleUnarchiving({ id: workout.id, title: workout.title, action: "unarchive" })
                }}
              >
                <button
                  type="submit"
                  disabled={isPending}
                  className="group flex justify-center rounded-lg bg-gradient-to-r from-blue-400 to-blue-500 p-2 font-bold text-white shadow-md active:scale-95 active:from-blue-300 active:to-blue-400 disabled:pointer-events-none disabled:opacity-50 dark:from-blue-500 dark:to-blue-600 dark:active:from-blue-700 dark:active:to-blue-800"
                >
                  <Spinner className="absolute size-6 animate-spin text-white group-enabled:opacity-0" />
                  <UnarchiveIcon strokeWidth={1.5} className="size-6 group-disabled:opacity-0" />
                  <span className="sr-only">Unarchive {workout.title} workout</span>
                </button>
              </form>
            </div>
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
