import { redirect } from "next/navigation";
import { getAuth } from "@/util/actions/auth";
import { getUserWorkouts } from "@/db/query";
import { WorkoutCards } from "./WorkoutCards";

export const WorkoutsPageContent = async () => {
  const { user } = await getAuth();

  if (!user) {
    redirect("/login");
  }

  const workouts = await getUserWorkouts(user.id);

  return <WorkoutCards workouts={workouts} />;
};
