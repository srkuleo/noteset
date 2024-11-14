import { redirect } from "next/navigation";
import { getAuthSession } from "@/util/session";
import { getUserWorkouts } from "@/db/query";
import { HomePageContent } from "./HomePageContent";

import type { WorkoutStatusType } from "@/util/types";

export const HomePageDataFetcher = async ({
  queryParam,
}: {
  queryParam: WorkoutStatusType;
}) => {
  const { user } = await getAuthSession();

  if (user === null) {
    redirect("/login");
  }

  const workouts = await getUserWorkouts(queryParam);

  return <HomePageContent workouts={workouts} status={queryParam} />;
};
