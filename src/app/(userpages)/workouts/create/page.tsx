import { redirect } from "next/navigation";
import { getAuth } from "@/util/actions/auth";
import { UserPagesWrapper } from "@/components/user/UserPagesWrapper";
import { UserPagesHeadingText } from "@/components/user/UserPagesHeadingText";
import { CreateWorkoutForm } from "@/components/user/CreateWorkoutForm";

export default async function CreateWorkoutPage() {
  const { user } = await getAuth();

  if (!user) {
    redirect("/login");
  }

  return (
    <UserPagesWrapper className="mb-20">
      <UserPagesHeadingText label="Create a new workout" />
      <CreateWorkoutForm userId={user.id} />
    </UserPagesWrapper>
  );
}
