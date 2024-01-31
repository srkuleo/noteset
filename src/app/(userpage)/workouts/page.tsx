import type { Metadata } from "next";
import { Suspense } from "react";
import { WorkoutCards } from "@/components/user/WorkoutCards";
import { WorkoutCardsHeader } from "@/components/user/WorkoutCardsHeader";

export const metadata: Metadata = {
  title: "Workouts",
};

export default async function HomePage() {
  return (
    <>
      <WorkoutCardsHeader />
      <Suspense fallback={<LoadingWorkoutsSkeleton />}>
        <WorkoutCards />
      </Suspense>
    </>
  );
}

const LoadingWorkoutsSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((skeleton) => (
        <div
          key={skeleton}
          className="flex w-full flex-col gap-4 rounded-xl bg-white px-4 py-6 shadow-md dark:bg-slate-800/90"
        >
          <div className="space-y-1 px-1">
            <div className="h-7 w-24 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-900/80" />
            <div className="h-4 w-52 animate-pulse rounded-lg bg-slate-100 dark:bg-slate-900/50" />
          </div>

          <div className="h-[1px] bg-green-200 dark:bg-green-900/70" />

          <div className="flex justify-between px-1">
            <div className="flex gap-2">
              <div className="h-8 w-9 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-900/80" />
              <div className="h-8 w-18 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-900/80" />
            </div>
            <div className="flex items-center gap-4">
              <div className="size-6 animate-pulse rounded-full bg-slate-200 dark:bg-slate-900/50" />
              <div className="size-5 animate-pulse rounded-full bg-slate-200 dark:bg-slate-900/50" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
