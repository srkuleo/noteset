import type { Metadata } from "next";
import { Suspense } from "react";
import { Workouts } from "@/components/user/Workouts";
import { WorkoutsPageHeader } from "@/components/user/WorkoutsPageHeader";

export const metadata: Metadata = {
  title: "Workouts",
};

export default async function HomePage() {
  return (
    <>
      <WorkoutsPageHeader />
      <Suspense fallback={<LoadingWorkoutsSkeleton />}>
        <Workouts />
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
          className="flex w-full animate-pulse flex-col gap-4 rounded-xl bg-white px-4 py-6 shadow-md dark:bg-slate-800/70"
        >
          <div className="space-y-1 px-1">
            <div className="h-7 w-24 rounded-lg bg-slate-100 dark:bg-slate-900/80" />
            <div className="h-5 w-52 rounded-lg bg-slate-100 dark:bg-slate-900/50" />
          </div>

          <div className="h-[1px] bg-green-200 dark:bg-green-900/30" />

          <div className="flex justify-between px-1">
            <div className="flex gap-2">
              <div className="h-8 w-9 rounded-lg bg-slate-100 dark:bg-slate-900/80" />
              <div className="h-8 w-18 rounded-lg bg-slate-100 dark:bg-slate-900/80" />
            </div>
            <div className="flex items-center gap-4">
              <div className="size-6 rounded-full bg-slate-100 dark:bg-slate-900/50" />
              <div className="size-5 rounded-full bg-slate-100 dark:bg-slate-900/50" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
