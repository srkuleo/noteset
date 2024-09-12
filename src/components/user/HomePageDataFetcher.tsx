import { getUserWorkouts } from "@/db/query";
import { HomePageContent } from "./HomePageContent";

export const HomePageDataFetcher = async () => {
  const workouts = await getUserWorkouts();

  return <HomePageContent workouts={workouts} />;
};
