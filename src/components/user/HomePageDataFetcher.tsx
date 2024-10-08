import { getUserWorkouts } from "@/db/query";
import { HomePageContent } from "./HomePageContent";

import type { WorkoutStatusType } from "@/util/types";

export const HomePageDataFetcher = async ({
  queryParam,
}: {
  queryParam: WorkoutStatusType;
}) => {
  const workouts = await getUserWorkouts(queryParam);

  return <HomePageContent workouts={workouts} status={queryParam} />;
};
