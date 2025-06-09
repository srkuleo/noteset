"use client";

import { useMutation } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useWorkoutsOnHomePage } from "@/util/hooks/useWorkoutsOnHomePage";
import { unarchiveWorkout } from "@/util/actions/workout";
import {
  timeout,
  BUTTON_TIMEOUT,
  SWIPE_AND_DRAWER_TIMEOUT,
  FORM_TIMEOUT,
} from "@/util/utils";
import { PreviewWorkoutDrawer } from "../PreviewWorkoutDrawer";
import { RemoveWorkoutModal } from "../RemoveWorkoutModal";
import { WorkoutsListShell } from "./WorkoutsListShell";
import { StatusIndicator } from "@/components/StatusIndicator";
import { Spinner } from "@/components/Loading";
import { showToast } from "@/components/Toasts";
import { SwipeAction } from "@/components/swipe/SwipeAction";
import { ShowIcon } from "@/components/icons/user/preview";
import { TrashBinIcon } from "@/components/icons/user/modify";

import type { PartialWorkoutType } from "@/db/schema";
import type { WorkoutSwipeActions } from "@/util/types";

export const ArchivedWorkoutsList = ({
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
          <WorkoutsListShell status="archived" />
        </main>
      ) : (
        <main className="mt-safe-top space-y-4 px-6 pb-[100px] pt-[157px]">
          <AnimatePresence>
            {workoutsList.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
                removeWorkoutOnClient={removeWorkoutOnClient}
                toggleModal={toggleModal}
                toggleDrawer={toggleDrawer}
                setAsTargetedWorkout={setAsTargetedWorkout}
              />
            ))}
          </AnimatePresence>
        </main>
      )}
    </>
  );
};

const WorkoutCard = ({
  workout,
  removeWorkoutOnClient,
  toggleDrawer,
  toggleModal,
  setAsTargetedWorkout,
}: {
  workout: PartialWorkoutType;
  removeWorkoutOnClient: (workoutId: number) => void;
  toggleDrawer: () => void;
  toggleModal: () => void;
  setAsTargetedWorkout: (workout: PartialWorkoutType) => void;
}) => {
  const { mutate: handleUnarchiving, isPending } = useMutation({
    mutationFn: async (workout: PartialWorkoutType) => {
      timeout(FORM_TIMEOUT);

      const res = await unarchiveWorkout(workout.id, workout.title);

      if (res.status === "success-redirect") {
        removeWorkoutOnClient(workout.id);

        showToast(res.message, "/home", "See current");
      } else {
        showToast(res.message);
      }
    },
  });

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

            <form action={() => handleUnarchiving(workout)}>
              <button
                type="submit"
                disabled={isPending}
                className="group flex justify-center rounded-lg bg-gradient-to-r from-blue-400 to-blue-500 px-3 py-1.5 text-sm font-bold text-white shadow-md transition active:scale-90 active:from-blue-300 active:to-blue-400 disabled:pointer-events-none disabled:opacity-50 dark:from-blue-500 dark:to-blue-600 dark:active:from-blue-700 dark:active:to-blue-800"
              >
                <Spinner className="absolute size-5 animate-spin text-white group-enabled:opacity-0" />

                <span className="group-disabled:opacity-0">Unarchive</span>
              </button>
            </form>
          </div>
        </SwipeAction.Trigger>

        <ArchivedWorkoutsSwipeActions
          openPreviewDrawer={toggleDrawer}
          openRemoveModal={toggleModal}
          workoutToPreview={() => setAsTargetedWorkout(workout)}
          workoutToRemove={() => setAsTargetedWorkout(workout)}
        />
      </SwipeAction.Root>
    </motion.div>
  );
};

const ArchivedWorkoutsSwipeActions = ({
  openPreviewDrawer,
  openRemoveModal,
  workoutToPreview,
  workoutToRemove,
}: Omit<WorkoutSwipeActions, "workoutToEditId">) => {
  return (
    <SwipeAction.Actions
      wrapperClassName="bg-violet-100 dark:bg-violet-500 rounded-xl"
      className="flex-col"
    >
      <SwipeAction.Action
        onClick={async () => {
          await timeout(BUTTON_TIMEOUT);

          workoutToPreview();
          openPreviewDrawer();
        }}
        className="flex grow items-center justify-center border-b border-violet-500 px-4 text-violet-500 dark:border-white dark:text-white"
      >
        <ShowIcon strokeWidth={1.5} className="size-7" />
        <p className="sr-only">Preview workout</p>
      </SwipeAction.Action>

      <SwipeAction.Action
        onClick={async () => {
          await timeout(SWIPE_AND_DRAWER_TIMEOUT);

          workoutToRemove();
          openRemoveModal();
        }}
        className="flex grow items-center justify-center px-4 text-red-500 dark:text-white"
      >
        <TrashBinIcon strokeWidth={1.5} className="size-7" />

        <span className="sr-only">Remove workout</span>
      </SwipeAction.Action>
    </SwipeAction.Actions>
  );
};
