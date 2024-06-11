import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { getUserWorkouts } from "@/db/query";
import { WorkoutCards } from "./WorkoutCards";

export const WorkoutsPageContent = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const workouts = await getUserWorkouts(user?.id as string);

  return <WorkoutCards workouts={workouts} />;
};
