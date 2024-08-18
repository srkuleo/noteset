"use client";

import { EmptyIcon } from "../icons/user/warning";
import { StatusIndicator } from "../StatusIndicator";
import { PreviewWorkoutButton } from "./PreviewWorkoutButton";

import type { WorkoutType } from "@/db/schema";

export const DoneWorkoutCards = ({
  doneWorkouts,
}: {
  doneWorkouts: WorkoutType[];
}) => {
  return (
    <>
      {doneWorkouts.length === 0 ? (
        <EmptyPage />
      ) : (
        doneWorkouts.map((doneWorkout) => (
          <div
            key={doneWorkout.id}
            className="flex w-full flex-col gap-4 rounded-xl border border-slate-300/80 bg-white px-4 py-6 shadow-md dark:border-slate-700/60 dark:bg-slate-800/80"
          >
            <div className="space-y-1.5 px-1">
              <div className="flex justify-between gap-4">
                <p className="text-pretty font-manrope text-lg font-bold uppercase dark:text-slate-300">
                  {doneWorkout.title}
                </p>

                <StatusIndicator status={doneWorkout.status} />
              </div>

              <p className="text-pretty text-sm font-semibold italic leading-none text-slate-400/80 dark:text-slate-400/60">
                {doneWorkout.description
                  ? doneWorkout.description
                  : "Description not provided"}
              </p>
            </div>

            <div className="h-[1px] bg-green-200 dark:bg-green-900/70" />

            <div className="flex justify-between px-2">
              <div className="space-y-2">
                <p>
                  {doneWorkout.doneAt
                    ?.toLocaleDateString()
                    .replaceAll("/", "-")}
                </p>
                <p>{doneWorkout.duration} min</p>
              </div>

              <PreviewWorkoutButton workout={doneWorkout} />
            </div>
          </div>
        ))
      )}
    </>
  );
};

const EmptyPage = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-8 pb-18">
      <div className="text-slate-400/60 dark:text-slate-700/80">
        {EmptyIcon}
      </div>

      <div className="text-center">
        <h3>Seems like you don&apos;t have any completed workout yet</h3>
      </div>
    </div>
  );
};
