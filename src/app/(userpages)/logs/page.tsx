import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getAuth } from "@/util/actions/auth";
import { UserPagesHeadingText } from "@/components/user/UserPagesHeadingText";
import { LoadingWorkoutsSkeleton } from "@/components/user/LoadingWorkoutsSkeleton";
import { LogsPageContent } from "@/components/user/LogsPageContent";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logs",
};

export default async function LogsPage() {
  const { user } = await getAuth();

  if (!user) {
    redirect("/login");
  }

  return (
    <>
      <div className="border-b border-slate-300/80 px-6 py-4 dark:border-slate-800">
        <UserPagesHeadingText label="Logs" />
      </div>

      {/* Add search bar and filter button */}

      <main className="space-y-4 overflow-y-auto overscroll-contain scroll-smooth px-6 py-4">
        <Suspense fallback={<LoadingWorkoutsSkeleton />}>
          <LogsPageContent />
        </Suspense>
      </main>
    </>
  );
}
