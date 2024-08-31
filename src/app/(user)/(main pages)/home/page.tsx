import Link from "next/link";
import { Suspense } from "react";
import {
  UserPagesSubHeadingWrapper,
  UserPagesSubHeadingText,
} from "@/components/user/UserPagesHeader";
import { AddIcon } from "@/components/icons/user/modify";
import { LoadingWorkoutsSkeleton } from "@/components/Loading";
import { HomePageContent } from "@/components/user/HomePageContent";

import type { Metadata } from "next";
import { HomePageTooltip } from "@/components/Tooltips";

export const metadata: Metadata = {
  title: "Home",
};

export default async function HomePage() {
  return (
    <>
      <UserPagesSubHeadingWrapper>
        <UserPagesSubHeadingText label="Workouts" />

        <div className="flex gap-1">
          <HomePageTooltip />
          <Link
            href="/create"
            className="rounded-full bg-white p-2 shadow-md ring-1 ring-slate-200 transition active:scale-95 active:bg-slate-200 dark:bg-slate-800 dark:ring-slate-700 dark:active:bg-slate-600"
          >
            <AddIcon size={24} strokeWidth={2} />
            <p className="sr-only">Add a new workout</p>
          </Link>
        </div>
      </UserPagesSubHeadingWrapper>

      <main className="space-y-4 overflow-y-auto overscroll-contain scroll-smooth px-6 py-4">
        <Suspense fallback={<LoadingWorkoutsSkeleton />}>
          <HomePageContent />
        </Suspense>
      </main>
    </>
  );
}
