import { notFound, redirect } from "next/navigation";
import { getAuthSession } from "@/util/session";
import { getCurrentWorkoutByTitle, getLastSubmittedWorkout } from "@/db/query";
import { PostWorkoutPageContent } from "./PostWorkoutPageContent";

export const PostWorkoutPageDataFetcher = async ({
  title,
}: {
  title: string;
}) => {
  const { user } = await getAuthSession();

  if (user === null) {
    redirect("/login");
  }

  const [currentWorkout, submittedWorkout] = await Promise.all([
    getCurrentWorkoutByTitle(title),
    getLastSubmittedWorkout(title),
  ]);

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
