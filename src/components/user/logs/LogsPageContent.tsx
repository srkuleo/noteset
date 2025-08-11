"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useWorkoutsOnLogsPage } from "@/util/hooks/useWorkoutsOnLogsPage";
import {
  timeout,
  BUTTON_TIMEOUT,
  SWIPE_AND_DRAWER_TIMEOUT,
} from "@/util/utils";
import { EmptyIcon } from "@/components/icons/user/warning";
import { PreviewWorkoutDrawer } from "../PreviewWorkoutDrawer";
import { RemoveWorkoutModal } from "../RemoveWorkoutModal";
import { FormatWorkoutDuration } from "@/components/Formatting";
import { StatusIndicator } from "@/components/StatusIndicator";
import { SwipeAction } from "@/components/swipe/SwipeAction";
import { TrashBinIcon } from "@/components/icons/user/modify";
import { ShowIcon } from "@/components/icons/user/preview";

import type { WorkoutType } from "@/db/schema";
import type { TimeFormatType, LogsPageSearchParams } from "@/util/types";

export const LogsPageContent = ({
  doneWorkouts,
  timeFormatPreference,
  searchQuery,
}: {
  doneWorkouts: WorkoutType[];
  timeFormatPreference: TimeFormatType;
  searchQuery: LogsPageSearchParams["searchQuery"];
}) => {
  const {
    doneWorkoutsList,
    targetedWorkout,
    isOpenRemoveModal,
    isOpenPreviewDrawer,
    setDoneWorkoutsList,
    removeWorkoutOnClient,
    setAsTargetedWorkout,
    toggleModal,
    toggleDrawer,
  } = useWorkoutsOnLogsPage();

  useEffect(() => {
    setDoneWorkoutsList([...doneWorkouts]);
  }, [doneWorkouts, setDoneWorkoutsList]);

  return (
    <>
      <RemoveWorkoutModal
        targetedWorkout={targetedWorkout}
        open={isOpenRemoveModal}
        toggleModal={toggleModal}
        removeWorkoutOnClient={removeWorkoutOnClient}
      />

      <PreviewWorkoutDrawer
        logMode
        workout={targetedWorkout}
        open={isOpenPreviewDrawer}
        toggleDrawer={toggleDrawer}
      />

      {doneWorkoutsList.length > 0 ? (
        <main className="mt-safe-top space-y-4 px-6 pb-[100px] pt-[217px]">
          <AnimatePresence>
            {doneWorkoutsList.map((doneWorkout) => (
              <DoneWorkoutCard
                key={doneWorkout.id}
                doneWorkout={doneWorkout}
                timeFormatPreference={timeFormatPreference}
                toggleDrawer={toggleDrawer}
                toggleModal={toggleModal}
                setAsTargetedWorkout={setAsTargetedWorkout}
              />
            ))}
          </AnimatePresence>
        </main>
      ) : (
        <main className="mt-safe-top flex flex-col justify-center px-8 pb-36 pt-[141px]">
          <EmptyPage searchQuery={searchQuery} />
        </main>
      )}
    </>
  );
};

const DoneWorkoutCard = ({
  doneWorkout,
  timeFormatPreference,
  toggleDrawer,
  toggleModal,
  setAsTargetedWorkout,
}: {
  doneWorkout: WorkoutType;
  timeFormatPreference: TimeFormatType;
  toggleDrawer: () => void;
  toggleModal: () => void;
  setAsTargetedWorkout: (workout: WorkoutType) => void;
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
        <SwipeAction.Trigger className="flex items-center gap-2 rounded-xl border border-slate-300/80 bg-white p-6 dark:border-slate-700 dark:bg-slate-800">
          <div className="flex-1 space-y-1">
            <p className="text-pretty font-manrope font-bold uppercase dark:text-slate-300">
              {doneWorkout.title}
            </p>

            <div className="flex items-center gap-2 divide-x divide-slate-300 dark:divide-slate-600">
              <p className="text-sm font-semibold italic leading-none text-slate-400/80 dark:text-slate-400/60">
                {doneWorkout.doneAt?.toLocaleString("en", {
                  weekday: "long",
                })}
              </p>

              <FormatWorkoutDuration
                selectedFormat={timeFormatPreference}
                duration={doneWorkout.duration}
                logsMode
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-3.5 font-manrope text-sm leading-none">
            <StatusIndicator
              status={doneWorkout.status}
              className="px-3 py-2 ring-slate-300/80 dark:bg-slate-900 dark:ring-slate-700"
            />

            <div className="space-y-2 text-center">
              <p className="font-extrabold">
                {`${doneWorkout.doneAt?.toLocaleString("en", {
                  month: "short",
                })}, ${String(doneWorkout.doneAt?.getDate()).padStart(2, "0")}`}
              </p>

              <p className="font-semibold text-slate-400 dark:text-slate-300">
                {doneWorkout.doneAt?.getFullYear()}
              </p>
            </div>
          </div>
        </SwipeAction.Trigger>

        <SwipeAction.Actions
          wrapperClassName="bg-violet-100 dark:bg-violet-500 rounded-xl"
          className="flex-col"
        >
          <SwipeAction.Action
            onClick={async () => {
              await timeout(BUTTON_TIMEOUT);

              setAsTargetedWorkout(doneWorkout);
              toggleDrawer();
            }}
            className="flex grow items-center justify-center border-b border-violet-500 px-4 text-violet-500 dark:border-white dark:text-white"
          >
            <ShowIcon strokeWidth={1.5} className="size-7" />

            <p className="sr-only">Preview workout</p>
          </SwipeAction.Action>

          <SwipeAction.Action
            onClick={async () => {
              await timeout(SWIPE_AND_DRAWER_TIMEOUT);

              setAsTargetedWorkout(doneWorkout);
              toggleModal();
            }}
            className="flex grow items-center justify-center px-4 text-red-500 dark:text-white"
          >
            <TrashBinIcon strokeWidth={1.5} className="size-7" />

            <span className="sr-only">Remove workout</span>
          </SwipeAction.Action>
        </SwipeAction.Actions>
      </SwipeAction.Root>
    </motion.div>
  );
};

const EmptyPage = ({
  searchQuery,
}: {
  searchQuery: LogsPageSearchParams["searchQuery"];
}) => {
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
  );
};
