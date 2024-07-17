import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getAuth } from "@/util/actions/auth";
import { getWorkoutById } from "@/db/query";
import { ThemeButton } from "@/components/ThemeButton";

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
      <header className="bg-gradient-to-r from-green-600 from-20% to-violet-600 pt-safe-top dark:from-green-700 dark:to-violet-700">
        <div className="flex items-center justify-between px-4 py-3 font-manrope">
          <p className="text-xl uppercase text-white">{workout.title}</p>
          <ThemeButton />
        </div>
      </header>

      <main className="flex justify-center px-6 py-2">
        <div className="pt-10">
          <Link
            href="/workouts"
            className="rounded-xl bg-violet-500 px-3 py-2 text-white dark:bg-violet-600"
          >
            Return to Homepage
          </Link>
        </div>
      </main>
    </>
  );
}
