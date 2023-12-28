import { getWorkoutById } from "@/db/query";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ThemeButton } from "@/components/navbars/ThemeButton";

export default async function WorkoutPage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const coercedId = Number(searchParams.id);
  if (typeof coercedId === "number") {
    console.log("its is number");
  }
  const workout = await getWorkoutById(coercedId);

  if (!workout) notFound();

  return (
    <>
      <div className="fixed w-full bg-gradient-to-r from-green-600 from-20% to-violet-600 pt-safe-top dark:from-green-700 dark:to-violet-700 ">
        <nav className="flex justify-between px-4 py-3">
          <p className="text-sm text-white">
            Current workout: <span className="text-lg">{workout.title}</span>
          </p>
          <ThemeButton />
        </nav>
      </div>
      <div className="mt-24 grow px-4 pb-8 pt-safe-top text-center">
        <p className="text-xl font-semibold">
          You are currently tracking {workout.title} workout
        </p>
        <div className="space-y-2 pb-10">
          <p className="text-lg ">This is your description</p>
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
