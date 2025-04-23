import { Suspense } from "react";
import {
  UserPagesSubHeadingWrapper,
  UserPagesSubHeadingText,
} from "@/components/user/UserPagesHeader";
import { LogsPageSkeleton } from "@/components/Loading";
import { LogsPageDataFetcher } from "@/components/user/logs/LogsPageDataFetcher";

import type { Metadata } from "next";
import type { LogsPageSearchParams } from "@/util/types";

export const metadata: Metadata = {
  title: "Logs",
};

type SearchParams = Promise<LogsPageSearchParams>;

export default async function LogsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { searchQuery, strictMode } = await searchParams;

  return (
    <>
      <UserPagesSubHeadingWrapper>
        <UserPagesSubHeadingText label="Logs" />
      </UserPagesSubHeadingWrapper>

      <Suspense fallback={<LogsPageSkeleton />}>
        <LogsPageDataFetcher
          searchQuery={searchQuery}
          strictMode={strictMode}
        />
      </Suspense>
    </>
  );
}
