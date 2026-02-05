import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { DumbbellIcon } from "@/components/icons/user/navbar"
import { PostWorkoutPageSkeleton } from "@/components/Loading"
import { PostWorkoutTooltip } from "@/components/Tooltips"
import { PostWorkoutPageDataFetcher } from "@/components/user/form_pages/post_workout/PostWorkoutPageDataFetcher"
import {
  UserPagesSubHeadingText,
  UserPagesSubHeadingWrapper,
} from "@/components/user/UserPagesHeader"

export const metadata: Metadata = {
  title: "Post workout",
}

type SearchParams = Promise<{ workoutTitle: string }>

export default async function PostWorkoutPage({ searchParams }: { searchParams: SearchParams }) {
  const { workoutTitle } = await searchParams

  return (
    <>
      <UserPagesSubHeadingWrapper>
        <UserPagesSubHeadingText label="Post workout" />

        <div className="flex items-center gap-2">
          <PostWorkoutTooltip />

          <div className="h-7 w-[1px] bg-slate-200 dark:bg-slate-700" />

          <Link
            href="/current"
            className="rounded-full p-1.5 text-slate-600 active:bg-slate-200 dark:text-white dark:active:bg-slate-600"
          >
            <DumbbellIcon
              fill="currentColor"
              stroke="none"
              strokeWidth={0}
              className="size-7 transition active:scale-95"
            />
            <p className="sr-only">See current workouts</p>
          </Link>
        </div>
      </UserPagesSubHeadingWrapper>

      <Suspense fallback={<PostWorkoutPageSkeleton />}>
        <PostWorkoutPageDataFetcher title={workoutTitle} />
      </Suspense>
    </>
  )
}
