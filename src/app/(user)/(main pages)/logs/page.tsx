import { Suspense } from "react";
import {
  UserPagesSubHeadingWrapper,
  UserPagesSubHeadingText,
} from "@/components/user/UserPagesHeader";
import { LoadingWorkoutsSkeleton } from "@/components/Loading";
import { LogsPageDataFetcher } from "@/components/user/LogsPageDataFetcher";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logs",
};

export default async function LogsPage() {
  return (
    <>
      <UserPagesSubHeadingWrapper className="pb-[17px]">
        <UserPagesSubHeadingText label="Logs" />
      </UserPagesSubHeadingWrapper>

      {/* Add search bar and filter button */}

      <Suspense fallback={<LoadingWorkoutsSkeleton />}>
        <LogsPageDataFetcher />
      </Suspense>
    </>
  );
}
