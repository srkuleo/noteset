import { notFound } from "next/navigation";
import { getCurrentWorkoutByTitle, getLastSubmittedWorkout } from "@/db/query";
import { PostWorkout } from "./PostWorkout";

export const PostWorkoutPageContent = async ({ title }: { title: string }) => {
  const [currentWorkout, submittedWorkout] = await Promise.all([
    getCurrentWorkoutByTitle(title),
    getLastSubmittedWorkout(title),
  ]);

  if (!submittedWorkout || !currentWorkout) {
    notFound();
  }

  return (
    <PostWorkout
      submittedWorkout={submittedWorkout}
      currentWorkout={currentWorkout}
    />
  );
};
