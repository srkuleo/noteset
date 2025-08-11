import { notFound, redirect } from "next/navigation";
import { getAuthSession } from "@/util/session";
import { getPostWorkoutPageWorkouts } from "@/db/query";
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

  const { lastSubmittedWorkout, currentWorkout } =
    await getPostWorkoutPageWorkouts(title);

  if (!lastSubmittedWorkout || !currentWorkout) {
    notFound();
  }

  return (
    <PostWorkoutPageContent
      submittedWorkout={lastSubmittedWorkout}
      currentWorkout={currentWorkout}
      timeFormatPreference={user.preferences.timeFormat}
    />
  );
};
