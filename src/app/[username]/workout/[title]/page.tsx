import { getWorkoutByTitle } from "@/db/query";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function WorkoutPage({
  params,
}: {
  params: { username: string; title: string };
}) {
  const convertedTitleParam = decodeURI(params.title);
  const workout = await getWorkoutByTitle(convertedTitleParam);

  if (!workout) notFound();

  return (
    <div className="grow text-center">
      <p className="py-10 text-xl font-semibold">
        You are currently tracking {workout.title} workout
      </p>
      <div className="space-y-2 pb-10">
        <p className="text-lg ">This is your description</p>
        <p>{workout.description}</p>
      </div>
      <Link href={`/${params.username}`}>Go back to Home page</Link>
    </div>
  );
}
