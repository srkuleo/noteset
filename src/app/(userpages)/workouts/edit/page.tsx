import { notFound } from "next/navigation";
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
  const coercedWorkoutId = Number(searchParams.id);
  const fetchedWorkout = await getWorkoutById(coercedWorkoutId);

  if (!fetchedWorkout) notFound();

  return (
    <UserPagesWrapper>
      <UserPagesHeadingText label={`Editing ${fetchedWorkout.title}`} />
      <EditWorkoutForm fetchedWorkout={fetchedWorkout} />
    </UserPagesWrapper>
  );
}
