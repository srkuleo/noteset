import Link from "next/link";
import { PostWorkoutPageContent } from "@/components/post-workout/PostWorkoutPageContent";
import { UserPagesHeadingText } from "@/components/user/UserPagesHeadingText";
import { HomeIcon } from "@/components/icons/user/navbar";

export default async function PostWorkoutPage({
  searchParams,
}: {
  searchParams: { workoutTitle: string };
}) {
  return (
    <>
      <div className="flex items-center justify-between border-b border-slate-300/80 px-6 py-4 dark:border-slate-800">
        <UserPagesHeadingText label="Post workout" />

        <Link
          href="/workouts"
          className="rounded-full bg-white p-2 shadow-md ring-1 ring-slate-200 transition active:scale-95 active:bg-slate-200 dark:bg-slate-800 dark:ring-slate-700 dark:active:bg-slate-600"
        >
          {HomeIcon}
          <p className="sr-only">Go to Home page</p>
        </Link>
      </div>

      <PostWorkoutPageContent title={searchParams.workoutTitle} />
    </>
  );
}
