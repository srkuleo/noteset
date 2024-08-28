import { notFound, redirect } from "next/navigation";
import { getCurrentWorkoutByTitle, getLastSubmittedWorkout } from "@/db/query";
import { getAuth } from "@/util/actions/auth";
import { PostWorkout } from "./PostWorkout";

export const PostWorkoutPageContent = async ({ title }: { title: string }) => {
  const [currentWorkout, submittedWorkout, { user }] = await Promise.all([
    getCurrentWorkoutByTitle(title),
    getLastSubmittedWorkout(title),
    getAuth(),
  ]);

  if (!user) {
    redirect("/login");
  }

  if (!submittedWorkout || !currentWorkout) {
    notFound();
  }

  return (
    <PostWorkout
      submittedWorkout={submittedWorkout}
      currentWorkout={currentWorkout}
      timeFormatPreference={user.preferences.timeFormat}
    />
  );
};
