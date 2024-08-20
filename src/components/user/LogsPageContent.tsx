import { redirect } from "next/navigation";
import { getAuth } from "@/util/actions/auth";
import { getUserDoneWorkouts } from "@/db/query";
import { DoneWorkoutCards } from "./DoneWorkoutCards";

export const LogsPageContent = async () => {
  const { user } = await getAuth();

  if (!user) {
    redirect("/login");
  }

  const doneWorkouts = await getUserDoneWorkouts();

  return (
    <DoneWorkoutCards
      doneWorkouts={doneWorkouts}
      timeFormatPreference={user.preferences.timeFormat}
    />
  );
};
