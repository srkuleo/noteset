import { Suspense } from "react";
import {
  UserPagesSubHeadingWrapper,
  UserPagesSubHeadingText,
} from "@/components/user/UserPagesHeader";
import { LogsPageSearchBar } from "@/components/user/LogsPageSearchBar";
import { LogsPageSkeleton } from "@/components/Loading";
import { LogsPageDataFetcher } from "@/components/user/LogsPageDataFetcher";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logs",
};

export default async function LogsPage() {
  return (
    <>
      <UserPagesSubHeadingWrapper>
        <UserPagesSubHeadingText label="Logs" />
      </UserPagesSubHeadingWrapper>

      <LogsPageSearchBar />

      <Suspense fallback={<LogsPageSkeleton />}>
        <LogsPageDataFetcher />
      </Suspense>
    </>
  );
}
