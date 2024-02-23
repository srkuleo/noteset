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
      <Link
        href="/workouts"
        className="rounded-xl bg-violet-500 px-4 py-2 text-sm font-semibold text-white shadow-sm dark:bg-violet-600"
      >
        Home page
      </Link>
    </>
  );
}
