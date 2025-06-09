import { redirect } from "next/navigation";
import { getAuthSession } from "@/util/session";
import { getUserArchivedWorkouts } from "@/db/query";
import { ArchivedWorkoutsList } from "./ArchivedWorkoutsList";

export const ArchivedWorkoutPageDataFetcher = async () => {
  const { user } = await getAuthSession();

  if (user === null) {
    redirect("/login");
  }

  const workouts = await getUserArchivedWorkouts();

  return <ArchivedWorkoutsList workouts={workouts} />;
};
