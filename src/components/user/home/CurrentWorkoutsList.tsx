"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useWorkoutsOnHomePage } from "@/util/hooks/useWorkoutsOnHomePage";
import {
  timeout,
  SWIPE_AND_DRAWER_TIMEOUT,
  BUTTON_TIMEOUT,
} from "@/util/utils";
import { PreviewWorkoutDrawer } from "../PreviewWorkoutDrawer";
import { RemoveWorkoutModal } from "../RemoveWorkoutModal";
import { WorkoutsListShell } from "./WorkoutsListShell";
import { StatusIndicator } from "@/components/StatusIndicator";
import { SwipeAction } from "@/components/swipe/SwipeAction";
import { SolidShowIcon } from "@/components/icons/user/preview";
import {
  SolidTrashBinIcon,
  SolidEditIcon,
} from "@/components/icons/user/modify";

import type { PartialWorkoutType } from "@/db/schema";
import type { WorkoutSwipeActions } from "@/util/types";

export const CurrentWorkoutsList = ({
  workouts,
}: {
  workouts: PartialWorkoutType[];
}) => {
  const {
    workoutsList,
    targetedWorkout,
    isOpenRemoveModal,
    isOpenPreviewDrawer,
    removeWorkoutOnClient,
    setAsTargetedWorkout,
    toggleModal,
    toggleDrawer,
  } = useWorkoutsOnHomePage(workouts);

  return (
    <>
      <RemoveWorkoutModal
        targetedWorkout={targetedWorkout}
        open={isOpenRemoveModal}
        toggleModal={toggleModal}
        removeWorkoutOnClient={removeWorkoutOnClient}
      />

      <PreviewWorkoutDrawer
        workout={targetedWorkout}
        open={isOpenPreviewDrawer}
        toggleDrawer={toggleDrawer}
      />

      {workoutsList.length === 0 ? (
        <main className="mt-safe-top flex flex-col justify-center px-6 pb-[100px] pt-[157px]">
          <WorkoutsListShell status="current" />
        </main>
      ) : (
        <main className="mt-safe-top space-y-4 px-6 pb-[100px] pt-[157px]">
          <AnimatePresence>
            {workoutsList.map((workout) => (
              <motion.div
                key={workout.id}
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
                  <SwipeAction.Trigger className="flex items-center justify-between rounded-xl border border-slate-300/80 bg-white p-6 shadow-md dark:border-slate-700 dark:bg-slate-800">
                    <div className="w-3/5 space-y-1">
                      <p className="text-pretty font-manrope text-lg font-bold uppercase dark:text-slate-300">
                        {workout.title}
                      </p>

                      <p className="text-pretty text-sm font-semibold italic leading-none text-slate-400/80 dark:text-slate-400/60">
                        {workout.description
                          ? workout.description
                          : "Description not provided"}
                      </p>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                      <StatusIndicator
                        status={workout.status}
                        className="px-3 py-2 ring-slate-300/80 dark:bg-slate-900 dark:ring-slate-700"
                      />

                      <Link
                        href={`/workout-to-do?id=${workout.id}`}
                        scroll={false}
                        className="flex rounded-lg bg-gradient-to-r from-violet-400 to-violet-500 px-4 py-1 font-bold text-white shadow-md transition active:scale-90 active:from-violet-300 active:to-violet-400 dark:from-violet-500 dark:to-violet-600 dark:active:from-violet-700 dark:active:to-violet-800"
                      >
                        Start
                        <p className="sr-only">Start this workout</p>
                      </Link>
                    </div>
                  </SwipeAction.Trigger>

                  <CurrentWorkoutsSwipeActions
                    openPreviewDrawer={toggleDrawer}
                    openRemoveModal={toggleModal}
                    workoutToEditId={workout.id}
                    workoutToPreview={() => setAsTargetedWorkout(workout)}
                    workoutToRemove={() => setAsTargetedWorkout(workout)}
                  />
                </SwipeAction.Root>
              </motion.div>
            ))}
          </AnimatePresence>
        </main>
      )}
    </>
  );
};

const CurrentWorkoutsSwipeActions = ({
  openPreviewDrawer,
  openRemoveModal,
  workoutToEditId,
  workoutToPreview,
  workoutToRemove,
}: WorkoutSwipeActions) => {
  const router = useRouter();

  return (
    <SwipeAction.Actions
      wrapperClassName="bg-red-200 dark:bg-red-600 rounded-xl"
      className="w-2/3"
    >
      <SwipeAction.Action
        onClick={async () => {
          await timeout(SWIPE_AND_DRAWER_TIMEOUT);

          workoutToRemove();
          openRemoveModal();
        }}
        className="flex w-1/3 flex-col items-center justify-center gap-1 bg-red-200 text-red-600 dark:bg-red-600 dark:text-white"
      >
        <SolidTrashBinIcon
          fill="currentColor"
          stroke="transparent"
          strokeWidth={0}
          className="size-7"
        />
        <p className="text-[11px] font-semibold uppercase">Remove</p>
        <span className="sr-only">Remove workout</span>
      </SwipeAction.Action>

      <SwipeAction.Action
        onClick={async () => {
          await timeout(SWIPE_AND_DRAWER_TIMEOUT);

          router.push(`/edit-workout?id=${workoutToEditId}`);
        }}
        className="flex w-1/3 flex-col items-center justify-center gap-1 bg-green-200 text-green-600 dark:bg-green-600 dark:text-white"
      >
        <SolidEditIcon
          fill="currentColor"
          stroke="transparent"
          strokeWidth={0}
          className="size-7"
        />
        <p className="text-[11px] font-semibold uppercase">Edit</p>
        <span className="sr-only">Edit workout</span>
      </SwipeAction.Action>

      <SwipeAction.Action
        onClick={async () => {
          await timeout(BUTTON_TIMEOUT);

          workoutToPreview();
          openPreviewDrawer();
        }}
        className="flex w-1/3 flex-col items-center justify-center gap-1 bg-violet-200 text-violet-600 dark:bg-violet-600 dark:text-white"
      >
        <SolidShowIcon
          fill="currentColor"
          stroke="transparent"
          strokeWidth={0}
          className="size-7"
        />
        <p className="text-[11px] font-semibold uppercase">Preview</p>
        <p className="sr-only">Preview workout</p>
      </SwipeAction.Action>
    </SwipeAction.Actions>
  );
};
