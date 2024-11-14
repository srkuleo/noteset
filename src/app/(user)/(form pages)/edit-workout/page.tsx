import { notFound, redirect } from "next/navigation";
import { getAuthSession } from "@/util/session";
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
  const { user } = await getAuthSession();

  if (user === null) {
    redirect("/login");
  }

  const coercedWorkoutId = Number(searchParams.id);
  const workoutToEdit = await getWorkoutById(coercedWorkoutId);

  if (!workoutToEdit) notFound();

  return <EditWorkoutForm workoutToEdit={workoutToEdit} />;
}
