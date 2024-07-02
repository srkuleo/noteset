import { notFound, redirect } from "next/navigation";
import { getAuth } from "@/util/actions/auth";
import { getWorkoutById } from "@/db/query";
import { UserPagesWrapper } from "@/components/user/UserPagesWrapper";
import { UserPagesHeadingText } from "@/components/user/UserPagesHeadingText";
import { EditWorkoutForm } from "@/components/user/EditWorkoutForm";

import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit",
};

export default async function EditWorkoutPage({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const { user } = await getAuth();

  if (!user) {
    redirect("/login");
  }

  const coercedWorkoutId = Number(searchParams.id);
  const fetchedWorkout = await getWorkoutById(coercedWorkoutId, user.id);

  if (!fetchedWorkout) notFound();

  return (
    <UserPagesWrapper>
      <UserPagesHeadingText label={`Editing ${fetchedWorkout.title}`} />
      <EditWorkoutForm fetchedWorkout={fetchedWorkout} />
    </UserPagesWrapper>
  );
}
