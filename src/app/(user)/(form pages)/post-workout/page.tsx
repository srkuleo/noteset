import Link from "next/link";
import { Suspense } from "react";
import {
  UserPagesSubHeadingWrapper,
  UserPagesSubHeadingText,
} from "@/components/user/UserPagesHeader";
import { PostWorkoutTooltip } from "@/components/Tooltips";
import { HomeIcon } from "@/components/icons/user/navbar";
import { LoadingPostWorkoutPageSkeleton } from "@/components/Loading";
import { PostWorkoutPageDataFetcher } from "@/components/user/PostWorkoutPageDataFetcher";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Post workout",
};

export default async function PostWorkoutPage({
  searchParams,
}: {
  searchParams: { workoutTitle: string };
}) {
  return (
    <>
      <UserPagesSubHeadingWrapper>
        <UserPagesSubHeadingText label="Post workout" />

        <div className="flex gap-1">
          <PostWorkoutTooltip />

          <Link
            href="/home"
            className="rounded-full bg-white p-2 shadow-md ring-1 ring-slate-200 transition active:scale-95 active:bg-slate-200 dark:bg-slate-800/60 dark:ring-slate-700/90 dark:active:bg-slate-600"
          >
            <HomeIcon className="size-6" strokeWidth={1.8} />
            <p className="sr-only">Go to Home page</p>
          </Link>
        </div>
      </UserPagesSubHeadingWrapper>

      <Suspense fallback={<LoadingPostWorkoutPageSkeleton />}>
        <PostWorkoutPageDataFetcher title={searchParams.workoutTitle} />
      </Suspense>
    </>
  );
}
