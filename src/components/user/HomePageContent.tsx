import { getUserWorkouts } from "@/db/query";
import { WorkoutCards } from "./WorkoutCards";

export const HomePageContent = async () => {
  const workouts = await getUserWorkouts();

  return <WorkoutCards workouts={workouts} />;
};
