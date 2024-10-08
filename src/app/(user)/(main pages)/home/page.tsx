import Link from "next/link";
import { Suspense } from "react";
import {
  UserPagesSubHeadingWrapper,
  UserPagesSubHeadingText,
} from "@/components/user/UserPagesHeader";
import { WorkoutQuerySwitchButton } from "@/components/user/WorkoutQuerySwitchButton";
import { HomePageTooltip } from "@/components/Tooltips";
import { AddIcon } from "@/components/icons/user/modify";
import { LoadingWorkoutsSkeleton } from "@/components/Loading";
import { HomePageDataFetcher } from "@/components/user/HomePageDataFetcher";

import type { Metadata } from "next";
import type { WorkoutStatusType } from "@/util/types";

export const metadata: Metadata = {
  title: "Home",
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: {
    q: WorkoutStatusType;
  };
}) {
  return (
    <>
      <UserPagesSubHeadingWrapper>
        <div className="flex items-center gap-1">
          <UserPagesSubHeadingText label="Workouts" className="text-2xl" />

          <WorkoutQuerySwitchButton />

          <HomePageTooltip />
        </div>

        <Link
          href="/create"
          className="rounded-full bg-white p-2 shadow-md ring-1 ring-slate-300 transition active:scale-95 active:bg-slate-200 dark:bg-slate-800 dark:ring-slate-600 dark:active:bg-slate-600"
        >
          <AddIcon size={24} strokeWidth={2} />
          <p className="sr-only">Add a new workout</p>
        </Link>
      </UserPagesSubHeadingWrapper>

      <Suspense fallback={<LoadingWorkoutsSkeleton />}>
        <HomePageDataFetcher queryParam={searchParams.q} />
      </Suspense>
    </>
  );
}
