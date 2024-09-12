import { notFound, redirect } from "next/navigation";
import { getCurrentWorkoutByTitle, getLastSubmittedWorkout } from "@/db/query";
import { getAuth } from "@/util/actions/auth";
import { PostWorkoutPageContent } from "./PostWorkoutPageContent";

export const PostWorkoutPageDataFetcher = async ({
  title,
}: {
  title: string;
}) => {
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
    <PostWorkoutPageContent
      submittedWorkout={submittedWorkout}
      currentWorkout={currentWorkout}
      timeFormatPreference={user.preferences.timeFormat}
    />
  );
};
