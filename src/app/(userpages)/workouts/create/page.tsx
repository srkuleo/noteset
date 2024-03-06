import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { WorkoutsPagesWrapper } from "@/components/user/WorkoutsPagesWrapper";
import { CreateForm } from "@/components/user/CreateForm";
import { WorkoutsPagesHeadingText } from "@/components/user/WorkoutsPagesHeadingText";

export default async function CreateWorkoutPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const userId = user?.id as string;

  return (
    <WorkoutsPagesWrapper>
      <WorkoutsPagesHeadingText label="Create a new workout" />
      <CreateForm userId={userId} />
    </WorkoutsPagesWrapper>
  );
}
