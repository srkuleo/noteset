import { Suspense } from "react";
import {
  UserPagesSubHeadingWrapper,
  UserPagesSubHeadingText,
} from "@/components/user/UserPagesHeader";
import { WorkoutQuerySwitchButton } from "@/components/user/WorkoutQuerySwitchButton";
import { HomePageTooltip } from "@/components/Tooltips";
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
        <UserPagesSubHeadingText label="Workouts" />

        <div className="flex items-center gap-1">
          <HomePageTooltip />

          <WorkoutQuerySwitchButton />
        </div>
      </UserPagesSubHeadingWrapper>

      <Suspense fallback={<LoadingWorkoutsSkeleton />}>
        <HomePageDataFetcher queryParam={searchParams.q} />
      </Suspense>
    </>
  );
}
