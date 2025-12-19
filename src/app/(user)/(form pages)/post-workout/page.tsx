import type { Metadata } from "next"
import Link from "next/link"
import { Suspense } from "react"
import { HomeIcon } from "@/components/icons/user/navbar"
import { PostWorkoutPageSkeleton } from "@/components/Loading"
import { PostWorkoutTooltip } from "@/components/Tooltips"
import { PostWorkoutPageDataFetcher } from "@/components/user/PostWorkoutPageDataFetcher"
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

        <div className="flex">
          <PostWorkoutTooltip />

          <div className="mx-1 w-[1px] bg-slate-200 dark:bg-slate-700" />

          <Link
            href="/home"
            className="rounded-full p-1.5 text-slate-400 transition active:scale-95 active:bg-slate-200 dark:text-white dark:active:bg-slate-600"
          >
            <HomeIcon fill="currentColor" stroke="none" strokeWidth={0} className="size-7" />
            <p className="sr-only">Go to Home page</p>
          </Link>
        </div>
      </UserPagesSubHeadingWrapper>

      <Suspense fallback={<PostWorkoutPageSkeleton />}>
        <PostWorkoutPageDataFetcher title={workoutTitle} />
      </Suspense>
    </>
  )
}
