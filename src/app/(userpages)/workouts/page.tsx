import Link from "next/link";
import { Suspense } from "react";
import { UserPagesHeadingText } from "@/components/user/UserPagesHeadingText";
import { AddIcon } from "@/components/icons/user/modify";
import { WorkoutsPageContent } from "@/components/user/WorkoutsPageContent";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Workouts",
};

export default async function WorkoutsPage() {
  return (
    <>
      <div className="flex items-center justify-between border-b border-slate-300/80 px-6 py-4 dark:border-slate-800">
        <UserPagesHeadingText label="Workouts" />

        <Link
          href="/workouts/create"
          className="rounded-full bg-white p-2 shadow-md ring-1 ring-slate-200 transition active:scale-95 active:bg-slate-200 dark:bg-slate-800 dark:ring-slate-700 dark:active:bg-slate-600"
        >
          <AddIcon size={24} strokeWidth={2} />
          <p className="sr-only">Add a new workout</p>
        </Link>
      </div>

      <main className="space-y-4 overflow-y-auto overscroll-contain scroll-smooth px-6 py-4">
        <Suspense fallback={<LoadingWorkoutsSkeleton />}>
          <WorkoutsPageContent />
        </Suspense>
      </main>
    </>
  );
}

const LoadingWorkoutsSkeleton = () => {
  return [1, 2, 3, 4].map((skeleton) => (
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
  ));
};
