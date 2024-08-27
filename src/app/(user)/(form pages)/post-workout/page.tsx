import Link from "next/link";
import {
  UserPagesSubHeadingWrapper,
  UserPagesSubHeadingText,
} from "@/components/user/UserPagesHeader";
import { HomeIcon } from "@/components/icons/user/navbar";
import { PostWorkoutPageContent } from "@/components/post-workout/PostWorkoutPageContent";

import type { Metadata } from "next";
import { Suspense } from "react";
import { LoadingPostWorkoutPageSkeleton } from "@/components/Loading";

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

        <Link
          href="/home"
          className="rounded-full bg-white p-2 shadow-md ring-1 ring-slate-200 transition active:scale-95 active:bg-slate-200 dark:bg-slate-800 dark:ring-slate-700 dark:active:bg-slate-600"
        >
          <HomeIcon className="size-6" strokeWidth={1.8} />
          <p className="sr-only">Go to Home page</p>
        </Link>
      </UserPagesSubHeadingWrapper>

      <Suspense fallback={<LoadingPostWorkoutPageSkeleton />}>
        <PostWorkoutPageContent title={searchParams.workoutTitle} />
      </Suspense>
    </>
  );
}
