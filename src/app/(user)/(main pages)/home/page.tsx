import Link from "next/link";
import { Suspense } from "react";
import {
  UserPagesSubHeadingWrapper,
  UserPagesSubHeadingText,
} from "@/components/user/UserPagesHeader";
import { HomePageTooltip } from "@/components/Tooltips";
import { AddIcon } from "@/components/icons/user/modify";
import { LoadingWorkoutsSkeleton } from "@/components/Loading";
import { HomePageDataFetcher } from "@/components/user/HomePageDataFetcher";

import type { Metadata } from "next";

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
            className="rounded-full bg-white p-2 shadow-md ring-1 ring-slate-300 transition active:scale-95 active:bg-slate-200 dark:bg-slate-800 dark:ring-slate-600 dark:active:bg-slate-600"
          >
            <AddIcon size={24} strokeWidth={2} />
            <p className="sr-only">Add a new workout</p>
          </Link>
        </div>
      </UserPagesSubHeadingWrapper>

      <Suspense fallback={<LoadingWorkoutsSkeleton />}>
        <HomePageDataFetcher />
      </Suspense>
    </>
  );
}
