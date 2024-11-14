import { notFound, redirect } from "next/navigation";
import { getAuthSession } from "@/util/session";
import { getWorkoutByIdWithoutId } from "@/db/query";
import { WorkoutToDoForm } from "./WorkoutToDoForm";

export const WorkoutToDoDataFetcher = async ({
  workoutId,
}: {
  workoutId: number;
}) => {
  const { user } = await getAuthSession();

  if (user === null) {
    redirect("/login");
  }

  const workoutToDo = await getWorkoutByIdWithoutId(workoutId);

  if (!workoutToDo) notFound();

  return <WorkoutToDoForm workoutToDo={workoutToDo} />;
};
