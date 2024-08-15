import { notFound, redirect } from "next/navigation";
import { getAuth } from "@/util/actions/auth";
import { getWorkoutById } from "@/db/query";
import { WorkoutForm } from "@/components/workout/WorkoutForm";

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
  const fetchedWorkout = await getWorkoutById(coercedId, user.id);

  if (!fetchedWorkout) notFound();

  return <WorkoutForm fetchedWorkout={fetchedWorkout} />;
}
