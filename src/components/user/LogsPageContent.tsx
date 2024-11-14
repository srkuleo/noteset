"use client";

import { EmptyIcon } from "../icons/user/warning";
import { StatusIndicator } from "../StatusIndicator";
import { FormatWorkoutDuration } from "../Formatting";
import { PreviewWorkoutDrawerWithTrigger } from "./PreviewWorkoutDrawer";

import type { WorkoutType } from "@/db/schema";
import type { TimeFormatType } from "@/util/types";

export const LogsPageContent = ({
  doneWorkouts,
  timeFormatPreference,
}: {
  doneWorkouts: WorkoutType[];
  timeFormatPreference: TimeFormatType;
}) => {
  if (doneWorkouts.length === 0) {
    return (
      <main className="mt-safe-top flex flex-col justify-center px-8 pb-[100px] pt-[158px]">
        <EmptyPage />
      </main>
    );
  }

  return (
    <main className="mt-safe-top space-y-6 px-6 pb-[100px] pt-[158px]">
      {doneWorkouts.map((doneWorkout) => (
        <div key={doneWorkout.id} className="flex w-full gap-3">
          <div className="min-w-[88px] rounded-lg border border-slate-300/80 bg-violet-400 shadow-md dark:border-slate-700 dark:bg-violet-500">
            <div className="ml-1.5 flex flex-col items-center gap-2 rounded-r-[7px] bg-white p-3 font-manrope leading-none dark:bg-slate-800">
              <p className="font-semibold text-slate-400">
                {doneWorkout.doneAt?.toLocaleString("en", {
                  month: "short",
                })}
              </p>

              <p className="font-extrabold text-slate-800 dark:text-white">
                {String(doneWorkout.doneAt?.getDate()).padStart(2, "0")}
              </p>

              <p className="font-bold dark:text-slate-300">
                {doneWorkout.doneAt?.getFullYear()}
              </p>
            </div>
          </div>

          <div className="mr-auto flex flex-col justify-center gap-1">
            <p className="text-pretty font-manrope text-lg font-bold uppercase leading-none dark:text-slate-300">
              {doneWorkout.title}
            </p>

            <FormatWorkoutDuration
              timeFormat={timeFormatPreference}
              duration={doneWorkout.duration}
            />

            <p className="text-pretty text-sm font-semibold italic leading-none text-slate-400/80 dark:text-slate-400/60">
              {doneWorkout.doneAt?.toLocaleString("en", {
                weekday: "long",
              })}
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-3 border-l border-slate-300/80 pl-3 dark:border-slate-800/80">
            <StatusIndicator
              status={doneWorkout.status}
              className="bg-white px-4 py-2 ring-slate-300 dark:bg-slate-800 dark:ring-slate-700"
            />

            <PreviewWorkoutDrawerWithTrigger
              workout={doneWorkout}
              className="bg-white px-2 py-1.5 ring-slate-300 active:bg-slate-200 dark:bg-slate-800 dark:ring-slate-700 dark:active:bg-slate-900"
            />
          </div>
        </div>
      ))}
    </main>
  );
};

const EmptyPage = () => {
  return (
    <div className="flex flex-col items-center gap-8 pb-18">
      <div className="text-slate-400/60 dark:text-slate-700/80">
        {EmptyIcon}
      </div>

      <div className="text-center">
        <h3>Seems like you don&apos;t have any completed workout yet</h3>
      </div>
    </div>
  );
};
