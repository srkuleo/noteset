import { CheckmarkIcon } from "@/icons/user/modify";
import Link from "next/link";

export default function WorkoutCreatedPage() {
  return (
    <>
      {CheckmarkIcon}

      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Well done, workout created!</h1>
        <h2 className="text-sm font-semibold italic text-slate-400 ">
          Go back to home page to see the changes.
        </h2>
      </div>

      <div className="flex flex-col items-center gap-3">
        <Link
          href="/workouts/create"
          className="rounded-xl bg-violet-500 px-4 py-2 font-semibold text-white shadow-sm active:scale-95 dark:bg-violet-600"
        >
          Create another one
        </Link>
        <Link
          href="/workouts"
          className="rounded-full px-3 py-1.5 font-manrope font-semibold text-slate-400 active:bg-slate-800 dark:text-slate-300"
        >
          Home page
        </Link>
      </div>
    </>
  );
}
