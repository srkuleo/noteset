import { notFound, redirect } from "next/navigation";
import { getAuth } from "@/util/actions/auth";
import { getWorkoutById } from "@/db/query";
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

  return <EditWorkoutForm fetchedWorkout={fetchedWorkout} />;
}
