import { redirect } from "next/navigation";
import { getAuthSession } from "@/util/session";
import { getUserWorkouts } from "@/db/query";

import type { WorkoutStatusType } from "@/util/types";
import { ArchivedWorkoutsList } from "./ArchivedWorkoutsList";
import { CurrentWorkoutsList } from "./CurrentWorkoutsList";

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

  if (queryParam === "archived") {
    return (
      <ArchivedWorkoutsList
        key={queryParam}
        workouts={workouts}
        status={queryParam}
      />
    );
  }

  return (
    <CurrentWorkoutsList
      key={queryParam}
      workouts={workouts}
      status={queryParam}
    />
  );
};
