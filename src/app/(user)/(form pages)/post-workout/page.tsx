import Link from "next/link";
import { Suspense } from "react";
import {
  UserPagesSubHeadingWrapper,
  UserPagesSubHeadingText,
} from "@/components/user/UserPagesHeader";
import { PostWorkoutTooltip } from "@/components/Tooltips";
import { HomeIcon } from "@/components/icons/user/navbar";
import { PostWorkoutPageSkeleton } from "@/components/Loading";
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

        <div className="flex">
          <PostWorkoutTooltip />

          <Link
            href="/home?q=current"
            className="rounded-full p-2 transition active:scale-95 active:bg-slate-200 dark:active:bg-slate-600"
          >
            <HomeIcon
              fill="currentColor"
              stroke="none"
              strokeWidth={0}
              className="size-6"
            />
            <p className="sr-only">Go to Home page</p>
          </Link>
        </div>
      </UserPagesSubHeadingWrapper>

      <Suspense fallback={<PostWorkoutPageSkeleton />}>
        <PostWorkoutPageDataFetcher title={searchParams.workoutTitle} />
      </Suspense>
    </>
  );
}
