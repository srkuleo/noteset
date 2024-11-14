import { notFound } from "next/navigation";
import { getWorkoutTitleById } from "@/db/query";

export const WorkoutToDoTitle = async ({
  workoutId,
}: {
  workoutId: number;
}) => {
  const workoutTitle = await getWorkoutTitleById(workoutId);

  if (!workoutTitle) notFound();

  return (
    <p className="font-manrope text-xl uppercase text-white">
      {workoutTitle.title}
    </p>
  );
};
