import Link from "next/link";
import { Suspense } from "react";
import { UserPagesHeadingText } from "@/components/user/UserPagesHeadingText";
import { AddIcon } from "@/components/icons/user/modify";
import { LoadingWorkoutsSkeleton } from "@/components/user/LoadingWorkoutsSkeleton";
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
