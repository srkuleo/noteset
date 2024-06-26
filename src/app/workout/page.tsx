import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getAuth } from "@/util/actions/auth";
import { getWorkoutById } from "@/db/query";
import { ThemeButton } from "@/components/landing/ThemeButton";

export default async function WorkoutPage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const { user } = await getAuth();

  if (!user) {
    redirect("/login");
  }

  const coercedId = Number(searchParams.id);
  const workout = await getWorkoutById(coercedId, user.id);

  if (!workout) notFound();

  return (
    <>
      <div className="fixed w-full select-none bg-gradient-to-r from-green-600 from-20% to-violet-600 pt-safe-top dark:from-green-700 dark:to-violet-700">
        <nav className="flex items-center justify-between px-4 py-3 font-manrope">
          <p className="text-sm uppercase text-white">
            Workout: <span className="text-xl">{workout.title}</span>
          </p>
          <ThemeButton />
        </nav>
      </div>

      <div className="mt-24 grow px-4 pb-8 pt-safe-top text-center">
        <p className="text-xl font-semibold">
          You are currently tracking {workout.title} workout
        </p>
        <div className="space-y-2 pb-10">
          <p className="text-lg">This is your description</p>
          <p>{workout.description}</p>
        </div>
        <Link
          href="/workouts"
          className="rounded-xl bg-violet-500 px-3 py-2 text-white dark:bg-violet-600"
        >
          Return to Homepage
        </Link>
      </div>
    </>
  );
}
