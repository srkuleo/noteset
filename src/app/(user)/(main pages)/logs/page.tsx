import { Suspense } from "react";
import {
  UserPagesSubHeadingWrapper,
  UserPagesSubHeadingText,
} from "@/components/user/UserPagesHeader";
import { LoadingWorkoutsSkeleton } from "@/components/Loading";
import { LogsPageContent } from "@/components/user/LogsPageContent";

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

      {/* Add search bar and filter button */}

      <main className="space-y-4 overflow-y-auto overscroll-contain scroll-smooth px-6 py-4">
        <Suspense fallback={<LoadingWorkoutsSkeleton />}>
          <LogsPageContent />
        </Suspense>
      </main>
    </>
  );
}
