import { notFound, redirect } from "next/navigation";
import { getAuth } from "@/util/actions/auth";
import { getWorkoutByIdWithoutId } from "@/db/query";
import { WorkoutToDoForm } from "@/components/workout/WorkoutToDoForm";

export default async function WorkoutToDoPage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const { user } = await getAuth();

  if (!user) {
    redirect("/login");
  }

  const coercedId = Number(searchParams.id);
  const workoutToDo = await getWorkoutByIdWithoutId(coercedId);

  if (!workoutToDo) notFound();

  return <WorkoutToDoForm workoutToDo={workoutToDo} />;
}
