import { redirect } from "next/navigation";
import { getAuthSession } from "@/util/session";
import { getUserCurrentWorkouts } from "@/db/query";
import { CurrentWorkoutsList } from "./CurrentWorkoutsList";

export const CurrentWorkoutPageDataFetcher = async () => {
  const { user } = await getAuthSession();

  if (user === null) {
    redirect("/login");
  }

  const workouts = await getUserCurrentWorkouts();

  return <CurrentWorkoutsList workouts={workouts} />;
};
