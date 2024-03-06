import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { UserPagesWrapper } from "@/components/user/UserPagesWrapper";
import { UserPagesHeadingText } from "@/components/user/UserPagesHeadingText";
import { CreateWorkoutForm } from "@/components/user/CreateWorkoutForm";

export default async function CreateWorkoutPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const userId = user?.id as string;

  return (
    <UserPagesWrapper>
      <UserPagesHeadingText label="Create a new workout" />
      <CreateWorkoutForm userId={userId} />
    </UserPagesWrapper>
  );
}
